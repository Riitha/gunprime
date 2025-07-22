import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../config/firebase";
import Swal from 'sweetalert2'

export default function HomePage() {
    const navigate = useNavigate();

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

    return (
        <>
            <h1>---Home side---</h1>
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </>
    );
}