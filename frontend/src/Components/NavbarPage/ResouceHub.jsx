import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResouceHub = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || token === 'null' || token === 'undefined') {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const token = localStorage.getItem('token');
    if (!token || token === 'null' || token === 'undefined') {
      setErrorMsg('Not authorized, please log in first.');
      toast.error('Not authorized, please log in first.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    if (description) formData.append('description', description);
    if (image) formData.append('image', image);
    if (file) formData.append('file', file);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resourcehub`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.message || 'Failed to upload');
        toast.error(err.message || 'Failed to upload');
        if (res.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.dispatchEvent(new Event('storage'));
          setTimeout(() => navigate('/login'), 2500);
        }
      } else {
        toast.success('Resource saved');
        setTitle('');
        setDescription('');
        setImage(null);
        setFile(null);
        setErrorMsg('');
      }
    } catch (err) {
      setErrorMsg('Server error connecting to API');
      toast.error('Server error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] dark:bg-slate-900 flex items-center justify-center p-6 md:p-12 font-sans overflow-hidden">
      <div className="max-w-3xl w-full bg-white dark:bg-slate-800 rounded-[3.5rem] shadow-2xl p-8 md:p-14 animate-fadeInUp">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-[#E0F2FE] dark:bg-blue-900/30 rounded-3xl mb-4 animate-bounce">
            <span className="text-4xl">📚</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
            Add New Resource
          </h2>
          <p className="text-gray-500 text-xl italic">
            Dashboard → Resource Management → Add Resource
          </p>
        </div>

        <form className="space-y-10" onSubmit={handleSubmit}>
          
          {/* Section 1: Basic Info */}
          <div className="space-y-5">
            <h3 className="text-[#4A90E2] dark:text-blue-400 font-bold text-sm uppercase tracking-widest border-b-2 border-blue-50 dark:border-slate-700 pb-2">
              Step 1: Resource Essentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-600 dark:text-gray-300 font-semibold ml-2">Resource Title</label>
                <input
                  type="text"
                  placeholder="e.g. Payment API Documentation"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  className="p-4 bg-gray-50 dark:bg-slate-700 border-2 border-gray-100 dark:border-slate-600 rounded-2xl outline-none focus:border-[#4A90E2] focus:bg-white dark:focus:bg-slate-600 dark:text-white transition-all text-lg w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-600 dark:text-gray-300 font-semibold ml-2">Select Page</label>
                <select className="p-4 bg-gray-50 dark:bg-slate-700 border-2 border-gray-100 dark:border-slate-600 rounded-2xl outline-none focus:border-[#4A90E2] focus:bg-white dark:focus:bg-slate-600 transition-all text-lg text-gray-500 dark:text-gray-200 w-full">
                  <option>Homepage</option>
                  <option>About us </option>
                  <option>service </option>
                  <option>self assesment </option>
                  <option>About us </option>
                  <option>Other Specifications (includes Supervisor Comments) </option>
                  

                  
                  <option>API Section</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-gray-600 dark:text-gray-300 font-semibold ml-2">Description</label>
              <textarea
                 placeholder="Briefly explain what this resource is for..."
                 rows="3"
                 value={description}
                 onChange={(e)=>setDescription(e.target.value)}
                 className="p-4 bg-gray-50 dark:bg-slate-700 border-2 border-gray-100 dark:border-slate-600 rounded-2xl outline-none focus:border-[#4A90E2] focus:bg-white dark:focus:bg-slate-600 dark:text-white transition-all text-lg w-full"
               ></textarea>
            </div>
          </div>

          {/* Section 2: Media & Links */}
          <div className="space-y-5">
            <h3 className="text-[#4A90E2] dark:text-blue-400 font-bold text-sm uppercase tracking-widest border-b-2 border-blue-50 dark:border-slate-700 pb-2">
              Step 2: Media & Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-600 dark:text-gray-300 font-semibold ml-2">Resource Image (Banner)</label>
                <div className="relative group">
                  <input
                     type="file"
                     accept="image/*"
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                     onChange={(e)=>setImage(e.target.files[0])}
                   />
                   <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-2xl text-center text-blue-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                     🖼️ {image ? image.name : 'Click to upload image'}
                   </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-gray-600 dark:text-gray-300 font-semibold ml-2">Attach File (PDF/ZIP)</label>
                <div className="relative group">
                  <input
                     type="file"
                     accept=".pdf,.zip,.doc,.docx"
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                     onChange={(e)=>setFile(e.target.files[0])}
                   />
                   <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-2xl text-center text-blue-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                     📁 {file ? file.name : 'Click to upload PDF/ZIP'}
                   </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-gray-600 dark:text-gray-300 font-semibold ml-2">Resource URL</label>
              <input
                type="url"
                placeholder="https://docs.example.com/..."
                className="p-4 bg-gray-50 dark:bg-slate-700 border-2 border-gray-100 dark:border-slate-600 rounded-2xl outline-none focus:border-[#4A90E2] text-lg w-full dark:text-white"
              />
            </div>
          </div>

          {/* Section 3: Configuration */}
          <div className="bg-[#F8FAFC] dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-700 space-y-6 shadow-inner dark:shadow-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase">Target Audience</label>
                <select className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 outline-none focus:border-[#4A90E2] dark:bg-slate-700 dark:text-white">
                  <option>Developer</option>
                  <option>Customer</option>
                  <option>Both</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase">Priority Level</label>
                <select className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 outline-none focus:border-[#4A90E2] dark:bg-slate-700 dark:text-white">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase">Status</label>
                <select className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-slate-600 outline-none focus:border-[#4A90E2] dark:bg-slate-700 dark:text-white">
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase">Supervisor Comment (Optional)</label>
                <input
                  type="text"
                  placeholder="Internal notes..."
                  className="w-full p-4 bg-white dark:bg-slate-700 border-2 border-gray-100 dark:border-slate-600 rounded-2xl outline-none focus:border-[#4A90E2] dark:text-white"
                />
            </div>
          </div>

          {/* Action Buttons */}
          {errorMsg && (
            <div className="text-red-500 text-sm font-bold bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 p-4 rounded-2xl flex items-center gap-2">
              <span>🚨</span> {errorMsg}
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button type="submit" className="flex-1 py-5 bg-[#6FCF97] hover:bg-[#5bb884] text-gray-900 font-black text-xl rounded-2xl shadow-lg transition-all hover:scale-[1.03] active:scale-95">
               ✅ Save Resource
             </button>
             <button type="button" onClick={()=>{ /* draft logic placeholder */ }} className="flex-1 py-5 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-200 font-bold text-xl rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-600 transition-all">
               ✏️ Save as Draft
             </button>
             <button type="button" onClick={()=>{ /* cancel logic */ }} className="px-8 py-5 text-red-400 dark:text-red-400 font-bold text-xl rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
               ❌ Cancel
             </button>
             <ToastContainer />
          </div>
        </form>
      </div>

      {/* Tailwind Animation Config Required in tailwind.config.js */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ResouceHub;