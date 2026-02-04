import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useStae from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {LoadingCircle} from "../components/loadingCircle.jsx";

export default function ForgetPassword() {

    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState("");
    const[loding,setLoding]= useState(false);
    const [otp,setOtp]= useState("");
    const [newPassword,setNewPassword]= useState("");
    const [confirmPassword,setConfirmPassword]= useState("");
    const navigate = useNavigate();

  async  function sendOtp(){

        setLoding(true);
        try{

            await axios.get(import.meta.env.VITE_backEnd_URL + "/users/sendOTP/"+email);
            toast.success("OTP sent to your email");
            setLoding(false);
            setOtpSent(true);

            

        }
        catch(error){
            toast.error("Error sending OTP try again later");
            console.log(error);
            setLoding(false);


        }



    }

    async function resetPassword(){


      if(confirmPassword.trim() === "" || newPassword.trim() === "" || otp.trim() === ""){
            toast.error("Please fill all fields");
            return;
        }   

        if(newPassword !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        setLoding(true);

        try
        {
            await axios.post(import.meta.env.VITE_backEnd_URL + "/users/validateOTP",{
                email: email,
                otp: otp,
                newPassword: newPassword
            });

            toast.success("Password reset successful");
            setLoding(false);
            navigate("/login");
            
        }
        catch(error){
            toast.error("Error resetting password, please try again later");
            setLoding(false);
        }
    }

  return (
    <div className="justify-center items-center flex flex-col mt-20">

        {
                loding ? (<LoadingCircle/> ) : null
        }
        
        {
            otpSent ? 
            <div className='w-[400px] h-[500px] flex flex-col justify-center items-center bg-amber-50 rounded-lg shadow-lg p-8'>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">enter new  Password</h2>
                <input 
                    type="text"
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input 
                    type="password"
                    placeholder="Enter New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input 
                    type="password"
                    placeholder="Confirm New Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                onClick={resetPassword}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    Reset Password
                </button>
            </div>:
            <div className="w-[500px] h-[200px] p-2 mb-4 border border-gray-300 rounded]">
    <h2 className="text-2xl ml-[40px] font-bold text-gray-800 mb-4">Enter your email to reset password</h2>
    
    <input 
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
    />
    
    <button
    onClick={sendOtp}
     className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
        Send OTP
    </button>
</div>
        }
    </div>
  )
}