// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLMpdUSl_wQwCyX8AQRERKFF7pj3fYHWg",
  authDomain: "chatapp-28c9a.firebaseapp.com",
  projectId: "chatapp-28c9a",
  storageBucket: "chatapp-28c9a.appspot.com",
  messagingSenderId: "451750570690",
  appId: "1:451750570690:web:c44be4946fdc60e06be95b",
  measurementId: "G-M16E8CEYW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)