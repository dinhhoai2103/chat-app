import React, { useMemo, useContext, createContext, useState } from "react";
import { AuthContext } from "Context/AuthContext";
import useFirestore from "hooks/useFirestore";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const {
    user: { uid },
  } = useContext(AuthContext);

  const roomsCondition = useMemo(() => {
    if (uid)
      return {
        name: "members",
        operator: "array-contains",
        value: uid,
      };
  }, [uid]);

  const rooms = useFirestore("rooms", roomsCondition);

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId),
    [rooms, selectedRoomId]
  );

  const usersCondition = useMemo(() => {
    if (selectedRoom)
      return {
        name: "uid",
        operator: "in",
        value: selectedRoom?.members || "",
      };
  }, [selectedRoom]);

  const members = useFirestore("users", usersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
