import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import NavBar from "../components/NavBar.jsx";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4">
        <div className="max-w-3xl w-full text-center animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <AlertCircle
                size={120}
                className="text-primary-500 animate-float"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
            Page Not Found
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center px-6 py-3 rounded-md bg-primary-500 text-white font-medium transition-all hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
          >
            <Home size={20} className="mr-2" />
            Back to Home
          </button>
        </div>

        {/* <div
          className="mt-16 text-sm text-gray-500 animate-fadeIn"
          style={{ animationDelay: "0.3s" }}
        >
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div> */}
      </div>
    </>
  );
};

export default NotFound;
