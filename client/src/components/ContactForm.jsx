import { useState } from "react";
import { toast } from "react-toastify";
import { Urls } from "../../src/routes/urls";

const ContactForm = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

      // console.error('Response:', await response.json());

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
    <form className="bgTwo" onSubmit={handleSendMessage}>
      <div className="text-[30px] font-[700] text-center mb-[40px]">
        Send us a message
      </div>
      <div className=" max-w-[800px] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 lg:m-auto mx-5 m-auto ">
        <input
          className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]"
          type="text"
          placeholder="First Name"
          required
          value={firstname}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <input
          className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]"
          type="text"
          placeholder="Last Name"
          required
          value={lastname}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <input
          className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]"
          type="text"
          placeholder="Mobile Number"
          required
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />
        <input
          className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="w-full flex justify-center mt-5 h-[167px] ">
        <textarea
          className="bg-[#fff] lg:w-[800px] w-full border border-[#9e9e9e] p-[5px] rounded-[8px] lg:mx-0 mx-5"
          placeholder="Message"
          name=""
          id=""
          required
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        ></textarea>
      </div>

      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="bg-[#5AB9EB] w-[200px] h-[45px] m-auto mt-[38px] rounded-[15px] text-[#fff] shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)]"
        >
          {loading ? "Loading" : "Send"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
