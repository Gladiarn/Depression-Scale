import { useState } from "react";
import QuestionCards from "./QuestionCards/QuestionCards";

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

export const depressionAssessment: QuestionInterface[] = [
  {
    category: "Depressed Mood",
    description: "Feelings of sadness, hopelessness, or discouragement, with a tendency to cry frequently.",
    scores: {
      0: "Absent",
      1: "Mild sadness",
      2: "Occasional weeping",
      3: "Persistent sadness",
      4: "Constant sadness with extreme symptoms"
    }
  },
  {
    category: "Feelings of Guilt",
    description: "Excessive self-blame or feelings of worthlessness.",
    scores: {
      0: "Absent",
      1: "Mild self-reproach",
      2: "Persistent guilt feelings",
      3: "Believes current problems are a punishment",
      4: "Delusions or hallucinations of guilt"
    }
  },
  {
    category: "Suicide",
    description: "Thoughts or behaviors related to self-harm or suicidal ideation.",
    scores: {
      0: "Absent",
      1: "Feels life is not worth living",
      2: "Wishes to be dead",
      3: "Suicidal thoughts or gestures",
      4: "Attempted suicide"
    }
  },
  {
    category: "Initial Insomnia",
    description: "Difficulty falling asleep at the beginning of the night.",
    scores: {
      0: "Absent",
      1: "Occasional difficulty falling asleep",
      2: "Frequent difficulty",
      3: "Takes over an hour to fall asleep",
      4: "Unable to sleep"
    }
  },
  {
    category: "Middle Insomnia",
    description: "Waking frequently during the night.",
    scores: {
      0: "Absent",
      1: "Occasional waking",
      2: "Frequent waking",
      3: "Multiple awakenings with difficulty returning to sleep",
      4: "Severe disturbance throughout the night"
    }
  },
  {
    category: "Delayed Insomnia",
    description: "Waking too early and being unable to fall asleep again.",
    scores: {
      0: "Absent",
      1: "Occasionally wakes early",
      2: "Frequently wakes early",
      3: "Wakes 2+ hours early and cannot return to sleep",
      4: "Consistently wakes far too early"
    }
  },
  {
    category: "Work and Interests",
    description: "Loss of interest in usual activities, work, and hobbies.",
    scores: {
      0: "No difficulty",
      1: "Mild lack of interest",
      2: "Loss of interest in hobbies",
      3: "Reduced productivity",
      4: "Unable to engage in any activities"
    }
  },
  {
    category: "Psychomotor Retardation",
    description: "Slowness in speech, thought, or physical movements.",
    scores: {
      0: "Absent",
      1: "Slight slowing of movements",
      2: "Obvious retardation",
      3: "Severe slowing, requires effort to interview",
      4: "Stupor or extreme physical inactivity"
    }
  },
  {
    category: "Agitation",
    description: "Physical restlessness and signs of anxiety.",
    scores: {
      0: "Absent",
      1: "Mild restlessness",
      2: "Moderate restlessness",
      3: "Severe agitation",
      4: "Constant agitation and pacing"
    }
  },
  {
    category: "Anxiety (Psychological)",
    description: "Mental symptoms of anxiety such as worry or fear.",
    scores: {
      0: "Absent",
      1: "Mild tension and irritability",
      2: "Persistent worrying",
      3: "Apprehensive thoughts",
      4: "Severe fear and panic"
    }
  },
  {
    category: "Anxiety (Somatic)",
    description: "Physical symptoms of anxiety (palpitations, headaches, sweating, etc.).",
    scores: {
      0: "Absent",
      1: "Mild physical symptoms",
      2: "Moderate symptoms",
      3: "Severe physical distress",
      4: "Incapacitating physical symptoms"
    }
  },
  {
    category: "Somatic Symptoms (Gastrointestinal)",
    description: "Digestive issues like loss of appetite or nausea.",
    scores: {
      0: "Absent",
      1: "Mild gastrointestinal discomfort",
      2: "Moderate loss of appetite",
      3: "Severe nausea or indigestion",
      4: "Complete loss of appetite"
    }
  },
  {
    category: "General Somatic Symptoms",
    description: "General physical fatigue and heaviness in limbs.",
    scores: {
      0: "Absent",
      1: "Mild fatigue",
      2: "Moderate heaviness or pain",
      3: "Severe physical discomfort",
      4: "Incapacitating fatigue"
    }
  },
  {
    category: "Hypochondriasis",
    description: "Excessive preoccupation with health and bodily functions.",
    scores: {
      0: "Absent",
      1: "Mild health concerns",
      2: "Persistent focus on physical symptoms",
      3: "Severe preoccupation with illness",
      4: "Delusional beliefs about health problems"
    }
  },
  {
    category: "Weight Loss",
    description: "Noticeable decrease in body weight related to depression.",
    scores: {
      0: "None",
      1: "Slight weight loss",
      2: "Moderate weight loss",
      3: "Significant weight loss",
      4: "Severe and unhealthy weight loss"
    }
  }
];

  const depressionScale:depressionScaleType[] = [{
    lowest: 0,
    highest: 7,
    grade: "Normal"
  },
  {
    lowest: 8,
    highest: 13,
    grade: "Mild Depression"
  },
  {
    lowest: 14,
    highest: 18,
    grade: "Moderate Depression"
  },
  {
    lowest: 19,
    highest: 22,
    grade: "Severe Depression"
  },
  {
    lowest: 23,
    highest: 99,
    grade: "Very Severe Depression"
  },

  ]

  export type choicesType = {
      question: number
      answer: number
  };
  

export default function QuestionHolder() {

 const [choices, setChoices] = useState<choicesType[]>([])
 const [grade, setGrade] = useState<string>('Not yet Assessed');

 const messageSetter = ():void =>{

    const assessment = depressionScale.find(scale => sum >= scale.lowest && sum<= scale.highest)

    if(choices.length == 15){
          setGrade(assessment ? assessment.grade : 'Not yet Assessed');
    }

 }

  const [sum, setSum] = useState<number>(0);


  return (
    <div className="w-full h-[1000px] overflow-y-auto px-[80px] py-[10px] items-center flex flex-col gap-[15px] mt-[10px]">
        <div className="w-full text-center text-surface">
            <p className="text-[30px] font-semibold">Take the Test – It&apos;s Okay to Check In with Yourself</p>
            <p className="text-[13px] font-extralight">The questions below are here to help you understand how you&apos;re feeling. Rate each from 0 being the lowest to 5 as the highest — there&apos;s no right or wrong answer, just how you feel.</p>
        </div>
        <div className="px-[100px] py-[20px] pt-[50px] w-full">
            <QuestionCards questions = {depressionAssessment} sum={sum} setSum={setSum} choices={choices} setChoices={setChoices}/>
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
            </div>
      

    </div>
  )
}
