import Container from "../Container";
import { antiquaFont } from "../utils/font";

const opportunities = [
  {
    title: "Institutional Partnerships",
    description:
      "Collaborate on advocacy campaigns, cultural research, or educational programs.",
  },
  {
    title: "Funding & Grants",
    description:
      "Support ongoing or new Indigenous-led projects through financial partnerships and co-funding",
  },
  {
    title: "Academic & Research Collaboration",
    description:
      "Partner with universities, researchers, and think tanks to produce evidence-based studies on Indigenous issues.",
  },
];

const Opportunities = () => {
  return (
    <div className="my-20 bg-[#36133B] py-20">
      <div>
        <p className="text-3xl md:text-4xl font-bold text-center text-white px-4">
          Partnership Opportunities
        </p>
        <Container>
          <div className="flex flex-col lg:flex-row gap-5 items-stretch justify-center py-10 md:py-20">
            {opportunities.map((opportunite, index) => (
              <div
                key={index}
                className="text-white space-y-5 bg-white/10 border border-white/30 w-full p-6 md:p-10 rounded-xl"
              >
                <p className="font-bold text-xl md:text-2xl">
                  {opportunite.title}
                </p>
                <p className={`${antiquaFont.className} text-base md:text-lg`}>
                  {opportunite.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Opportunities;
