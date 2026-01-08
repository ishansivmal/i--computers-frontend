import { Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import { Route } from "react-router-dom";

export function HomePage() {
  return (
    <div className="h-full w-full overflow-y-scroll">  
     <Header/>
        <div className="w-full min-h-[calc(100%-100px)] ">
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/products" element={<h1>Products</h1>} />
                <Route path="/users" element={<h1>Users</h1>} />
                <Route path="/reviews" element={<h1>Reviews</h1>} />
                <Route path="/*" element={<h1>404 page not found</h1>} />
             </Routes>
        </div>
     
    </div>
  );
}
