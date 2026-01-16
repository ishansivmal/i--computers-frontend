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
    <div className="w-full min-h-[calc(100vh-100px)] bg- flex justify-center flex-wrap">

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