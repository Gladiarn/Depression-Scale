import { useEffect} from "react"
import { QuestionInterface} from "../QuestionHolder"
import { choicesType } from "../QuestionHolder"
export type questionsType = {
    questions: QuestionInterface[]
    sum: number
    setSum: (value:number) => void
    choices: choicesType[]
    setChoices: (value:choicesType[]) => void

}




export default function QuestionCards({questions, sum, setSum, choices, setChoices}:questionsType) {



    
    const pushChoice = (question:number, answer:number):void => {
        const choiceHolder = {question: question, answer: answer}
        
        const duplicateFinder = choices.filter((choice)=>{
            return choice.question === question
        })

        if(duplicateFinder.length == 0){
            setChoices([...choices,choiceHolder]);
        }else{
            const updatedChoices = choices.map(choice => choice.question === question ? choiceHolder : choice)
            setChoices(updatedChoices);
        }
    }

    useEffect(()=>{

        let sumHolder:number = 0;
        const choiceArray = choices.map((choice)=> choice.answer)

        for (let index:number = 0; index < choices.length; index++) {
            sumHolder += choiceArray[index];
        }
        
        setSum(sumHolder);

    },[choices, sum, setSum])

    const isSelected =  (currentQuestion:number,currentAnswer:number):boolean =>{

        return choices.some((choice) => choice.question === currentQuestion && choice.answer === currentAnswer)
    }



  return (
    <div className="w-full text-surface flex flex-col">
        {questions?.map((question, index)=>(
            

            <div className="w-full border-b py-[10px] border-surface flex border-opacity-[40%]" key={index}>
                
                <div className="w-full flex-col">
                    <div className="w-full font-bold text-[17px]">
                        <p>{question.category}</p>
                    </div>
                    <div className="w-full pr-[25px] pl-[10px] text-[14px]">
                        <p>{question.description}</p>
                    </div>
                </div>
                <div className="w-[700px] rounded-[8px] overflow-hidden shadow-[inset_0_0_0_1px] shadow-surface">
                    {Object?.values(question.scores).map((choice, i)=>(
                        <div data-value={`${choice},${i}`} key={i} onClick={()=>{pushChoice(index,i)}} className={` ${isSelected(index, i) ? 'bg-surface text-white': ''} w-full p-[10px] cursor-pointer hover:bg-surface hover:bg-opacity-[50%] hover:text-white border-b border-surface border-opacity-[50%] transition-all ease-in-out`}>
                            {choice}
                        </div>                 
                    
                    ))}
                </div>
            </div>
        ))}

    </div>
  )
}
