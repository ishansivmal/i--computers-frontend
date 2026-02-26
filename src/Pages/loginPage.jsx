import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";
import {LoadingCircle} from "../components/loadingCircle.jsx";




export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  // ✅ Move BEFORE useGoogleLogin

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setIsLoading(true);
      axios.post(import.meta.env.VITE_backEnd_URL + "/users/googlelogin", {
        token: response.access_token
      }).then((res) => {
        localStorage.setItem("Token", res.data.token);
        if (res.data.role === "admin") {
          navigate("/admin");
          toast.success("Login successful! admin");
        } else {
          navigate("/");
          toast.success("Login successful!");
        }
      }).catch((err) => {
        toast.error("Google login failed!");
        console.error("Google login error:", err);
      }).finally(() => {
        setIsLoading(false);  // ✅ Always runs after request
      });
    },
    onError: (error) => {
      toast.error("Google login failed!");
      console.error("Google OAuth error:", error);
    },
    onNonOAuthError: (error) => {
      // User closed popup — just log it, don't show error
      console.log("Google popup closed by user:", error);
    }
  });

  async function login()
  {
    setIsLoading(true);
    
    
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
      setIsLoading(false);
    } catch (error) {
      toast.error("Login failed!");
      console.error("Login failed:", error);
      setIsLoading(false);
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
                <Link to="/forget-password" className=" ml-[8px] text-gold">Reset it here
                </Link> 
                </p>
               
                <button 
                className="mt-2.5 w-full h-[50px] bg-accent text-white font-bold text-[20px] rounded-lg hover:bg-yellow-600 transition-colors border-accent" onClick={login}>Login
                </button>
                <button 
                onClick={() => googleLogin()}
                className="mt-2.5 w-full h-[50px] bg-accent text-white font-bold text-[20px] rounded-lg hover:bg-yellow-600 transition-colors border-accent" > Login With <GrGoogle className="inline-block ml-2 text-2xl mb-1"/>
                </button>

                <p className="not-italic text-white mt-[20px]">Don't have an account? <Link to="/register" className="ml-[8px] text-gold italic">register here</Link> </p>

            </div>
      </div>
      {isLoading &&<LoadingCircle/>}

    </div>
  );
}

