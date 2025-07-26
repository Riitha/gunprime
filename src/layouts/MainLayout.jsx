import { Outlet, useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import HeroMain from "../components/Hero";
import { AuthContext } from "../context/AuthContext";
import { NavbarMain } from "../components/Navbar";


export default function MainLayout() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=> {
        if(!user) {
            navigate('/auth/login')
        }
    },[user, navigate]);

    return (
        <>
            <NavbarMain/>
            <HeroMain/>
            <Outlet />
        </>
    );
}