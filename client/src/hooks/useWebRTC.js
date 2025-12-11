import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import SimplePeer from 'simple-peer';

const useWebRTC = (roomId, isInitiator = false) => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [isCallActive, setIsCallActive] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [error, setError] = useState(null);

    const socketRef = useRef(null);
    const peerRef = useRef(null);
    const localStreamRef = useRef(null);

    useEffect(() => {
        // Connect to Socket.io server
        socketRef.current = io('http://localhost:5000');

        socketRef.current.on('connect', () => {
            console.log('Connected to signaling server');
        });

        socketRef.current.on('user-joined', () => {
            console.log('🟢 Another user joined the room');
            if (isInitiator && localStreamRef.current) {
                console.log('🔵 Initiating call as doctor...');
                initiateCall();
            } else {
                console.log('🟡 Waiting for offer as patient...');
            }
        });

        socketRef.current.on('offer', (offer) => {
            console.log('📨 Received offer:', offer);
            handleOffer(offer);
        });

        socketRef.current.on('answer', (answer) => {
            console.log('📨 Received answer:', answer);
            if (peerRef.current) {
                peerRef.current.signal(answer);
            }
        });

        socketRef.current.on('ice-candidate', (candidate) => {
            console.log('📨 Received ICE candidate:', candidate);
            if (peerRef.current) {
                peerRef.current.signal(candidate);
            }
        });

        socketRef.current.on('user-left', () => {
            console.log('🔴 User left the room');
            endCall();
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [roomId]);

    const startCall = async () => {
        try {
            console.log('🎬 Starting video call...');
            setIsConnecting(true);
            setError(null);

            // Get user media (camera and microphone)
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
            console.log(`🚪 Joining room: ${roomId}, isInitiator: ${isInitiator}`);
            socketRef.current.emit('join-room', roomId);

            setIsConnecting(false);
        } catch (err) {
            console.error('❌ Error accessing media devices:', err);
            setError('Failed to access camera/microphone. Please check permissions.');
            setIsConnecting(false);
        }
    };

    const initiateCall = () => {
        if (!localStreamRef.current) return;

        const peer = new SimplePeer({
            initiator: true,
            trickle: true,
            stream: localStreamRef.current,
            config: {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun1.l.google.com:19302' }
                ]
            }
        });

        peer.on('signal', (signal) => {
            socketRef.current.emit('offer', { roomId, signal });
        });

        peer.on('stream', (stream) => {
            console.log('Received remote stream');
            setRemoteStream(stream);
        });

        peer.on('error', (err) => {
            console.error('Peer error:', err);
            setError('Connection error. Please try again.');
        });

        peer.on('close', () => {
            console.log('Peer connection closed');
            setRemoteStream(null);
        });

        peerRef.current = peer;
    };

    const handleOffer = (offer) => {
        if (!localStreamRef.current) return;

        const peer = new SimplePeer({
            initiator: false,
            trickle: true,
            stream: localStreamRef.current,
            config: {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun1.l.google.com:19302' }
                ]
            }
        });

        peer.on('signal', (signal) => {
            socketRef.current.emit('answer', { roomId, signal });
        });

        peer.on('stream', (stream) => {
            console.log('Received remote stream');
            setRemoteStream(stream);
        });

        peer.on('error', (err) => {
            console.error('Peer error:', err);
            setError('Connection error. Please try again.');
        });

        peer.on('close', () => {
            console.log('Peer connection closed');
            setRemoteStream(null);
        });

        peer.signal(offer);
        peerRef.current = peer;
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
        if (peerRef.current) {
            peerRef.current.destroy();
            peerRef.current = null;
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
