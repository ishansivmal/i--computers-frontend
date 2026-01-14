import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";

export default function ProductDeleteButton(props) {

    const productID = props.productID;
    const reload = props.reload;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isdeleting, setIsdeleting] = useState(false);

    // ✅ ONLY open modal (no API call)
    function openDeleteModal() {
        setIsModalOpen(true);
    }

    // ✅ ONLY delete product (API call here)
    async function handleDelete() {
        setIsdeleting(true);
        const token = localStorage.getItem("Token");

        axios
            .delete(
                import.meta.env.VITE_backEnd_URL + "/products/" + productID,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            .then(() => {
                toast.success("Product deleted successfully");
                setIsModalOpen(false);
                  setIsdeleting(false);
                  reload(); // Call reload function to refresh product list
                
            })
            .catch((error) => {
                toast.error("Failed to delete product");
                console.error("Error deleting product:", error);
            })
            
    }

    return (
        <>
            <button
                onClick={openDeleteModal}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete Product"
            >
                <BiTrash className="text-xl" />
            </button>

            {isModalOpen && 
                <div className="w-[100vw] h-screen fixed top-0 left-0 bg-black/55 flex justify-center items-center">
                    <div className="bg-white w-[500px] h-[350px] rounded-2xl relative flex flex-col justify-center items-center p-6 text-center gap-6">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-[-15px] right-[-15px] w-[40px] h-[40px] bg-red-500 rounded-full text-white text-xl font-bold hover:bg-red-600 flex items-center justify-center"
                        >
                            ✕
                        </button>

                        {/* Message */}
                        <h1 className="text-xl font-semibold">
                            Are you sure you want to delete product {productID}?
                        </h1>

                        {/* Action Buttons */}
                        <div className="flex gap-4">

                            {/* Yes Button */}
                            <button
                                disabled={isdeleting}
                                onClick={handleDelete}
                                className="w-[100px] h-[40px] rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 disabled:opacity-50"
                                title="Delete Product"
                            >
                                {isdeleting ? "Deleting..." : "yes"}
                            </button>

                            {/* Cancel Button */}
                            <button
                                className="w-[100px] h-[40px] rounded-xl bg-gray-300 text-gray-800 font-bold hover:bg-gray-400"
                                title="Cancel"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                </div>
            }
        </>
    );
}
