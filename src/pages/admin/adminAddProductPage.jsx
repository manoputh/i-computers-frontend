import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineProduct } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";

export default function AdminAddProductPage() {
   const [productID, setProductID] = useState("");
   const [name, setName] = useState("");
   const [altNames, setAltNames] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("0");
   const [labelledPrice, setLabelledPrice] = useState("0");
   const [files, setFiles] = useState([]);
   const [category, setCategory] = useState("");
   const [brand, setBrand] = useState("");
   const [model, setModel] = useState("");
   const [stock, setStock] = useState(0);
   const [isAvailable, setIsAvailable] = useState(false);
   const navigate = useNavigate();

   async function addProduct() {
      const token = localStorage.getItem("token");
      if (token == null) {
         toast.error("You must be logged in as admin to add products.");
         navigate("/login");
         return;
      }

      const imagePromises = [];

      for (let i = 0; i < files.length; i++) {
         const promise = uploadFile(files[i]);
         imagePromises.push(promise);
      }

      const images = await Promise.all(imagePromises).catch((error) => {
         toast.error("Image upload failed: ");
         console.error(error);
         return;
      });

      if (!productID || !name || !description || !category || !price) {
         toast.error("Please fill in all required fields.");
         return;
      }

      try {
         const altNamesArray = altNames.split(",");
         await axios.post(
            import.meta.env.VITE_BACKEND_URL + "/products/",
            {
               productID: productID,
               name: name,
               altNames: altNamesArray,
               description: description,
               price: price,
               labelledPrice: labelledPrice,
               images: images,
               category: category,
               brand: brand?.trim() || "Generic",
               model: model?.trim() || "Standard",
               stock: stock,
               isAvailable: isAvailable,
            },
            {
               headers: {
                  Authorization: "Bearer " + token,
               },
            }
         );
         toast.success("Product added successfully!");
         navigate("/admin/products");
      } catch (error) {
         toast.error("Failed to add product. Please try again.");
      }
   }

   return (
      <div className="w-full flex justify-center">
         <div className="w-[800px] bg-accent/80 rounded-2xl p-10">
            <h1 className="w-full text-2xl mb-5 text-white flex items-center gap-1">
               <AiOutlineProduct /> Add New Product
            </h1>
            <div className="w-full bg-amber-50 p-5 rounded-xl flex flex-wrap justify-between">
               <div className="my-2.5 w-[40%]">
                  <label>Product ID</label>
                  <input
                     type="text"
                     value={productID}
                     onChange={(e) => setProductID(e.target.value)}
                     className="my-0.5 w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:accent px-5 border shadow-2xl border-gray-300"
                  />
                  <p className="text-sm w-full text-gray-500 text-right">Provide a unique Product ID.</p>
               </div>

               <div className="my-2.5 w-[40%]">
                  <label>Product Name</label>
                  <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="my-0.5 w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:accent px-5 border shadow-2xl border-gray-300"
                  />
               </div>

               <div className="my-2.5 w-full">
                  <label>Alternative Names</label>
                  <input
                     type="text"
                     value={altNames}
                     onChange={(e) => setAltNames(e.target.value)}
                     className="my-0.5 w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:accent px-5 border shadow-2xl border-gray-300"
                  />
                  <p className="text-sm w-full text-gray-500 text-right">Separate alternative names with commas.</p>
               </div>

               <div className="my-2.5 w-full">
                  <label>Description</label>
                  <textarea
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     className="my-0.5 w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:accent px-5  py-2.5 border shadow-2xl border-gray-300"
                  />
               </div>

               <div className="my-2.5 w-[40%]">
                  <label>Price</label>
                  <input
                     type="number"
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     className="my-0.5 w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:accent px-5 border shadow-2xl border-gray-300"
                  />
               </div>

               <div className="my-2.5 w-[40%]">
                  <label>Labelled Price</label>
                  <input
                     type="number"
                     value={labelledPrice}
                     onChange={(e) => setLabelledPrice(e.target.value)}
                     className="my-0.5 w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:accent px-5 border shadow-2xl border-gray-300"
                  />
               </div>

               <div className="my-2.5 w-full">
                  <label>Images (URLs)</label>
                  <input
                     type="file"
                     multiple={true}
                     onChange={(e) => {
                        setFiles(e.target.files);
                     }}
                     className="my-0.5 w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:accent px-5 border shadow-2xl border-gray-300"
                  />
               </div>

               <div className="my-2.5 w-[30%]">
                  <label>Category</label>
                  <select
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                     className="my-0.5 w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:accent px-5 border shadow-2xl border-gray-300">
                     <option value="" disabled hidden>
                        Select Category
                     </option>
                     <option value="CPU">CPU</option>
                     <option value="Graphic Cards">Graphic Cards</option>
                     <option value="Motherboards">Motherboards</option>
                     <option value="RAM">RAM</option>
                     <option value="Storage Devices">Storage Devices</option>
                     <option value="Power Supplies">Power Supplies</option>
                     <option value="Case">Case</option>
                     <option value="Monitors">Monitors</option>
                     <option value="Mouse and keyboards">Mouse and keyboards</option>
                     <option value="Accessories">Accessories</option>
                     <option value="Cooling solutions">Cooling solutions</option>
                     <option value="Laptops">Laptops</option>
                     <option value="Prebuilt PCs">Prebuilt PCs</option>
                     <option value="Networking">Networking</option>
                     <option value="Audio">Audio</option>
                     <option value="Printers & Scanners">Printers & Scanners</option>
                     <option value="Software">Software</option>
                  </select>
               </div>

               <div className="my-2.5 w-[30%]">
                  <label>Brand</label>
                  <input
                     type="text"
                     value={brand}
                     onChange={(e) => setBrand(e.target.value)}
                     placeholder="Generic"
                     className="my-0.5 w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:accent px-5 border shadow-2xl border-gray-300"
                  />
               </div>

               <div className="my-2.5 w-[30%] ">
                  <label>Model</label>
                  <input
                     type="text"
                     value={model}
                     onChange={(e) => setModel(e.target.value)}
                     placeholder="Standard"
                     className="my-0.5 w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:accent px-5 border shadow-2xl border-gray-300"
                  />
               </div>

               <div className="my-2.5 w-[40%]">
                  <label>Stock Quantity</label>
                  <input
                     type="number"
                     value={stock}
                     onChange={(e) => setStock(e.target.value)}
                     className="my-0.5 w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:accent px-5 border shadow-2xl border-gray-300"
                  />
               </div>

               <div className="my-2.5 w-[30%] flex flex-col items-center">
                  <label>Available</label>
                  <select
                     value={isAvailable}
                     onChange={(e) => setIsAvailable(e.target.value)}
                     className="my-0.5 w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:accent px-5 border shadow-2xl border-gray-300">
                     <option value={true}>Yes</option>
                     <option value={false}>No</option>
                  </select>
               </div>

               <Link
                  to="/admin/products"
                  className="w-[49%] h-12 text-white bg-red-600 font-bold rounded-2xl mt-5 hover:bg-red-600/80 flex justify-center items-center text-center">
                  Cancel
               </Link>

               <button
                  onClick={addProduct}
                  className="w-[49%] h-12 bg-accent text-white font-bold rounded-2xl mt-5 hover:bg-accent/80  flex justify-center items-center text-center">
                  Add Product
               </button>
            </div>
         </div>
      </div>
   );
}
