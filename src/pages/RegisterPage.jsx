import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../config/firebase";
import gunpla from "../assets/gunplaRegister.png";
import pilot from "../assets/pilotRegister.png";
import halo from "../assets/haro.png";
import { Link } from "react-router";

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
            <div className="hero relative min-h-screen bg-cover bg-desert-storm">
                <div className="hero-content flex-col lg:flex-row-reverse gap-12">
                    <div className="container bg-linear-to-b from-malibu to-midnight-blue lg:bg-linear-to-b lg:from-firefly lg:to-turquoise mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl overflow-hidden">
                        <img
                            src={pilot}
                            alt="Pilot"
                            className="block lg:hidden w-full h-full object-contain"
                        />

                        <img
                            src={gunpla}
                            alt="Gunpla"
                            className="hidden lg:block w-full h-full object-contain"
                        />
                    </div>

                    <div className="card w-full max-w-sm shrink-0 overflow-hidden">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset bg-blue-300 border-base-300 rounded-box w-full border p-4">
                                <legend className="fieldset-legend text-cello text-shadow-xl"><img src={halo} alt="mascot" className="w-[30px]" /></legend>

                                <label className="label text-cello ml-4">メール</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input bg-white/30 mx-auto text-black/80 placeholder-cello" placeholder="Email" />

                                <label className="label text-cello ml-4">パスワード</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input binput bg-white/30 mx-auto input bg-white/30 mx-auto text-black/80 placeholder-cello" placeholder="Password" />

                                <button type="submit" className="btn btn-accent mx-auto">登録</button>
                            </fieldset>
                        </form>
                        <p className="text-sm text-gray-600 mt-4">
                            登録済みユーザーは{' '}
                            <Link to='/auth/login' className="text-ship hover:underline">
                                ログイン
                            </Link>
                        </p>
                    </div>
                </div>
            </div>



        </>
    );
}