import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api.jsx";
import { toast } from "react-hot-toast";
import { Eye, EyeClosed } from "lucide-react";
import { useUser } from "../context/UserContext";
import aauLogo from "../assets/aauLogo.png";
import aauimg from "../assets/aauimg.png";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import logo6 from "../assets/logo6.png";
import logo7 from "../assets/logo7.png";
import logo8 from "../assets/logo8.png";
import logo9 from "../assets/logo9.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login: loginContext } = useUser();

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required!`;
    }

    setError((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const isEmailValid = validateField("email", email);
    const isPasswordValid = validateField("password", password);

    if (isEmailValid && isPasswordValid) {
      try {
        const response = await login({ email, password });
        const userData = response.data;
        // Look for token in response.data (typical REST API pattern)
        let token = userData?.token;
        // 2. Check if token is in response headers (common in some APIs)
        if (!token) {
          token =
            response.headers?.authorization?.replace("Bearer ", "") ||
            response.headers?.["x-auth-token"] ||
            response.headers?.["authToken"];
        }
        // Only proceed if a real token is found
        if (token && userData) {
          loginContext(userData, token);
          toast.success("Logged in successfully!");
          navigate("/partnership");
        } else {
          toast.error(
            "Login failed: No authentication token received. Please contact your administrator."
          );
          console.error(
            "Login response did not include a proper token:",
            userData
          );
        }
      } catch (error) {
        console.error("Login error:", error);
        if (error.response) {
          if (error.response.status === 400) {
            toast.error("Invalid email or password");
          } else if (error.response.status === 500) {
            toast.error("Server error. Please try again later.");
          } else {
            toast.error(error.response.data.error || "Login failed");
          }
        } else {
          toast.error("Network error. Please check your connection.");
        }
      }
    }
  };

  return (
    <div className="main-container bg-white w-full min-h-screen relative overflow-hidden flex flex-col">
      {/* Top Bar */}
      <div className="w-full bg-[#014166] shadow-md z-10 py-4 px-6 flex flex-col sm:flex-row items-center sm:justify-start gap-4 text-white text-sm font-bold">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-envelope w-4 h-4"></i>
          <span>Email: vpsci@aau.edu.et</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-phone w-4 h-4"></i>
          <span>+251-118-278433 or +251-111-239706</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 w-full">
        {/* Image*/}
        <div className="relative bg-[#014166] w-full lg:w-1/2 h-[450px] lg:h-auto rounded-br-[300px] overflow-hidden">
          <img
            src={aauimg}
            alt="background"
            className="absolute top-0 left-0 w-full h-full object-cover z-10 opacity-70"
          />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 text-center relative z-20">
          <img src={aauLogo} alt="logo" className="w-20 mb-4" />
          <h1 className="text-2xl lg:text-3xl font-bold text-black">
            Addis Ababa University
          </h1>
          <p className="text-lg font-medium mt-2">
            PARTNERSHIP MANAGEMENT SYSTEM
          </p>
          <p className="text-[#00578a] mt-4 text-lg">Super Admin Login</p>
          <p className="text-gray-500 mt-2 max-w-md">
            Welcome to the Addis Ababa University Partnership Management System
          </p>

          {/* Input Fields */}
          <form
            onSubmit={handleLogin}
            className="mt-6 w-full max-w-sm flex flex-col gap-4"
          >
            <div>
              <input
                type="email"
                placeholder="Email"
                className={`border-2 w-full ${
                  error.email ? "border-red-500" : "border-[#00588b]"
                } rounded-full px-4 py-3 placeholder:text-sm placeholder:text-gray-500`}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {error.email && (
                <p className="text-red-500 text-sm mt-1 ml-4">{error.email}</p>
              )}
            </div>
            <div className="flex flex-col justify-start relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`border-2 w-full ${
                  error.password ? "border-red-500" : "border-[#00588b]"
                } rounded-full px-4 py-3 placeholder:text-sm placeholder:text-gray-500`}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button>
                {showPassword ? (
                  <EyeClosed
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </button>
              {error.password && (
                <p className="item-start text-red-500 text-sm mt-1 ml-4">
                  {error.password}
                </p>
              )}
            </div>

            <button className="flex items-center justify-center bg-[#00588b] text-white px-6 py-3 mt-6 rounded-full gap-2 hover:bg-[#004a75] transition cursor-pointer">
              Login
              <img
                src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-04/YvWR34sXt7.png"
                alt="arrow"
                className="w-5 h-5"
              />
            </button>
          </form>
          <p className=" mt-4 text-lg">
            Don't have an account?{" "}
            <Link
              className="text-[#00578a] underline hover:no-underline"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Logos*/}
      <div className="w-full bg-white shadow-md py-6 flex flex-wrap justify-center items-center gap-4 mt-auto px-4">
        <img src={logo1} className="h-16 w-auto" />
        <img src={logo2} className="h-16 w-auto" />
        <img src={logo3} className="h-16 w-auto" />
        <img src={logo4} className="h-16 w-auto" />
        <img src={logo5} className="h-16 w-auto" />
        <img src={logo6} className="h-16 w-auto" />
        <img src={logo7} className="h-16 w-auto" />
        <img src={logo8} className="h-16 w-auto" />
        <img src={logo9} className="h-16 w-auto" />
        {/* {[
          "y0rhtHirob",
          "BXaR8XHk0C",
          "k5PGxTCs0F",
          "HQOmE5SR2A",
          "LW3kEYvpAu",
          "mqbonTYqtm",
          "9yAtzXbiMi",
          "tyAQkk5rfp",
          "3AJeb17BFE",
        ].map((imgId, index) => (
          <img
            key={index}
            src={`https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-04/${imgId}.png`}
            alt={`logo-${index}`}
            className="h-16 w-auto"
          />
        ))} */}
      </div>
    </div>
  );
}
