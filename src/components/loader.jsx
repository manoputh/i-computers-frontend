export default function Loader() {
   return (
      <div className="w-full h-screen fixed top-0 left-0 bg-accent/45 justify-center items-center flex flex-col z-">
         {/* Spinner */}
         <div className="relative">
            <div className="w-16 h-16 border-4 border-accent/10 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
         </div>

         {/* Loading Text */}
         <p className="mt-4 text-accent font-medium animate-pulse">Loading products...</p>

         {/* Dots Animation */}
         <div className="flex space-x-2 mt-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
         </div>
      </div>
   );
}
