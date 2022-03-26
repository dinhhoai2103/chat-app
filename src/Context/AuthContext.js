import React, { useEffect, useState, createContext } from "react";
import { auth } from "config/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Spin } from "antd";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        setIsLoading(false);
        navigate("/");
      }
    });
    return () => {
      unsubscribed();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={user}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}
