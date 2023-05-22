import { db } from "./firebase.js";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

export const getShow = async (id) => {
  const docRef = doc(db, "shows", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("no se encontro el doc :c");
  }
};

export async function getDataFirestore() {
  const querySnapshot = await getDocs(collection(db, "shows"));
  const datos = querySnapshot.docs.map((doc) => doc.data());
  return datos;
}
