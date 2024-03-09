// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5vDSpYIKBE68sZ0_3oydscoPBWhzpGi8",
  authDomain: "class-signup-83094.firebaseapp.com",
  projectId: "class-signup-83094",
  storageBucket: "class-signup-83094.appspot.com",
  messagingSenderId: "981934165216",
  appId: "1:981934165216:web:fc6f1ba3cf35153e639485",
  measurementId: "G-QH9V5HKSTV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);