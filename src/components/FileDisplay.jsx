import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

const categories = ["Grammar", "Tense", "Vocab", "Comprehensive", "Others"];

const FilesDisplay = () => {
  const [fileList, setFileList] = useState({});

  useEffect(() => {
    const fetchFiles = async () => {
      let files = {};

      for (let category of categories) {
        const pathRef = ref(storage, category);
        const res = await listAll(pathRef);
        for (let item of res.items) {
          const url = await getDownloadURL(item);
          if (!files[category]) {
            files[category] = [];
          }
          files[category].push({ name: item.name, url });
        }
      }

      setFileList(files);
    };

    fetchFiles();
  }, []);

  return (
    <div>
      {categories.map(category => (
        <div key={category}>
          <h2>{category}</h2>
          {fileList[category]?.map(file => (
            <p key={file.name}><a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a></p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilesDisplay;