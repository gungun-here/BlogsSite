import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCP-9aY1JWDXvioX5Ie2jiKjELTo7lVxeg",
  authDomain: "blogs-6eba8.firebaseapp.com",
  projectId: "blogs-6eba8",
  storageBucket: "blogs-6eba8.firebasestorage.app",
  messagingSenderId: "229981065952",
  appId: "1:229981065952:web:f68d212eb129867cd2f685",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In Function
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Google Sign-Out Function
export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
    }
};

export { auth, provider };
