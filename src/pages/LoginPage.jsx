import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import loginGunpla from "../assets/gunplaLogin.png";
import loginPilot from "../assets/pilotLogin.png";
import halo from "../assets/haro.png";
import { Link } from "react-router";
import ButtonGoogleLogin from "../components/ButtonOauthGoogle";

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
            <div className="hero relative min-h-screen bg-cover bg-desert-storm">
                <div className="hero-content flex-col lg:flex-row-reverse gap-12">
                    <div className="container bg-linear-to-b from-aquaDeep to-turquoise lg:bg-linear-to-b lg:from-cello lg:to-turquoise mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl overflow-hidden">

                        <img
                            src={loginPilot}
                            alt="Pilot"
                            className="block lg:hidden w-full h-full object-contain"
                        />

                        <img
                            src={loginGunpla}
                            alt="Gunpla"
                            className="hidden lg:block w-full h-full object-contain"
                        />

                    </div>
                    <div className="card w-full max-w-sm shrink-0 overflow-hidden">
                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset bg-blue-300 border-base-300 rounded-box w-full border p-4">
                                <legend className="fieldset-legend text-cello text-shadow-xl"><img src={halo} alt="mascot" className="w-[30px]" /></legend>

                                <label className="label text-cello ml-4">メール</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input bg-white/30 mx-auto text-black/80 placeholder-cello" placeholder="Email" />

                                <label className="label text-cello ml-4">パスワード</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input binput bg-white/30 mx-auto input bg-white/30 mx-auto text-black/80 placeholder-cello" placeholder="Password" />

                                <button type="submit" className="btn btn-accent mx-auto">ログイン</button>
                                <p className="text-center text-cello font-['WDXL_Lubrifont_JP_N'] text-sm md:text-lg">または</p>
                                <div className="flex items-center justify-center"><ButtonGoogleLogin/>
                                </div>
                            </fieldset>
                        </form>
                        <p className="text-sm text-gray-600 mt-4">
                            未登録は{' '}
                            <Link to='/auth/register' className="text-ship hover:underline">
                                こちらへ
                            </Link>
                        </p>
                    </div>
                </div>
            </div >
        </>
    )
}