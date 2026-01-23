import React, { useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);  // ✅ add this

  const [state, setState] = React.useState<"login" | "register">("login");
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        state === "login"
          ? "http://localhost:5000/api/auth/login"
          : "http://localhost:5000/api/auth/register";

      const payload =
        state === "login"
          ? {
              email: formData.email,
              password: formData.password,
            }
          : formData;

      const res = await axios.post(url, payload, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Success 🎉");

      // 🔥 SET USER HERE (IMPORTANT)
      setUser(res.data.user);

      // 🔥 Redirect after successful login
      if (state === "login") {
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Backend error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CENTER WRAPPER */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-87.5 text-center bg-white/6 border border-pink-500/20 rounded-2xl px-8"
        >
          <h1 className="text-white text-3xl mt-10 font-medium">
            {state === "login" ? "Login" : "Sign up"}
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Please sign in to continue
          </p>

          {state !== "login" && (
            <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-pink-500/20 focus-within:ring-pink-500 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full bg-transparent text-white placeholder-white/60 outline-none"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-pink-500/20 focus-within:ring-pink-500 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all">
            <input
              type="email"
              name="email"
              placeholder="Email id"
              className="w-full bg-transparent text-white placeholder-white/60 outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center mt-4 w-full bg-white/5 ring-2 ring-pink-500/20 focus-within:ring-pink-500 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-transparent text-white placeholder-white/60 outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4 text-left">
            <button
              type="button"
              className="text-sm text-pink-400 hover:underline"
            >
              Forget password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full h-11 rounded-full text-white bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:opacity-90 transition disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : state === "login"
              ? "Login"
              : "Sign up"}
          </button>

          <p
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
          >
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span className="text-pink-400 hover:underline ml-1">
              click here
            </span>
          </p>
        </form>
      </div>

      {/* Soft Backdrop (PINK) — ❌ NOT TOUCHED */}
      <div className="fixed inset-0 -z-1 pointer-events-none">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-pink-600/35 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-fuchsia-600/35 to-transparent rounded-full blur-2xl" />
      </div>
    </>
  );
};

export default Login;
