import { FaHourglassHalf } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaHeartbeat } from "react-icons/fa";

export default function NavContainer() {
  return (
    <div className="w-full flex justify-center gap-[30px] p-[5px] relative overflow-visible">
        <div className="hover:scale-[.99] transition-all cursor-pointer ease-in-out scale-100 h-[170px] w-[250px] bg-white mt-[-90px] shadow-soft z-50 rounded-[5px] flex flex-col p-[20px]">
            <div className="w-full h-full flex justify-center items-center text-surface">
                <FaHourglassHalf className="text-[40px]"/>
            </div>
            <div className="w-full h-full text-center">
                <p className="text-surface font-medium text-[13px]">No Long Forms, No Waiting – Just a Fast Mental Health Check</p>
            </div>
        </div>
        <div className="hover:scale-[.99] transition-all cursor-pointer ease-in-out scale-100 h-[170px] w-[250px] bg-white mt-[-90px] shadow-soft z-50 rounded-[5px] flex flex-col p-[20px]">
            <div className="w-full h-full flex justify-center items-center text-surface">
                <FaShieldAlt className="text-[40px]"/>
            </div>
            <div className="w-full h-full text-center">
                <p className="text-surface font-medium text-[13px]">Confidential and Secure – Your Answers Stay Private</p>
            </div>
        </div>
        <div className="hover:scale-[.99] transition-all cursor-pointer ease-in-out scale-100 h-[170px] w-[250px] bg-white mt-[-90px] shadow-soft z-50 rounded-[5px] flex flex-col p-[20px]">
            <div className="w-full h-full flex justify-center items-center text-surface">
                <FaHeartbeat className="text-[40px]"/>
            </div>
            <div className="w-full h-full text-center">
                <p className="text-surface font-medium text-[13px]">Personalized and Supportive – Built to Help You Take the First Step</p>
            </div>
        </div>
    </div>
  )
}
