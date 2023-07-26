// import React, { useState, useEffect } from 'react';
// import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
// import { firestore, auth } from '../Firebase';

// const UserList = () => {
//   const [user, setUser] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userRef = doc(collection(firestore, 'users'), user.uid);
//         const userDocSnap = await getDoc(userRef);
//         const userData = userDocSnap.data();
//         setUserRole(userData?.role);
//       } else {
//         setUserRole(null);
//       }
//       setUser(user);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const usersCollection = collection(firestore, 'users');
//       const userDocs = await getDocs(usersCollection);
//       const userList = userDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//       setUsers(userList);
//     };

//     fetchUsers();
//   }, []);

//   if (userRole !== 'admin') {
//     return (
//       <div>
//         <h2>Access Denied</h2>
//         <p>You must be an admin to view this page.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>User List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Age</th>
//             <th>Gender</th>
//             <th>Address</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.displayName}</td>
//               <td>{user.email}</td>
//               <td>{user.phoneNumber}</td>
//               <td>{user.age}</td>
//               <td>{user.gender}</td>
//               <td>{user.address}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;

import React, { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { firestore, auth } from '../Firebase';
import { Table, Tag, Space } from 'antd';

const UserList = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'displayName',
      key: 'displayName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => {
        let color = gender.toLowerCase() === 'male' ? 'blue' : 'pink';
        return (
          <Tag color={color} key={gender}>
            {gender.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, 'users', id));
    setUsers(users.filter(user => user.id !== id));
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(collection(firestore, 'users'), user.uid);
        const userDocSnap = await getDoc(userRef);
        const userData = userDocSnap.data();
        setUserRole(userData?.role);
      } else {
        setUserRole(null);
      }
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(firestore, 'users');
      const userDocs = await getDocs(usersCollection);
      const userList = userDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id, key: doc.id }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  if (userRole !== 'admin') {
    return (
      <div>
        <h2>Access Denied</h2>
        <p>You must be an admin to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>User List</h2>
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export default UserList;