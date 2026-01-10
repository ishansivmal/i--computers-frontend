import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";



export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login()
  {
    
    
    try {
      const response = await axios.post(import.meta.env.VITE_backEnd_URL + "/users/login", {
        email: email,
        password: password
      });
      console.log("Login successful Welcome back:", response.data);
      //store token in browser table
      localStorage.setItem("Token", response.data.token);
      // we get token as we need by using token variable
      const token = localStorage.getItem("Token");

      // by role we route the user
      if(response.data.role === "admin") {
        // window.location.href = "/admin";
        navigate("/admin");
      } else {
        navigate("/");
      }
      toast.success("Login successful! ");

    } catch (error) {
      toast.error("Login failed!");
      console.error("Login failed:", error);
    }
  }


  return (

    <div className="w-full h-screen  bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex">

      <div className="w-[50%] h-full flex justify-center items-center flex-col">
        <img src="/logo.png" alt="Logo" className="w-[200px] h-[200px] mb-[20px] object-cover" />
        <h1 className="text-center text-[50px] text-gold text-shadow-2xs font-bold"> Plug in Power Up Play Hard</h1>
         <p className="text-center text-[30px] text-white italic"> Your Ultimate Destination for Gaming Gear</p>

      </div>
      <div className="w-[50%] h-full flex justify-center items-center">
            <div className="w-[450px] h-[600px]   backdrop-blur-lg shadow-2xl rounded-2xl flex justify-center items-center flex-col"> 
               <h1 className="text-[40px] font-bold mb-[20px] text-white ">Login</h1>

               <input 
                   onChange={
                    (e) =>{
                      setEmail(e.target.value);
                    }
                   } 
               type="email" 
               placeholder="Your Email" 
               className="mb-[20px] w-full h-[50px]   rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-gold" 
               />

               <input 
                  onChange={(e) =>{
                    setPassword(e.target.value);
                  }}
               type="password" 
               placeholder="Your Password" 
               className="w-full h-[50px] mb-[20px]  rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-gold gap-2" 
               />

               <p 
               className="mb-[20px] w-full text-center text-white mt-[20px] ">Forgot your password?
                <Link className=" ml-[8px] text-gold">Reset it here
                </Link> 
                </p>
               
                <button 
                className="mt-2.5 w-full h-[50px] bg-accent text-white font-bold text-[20px] rounded-lg hover:bg-yellow-600 transition-colors border-accent" onClick={login}>Login
                </button>

                <p className="not-italic text-white mt-[20px]">Don't have an account? <Link className="ml-[8px] text-gold italic">Login here</Link> </p>

            </div>
      </div>

    </div>
  );
}

