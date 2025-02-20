import {motion } from "motion/react"
import { useSession } from "next-auth/react"
export default function Landing() {

  const {data: session} = useSession();

  const HomeVariants = {
    initial: {opacity: 0, x: "-10vw"},
    animate:{ opacity: 1, x: 0}

  }

  const ChildVariants = {
    initial: {opacity: 0, x: "-10vw"},
    animate: {opacity: 1, x: 0,
    transition: {delay: .2}}
  }


  return (
    <div className="w-full h-[450px]">
        <div className="w-full h-full bg-surface text-white p-[100px] text-start">
            <div className="w-full h-full flex flex-col gap-[10px] mt-[20px]">
                <motion.p  variants={HomeVariants} initial={"initial"} animate={"animate"} transition={{type:'spring', duration: .5}} className="text-[40px] font-bold">Your Mental Health Matters <a href="" className="italic">{session?.user?.name}</a> - Take the Step Today</motion.p>
                
                <motion.div variants={ChildVariants} initial={"initial"} animate={"animate"} transition={{delay: .2}} className="w-1/2 pl-[8px] text-start">
                    <p className="text-[13px] font-extralight">Feeling overwhelmed, tired, or stuck? Discover your mental wellness with our quick and confidential depression test.
                    In just a few minutes, gain insight into your emotional well-being and take the first step toward a healthier you. We offer free services ©</p>
                </motion.div>
            </div>
        </div>
    </div>
  )
}
