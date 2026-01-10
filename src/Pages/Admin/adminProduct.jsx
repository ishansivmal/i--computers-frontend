import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export function AdminProductPage() {
  return (
    <div className="relative w-full h-full justify-center items-center flex ">
        <p>Product add</p>
      <Link to="/admin/add-products" className="hover:text-white hover:bg-accent absolute right-[10px] bottom-[20px] h-[50px] w-[50px] flex justify-center items-center text-4xl border-[2px]  border-accent rounded-full"><BiPlus/></Link>
    </div>
  );
}
