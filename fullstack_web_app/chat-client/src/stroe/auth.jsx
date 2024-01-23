import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"));

    const stortokenInLS = (serverToken) => {
        
        return localStorage.setItem("token", serverToken);
    }

    //logout feature

    const logoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    let isLoggedIn = !!token;
 
    return <AuthContext.Provider value={{token, isLoggedIn,stortokenInLS, logoutUser}}>
        {children}
    </AuthContext.Provider>
}


export const useAuth = () => {
    const authContextValue =  useContext(AuthContext);
    if(!authContextValue)
        throw new Error("Use context is outside of the provider")
    return authContextValue;
}