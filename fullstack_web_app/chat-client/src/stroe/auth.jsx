import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(localStorage.getItem("user"));

    const stortokenInLS = (serverToken) => {
        return localStorage.setItem("token", serverToken);
    }

    const storeUserInLS = (user) => {
        return localStorage.setItem("user", user)
    }

    //logout feature

    const logoutUser = () => {
        setToken("");
        setUser("");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return true;
    }

    let isLoggedIn = !!token;
 
    return <AuthContext.Provider value={{token, user, isLoggedIn,stortokenInLS, storeUserInLS, logoutUser}}>
        {children}
    </AuthContext.Provider>
}


export const useAuth = () => {
    const authContextValue =  useContext(AuthContext);
    if(!authContextValue)
        throw new Error("Use context is outside of the provider")
    return authContextValue;
}