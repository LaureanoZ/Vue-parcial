import {db} from "./firebase.js";

const db = db

const collectionRef = db.collection('shows');
const documentRefs = [
  collectionRef.doc('documento1'),
  collectionRef.doc('documento2'),
  collectionRef.doc('documento3')
];

// Función para obtener los datos de Firestore
async function obtenerDatosFirestore() {
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
obtenerDatosFirestore()
  .then(datos => {
    console.log('Datos obtenidos:', datos);
  })
  .catch(error => {
    console.error('Error al obtener los datos de Firestore:', error);
  });