import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import heroImage from "../../assets/hero_image.png";
import calmHero from "../../assets/calm_hero.png";
import { HeartHandshake, Sparkles } from "lucide-react";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden bg-calm-gradient">
      {/* Dynamic Background Elements */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"
      />
      
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-20 relative z-10">
        
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 text-center lg:text-left space-y-10"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl glass-effect dark:glass-dark border border-white/50 dark:border-slate-700/50 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-[0.2em]">Caring for Your Mind in Later Life</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Peace of mind <br />
              <span className="text-primary italic font-serif">starts here.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
              A safe, respectful space designed specifically for seniors to check their mental well-being and find gentle, professional support.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
          >
            <Link to={'/selfassessment'}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black text-lg rounded-[2rem] shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 transition-all"
              >
                Start Self-Check
              </motion.button>
            </Link>
            <Link to="/kotha">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-lg rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center gap-3 transition-all"
              >
                Talk to KOTHA
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants} className="pt-6 flex items-center justify-center lg:justify-start gap-5">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden shadow-sm`}>
                   <img src={`https://i.pravatar.cc/150?img=${i + 20}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-slate-900 dark:text-white font-black text-lg">1,200+</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Trusted Seniors</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 w-full max-w-2xl relative"
        >
          {/* Decorative frame */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-[4rem] blur-2xl -z-10"></div>
          
          <div className="relative rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] dark:shadow-none border-[12px] border-white dark:border-slate-800 bg-white dark:bg-slate-800">
            <img
              src={calmHero}
              alt="Serene elderly couple"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          {/* Floating badge */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 glass-effect dark:glass-dark p-6 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-slate-700/50 flex items-center gap-4 z-20"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <Sparkles size={32} />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest mb-1">Daily Support</p>
              <p className="text-xl font-black text-slate-900 dark:text-white">Always here.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
