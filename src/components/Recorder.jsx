// import React, { useState } from 'react';
// import { ReactMic } from 'react-mic';
// import { storage } from '../Firebase';
// import { getStorage, ref as createRef } from "firebase/storage";


// function Recorder() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [blobURL, setBlobURL] = useState('');

//   const startRecording = () => {
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     setIsRecording(false);
//   };

//   const onData = (recordedBlob) => {
//     // console.log('chunk of real-time data is: ', recordedBlob);
//   };

//   const onStop = (recordedBlob) => {
//     setBlobURL(recordedBlob.blobURL);

//     // Upload blob to Firebase
//     let blob = recordedBlob.blob;
//     var uploadTask = storage.ref('audio/' + recordedBlob.blobURL).put(blob);

//     uploadTask.on('state_changed', 
//       (snapshot) => {
//         // progress function...
//       }, 
//       (error) => {
//         // error function...
//         console.log('Upload error: ', error);
//       }, 
//       () => {
//         // complete function...
//         console.log('Upload complete');
//       }
//     );
//   };

//   return (
//     <div>
//       <ReactMic
//         record={isRecording}
//         className="sound-wave"
//         onStop={onStop}
//         onData={onData}
//         strokeColor="#000000"
//         backgroundColor="#FF4081" 
//       />
//       <button onClick={startRecording} type="button">Start</button>
//       <button onClick={stopRecording} type="button">Stop</button>
//       <br/>
//       <audio src={blobURL} controls="controls" />
//     </div>
//   );
// }

// export default Recorder;

// import React, { useState } from 'react';
// import { ReactMic } from 'react-mic';
// import { storage } from '../Firebase';
// import { ref, uploadBytesResumable } from 'firebase/storage';

// function Recorder() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [blobURL, setBlobURL] = useState('');

//   const startRecording = () => {
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     setIsRecording(false);
//   };

//   const onData = (recordedBlob) => {
//     // console.log('chunk of real-time data is: ', recordedBlob);
//   };

//   const onStop = (recordedBlob) => {
//     setBlobURL(recordedBlob.blobURL);

//     // Upload blob to Firebase
//     let blob = recordedBlob.blob;
//     var storageRef = ref(storage, 'audio/' + recordedBlob.blobURL);
//     var uploadTask = uploadBytesResumable(storageRef, blob);

//     uploadTask.on('state_changed', 
//       (snapshot) => {
//         // progress function...
//       }, 
//       (error) => {
//         // error function...
//         console.log('Upload error: ', error);
//       }, 
//       () => {
//         // complete function...
//         console.log('Upload complete');
//       }
//     );
//   };

//   return (
//     <div>
//       <ReactMic
//         record={isRecording}
//         className="sound-wave"
//         onStop={onStop}
//         onData={onData}
//         strokeColor="#000000"
//         backgroundColor="#FF4081" 
//       />
//       <button onClick={startRecording} type="button">Start</button>
//       <button onClick={stopRecording} type="button">Stop</button>
//       <br/>
//       <audio src={blobURL} controls="controls" />
//     </div>
//   );
// }

// export default Recorder;

import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import { storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const db = getFirestore();

function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();

  const startRecording = () => {
    setIsRecording(true);
    SpeechRecognition.startListening();
  };

  const stopRecording = () => {
    setIsRecording(false);
    SpeechRecognition.stopListening();
  };

  const onData = (recordedBlob) => {
    // console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = (recordedBlob) => {
    setBlobURL(recordedBlob.blobURL);

    // Upload blob to Firebase
    let blob = recordedBlob.blob;
    var storageRef = ref(storage, 'audio/' + recordedBlob.blobURL);
    var uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // progress function...
      }, 
      (error) => {
        // error function...
        console.log('Upload error: ', error);
      }, 
      () => {
        // complete function...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('Uploaded audio available at', downloadURL);
          try {
            const docRef = await addDoc(collection(db, "transcripts"), {
              transcript: transcript,
              audioURL: downloadURL
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          resetTranscript();
        });
      }
    );
  };

  return (
    <div>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081" 
      />
      <button onClick={startRecording} type="button">Start</button>
      <button onClick={stopRecording} type="button">Stop</button>
      <br/>
      <audio src={blobURL} controls="controls" />
      <p>Transcript: {transcript}</p>
    </div>
  );
}

export default Recorder;