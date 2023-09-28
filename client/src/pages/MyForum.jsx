import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Happy from "../img/happy.png";
import { useEffect, useState } from "react";
import { Urls } from "../../src/routes/urls";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MyForum = () => {
  const [title, setTitle] = useState("");
  const [forum, setForum] = useState([]);
  const [description, setDescription] = useState("");
  const [showing, setShowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => ({ ...state }));
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const show = () => {
    setShowing((prev) => !prev);
  };

  const handleSendMessage = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(`${Urls?.baseUrl}${Urls?.createForum}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          createdby: auth.userInfo.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        // const data = await response.json();
        // console.info('Success:', data);
        setTitle("");
        setDescription("");
        toast.success("Created Successfully");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchForum = async () => {
      try {
        const response = await fetch(
          `${Urls?.baseUrl}${Urls?.getForum}/${auth.userInfo.id}`
        );

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

  const deleteItem = async (id) => {
    try {
      const response = await fetch(
        `${Urls?.baseUrl}${Urls?.deleteForum}/${auth.userInfo.id}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted item from the local state (todos)
        setForum((prevForum) => prevForum.filter((forum) => forum.id !== id));
        toast.success("Deleted Successfully");
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const startEdit = (id, taskText) => {
    setEditTaskId(id);
    setEditedTaskText(taskText);
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditedTaskText("");
  };

  const editItem = async (id) => {
    try {
      const response = await fetch(
        `${Urls?.baseUrl}${Urls?.getForum}/${auth.userInfo.id}`,
        {
          method: "PUT", // Use PUT method to update the task
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: description, // You can set this based on your logic
          }),
        }
      );

      if (response.ok) {
        // Update the task in the local state (todos)
        setForum((prevForum) =>
          prevForum.map(
            (forum) =>
              forum.id === id && {
                ...forum,
                title: editedTitle,
                description: editedDescription,
              }
          )
        );

        // Reset edit state
        cancelEdit();
      } else {
        console.error("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="mx-16">
        <div className="w-full my-10 p-4 text-center bg-white rounded-lg hover:shadow sm:p-8">
          <h5 className="mb-2 text-3xl font-bold text-blue-900 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600  ">
            My Forum Topics
          </h5>
        </div>

        <div className="w-full mb-10">
          <button
            onClick={show}
            className=" my-4 text-white rounded-tl-lg rounded-br-[400px] rounded-tr-[200px] border border-red-100 hover:border-red-400 p-4 bg-gradient-to-r from-blue-200 to-pink-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-pink-600"
          >
            + Create New Topic
          </button>

          {showing && (
            <form onSubmit={handleSendMessage}>
              <div className="flex gap-4">
                <div className="mb-6 w-[50%]">
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Forum Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="This is my forum title"
                    required
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-6 w-[50%]">
                  <label
                    for="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Forum Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    required
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#5AB9EB] w-[200px] h-[45px] m-auto mt-[38px] rounded-[15px] text-[#fff] shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)]"
              >
                {loading ? "Loading" : "Send"}
              </button>
            </form>
          )}
        </div>

        {/* Posts */}

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {forum.map((forum, i) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  {}
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {forum.title}
                  </th>
                  <td className="px-6 py-4">{forum.description}</td>
                  <td className="px-6 py-4">
                    <Link onClick={() => deleteItem(forum.id)}>Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyForum;
