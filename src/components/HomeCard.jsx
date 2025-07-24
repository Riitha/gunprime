export default function GunplaCard({ gunpla, deleteThread }) {
    return (
        <>
            <div className="w-[280px] h-[480px] lg:max-w-[300px] lg:h-[450px] rounded-xl bg-gradient-to-br from-Heliotrope to-flower-blue text-white p-2 flex flex-col justify-between">

                <img src={gunpla.imageUrl} alt={gunpla.name} className="h-auto w-auto object-cover rounded-md" />

                <div className="flex-1 flex flex-col space-y-2 lg:space-y-1">
                    <div className="flex flex-row items-center w-full">
                        <span className="overflow-auto whitespace-nowrap text-[12px] px-1 py-1 w-25 lg:text-sm lg:w-30 font-bold mt-2 bg-governor rounded-md">{gunpla.name}</span>

                        <span className="badge badge-secondary mt-2 text-[10px] ml-auto mr-2">{gunpla.grade}</span>
                    </div>

                    <p className="text-xs line-clamp-3 overflow-hidden mt-1">
                        {gunpla.shortDesc}
                    </p>
                    <button onClick={deleteThread(gunpla.id)} className="text-xs px-4 py-2 lg:text-sm lg:px-3 lg:py-1 bg-governor text-white rounded-md  w-fit mt-2">
                        削除
                    </button>
                </div>
            </div>
        </>
    )
}