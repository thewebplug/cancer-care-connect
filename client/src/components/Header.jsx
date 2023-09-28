import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const location = useLocation();
  const { auth } = useSelector((state) => ({ ...state }));

  console.info("swears", auth.userInfo.id);

  const navigation = [
    {
      name: "Home",
      href: "/",
      current: location.pathname === "/" ? true : false,
      hide: !auth?.token ? false : true,
    },
    {
      name: "About",
      href: "/about",
      current: location.pathname === "/about" ? true : false,
      hide: !auth?.token ? false : true,
    },
    {
      name: "Contact",
      href: "/contact",
      current: location.pathname === "/contact" ? true : false,
      hide: !auth?.token ? false : true,
    },
    {
      name: "Forum",
      href: "/forum",
      current: location.pathname === "/forum" ? true : false,
      hide: !auth?.token ? true : false,
    },
    {
      name: "Journal",
      href: "/journal",
      current: location.pathname === "/journal" ? true : false,
      hide: !auth?.token ? true : false,
    },
    {
      name: "My Forum",
      href: `/myforum/${auth.userInfo.id}`,
      current: location.pathname === `/myforum/${auth.userInfo.id}` ? true : false,
      hide: !auth?.token ? true : false,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    localStorage.removeItem("token");
    navigate("/signin");
  };

  console.log("auth", auth);
  console.log("shipper", location.pathname);
  return (
    <Disclosure as="nav" className="lg:mb-0 mb-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 bg-[#efacac] text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <div className="flex flex-shrink-0 items-center">
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
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
                        <stop stopColor="rgb(59 130 246 / 0.8)" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_1_3641"
                        x1="15.567"
                        y1="18"
                        x2="37.378"
                        y2="18"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFC0C0" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_1_3641"
                        x1="20.359"
                        y1="18"
                        x2="31.906"
                        y2="18"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFC0C0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="font-normal">Cancer Care Connect</div>
                </div>
                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-[#efacac] text-white"
                            : "text-dark hover:bg-[#efacac] hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                          item.hide ? " hidden" : " block"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {auth?.token && (
                  <button
                    type="button"
                    className="relative rounded-full  p-1 text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={() => navigate('/messages')}
                  >
                    <span className="absolute -inset-1.5" />
                    <span className=" sr-only">View messages</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#000"
                      className="w-6 h-6 bg-blue-500 rounded-[50%] p-1 border-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                      />
                    </svg>

                    {/* <MessageIcon className="h-6 w-6" aria-hidden="true" /> */}
                  </button>
                )}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    {auth?.token && (
                      <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#000"
                          className="w-6 h-6 bg-blue-500 rounded-[50%] p-1 border-black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                        <div className="ml-[3px] hidden sm:block">{auth?.userInfo?.firstname}</div>
                      </Menu.Button>
                    )}
                    {!auth?.token && (
                      <div className="flex justify-center items-center">
                        <Link to="/signin">
                          <button
                            type="button"
                            className="mr-5 hidden md:block p-1 text-dark hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <div>Login</div>

                            {/* <MessageIcon className="h-6 w-6" aria-hidden="true" /> */}
                          </button>
                        </Link>

                        <Link to="/signup">
                          <button
                            type="button"
                            className="hidden md:block bg-[#5AB9EB] hover:bg-[#45a2d4] px-5 h-[49px] relative rounded-[10px] p-1 text-white  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <div>Sign Up</div>

                            {/* <MessageIcon className="h-6 w-6" aria-hidden="true" /> */}
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={handleLogout}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 bg-[#5AB9EB]">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-[#efacac] text-white"
                      : "text-white hover:bg-[#efacac] hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
