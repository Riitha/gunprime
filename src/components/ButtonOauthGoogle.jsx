import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom";


export default function ButtonGoogleLogin() {
    const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        try {
            const oauthLogin = await signInWithPopup(auth, googleProvider);
            const credential = GoogleAuthProvider.credentialFromResult(oauthLogin);
            const token = credential.accessToken;
            const user = oauthLogin.user;

            console.log(credential)
            console.log(token)
            console.log(user)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] rounded-full flex items-center justify-center sm:w-11 sm:h-11 lg:w-12 lg:h-12 p-3">
                <svg aria-label="Google logo" width="18 lg:20" height="30 lg:30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            </button>
        </>
    )
}