import { useState } from "react";

export default function Test() 
{
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState("🌞");

     return (<>
  <div className=" w-[400px] h-[300px] bg-white shadow-2xl flex flex-row gap-2 flex justify-center items-center" >


    <button className="bg-red-500 w-[100px] h-[50px] text-white"
    onClick={() => {
   setCount(count - 1);
  console.log(count)}
  }>
      Decrement
    </button>

    <h1 className='w-[100px] h-[50px] text-[30px] text-center'>{count}</h1>

    <button className="bg-yellow-500 w-[100px] h-[50px] text-white" onClick=
    {
      () => {
        setCount(count + 1);
        console.log(count)
      }
    }>
      Increment
    </button>


  </div>



  <div className=" w-[400px] h-[300px] bg-white shadow-2xl flex flex-col gap-2 flex justify-center items-center" >

       <span className="h-[50px] text-2xl font-bold">
        {status}
       </span>
       <div className="w-full h-[50px]  justify-center items-center flex flex-row ">

            <button className="w-[100px] h-full bg-amber-600 text-white" onClick={() => setStatus("🌚 ")}>
                off
            </button>
             <button className="w-[100px] h-full bg-green-600 text-white" onClick={() => setStatus("🌞 ")}>
                on
            </button>

       </div>


  </div>


  </>)
}