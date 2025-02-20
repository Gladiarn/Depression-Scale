import { useState } from "react";
import QuestionCards from "./QuestionCards/QuestionCards";
import { useSession } from "next-auth/react";


export type QuestionInterface ={
    category: string;
    description: string;
    scores: ScoresInterface;
  }
  
export type ScoresInterface = {
    [key: number] : string;
  }

  
export type depressionScaleType = {
  lowest: number
  highest: number
  grade: string
}
  
export type messageType =(value:string) => void

  export type choicesType = {
      question: number
      answer: number
  };

export type propTypes = {
  data: QuestionInterface[]
  assessment: depressionScaleType[]
}


  

export default function QuestionHolder({data, assessment}: propTypes) {

  const {data: session} = useSession()


 const [choices, setChoices] = useState<choicesType[]>([])
 const [grade, setGrade] = useState<string>('Not yet Assessed');

 const messageSetter = ():void =>{

    const assessmentholder = assessment.find(scale => sum >= scale.lowest && sum<= scale.highest)

    if(choices.length == 15){
          setGrade(assessmentholder ? assessmentholder.grade : 'Not yet Assessed');
    }

 }

  const [sum, setSum] = useState<number>(0);

 async function submitAnalysis(){
    // const collectedData = {
    //   UserId: session?.user?.id

    // }
    console.log(session?.user?.id)
 }







  return (
    <div className="w-full h-[1000px] overflow-y-auto px-[80px] py-[10px] items-center flex flex-col gap-[15px] mt-[10px]">
        <div className="w-full text-center text-surface">
            <p className="text-[30px] font-semibold">Take the Test – It&apos;s Okay to Check In with Yourself</p>
            <p className="text-[13px] font-extralight">The questions below are here to help you understand how you&apos;re feeling. Rate each from 0 being the lowest to 5 as the highest — there&apos;s no right or wrong answer, just how you feel.</p>
        </div>
        <div className="px-[100px] py-[20px] pt-[50px] w-full">
            <QuestionCards questions = {data} sum={sum} setSum={setSum} choices={choices} setChoices={setChoices}/>
        </div>

        <div className="w-full text-center flex flex-col gap-[5px] ">
            <p className="text-surface text-[13px] ">Ready to Assess your score now?</p>
            <button onClick={()=>{messageSetter()}} className="hover:scale-[.99] transition-all ease-in-out scale-100 w-full bg-surface text-white p-[8px] rounded-[8px] text-[20px] tracking-widest">Asses Now</button>
        </div>


            <div className="text-white bg-surface p-[25px] flex flex-col gap-[15px] rounded-[8px] sticky bottom-0">
              <div>
                <p className="text-[30px] font-bold">Here are your results</p>
                <p className="text-[13px]">Your score reflects how you&apos;re feeling right now. Remember, this is just a guide—take care of yourself, and don&apos;t hesitate to reach out for support if needed.</p>
              </div>
                <div>
                  <p className="font-bold">Survey Score: {sum}</p>
                  <p className="font-bold">Assessment: {grade}</p>
                </div>

                {/* Saves Analysis */}
                <div className="w-full flex justify-center">
                  <button onClick={()=>{submitAnalysis()}} className="border border-white py-[5px] px-[15px] rounded-[8px] hover:bg-white hover:text-surface transition-all ease-in-out">Save Analysis</button>
                </div>
                
            </div>
      

    </div>
  )
}
