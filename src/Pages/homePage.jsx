import { Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import { Route } from "react-router-dom";
import  ProductPage  from "./productPage.jsx";
import  ProductOverview  from "./productOverview.jsx";
export function HomePage() {
  return (
    <div className="h-full w-full overflow-y-scroll">  
     <Header/>
        <div className="w-full min-h-[calc(100%-100px)] ">
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/users" element={<h1>Users</h1>} />
                <Route path="/reviews" element={<h1>Reviews</h1>} />
                <Route path="/*" element={<h1>404 page not found</h1>} />
                <Route path="/overview/:productID" element={<ProductOverview />} />
             </Routes>
        </div>
     
    </div>
  );
}
