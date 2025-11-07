import Image from "next/image";
import logo from "../../public/Header/Sparce-logo.png";
import Buttons from "./Button/Buttons";
import Navbar from "./Nav/Navbar";
import { Poppins } from "next/font/google";
import Container from "../Container";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Header = () => {
  return (
    <div className={`${poppins.className}`}>
      <Container>
        <section className="flex items-center justify-between mt-[33px] gap-6">
          <div className="shrink-0">
            <Image
              src={logo}
              alt="sparc-logo"
              width={149}
              height={84}
              className="w-[149px] h-[84px]"
            />
          </div>

          <div>
            <Navbar />
          </div>

          <div className="shrink-0">
            <Buttons />
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Header;
