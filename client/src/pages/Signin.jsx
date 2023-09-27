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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userLogin } from "../../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { auth } = useSelector((state) => ({ ...state }));

  const { authenticate, error } = auth;

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(userLogin(email, password));
  };

  useEffect(() => {
    if (authenticate) {
      setLoading(false);
      navigate("/forum");
      toast.success("Login Success");
    }
    if (error === "Incorrect Login Details") {
      setLoading(false);
      toast.error(error)
    }
  }, [authenticate, error]);

  return (
    <div className="text-left p-0">
      <Header />
      <div className="">
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

        <div className="justify-between lg:mx-16 md:mx-16 mx-6">
          <div className="w-auto grid grid-cols-1 lg:mb-20 md:mb-20 mb-5">
            <div className="w-auto lg:text-[72px] md:text-[72px] text-[45px] font-[700] mb-3">Sign In</div>
            <div className="w-auto lg:text-[36px] md:text-[36px] text-[26px] font-[700]">
              Please Login To Continue
            </div>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1">
            <form className="w-auto row justify-center" onSubmit={handleSubmit}>
              <input
                className="bg-[#fff] border grid border-[#9e9e9e] lg:w-[500px] md:w-[500px] w-full h-[45px] p-5 rounded-lg mb-5"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />

              <input
                className="bg-[#fff] border grid border-[#9e9e9e] lg:w-[500px] md:w-[500px] w-full h-[45px] p-5 rounded-lg mb-5"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />

              <button
                type="submit"
                className="bg-[#5AB9EB] w-24 h-[45px] m-auto lg:mt-8 md:mt-8 mt-2 rounded-lg text-[#fff] shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)]"
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </form>

            <div className="lg:mt-[-210px] mt-[10px]">
              <img
                src={Employee}
                className="justify-start "
                alt="Employee"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
