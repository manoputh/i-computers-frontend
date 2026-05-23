import { useState } from "react";
import { PiCaretCircleDownFill, PiCaretCircleUpFill } from "react-icons/pi";
import { FaCartShopping } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";

// ...existing code...
export default function CheckoutPage() {
   const location = useLocation();
   const navigate = useNavigate();
   const [name, setName] = useState("");
   const [address, setAddress] = useState("");
   const [phone, setPhone] = useState("");

   const [cart, setCart] = useState(location.state);

   if (location.state == null) {
      navigate("/products");
   }

   function getCartTotal() {
      let total = 0;
      cart.forEach((item) => {
         total += item.price * item.quantity;
      });
      return total;
   }

   function submitOrder() {
      const token = localStorage.getItem("token");
      if (token == null) {
         toast.error("You must be logged in to place an order");
         return;
      }

      const orderItems = [];
      cart.forEach((item) => {
         orderItems.push({
            productID: item.productID,
            quantity: item.quantity,
         });
      });

      axios
         .post(
            import.meta.env.VITE_BACKEND_URL + "/orders",
            {
               name: name,
               address: address,
               phone: phone,
               items: orderItems,
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            },
         )
         .then(() => {
            toast.success("Order placed successfully");
            navigate("/products");
         })
         .catch(() => {
            toast.error("Failed to place order");
         });
   }

   return (
      <div className="min-h-[70vh] w-full flex flex-col items-center bg-primary">
         <div className="w-full max-w-3xl px-5 pt-10 pb-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
               <h1 className="flex items-center text-3xl font-bold text-slate-900 gap-2">
                  <MdOutlineShoppingCartCheckout />
                  Checkout
               </h1>
               <span className="text-sm text-slate-500">
                  {cart.length} item{cart.length !== 1 && "s"}
               </span>
            </div>

            {cart.length === 0 && (
               <div className="w-full rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
                  Your cart is empty. Add products to see them here.
               </div>
            )}

            <div className="flex flex-col gap-4">
               {cart.map((item, index) => (
                  <div
                     key={item.productID}
                     className="w-full h-28 rounded-xl bg-slate-100 shadow-sm overflow-hidden flex items-center">
                     <img src={item.image} alt={item.name} className="h-full w-28 object-cover rounded-lg" />
                     <div className="flex flex-1 flex-col justify-center px-3 gap-1">
                        <div className="flex items-start justify-between">
                           <div className="flex flex-col">
                              <h2 className="text-lg font-semibold text-slate-900 relative hover:[&_.tooltip]:opacity-100">
                                 <span className="tooltip opacity-0 italic text-xs absolute -bottom-5 bg-accent/90 text-white px-2 py-0.5 rounded-lg">
                                    {item.name}
                                 </span>
                                 {item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}
                              </h2>
                              {item.labelledPrice > item.price && (
                                 <div className="flex items-center gap-2">
                                    <span className="text-sm text-red-500 line-through">LKR {item.labelledPrice}</span>
                                    <span className="text-xs text-red-600 bg-red-50 px-2 py-[2px] rounded-full font-medium">
                                       Save LKR {(item.labelledPrice - item.price).toFixed(2)}
                                    </span>
                                 </div>
                              )}
                           </div>
                        </div>
                        <p className="text-sm text-slate-600">{item.productID}</p>
                        <p className="text-sm text-slate-600">
                           Unit price: <span className="font-medium text-slate-900">LKR {item.price}</span>
                        </p>
                     </div>
                     <div className="h-full flex flex-col justify-center items-center gap-2">
                        <div className="h-10 w-25 rounded-3xl flex flex-row justify-center items-center bg-primary gap-1">
                           <PiCaretCircleUpFill
                              onClick={() => {
                                 const copiedCart = [...cart];
                                 copiedCart[index].quantity += 1;
                                 setCart(copiedCart);
                              }}
                              className="cursor-pointer text-slate-600 hover:text-slate-950"
                              size={30}
                           />
                           <span className="w-[20px] text-sm text-slate-600 text-center">{item.quantity}</span>
                           <PiCaretCircleDownFill
                              onClick={() => {
                                 const copiedCart = [...cart];
                                 copiedCart[index].quantity -= 1;
                                 if (copiedCart[index].quantity <= 0) {
                                    copiedCart.splice(index, 1);
                                 }
                                 setCart(copiedCart);
                              }}
                              className="cursor-pointer text-slate-600 hover:text-slate-900"
                              size={30}
                           />
                        </div>
                        <span className="w-[200px] text-center text-lg font-semibold text-slate-900">
                           LKR {(item.price * item.quantity).toFixed(2)}
                        </span>
                     </div>
                  </div>
               ))}

               <div className="w-full h-[200px] flex flex-col p-2 gap-2">
                  <h1>Delivery Details:</h1>
                  <input
                     type="text"
                     placeholder="Full Name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="p-2 rounded-lg border border-slate-400 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <textarea
                     type="text"
                     placeholder="Address"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     className="p-2 rounded-lg border border-slate-400 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                     type="text"
                     placeholder="Phone Number"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     className="p-2 rounded-lg border border-slate-400 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
               </div>

               <div className="w-full h-[50px] flex justify-between items-center">
                  <button
                     onClick={submitOrder}
                     className="w-[40%] h-12 bg-accent/20 hover:bg-accent text-accent hover:text-white cursor-pointer font-bold text-lg rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                     Order Now
                  </button>
                  <span className="text-right p-3 text-xl font-bold text-slate-900">
                     Total: LKR. {getCartTotal().toFixed(2)}
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
}
// ...existing code...
