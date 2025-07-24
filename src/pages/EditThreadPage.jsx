import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from 'sweetalert2'

export default function EditThread() {
    const [name, setName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [longDesc, setLongDesc] = useState("");
    const [scale, setScale] = useState("");
    const [grade, setGrade] = useState("");

    const successMessage = () =>
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "投稿しました",
            showConfirmButton: false,
            timer: 1500
        });

    const errorMessage = () =>
        Swal.fire({
            icon: "error",
            title: "エラー発生",
            text: "Something went wrong!",
        });

    const navigate = useNavigate();
    const { id } = useParams();

    async function editGunpla(e) {
        e.preventDefault();
        try {
            const docRef = doc(db, 'gunpla', id);
            await updateDoc(docRef, {
                name: name,
                grade: grade,
                scale: scale,
                imageUrl: imgUrl,
                shortDesc: shortDesc,
                longDesc: longDesc,
            });

            successMessage();
            navigate('/')
        } catch {
            errorMessage();
        }
    }

    useEffect(() => {
        async function getGunplaById(idGunpla) {
            try {
                const docRef = doc(db, 'gunpla', idGunpla);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setName(docSnap.data().name);
                    setGrade(docSnap.data().grade);
                    setScale(docSnap.data().scale);
                    setImgUrl(docSnap.data().imageUrl);
                    setShortDesc(docSnap.data().shortDesc);
                    setLongDesc(docSnap.data().longDesc);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "エラー発生",
                        text: "ガンプラが見つかりません",
                    });
                }
            } catch (error) {
                console.log(error)
            }
        }
        getGunplaById(id)
    }, [id])

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    ガンプラを投稿
                </h2>
                <form onSubmit={editGunpla} action="">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                機械名
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"
                                required=""
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                グレード
                            </label>
                            <select
                                id="category"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                            >
                                <option selected="">グレード選択</option>
                                <option value="SD">SD</option>
                                <option value="HG">HG</option>
                                <option value="MG">MG</option>
                                <option value="PG">PG</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                スケール
                            </label>
                            <select
                                id="category"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={scale}
                                onChange={(e) => setScale(e.target.value)}
                            >
                                <option selected="">スケール選択</option>
                                <option value="non-scale">non-scale</option>
                                <option value="1/144">1/144</option>
                                <option value="1/100">1/100</option>
                                <option value="1/60">1/60</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="shortDescription"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                説明
                            </label>
                            <input
                                type="text"
                                name="shortDescription"
                                id="shortDescription"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="簡単な紹介文をお書き下さい"
                                required=""
                                value={shortDesc}
                                onChange={(e) => setShortDesc(e.target.value)}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="imgUrl"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                画像リンク
                            </label>
                            <input
                                type="text"
                                name="imgUrl"
                                id="url"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="画像のリンクを貼ってください"
                                required=""
                                value={imgUrl}
                                onChange={(e) => setImgUrl(e.target.value)}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="longDesc"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={8}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="組み立て感想や詳細をお書きください"
                                value={longDesc}
                                onChange={(e) => setLongDesc(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                        確認
                    </button>
                    <button type="button" onClick={()=> navigate('/')} className="btn btn-secondary">戻る</button>
                </form>
            </div>
        </section>

    )
}