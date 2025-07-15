import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    //useState
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1>---login---</h1>
            <form onSubmit={handleLogin}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">ログイン</legend>

                <label className="label">メール</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="input" placeholder="Email" />

                <label className="label">パスワード</label>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="input" placeholder="Password" />

                <button type="submit" className="btn btn-neutral mt-4">ログイン</button>
            </fieldset>
            </form>
        </>
    )
}