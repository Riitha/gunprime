import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'


export function NavbarMain() {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            signOut(auth);
            navigate("/auth/login")
        } catch {
            Swal.fire({
                title: "Sweet!",
                text: "ログアウト失敗",
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
            <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a href="/">Homepage</a></li>
                            <li><a href="/about">About Me</a></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a href="/" className="btn btn-ghost text-xl">ガンプライム</a>
                </div>
                <div className="navbar-end">
                    <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
                </div>
            </div>
        </>
    )
}