import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingCircle } from "../components/loadingCircle";
import ProductCard from "../components/product-card.jsx";

  

export default function ProductPage() {

    const [products, setProducts] = useState([]);
    const [loaded, setLoading] = useState(false );

    useEffect(() => 
        {
            if(!loaded)
            {
                {
                    axios
                    .get(import.meta.env.VITE_backEnd_URL + "/products/")
                    .then((response) => {
                        setProducts(response.data);
                        setLoading(true);
                        console.log("Products loaded:", response.data);
                        
                        

                    })
                    .catch((error) => {
                        console.error("Error loading products:", error);
                    });

                }
            }
  },[]);
  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg- flex justify-center flex-wrap pt-[30px]">
        <div className="bg-amber-300 h-[50px] w-full sticky top-0 bg-white flex justify-center items-center mb-4 shadow-md z-10">
            <input
                type="text"
                placeholder="Search products..."
                className=" w-1/2 h-3/4 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                
                onChange={
                    async (e) =>{

                        if(e.target.value=="")
                        {
                            setLoading(false);
                           await axios
                            .get(import.meta.env.VITE_backEnd_URL + "/products")
                            .then((response) => {
                                setProducts(response.data);
                                setLoading(true);
                                console.log("Products loaded:", response.data);
                            })
                        }

                        else
                        {
                            await axios
                            .get(
                                    import.meta.env.VITE_backEnd_URL + "/products/search/" + e.target.value
                            )
                            .then((response) => {
                                setProducts(response.data);
                                setLoading(true);
                                console.log("Products loaded:", response.data);
                            }).catch((error) => {
                                console.error("Error loading products:", error);
                            });
                            setLoading(true);

                            //error handling
                            
                        }
                    }}
                    
                ></input>
        </div>

        {
            !loaded ? (<LoadingCircle/>):
            (<div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4 text-black" key={products.productID} >
               {
                products.length > 0 ? (
                    products.map((item) =>
                        {
                            return(
                                <ProductCard key={item.productID} product={item} />
                            )
                        }
                    )
                ) : (
                    <p>No products found</p>
                )
               }
               </div>
            )
        }
      
    </div>
  );
}