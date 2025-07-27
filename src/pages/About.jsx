import boku from "../assets/jibun.jpeg"

export default function AboutMe() {
    return (
        <>
            <main className="min-h-screen bg-desert-storm flex flex-col items-center justify-center text-white px-4">
                <h1 className="text-2xl font-bold font-['WDXL_Lubrifont_JP_N'] mb-8 text-flower-blue">作者について</h1>

                <div className="flex flex-col md:flex-row lg:flex-row items-center gap-4">
                    <img
                        src={boku}
                        alt="Avatar"
                        className="w-40 h-40 rounded-full object-cover border-1 border-blue-chill"
                    />

                    <div className="text-center font-['Zen_Maru_Gothic']">
                        <p className="text-firefly">マウラナ・ユスフ</p>
                        <p className="text-firefly">翻訳者・日本語教師・Hacktiv8受講生</p>
                    </div>
                </div>

                <div className="mt-10 max-w-xl font-bold font-['Zen_Maru_Gothic'] text-center text-sm leading-relaxed text-midnight-blue">
                    <p>
                        インドネシアのパクアン大学で日本語を学び、現在はフロントエンドエンジニアを目指す。ありがたいことに今はHTML・CSS・JavaScript・Reactなどの技術を中心に習得途中。これまでに作成したウェブアプリは、天気アプリ、ToDoリスト、映画検索アプリ、そして現在ガンプラ用のCMSなどを制作した。
                    </p>
                    <p className="mt-4">
                        以前は実習生送り出し機関で資料スタッフとしてお仕事を経験あった。今はHactiv8受講に参加しながら、実家のお店を支えている。「コツコツと続ければ、きっと実ってくれる」と信じて、よりよい自分になれる為に少しずつでも前に進む。
                    </p>
                </div>
            </main>
        </>
    )
}