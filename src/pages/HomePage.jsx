import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth, db } from "../config/firebase";
import Swal from 'sweetalert2'
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import GunplaCard from "../components/HomeCard";



export default function HomePage() {
    const navigate = useNavigate();
    const [gunpla, setGunpla] = useState([]);
    async function handleLogout() {
        try {
            signOut(auth);
            navigate("/auth/login")
        } catch {
            Swal.fire({
                title: "Sweet!",
                text: "ログイン失敗、一度ログインしてください",
                imageUrl: "https://stat.ameba.jp/user_images/23/db/10085716020.jpg",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image"
            });
            navigate("/")
        }
    }

    useEffect(() => {
        async function getGunpla() {
            const querySnapshot = await getDocs(collection(db, "gunpla"));
            const result = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setGunpla(result)
        }
        getGunpla();

    }, [])
    return (
        <>
            <div className="h-min-screen w-full">
                <h1>---Home side---</h1>
                <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
                {gunpla?.map((gunpla) => (
                    <GunplaCard key={gunpla.id} gunpla={gunpla} />
                ))}
            </div>

        </>
    );
}