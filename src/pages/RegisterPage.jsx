import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../config/firebase";
export default function RegisterPage() {
    //useState
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    //end useState
    
    async function handleRegister(e){
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h1>---register---</h1>
            <form onSubmit={handleRegister}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">登録</legend>

                <label className="label">メール</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Email" />

                <label className="label">パスワード</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" />

                <button type="submit" className="btn btn-neutral mt-4">登録</button>
            </fieldset>
            </form>
        </>
    );
}