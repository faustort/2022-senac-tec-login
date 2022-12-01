// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3UVcaczUWfwer95NVeeUcK8OUGA8C2YE",
  authDomain: "aulalogin-d5802.firebaseapp.com",
  projectId: "aulalogin-d5802",
  storageBucket: "aulalogin-d5802.appspot.com",
  messagingSenderId: "714648588663",
  appId: "1:714648588663:web:2387d113db1ffdb4edd172",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
