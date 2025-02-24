import Dashboard from "@/components/Dashboard/Dashboard";
import Footer from "@/components/Footer/Footer";
import Landing from "@/components/Landing/Landing";
import NavBar from "@/components/NavBar/NavBar";
import NavContainer from "@/components/NavContainer/NavContainer";
import QuestionHolder from "@/components/QuestionHolder/QuestionHolder";

import { AnalysisType } from "@/components/Dashboard/Dashboard";
import { depressionScaleType, QuestionInterface} from "@/components/QuestionHolder/QuestionHolder";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";


export interface indexpropTypes {
  data: QuestionInterface[];
  assessment: depressionScaleType[];
};

export async function getServerSideProps(context : GetServerSidePropsContext) {
  console.log('Running getServerSideProps...');

  const { req } = context;
  const cookies = req.headers.cookie || "";

  try {
    const res = await fetch("http://localhost:3000/api/fetchquestion", {
      headers: { Cookie: cookies },
    });

    const res2 = await fetch("http://localhost:3000/api/fetchassessment", {
      headers: { Cookie: cookies },
    });

    const res3 = await fetch("http://localhost:3000/api/getanalysis", {
      headers: { Cookie: cookies },
    });



    if (!res.ok || !res2.ok ) {
      throw new Error(
        `Error fetching data: ${res.statusText}, ${res2.statusText}}`
      );
    }

    const assessment: depressionScaleType[] = await res2.json();
    const data: QuestionInterface[] = await res.json();
    const analysis: AnalysisType[] = await res3.json();

    console.log('analysis: ',analysis);

    return {
      props: { data, assessment, analysis }
    };

  } catch (error) {
    console.log('Error in getServerSideProps:', error);
    return {
      props: { data: [], assessment: [], analysis: [] }
    };
  }
}

export default function Home({data, assessment} : indexpropTypes) {

  const [analysis, setAnalysis] = useState<AnalysisType[]>([]);

  useEffect(()=>{
    async function fetchAnalysis(){
      try {
          const cookies = document.cookie;
          const res3 = await fetch("http://localhost:3000/api/getanalysis", {
          headers: { Cookie: cookies },
          credentials: "include",
        });

        if(!res3){
          throw new Error("Failed to fetch analysis");
        }

        const data = await res3.json();
        setAnalysis(data);
        
      } catch (error) {
        console.log(error);
      }
    }

    fetchAnalysis();
  },[data])

    
    const [showWhat, setShowWhat] = useState<string>("Survey");




    return (

      <div className = " w-full overflow-hidden flex flex-col bg-background text-black">
        

        <NavBar setShowWhat={setShowWhat} showWhat={showWhat}/>
        <Landing/>
        <NavContainer />
          { showWhat === 'Survey' ?
            <div className="w-full px-[20px]">
              <QuestionHolder data={data} assessment={assessment}/>
            </div>
            :
           <div className="w-full px-[20px]">
            <Dashboard analysis={analysis}/>
           </div>
          }
        
        <Footer/>

        
        

    </div>
  );
}
