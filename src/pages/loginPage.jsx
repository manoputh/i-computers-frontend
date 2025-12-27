import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    console.log("Logging in with", email, password);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/login",
        {
          email: email,
          password: password,
        }
      );

      console.log(res);

      localStorage.setItem("token", res.data.token);

      if (res.data.role == "admin") {
        // window.location.href = "/admin";
        navigate("/admin");
      } else {
        // window.location.href = "/";
        navigate("/");
      }

      toast.success("Login successful!");
    } catch (err) {
      console.log("Login error:", err);
      toast.error("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex">
      <div className="w-[50%] h-full flex justify-center items-center flex-col p-[50px]">
        <img
          src="/logo.png"
          alt="i-computers logo"
          className=" h-[200px] mb-5 object-cover"
        />
        <h1 className="text-[45px] text-gold text-shadow-accent text-shadow-2xs font-bold text-center">
          Plug In. Power Up. Play Hard.
        </h1>
        <h2 className="text-[30px] text-white italic">
          Premium devices. Expert service. Lasting trust.
        </h2>
      </div>

      <div className="w-[50%] h-full justify-center items-center flex">
        <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-lg rounded-2xl flex flex-col items-center justify-center">
          <h1 className="text-[32px] font-bold mb-8 text-accent">Login</h1>

          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
            className="w-[80%] h-[50px] mb-5 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-white"
          />

          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            className="w-[80%] h-[50px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          />

          <p className="text-white w-full text-right mb-5">
            Forget your password?
            <Link to="/forgot-password" className="text-gold italic">
              Reset here
            </Link>
          </p>
          <button
            onClick={login}
            className="w-[80%] h-[50px] bg-white text-accent font-bold rounded-lg border-[2px] border-white hover:bg-transparent hover:text-white"
          >
            Login
          </button>
          <p className="text-white">
            Don't have an account?{" "}
            <Link to="/register" className="text-gold  italic">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
