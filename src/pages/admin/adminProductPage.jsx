import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import { PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      const token = localStorage.getItem("token");
      axios
         .get(import.meta.env.VITE_BACKEND_URL + "/products/", {
            headers: {
               Authorization: "Bearer " + token,
            },
         })
         .then((response) => {
            console.log(response.data);
            setProducts(response.data);
         });
   }, []);

   return (
      <div className="w-full max-full flex justify-center relative">
         <table>
            <thead>
               <tr>
                  <th>Image</th>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Labelled Price</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Stock</th>
                  <th>Availability</th>
               </tr>
            </thead>
            <tbody>
               {products.map((item, index) => {
                  return (
                     <tr key={index}>
                        <td>
                           <img src={item.images[0]} className="w-8 h-8" />
                        </td>
                        <td>{item.productID}</td>
                        <td>{item.name}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${item.labelledPrice.toFixed(2)}</td>
                        <td>{item.category}</td>
                        <td>{item.brand}</td>
                        <td>{item.model}</td>
                        <td>{item.stock}</td>
                        <td>
                           {item.isAvailable ? "In Stock" : "Out of Stock"}
                        </td>
                        <td>
                           <button
                              onClick={() => {
                                 const token = localStorage.getItem("token");
                                 axios
                                    .delete(
                                       import.meta.env.VITE_BACKEND_URL +
                                          "/products/" +
                                          item.productID,
                                       {
                                          headers: {
                                             Authorization: "Bearer " + token,
                                          },
                                       }
                                    )
                                    .then(() => {
                                       toast.success(
                                          "Product deleted successfully!"
                                       );
                                    });
                              }}
                              className="w-20 bg-red-600 text-white rounded cursor-pointer hover:bg-red-800">
                              Delete
                           </button>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
         <Link
            to="/admin/add-product"
            className="fixed right-5 bottom-5 w-[50px] h-[50px] border-[2px] rounded-full flex justify-center items-center text-6xl hover:bg-accent hover:text-white ">
            <BiPlus />
         </Link>
      </div>
   );
}
