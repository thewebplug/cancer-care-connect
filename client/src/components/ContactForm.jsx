const ContactForm = () => {
    return (
        <div className="bgTwo">
            <div className="text-[30px] font-[700] text-center mb-[40px]">Send us a message</div>
            <div className=" w-[800px] grid grid-cols-2 gap-[47px] m-auto">

            <input className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]" type="text" placeholder="First Name" />
                <input className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]" type="text" placeholder="Last Name" />
                <input className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]" type="text" placeholder="Mobile Number" />
                <input className="bg-[#fff] border border-[#9e9e9e] p-[5px] rounded-[8px]" type="text" placeholder="Email" />
                
            </div>
            <div className="w-full flex justify-center mt-[47px] h-[167px]">
                <textarea className="bg-[#fff] w-[800px] border border-[#9e9e9e] p-[5px] rounded-[8px]" placeholder="Message" name="" id=""></textarea>
                </div>

               <div className="w-full flex justify-center">
               <button className="bg-[#5AB9EB] w-[200px] h-[45px] m-auto mt-[38px] rounded-[15px] text-[#fff] shadow-[2px_5px_4px_0px_rgba(199,199,199,0.25)]">
              Send
            </button>
               </div>
        </div>
    )
}

export default ContactForm;