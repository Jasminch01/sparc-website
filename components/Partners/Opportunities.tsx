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
    <div className=" bg-[#36133B] py-10 xl:py-20 my-20 px-5 md:px-0">
      <div>
        <p className="text-3xl lg:text-4xl font-bold text-center text-white px-4 mb-5">
          Partnership Opportunities
        </p>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 py-10 md:py-20">
            {opportunities.map((opportunite, index) => (
              <div
                key={index}
                className="text-white space-y-5 bg-white/10 border border-white/30 p-6 md:p-10 rounded-xl flex flex-col h-full"
              >
                <p className="font-bold text-xl md:text-2xl">
                  {opportunite.title}
                </p>
                <p
                  className={`${antiquaFont.className} text-lg lg:text-xl flex-grow`}
                >
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
