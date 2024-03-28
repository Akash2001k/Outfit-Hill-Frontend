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
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            // Token doesn't exist, user is not authenticated
            return;
        }

        // Check if the token timestamp is older than 24 hours
        const tokenTimestamp = localStorage.getItem('tokenTimestamp');
        if (tokenTimestamp) {
            const currentTime = new Date().getTime();
            const storedTime = new Date(tokenTimestamp).getTime();
            const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

            if (currentTime - storedTime >= twentyFourHours) {
                // Token is older than 24 hours, clear localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('tokenTimestamp');
                return;
            }
        }

        // Token is valid, proceed with authentication
        const response = await fetch('http://localhost:7000/auth/user', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data.userData);
            // Update token timestamp
            localStorage.setItem('tokenTimestamp', new Date());
        } else {
            // Handle authentication failure
            // For example, clear token from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('tokenTimestamp');
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