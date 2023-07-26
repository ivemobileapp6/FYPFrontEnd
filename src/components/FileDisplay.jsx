// import React, { useEffect, useState } from 'react';
// import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
// import { Avatar, List } from 'antd';

// const storage = getStorage();

// const categories = ["Grammar", "Tense", "Vocab", "Comprehensive"];

// const FilesDisplay = () => {
//   const [fileList, setFileList] = useState({});

//   useEffect(() => {
//     const fetchFiles = async () => {
//       let files = {};

//       try {
//         for (let category of categories) {
//           const pathRef = ref(storage, category);
//           const res = await listAll(pathRef);
//           for (let item of res.items) {
//             const url = await getDownloadURL(item);
//             if (!files[category]) {
//               files[category] = [];
//             }
//             files[category].push({ name: item.name, url });
//           }
//         }

//         setFileList(files);

//         // This will log the fileList to the console
//         console.log(files);
//       } catch (error) {
//         // Log any errors that occur during fetching
//         console.error("Error fetching files: ", error);
//       }
//     };

//     fetchFiles();
//   }, []);

//   return (
//     <div>
//       {categories.map(category => (
//         <div key={category}>
//           <h2>{category}</h2>
//           {fileList[category]?.map(file => (
//             <p key={file.name}><a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a></p>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FilesDisplay;

import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { List, Avatar } from 'antd';

const storage = getStorage();

const categories = ["Grammar", "Tense", "Vocab", "Comprehensive"];

const FilesDisplay = () => {
  const [fileList, setFileList] = useState({});

  useEffect(() => {
    const fetchFiles = async () => {
      let files = {};

      try {
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
      } catch (error) {
        console.error("Error fetching files: ", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      {categories.map(category => (
        <div key={category}>
          <h2>{category}</h2>
          <List
            itemLayout="horizontal"
            dataSource={fileList[category]}
            renderItem={(file, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                  title={<a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>}
                  
                />
              </List.Item>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default FilesDisplay;