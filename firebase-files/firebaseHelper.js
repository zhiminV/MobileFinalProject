import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, col, docId) {
  try {
    if (docId) {
      docRef =await addDoc(collection(database, col, docId), data);
    } else {
      docRef = await addDoc(collection(database, col), data);
    }
    return docRef;
  } catch (err) {
    console.log("Error at Write: ", err.code);
  }
}

export async function getAllDocs(path) {
  try {
    const querySnapshot = await getDocs(collection(database, path));
    let newArray = [];
    querySnapshot.forEach((doc) => {
      newArray.push(doc.data());
      console.log(doc.data());
    });
    return newArray;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(col,id) {
  try {
    await deleteDoc(doc(database, col, id));
  } catch (err) {
    console.log(err);
  }
}

export async function fetchInfoById(col,docId) {
  const docRef = doc(database, col, docId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { docId: docSnap.id, ...docSnap.data() }; 
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
    throw new Error(error);
  }
}

export async function updateFromDB(col,id,newData){
  try{
    await updateDoc(doc(database,col,id),newData);
  }
  catch(err){
    console.log(err); 
  }
}