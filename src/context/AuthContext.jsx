import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { AuthContext } from "./AuthContext";

//provider
export default function AuthContextProvider ( {children} ) {
    const [user, setUser] = useState(null);
    const [isLoad, setLoad] = useState(true);
    const value = {user, setUser};

    useEffect(() => {
        setLoad(true);
        const unsubscribe = onAuthStateChanged(auth, (user)=> {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoad(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    if(isLoad) {
        return <div>Loading...</div>;
    }
    return <AuthContext value={value}>{children}</AuthContext>
}