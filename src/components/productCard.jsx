import { Link } from "react-router-dom";

export default function ProductCard(props) {
   const product = props.product;

   return (
      <div className="w-[300px] h-[400px] m-3 shadow-2xl cursor-pointer relative hover:[&_.buttons]:opacity-100 hover:[&_.primary-image]:opacity-0">
         <div className="w-full h-[250px] bg-gray-200 flex justify-center items-center relative">
            <img src={product.images[1]} alt={product.name} className="w-full h-full object-cover absolute bg-white" />
            <img
               src={product.images[0]}
               alt={product.name}
               className="w-full h-full object-cover absolute primary-image bg-white transition-opacity duration-300"
            />
         </div>
         <div className="w-full h-[150px] p-3 flex flex-col justify-between text-center">
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <div className="w-full flex flex-col items-center">
               {product.labelledPrice > product.price && (
                  <h2 className="text-lg text-orange-400 line-through mb-1">LKR. {product.labelledPrice.toFixed(2)}</h2>
               )}
               <h2 className="text-2xl font-semibold text-accent">LKR. {product.price.toFixed(2)}</h2>
            </div>
         </div>

         <div className="w-full h-[150px] bottom-0 flex justify-center items-center opacity-0 bg-white absolute buttons transition-opacity duration-300">
            <Link
               to={"/overview/" + product.productID}
               className="w-[150px] h-[50px] flex justify-center items-center bg-white border-2 border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-150">
               View Details
            </Link>
         </div>
      </div>
   );
}
