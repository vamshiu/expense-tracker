// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6DRWutKpzMyMxqYuv9G2DXDn1HHUPmFU",
    authDomain: "expense-tracker-15018.firebaseapp.com",
    projectId: "expense-tracker-15018",
    storageBucket: "expense-tracker-15018.appspot.com",
    messagingSenderId: "964915163978",
    appId: "1:964915163978:web:5a7e1253da8701726e47b3",
    measurementId: "G-VDZ4KP334T"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);