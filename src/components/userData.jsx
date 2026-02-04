import { use, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UseData()
{
  const [user,setUser] =useState(null)
  const[selectedOption,setSelectedOption]= useState("user")
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleregisterClick = () => {
    navigate("/register");
  }



  useEffect(()=>


    {
        const Token = localStorage.getItem("Token");

        if(Token !== null){
            axios.get(import.meta.env.VITE_backEnd_URL + "/users", {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            }).then((response) => {
                setUser(response.data);
            }).catch((error) => {
                setUser(null);
            });
        }


    },[])

    return (
    <>
        {
            user ? (
                <div className=" lg:mr-[50px]  lg:mt-[10px]">
                    <div className="lg:w-[150px] flex  flex-row justify-center items-center gap-2">
                        <img src={user.image} referrerPolicy="no-referrer"  className="w-[50px] h-[50px] rounded-full"
                       />
                        <select className="" value={selectedOption}  onChange={
                            (e) =>{
                                if(e.target.value === "logout")
                                {
                                    localStorage.removeItem("Token");
                                    window.location.href = "/login";
                                }else if(e.target.value === "my-orders")
                                {
                                    window.location.href = "/orders";
                            }
                            selectedOption("user");
                            }
                        }>
                            <option className="bg-accent" value={"user"}>{user.firstName}</option>
                            <option className="bg-accent" value={"logout"}>logout</option>
                             <option className="bg-accent" value={"my-orders"}>my-orders</option>
                        </select>
                    </div>
                    
                </div>
            ) : <div className="  w-[200px]  lg:mr-[50px]">
                <button 
                onClick={handleLoginClick} className="cursor-pointer m-[30px] bg-green-300 text-white rounded-2xl w-[70px] p-1">login</button>
                <button onClick={handleregisterClick} className=" cursor-pointer bg-gray-500 text-white rounded-2xl w-[70px] p-1">register</button>

            </div>
        }
    </>
)

  
}