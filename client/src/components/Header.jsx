import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Header = () => {

  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    localStorage.removeItem("token");
    navigate("/signin");
  };

  console.log('auth', auth);
  const location = useLocation()
  console.log('shipper', location.pathname)
  return (
    <div className="flex w-full justify-around m-0 py-5 px-0">
      <div className="flex w-auto items-center justify-start">
        <svg
          width="38"
          height="44"
          viewBox="0 0 38 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_1_3641)">
            <path
              d="M34 35.0116V32.5107C34 32.1823 33.9354 31.8571 33.8097 31.5536C33.6841 31.2504 33.5 30.9747 33.2679 30.7423C33.0356 30.5101 32.76 30.3259 32.4568 30.2003C32.1534 30.0746 31.8283 30.0099 31.5 30.0099H21.4993C18.1841 30.0099 15.0047 28.6925 12.6604 26.3475C10.3162 24.0025 8.99918 20.8221 8.99913 17.5058C8.99913 15.8637 9.32246 14.2377 9.95066 12.7207C10.5789 11.2036 11.4996 9.82513 12.6604 8.664C13.8211 7.50288 15.1991 6.58186 16.7157 5.95347C18.2323 5.32509 19.8578 5.00169 21.4993 5.00171H31.4993C31.8276 5.0018 32.1529 4.93719 32.4562 4.81157C32.7596 4.68592 33.0354 4.50173 33.2675 4.2695C33.4998 4.03725 33.6839 3.76152 33.8097 3.45806C33.9354 3.1546 34 2.82934 34 2.50085V0H21.4999C19.2017 -1.31944e-10 16.9261 0.452802 14.8029 1.33255C12.6797 2.2123 10.7505 3.50178 9.12554 5.12733C7.50051 6.75291 6.21148 8.68273 5.33204 10.8066C4.45261 12.9305 3.99998 15.2069 4 17.5058C4 22.1485 5.84372 26.6013 9.12557 29.8842C12.4074 33.1672 16.8586 35.0116 21.4999 35.0116H34Z"
              fill="url(#paint0_linear_1_3641)"
            />
            <path
              d="M30 28V26.5714C30 26.3838 29.9633 26.198 29.8922 26.0247C29.821 25.8514 29.7166 25.6939 29.5851 25.5612C29.4535 25.4286 29.2973 25.3234 29.1255 25.2516C28.9536 25.1798 28.7694 25.1428 28.5833 25.1428H22.9163C21.0376 25.1428 19.236 24.3903 17.9076 23.0507C16.5792 21.7112 15.8329 19.8944 15.8328 18C15.8328 17.062 16.0161 16.1332 16.372 15.2665C16.728 14.3999 17.2498 13.6125 17.9075 12.9492C18.5653 12.2859 19.3462 11.7598 20.2056 11.4009C21.065 11.0419 21.9861 10.8572 22.9163 10.8572H28.5829C28.7689 10.8572 28.9533 10.8203 29.1252 10.7486C29.2971 10.6768 29.4534 10.5716 29.5849 10.4389C29.7165 10.3062 29.8209 10.1487 29.8922 9.97538C29.9633 9.80203 30 9.61623 30 9.42859V8H22.9166C21.6143 8 20.3248 8.25866 19.1216 8.76121C17.9185 9.26375 16.8253 10.0004 15.9045 10.9289C14.9836 11.8575 14.2532 12.9599 13.7548 14.1732C13.2565 15.3864 13 16.6868 13 18C13 20.6521 14.0448 23.1957 15.9045 25.071C17.7642 26.9464 20.2865 28 22.9166 28H30Z"
              fill="url(#paint1_linear_1_3641)"
            />
            <path
              d="M28 23V22.2857C28 22.1919 27.9806 22.099 27.9429 22.0123C27.9052 21.9257 27.85 21.847 27.7804 21.7806C27.7107 21.7143 27.628 21.6617 27.537 21.6258C27.446 21.5899 27.3485 21.5714 27.25 21.5714H24.2498C23.2552 21.5714 22.3014 21.1951 21.5981 20.5254C20.8948 19.8556 20.4998 18.9472 20.4997 18C20.4997 17.531 20.5967 17.0666 20.7852 16.6333C20.9737 16.2 21.2499 15.8063 21.5981 15.4746C21.9463 15.143 22.3597 14.8799 22.8147 14.7004C23.2697 14.521 23.7573 14.4286 24.2498 14.4286H27.2498C27.3483 14.4286 27.4458 14.4102 27.5369 14.3743C27.6279 14.3384 27.7106 14.2858 27.7802 14.2195C27.8499 14.1531 27.9052 14.0744 27.9429 13.9877C27.9806 13.901 28 13.8081 28 13.7143V13H24.25C23.5605 13 22.8778 13.1293 22.2409 13.3806C21.6039 13.6319 21.0252 14.0002 20.5377 14.4645C20.0502 14.9288 19.6634 15.48 19.3996 16.0866C19.1358 16.6932 19 17.3434 19 18C19 19.3261 19.5531 20.5978 20.5377 21.5355C21.5222 22.4732 22.8576 23 24.25 23H28Z"
              fill="url(#paint2_linear_1_3641)"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_1_3641"
              x="0"
              y="0"
              width="38"
              height="43.0116"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1_3641"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1_3641"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_1_3641"
              x1="8.53"
              y1="17.5058"
              x2="47.0201"
              y2="17.5058"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFC0C0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1_3641"
              x1="15.567"
              y1="18"
              x2="37.378"
              y2="18"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFC0C0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1_3641"
              x1="20.359"
              y1="18"
              x2="31.906"
              y2="18"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFC0C0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="font-bold">Cancer Care Connect</div>
      </div>

      <div className="flex w-auto items-center justify-between">
        {location.pathname === "/" ? 
          <Link to={'/'} className="bg-[#efacac] text-center w-[auto] h-[49px] p-3 rounded-[10px] hover:bg-[#FFC0C0] text-white shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)] font-bold">Home</Link>
          :
          <Link to={'/'} className="text-center w-[auto] h-[49px] p-3 rounded-[10px] font-bold">Home</Link>
        }
        {location.pathname === "/about" ? 
          <Link to={'/about'} className="bg-[#efacac] text-center w-[auto] h-[49px] p-3 rounded-[10px] lg:ml-[59px] lg:mr-[59px] text-white hover:bg-[#FFC0C0] shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)] font-bold">About Us</Link>
          :
          <Link to={'/about'} className="text-center w-[auto] h-[49px] p-3 rounded-[10px] lg:ml-[59px] lg:mr-[59px] font-bold">About Us</Link>
        }
        {location.pathname === "/contact" ? 
          <Link to={'/contact'} className="bg-[#efacac] text-center w-[auto] h-[49px] p-3 rounded-[10px] hover:bg-[#FFC0C0] text-white shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)] font-bold">Contact Us</Link>
          :
          <Link to={'/contact'} className="text-center w-[auto] h-[49px] p-3 rounded-[10px] font-bold">Contact Us</Link>
        }
      </div>

      {auth?.token ? <div className="font-bold text-[18px]">Welcome {auth?.userInfo?.firstname} {auth?.userInfo?.lastname}</div> :<div className="flex w-auto items-center justify-end">
      <Link to={'/signin'}><button className="bg-[#fff] hover:bg-[#e7e1e1] text-black w-[auto] h-[49px] px-5 rounded-[10px] mr-[28px] shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)] font-bold">Sign In</button></Link>
      <Link to='/signup'><button className="bg-[#5AB9EB] hover:bg-[#45a2d4] text-white w-[auto] h-[49px] px-5 rounded-[10px] text-[#fff] shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)] font-bold">Register</button></Link>
      </div>}
      {auth?.token && <div onClick={handleLogout}>Log Out</div>}
    </div>
  );
};

export default Header;
