import { useState } from "react";

export default function Test() {

    const [count, setCount] = useState(0)
    const [status, setStatus] = useState("🌚")

  return (
    <div className="w-full h-full flex-col flex items-center justify-center">
        <div className="w-[400px] h-[300px] shadow-2xl justify-center items-center flex">
            
            <button className="w-[100px] h-[50px] bg-blue-500 text-white font-bold rounded-3xl hover:bg-blue-700"
            onClick={()=>{
                setCount(count - 1)
            }}>
                Decrement
            </button>  

            <h1 className="w-[100px] h-[50px] text-4xl font-bold text-center">{count}</h1>

            <button className="w-[100px] h-[50px] bg-green-500 text-white font-bold rounded-3xl hover:bg-green-700"
            onClick={()=>{
                setCount(count + 1)
            }}>
                Increment
            </button>
            


        </div>

        <div className="w-[400px] h-[300px] shadow-2xl flex flex-col justify-center items-center">
            <span className="w-[30px] h-[30px] font-bold text-center">
                {status}
           </span>
            <div className="w-full h-[50px] flex justify-center">
                <button className="w-[100px] text-white h-full bg-red-600 hover:bg-red-800"
                onClick={
                    ()=>{
                        setStatus("🌚")
                    }
                }>off</button>
                <button className="w-[100px] text-white h-full bg-green-600 hover:bg-green-800"
                onClick={
                    ()=>{
                        setStatus("🌞")
                    }
                }>on</button>
                
            </div>
        </div>
    </div>
  )

}