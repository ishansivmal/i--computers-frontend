import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
import { LuListCollapse } from "react-icons/lu";
import { useState } from "react";


export default function Header() {
  const[sidebarOpen,setSidebarOpen]= useState(false);

    {
      return (
        <header className=" w-full h-[100px] bg-accent flex relative">
          <LuListCollapse
          onClick={() => setSidebarOpen(true)}

           className="text-white my-auto p-[1px] text-4xl ml-[6px] lg:hidden" />
          

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
       {sidebarOpen && <div className=" lg:hidden w-[100vw] h-screen top-0 left-0 fixed  bg-black/50 z-40">
          
          <div className="fixed flex-col  border-2  w-[250px] h-screen relative">
            
                <div className=" flex flex-col w-full h-full bg-white left-[-250px] translate-x-[0px] transition-transform duration-1000">
                  <div className="h-[100px] w-full bg-accent flex justify-center items-center">
                    <img src="logo.png"className="h-full" alt="My Shop" />
                              <LuListCollapse 
                              onClick={() => setSidebarOpen(false)}
                              className="text-white my-auto p-[1px] text-4xl ml-[6px] lg:hidden rotate-180" />
                    

                  </div>
                  <div className="flex flex-col gap-[20px] mt-[30px] text-black ">
                    
                    {/* home */} 
                    <a href="/" className="ml-[12px] text-primary text-xl text-center text-black text-left ">Home</a>
                    {/* products */}
                    <a href="/products" className="ml-[12px] text-primary text-xl text-center text-black text-left ">Products</a>  
                    
                    {/* about */}
                    <a href="/about" className="ml-[12px] text-primary text-xl text-center text-black text-left ">About</a>

                  </div>
                </div>
              
          </div>

        </div>}
        </header>
        
      );
    }
}