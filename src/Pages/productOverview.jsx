import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageSlider from "../components/imageSlider";
import { CgChevronDoubleRight } from "react-icons/cg";
import { getCartItems, emptyCart,addItemToCart} from "../utils/cart.js";
import { useNavigate } from "react-router-dom";

export default function ProductOverview() {
    // get product id from URL
    const { productID } = useParams();

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_backEnd_URL}/products/${productID}`)
            .then((response) => {
                setProduct(response.data);
                setStatus("success");
            })
            .catch(() => {
                toast.error("Product not found");
                setStatus("error");
            });
    }, [productID]);

    return (
        <>
            {status === "loading" && <p className="text-center text-xl text-gray-500 mt-20">Loading...</p>}
            {status === "error" && <p className="text-center text-xl text-red-500 mt-20">Error loading product</p>}
            {status === "success" && product && (
                <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center bg-gray-50 p-6 ">
                    <div className="w-full max-w-7xl h-full flex bg-white rounded-2xl shadow-lg lg:overflow-y-auto  flex-col  lg:flex-row">
                        <div className=" w-full h-[250px] lg:w-1/2  lg:h-full flex items-center justify-center p-6">
                           <ImageSlider images={product.images}/>
                        </div>
                        <div className=" w-full lg:w-1/2 h-full p-10 flex flex-col gap-6  mt-[20px] lg:mt-0.50">
                            <h1 className="text-4xl font-bold text-gray-900">{product.pName}</h1>
                            <h1 className="text-sm font-medium text-gray-500">Product ID: <span className="text-gray-700">{product.productID}</span></h1>
                            <h1 className="text-sm font-medium text-gray-500">Category: <span className="inline-block bg-accent text-white px-3 py-1 rounded-full text-xs">{product.category}</span></h1>
                            <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2"><CgChevronDoubleRight className="text-accent"/>{product.pName}</h1>
                            <p className="text-gray-600 leading-relaxed  hidden lg:block mt-3.5">{product.pDescription}</p>

                            <div className="w-full bg-gray-50 rounded-xl p-6 mt-4">
                                <h2 className="text-xl text-gray-400 line-through mb-2">
                                    LKR {product.lebalPrice|| 0}
                                </h2>
                                <h1 className="text-4xl font-bold text-accent">
                                    LKR {product.price || 0}
                                </h1>
                                {product.lebalPrice && product.price && product.lebalPrice > product.price && (
                                    <p className="text-green-600 font-semibold mt-2">
                                        Save LKR {(product.lebalPrice - product.price).toFixed(2)}
                                        
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-4 mt-4">
                                <button 
    onClick={()=>{
        addItemToCart(product, 1);
        
    }
    }
                                
    className="flex-1 bg-accent text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
    onMouseEnter={(e) => e.target.style.backgroundColor = '#e29816'} 
    onMouseLeave={(e) => e.target.style.backgroundColor = '#27302b'}
>
    Add to Cart
    </button>
    <button 
        
    onClick={() => {
    navigate("/checkout", {
        state: {  
            productID: product.productID,
            pName: product.pName,
            price: product.price,
            labalPrice: product.lebalPrice,
            image: product.images[0],
            quantity: 1
            
        }  
    });
}}
        className="px-6 py-3 border-2 border-accent text-accent rounded-lg font-semibold transition-all"
        onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#22c55e';
            e.target.style.borderColor = '#22c55e';
            e.target.style.color = 'white';
        }} 
        onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.borderColor = '#27302b';
            e.target.style.color = '#27302b';
        }}
    >
        Buy Now
    </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}