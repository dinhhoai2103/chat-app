import React, { useMemo, useContext, createContext } from "react";
import { AuthContext } from "Context/AuthContext";
import useFirestore from "hooks/userFirestore";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const {
    user: { uid },
  } = useContext(AuthContext);
  const roomsCondition = useMemo(() => {
    return {
      name: "members",
      operator: "array-contains",
      value: uid,
    };
  }, [uid]);
  const rooms = useFirestore("rooms", roomsCondition);

  return (
    <AppContext.Provider value={{ rooms }}>{children}</AppContext.Provider>
  );
}
