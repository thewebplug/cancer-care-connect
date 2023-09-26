import Header from "../components/Header";
import Footer from "../components/Footer";
import Vector from "../img/Vector.png";
import Avatars from "../img/Web Developer doing coding - 640x533 1.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Urls } from "../routes/urls";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");


  const submitRegister = async (event) => {
    event.preventDefault();
    if (password === password_confirmation) {
      try {
        const response = await fetch(`${Urls?.baseUrl}${Urls?.register}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            phone,
            email,
            dateofbirth: date,
            gender,
            password,
          }),
        });

        // console.error('Response:', await response.json()); 
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          const data = await response.json();
          // console.info('Success:', data);
          setDate("");
          setEmail("");
          setFirstName("");
          setLastName("");
          setGender("");
          setPassword("");
          setPhone("");
          setPasswordConfirmation("");
          toast.success("Welcome to Cancer Care Connect!")
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      console.error('password does not match');
    }
  };
  return (
    <div className="w-full text-left p-0">
      {/* <Header /> */}
      <div className="bgOne">
        <img className="absolute top-0 right-0 z-[-1]" src={Vector} alt="" />
        {/* <img className="absolute top-0 right-0 z-[-1]" src={Left} alt="" /> */}

        <div className="flex lg:flex-row flex-col justify-between items-center lg:mx-16 md:mx-16 mx-6">
          <div>
            <div className="lg:text-[48px] md:text-[48px] text-[35px] mb-[33px] font-[700]">
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
        <div className="bgTwo">
          <div className="w-[80%] m-auto lg:text-[72px] md:text-[72px] text-[45px] font-[700] mb-5">
            Sign Up
          </div>
          <div className="w-[80%] m-auto lg:text-[36px] md:text-[36px] text-[26px] font-[700] mb-5 ">
            Please Sign Up To Continue
          </div>
          
          <form className="lg:mx-0 mx-8" onSubmit={submitRegister}>
            <div className=" lg:w-[80%] w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-10 lg:m-auto">
              <input
                className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]"
                type="text"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                placeholder="First Name"
              />
              <input
                className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]"
                type="text"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                placeholder="Last Name"
              />
              <input
                className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]"
                type="tel"
                minLength={11}
                maxLength={11}
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                placeholder="Mobile Number"
              />
              <input
                className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]"
                type="text"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                placeholder="Email"
              />
              <input
                className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]"
                type="date"
                value={date}
                min="1920-01-01" 
                max="2022-12-31"
                onChange={(event) => {
                  setDate(event.target.value);
                }}
                placeholder="Date"
              />
              <select
                className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]"
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(event) => {
                  setGender(event.target.value);
                }}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                placeholder="Password"
              />
              <input
                className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]"
                type="password"
                placeholder="Confirm Password"
                value={password_confirmation}
                onChange={(event) => {
                  setPasswordConfirmation(event.target.value);
                }}
              />
            </div>
            <div className="w-full flex justify-center">
              <button type="submit" className="mb-10 bg-[#5AB9EB] w-[400px] h-[45px] m-auto mt-[38px] rounded-[15px] text-[#fff] shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)]">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
