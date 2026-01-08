import { useState } from "react";

export default function ImageSlider(props) {
   const images = props.images;
   const [activeIndex, setActiveIndex] = useState(0);

   const goToPrevious = () => {
      setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
   };

   const goToNext = () => {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
   };

   return (
      <div className="w-full bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl shadow-xl overflow-hidden">
         {/* Main Image Container */}
         <div className="relative w-full h-[500px] flex items-center justify-center bg-white">
            <img
               src={images[activeIndex]}
               className="w-full h-full object-contain p-8 transition-all duration-500 ease-in-out"
               alt={`Product view ${activeIndex + 1}`}
            />

            {/* Navigation Arrows - Only show if more than 1 image */}
            {images.length > 1 && (
               <>
                  <button
                     onClick={goToPrevious}
                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 z-10 group"
                     aria-label="Previous image">
                     <svg
                        className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                     </svg>
                  </button>

                  <button
                     onClick={goToNext}
                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 z-10 group"
                     aria-label="Next image">
                     <svg
                        className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                     </svg>
                  </button>
               </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
               {activeIndex + 1} / {images.length}
            </div>
         </div>

         {/* Thumbnail Navigation */}
         <div className="w-full px-4 bg-white border-t border-gray-200">
            <div className="flex flex-row gap-3 overflow-x-scroll py-5 px-2 items-center justify-center">
               {images.map((image, index) => (
                  <div
                     key={index}
                     className={`relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                        activeIndex === index
                           ? "ring-3 ring-blue-500 scale-105 shadow-xl"
                           : "ring-2 ring-gray-200 hover:ring-blue-300 hover:scale-105 opacity-60 hover:opacity-100 shadow-md hover:shadow-lg"
                     }`}
                     onClick={() => setActiveIndex(index)}>
                     <img src={image} className="w-20 h-20 object-cover" alt={`Thumbnail ${index + 1}`} />
                     {activeIndex === index && (
                        <div className="absolute inset-0 bg-blue-500/20 pointer-events-none"></div>
                     )}
                  </div>
               ))}
            </div>
         </div>

         {/* Thumbnail Count Indicator */}
         {images.length > 5 && (
            <div className="text-center pb-3 px-4">
               <p className="text-xs text-gray-500">Scroll to see all {images.length} images</p>
            </div>
         )}
      </div>
   );
}
