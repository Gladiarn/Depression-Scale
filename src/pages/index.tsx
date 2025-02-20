import Footer from "@/components/Footer/Footer";
import Landing from "@/components/Landing/Landing";
import NavBar from "@/components/NavBar/NavBar";
import NavContainer from "@/components/NavContainer/NavContainer";
import QuestionHolder from "@/components/QuestionHolder/QuestionHolder";

import { depressionScaleType, QuestionInterface, propTypes } from "@/components/QuestionHolder/QuestionHolder";

export async function getServerSideProps() {
  console.log('Running getServerSideProps...'); // Check if this shows up in your terminal
  
  try {
    const res = await fetch('http://localhost:3000/api/fetchquestion');
    const res2 = await fetch('http://localhost:3000/api/fetchassessment');

    if (!res.ok || !res2.ok) {
      throw new Error(`Error fetching Questions, ${res.statusText}, ${res2.statusText}`);
    }

    const assessment: depressionScaleType[] = await res2.json();
    const data: QuestionInterface[] = await res.json();

    return {
      props: { data, assessment }
    };

  } catch (error) {
    console.log('Error in getServerSideProps:', error);
    return {
      props: { data: [], assessment: [] }
    };
  }
}

export default function Home({data, assessment} : propTypes) {




  return (
    <div className="w-full overflow-hidden flex flex-col bg-background text-black">

        <NavBar />
        <Landing/>
        <NavContainer />
        <div className="w-full px-[20px]">
          <QuestionHolder data={data} assessment={assessment}/>
        </div>  
        
        <Footer/>

        
        

    </div>
  );
}
