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

    async function handleRegister(e) {
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
            <div className="hero min-h-screen bg-cover bg-[url('./assets/bgRegister.png')] bg-center bg-no-repeat relative">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-['WDXL_Lubrifont_JP_N'] whitespace-nowrap md:text-5xl">ガンプライムへようこそ！</h1>
                        <p className="py-6 font-['Zen_Maru_Gothic'] text-xl md:text-2xl">
                            数多な<span className="text-sunblow">世界</span>があなたを待っている
                        </p>
                    </div>
                    <div className="card w-full max-w-sm shrink-0 shadow-2xl">
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
                    </div>
                </div>
            </div>



        </>
    );
}