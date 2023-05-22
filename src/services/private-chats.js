import {db} from './firebase.js';
import {
    addDoc,
    collection,
    serverTimestamp,
    query,
    where,
    limit,
    getDocs,
    orderBy,
    onSnapshot
}
from "firebase/firestore";

const cache = {};

export async function subscribeToPrivateChat(from, to, callback) {

    const docRef = await getPrivateChatRef(from, to);
    const messagesCollection = collection(db, 'private-chats', docRef.id, 'messages');

    const q = query(
        messagesCollection,
        orderBy('created_at')
    );

    return onSnapshot(q, snapshot => {
        const docs = snapshot.docs.map(doc => {
            return {
                userId: doc.data().userId,
                message: doc.data().message,
                created_at: doc.data().created_at?.toDate(),
            }
        });

        callback(docs);
    });
}

export async function sendPrivateMessage(from, to, message) {
    const docRef = await getPrivateChatRef(from, to);

    const messagesRef = collection(db, 'private-chats', docRef.id, 'messages');

    const messageRef = await addDoc(messagesRef, {
        userId: from,
        message,
        created_at: serverTimestamp(),
    });

    return true;
}

async function getPrivateChatRef(user1, user2) {

    const cachedRef = getFromCache(user1, user2);
    if(cachedRef) return cachedRef;

    const chatRef = collection(db, 'private-chats');

    const users = {
        [user1]: true,
        [user2]: true,
    }

    const q = query(
        chatRef,
        where('users', '==', users),
        limit(1),
    );

    const chatSnap = await getDocs(q);

    if(chatSnap.empty) {
        const newRef = await addDoc(chatRef, {
            users: {
                [user1]: true,
                [user2]: true,
            }
        });
        addToCache(user1, user2, newRef);
        return newRef;
    }

    addToCache(user1, user2, chatSnap.docs[0]);
    return chatSnap.docs[0];
}

function getCacheKey(from, to) {
    return from < to ?
         from + to :
         to + from
}

function getFromCache(from, to) {
    return cache[getCacheKey(from, to)];
}

function addToCache(from, to, ref) {
    cache[getCacheKey(from, to)] = ref;
}
