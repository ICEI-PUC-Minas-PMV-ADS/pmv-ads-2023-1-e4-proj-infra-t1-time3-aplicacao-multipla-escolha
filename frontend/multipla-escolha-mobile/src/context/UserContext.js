import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [signed, setSigned] = useState(false);
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider
      value={{
        signed,
        setSigned,
        userData,
        setUserData
      }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  const { signed, setSigned, userData, setUserData } = context;
  return { signed, setSigned, userData, setUserData };
}
