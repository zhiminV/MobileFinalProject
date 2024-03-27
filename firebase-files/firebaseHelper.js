import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, col, docId) {
  try {
    if (docId) {
      await addDoc(collection(database, col, docId), data);
    } else {
      await addDoc(collection(database, col), data);
    }
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

export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(database, "goals", id));
  } catch (err) {
    console.log(err);
  }
}