import React, { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { firestore, auth } from '../Firebase';
import './UserList.css';

const UserList = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);

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
      const userList = userDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;