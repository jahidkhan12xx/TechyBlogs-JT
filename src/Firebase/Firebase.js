// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzBKC0sHmC5-s-zEDotfWWBP4s0BXgwTk",
  authDomain: "blogs-42f37.firebaseapp.com",
  projectId: "blogs-42f37",
  storageBucket: "blogs-42f37.appspot.com",
  messagingSenderId: "443768099794",
  appId: "1:443768099794:web:064f0018e522134010ae0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;