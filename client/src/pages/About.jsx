import Header from "../components/Header";
import Footer from "../components/Footer";
import Vector from "../img/Vector.png";
import Avatars from "../img/Colleagues discussing startup idea - 640x427 1.png";
import Img1 from "../img/img1.png";
import Img2 from "../img/Cancer_Care_Connect 2.png";
import Conncetion from "../img/undraw_connected_re_lmq2 1.png";
// import Right from "../img/right.png";
// import Left from "../img/left.png";
import ContactForm from "../components/ContactForm";

function About() {
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
          <img className="w-[731px]" src={Conncetion} alt="" />
          <div className="">
            <div className="text-[48px] font-[400]">Get the attention you deserve</div>
            <div className="text-[20px] text-justify">
            By offering a secure and user-friendly space, we aim to bridge the gap in emotional support and valuable insights for those facing the challenges of cancer

            <br />
            <br />
            "Cancer Care Connect" aims to provide a lifeline of support, information, and empowerment for those affected by cancer. By combining community, resources, and expert guidance, we aspire to make a positive impact on the lives of individuals navigating the challenges of cancer. Together, we can create a strong and compassionate network that fosters hope, resilience, and meaningful connections.

            </div>
           
          </div>
        </div>
        {/* <ContactForm /> */}
        
        {/* <img  src={Right} alt="" /> */}

      </div>
      <Footer />
    </div>
  )
}

export default About