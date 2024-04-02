// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBntu7X-QKVa1c0SVeElV3o5NG7LmhED50",
  authDomain: "second-firebase-project-16afe.firebaseapp.com",
  projectId: "second-firebase-project-16afe",
  storageBucket: "second-firebase-project-16afe.appspot.com",
  messagingSenderId: "424835347532",
  appId: "1:424835347532:web:c1ccdd2e1ec20575a2b0e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;