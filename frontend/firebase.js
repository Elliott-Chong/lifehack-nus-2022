// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVDNj6MP1pL7pPWHV8jUc2C36OJ4l9PW4",
  authDomain: "lifehack-2022-b86b6.firebaseapp.com",
  projectId: "lifehack-2022-b86b6",
  storageBucket: "lifehack-2022-b86b6.appspot.com",
  messagingSenderId: "518474563408",
  appId: "1:518474563408:web:772908be4a5733503a7655",
  measurementId: "G-RHG7YMD2YT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
