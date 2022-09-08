import React, { useState, createContext } from 'react'

export const UserStore = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState()

    const handleUser = (usr) => {
        setUser(usr)
    }
    const store = {user, handleUser}
    return <UserStore.Provider value={store}>{children}</UserStore.Provider>
}
