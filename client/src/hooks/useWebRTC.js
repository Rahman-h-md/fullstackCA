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
            { urls: 'stun:stun2.l.google.com:19302' },
            { urls: 'stun:stun3.l.google.com:19302' },
            { urls: 'stun:stun4.l.google.com:19302' },
            { urls: 'stun:23.21.150.121:3478' },
            { urls: 'stun:iphone-stun.strato-iphone.de:3478' },
            { urls: 'stun:numb.viagenie.ca:3478' },
            { urls: 'stun:s1.taraba.net:3478' },
            { urls: 'stun:s2.taraba.net:3478' },
            { urls: 'stun:stun.12connect.com:3478' },
            { urls: 'stun:stun.12voip.com:3478' },
            { urls: 'stun:stun.1und1.de:3478' },
            { urls: 'stun:stun.2talk.co.nz:3478' },
            { urls: 'stun:stun.2talk.com:3478' },
            { urls: 'stun:stun.3clogic.com:3478' },
            { urls: 'stun:stun.3cx.com:3478' },
            { urls: 'stun:stun.a-mm.tv:3478' },
            { urls: 'stun:stun.aa.net.uk:3478' },
            { urls: 'stun:stun.acrobits.cz:3478' },
            { urls: 'stun:stun.actionvoip.com:3478' },
            { urls: 'stun:stun.advfn.com:3478' },
            { urls: 'stun:stun.aeta-audio.com:3478' },
            { urls: 'stun:stun.aeta.com:3478' },
            { urls: 'stun:stun.alltel.com.au:3478' },
            { urls: 'stun:stun.altar.com.pl:3478' },
            { urls: 'stun:stun.annatel.net:3478' },
            { urls: 'stun:stun.antisip.com:3478' },
            { urls: 'stun:stun.arbuz.ru:3478' },
            { urls: 'stun:stun.avigora.com:3478' },
            { urls: 'stun:stun.avigora.fr:3478' },
            { urls: 'stun:stun.awa-shima.com:3478' },
            { urls: 'stun:stun.awt.be:3478' },
            { urls: 'stun:stun.b2b2c.ca:3478' },
            { urls: 'stun:stun.bahnhof.net:3478' },
            { urls: 'stun:stun.barracuda.com:3478' },
            { urls: 'stun:stun.bluesip.net:3478' },
            { urls: 'stun:stun.bmwgs.cz:3478' },
            { urls: 'stun:stun.botonakis.com:3478' },
            { urls: 'stun:stun.budgetphone.nl:3478' },
            { urls: 'stun:stun.budgetsip.com:3478' },
            { urls: 'stun:stun.cablenet-as.net:3478' },
            { urls: 'stun:stun.callromania.ro:3478' },
            { urls: 'stun:stun.callwithus.com:3478' },
            { urls: 'stun:stun.cbsys.net:3478' },
            { urls: 'stun:stun.chathelp.ru:3478' },
            { urls: 'stun:stun.cheapvoip.com:3478' },
            { urls: 'stun:stun.ciktel.com:3478' },
            { urls: 'stun:stun.cloopen.com:3478' },
            { urls: 'stun:stun.colouredlines.com.au:3478' },
            { urls: 'stun:stun.comfi.com:3478' },
            { urls: 'stun:stun.commpeak.com:3478' },
            { urls: 'stun:stun.comtube.com:3478' },
            { urls: 'stun:stun.comtube.ru:3478' },
            { urls: 'stun:stun.cope.es:3478' },
            { urls: 'stun:stun.counterpath.com:3478' },
            { urls: 'stun:stun.counterpath.net:3478' },
            { urls: 'stun:stun.cryptonit.net:3478' },
            { urls: 'stun:stun.darioflaccovio.it:3478' },
            { urls: 'stun:stun.datamanagement.it:3478' },
            { urls: 'stun:stun.dcalling.de:3478' },
            { urls: 'stun:stun.decanet.fr:3478' },
            { urls: 'stun:stun.demos.ru:3478' },
            { urls: 'stun:stun.develz.org:3478' },
            { urls: 'stun:stun.dingaling.ca:3478' },
            { urls: 'stun:stun.doublerobotics.com:3478' },
            { urls: 'stun:stun.drogon.net:3478' },
            { urls: 'stun:stun.duocom.es:3478' },
            { urls: 'stun:stun.dus.net:3478' },
            { urls: 'stun:stun.e-fon.ch:3478' },
            { urls: 'stun:stun.easybell.de:3478' },
            { urls: 'stun:stun.easycall.pl:3478' },
            { urls: 'stun:stun.easyvoip.com:3478' },
            { urls: 'stun:stun.efficace-factory.com:3478' },
            { urls: 'stun:stun.einsundeins.com:3478' },
            { urls: 'stun:stun.einsundeins.de:3478' },
            { urls: 'stun:stun.ekiga.net:3478' },
            { urls: 'stun:stun.epygi.com:3478' },
            { urls: 'stun:stun.etoilediese.fr:3478' },
            { urls: 'stun:stun.eyeball.com:3478' },
            { urls: 'stun:stun.faktortel.com.au:3478' },
            { urls: 'stun:stun.freecall.com:3478' },
            { urls: 'stun:stun.freeswitch.org:3478' },
            { urls: 'stun:stun.freevoipdeal.com:3478' },
            { urls: 'stun:stun.fuzemeeting.com:3478' },
            { urls: 'stun:stun.gmx.de:3478' },
            { urls: 'stun:stun.gmx.net:3478' },
            { urls: 'stun:stun.gradwell.com:3478' },
            { urls: 'stun:stun.halonet.pl:3478' },
            { urls: 'stun:stun.hellonanu.com:3478' },
            { urls: 'stun:stun.hoiio.com:3478' },
            { urls: 'stun:stun.hosteurope.de:3478' },
            { urls: 'stun:stun.ideasip.com:3478' },
            { urls: 'stun:stun.imesh.com:3478' },
            { urls: 'stun:stun.infra.net:3478' },
            { urls: 'stun:stun.internetcalls.com:3478' },
            { urls: 'stun:stun.intervoip.com:3478' },
            { urls: 'stun:stun.ipcomms.net:3478' },
            { urls: 'stun:stun.ipfire.org:3478' },
            { urls: 'stun:stun.ippi.fr:3478' },
            { urls: 'stun:stun.ipshka.com:3478' },
            { urls: 'stun:stun.iptel.org:3478' },
            { urls: 'stun:stun.irian.at:3478' },
            { urls: 'stun:stun.it1.hr:3478' },
            { urls: 'stun:stun.ivao.aero:3478' },
            { urls: 'stun:stun.jappix.com:3478' },
            { urls: 'stun:stun.jumblo.com:3478' },
            { urls: 'stun:stun.justvoip.com:3478' },
            { urls: 'stun:stun.kanet.ru:3478' },
            { urls: 'stun:stun.kiwilink.co.nz:3478' },
            { urls: 'stun:stun.kundenserver.de:3478' },
            { urls: 'stun:stun.linea7.net:3478' },
            { urls: 'stun:stun.linphone.org:3478' },
            { urls: 'stun:stun.liveo.fr:3478' },
            { urls: 'stun:stun.lowratevoip.com:3478' },
            { urls: 'stun:stun.lugosoft.com:3478' },
            { urls: 'stun:stun.lundimatin.fr:3478' },
            { urls: 'stun:stun.magnet.ie:3478' },
            { urls: 'stun:stun.manle.com:3478' },
            { urls: 'stun:stun.mgn.ru:3478' },
            { urls: 'stun:stun.mit.de:3478' },
            { urls: 'stun:stun.mitake.com.tw:3478' },
            { urls: 'stun:stun.miwifi.com:3478' },
            { urls: 'stun:stun.modulus.gr:3478' },
            { urls: 'stun:stun.mozcom.com:3478' },
            { urls: 'stun:stun.myvoiptraffic.com:3478' },
            { urls: 'stun:stun.mywatson.it:3478' },
            { urls: 'stun:stun.nas.net:3478' },
            { urls: 'stun:stun.neotel.co.za:3478' },
            { urls: 'stun:stun.netappel.com:3478' },
            { urls: 'stun:stun.netappel.fr:3478' },
            { urls: 'stun:stun.netgsm.com.tr:3478' },
            { urls: 'stun:stun.nfon.net:3478' },
            { urls: 'stun:stun.noblogs.org:3478' },
            { urls: 'stun:stun.noc.ams-ix.net:3478' },
            { urls: 'stun:stun.node4.co.uk:3478' },
            { urls: 'stun:stun.nonoh.net:3478' },
            { urls: 'stun:stun.nottingham.ac.uk:3478' },
            { urls: 'stun:stun.nova.is:3478' },
            { urls: 'stun:stun.nventure.com:3478' },
            { urls: 'stun:stun.on.net.mk:3478' },
            { urls: 'stun:stun.ooma.com:3478' },
            { urls: 'stun:stun.ooonet.ru:3478' },
            { urls: 'stun:stun.oriontelekom.rs:3478' },
            { urls: 'stun:stun.outland-net.de:3478' },
            { urls: 'stun:stun.ozekiphone.com:3478' },
            { urls: 'stun:stun.patlive.com:3478' },
            { urls: 'stun:stun.personal-voip.de:3478' },
            { urls: 'stun:stun.petcube.com:3478' },
            { urls: 'stun:stun.phone.com:3478' },
            { urls: 'stun:stun.phoneserve.com:3478' },
            { urls: 'stun:stun.pjsip.org:3478' },
            { urls: 'stun:stun.poivy.com:3478' },
            { urls: 'stun:stun.powerpbx.org:3478' },
            { urls: 'stun:stun.powervoip.com:3478' },
            { urls: 'stun:stun.ppdi.com:3478' },
            { urls: 'stun:stun.prizee.com:3478' },
            { urls: 'stun:stun.qq.com:3478' },
            { urls: 'stun:stun.qvod.com:3478' },
            { urls: 'stun:stun.rackco.com:3478' },
            { urls: 'stun:stun.rapidnet.de:3478' },
            { urls: 'stun:stun.rb-net.com:3478' },
            { urls: 'stun:stun.refint.net:3478' },
            { urls: 'stun:stun.remote-learner.net:3478' },
            { urls: 'stun:stun.rixtelecom.se:3478' },
            { urls: 'stun:stun.rockenstein.de:3478' },
            { urls: 'stun:stun.rolmail.net:3478' },
            { urls: 'stun:stun.rounds.com:3478' },
            { urls: 'stun:stun.rynga.com:3478' },
            { urls: 'stun:stun.samsungsmartcam.com:3478' },
            { urls: 'stun:stun.schlund.de:3478' },
            { urls: 'stun:stun.services.mozilla.com:3478' },
            { urls: 'stun:stun.sigmavoip.com:3478' },
            { urls: 'stun:stun.sip.us:3478' },
            { urls: 'stun:stun.sipdiscount.com:3478' },
            { urls: 'stun:stun.siplogin.de:3478' },
            { urls: 'stun:stun.sipnet.net:3478' },
            { urls: 'stun:stun.sipnet.ru:3478' },
            { urls: 'stun:stun.siportal.it:3478' },
            { urls: 'stun:stun.sippeer.dk:3478' },
            { urls: 'stun:stun.siptraffic.com:3478' },
            { urls: 'stun:stun.skylink.ru:3478' },
            { urls: 'stun:stun.sma.de:3478' },
            { urls: 'stun:stun.smartvoip.com:3478' },
            { urls: 'stun:stun.smsdiscount.com:3478' },
            { urls: 'stun:stun.snafu.de:3478' },
            { urls: 'stun:stun.softjoys.com:3478' },
            { urls: 'stun:stun.solcon.nl:3478' },
            { urls: 'stun:stun.solnet.ch:3478' },
            { urls: 'stun:stun.sonetel.com:3478' },
            { urls: 'stun:stun.sonetel.net:3478' },
            { urls: 'stun:stun.sovtest.ru:3478' },
            { urls: 'stun:stun.speedy.com.ar:3478' },
            { urls: 'stun:stun.spokn.com:3478' },
            { urls: 'stun:stun.srce.hr:3478' },
            { urls: 'stun:stun.ssl7.net:3478' },
            { urls: 'stun:stun.stunprotocol.org:3478' },
            { urls: 'stun:stun.symform.com:3478' },
            { urls: 'stun:stun.symplicity.com:3478' },
            { urls: 'stun:stun.sysadminman.net:3478' },
            { urls: 'stun:stun.t-online.de:3478' },
            { urls: 'stun:stun.tagan.ru:3478' },
            { urls: 'stun:stun.tatneft.ru:3478' },
            { urls: 'stun:stun.teachercreated.com:3478' },
            { urls: 'stun:stun.tel.lu:3478' },
            { urls: 'stun:stun.telbo.com:3478' },
            { urls: 'stun:stun.telefacil.com:3478' },
            { urls: 'stun:stun.tis-dialog.ru:3478' },
            { urls: 'stun:stun.tng.de:3478' },
            { urls: 'stun:stun.twt.it:3478' },
            { urls: 'stun:stun.u-blox.com:3478' },
            { urls: 'stun:stun.ucallweconn.net:3478' },
            { urls: 'stun:stun.ucsb.edu:3478' },
            { urls: 'stun:stun.ucw.cz:3478' },
            { urls: 'stun:stun.uls.co.za:3478' },
            { urls: 'stun:stun.unseen.is:3478' },
            { urls: 'stun:stun.usfamily.net:3478' },
            { urls: 'stun:stun.veoh.com:3478' },
            { urls: 'stun:stun.vidyo.com:3478' },
            { urls: 'stun:stun.vipgroup.net:3478' },
            { urls: 'stun:stun.virtual-call.com:3478' },
            { urls: 'stun:stun.viva.gr:3478' },
            { urls: 'stun:stun.vivox.com:3478' },
            { urls: 'stun:stun.vline.com:3478' },
            { urls: 'stun:stun.vo.lu:3478' },
            { urls: 'stun:stun.vodafone.ro:3478' },
            { urls: 'stun:stun.voicetrading.com:3478' },
            { urls: 'stun:stun.voip.aebc.com:3478' },
            { urls: 'stun:stun.voip.blackberry.com:3478' },
            { urls: 'stun:stun.voip.eutelia.it:3478' },
            { urls: 'stun:stun.voiparound.com:3478' },
            { urls: 'stun:stun.voipblast.com:3478' },
            { urls: 'stun:stun.voipbuster.com:3478' },
            { urls: 'stun:stun.voipbusterpro.com:3478' },
            { urls: 'stun:stun.voipcheap.co.uk:3478' },
            { urls: 'stun:stun.voipcheap.com:3478' },
            { urls: 'stun:stun.voipfibre.com:3478' },
            { urls: 'stun:stun.voipgain.com:3478' },
            { urls: 'stun:stun.voipgate.com:3478' },
            { urls: 'stun:stun.voipinfocenter.com:3478' },
            { urls: 'stun:stun.voipplanet.nl:3478' },
            { urls: 'stun:stun.voippro.com:3478' },
            { urls: 'stun:stun.voipraider.com:3478' },
            { urls: 'stun:stun.voipstunt.com:3478' },
            { urls: 'stun:stun.voipwise.com:3478' },
            { urls: 'stun:stun.voipzoom.com:3478' },
            { urls: 'stun:stun.vopium.com:3478' },
            { urls: 'stun:stun.voxgratia.org:3478' },
            { urls: 'stun:stun.voxox.com:3478' },
            { urls: 'stun:stun.voys.nl:3478' },
            { urls: 'stun:stun.voztele.com:3478' },
            { urls: 'stun:stun.vyke.com:3478' },
            { urls: 'stun:stun.webcalldirect.com:3478' },
            { urls: 'stun:stun.whoi.edu:3478' },
            { urls: 'stun:stun.wifirst.net:3478' },
            { urls: 'stun:stun.wwdl.net:3478' },
            { urls: 'stun:stun.xs4all.nl:3478' },
            { urls: 'stun:stun.xtratelecom.es:3478' },
            { urls: 'stun:stun.yesss.at:3478' },
            { urls: 'stun:stun.zadarma.com:3478' },
            { urls: 'stun:stun.zadv.com:3478' },
            { urls: 'stun:stun.zoiper.com:3478' },
            { urls: 'stun:stun1.faktortel.com.au:3478' },
            { urls: 'stun:stun1.voiceeclipse.net:3478' },
            { urls: 'stun:stunserver.org:3478' },
            { urls: 'stun:124.64.206.224:8800' },
            { urls: 'stun:stun.nextcloud.com:443' },
            { urls: 'stun:relay.webwormhole.io' },
            { urls: 'stun:stun.flashdance.cx:3478' },

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
        toggleMute,
        toggleVideo,
        socketStatus,
        connectionState: peerConnectionRef.current?.connectionState,
        iceConnectionState: peerConnectionRef.current?.iceConnectionState
    };
};

export default useWebRTC;
