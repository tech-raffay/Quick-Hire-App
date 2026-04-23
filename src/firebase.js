import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC9_NJBxk50Cyo8GNo5bDa1BEA8q0xlXbg",
  authDomain: "quick-hire-app-ce551.firebaseapp.com",
  projectId: "quick-hire-app-ce551",
  storageBucket: "quick-hire-app-ce551.firebasestorage.app",
  messagingSenderId: "269737352813",
  appId: "1:269737352813:web:108a9c337dda5c72156964",
  measurementId: "G-CXBR4M1RZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
