import { Outlet, useNavigate } from "react-router";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../config/firebase";
import { useEffect } from "react";


export default function MainLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (!user) {
                navigate('/auth/login');
            }
        });
    });

    return (
        <>
            <h1>--- Main Layout ---</h1>
            <Outlet />
        </>
    );
}