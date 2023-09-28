import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Happy from "../img/happy.png";
import { useEffect, useState } from "react";
import { Urls } from "../../src/routes/urls";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Forum = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => ({ ...state }));
  const [forum, setForum] = useState([]);

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

  useEffect(() => {
    const fetchForum = async () => {
      try {
        const response = await fetch(`${Urls?.baseUrl}${Urls?.getForum}`);

        if (!response.ok) {
          alert("Network response was not ok");
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setForum(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchForum();
  }, []);

  return (
    <>
      <Header />
      <div className="mx-16">
        <div className="w-full my-10 p-4 text-center bg-white rounded-lg hover:shadow sm:p-8">
          <h5 className="mb-2 text-3xl font-bold text-blue-900  text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600  ">
            Express Yourself, Connect with Others
          </h5>
          <p className="mb-5 text-base text-justify text-gray-500 sm:text-lg dark:text-gray-400">
            Genuine self-expression, in our opinion, has a transforming power
            that not only improves one's life but also helps others connect with
            one another. We offer a caring environment for you to be yourself,
            share your experiences, and interact with a broad community of
            like-minded people through a variety of disciplines including art,
            writing, conversations, and more.
          </p>
        </div>

        <div className="w-full mb-10">
          <Link
            to={`/myforum/${auth.userInfo.id}`}
            className=" my-4 text-white rounded-tl-lg rounded-br-[400px] rounded-tr-[200px] border border-red-100 hover:border-red-400 p-4 bg-gradient-to-r from-blue-200 to-pink-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-pink-600"
          >
            + Create New Topic
          </Link>
        </div>

        {/* Posts */}
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
          {forum.map((forum, i) => (
            <div
              key={i}
              className="w-full max-w-sm bg-white hover:border hover:border-gray-200 rounded-lg hover:shadow my-5"
            >
              <Link to={`/forum/${forum.id}`}>
                <img
                  className="p-8 rounded-t-lg"
                  src={Happy}
                  alt="Happy User"
                />

                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">
                      {forum.title}
                    </h5>
                  </a>
                  <div className="flex items-center mt-0.2 mb-2"></div>
                  <div className="text-center">
                    <span className="text-sm text-center font-normal text-gray-900 dark:text-white">
                      {forum.description}
                    </span>
                    {/* <a
                    href="#"
                    className="text-white bg-gradient-to-r from-blue-200 to-pink-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    View
                  </a> */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forum;
