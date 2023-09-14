import Header from "../components/Header";
import Footer from "../components/Footer";
import Vector from "../img/Vector.png";
import Avatars from "../img/Web Developer doing coding - 640x533 1.png";
import Img1 from "../img/img1.png";
import Img2 from "../img/Cancer_Care_Connect 2.png";
import Conncetion from "../img/undraw_connected_re_lmq2 1.png";
// import Right from "../img/right.png";
// import Left from "../img/left.png";
import ContactForm from "../components/ContactForm";

const Signup = () => {
    return (
        <div className="w-full text-left p-0">
        <Header />
        <div className="bgOne">
          <img className="absolute top-0 right-0 z-[-1]" src={Vector} alt="" />
          {/* <img className="absolute top-0 right-0 z-[-1]" src={Left} alt="" /> */}
  
          <div className="flex justify-between items-center mx-16">
            <div>
              <div className="text-[58px] mb-[33px] font-[700]">
              Join us today <br /> and get the <br /> attention you need
              </div>
              <div className="text-[20px] text-justify">
              Are you or a loved one battling cancer and seeking <br /> a reliable companion throughout your journey? <br /> Look no further – Cancer Care Connect is here to <br /> empower, inform, and uplift you every step of the way.
              </div>
            </div>
            <img className="w-[728px] mt-[90px]" src={Avatars} alt="" />
          </div>
          <div className="bgTwo">
            <div className="w-[80%] m-auto text-[72px] font-[700] mb-[20px]">Sign Up</div>
            <div className="w-[80%] m-auto text-[36px] font-[700] mb-[40px] ">Please Sign Up To Continue</div>
            <div className=" w-[80%] grid grid-cols-2 gap-[47px] m-auto">

            <input className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]" type="text" placeholder="First Name" />
                <input className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]" type="text" placeholder="Last Name" />
                <input className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]" type="text" placeholder="Mobile Number" />
                <input className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]" type="text" placeholder="Email" />
                <input className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]" type="date" placeholder="Email" />
                <select className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]" type="text" placeholder="Email" >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]" type="password" placeholder="Password" />
                <input className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]" type="password" placeholder="Confirm Password" />

                
            </div>
            {/* <div className="w-full flex justify-center mt-[47px] h-[167px]">
                <textarea className="bg-[#fff] w-[80%] border border-[#9e9e9e] p-[5px] rounded-[8px]" placeholder="Message" name="" id=""></textarea>
                </div> */}

               <div className="w-full flex justify-center">
               <button className="bg-[#5AB9EB] w-[400px] h-[45px] m-auto mt-[38px] rounded-[15px] text-[#fff] shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)]">
              Register
            </button>
               </div>
        </div>
        
  
        </div>
        <Footer />
      </div>
    )
}

export default Signup;