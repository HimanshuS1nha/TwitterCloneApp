import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext("");

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const storageUser = await SecureStore.getItemAsync("user");
      if (!storageUser) {
        setUser({});
      } else {
        setUser(JSON.parse(JSON.parse(JSON.stringify(storageUser))));
      }
    };
    getUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
