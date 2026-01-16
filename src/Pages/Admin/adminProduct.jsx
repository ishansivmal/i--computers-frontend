import axios from "axios";
import { BiPlus, BiTrash } from "react-icons/bi"; // ← added BiTrash
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LoadingCircle } from "../../components/loadingCircle";
import ProductDeleteButton from "../../components/productDeleteButton";
import { FiEdit } from "react-icons/fi";

export function AdminProductPage() {
  const [products, setProducts] = useState([]);
  // need another use state to chek wejther it loaded or not
  const [loaded, setLoading] = useState(false);

  useEffect(() => {
    if (!loaded) {
      getAllProducts();
    }
  }, []);

  const getAllProducts = () => {
    const token = localStorage.getItem("Token");
    axios
      .get(import.meta.env.VITE_backEnd_URL + "/products/", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((response) => {
        setProducts(response.data);
        setLoading(true);
      });
  };

  return (
    <div className="relative w-full min-h-screen bg-[var(--color-primary)] p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto overflow-x-auto">
        {loaded ?
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[var(--color-accent)] text-[var(--color-primary)]">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Product ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Label Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Brand</th>
                <th className="p-3 text-left">Model</th>
                <th className="p-3 text-center">Stock</th>
                <th className="p-3 text-center">Availability</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">
                    <img
                      src={item.images[0]}

                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-mono text-sm text-gray-700">{item.productID}</td>
                  <td className="p-3 font-medium text-[var(--color-secondary)]">{item.pName}</td>
                  <td className="p-3 font-semibold text-[var(--color-gold)]">${item.price}</td>
                  <td className="p-3 text-gray-500 line-through">${item.lebalPrice}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-3 text-gray-700">{item.Brand}</td>
                  <td className="p-3 text-gray-700">{item.Model}</td>
                  <td className="p-3 text-center font-bold text-lg">
                    <span
                      className={
                        item.stock > 10
                          ? "text-green-600"
                          : item.stock > 0
                            ? "text-orange-600"
                            : "text-red-600"
                      }
                    >
                      {item.stock}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={
                        item.isAvailable
                          ? "inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full"
                          : "inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full"
                      }
                    >
                      {item.isAvailable ? "In Stock" : "Out of Stock"}

                    </span>
                  </td>

                  {/* Delete Button - RED */}
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <ProductDeleteButton productID={item.productID} reload={() => setLoading(false)} />
                      <Link
                        to={`/admin/update-products/`}
                        state={{
                          ProductID: item.productID,
                          name: item.pName,
                          AltName: item.pAltname,
                          Description: item.pDescription,
                          price: item.price,
                          labelledPrice: item.lebalPrice,
                          category: item.category,
                          brand: item.Brand,  // Notice: Capital B
                          model: item.Model,  // Notice: Capital M
                          stock: item.stock,
                          isAvailable: item.isAvailable  // Notice: typo in your data - "isAvailable"
                        }}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <FiEdit size={20} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          : <LoadingCircle />
        }

        {/* Floating add button */}
        <Link
          to="/admin/add-products"
          className="fixed right-6 bottom-6 h-14 w-14 flex items-center justify-center text-4xl bg-[var(--color-accent)] text-[var(--color-primary)] rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-[var(--color-accent)]"
        >
          <BiPlus />
        </Link>
      </div>
    </div>
  );
}