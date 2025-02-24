import React from 'react'
import DashboardCard from './DashboardCard/DashboardCard'
export interface AnalysisType {
    UserId: string
    Surveyscore: string
    Assessment: string
    Date: string
}

export default function Dashboard({analysis}: {analysis:AnalysisType[]}) {


  return (
    <div className=' w-full h-auto px-[80px] py-[10px] items-center flex flex-col gap-[15px] mt-[10px]'>
        <div className="w-full text-center text-surface">
            <p className="text-[30px] font-semibold">
            Your Survey Results – Reflect on Your Journey
            </p>
            <p className="text-[13px] font-extralight">
            Here&apos;s a snapshot of your responses. Take a moment to review your results and track your progress over time. Your feelings matter, and this is a space for self-reflection.
            </p>
      </div>

      <div className='w-full flex flex-col justify-center items-center gap-[10px]'>
            <DashboardCard analysis={analysis}/>
      </div>


    </div>
  )
}
