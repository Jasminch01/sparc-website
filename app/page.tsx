import Container from "@/components/Container";
import Hero from "@/components/Landingpage/Hero";
import Highlights from "@/components/Landingpage/Highlights";
import Organization from "@/components/Landingpage/Organization";
import Overview from "@/components/Landingpage/Overview";
import Statistic from "@/components/Landingpage/Statistic";
import Stories from "@/components/Landingpage/Stories";
import Team from "@/components/Landingpage/Team";
import Testimonials from "@/components/Landingpage/Testimonials";
import Videos from "@/components/Landingpage/Videos";
import Whatwedo from "@/components/Landingpage/Whatwedo";
import Wherewework from "@/components/Landingpage/Wherewework";
import Whoweare from "@/components/Landingpage/Whoweare";



export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Container>
        <Organization />
      </Container>
      <Whoweare />
      <Statistic />
      <Whatwedo />
      <Highlights />
      <Videos />
      <Team />
      <Stories />
      <Wherewework />
      <Overview />
      <Testimonials />
    </div>
  );
}
