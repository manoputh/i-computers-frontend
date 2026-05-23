import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";

export default function AdminOrdersPage() {
   const [orders, setOrders] = useState([]);
   const [loaded, setLoaded] = useState(false);

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (!loaded) {
         axios
            .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
               headers: {
                  Authorization: "Bearer " + token,
               },
            })
            .then((response) => {
               setOrders(response.data);
               setLoaded(true);
            });
      }
   }, [loaded]);

   return (
      <div>
         <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
               <h1 className="text-4xl font-bold text-gray-800 mb-2">Order Management</h1>
               <p className="text-gray-600">Manage your Orders</p>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
               {loaded ? (
                  <div className="overflow-x-auto">
                     <table className="w-full">
                        <thead className="bg-linear-to-b from-blue-400 to-blue-800">
                           <tr>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Order ID
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Customer email
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Customer name
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Date
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Status
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Total Amount
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Actions
                              </th>
                           </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                           {orders.map((order, index) => {
                              return (
                                 <tr key={index} className="hover:bg-gray-100 transition-colors duration-150">
                                    <td className="px-6 py-4 text-center">{order.orderID}</td>
                                    <td className="px-6 py-4 text-center">{order.email}</td>
                                    <td className="px-6 py-4 text-center">{order.name}</td>
                                    <td className="px-6 py-4 text-center">{order.date}</td>
                                    <td className="px-6 py-4 text-center">{order.status}</td>
                                    <td className="px-6 py-4 text-center">LKR {order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-center">action</td>
                                 </tr>
                              );
                           })}
                        </tbody>
                     </table>
                  </div>
               ) : (
                  <Loader />
               )}
            </div>
         </div>
      </div>
   );
}
