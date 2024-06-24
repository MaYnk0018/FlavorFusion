import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "writely-d142e.firebaseapp.com",
  projectId: "writely-d142e",
  storageBucket: "writely-d142e.appspot.com",
  messagingSenderId: "399672323636",
  appId: "1:399672323636:web:3d75654072804430caa461",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
