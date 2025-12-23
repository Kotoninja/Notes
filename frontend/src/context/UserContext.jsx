import { createContext } from "react";
import { useState, useEffect } from "react";
import api from "../api";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false)

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('access');
            if (!token) {
                setLoading(false);
                return;
            }

            api.get("/api/user/context")
                .then(function (response) {
                    const userData = response.data;
                    setUser(userData);
                    setIsAuthorized(true)
                })
                .catch(function (error) {
                    console.log(error);
                    setUser({ id: -1, username: "Anonymous" })
                    setIsAuthorized(false);
                })
                .finally(function () {
                    setLoading(false)
                });

        } catch (error) {
            Promise.reject('Error fetching user:', error);
            setIsAuthorized(false)
        } finally {
            // 
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    let value = { isAuthorized, setIsAuthorized, user, setUser, loading, setLoading, fetchUser }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
