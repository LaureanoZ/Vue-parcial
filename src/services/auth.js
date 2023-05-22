import {auth} from "./firebase.js";
import {onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {createUser} from "./users.js";


let user = {
    id: null,
    email: null,
}

onAuthStateChanged(auth, newUser => {
    if(newUser) {
        user = {
            id: newUser.uid,
            email: newUser.email,
        }
    } else {
        user = {
            id: null,
            email: null,
        }
    }

    notifyAll();
});

export async function login({email, password}) {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        const user = credentials.user;
        return {
            id: user.uid,
            email: user.email,
        };  
    } catch (error) {
        console.error("error al autenticar el usuario. ", error);
        throw error;
    }

}

export async function register({email, password}) {
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = credentials.user;
        await createUser(user.uid, {
            email: user.email,
        });

        return {
            id: user.uid,
            email: user.email,
        };

    } catch(err) {
        console.error(err);
        throw err;
    }
}

export function logout() {
    return signOut(auth);
}


let observers = [];

export function subscribeToAuth(callback) {
    observers.push(callback);
    notify(callback);
    return () => observers = observers.filter(obs => obs !== callback);
}

export function notifyAll() {
    observers.forEach(callback => notify(callback));
}

export function notify(callback) {
    callback(user);
}
