import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";

export default function ProductOverview() {
   const params = useParams();
   const [product, setProduct] = useState(null);
   const [status, setStatus] = useState("loading");

   useEffect(() => {
      if (status === "loading") {
         axios
            .get(
               import.meta.env.VITE_BACKEND_URL +
                  "/products/" +
                  params.productId
            )
            .then((response) => {
               setProduct(response.data);
               setStatus("success");
            })
            .catch((error) => {
               toast.error("Product not found");
               setStatus("error");
            });
      }
   }, []);

   return (
      <div>
         {status === "loading" && <Loader />}
         {status === "error" && (
            <h1 className="text-4xl p-10 text-center">
               Error loading product.
            </h1>
         )}
         {status === "success" && (
            <div className="w-full h-[calc(100vh-100px)] bg-red-600 flex items-center">
               <div className="w-1/2 h-full flex justify-center items-center">
                  <img
                     src={product.images[0]}
                     alt={product.name}
                     className="w-[400px] h-[400px] object-cover mx-10 bg-white"
                  />
               </div>
               <div className="w-1/2 h-full flex flex-col justify-center p-10">
                  <h1 className="text-4xl font-bold mb-5">{product.name}</h1>
                  <p className="text-lg mb-5">{product.description}</p>
               </div>
            </div>
         )}
      </div>
   );
}
