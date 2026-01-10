import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { Navigate } from "react-router-dom";






export function AdminAddProductPage() {
    const [ProductID,setProductID] = useState("");
    const [name,setName] = useState("");
    const [AltName,setAltname] = useState("")
    const [Description,setDescription] = useState("")
    const [price,setPrice] =useState(0)
    const [labelledPrice,setLabelledPrice] = useState(0)
    const [image,setImage] = useState("")
    const [category,setCategory] = useState("")
    const [brand,setBrand] = useState("")
    const [model,setModel] = useState("")
    const [stock,setStock] = useState(0)
    const [isAvailable,setIsAvailable] = useState(false)
    const navigate = useNavigate()

        async function addProduct(e)
        {
            const token = localStorage.getItem("Token");
            if (token==null) {
                toast.error("You must be logged in to add a product.");
                navigate("/login");
                return;
            }
            if(ProductID=="" || name=="" || AltName=="" || Description=="" || price==0 || labelledPrice==0 || image=="" || category=="" || brand=="" || model=="" || stock==0) {
                toast.error("Please fill in all fields.");
                return;
            }

           try
           {    const alternativeName = AltName.split(",")
                const imageArray = image.split(",")
                await axios.post(import.meta.env.VITE_backEnd_URL + "/products/", {
                    productID: ProductID,
                    name: name,
                    altName: alternativeName,
                    description: Description,
                    price: price,
                    labelledPrice: labelledPrice,
                    image: imageArray,
                    category: category,
                    brand: brand,
                    model: model,
                    stock: stock,
                    isAvailable: isAvailable
                }, {
                    headers: {
                        Authorization: "Bearer " +token
                    }
                });
                
               alert("Product added successfully.");
                navigate("/admin/products");
           } catch (error) {
              alert("Failed to add product.");
           }


        }


  return (
    <div className=" w-full h-full flex justify-center items-start overflow-y-scroll p-[50px]">
      <div className=" w-[800px] bg-accent/75 p-[40px] rounded-2xl overflow-y-visible">
        <h1 className="text-xl text-white w-full font-bold mb-[20px] shadow-2xl flex items-center gap-[5px]">
            <AiOutlineProduct/>
            Add New Product
        </h1>

        <div className="w-full bg-white p-[20px] rounded-xl flex flex-row flex-wrap justify-between shadow-2xl">
        <div className="my-[10px] w-[40%]  flex flex-col"> 
                <label> Product Id</label>
                <input type="text" value={ProductID} onChange={(e)=>setProductID(e.target.value)} className="w- h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent  border-accent shadow-2xl border-[1px] px-[10px]"/>
                <p className="w-full text-sm text-gray-500 text-right">provide a unique ID</p>
            </div>

            <div className="my-[10px] w-[40%]">
                <label> Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full  h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent  border-accent shadow-2xl border-[1px] px-[10px]"/>
            </div>

            <div className="my-[10px] w-full">
                <label> Alt Name</label>
                <input type="text" value={AltName} onChange={(e)=>setAltname(e.target.value)} className="w-full  h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent  border-accent shadow-2xl border-[1px] px-[10px]"/>
                <p className="w-full   text-sm text-gray-500 text-right">separate multiple layer with coma</p>
            </div>

            <div className="my-[10px] w-full">
                <label> Description</label>
                <textarea value={Description} onChange={(e)=>setDescription(e.target.value)} className="w-full  h-[100px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent  border-accent shadow-2xl border-[1px] px-[10px] py-[10px]"/>
            </div>

            <div className="my-[10px] w-[40%]">
                <label> Price</label>
                <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full  h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent  border-accent shadow-2xl border-[1px] px-[10px]"/>
            </div>

            <div className="my-[10px] w-[40%]">
                <label> Labelled Price</label>
                <input type="number" value={labelledPrice} onChange={(e)=>setLabelledPrice(e.target.value)} className="w-full  h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent  border-accent shadow-2xl border-[1px] px-[10px]"/>
            </div>

            <div className="my-[10px] w-full">
                <label> Images</label>
                <input type="text" value={image} onChange={(e)=>setImage(e.target.value)} className="w-full  h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent  border-accent shadow-2xl border-[1px] px-[10px]"/>
            </div>

            <div className="my-[10px] flex flex-col w-[30%]">
                <label> Category</label>
                <select name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full  h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent  border-accent shadow-2xl border-[1px] px-[10px]">
                    <option value="cpu">CPU</option>
                    <option value="graphic card">Graphic Card</option>
                    <option value="desktops">Desktops</option>
                    <option value="Power Supply">Power Supply</option>
                    <option value="RAM">RAM</option>
                    <option value="Storage Device">Storage Device</option>
                    <option value="Cooling Solution">Cooling Solution</option>
                    <option value="Computers Cases">Computers Cases</option>
                    <option value="Mouse and Keyboard">Mouse and Keyboard</option>
                    <option value="Accessories">Accessories</option>
                    <option value="PC">PC</option>
                    <option value="Computers">Computers</option>
                    <option value="LAPTOP">LAPTOP</option>
                    <option value="Cables">Cables</option>
                    <option value="Others">Others</option>
                </select>
            </div>

            <div className="my-[10px] w-[30%]">
                <label> Brand</label>
                <input type="text" value={brand} onChange={(e)=>setBrand(e.target.value)} className="w-full  h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent  border-accent shadow-2xl border-[1px] px-[10px]"/>
            </div>

            <div className="my-[10px] w-[30%]">
                <label> Model</label>
                <input type="text" value={model} onChange={(e)=>setModel(e.target.value)} className="w-full  h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent  border-accent shadow-2xl border-[1px] px-[10px]"/>
            </div>

            <div className="my-[10px] w-[50%]">
                <label> Stock</label>
                <input type="number" value={stock} onChange={(e)=>setStock(e.target.value)} className="w-full  h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent  border-accent shadow-2xl border-[1px] px-[10px]"/>
            </div>

            <div className="my-[10px] w-[40%] flex flex-col justify-center items-center ">
                <label> Available</label>
                <select name="available" id="available" value={isAvailable} onChange={(e)=>setIsAvailable(e.target.value)} className="w-full  h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent  border-accent shadow-2xl border-[1px] px-[10px]">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <button onClick={addProduct} className="w-[49%] h-[50px] bg-accent text-white font-bold rounded-2xl hover:bg-yellow-600 transition-colors border-accent mt-[20px]"> Add Product</button>
            <Link to="/admin/products" className="w-[49%] h-[50px] bg-gray-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-all duration-300 flex justify-center items-center mt-[20px]">
                Cancel
        </Link>
        </div>
      </div>
    </div>
  );
}
