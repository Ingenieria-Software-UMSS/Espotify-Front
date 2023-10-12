// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDUO6s9lfzj40FO_hl7fbwFX0-Jgfvyzg",
  authDomain: "appmusica-ca3de.firebaseapp.com",
  projectId: "appmusica-ca3de",
  storageBucket: "appmusica-ca3de.appspot.com",
  messagingSenderId: "168843188657",
  appId: "1:168843188657:web:8c007960d2b36448a40590"
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);