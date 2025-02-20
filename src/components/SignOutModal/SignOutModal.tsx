import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react'
import { RxCross2,RxCheck } from "react-icons/rx";

export default function SignOutModal({TriggerSignOut} : {TriggerSignOut: () =>  void}) {

    const router = useRouter();
    
    async function SignOutTrigger():Promise<void>{
        await signOut({redirect: false});
        router.push("/");
    }

  return (

        <div className='whitespace-nowrap text-surface gap-[15px] bg-white flex flex-col absolute left-[96%] translate-x-[-96%] bottom-[-108px] p-[15px] rounded-[8px] border border-surface before:content-[""] before:absolute before:w-0 before:h-0 before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent before:border-b-[10px] before:border-b-white before:-top-2 before:left-3/4 before:-translate-x-1/2'>

            <p className='text-[13px]'>
                Are you sure you want to sign out?
            </p>

            <div className='flex gap-[15px] justify-center'>
                <button className='border border-surface p-[5px] rounded-[5px] hover:bg-surface hover:text-white transition-all ease-in-out' onClick={()=>{TriggerSignOut()}}><RxCross2 /></button>
                <button className='border border-surface p-[5px] rounded-[5px] hover:bg-surface hover:text-white transition-all ease-in-out' onClick={()=>{SignOutTrigger()}}><RxCheck /></button>
            </div>
        </div>

  )
}
