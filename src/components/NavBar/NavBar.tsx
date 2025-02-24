import { FaHandsHelping } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import Link from "next/link"
import { useSession } from "next-auth/react";

import SignOutModal from "@/components/SignOutModal/SignOutModal";
import { useState } from "react";

type NavbarType ={
    setShowWhat: (value:string)=> void
    showWhat:string
}

export default function NavBar({setShowWhat, showWhat}: NavbarType) {
        const { data: session } = useSession();

        const [isOpen, setIsOpen] = useState<boolean>(false);
        async function TriggerSignOut(){
            setIsOpen(!isOpen);
        }

  return (
    <div className="py-[5px] px-[20px] w-full fixed flex justify-between gap-[50px] items-center text-white bg-surface/70 z-[99] backdrop-blur-sm">

        <div className="flex items-center gap-[50px]">
            <div className="flex gap-[5px] text-[40px] font-bold items-center">
                <FaHandsHelping />
                <p>DepHelp</p>
            </div>
            

            <ul className="flex items-center gap-[20px] ">
                <li className={`relative before:transition-all before:ease-in-out ease-in-out hover:before:w-full before:content-[""] before:w-0 before:h-[2px] before:bg-white before:absolute before:bottom-[-3px] before:left-0`}>
                <Link href={"/"} className="tracking-widest">Home</Link>
                </li>
                <li className={`relative before:transition-all before:ease-in-out ease-in-out hover:before:w-full before:content-[""] before:w-0 before:h-[2px] before:bg-white before:absolute before:bottom-[-3px] before:left-0`}>
                <button onClick={()=>{if(showWhat === "Survey"){setShowWhat("")}else{setShowWhat("Survey")} }} className="tracking-widest">Survey</button>
                </li>
                <li className={`relative before:transition-all before:ease-in-out ease-in-out hover:before:w-full before:content-[""] before:w-0 before:h-[2px] before:bg-white before:absolute before:bottom-[-3px] before:left-0`}>
                <button onClick={()=>{window.scrollTo({top: document.documentElement.scrollHeight, behavior: "smooth"})}} className="tracking-widest">About</button>
                </li>
                
                
            </ul>
        </div>


        <div className="flex items-center gap-[15px]">
            <div className="flex items-center gap-[8px] cursor-pointer">
            <FaGlobe />
                <p>English</p>
            </div>

            <hr className="w-[1px] bg-white h-[25px] "/>
            
            {
                session?.user ?
            
            <span className="relative">
                <button onClick={()=>{TriggerSignOut()}} className="group whitespace-nowrap bg-white border text-surface py-[5px] px-[20px] rounded-[5px] font-semibold hover:bg-surface hover:border-white hover:text-white transition-all ease-in-out">
                LOG OUT
                
                </button>
                {
                    isOpen && <SignOutModal TriggerSignOut={TriggerSignOut}/>
                }
                
            </span>
            

                :
            <Link href={"/login"} className="whitespace-nowrap bg-white border text-surface py-[5px] px-[20px] rounded-[5px] font-semibold hover:bg-surface hover:border-white hover:text-white transition-all ease-in-out scale-100 hover:scale-[.90]">
                LOG IN
            </Link>

            }
            


        </div>
       
    </div>
  )
}
