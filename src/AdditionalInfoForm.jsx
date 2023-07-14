import React, { useState } from 'react';
import { firestore } from './Firebase';
import { doc, setDoc, collection } from 'firebase/firestore';

const AdditionalInfoForm = ({ user, onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userRef = doc(collection(firestore, 'users'), user.uid);
    await setDoc(userRef, {
      phoneNumber,
      address,
      gender,
      age
    }, { merge: true });

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div>
        <label>Gender:</label>
        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
      </div>
      <div>
        <label>Age:</label>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AdditionalInfoForm;