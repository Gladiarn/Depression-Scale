import React, { useState } from 'react'

export default function Index() {
    const [input, setInput] = useState<number>(0)

    function squareRooter(){
        let incrementor = 1;
        let value = 0;

        for(let x = 1; x <= input ; x++){
            
            
            if(x===1){
                console.log(value+x)
                continue
            }

            incrementor += x;
            value+=incrementor;
            console.log(value)
        }
    }
  return (
    <div className='bg-black text-white w-full h-screen'>
        <input value={input} onChange={(e)=>{setInput(parseInt(e.target.value))}}type="number" className='text-black'/>
        <button onClick={()=>{squareRooter()}}>Test</button>
    </div>
  )
}
