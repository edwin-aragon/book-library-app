import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDTR74ABAAidbLo6SAPY_IOKjqNI-9MT-w",
  authDomain: "advancedtopics-d5012.firebaseapp.com",
  projectId: "advancedtopics-d5012",
  storageBucket: "advancedtopics-d5012.firebasestorage.app",
  messagingSenderId: "719636655878",
  appId: "1:719636655878:web:991b2c697b2512a2c67887",
  measurementId: "G-TLNC84YKTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
