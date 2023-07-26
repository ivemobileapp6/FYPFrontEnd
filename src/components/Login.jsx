// import React, { useEffect, useState } from 'react';
// import { auth, googleProvider, firestore } from '../Firebase';
// import { signInWithPopup, signOut } from 'firebase/auth';
// import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
// import { Button, Form, Input, Select, Space } from 'antd';

// const saveUserDetails = async (user, setIsNewUser) => {
//   const userRef = doc(collection(firestore, 'users'), user.uid);
//   const userDocSnap = await getDoc(userRef);

//   if (!userDocSnap.exists()) {
//     setIsNewUser(true);
//   } else {
//     setIsNewUser(false);
//   }

//   return userRef;
// };

// const Login = (props) => {
//   const [user, setUser] = useState(null);
//   const [isNewUser, setIsNewUser] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [address, setAddress] = useState('');
//   const [role, setRole] = useState('student');
//   const [adminCode, setAdminCode] = useState('');
//   const [studentCode, setStudentCode] = useState('');

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const signInWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       await saveUserDetails(user, setIsNewUser);
//       props.onLoginSuccess();
//     } catch (error) {
//       console.error('Error signing in with Google:', error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   const submitAdditionalInfo = async (e) => {
//     e.preventDefault();

//     if (role === 'admin' && adminCode !== '123456') {
//       alert('Incorrect admin code.');
//       return;
//     }

//     if (role === 'student' && studentCode !== '654321') {
//       alert('Incorrect student code.');
//       return;
//     }

//     if (user) {
//       const userRef = doc(collection(firestore, 'users'), user.uid);
//       const createdAt = new Date();
//       const { displayName, email } = user;

//       await setDoc(userRef, {
//         displayName,
//         email,
//         createdAt,
//         phoneNumber,
//         age,
//         gender,
//         address,
//         role,
//       });
//     }

//     setIsNewUser(false);
//   };

//   return (
//     <div>
//       {user ? (
//         isNewUser ? (
//           <form onSubmit={submitAdditionalInfo}>
//             <label>
//               Phone Number:
//               <input
//                 type="text"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />
//             </label>
//             <label>
//               Age:
//               <input
//                 type="number"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//               />
//             </label>
//             <label>
//               Gender:
//               <select value={gender} onChange={(e) => setGender(e.target.value)}>
//                 <option value="">Select</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </label>
//             <label>
//               Address:
//               <input
//                 type="text"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//             </label>
//             <label>
//               Role:
//               <select value={role} onChange={(e) => setRole(e.target.value)}>
//                 <option value="student">Student</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </label>
//             {role === 'admin' && (
//               <label>
//                 Admin Code:
//                 <input
//                   type="password"
//                   value={adminCode}
//                   onChange={(e) => setAdminCode(e.target.value)}
//                 />
//               </label>
//             )}
//             {role === 'student' && (
//               <label>
//                 Student Code:
//                 <input
//                   type="password"
//                   value={studentCode}
//                   onChange={(e) => setStudentCode(e.target.value)}
//                 />
//               </label>
//             )}
//             <button type="submit">Submit</button>
//           </form>
//         ) : (
//           <>
//             <p>
//               Welcome, {user.displayName} ({user.email})
//             </p>
//             <button onClick={logout}>Sign Out</button>
//           </>
//         )
//       ) : (
//         <button onClick={signInWithGoogle}>Sign in with Google</button>
//       )}
//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useState } from 'react';
import { auth, googleProvider, firestore } from '../Firebase';
import { signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Button, Form, Input, Select, Space } from 'antd';
import styles from './Login.module.css';

const saveUserDetails = async (user, setIsNewUser) => {
  const userRef = doc(collection(firestore, 'users'), user.uid);
  const userDocSnap = await getDoc(userRef);

  if (!userDocSnap.exists()) {
    setIsNewUser(true);
  } else {
    setIsNewUser(false);
  }

  return userRef;
};

const Login = (props) => {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('student');
  const [adminCode, setAdminCode] = useState('');
  const [studentCode, setStudentCode] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await saveUserDetails(user, setIsNewUser);
      props.onLoginSuccess();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signInWithEmail = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await saveUserDetails(user, setIsNewUser);
      props.onLoginSuccess();
    } catch (error) {
      console.error('Error signing in with email:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const submitAdditionalInfo = async (e) => {
    e.preventDefault();

    if (role === 'admin' && adminCode !== '123456') {
      alert('Incorrect admin code.');
      return;
    }

    if (role === 'student' && studentCode !== '654321') {
      alert('Incorrect student code.');
      return;
    }

    if (user) {
      const userRef = doc(collection(firestore, 'users'), user.uid);
      const createdAt = new Date();
      const { displayName, email } = user;

      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        phoneNumber,
        age,
        gender,
        address,
        role,
      });
    }

    setIsNewUser(false);
  };

  return (
  <div className={styles.container}>
    {user ? (
      isNewUser ? (
        <Form className={styles.userInfoForm} form={form} layout="vertical" autoComplete="off" onSubmitCapture={submitAdditionalInfo}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number:"
              rules={[{ required: true, message: 'Phone number is required' }]}
            >
              <Input onChange={(e) => setPhoneNumber(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="age"
              label="Age:"
              rules={[{ required: true, message: 'Age is required' }]}
            >
              <Input onChange={(e) => setAge(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender:"
              rules={[{ required: true, message: 'Gender is required' }]}
            >
              <Select onChange={(value) => setGender(value)}>
                <Select.Option value="male">male</Select.Option>
                <Select.Option value="female">female</Select.Option>
                <Select.Option value="other">other</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="address"
              label="Address:"
              rules={[{ required: true, message: 'Address is required' }]}
            >
              <Input onChange={(e) => setAddress(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role:"
              rules={[{ required: true, message: 'Role is required' }]}
            >
              <Select onChange={(value) => setRole(value)}>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="student">Student</Select.Option>
              </Select>
            </Form.Item>

            {role && (
              <Form.Item
                name={role === 'admin' ? "adminCode" : "studentCode"}
                label={role === 'admin' ? "Admin Code:" : "Student Code:"}
                rules={[{ required: true, message: `${role === 'admin' ? "Admin" : "Student"} code is required` }]}
              >
                <Input onChange={(e) => role === 'admin' ? setAdminCode(e.target.value) : setStudentCode(e.target.value)} />
              </Form.Item>
            )}

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button htmlType="reset">Reset</Button>
              </Space>
            </Form.Item>
          </Form>
      ) : (
        <>
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>
          <Button onClick={logout}>Sign Out</Button>
        </>
      )
    ) : (
      <div className={styles.loginContainer}>
        <div className={styles.loginMethods}>
          <div>
            <Button className={styles.loginButton} onClick={signInWithGoogle}>Sign in with Google</Button>
          </div>
          <p className={styles.orText}>or</p>
          <Form className={styles.emailForm} layout="vertical" autoComplete="off" onSubmitCapture={signInWithEmail}>
            <Form.Item
              name="email"
              label="Email:"
              rules={[{ required: true, message: 'Email is required' }]}
            >
              <Input className={styles.inputField} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password:"
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input.Password className={styles.inputField} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Sign In</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )}
  </div>
);
};

export default Login;