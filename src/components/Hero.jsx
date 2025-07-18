export default function HeroMain() {
    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 ">
                <div className="h-120 md:h-[80dvh] flex flex-col bg-[url('./assets/bgHero.png')] bg-cover bg-center bg-no-repeat rounded-2xl">
                    <div className="mt-auto w-2/3 md:max-w-lg ps-5 pb-5 md:ps-10 md:pb-10">
                        <h1 className="font-['Zen_Maru_Gothic'] text-xl text-desert-storm text-shadow-lg md:text-3xl lg:text-4xl ">
                            <span className="font-['WDXL_Lubrifont_JP_N'] bg-cinnabar text-sunblow text-xl md:text-4xl lg:text-6xl">ガンプラ</span>
                            <span className="font-['WDXL_Lubrifont_JP_N'] bg-cello text-desert-storm text-xl md:text-4xl lg:text-6xl">イム</span>

                            <br />

                            <span className="block mt-2 text-shadow-xs text-shadow-black text-desert-storm">ガンプラと未来を築こう</span>
                        </h1>
                    </div>
                </div>
            </div>
        </>

    )
}