// /Config/auth.js

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, onAuthStateChanged } from './firebase';

// Sign in user
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

// Sign out user
export const logoutUser = async () => {
    try {
        await signOut(auth);
        console.log("User logged out successfully.");
    } catch (error) {
        console.error("Sign-out error:", error);
        throw error;
    }
};

// Track authentication state
export const trackAuthState = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};
