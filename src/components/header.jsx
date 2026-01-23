import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";


export default function Header() {
  const[sidebarOpen,setSidebarOpen]= useState(false);

    {
      return (
        <header className=" w-full h-[100px] bg-accent flex relative">
          <CiMenuBurger className="text-white my-auto p-[1px] text-4xl ml-[6px] lg:hidden" />

          <img src="logo.png"className="h-full" alt="My Shop" />
          <div className="w-full h-full hidden lg:flex  text-primary justify-center items-center gap-[30px] text-xl">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/users">Users</Link>
              <Link to="/reviews">Reviews</Link>
                            
          </div>
        <Link to="/cart" className="absolute right-10 top-1/2 transform -translate-y-1/2 text-primary text-2xl font-bold">
        <BiShoppingBag />
        </Link>
        <div className="  w-[100vw] h-screen top-0 left-0 fixed  bg-black/50 z-40">
          
          <div className="fixed flex-col  border-2 relative w-[300px] h-screen left-0">
            <div className="absolute w-full h-full  bg-white-600 left[-300px]transform-flat translate-x-[-300px] transition-transform duration-1000 flex flex-col"> 
                <div className="w-full h-[100px] bg-acccent  flex justify-center items-center">
                  <img src="/logo.png" alt="logo" className="h-full" />
                </div>
            </div>  
          </div>

        </div>
        </header>
        
      );
    }
}