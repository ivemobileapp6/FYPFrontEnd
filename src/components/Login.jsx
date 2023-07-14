// import React, { useEffect, useState } from 'react';
// import { auth, googleProvider, firestore } from '../Firebase';
// import { signInWithPopup, signOut } from 'firebase/auth';
// import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';

// const saveUserDetails = async (user, setIsNewUser) => {
//   const userRef = doc(collection(firestore, 'users'), user.uid);
//   const userDocSnap = await getDoc(userRef);

//   if (!userDocSnap.exists()) {
//     setIsNewUser(true);

//     // Set the role to "student" for new users only
//     await setDoc(userRef, {
//       ...userDocSnap.data(),
//       role: 'student',
//     });
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
//         role: 'student', // Include the role when saving the additional information
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
import { signInWithPopup, signOut } from 'firebase/auth';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

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
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('student');
  const [adminCode, setAdminCode] = useState('');

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
    <div>
      {user ? (
        isNewUser ? (
          <form onSubmit={submitAdditionalInfo}>
            <label>
              Phone Number:
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
            <label>
              Age:
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label>
              Gender:
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>
              Address:
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label>
              Role:
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            {role === 'admin' && (
              <label>
                Admin Code:
                <input
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                />
              </label>
            )}
            <button type="submit">Submit</button>
          </form>
        ) : (
          <>
            <p>
              Welcome, {user.displayName} ({user.email})
            </p>
            <button onClick={logout}>Sign Out</button>
          </>
        )
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Login;