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

    const socketRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const localStreamRef = useRef(null);

    const configuration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' }
        ]
    };

    useEffect(() => {
        // Connect to Socket.io server
        socketRef.current = io('http://localhost:5000');

        socketRef.current.on('connect', () => {
            console.log('✅ Connected to signaling server');
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
            const [stream] = event.streams;
            console.log('✅ Setting remote stream');
            setRemoteStream(stream);
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

    const handleAnswer = async (answer) => {
        try {
            console.log('📝 Setting remote description (answer)');
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
            console.log('✅ Answer set successfully');
        } catch (err) {
            console.error('❌ Error handling answer:', err);
            setError('Failed to handle answer');
        }
    };

    const handleUserLeft = () => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
        setRemoteStream(null);
    };

    const startCall = async () => {
        try {
            console.log('🎬 Starting video call...');
            setIsConnecting(true);
            setError(null);

            // Get user media
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
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
        toggleVideo
    };
};

export default useWebRTC;
