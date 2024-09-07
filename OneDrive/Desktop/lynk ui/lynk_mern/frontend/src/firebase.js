// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCZW6nr0YKXKALQTe96JLyPERMwolqQC1A",
  authDomain: "lync-7310d.firebaseapp.com",
  projectId: "lync-7310d",
  storageBucket: "lync-7310d.appspot.com",
  messagingSenderId: "876704864709",
  appId: "1:876704864709:web:6a5ece9b5b9d75b9a913ac",
  measurementId: "G-5QV8F3XH6L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);