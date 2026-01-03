import { Route, Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import ProductPage from "./productPage.jsx";
import ProductOverview from "./productOverview.jsx";

export default function HomePage() {
   return (
      <div className="w-full h-full overflow-y-scroll max-h-full">
         <Header />
         <div className="w-full min-h-[calc(100%-100px)]">
            <Routes>
               <Route path="/" element={<h1 className="text-4xl p-10">Home Page</h1>} />
               <Route path="/products" element={<ProductPage />} />
               <Route path="/about" element={<h1 className="text-4xl p-10">About Page</h1>} />
               <Route path="/contact" element={<h1 className="text-4xl p-10">Contact Page</h1>} />
               <Route path="/overview/:productId" element={<ProductOverview />} />
               <Route path="/*" element={<h1 className="text-4xl p-10">404 - Page Not Found</h1>} />
            </Routes>
         </div>
      </div>
   );
}
