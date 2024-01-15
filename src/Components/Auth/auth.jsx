import { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState('')

    const storeTokenInLS = (serverToken) => {
        return (
            localStorage.setItem('token', serverToken)
        )
    }

    //JWT AUTHENTICATION - to get logedIn user data
    const userAuthentication = async () => {
        try {
            const response = await fetch('http://localhost:7000/auth/user', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
                // console.log(JSON.stringify(data, null, 2));
            }

        } catch (error) {
            console.log("Error Fetching user Data" + error);
        }
    };

    useEffect(() => {
        userAuthentication()
    }, [])

    return (
        <AuthContext.Provider value={{ storeTokenInLS, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)

    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider")
    }

    return authContextValue
}