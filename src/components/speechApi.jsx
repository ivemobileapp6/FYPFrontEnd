// const apiKey = 'AIzaSyDPsrC41ibtFkbrg79kTw4F7GTyWz75EEw';

// export const recognizeSpeech = async (audioBlob) => {
//   const apiUrl = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;

//   const audioData = new Uint8Array(await audioBlob.arrayBuffer());
//   const requestData = {
//     config: {
//       encoding: 'LINEAR16',
//       sampleRateHertz: 48000,
//       languageCode: 'en-US',
//     },
//     audio: {
//       content: btoa(String.fromCharCode(...audioData)),
//     },
//   };

//   const response = await fetch(apiUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(requestData),
//   });

//   const result = await response.json();
//   return result.results ? result.results[0].alternatives[0].transcript : '';
// };

const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const apiKey = 'AIzaSyDPsrC41ibtFkbrg79kTw4F7GTyWz75EEw';

export const recognizeSpeech = async (audioBlob) => {
  const apiUrl = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;

  const audioData = new Uint8Array(await audioBlob.arrayBuffer());
  const requestData = {
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 48000,
      languageCode: 'en-US',
    },
    audio: {
      content: arrayBufferToBase64(audioData),
    },
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  const result = await response.json();
  if (!result.results) {
    console.error('Unexpected API response:', result);
    return '';
  }

  return result.results[0].alternatives[0].transcript;
};