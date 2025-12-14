import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const useWebRTC = (roomId, isInitiator = false) => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [isCallActive, setIsCallActive] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [error, setError] = useState(null);
    const [remoteEnded, setRemoteEnded] = useState(false);

    const socketRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const localStreamRef = useRef(null);

    const configuration = {
        iceServers: [
            // Standard Google STUN servers
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
            { urls: 'stun:stun3.l.google.com:19302' },
            { urls: 'stun:stun4.l.google.com:19302' },

            // Robust Twilio TURN servers for reliable connection (Keep Existing)
            { urls: 'stun:global.stun.twilio.com:3478' },
            {
                urls: 'turn:global.turn.twilio.com:3478?transport=udp',
                username: 'dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269',
                credential: 'tE2DajzSJwnsSbc123'
            },
            {
                urls: 'turn:global.turn.twilio.com:3478?transport=tcp',
                username: 'dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269',
                credential: 'tE2DajzSJwnsSbc123'
            },
            {
                urls: 'turn:global.turn.twilio.com:443?transport=tcp',
                username: 'dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269',
                credential: 'tE2DajzSJwnsSbc123'
            }
        ]
    };

    const [socketStatus, setSocketStatus] = useState('Initializing...');

    useEffect(() => {
        // Connect to Socket.io server using environment variable
        const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
        console.log('🔌 Connecting to socket server:', socketUrl);
        socketRef.current = io(socketUrl, {
            transports: ['websocket', 'polling'], // Try websocket first, fallback to polling
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        socketRef.current.on('connect', () => {
            console.log('✅ Connected to signaling server');
            setSocketStatus('Connected ✅');
        });

        socketRef.current.on('disconnect', () => {
            console.log('❌ Disconnected from signaling server');
            setSocketStatus('Disconnected ❌');
        });

        socketRef.current.on('connect_error', (err) => {
            console.error('❌ Socket connection error:', err);
            setSocketStatus(`Error: ${err.message}`);
        });

        socketRef.current.on('ready', async () => {
            console.log('🟢 Room is ready, both users present');
            if (isInitiator) {
                console.log('🔵 I am initiator, creating offer...');
                await createOffer();
            }
        });

        socketRef.current.on('offer', async (offer) => {
            console.log('📨 Received offer');
            await handleOffer(offer);
        });

        socketRef.current.on('answer', async (answer) => {
            console.log('📨 Received answer');
            await handleAnswer(answer);
        });

        socketRef.current.on('ice-candidate', async (candidate) => {
            console.log('📨 Received ICE candidate');
            if (peerConnectionRef.current && candidate) {
                try {
                    await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                    console.log('✅ Added ICE candidate');
                } catch (err) {
                    console.error('❌ Error adding ICE candidate:', err);
                }
            }
        });

        socketRef.current.on('user-left', () => {
            console.log('🔴 User left the room');
            handleUserLeft();
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [roomId, isInitiator]);

    const createPeerConnection = () => {
        console.log('🔧 Creating peer connection...');
        const pc = new RTCPeerConnection(configuration);

        // Add local stream tracks to peer connection
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => {
                pc.addTrack(track, localStreamRef.current);
                console.log(`➕ Added ${track.kind} track to peer connection`);
            });
        }

        // Handle incoming tracks
        pc.ontrack = (event) => {
            console.log('✅ Received remote track:', event.track.kind);
            console.log('   Track ID:', event.track.id);
            console.log('   Stream ID:', event.streams[0]?.id);
            console.log('   Total streams:', event.streams.length);

            if (event.streams && event.streams[0]) {
                const stream = event.streams[0];
                console.log('   Stream tracks:', stream.getTracks().map(t => `${t.kind}:${t.id}`));
                console.log('✅ Setting remote stream with', stream.getTracks().length, 'tracks');
                setRemoteStream(stream);
            } else {
                console.warn('⚠️ No streams in track event');
            }
        };

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('📤 Sending ICE candidate');
                socketRef.current.emit('ice-candidate', {
                    roomId,
                    candidate: event.candidate
                });
            }
        };

        // Connection state changes
        pc.onconnectionstatechange = () => {
            console.log('🔄 Connection state:', pc.connectionState);
            if (pc.connectionState === 'failed') {
                setError('Connection failed. Please try again.');
            }
        };

        pc.oniceconnectionstatechange = () => {
            console.log('🧊 ICE connection state:', pc.iceConnectionState);
        };

        peerConnectionRef.current = pc;
        return pc;
    };

    const createOffer = async () => {
        try {
            const pc = createPeerConnection();
            console.log('📝 Creating offer...');
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            console.log('📤 Sending offer');
            socketRef.current.emit('offer', { roomId, offer });
        } catch (err) {
            console.error('❌ Error creating offer:', err);
            setError('Failed to create offer');
        }
    };

    const handleOffer = async (offer) => {
        try {
            const pc = createPeerConnection();
            console.log('📝 Setting remote description (offer)');
            await pc.setRemoteDescription(new RTCSessionDescription(offer));
            console.log('📝 Creating answer...');
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            console.log('📤 Sending answer');
            socketRef.current.emit('answer', { roomId, answer });
        } catch (err) {
            console.error('❌ Error handling offer:', err);
            setError('Failed to handle offer');
        }
    };



    const handleUserLeft = () => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
        setRemoteStream(null);
        setRemoteEnded(true);
    };

    const startCall = async () => {
        try {
            console.log('🎬 Starting video call...');
            setIsConnecting(true);
            setError(null);

            // Get user media
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    frameRate: { ideal: 24 }
                },
                audio: true
            });

            console.log('✅ Got media stream');
            setLocalStream(stream);
            localStreamRef.current = stream;
            setIsCallActive(true);

            // Join the room
            console.log(`🚪 Joining room: ${roomId}`);
            socketRef.current.emit('join-room', { roomId, isInitiator });

            setIsConnecting(false);
        } catch (err) {
            console.error('❌ Error accessing media devices:', err);
            let errorMessage = 'Failed to access camera/microphone.';

            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                errorMessage = 'Camera/microphone access denied. Please allow permissions and try again.';
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                errorMessage = 'No camera or microphone found. Please connect a device.';
            } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                errorMessage = 'Camera/microphone is already in use by another application.';
            }

            setError(errorMessage);
            setIsConnecting(false);
        }
    };

    const toggleMute = () => {
        if (localStreamRef.current) {
            const audioTrack = localStreamRef.current.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!audioTrack.enabled);
            }
        }
    };

    const toggleVideo = () => {
        if (localStreamRef.current) {
            const videoTrack = localStreamRef.current.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOff(!videoTrack.enabled);
            }
        }
    };

    const endCall = () => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }

        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            localStreamRef.current = null;
        }

        setLocalStream(null);
        setRemoteStream(null);
        setIsCallActive(false);
        setIsMuted(false);
        setIsVideoOff(false);

        if (socketRef.current) {
            socketRef.current.emit('leave-room', roomId);
        }
    };

    return {
        localStream,
        remoteStream,
        isCallActive,
        isConnecting,
        isMuted,
        isVideoOff,
        error,
        startCall,
        endCall,
        toggleMute,
        toggleMute,
        toggleVideo,
        socketStatus,
        remoteEnded,
        connectionState: peerConnectionRef.current?.connectionState,
        iceConnectionState: peerConnectionRef.current?.iceConnectionState
    };
};

export default useWebRTC;
