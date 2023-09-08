// import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Vector from "../img/Vector.png";
import Avatars from "../img/Group 9951.png";
import Img1 from "../img/img1.png";
import Img2 from "../img/Cancer_Care_Connect 2.png";
// import Right from "../img/right.png";
// import Left from "../img/left.png";
import ContactForm from "../components/ContactForm";

const Home = () => {
  return (
    <div className="w-full text-left p-0">
      <Header />
      <div className="bgOne">
        <img className="absolute top-0 right-0 z-[-1]" src={Vector} alt="" />
        {/* <img className="absolute top-0 right-0 z-[-1]" src={Left} alt="" /> */}

        <div className="flex justify-between items-center mx-16">
          <div>
            <div className="text-[58px] mb-[33px] font-[700]">
              Your Personalized Cancer Support Web Application
            </div>
            <div className="text-[20px] text-justify">
              Cancer Care Connect is a cutting-edge web application designed
              exclusively for cancer patients, survivors, caregivers, and their
              families.
            </div>
          </div>
          <img className="w-[728px] mt-[90px]" src={Avatars} alt="" />
        </div>

        <div className="grid grid-cols-2 gap-[94px] justify-start mt-[155px] mb-[168px] mx-16">
          <img className="w-[731px]" src={Img1} alt="" />
          <div className="">
            <div className="text-[48px] font-[400]">What we offer</div>
            <div className="text-[20px] text-justify">
              Are you or a loved one battling cancer and seeking a reliable
              companion throughout your journey? Look no further – Cancer Care
              Connect is here to empower, inform, and uplift you every step of
              the way. Our mission is to provide comprehensive support,
              information, and a sense of community to enhance the quality of
              life during this challenging time.
            </div>
            <button className="bg-[#5AB9EB] w-[100px] h-[34px] mt-[15px] rounded-[15px] text-[#fff] shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)]">
              See more
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[94px] justify-start mb-[100px] mx-16">
          <div className="">
            <div className="text-[20px] text-justify">
              Cancer diagnosis not only takes a physical toll but also impacts
              emotional and psychological well-being. Patients often feel
              isolated, struggling to find people who truly understand their
              experiences. Research shows that long-term social isolation may
              increase the risk of mental illness, reduce patient compliance
              with treatment, and increase cancer care costs Existing online
              resources lack a sense of genuine connection and community,
              leaving patients and caregivers yearning for a more personalized
              and supportive platform.
            </div>
            <button className="bg-[#5AB9EB] w-[100px] h-[34px] mt-[15px] rounded-[15px] text-[#fff] shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)]">
              See more
            </button>
          </div>

          <img className="w-[731px]" src={Img2} alt="" />
        </div>

        <ContactForm />
        
        {/* <img  src={Right} alt="" /> */}

      </div>
      <Footer />
    </div>
  );
};

export default Home;
