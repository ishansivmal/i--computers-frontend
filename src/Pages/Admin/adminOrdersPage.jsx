import axios from "axios";
import { BiPlus, BiTrash } from "react-icons/bi"; // ← added BiTrash
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingCircle } from "../../components/loadingCircle";


export function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  // need another use state to chek wejther it loaded or not
  const [loaded, setLoading] = useState(false);
  

  

  useEffect(() => {
    const Token = localStorage.getItem("Token");

    if (!loaded) {
        axios.get(`${import.meta.env.VITE_backEnd_URL}/orders`, {
            headers: { Authorization: `Bearer ${Token}` }
        }).then((response) => {
            // THIS LINE FIXES THE ERROR
            setOrders(Array.isArray(response.data) ? response.data : []);
            setLoading(true);
        }).catch(err => {
            setOrders([]);      // if error, don't crash
            setLoading(true);
        });
    }
}, [loaded]);
  return (
    <div className="relative w-full min-h-screen bg-[var(--color-primary)] p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto overflow-x-auto">
        {loaded ?
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[var(--color-accent)] text-[var(--color-primary)]">
                <th className="p-3 text-left">order ID</th>
                <th className="p-3 text-left">customer  email</th>
                <th className="p-3 text-left">customer name</th>
                <th className="p-3 text-left">date</th>
                <th className="p-3 text-left">status </th>
                <th className="p-3 text-left">Total amount</th>
                <th className="p-3 text-left">action</th>
                <th className="p-3 text-left">Model</th>
                
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">
                    {order.orderId}
                  </td>
                    <td className="p-3">
                    {order.email}
                    {console.log(order.email)}
                  </td>
                  <td className="p-3">
                    {order.name}
                    </td>
                  <td className="p-3">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {order.status}
                  </td>
                    <td className="p-3">
                    LKR {order.total.toFixed(2)}
                  </td>
                  <td className="p-3">
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