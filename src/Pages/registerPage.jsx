import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {LoadingCircle} from "../components/loadingCircle.jsx";




export function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  async function register()
  {
    if(firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
      toast.error("Please fill in all fields.");
      return;
    }
    if(password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    
    try {
      const response = await axios.post(import.meta.env.VITE_backEnd_URL + "/users/create", {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password.trim()
      });
      //store token in browser table
      localStorage.setItem("Token", response.data.token);
      // we get token as we need by using token variable
      const token = localStorage.getItem("Token");

      // by role we route the user
     navigate("/login");
      toast.success("Register successful! ");
      setIsLoading(false)

    } catch (error) {
      toast.error("Register failed!");
      console.error("Register failed:", error);
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
               <h1 className="text-[40px] font-bold mb-[20px] text-white ">register</h1>

               <input 
                   onChange={
                    (e) =>{
                      setFirstName(e.target.value);
                    }
                   } 
               type="text" 
               placeholder="Your First Name" 
               className="mb-[20px] w-full h-[50px]   rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-gold" 
               />
               <input 
                   onChange={
                    (e) =>{
                      setLastName(e.target.value);
                    }
                   } 
               type="text" 
               placeholder="Your Last Name" 
               className="mb-[20px] w-full h-[50px]   rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-gold" 
               />
                <input 
                   onChange={
                    (e) =>{
                      setEmail(e.target.value);
                    }
                   } 
               type="text" 
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
                <input 
                  onChange={(e) =>{
                    setConfirmPassword(e.target.value);
                  }}
               type="password" 
               placeholder="Confirm Your Password" 
               className="w-full h-[50px] mb-[20px]  rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-gold gap-2" 
               />

               
               
                <button 
                onClick={register}
                className="mt-2.5 w-full h-[50px] bg-accent text-white font-bold text-[20px] rounded-lg hover:bg-yellow-600 transition-colors border-accent" >Register
                </button>

                <p className="not-italic text-white mt-[20px]">already have an account? <Link to="/login" className="ml-[8px] text-gold italic">login  here</Link> </p>

            </div>
      </div>
      {isLoading &&<LoadingCircle/>}

    </div>
  );
}


