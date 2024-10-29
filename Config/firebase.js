// /Config/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { enableIndexedDbPersistence, getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBXGfxuJPQZ_tmY9CVF129FjUDnIIkdrsM",
    authDomain: "rmatch-54ff8.firebaseapp.com",
    projectId: "rmatch-54ff8",
    storageBucket: "rmatch-54ff8.appspot.com",
    messagingSenderId: "765482684093",
    appId: "1:765482684093:web:cd5e3ac2cef31afb2871d4",
    measurementId: "G-WE4SFX4VF2"
};



// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable Firestore offline persistence
enableIndexedDbPersistence(db)
.then(() => {
  console.log("persistence enabled.");
})
.catch((error) => {
if (error.code === 'failed-precondition') {
    console.error("Failed precondition: Multiple tabs open, persistence can only be enabled in one tab at a time.");
} else if (error.code === 'unimplemented') {
    console.error("Persistence is not available in this browser.");
}
});


  // Enable authentication persistence across sessions
setPersistence(auth, browserLocalPersistence)
.then(() => {
  console.log("Auth persistence enabled.");
})
.catch((error) => {
  console.error("Error enabling Auth persistence:", error);
});


export { app, auth, db, firebaseConfig, onAuthStateChanged };

