// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrjRJGwv3TsSJg-2AQDQYic1uJG4QP4z4",
  authDomain: "olx-clone-e033c.firebaseapp.com",
  projectId: "olx-clone-e033c",
  storageBucket: "olx-clone-e033c.appspot.com",
  messagingSenderId: "519017752486",
  appId: "1:519017752486:web:e6f41ad6df5dd072dd9167",
  measurementId: "G-XQQRB0W0F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app); 
export const auth = getAuth()