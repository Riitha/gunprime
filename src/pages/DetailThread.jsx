import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { useEffect } from "react";
import { clearError, gunplaById } from "../redux/features/gunpla/gunplaSlice";
import parse from "html-react-parser";
import Swal from 'sweetalert2'
import { Link } from "react-router";

export default function DetailThread() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { gunpla, loading, error } = useSelector((state) => state.gunpla);

    useEffect(() => {
        if (id) {
            dispatch(clearError());
            dispatch(gunplaById(id));
        }
    }, [dispatch, id])

    useEffect(() => {
        if (!loading && error) {
            Swal.fire({
                icon: "error",
                title: "エラー発生",
                text: "読み込み失！！",
            });
        }
    }, [loading, error])

    if (loading) {
        return <span className="loading loading-ring loading-md"></span>
    }
    if (!gunpla && !loading && !error) {
        return (
            <p className="text-white text-center mt-10">
                ご要望なデータが見つかりません
            </p>
        );
    }

    return (
        <>
            <div className="bg-cello w-[100%] md:w-[90%] lg:w-[80%] h-full mx-auto my-4 flex flex-col items-center justify-start p-6 text-white rounded-xl">
                <div className="flex flex-row gap-1">
                    <span className="text-sm md:text-2xl lg:text-4xl">{gunpla.grade}</span>
                    <span className="text-sm md:text-2xl lg:text-4xl">{gunpla.scale}</span>
                    <h1 className="text-sm md:text-2xl lg:text-4xl font-bold mb-4 ml-2">{gunpla.name}</h1>
                </div>

                    <img
                        src={gunpla.imageUrl}
                        alt={gunpla.name}
                        className="w-auto h-auto max-h-[90vh] mx-auto rounded-xl mb-4"
                    />

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