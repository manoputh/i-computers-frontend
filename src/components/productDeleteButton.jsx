import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductDeleteButton(props) {
   const productID = props.productID;
   const reload = props.reload;
   const [isMessageOpen, setIsMessageOpen] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);

   async function handleDelete() {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      axios
         .delete(import.meta.env.VITE_BACKEND_URL + "/products/" + productID, {
            headers: {
               Authorization: "Bearer " + token,
            },
         })
         .then(() => {
            toast.success("Product deleted successfully!");
            setIsDeleting(false);
            setIsMessageOpen(false);
            reload();
         })
         .catch((error) => {
            toast.error("Failed to delete product: " + error.message);
            setIsDeleting(false);
            setIsMessageOpen(false);
         });
   }

   return (
      <>
         <button
            onClick={() => setIsMessageOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition duration-300 cursor-pointer">
            Delete Product
         </button>
         {isMessageOpen && (
            <div className="w-screen h-screen fixed top-0 left-0 bg-black/50 flex justify-center items-center">
               <div className="w-100 h-60 bg-white rounded-2xl relative flex flex-col justify-center items-center p-6 shadow-lg">
                  <button
                     className="w-8 h-8 bg-red-600 text-white text-xs font-bold rounded-full cursor-pointer hover:bg-red-800 absolute top-[-25px] right-[-25px]"
                     onClick={() => setIsMessageOpen(false)}>
                     X
                  </button>

                  <h1 className="text-lg text-center font-semibold mb-4">
                     Are you sure you want to delete this product? (ID: {productID})
                  </h1>
                  <div className="flex gap-20">
                     <button
                        disabled={isDeleting}
                        onClick={() => {
                           handleDelete();
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition duration-300 cursor-pointer">
                        Delete
                     </button>
                     <button
                        onClick={() => setIsMessageOpen(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-md transition duration-300 cursor-pointer">
                        Cancel
                     </button>
                  </div>
               </div>
               {productID}
            </div>
         )}
      </>
   );
}
