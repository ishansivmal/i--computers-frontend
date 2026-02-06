import { Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import { Route } from "react-router-dom";
import  ProductPage  from "./productPage.jsx";
import  ProductOverview  from "./productOverview.jsx";
import  Cartpage from "./cart.jsx";
import Checkout from "./chekout.jsx";
import { TestPage } from "./testPage.jsx";
import { OrdersPage } from "./ordersPages.jsx";

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
                <Route path="/cart" element={<Cartpage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/orders" element={<OrdersPage />} />

             </Routes>
        </div>
     
    </div>
  );
}
