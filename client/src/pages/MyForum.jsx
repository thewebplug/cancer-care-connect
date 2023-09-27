import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Happy from "../img/happy.png";
import { useState } from "react";

const MyForum = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showing, setShowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const show = () => {
    setShowing(prev => !prev);
  }

  const handleSendMessage = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(`${Urls?.baseUrl}${Urls?.contact}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          phone,
          email,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data = await response.json();
        // console.info('Success:', data);
        setEmail("");
        setFirstName("");
        setLastName("");
        setMessage("");
        setPhone("");
        toast.success("We'll get back to you shortly");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    setLoading(false);
  };


  return (
    <>
      <Header />
      <div className="mx-16">
        <div className="w-full my-10 p-4 text-center bg-white rounded-lg hover:shadow sm:p-8">
          <h5 className="mb-2 text-3xl font-bold text-blue-900  text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600  ">
            My Forum Topics
          </h5>
        </div>

        <div className="w-full mb-10">
          <button onClick={show} className=" my-4 text-white rounded-tl-lg rounded-br-[400px] rounded-tr-[200px] border border-red-100 hover:border-red-400 p-4 bg-gradient-to-r from-blue-200 to-pink-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-pink-600">
            + Create New Topic
          </button>

          {
            showing &&
            <form>
              <div className="mb-6">
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
              </div>
              <div className="mb-6">
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
          }
        </div>

        {/* Posts */}
        <div className="w-full max-w-sm bg-white hover:border hover:border-gray-200 rounded-lg hover:shadow my-5">
          <a href="#">
            <img
              className="p-8 rounded-t-lg"
              src={Happy}
              alt="Happy User"
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
              </h5>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
             
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                $599
              </span>
              <a
                href="#"
                className="text-white bg-gradient-to-r from-blue-200 to-pink-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyForum;
