import { atom, selector } from 'recoil'


export const ChatAtoms = atom({
    key: 'ChatAtom',
    default: []

})

export const textAtom = atom({
    key: "textAtom",
    default: ''
});

export const textSeloctor = selector({
    key: "textSeloctor",
    get: ({get }) => {
        const value = get(textAtom)
        return value;
    }
})


export const callAtom = atom({
    key:"callAtom",
    default:(id) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((mediaStream) => {
            // Setting the local video stream
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();
    
            // Making the call to the remote peer
            const call = peerInstance.current.call(remotePeerId, mediaStream);
    
            // Handling the remote stream
            call.on('stream', (remoteStream) => {
              setPeers((prevPeers) => [
                ...prevPeers,
                { peerId: remotePeerId, stream: remoteStream },
              ]);
            });
    
            // Creating a data connection for chat
            const conn = peerInstance.current.connect(remotePeerId);
            conn.on('data', (data) => {
              setChat((prevChat) => [...prevChat, { sender: 'remote', message: data }]);
            });
          })
          .catch((error) => {
            console.error('Error accessing media devices.', error);
          });
      }
    
})


export const CreateidAtom = atom({
  key:"createidAtom",
  default :{
    yourName:null,
    id:null
}
})

export const JoinidAtom = atom({
  key:"JoinidAtom",
  default :{
      yourName:null,
      id:null
  }
})

export const ProfileUpdateAtmon = atom({
    key:"ProfileUpdateAtmon",
    default:[]
})