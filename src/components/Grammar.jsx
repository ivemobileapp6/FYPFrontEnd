import React, { useState, useEffect } from 'react';
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, collection } from 'firebase/firestore';
import { auth, firestore } from '../Firebase'; 

console.log(GrammarlyEditorPlugin);

export function GrammarlyEditor() {
  const [userRole, setUserRole] = useState(null);

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
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (userRole !== 'admin' && userRole !== 'student') {
    return (
      <div>
        <h2>Access Denied</h2>
        <p>You must be an admin to view this page.</p>
      </div>
    );
  }

  return (
    <GrammarlyEditorPlugin clientId="client_H7Tjue6A8G5UxYzVHRnBxB">
      <textarea />
    </GrammarlyEditorPlugin>
  );
}