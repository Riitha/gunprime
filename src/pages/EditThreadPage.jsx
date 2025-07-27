import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Swal from 'sweetalert2'
import { editGunplaById, gunplaById } from "../redux/features/gunpla/gunplaSlice";
import UploadWidget from "../components/UploadWidget";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { useMemo } from "react";

export default function EditThread() {
    const { gunpla } = useSelector((state) => state.gunpla);
    const [name, setName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [longDesc, setLongDesc] = useState("");
    const [scale, setScale] = useState("");
    const [grade, setGrade] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const editor = useRef(null);
    const config = useMemo(() => ({
        readonly: false,
        theme: 'dark',
        placeholder: 'ここに感想やキャプションを書いてください'
    }), []);
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



    async function editGunpla(e) {
        e.preventDefault();
        try {
            dispatch(editGunplaById({ id, name, scale, grade, imgUrl, shortDesc, longDesc }));
            successMessage()
            navigate('/')
        } catch {
            errorMessage()
        }
    }

    useEffect(() => {
        dispatch(gunplaById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (gunpla) {
            setName(gunpla.name)
            setImgUrl(gunpla.imageUrl);
            setGrade(gunpla.grade);
            setScale(gunpla.scale);
            setShortDesc(gunpla.shortDesc);
            setLongDesc(gunpla.longDesc);
        }
    }, [gunpla])

    return (
        <section className="bg-gray-900">
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
                                <option value="" disabled={true}>グレード選択</option>
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
                                <option value="" disabled={true}>スケール選択</option>
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
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    name="imgUrl"
                                    id="url"
                                    className="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="画像のリンクを貼ってください"
                                    required=""
                                    disabled
                                    value={imgUrl}
                                    onChange={(e) => setImgUrl(e.target.value)}
                                />
                                <UploadWidget setImgUrl={setImgUrl} />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="longDesc"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                感想文・説明文
                            </label>
                            <JoditEditor
                                ref={editor}
                                value={longDesc}
                                config={config}
                                onBlur={(newContent) => setLongDesc(newContent)}
                                className="text-black"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 my-4">
                        <button
                            type="submit"
                            className="btn btn-accent"
                        >
                            確認
                        </button>
                        <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">戻る</button>
                    </div>
                </form>
            </div>
        </section>

    )
}