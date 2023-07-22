// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageAnalyzer = () => {
//   const [imageUrl, setImageUrl] = useState('');
//   const [analysis, setAnalysis] = useState(null);

//   const analyzeImage = async () => {
//     try {
//       const response = await axios.post('https://fypvision.ivemobileapp6.repl.co/analyze', { image: imageUrl });
//       setAnalysis(response.data);
//     } catch (error) {
//       console.error('Error analyzing image:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Image Analyzer</h1>
//       <input
//         type="text"
//         placeholder="Enter image URL"
//         value={imageUrl}
//         onChange={e => setImageUrl(e.target.value)}
//       />
//       <button onClick={analyzeImage}>Analyze Image</button>
//       {analysis && (
//         <div>
//           <h2>Analysis Results</h2>
//           <pre>{JSON.stringify(analysis, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageAnalyzer;

// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageAnalyzer = () => {
//   const [imageUrl, setImageUrl] = useState('');
//   const [analysis, setAnalysis] = useState(null);

//   const analyzeImage = async () => {
//     try {
//       const response = await axios.post('https://fypvision.ivemobileapp6.repl.co/analyze', { image: imageUrl });
//       setAnalysis(response.data);
//     } catch (error) {
//       console.error('Error analyzing image:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Image Analyzer</h1>
//       <input
//         type="text"
//         placeholder="Enter image URL"
//         value={imageUrl}
//         onChange={e => setImageUrl(e.target.value)}
//       />
//       <button onClick={analyzeImage}>Analyze Image</button>
      
//       {analysis && (
//         <div>
//           <h2>Analysis Results</h2>

//           <div>
//             <h3>Labels</h3>
//             <ul>
//               {analysis.labels.map((label, index) => (
//                 <li key={index}>{label}</li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3>Landmarks</h3>
//             <ul>
//               {analysis.landmarks.length > 0 ? (
//                 analysis.landmarks.map((landmark, index) => (
//                   <li key={index}>{landmark}</li>
//                 ))
//               ) : (
//                 <li>No landmarks detected</li>
//               )}
//             </ul>
//           </div>

//           <div>
//             <h3>Web Entities</h3>
//             <ul>
//               {analysis.webEntities.map((webEntity, index) => (
//                 <li key={index}>{webEntity}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageAnalyzer;

import React, { useState } from 'react';
import axios from 'axios';

const ImageAnalyzer = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyzeImage = async () => {
    try {
      const response = await axios.post('https://fypvision.ivemobileapp6.repl.co/analyze', { image: imageUrl });
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
  };

  return (
    <div>
      <h1>Image Analyzer</h1>
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
      />
      <button onClick={analyzeImage}>Analyze Image</button>

      {analysis && (
        <div>
          <h2>Analysis Results</h2>

          <div>
            <h3>Image</h3>
            <img src={imageUrl} alt="Analyzed" style={{width: '300px', height: '200px'}} />
          </div>

          <div>
            <h3>Labels</h3>
            <ul>
              {analysis.labels.map((label, index) => (
                <li key={index}>{label}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Landmarks</h3>
            <ul>
              {analysis.landmarks.length > 0 ? (
                analysis.landmarks.map((landmark, index) => (
                  <li key={index}>{landmark}</li>
                ))
              ) : (
                <li>No landmarks detected</li>
              )}
            </ul>
          </div>

          <div>
            <h3>Web Entities</h3>
            <ul>
              {analysis.webEntities.map((webEntity, index) => (
                <li key={index}>{webEntity}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;