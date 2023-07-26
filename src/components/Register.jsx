// import React, { useState } from 'react';
// import { Form, Input, Button, Alert } from 'antd';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, collection, getFirestore } from "firebase/firestore";

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [displayName, setDisplayName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [address, setAddress] = useState('');
//   const [role, setRole] = useState('');
//   const [errorMessage, setErrorMessage] = useState(null);
  
//   const register = async () => {
//     const auth = getAuth();
//     try {
//       const result = await createUserWithEmailAndPassword(auth, email, password);
//       alert('Successfully Registered!');

//       // after successful registration, save the user's data to Firestore
//       const user = result.user;
//       const firestore = getFirestore();
//       if (user) {
//         const userRef = doc(collection(firestore, 'users'), user.uid);
//         const createdAt = new Date();

//         await setDoc(userRef, {
//           displayName,
//           email: user.email,
//           createdAt,
//           phoneNumber,
//           age,
//           gender,
//           address,
//           role,
//         });
//       }
//     } catch (error) {
//       setErrorMessage(`Error registering: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <Form layout="vertical" onFinish={register}>
//         <Form.Item
//           label="Display Name"
//           name="displayName"
//           rules={[{ required: true, message: 'Please input your display name!' }]}
//         >
//           <Input onChange={(e) => setDisplayName(e.target.value)} />
//         </Form.Item>

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[{ required: true, message: 'Please input your email!' }]}
//         >
//           <Input onChange={(e) => setEmail(e.target.value)} />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[{ required: true, message: 'Please input your password!' }]}
//         >
//           <Input.Password onChange={(e) => setPassword(e.target.value)} />
//         </Form.Item>

//         <Form.Item
//           label="Phone Number"
//           name="phoneNumber"
//         >
//           <Input onChange={(e) => setPhoneNumber(e.target.value)} />
//         </Form.Item>

//         <Form.Item
//           label="Age"
//           name="age"
//         >
//           <Input onChange={(e) => setAge(e.target.value)} />
//         </Form.Item>

//         <Form.Item
//           label="Gender"
//           name="gender"
//         >
//           <Input onChange={(e) => setGender(e.target.value)} />
//         </Form.Item>

//         <Form.Item
//           label="Address"
//           name="address"
//         >
//           <Input onChange={(e) => setAddress(e.target.value)} />
//         </Form.Item>

//         <Form.Item
//           label="Role"
//           name="role"
//         >
//           <Input onChange={(e) => setRole(e.target.value)} />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Register
//           </Button>
//         </Form.Item>
//       </Form>
//       {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { Form, Input, Button, Alert, Select } from 'antd';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";

const { Option } = Select;

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('student');
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  
  const register = async () => {
    if ((role === 'admin' && verificationCode !== '123456') || 
        (role === 'student' && verificationCode !== '654321')) {
      setErrorMessage(`Incorrect verification code for ${role}.`);
      return;
    }

    const auth = getAuth();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      alert('Successfully Registered!');

      // after successful registration, save the user's data to Firestore
      const user = result.user;
      const firestore = getFirestore();
      if (user) {
        const userRef = doc(collection(firestore, 'users'), user.uid);
        const createdAt = new Date();

        await setDoc(userRef, {
          displayName,
          email: user.email,
          createdAt,
          phoneNumber,
          age,
          gender,
          address,
          role,
        });
      }
    } catch (error) {
      setErrorMessage(`Error registering: ${error.message}`);
    }
  };
return (
    <div>
      <Form layout="vertical" onFinish={register}>
        <Form.Item
          label="Display Name"
          name="displayName"
          rules={[{ required: true, message: 'Please input your display name!' }]}
        >
          <Input onChange={(e) => setDisplayName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
        >
          <Input onChange={(e) => setPhoneNumber(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
        >
          <Input onChange={(e) => setAge(e.target.value)} />
        </Form.Item>

       <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select your gender!' }]}
        >
          <Select defaultValue="male" onChange={(value) => setGender(value)}>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
        >
          <Input onChange={(e) => setAddress(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Role is required' }]}
        >
          <Select onChange={(value) => setRole(value)}>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="student">Student</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Verification Code"
          name="verificationCode"
          rules={[{ required: true, message: 'Verification code is required' }]}
        >
          <Input onChange={(e) => setVerificationCode(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
    </div>
  );
};

export default Register;