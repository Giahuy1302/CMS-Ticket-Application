// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSkYQgJXd4gQCo_Frqk_tQeGLfNgeVjrY",
  authDomain: "cms-ticket-tgh.firebaseapp.com",
  projectId: "cms-ticket-tgh",
  storageBucket: "cms-ticket-tgh.appspot.com",
  messagingSenderId: "264617287572",
  appId: "1:264617287572:web:ff1353820e6c26a37ff981",
  measurementId: "G-EV0JTLV5BZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
