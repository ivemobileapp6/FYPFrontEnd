import React, { useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage();

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadCategory, setUploadCategory] = useState("");
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setUploadCategory(event.target.value);
  };
  
  const handleUpload = async () => {
    if (!selectedFile || !uploadCategory) {
      alert("Please select a file and a category before uploading.");
      return;
    }
    
    const storageRef = ref(storage, `${uploadCategory}/${selectedFile.name}`);
    await uploadBytes(storageRef, selectedFile);
    alert("File uploaded successfully!");
  };
  
  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
      />
      <select value={uploadCategory} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        <option value="Grammar">Grammar</option>
        <option value="Tense">Tense</option>
        <option value="Vocab">Vocab</option>
        <option value="Comprehensive">Comprehensive</option>
        <option value="Others">Others</option>
      </select>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;