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
        title: " NGO'S Partnered "
    },
]

const Statistic = () => {
    return (
        <div className={`my-16 md:my-20 lg:my-24 space-y-8 md:space-y-10 lg:space-y-12 ${poppins.className} max-w-7xl mx-auto px-5 lg:px-10 xl:px-0`}>
            <h2 className="text-center font-extrabold text-2xl md:text-3xl lg:text-4xl">
                VARIOUS STATISTICS THAT WE HAVE
            </h2>
            
            {/* Statistic Part */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
                {statistics.map((sta, index) =>
                    <div 
                        key={index} 
                        className="flex flex-col items-center gap-2 md:gap-3 p-6 hover:scale-105 transition-transform duration-300"
                    >
                        <h2 className="font-bold text-[#772E82] text-4xl md:text-5xl lg:text-6xl">
                            {sta.heading}
                        </h2>
                        <p className="font-medium text-center text-sm md:text-base lg:text-lg">
                            {sta.title}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Statistic;