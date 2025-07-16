import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../config/firebase";


export default function HomePage() {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            signOut(auth);
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <h1>---Home side---</h1>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </>
    );
}