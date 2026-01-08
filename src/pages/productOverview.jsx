import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";
import { addToCart, emptyCart, getCart } from "../utils/cart";

export default function ProductOverview() {
   const params = useParams();
   const [product, setProduct] = useState(null);
   const [status, setStatus] = useState("loading");

   useEffect(() => {
      if (status === "loading") {
         axios
            .get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productId)
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
         {status === "loading" && <Loader />}
         {status === "error" && (
            <div className="flex items-center justify-center min-h-screen">
               <div className="text-center p-10">
                  <h1 className="text-4xl font-bold text-red-600 mb-4">Error loading product</h1>
                  <p className="text-gray-600">The product you're looking for could not be found.</p>
               </div>
            </div>
         )}
         {status === "success" && (
            <div className="container mx-auto px-4 py-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                  {/* Image Section */}
                  <div className="flex items-center justify-center">
                     <div className="w-full max-w-2xl">
                        <ImageSlider images={product.images} />
                     </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="flex flex-col justify-center space-y-6 bg-white rounded-2xl shadow-xl p-8 lg:p-10">
                     {/* Category Badge */}
                     <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                           <CgChevronRight className="text-lg" />
                           {product.category}
                        </span>
                        <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                           ✓ In Stock
                        </span>
                     </div>

                     {/* Product Name */}
                     <div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                     </div>

                     {/* Price */}
                     <div className="border-t border-b border-gray-200 py-4">
                        <div className="flex items-baseline gap-2">
                           <span className="text-sm text-gray-500 uppercase tracking-wide">Price</span>
                        </div>
                        <p className="text-gray-500 line-through text-lg">LKR {product.labelledPrice}</p>
                        <p className="text-4xl font-bold text-gray-900 mt-1">LKR {product.price}</p>
                     </div>

                     {/* Description */}
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                        <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
                     </div>

                     {/* Action Buttons */}
                     <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                           onClick={() => {
                              emptyCart();
                           }}
                           className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                           Empty
                        </button>
                        <button
                           onClick={() => {
                              addToCart(product, 1);
                           }}
                           className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                           Add to Cart
                        </button>
                        <button
                           onClick={() => {
                              console.log(getCart());
                           }}
                           className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-8 rounded-xl transition-all duration-200">
                           Buy Now
                        </button>
                     </div>

                     {/* Trust Badges */}
                     <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                        <div className="text-center">
                           <div className="text-2xl mb-1">🚚</div>
                           <p className="text-xs text-gray-600">Free Shipping</p>
                        </div>
                        <div className="text-center">
                           <div className="text-2xl mb-1">↩️</div>
                           <p className="text-xs text-gray-600">30-Day Returns</p>
                        </div>
                        <div className="text-center">
                           <div className="text-2xl mb-1">🔒</div>
                           <p className="text-xs text-gray-600">Secure Payment</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
