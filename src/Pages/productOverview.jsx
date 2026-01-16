import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductOverview() {
    // get product id from URL
    const { productID } = useParams();

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");

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
            {status === "loading" && <p>Loading...</p>}
            {status === "error" && <p>Error loading product</p>}
            {status === "success" && product && (
                <div className="p-w-full h[calc(100vh-100px)] flex items-center justify-center">
                    <div className="w-1/2 h-full flex items-center justify-center">
                        <img src={product.images[0]} alt={product.pName} className="max-w-[80%] max -h-[80% ] object-contain" />

                    </div>
                    <div className="w-1/2 h-full p-10 flex flex-col gap-6">

                        <h1 className="text-4xl font-semibold">{product.pName}</h1>

                    </div>
                </div>
            )}
        </>
    );
}
