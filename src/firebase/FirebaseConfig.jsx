// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4LRxqTxYdfyykPXepBh2-sfDp3o7J6xI",
    authDomain: "myecom-eb265.firebaseapp.com",
    projectId: "myecom-eb265",
    storageBucket: "myecom-eb265.firebasestorage.app",
    messagingSenderId: "1056781631003",
    appId: "1:1056781631003:web:48bb495348e3c106a2c2be"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }