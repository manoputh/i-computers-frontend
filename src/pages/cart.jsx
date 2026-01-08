import { useMemo, useState } from "react";
import { addToCart, getCart, getCartTotal } from "../utils/cart";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { PiCaretCircleDownFill, PiCaretCircleUpFill } from "react-icons/pi";

// ...existing code...
export default function CartPage() {
   const [cart, setCart] = useState(getCart());

   return (
      <div className="min-h-[70vh] w-full flex flex-col items-center bg-primary">
         <div className="w-full max-w-3xl px-5 pt-10 pb-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
               <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
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
               {cart.map((item) => (
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
                                       Save LKR {item.labelledPrice - item.price}
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
                                 addToCart(item, 1);
                                 setCart(getCart());
                              }}
                              className="cursor-pointer text-slate-600 hover:text-slate-950"
                              size={30}
                           />
                           <span className="w-[20px] text-sm text-slate-600 text-center">{item.quantity}</span>
                           <PiCaretCircleDownFill
                              onClick={() => {
                                 addToCart(item, -1);
                                 setCart(getCart());
                              }}
                              className="cursor-pointer text-slate-600 hover:text-slate-900"
                              size={30}
                           />
                        </div>
                        <span className="w-[200px] text-center text-lg font-bold text-slate-900">
                           LKR {(item.price * item.quantity).toFixed(2)}
                        </span>
                     </div>
                  </div>
               ))}
               <div className="w-full h-[100px] mt-5 shadow-sm rounded-lg bg-accent/20"></div>
            </div>
         </div>
      </div>
   );
}
// ...existing code...
