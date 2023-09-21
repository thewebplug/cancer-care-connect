import Header from "../components/Header";
import Footer from "../components/Footer";
import Vector from "../img/Vector.png";
import Employee from "../img/employee.png";
import Avatars from "../img/Web Developer doing coding - 640x533 1.png";
// import Img1 from "../img/img1.png";
// import Img2 from "../img/Cancer_Care_Connect 2.png";
// import Conncetion from "../img/undraw_connected_re_lmq2 1.png";
// import Right from "../img/right.png";
// import Left from "../img/left.png";
import ContactForm from "../components/ContactForm";
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3100/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json(); 
        localStorage.setItem('token', data.token)
        toast.success('Login Successful')
      } else {
        throw new Error("Network response was not ok");
      }

      console.log('Response:', response); 
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div className="w-screen text-left p-0">
      <Header />
      <div className="">
        <img className="absolute top-0 right-0 z-[-1]" src={Vector} alt="" />
        {/* <img className="absolute top-0 right-0 z-[-1]" src={Left} alt="" /> */}

        <div className="flex justify-between items-center mx-16">
          <div>
            <div className="text-[58px] mb-[33px] font-[700]">
              Join us today <br /> and get the <br /> attention you need
            </div>
            <div className="text-[20px] text-justify">
              Are you or a loved one battling cancer and seeking <br /> a
              reliable companion throughout your journey? <br /> Look no further
              – Cancer Care Connect is here to <br /> empower, inform, and
              uplift you every step of the way.
            </div>
          </div>
          <img className="w-[728px] mt-[90px]" src={Avatars} alt="" />
        
        </div>

        <div className="justify-between mx-16">
          <div className="w-auto grid grid-cols-1 mb-20">
            <div className="w-auto text-[72px] font-[700] mb-3">
              Sign In
            </div>
            <div className="w-auto text-[36px] font-[700]">
              Please Login To Continue
            </div>
          </div>

          <div className="grid grid-cols-2">
            <form className="w-auto row justify-center" onSubmit={handleSubmit}>
              <input
                className="bg-[#fff] border grid border-[#9e9e9e] w-[500px] h-[45px] p-5 rounded-lg mb-5"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />

              <input
                className="bg-[#fff] border grid border-[#9e9e9e] w-[500px] h-[45px] p-5 rounded-lg mb-5"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}

              />

              <button type="submit" className="bg-[#5AB9EB] w-24 h-[45px] m-auto mt-8 rounded-lg text-[#fff] shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)]">
                Sign In
              </button>
            </form>
            
            <div className="w-screen mt-[-210px]">
              <img src={Employee} className="justify-start w-6/12" alt="Employee" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
