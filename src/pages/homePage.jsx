import { Route, Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import ProductPage from "./productPage.jsx";
import ProductOverview from "./productOverview.jsx";
import CartPage from "./cart.jsx";
import CheckoutPage from "./checkout.jsx";

export default function HomePage() {
   return (
      <div className="w-full h-full  max-h-full">
         <Header />
         <div className="w-full min-h-[calc(100%-100px)] overflow-auto">
            <Routes>
               <Route path="/" element={<h1>Home Page</h1>} />
               <Route path="/products" element={<ProductPage />} />
               <Route path="/about" element={<h1 className="text-4xl p-10">About Page</h1>} />
               <Route path="/contact" element={<h1 className="text-4xl p-10">Contact Page</h1>} />
               <Route path="/overview/:productId" element={<ProductOverview />} />
               <Route path="/cart" element={<CartPage />} />
               <Route path="/checkout" element={<CheckoutPage />} />
               <Route path="/*" element={<h1 className="text-4xl p-10">404 - Page Not Found</h1>} />
            </Routes>
         </div>
      </div>
   );
}
