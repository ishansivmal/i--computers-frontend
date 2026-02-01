import { use, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function UseData()
{
  const [user,setUser] =useState(null)
  const[selectedOption,setSelectedOption]= useState("user")

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
                <div className="mr-[50px] mt-[10px]">
                    <div className="w-[150px] flex  flex-row justify-center items-center gap-2">
                        <img src={user.image}   className="w-[50px] h-[50px] rounded-full"
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
                    <div className="ml-[38px]">
                        <Link  to="/login" className="mx-2 ">Login</Link>
                        <Link to="/register" className="mx-2 ">register</Link>
                        
                    </div>
                </div>
            ) : null
        }
    </>
)

  
}