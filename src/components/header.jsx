import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Header() {
    {
      return (
        <header className=" w-full h-[100px] bg-accent flex relative">
          <img src="logo.png"className="h-full" alt="My Shop" />
          <div className="w-full h-full flex  text-primary justify-center items-center gap-[30px] text-xl">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/users">Users</Link>
              <Link to="/reviews">Reviews</Link>
                            
          </div>
        <Link to="/cart" className="absolute right-10 top-1/2 transform -translate-y-1/2 text-primary text-2xl font-bold">
        <BiShoppingBag />
        </Link>
        </header>
        
      );
    }
}