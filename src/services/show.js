import {db} from "./firebase.js";


const collectionRef = db.collection('shows');
const documentRefs = [
  collectionRef.doc('13cYcIjlWfBSKXu36TZz'),
  collectionRef.doc('63G4Xdqz91IRnaiza93A'),
  collectionRef.doc('cf4vlV1mkfrcYQmFAiQm')
];

// Función para obtener los datos de Firestore
export async function getDataFirestore() {
  try {
    const datos = [];

    // Obtiene los documentos uno por uno
    for (const documentRef of documentRefs) {
      const documentSnapshot = await documentRef.get();

      // Verifica si el documento existe
      if (documentSnapshot.exists) {
        const documentData = documentSnapshot.data();
        datos.push(documentData);
      } else {
        console.log(`El documento ${documentRef.id} no existe.`);
      }
    }

    return datos;
  } catch (error) {
    console.error('Error al obtener los datos de Firestore:', error);
    throw error;
  }
}

// Ejecuta la función para obtener los datos
// getDataFirestore()
//   .then(datos => {
//     console.log('Datos obtenidos:', datos);
//   })
//   .catch(error => {
//     console.error('Error al obtener los datos de Firestore:', error);
//   });