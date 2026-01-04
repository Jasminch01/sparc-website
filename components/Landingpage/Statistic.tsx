"use client";
import { jost} from "../utils/font";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Container from "../Container";
import { useTranslation } from "react-i18next";

interface StatisticItem {
  title: string;
  description: string;
}

interface ParsedStatisticItem {
  heading: number;
  suffix: string;
  description: string;
}

const parseStatisticTitle = (rawTitle: string | null | undefined) => {
  if (typeof rawTitle !== 'string' || !rawTitle) {
    return { heading: 0, suffix: '' };
  }

  const match = rawTitle.match(/^(\d+)/);
  const heading = match ? parseInt(match[1], 10) : 0;
  const suffix = rawTitle.replace(heading.toString(), '').trim();

  return { heading, suffix };
};

const Statistic = () => {
  const { t } = useTranslation();
  const statisticsTitle = t('statistic.title', 'VARIOUS STATISTICS THAT WE HAVE');
  const statisticsRawData = (t('statistic.data', { returnObjects: true }) || []) as StatisticItem[];
  const parsedStatistics: ParsedStatisticItem[] = statisticsRawData
    .filter((item: StatisticItem) => item && item.title)
    .map((item: StatisticItem) => {
      const { heading, suffix } = parseStatisticTitle(item.title);

      return {
        heading: heading,
        suffix: suffix,
        description: item.description,
      };
    });

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`my-20 space-y-8 md:space-y-10 lg:space-y-12 ${jost.className}`}>
      <Container>
        <h2 className="text-center font-extrabold text-2xl md:text-3xl lg:text-4xl">
          {statisticsTitle}
        </h2>

        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* **FIX 2 applied here: Explicitly type the sta parameter** */}
          {parsedStatistics.map((sta: ParsedStatisticItem, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 md:gap-3 p-6 hover:scale-105 transition-transform duration-300">
              <h2 className="font-bold text-[#772E82] text-4xl md:text-5xl lg:text-6xl">
                {inView ? (
                  <CountUp
                    end={sta.heading}
                    duration={2.5}
                    separator=","
                    suffix={sta.suffix}
                  />
                ) : (
                  "0" + sta.suffix
                )}
              </h2>
              <p className="font-medium text-[#2B2B2B] text-center text-sm md:text-base lg:text-lg">
                {sta.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Statistic;