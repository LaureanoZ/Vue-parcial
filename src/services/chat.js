import {db} from "./firebase.js";
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp} from "firebase/firestore";

export function sendMessage(data) {
    const chatRef = collection(db, 'chat');

    return addDoc(chatRef, {
        ...data,
        date: serverTimestamp(),
    })
        .then(() => null)
        .catch(err => {
            console.error('[chat.js sendMessage] Error al enviar el mensaje. ', err);
            throw err;
        });
}
export function subscribeToChatMessages(callback) {
    const chatRef = collection(db, 'chat');
    const q = query(chatRef, orderBy('date'));

    onSnapshot(q, snapshot => {
        const output = [];

        snapshot.forEach(doc => {
            output.push({
                userId: doc.data().userId,
                displayName: doc.data().displayName,
                message: doc.data().message,
                date: doc.data().date?.toDate(),
            });
        });
        callback(output);
    });
}