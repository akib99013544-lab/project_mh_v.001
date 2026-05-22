import React from "react";
import { Link } from "react-router";
import { Brain, Mail, Phone, AlertTriangle, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-10 relative overflow-hidden text-slate-300">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Column 1: About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-primary shadow-sm border border-white/10 group-hover:bg-primary/20 transition-colors">
                <Brain size={24} />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                GeronEssence
              </span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed">
              Empowering older adults to prioritize their mental well-being
              through innovative AI support and compassionate care.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xl mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4 text-slate-400">
              <li>
                <Link to="/" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Home
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> About Us
                </Link>
              </li>
              <li>
                <Link to="/service" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Services
                </Link>
              </li>
              <li>
                <Link to="/selfassessment" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Self Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white font-bold text-xl mb-6">Resources</h4>
            <ul className="space-y-4 text-slate-400">
              <li>
                <Link to="/resource" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Resource Hub
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Anxiety Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Depression Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Self Care Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-bold text-xl mb-6">Contact</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-blue-400">
                  <Mail size={18} />
                </span>
                <span>Khoka.hamiduzzamn@acu.edu.au</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-emerald-400">
                  <Phone size={18} />
                </span>
                <span>+61466956656</span>
              </li>
              <li className="mt-6 p-5 bg-red-900/20 rounded-2xl border border-red-500/30 flex items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <span className="text-red-500 animate-pulse">
                  <AlertTriangle size={32} />
                </span>
                <div>
                  <p className="text-red-400 font-bold text-xs uppercase tracking-widest mb-1">
                    Emergency Support
                  </p>
                  <p className="text-white font-bold text-lg">Call 000</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 font-medium text-sm">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p>© 2026 GeronEssence. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </div>

          <div className="text-center md:text-right space-y-2">
            <p className="text-white font-bold text-base">
              Official Platform of Prof. Dr. Khoka Hamiduzzaman Medical Research Team
            </p>
            <p className="text-slate-500 text-xs font-medium">
              Developed by <span className="text-slate-400">Md Akib Bhuiyan</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
