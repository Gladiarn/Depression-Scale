import Footer from "@/components/Footer/Footer";
import Landing from "@/components/Landing/Landing";
import NavContainer from "@/components/NavContainer/NavContainer";
import QuestionHolder from "@/components/QuestionHolder/QuestionHolder";

export default function Home() {




  return (
    <div className="w-full overflow-hidden flex flex-col bg-background text-black">


        <Landing/>
        <NavContainer />
        <div className="w-full px-[20px]">
          <QuestionHolder/>
        </div>  
        
        <Footer/>
        

    </div>
  );
}
