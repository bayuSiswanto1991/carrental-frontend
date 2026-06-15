import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { backendUrl, setToken, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [isLogin, setIslogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin ? `${backendUrl}/api/auth/login` : `${backendUrl}/api/auth/register`;
    const body = isLogin ? { email, password } : { name, email, password };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-50">
      <div className=" bg-white p-8 rounded-2xl shadow-sm w-full max-w-md border border-gray-100">
        <h2 className=" text-2xl font-semibold text-gray-800 mb-1">{isLogin ? "Welcome Back" : "Create account"}</h2>
        <p className=" text-gray-400 text-sm mb-6">{isLogin ? "Sign in to your account" : "Sign up for free"}</p>

        <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className=" text-sm text-gray-600 mb-1 block">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className=" w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary "
              />
            </div>
          )}

          <div>
            <label className=" text-sm text-gray-600 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className=" w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary "
            />
          </div>

          <div>
            <label className=" text-sm text-gray-600 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className=" w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary "
            />
          </div>

          <button type="submit" className=" bg-primary text-white rounded-lg py-3 hover:opacity-90 transition">
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className=" text-sm text-gray-500 text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIslogin(!isLogin)} className=" text-primary ml-1 hover:underline">
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
