import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  onSnapshot,
  collection,
  orderBy,
  where,
  query,
} from "firebase/firestore";

const useFirestore = (selectCollection, condition) => {
  const [document, setDocument] = useState([]);
  useEffect(() => {
    let collectionRef;
    if (condition && Object.keys(condition).length > 0) {
      if (!condition.value && !condition.value.length < 1) {
        return;
      }
      collectionRef = query(
        collection(db, selectCollection),
        where(condition.name, condition.operator, condition.value),
        orderBy("createAt")
      );
    } else {
      collectionRef = query(
        collection(db, selectCollection),
        orderBy("createAt")
      );
    }
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocument(data);
    });

    return unsubscribe;
  }, [selectCollection, condition]);
  return document;
};

export default useFirestore;
