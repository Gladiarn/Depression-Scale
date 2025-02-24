import React from 'react'
import { FaTrash } from "react-icons/fa";
import { AnalysisType } from '../Dashboard';

export default function DashboardCard({analysis}: {analysis:AnalysisType[]}) {


  return (
    <>
    { analysis.map((data, index)=>(

        <div key={index} className='w-full flex gap-[10px] justify-center items-center'>
        <div className='py-[2px] px-[10px] w-[500px] border border-surface rounded-[10px] text-surface'>
            <div className='flex gap-[5px]'>
                <p className='font-bold'>Assessment: </p>
                <p>{data.Assessment}</p>
            </div>
            <div className='flex gap-[5px]'>
                <p className='font-bold'>Score: </p>
                <p>{data.Surveyscore}</p>
            </div>
            
            <div className='flex gap-[5px]'>
                <p className='font-bold'>Date: </p>
                <p>{new Date(data.Date).toLocaleDateString()}</p>
            </div>


        </div>

        <div className='transition-all ease-in-out group w-[50px] h-[50px] bg-surface rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-white hover:border hover:border-surface'>
            <FaTrash className='transition-all ease-in-out group-hover:text-surface text-white text-[20px]'/>
        </div>
    </div>
    ))

}
</>
  )
}
