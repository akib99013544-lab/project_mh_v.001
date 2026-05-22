import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-40 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative rounded-[5rem] p-16 md:p-32 overflow-hidden bg-slate-950 shadow-[0_50px_100px_rgba(0,0,0,0.15)] text-center"
        >
          {/* Advanced Mesh Gradient & Atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-slate-950 to-emerald-500/10 pointer-events-none" />
          
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[150px] pointer-events-none"
          />
          
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto space-y-16">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 py-2 px-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-white/60 font-black text-[10px] tracking-[0.4em] uppercase">
                  Your path to clarity begins here
                </span>
              </motion.div>

              <h3 className="text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tighter">
                You deserve <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-emerald-400 font-serif italic pr-4">peace of mind.</span>
              </h3>

              <p className="text-slate-400 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
                Take a small, gentle step today for a brighter tomorrow. Join our community and rediscover your emotional balance with GeronEssence.
              </p>
            </div>

            {/* Premium Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/selfassessment" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-16 py-7 bg-white text-slate-950 font-black text-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:bg-slate-50 transition-all flex items-center gap-4 mx-auto overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10">Start Your Journey</span>
                  <ArrowRight size={28} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Glassmorphic Feature Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
              className="pt-10 flex flex-wrap justify-center gap-6"
            >
              {[
                { text: "Private & Secure", icon: <ShieldCheck size={16} /> },
                { text: "Dignified Care", icon: <HeartHandshake size={16} /> },
                { text: "Free Support", icon: <Sparkles size={16} /> }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                  <div className="text-emerald-400/60">{feature.icon}</div>
                  {feature.text}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
