// PeerReview.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import { storage, firestore } from '../Firebase';
import 'react-quill/dist/quill.snow.css';
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import mammoth from 'mammoth';

const PeerReview = () => {
  const [files, setFiles] = useState([]);
  const [fileContent, setFileContent] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => setFileContent(e.target.result);
        reader.readAsText(file);
      } else {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target.result;
          try {
            const result = await mammoth.convertToHtml({ arrayBuffer });
            setFileContent(result.value);
          } catch (error) {
            console.error('Error converting Word file to HTML:', error);
          }
        };
        reader.readAsArrayBuffer(file);
      }

      reasonml
      Copy
      setFiles([...files, file.name]);

      // Upload file to Firebase Storage
      const fileRef = ref(storage, file.name);
      await uploadBytes(fileRef, file);

      // Save file details in Firestore
      await addDoc(collection(firestore, 'files'), {
        name: file.name,
        createdAt: serverTimestamp(),
      });
    },
  });

  const handleSubmitReview = async () => {
    // Save the review in Firestore
    await addDoc(collection(firestore, 'reviews'), {
      content: fileContent,
      createdAt: serverTimestamp(),
    });
    alert('Review submitted successfully!');
  };

  return (
    <div>
      <h2>Drag and drop</h2>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #999',
          borderRadius: '5px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag and drop a text file here, or click to select a file.</p>
        )}
      </div>
      {files.length > 0 && (
        <>
          <h3>Selected File:</h3>
          <ul>
            {files.map((file) => (
              <li key={file}>{file}</li>
            ))}
          </ul>
        </>
      )}
      <h3>Document Content:</h3>
      <ReactQuill value={fileContent} onChange={setFileContent} />
      <button onClick={handleSubmitReview} style={{ marginTop: '20px' }}>
        Submit Review
      </button>
    </div>
  );
};

export default PeerReview; 