import React, { useState } from "react";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "📧 Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "📧 Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "🔒 Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials. Please try again.");
      }

      // Store authentication session data
      localStorage.setItem("user", JSON.stringify({
        id: data._id,
        name: data.name,
        email: data.email,
        ageRange: data.ageRange,
        livingSituation: data.livingSituation,
      }));
      localStorage.setItem("token", data.token);

      // Dispatch local storage change event so Navbar resolves change immediately
      window.dispatchEvent(new Event("storage"));

      // Navigate to homepage
      navigate("/");
    } catch (err) {
      setApiError(err.message || "Connection failed. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex items-center justify-center p-6 md:p-12 font-sans pt-24">
      <div className="max-w-6xl w-full bg-white rounded-[3rem] shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[650px]">
        {/* Left Side - Info Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#4A90E2] to-[#6FCF97] p-16 flex-col justify-center text-white relative">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-4xl">🧠</span>
              <span className="text-3xl font-bold">GeronEssence</span>
            </div>
            <h1 className="text-5xl font-black leading-tight mb-6">
              Welcome back to GeronEssence
            </h1>
            <p className="text-2xl opacity-90 leading-relaxed">
              A safe place to care for your mental well-being.
            </p>
          </div>
          {/* Abstract Circle decoration */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side - Form Section */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center animate-fadeIn">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
              Login to Your Account
            </h2>
            <p className="text-gray-500 text-lg mb-10">
              Sign in to continue your journey.
            </p>

            {/* Global API error notification */}
            {apiError && (
              <div className="mb-6 p-5 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl text-lg font-bold">
                🚨 {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-gray-700 font-bold text-lg block">
                  📧 Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  className={`w-full p-5 bg-[#F9FAFB] border-2 rounded-2xl focus:border-[#4A90E2] outline-none transition-all text-xl ${
                    errors.email ? "border-red-400 focus:border-red-500" : "border-gray-100"
                  }`}
                />
                {errors.email && <span className="text-red-500 text-sm font-medium mt-1 block ml-2">{errors.email}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-gray-700 font-bold text-lg block">
                  🔒 Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full p-5 bg-[#F9FAFB] border-2 rounded-2xl focus:border-[#4A90E2] outline-none transition-all text-xl ${
                    errors.password ? "border-red-400 focus:border-red-500" : "border-gray-100"
                  }`}
                />
                {errors.password && <span className="text-red-500 text-sm font-medium mt-1 block ml-2">{errors.password}</span>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer text-gray-600 text-lg">
                  <input
                    type="checkbox"
                    className="w-6 h-6 rounded border-gray-300 text-[#4A90E2]"
                  />
                  Remember Me
                </label>
                <button
                  type="button"
                  className="text-[#4A90E2] font-bold text-lg hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-[#6FCF97] hover:bg-[#5bb884] disabled:bg-gray-300 text-gray-900 font-black text-2xl rounded-2xl shadow-lg transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                {loading ? "⌛ Logging in..." : "🟢 Login"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-lg">
                Don’t have an account?
                <Link to="/register" className="ml-2 text-[#4A90E2] font-black hover:underline">
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
