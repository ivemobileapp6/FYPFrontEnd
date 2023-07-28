// import React, { useState, useEffect } from 'react';

// const GoogleTranslate = () => {
//   const [textToTranslate, setTextToTranslate] = useState('');
//   const [targetLanguage, setTargetLanguage] = useState('en');
//   const [translatedText, setTranslatedText] = useState('');
//   const GOOGLE_TRANSLATE_API_KEY = 'AIzaSyAyDypLnqV7uUGL_OVrnWPe7DI6mPS_xcs';

//   useEffect(() => {
//     const translate = async () => {
//       try {
//         const response = await fetch(
//           `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               q: textToTranslate,
//               target: targetLanguage,
//             }),
//           }
//         );

//         const data = await response.json();
//         setTranslatedText(data.data.translations[0].translatedText);
//       } catch (error) {
//         console.error('Error translating text:', error);
//       }
//     };

//     if (textToTranslate && targetLanguage) {
//       translate();
//     }
//   }, [textToTranslate, targetLanguage]);

//   const handleTextChange = (event) => {
//     setTextToTranslate(event.target.value);
//   };

//   const handleLanguageChange = (event) => {
//     setTargetLanguage(event.target.value);
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'top', height: '100vh' }}>
//       <textarea value={textToTranslate} onChange={handleTextChange} placeholder="Enter text to translate" style={{ marginBottom: '1rem' ,width: "624px", height: "245px"}} />
//       <select value={targetLanguage} onChange={handleLanguageChange}>
//         <option value="en">English</option>
//         <option value="zh-TW">Traditional Chinese</option>
//       </select>
//       <textarea value={translatedText} readOnly style={{ marginTop: '1rem', marginBottom: '1rem' ,width: "624px", height: "245px"}} />
//     </div>
//   );
// };

// export default GoogleTranslate;

import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const GoogleTranslate = () => {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [translatedText, setTranslatedText] = useState('');
  const GOOGLE_TRANSLATE_API_KEY = 'AIzaSyAyDypLnqV7uUGL_OVrnWPe7DI6mPS_xcs';

  useEffect(() => {
    const translate = async () => {
      try {
        const response = await fetch(
          `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              q: textToTranslate,
              target: targetLanguage,
            }),
          }
        );

        const data = await response.json();
        setTranslatedText(data.data.translations[0].translatedText);
      } catch (error) {
        console.error('Error translating text:', error);
      }
    };

    if (textToTranslate && targetLanguage) {
      translate();
    }
  }, [textToTranslate, targetLanguage]);

  const handleTextChange = (event) => {
    setTextToTranslate(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'top', height: '100vh' }}>
      <TextArea
        value={textToTranslate}
        onChange={handleTextChange}
        placeholder="Enter text to translate"
        style={{ marginBottom: '1rem', width: "624px", height: "245px", resize: 'none' }}
      />
      <select value={targetLanguage} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="zh-TW">Traditional Chinese</option>
      </select>
      <TextArea
        value={translatedText}
        readOnly
        style={{ marginTop: '1rem', marginBottom: '1rem', width: "624px", height: "245px", resize: 'none' }}
      />
    </div>
  );
};

export default GoogleTranslate;