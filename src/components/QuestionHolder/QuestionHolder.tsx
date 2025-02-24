import { useEffect, useState } from "react";
import QuestionCards from "./QuestionCards/QuestionCards";
import { useSession } from "next-auth/react";

export type QuestionInterface = {
  category: string;
  description: string;
  scores: ScoresInterface;
};

export type ScoresInterface = {
  [key: number]: string;
};

export type depressionScaleType = {
  lowest: number;
  highest: number;
  grade: string;
};

export type messageType = (value: string) => void;

export type choicesType = {
  question: number;
  answer: number;
};

export type propTypes = {
  data: QuestionInterface[];
  assessment: depressionScaleType[];
};

export default function QuestionHolder({ data, assessment }: propTypes) {

  function closeSaving(){
    setIsOpenAnalysis(false);
  }

  useEffect(() => {
    const todayDate = new Date();
    const year = todayDate.getFullYear().toString();
    const month = (todayDate.getMonth() + 1).toString().padStart(2, "0");
    const day = todayDate.getDate().toString().padStart(2, "0");
    setToday(`${month}-${day}-${year}`);
  }, []);

  const { data: session } = useSession();

  const [isOpenAnalysis, setIsOpenAnalysis] = useState<boolean>(false)

  const [choices, setChoices] = useState<choicesType[]>([]);
  const [grade, setGrade] = useState<string>("Not yet Assessed");
  const [today, setToday] = useState<string>("");

  const [message, setMessage] = useState<string>("")

  const messageSetter = (): void => {
    const assessmentholder = assessment.find(
      (scale) => sum >= scale.lowest && sum <= scale.highest
    );

    if (choices.length == 15) {
      setGrade(assessmentholder ? assessmentholder.grade : "Not yet Assessed");
    }
  };

  const [sum, setSum] = useState<number>(0);

  async function submitAnalysis() {
    try {
      if (grade === "Not yet Assessed") {
        setMessage("You must be finish the survey and assessment first before saving.");
        setIsOpenAnalysis(true);
        return;
      }
      if (!session?.user) {
        setMessage("You must Log In first for us to save your recent analysis.");
        setIsOpenAnalysis(true);
        return;
      }

      const collectedData = {
        UserId: session?.user?.id,
        Surveyscore: sum,
        Assessment: grade,
        Date: today,
      };

      const res = await fetch("http://localhost:3000/api/addanalysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collectedData),
        credentials: "include",
      });

      if (res.ok) {
        setChoices([]);
        setSum(0);
        setGrade("Not yet Assessed");
        setMessage("Your survey analysis has been successfully saved.");
        setIsOpenAnalysis(true);

      } else {
        setMessage("Failed to save your survey analysis. Please try again.");
        setIsOpenAnalysis(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-[1000px] overflow-y-auto px-[80px] py-[10px] items-center flex flex-col gap-[15px] mt-[10px]">
      <div className="w-full text-center text-surface">
        <p className="text-[30px] font-semibold">
          Take the Test – It&apos;s Okay to Check In with Yourself
        </p>
        <p className="text-[13px] font-extralight">
          The questions below are here to help you understand how you&apos;re
          feeling. Rate each from 0 being the lowest to 5 as the highest —
          there&apos;s no right or wrong answer, just how you feel.
        </p>
      </div>
      <div className="px-[100px] py-[20px] pt-[50px] w-full">
        <QuestionCards
          questions={data}
          sum={sum}
          setSum={setSum}
          choices={choices}
          setChoices={setChoices}
        />
      </div>

      <div className="w-full text-center flex flex-col gap-[5px] ">
        <p className="text-surface text-[13px] ">
          Ready to Assess your score now?
        </p>
        <button
          onClick={() => {
            messageSetter();
          }}
          className="hover:scale-[.99] transition-all ease-in-out scale-100 w-full bg-surface text-white p-[8px] rounded-[8px] text-[20px] tracking-widest"
        >
          Asses Now
        </button>
      </div>

      <div className="text-white bg-surface p-[25px] flex flex-col gap-[15px] rounded-[8px] sticky bottom-0">
        <div>
          <p className="text-[30px] font-bold">Here are your results</p>
          <p className="text-[13px]">
            Your score reflects how you&apos;re feeling right now. Remember,
            this is just a guide—take care of yourself, and don&apos;t hesitate
            to reach out for support if needed.
          </p>
        </div>
        <div>
          <p className="font-bold">Survey Score: {sum}</p>
          <p className="font-bold">Assessment: {grade}</p>
        </div>

        {/* Saves Analysis */}
        <div className="w-full flex justify-center">
          <span className="relative">
            <button
              onClick={() => {
                submitAnalysis();
              }}
              className="border border-white py-[5px] px-[15px] rounded-[8px] hover:bg-white hover:text-surface transition-all ease-in-out"
            >
              Save Analysis
            </button>

           { isOpenAnalysis && <div
              className="before:content-[''] before:absolute before:w-0 before:h-0 before:border-l-[10px] before:border-l-transparent rounded-[5px] gap-[10px] p-[10px] flex flex-col justify-between text-surface
              before:border-r-[10px] before:border-r-transparent before:border-t-[10px] before:border-t-white before:border-b-0 before:-bottom-2 
              before:left-1/2 before:-translate-x-1/2 w-[250px] absolute bg-white top-[155%] translate-y-[-155%] left-[50%] translate-x-[-50%] z-50 border border-surface"
            >
              <div className="flex flex-col gap-[5px] items-center">
                <p className="text-[18px] font-bold">Alert</p>
                <p className="text-[13px] text-center ">{message}</p>
              </div>

              <button onClick={closeSaving} className="p-[5px] border border-surface rounded-[5px] w-full font-semibold hover:bg-surface hover:text-white transition-all ease-in-out">Close</button>
            </div>}

          </span>
        </div>
      </div>
    </div>
  );
}
