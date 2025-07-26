import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { useEffect } from "react";
import { gunplaById } from "../redux/features/gunpla/gunplaSlice";
import parse from "html-react-parser";
import Swal from 'sweetalert2'
import { Link } from "react-router";

export default function DetailThread() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { gunpla, loading, error } = useSelector((state) => state.gunpla);

    useEffect(() => {
        if (id) {
            dispatch(gunplaById(id));
        }
    }, [dispatch, id])

    if (loading) {
        return <span className="loading loading-ring loading-md"></span>
    } else if (error) {
        Swal.fire({
            icon: "error",
            title: "エラー発生",
            text: "読み込み失！！",
        });
        return null;
    } else if (!gunpla && !loading) {
        Swal.fire({
            icon: "error",
            title: "エラー発生",
            text: "ご要望なデータが見つかりません",
        });
        return null;
    }

    return (
        <>
            <div className="bg-cello w-[100%] md:w-[90%] lg:w-[80%] h-screen mx-auto my-4 flex flex-col items-center justify-start p-6 text-white rounded-xl">
                <div className="flex flex-row gap-1">
                    <span className="text-4xl md:text-2xl lg:text-xl">{gunpla.grade}</span>
                    <span className="text-4xl md:text-2xl lg:text-xl">{gunpla.scale}</span>
                    <h1 className="text-4xl md:text-2xl lg:text-xl font-bold mb-4">{gunpla.name}</h1>
                </div>


                <div className="bg-sky-300 rounded-2xl overflow-hidden w-[90%] md:w-[80%] lg:w-[70%] h-auto mb-6">
                    <img
                        src={gunpla.imageUrl}
                        alt="hai"
                        className="w-auto h-auto bg-cover"
                    />
                </div>

                <div className=" w-[90%] md:w-[80%] lg:w-[70%] text-left">
                    <h2 className="text-xl md:text-md lg:text-sm font-bold mb-2">感想文・説明文</h2>
                    <div className="prose-sm prose-neutral lg:prose-lg">
                        {gunpla.longDesc ? parse(gunpla.longDesc) : <p>No desc</p>}
                    </div>
                </div>
                <Link to={'/'} className="ml-auto">
                    <button className="btn btn-secondary">戻る</button>
                </Link>
            </div>
        </>
    )
}