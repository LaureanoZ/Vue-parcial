import {db} from './firebase.js';
import {setDoc, getDoc, doc} from 'firebase/firestore';

export function createUser(id, {email}) {
    const userRef = doc(db, 'users', id);

    return setDoc(userRef, {
        email
    });
}
export async function getUserById(id) {
    const userRef = doc(db, 'users', id);

    const user = await getDoc(userRef);

    if(!user.exists()) {
        throw new Error('[users.js getUserById] no se encuentra el usuario con el ID indicado');
    }
    return {
        id,
        email: user.data().email,
    }
}
