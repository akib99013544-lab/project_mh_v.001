import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router"; 
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronDown, Sun, Moon, User, LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const userDropdownRef = useRef(null);

  const loadUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Pages with dark hero headers — navbar needs a solid bg from the start
  const darkHeaderRoutes = ["/referral", "/kotha", "/login", "/register"];
  const hasDarkHeader = darkHeaderRoutes.includes(location.pathname);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/aboutus" },
    { name: "Services", path: "/service" },
    { 
      name: "Self Assessment", 
      path: "/selfassessment",
      hasDropdown: true,
      subLinks: [
        { name: "My Assessment", path: "/selfassessment" },
        { name: "Family Care Assessment", path: "/familycare" },
        { name: "Progress Analytics", path: "/analytics" }
      ]
    },
    { name: "Resource Hub", path: "/resource" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || hasDarkHeader
          ? "py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(30,64,175,0.3)]"
          >
            <Brain size={22} />
          </motion.div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Geron<span className="text-primary">Essence</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-0.5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-1.5 py-1.5 rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || 
                             (link.subLinks && link.subLinks.some(sub => location.pathname === sub.path));
            
            if (link.hasDropdown) {
              return (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`relative px-3 py-2 rounded-xl text-[13px] font-bold transition-all duration-300 flex items-center gap-1 whitespace-nowrap ${
                      isActive ? "text-primary" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <ChevronDown size={13} className={`transition-transform duration-300 shrink-0 ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-white dark:bg-slate-800 shadow-sm rounded-xl -z-0 border border-slate-100 dark:border-slate-700"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-2 overflow-hidden"
                      >
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                              location.pathname === sub.path 
                                ? "bg-primary/5 text-primary" 
                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative px-3 py-2 rounded-xl text-[13px] font-bold transition-all duration-300 whitespace-nowrap"
              >
                <span className={`relative z-10 ${isActive ? "text-primary" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"}`}>
                  {link.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white dark:bg-slate-800 shadow-sm rounded-xl -z-0 border border-slate-100 dark:border-slate-700"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-xl transition-colors ${
              hasDarkHeader || isScrolled
                ? "text-slate-600 hover:bg-slate-100"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link to="/kotha" className="text-[13px] font-extrabold text-secondary hover:text-emerald-600 transition-colors flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            Talk to KOTHA
          </Link>

          <div className="w-px h-5 bg-slate-200 dark:bg-slate-700" />

          {/* ── Logged-in: Welcome dropdown ── */}
          {user ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 px-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm h-9 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all whitespace-nowrap"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white text-[10px] font-black uppercase shrink-0">
                  {user.name ? user.name[0] : "U"}
                </div>
                <div className="flex flex-col justify-center text-left">
                  <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wider leading-none mb-0.5">Welcome</span>
                  <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 leading-none">
                    {user.name.split(" ")[0]}
                  </span>
                </div>
                <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 shrink-0 ${userDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown panel */}
              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50"
                  >
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-700">
                      <p className="text-xs font-black text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    {/* Menu items */}
                    <div className="p-1.5 space-y-0.5">
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-primary/5 hover:text-primary transition-all"
                      >
                        <LayoutDashboard size={15} className="text-primary" />
                        My Profile
                      </Link>
                      <Link
                        to="/analytics"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                      >
                        <User size={15} className="text-slate-400" />
                        Progress Analytics
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="p-1.5 border-t border-slate-50 dark:border-slate-700">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                      >
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* ── Not logged in ── */
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-[13px] font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors whitespace-nowrap">
                Login
              </Link>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2 rounded-xl text-[13px] font-bold shadow-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all whitespace-nowrap"
                >
                  Join Now
                </motion.button>
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-effect border-t border-white/20 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col">
                  {link.hasDropdown ? (
                    <>
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                        className="flex items-center justify-between py-3 text-base font-bold text-slate-700"
                      >
                        {link.name}
                        <ChevronDown size={18} className={`transition-transform ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-slate-50/50 rounded-xl px-4"
                          >
                            {link.subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                className="block py-3 text-sm font-bold text-slate-600 hover:text-primary border-b border-slate-100 last:border-0"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className="py-3 text-base font-bold text-slate-700 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="h-px bg-slate-200 my-4" />
              
              <Link to="/kotha" className="flex items-center gap-3 py-3 text-base font-bold text-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                AI Chatbot (KOTHA)
              </Link>

              {user ? (
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white text-base font-black uppercase shrink-0">
                      {user.name ? user.name[0] : "U"}
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider leading-none mb-1">Welcome</p>
                      <p className="text-sm font-black text-slate-800 dark:text-slate-200 leading-none">{user.name}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 bg-primary/5 text-primary font-bold rounded-2xl text-sm border border-primary/10"
                  >
                    <LayoutDashboard size={16} /> My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl text-sm border border-red-100 flex items-center justify-center gap-2"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Link to="/login" className="text-center py-3 text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="text-center py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-lg" onClick={() => setIsMobileMenuOpen(false)}>
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
