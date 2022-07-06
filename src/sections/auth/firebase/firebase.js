// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBv7_Xqd-BIZBDGEgXI0KrmOCLHFiC7yak",
  authDomain: "redomeire-portfo-1656426174727.firebaseapp.com",
  projectId: "redomeire-portfo-1656426174727",
  storageBucket: "redomeire-portfo-1656426174727.appspot.com",
  messagingSenderId: "1041185175786",
  appId: "1:1041185175786:web:96387ee0ac3791e3de3f93",
  measurementId: "G-NFXTH2KNCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const colRef = collection(db, 'projects');

export { analytics, db, app, colRef };