import { Link, Route,Routes } from "react-router-dom";
import { FaListAlt, FaUserFriends, FaUsers } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdRateReview } from "react-icons/md";

export default function AdminPage() {
  return (
    <div className="w-full h-full bg-accent flex">
      <div className="w-[300px] bg-accent h-full">

        <div className="w-full h-[100px] border border-white text-primary flex items-center ">
          <img src="/logo.png" className="h-full" />
          <h1 className="text-2xl">Admin</h1>
        </div>

        <div className="w-full h-[400px] text-white text-2xl border border-white flex flex-col ">

          <Link to="/admin" className="w-full items-center h-[50px] flex gap-2.5"><FaListAlt />Orders</Link>
          <Link to="/admin/products" className="w-full items-center h-[50px] flex gap-2.5"><AiFillProduct />Products</Link>
          <Link to="/admin/users" className="w-full items-center h-[50px] flex gap-2.5"><FaUserFriends />Users</Link> 
          <Link to="/admin/reviews" className="w-full items-center h-[50px] flex gap-2.5"><MdRateReview />Reviews</Link>
        
        </div>

      </div>


      <div className="w-[calc(100%-300px)] h-full max-h-full border-accent bg-primary border-10 rounded-2xl overflow-y-scroll text-4xl p-10">
     
      <Routes>
        <Route path="/" element={<h1>Orders</h1>}/>
        <Route path="/products" element={<h1>Products</h1>}/>
        <Route path="/users" element={<h1>Users</h1>}/>
        <Route path="/reviews" element={<h1>Reviews</h1>}/>
      </Routes>
     
      </div>

    </div>
  );
}