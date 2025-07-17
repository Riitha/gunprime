import title from '../assets/namaWeb.png';
// import gunpla from '../assets/gunpla1.png';

export default function HeroMain() {
    const gazou = 'https://newsatcl-pctr.c.yimg.jp/dk/expert-image/yojizuhobirumuyojiho/article/00551468/top_1691960611691.jpeg?exp=10800&fmt=webp';
    return (
        <section className='w-full h-[700px] bg-[url(./assets/bgHero.png)] bg-cover bg-center flex flex-col md:flex-row'>

            <div className='flex-1 flex flex-col justify-center items-start p-8 text-left'>
                <img src={title} alt="gunpla logo" className="w-[360px] mx-auto" />
                <div className="text-4xl mb-4 text-slate-800 mx-auto">
                    <p className="text-red-500 font-semibold text-center">
                        ガンプラと<span className="text-yellow-500 text-center">想い</span>を紡ぎ
                    </p>
                    <p>
                        掛け替えの無い<span className="text-yellow-500 text-center">思い出</span>築こう
                    </p>
                </div>
            </div>

            <div className="w-full flex-1 flex justify-center items-center">
                <img src={gazou} alt="gunpla" className="w-80% " />
            </div>

        </section>
    )
}