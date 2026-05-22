import React, { useState } from "react";
import { useNavigate, Link } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    ageRange: "",
    livingSituation: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "👤 Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "👤 Name must be at least 2 characters long";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "📧 Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "📧 Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "🔒 Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "🔒 Password must be at least 6 characters long";
    }

    if (!formData.ageRange) {
      newErrors.ageRange = "⏳ Please select your age range";
    }

    if (!formData.livingSituation) {
      newErrors.livingSituation = "🏠 Please select your living situation";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "⚠️ You must consent to the terms to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          ageRange: formData.ageRange,
          livingSituation: formData.livingSituation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register. Please try again.");
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
      setApiError(err.message || "Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex items-center justify-center p-6 md:p-12 font-sans pt-24">
      <div className="max-w-2xl w-full bg-white rounded-[3.5rem] shadow-2xl p-10 md:p-16 animate-fadeInUp">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-[#F0F7FF] rounded-3xl mb-4">
            <span className="text-4xl">🧠</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-xl italic">
            It only takes a minute to get started.
          </p>
        </div>

        {/* Global API error notification */}
        {apiError && (
          <div className="mb-6 p-5 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl text-lg font-bold">
            🚨 {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-[#4A90E2] font-bold text-sm uppercase tracking-widest border-b pb-2">
              Step 1: Account Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="👤 Full Name"
                  className={`p-5 bg-gray-50 border-2 rounded-2xl outline-none focus:border-[#4A90E2] text-lg w-full ${
                    errors.name ? "border-red-400 focus:border-red-500" : "border-gray-100"
                  }`}
                />
                {errors.name && <span className="text-red-500 text-sm mt-1.5 ml-2">{errors.name}</span>}
              </div>

              <div className="flex flex-col">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="📧 Email Address"
                  className={`p-5 bg-gray-50 border-2 rounded-2xl outline-none focus:border-[#4A90E2] text-lg w-full ${
                    errors.email ? "border-red-400 focus:border-red-500" : "border-gray-100"
                  }`}
                />
                {errors.email && <span className="text-red-500 text-sm mt-1.5 ml-2">{errors.email}</span>}
              </div>
            </div>

            <div className="flex flex-col">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="🔒 Create Password"
                className={`p-5 bg-gray-50 border-2 rounded-2xl outline-none focus:border-[#4A90E2] text-lg w-full ${
                  errors.password ? "border-red-400 focus:border-red-500" : "border-gray-100"
                }`}
              />
              {errors.password && <span className="text-red-500 text-sm mt-1.5 ml-2">{errors.password}</span>}
            </div>
          </div>

          {/* Section 2: Context */}
          <div className="space-y-4">
            <h3 className="text-[#4A90E2] font-bold text-sm uppercase tracking-widest border-b pb-2">
              Step 2: About You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <select
                  name="ageRange"
                  value={formData.ageRange}
                  onChange={handleChange}
                  className={`p-5 bg-gray-50 border-2 rounded-2xl outline-none focus:border-[#4A90E2] text-lg text-gray-500 w-full ${
                    errors.ageRange ? "border-red-400 focus:border-red-500" : "border-gray-100"
                  }`}
                >
                  <option value="">Select Age Range</option>
                  <option value="50–59">50–59</option>
                  <option value="60–69">60–69</option>
                  <option value="70+">70+</option>
                </select>
                {errors.ageRange && <span className="text-red-500 text-sm mt-1.5 ml-2">{errors.ageRange}</span>}
              </div>

              <div className="flex flex-col">
                <select
                  name="livingSituation"
                  value={formData.livingSituation}
                  onChange={handleChange}
                  className={`p-5 bg-gray-50 border-2 rounded-2xl outline-none focus:border-[#4A90E2] text-lg text-gray-500 w-full ${
                    errors.livingSituation ? "border-red-400 focus:border-red-500" : "border-gray-100"
                  }`}
                >
                  <option value="">Living Situation</option>
                  <option value="Live alone">Live alone</option>
                  <option value="With family">With family</option>
                  <option value="Aged care">Aged care</option>
                </select>
                {errors.livingSituation && (
                  <span className="text-red-500 text-sm mt-1.5 ml-2">{errors.livingSituation}</span>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Consent */}
          <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 space-y-4">
            <label className="flex gap-4 cursor-pointer text-gray-700 text-lg">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-6 h-6 mt-1 rounded text-[#4A90E2]"
              />
              <span>I am 18 years or older and agree to the Terms.</span>
            </label>
            {errors.agreeToTerms && <p className="text-red-500 text-sm ml-10 font-medium">{errors.agreeToTerms}</p>}
            <p className="text-sm text-gray-500 italic">
              📢 Note: This service provides emotional support and does not
              replace professional medical diagnosis.
            </p>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-[#6FCF97] hover:bg-[#5bb884] disabled:bg-gray-300 text-gray-900 font-black text-2xl rounded-2xl shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
          >
            {loading ? "⌛ Creating Account..." : "🟢 Create My Account"}
          </button>

          <p className="text-center text-gray-600 text-lg">
            Already have an account?
            <Link to="/login" className="ml-2 text-[#4A90E2] font-black hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
