// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqorDb5VfwxzVE4nlp3-CaqaX5GQ2NyOY",
  authDomain: "shapefyp-11800.firebaseapp.com",
  projectId: "shapefyp-11800",
  storageBucket: "shapefyp-11800.appspot.com",
  messagingSenderId: "750324324365",
  appId: "1:750324324365:web:9a00ef063109dc88ffdd44",
  measurementId: "G-MRVZ63ZYFW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export { auth, firestore, googleProvider,storage };