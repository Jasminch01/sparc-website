import { poppins } from "../utils/font";
const statistics = [
    {
        heading: '50K',
        title: 'Invested in Community Initiatives'
    },
    {
        heading: '70+',
        title: 'Indigenous-led Projects Funded'
    },
    {
        heading: '10+',
        title: 'Years of Dedicated Support'
    },
    {
        heading: '35+',
        title: 'NGO’S Partnered '
    },
]

const Statistic = () => {
    return (
        <div className={`my-30 space-y-10 ${poppins.className} max-w-7xl mx-auto`}>
            <h2 className={` text-center font-extrabold text-3xl `}>VARIOUS STATISTICS THAT WE HAVE</h2>
            {/* Statistic Part */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {statistics.map((sta, index) =>
                    <div key={index} className="flex flex-col items-center gap-3">
                        <h2 className="font-bold text-[#772E82] text-5xl">{sta.heading}</h2>
                        <p className="font-medium">{sta.title}</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Statistic;