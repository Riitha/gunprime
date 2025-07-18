import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

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
            <div className="hero relative min-h-screen bg-cover bg-[url('./assets/bgLogin.png')]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-['WDXL_Lubrifont_JP_N'] whitespace-nowrap md:text-5xl">アクセス認証</h1>
                        <p className="py-6 font-['Zen_Maru_Gothic']">
                            認証情報を入力してください
                        </p>
                    </div>
                    <div className="card w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 shadow-2xl">
                                <legend className="fieldset-legend">ログイン</legend>

                                <label className="label">メール</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input" placeholder="Email" />

                                <label className="label">パスワード</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input" placeholder="Password" />

                                <button type="submit" className="btn btn-neutral mt-4">ログイン</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}