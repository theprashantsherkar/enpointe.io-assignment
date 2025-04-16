import { createContext, useState } from "react";

export const UserContext = createContext({
    user: {},
    isLoggedIn: false,
    setUser: () => { },
    setIsLoggedIn: () => { }
});

export const UserContextWrapper = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}