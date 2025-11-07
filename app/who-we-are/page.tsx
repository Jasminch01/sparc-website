import Banner from "@/components/About/Banner";
import Container from "@/components/Container";
import React from "react";

const page = () => {
  return (
    <div>
      <Container>
        <section className="flex items-center gap-50 mt-10">
          <div className="max-w-xl">
            <h2 className="font-extrabold text-[51px]">
              EMPOWERING
              <span className="text-[#FF951B]">WOMEN</span>, BUILDING
            </h2>
          </div>
          <div>
            <p className="ml-15">
              Empowering indigenous women and communities to rise against
              systemic oppression, reclaim their voices.
            </p>
          </div>
        </section>
      </Container>
      <Banner />
    </div>
  );
};

export default page;
