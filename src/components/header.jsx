import { Link } from "react-router-dom";

export default function Header() {
    {
      return (
        <header className=" w-full h-[100px] bg-accent flex">
          <img src="logo.png"className="h-full" alt="My Shop" />
          <div className="w-full h-full flex  text-primary justify-center items-center gap-[30px] text-xl">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/users">Users</Link>
              <Link to="/reviews">Reviews</Link>
              
          </div>
        
        </header>
        
      );
    }
}