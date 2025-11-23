"use client";
import { poppins } from "../utils/font";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Container from "../Container";

const statistics = [
  {
    heading: 50,
    suffix: "",
    title: "Invested in Community Initiatives",
  },
  {
    heading: 70,
    suffix: "+",
    title: "Indigenous-led Projects Funded",
  },
  {
    heading: 10,
    suffix: "+",
    title: "Years of Dedicated Support",
  },
  {
    heading: 35,
    suffix: "+",
    title: "NGO'S Partnered",
  },
];

const Statistic = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`my-16 md:my-20 lg:my-24 space-y-8 md:space-y-10 lg:space-y-12 ${poppins.className}`}
    >
      <Container>
        <h2 className="text-center font-extrabold text-2xl md:text-3xl lg:text-4xl">
          VARIOUS STATISTICS THAT WE HAVE
        </h2>

        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {statistics.map((sta, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 md:gap-3 p-6 hover:scale-105 transition-transform duration-300"
            >
              <h2 className="font-bold text-[#772E82] text-4xl md:text-5xl lg:text-6xl">
                {index === 0 ? (
                  inView ? (
                    <CountUp
                      key={index}
                      end={sta.heading}
                      duration={2.5}
                      separator=","
                      suffix="K"
                    />
                  ) : (
                    "0K"
                  )
                ) : inView ? (
                  <CountUp
                    key={index}
                    end={sta.heading}
                    duration={2.5}
                    separator=","
                    suffix={sta.suffix}
                  />
                ) : (
                  "0" + sta.suffix
                )}
              </h2>
              <p className="font-medium text-center text-sm md:text-base lg:text-lg">
                {sta.title}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Statistic;
