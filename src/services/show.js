import { db } from "./firebase.js";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

// Obtener un show por id
export const getShow = async (id) => {
  const docRef = doc(db, "shows", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("Doc no encontrado");
  }
};

// const documentRefs = [
//   collectionRef.doc("13cYcIjlWfBSKXu36TZz"),
//   collectionRef.doc("63G4Xdqz91IRnaiza93A"),
//   collectionRef.doc("cf4vlV1mkfrcYQmFAiQm"),
// ];

// Función para obtener los datos de Firestore
export async function getDataFirestore() {
  const querySnapshot = await getDocs(collection(db, "shows"));
  const datos = querySnapshot.docs.map((doc) => doc.data());
  return datos;
}
