import { createContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const userPID = localStorage.getItem('userPID');
    return (
        <UserContext.Provider value={userPID}>
            {children}
        </UserContext.Provider>
    );
}