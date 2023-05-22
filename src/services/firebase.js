import { initializeApp } from "firebase/app";
import {
    getFirestore,
} from "firebase/firestore";
import {
    getAuth,
} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAt0JhDwIbw-0vvJ9CawJtZGyEw3trCY6I",
    authDomain: "dos-magos.firebaseapp.com",
    projectId: "dos-magos",
    storageBucket: "dos-magos.appspot.com",
    messagingSenderId: "105983377524",
    appId: "1:105983377524:web:4b39051a65cfa2e75d1121"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
export {app, db, auth};