import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const addDocument = (collect, document) => {
  addDoc(collection(db, collect), {
    ...document,
    createdAt: serverTimestamp(),
  });
};
