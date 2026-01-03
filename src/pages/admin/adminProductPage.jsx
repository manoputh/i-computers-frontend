import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton";

export default function AdminProductPage() {
   const [products, setProducts] = useState([]);
   const [loaded, setLoaded] = useState(false);

   useEffect(() => {
      if (!loaded) {
         const token = localStorage.getItem("token");

         axios
            .get(import.meta.env.VITE_BACKEND_URL + "/products/", {
               headers: {
                  Authorization: "Bearer " + token,
               },
            })
            .then((response) => {
               setProducts(response.data);
               setLoaded(true);
            });
      }
   }, [loaded]);

   return (
      <div>
         <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
               <h1 className="text-4xl font-bold text-gray-800 mb-2">Product Management</h1>
               <p className="text-gray-600">Manage your inventory and products</p>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
               {loaded ? (
                  <div className="overflow-x-auto">
                     <table className="w-full">
                        <thead className="bg-linear-to-b from-blue-400 to-blue-800">
                           <tr>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Image
                              </th>
                              <th className="w-20 px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Product ID
                              </th>
                              <th className="w-32px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Name
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Price
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Labelled Price
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Category
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Brand
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Model
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Stock
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Availability
                              </th>
                              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                 Action
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                           {products.map((item, index) => {
                              return (
                                 <tr key={index} className="hover:bg-gray-100 transition-colors duration-150">
                                    <td className="px-6 py-4 text-center">
                                       <img
                                          src={item.images[0]}
                                          className="w-12 h-12 rounded-lg object-cover shadow-sm border border-gray-200 mx-auto"
                                          alt={item.name}
                                       />
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                                       {item.productID}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-700 font-medium">
                                       {item.name}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                                       ${item.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-500 line-through">
                                       ${item.labelledPrice.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-700">
                                       <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                          {item.category}
                                       </span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-700">{item.brand}</td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-700">{item.model}</td>
                                    <td className="px-6 py-4 text-center text-sm">
                                       <span
                                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                             item.stock > 10
                                                ? "bg-green-100 text-green-800"
                                                : item.stock > 0
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                          }`}>
                                          {item.stock}
                                       </span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm">
                                       <span
                                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                             item.isAvailable
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                          }`}>
                                          {item.isAvailable ? "In Stock" : "Out of Stock"}
                                       </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm gap-2">
                                       <div className="flex justify-center items-center gap-2">
                                          <Link
                                             to="/admin/update-product"
                                             className="bg-gray-500 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition duration-300 cursor-pointer"
                                             state={item}>
                                             Update
                                          </Link>
                                          <ProductDeleteButton
                                             productID={item.productID}
                                             reload={() => {
                                                setLoaded(false);
                                             }}
                                          />
                                       </div>
                                    </td>
                                 </tr>
                              );
                           })}
                        </tbody>
                     </table>
                  </div>
               ) : (
                  <Loader></Loader>
               )}
            </div>
         </div>

         {/* Floating Action Button */}
         <Link
            to="/admin/add-product"
            className="fixed right-8 bottom-8 w-12 h-12 bg-linear-to-br from-blue-400 to-blue-800 text-white rounded-full flex justify-center items-center text-4xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 hover:from-blue-700 hover:to-blue-800 group">
            <BiPlus className="group-hover:rotate-90 transition-transform duration-300" />
         </Link>
      </div>
   );
}
