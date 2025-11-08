import Image from "next/image";
import map from "../../public/Wherewework/map.png";
import { poppins } from "../utils/font";
const Wherewework = () => {
  return (
    <div className="my-20 max-w-7xl mx-auto px-3 md:px-0">
      <div className="text-center  mx-auto mb-20 space-y-5">
        <h2 className={`${poppins.className} font-black xl:text-4xl md:text-3xl text-2xl `}>
          WHERE WE WORK
        </h2>
        <p
          style={{ fontFamily: '"Book Antiqua' }}
          className="text-[#6D6D6D] md:text-lg text-base"
        >
          Community development is often linked with community <br /> work or
          community planning, and may involve stakeholders, foundations,
        </p>
      </div>
      <Image
        src={map}
        alt="map"
        height={600}
        width={1000}
        className="object-contain w-full"
      />

      {/* Indicator */}
      <div
        style={{ fontFamily: '"Book Antiqua' }}
        className="mt-10 text-sm space-y-2"
      >
        <div className="flex items-center gap-5">
          <div className="w-5 h-5 bg-[#802390] text-lg "></div>
          <p>Countries We Have Worked </p>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-5 h-5 bg-[#FF951B] text-lg"></div>
          <p>Where We Belong </p>
        </div>
      </div>
    </div>
  );
};

export default Wherewework;
