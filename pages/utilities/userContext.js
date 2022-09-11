import React, { useState, createContext, useEffect } from 'react';
import { getUser } from './loacalStorageServices';

export const UserStore = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const handleUser = (usr) => {
    setUser(usr);
  };
  useEffect(() => {
    setUser(user || getUser())
  }, [user]);

  const store = { user, handleUser };
  return <UserStore.Provider value={store}>{children}</UserStore.Provider>;
};
