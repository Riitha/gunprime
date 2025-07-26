import { useNavigate } from "react-router";
import Swal from 'sweetalert2'
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteGunpla, fetchGunpla } from "../redux/features/gunpla/gunplaSlice";
import { Link } from "react-router";

export default function HomePage() {
    const { gunplas, loading, error } = useSelector((state) => state.gunpla);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

    async function deleteThread(id) {
        dispatch(deleteGunpla(id));
    }

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: "error",
                title: "エラー発生",
                text: "読み込み失敗",
            });
        } else {
            dispatch(fetchGunpla());
        }
    }, [dispatch, error])

    return (
        <>
            <div className="h-min-screen w-full">
                <div className="w-full">
                <button className="btn btn btn-accent w-[30%] my-3 flex mx-auto rounded-xl" onClick={() => navigate('/threads/add')}>ガンプラ投稿{plusIcon}</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {loading && <div>読み込み...</div>}
                    {gunplas.length > 0 &&
                    gunplas?.map((g) => (
                        
                        <div key={g.id} className="w-full min-h-[600px] rounded-xl bg-gradient-to-br from-Heliotrope to-flower-blue text-white p-2 flex flex-col justify-between">
                            <Link to={`/threads/detail/${g.id}`}>
                            <img src={g.imageUrl} alt={g.name} className="w-full h-auto lg:h-auto lg:w-auto object-cover rounded-md" />
                            </Link> 
                            <div className="flex-1 flex flex-col space-y-2 lg:space-y-1">

                                <div className="flex flex-row items-center w-full">

                                    <span className="overflow-auto whitespace-nowrap text-[18px] px-1 py-1 w-auto lg:text-sm lg:w-auto font-bold mt-2 bg-governor rounded-md">{g.name}</span>

                                    <span className="badge badge-secondary mt-2 text-[10px] ml-auto mr-2">{g.grade}</span>
                                </div>

                                <div className="flex flex-col justify-between flex-1">
                                    <p className="text-md lg:text-xs line-clamp-3 overflow-hidden mt-1 min-h-[72px]">
                                        {g.shortDesc}
                                    </p>
                                   
                                    <div className="flex flex-row gap-2 mt-2">
                                        <button onClick={() => {
                                            Swal.fire({
                                                title: "削除しますか",
                                                showDenyButton: true,
                                                showCancelButton: true,
                                                confirmButtonText: "はい",
                                                denyButtonText: `いいえ`
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    Swal.fire("削除", "", "完了");
                                                    deleteThread(g.id)
                                                } else if (result.isDenied) {
                                                    Swal.fire("キャンセル", "", "info");
                                                }
                                            });
                                        }}
                                            className="text-xs px-4 py-2 lg:text-sm lg:px-3 lg:py-1 bg-governor text-white rounded-md  w-fit mt-auto">
                                            削除
                                        </button>
                                        <button onClick={() => navigate(`/threads/edit/${g.id}`)} className="text-xs px-4 py-2 lg:text-sm lg:px-3 lg:py-1 bg-pink-600 text-white rounded-md  w-fit mt-2">
                                            編集
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                    
                </div>

            </div>

        </>
    );
}