import axios from "axios";
import { BiPlus, BiTrash } from "react-icons/bi"; // ← added BiTrash
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LoadingCircle } from "../../components/loadingCircle";
import { FiEdit } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";

export function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  // need another use state to chek wejther it loaded or not
  const [loaded, setLoading] = useState(false);

  useEffect(() => {
    if (!loaded) {
      getAllUsers();
    }
  }, []);

  const getAllUsers = () => {
    const token = localStorage.getItem("Token");
    axios
      .get(import.meta.env.VITE_backEnd_URL + "/users/all", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((response) => {
        setUsers(response.data);
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
                <th className="p-3 text-left">email</th>
                <th className="p-3 text-left">First Name</th>
                <th className="p-3 text-left">Last Name</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Acttion</th>
               
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">
                    <img
                      src={item.image}

                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-mono text-sm text-gray-700">{item.email}
{item.isEmailVerified ? <MdOutlineVerified className="text-green-500 ml-2 inline size-[20px] c" title="Verified User" style={{cursor: 'pointer'}} /> : null}                  </td>
                  <td className="p-3 font-medium text-[var(--color-secondary)]">{item.firstName}</td>
                  <td className="p-3 font-semibold text-[var(--color-gold)]">{item.lastName}</td>
                  <td className="p-3 text-gray-500 ">{item.role}</td>
                  
                  <td className="p-3 text-gray-700">
    {item.isBloked ? <span className="text-red-500 font-bold">Blocked</span> : <span className="text-green-500 font-bold">Active</span>}
                  </td>
                 
  <button
   onClick={async () => {
  try {
    console.log("Button clicked!");
    console.log("Email:", item.email);
    console.log("Current isBloked:", item.isBloked);
    console.log("URL:", import.meta.env.VITE_backEnd_URL + `/users/toggleBlock/${item.email}`);
    
    const response = await axios.put(
      import.meta.env.VITE_backEnd_URL + `/users/toggleBlock/${item.email}`, 
      {
        isBloked: !item.isBloked
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token")
        }
      }
    );
    
   
    getAllUsers();
    toast.success(`User ${item.isBloked ? "unblocked" : "blocked"} successfully`);
    
  } catch (error) {
   
    toast.error("Failed to update user");
  }
}}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    {
        item.isBloked ? "Unblock" : "Block"
    }
</button>
                 
                 
                  
                </tr>
              ))}
            </tbody>
          </table>
          : <LoadingCircle />
        }

        
    
      </div>
    </div>
  );
}