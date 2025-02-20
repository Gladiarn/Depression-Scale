import { FaHandsHelping } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

export default function Footer() {
  return (
    <div className="gap-[20px] flex flex-col w-full bg-surface text-white p-[40px]">
        <div className="w-full flex justify-between">
            <p className="text-[40px] font-bold flex gap-[5px] items-center"><FaHandsHelping />DepHelp</p>
            <ul className="flex gap-[10px]">
                <li className="cursor-pointer"><p>Contacts</p></li>
                <li className="cursor-pointer"><p>Personality</p></li>
                <li className="cursor-pointer"><p>Cities</p></li>
                <li className="cursor-pointer"><p>Careers</p></li>
                <li className="cursor-pointer"><p>Security</p></li>
                <li className="cursor-pointer"><p>Cookies</p></li>
                <li className="cursor-pointer"><p>FAQs</p></li>
            </ul>

        </div>

        <div className="w-full flex">
            <div className="w-full flex gap-[20px] justify-start">
            <FaFacebook className="text-[20px] hover:scale-[.95] scale-100 transition-all ease-in-out cursor-pointer hover:text-gray-300 "/>
            <BsTwitterX className="text-[20px] hover:scale-[.95] scale-100 transition-all ease-in-out cursor-pointer hover:text-gray-300 "/>
            <FaInstagram className="text-[20px] hover:scale-[.95] scale-100 transition-all ease-in-out cursor-pointer hover:text-gray-300 "/>
            </div>

            <div className="w-full text-center">
                <p className="whitespace-nowrap">© 2025 All Rights Reserved.</p>
            </div>

            <div className="w-full flex justify-end">
                <button onClick={()=>{window.scrollTo({top:0, behavior: "smooth"})}}className="py-[5px] px-[20px] border border-white rounded-[25px] flex items-center gap-[5px]">Back to top <IoIosArrowUp /></button>
            </div>

        </div>
    </div>
  )
}
