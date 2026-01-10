import { Link, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { LuClipboardList } from "react-icons/lu";
import { BsBoxes } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { MdOutlineRateReview } from "react-icons/md";
import { AdminProductPage } from "../Pages/Admin/adminProduct";
import { AdminAddProductPage } from "../Pages/Admin/adminAddProduct";





export function AdminPage() {
  return (
    <div className="h-full w-full max-h-full flex bg-accent">

      <div className="w-[300px] h-full bg-accent">
          <div className="w-full h-[100px]  flex items-center text-white ">
            <img src="/logo.png" alt="" className="h-full object-contain" />
            <h1 className="text-2xl font-bold">Admin </h1>

          </div>
          <div className="w-full h-[400px]  text-white text-2xl flex flex-col gap-2 p-4">
            {/* <a href="/admin" className="hover:underline">Orders</a> */}
            <Link to="/admin" className="hover:underline w-full flex items-center h-[50px] gap-[15px]"> <LuClipboardList />Orders</Link>
            <Link to="/admin/products" className="hover:underline w-full flex items-center h-[50px] gap-[15px]"><BsBoxes />Products </Link>
            <Link to="/admin/users" className="hover:underline w-full flex items-center h-[50px] gap-[15px]"> <LuUsers />Users</Link>
            <Link to="/admin/reviews" className="hover:underline w-full flex items-center h-[50px] gap-[15px]"><MdOutlineRateReview /> Reviews</Link>
          </div>

      </div>

      <div className="w-[calc(100%-300px)] h-full max-h-full overflow-y-scroll border-[10px] border-accent rounded-2xl bg-primary" >
             <Routes >
                <Route path="/" element={<h1>Orders</h1>} />
                <Route path="/products" element={<AdminProductPage />} />
                <Route path="/add-products" element={<AdminAddProductPage />} />
                <Route path="/users" element={<h1>Users</h1>} />
                <Route path="/reviews" element={<h1>Reviews</h1>} />

             </Routes>
      </div>

    </div>
  );
}
