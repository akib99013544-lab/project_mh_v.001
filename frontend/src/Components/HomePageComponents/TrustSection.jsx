import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

const TrustSection = () => {
  const trustItems = [
    {
      id: "01",
      title: "Confidential",
      desc: "Your data is encrypted and private. We never share your personal conversations without your permission.",
      accent: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500/20",
      glowColor: "bg-blue-500/10"
    },
    {
      id: "02",
      title: "Respectful",
      desc: "Our AI and professionals are trained to provide dignified, age-appropriate, and culturally sensitive care.",
      accent: "from-primary/20 to-primary/5",
      borderColor: "border-primary/20",
      glowColor: "bg-primary/10"
    },
    {
      id: "03",
      title: "Evidence-based",
      desc: "Every tool and assessment we use is backed by clinical research and geriatric mental health standards.",
      accent: "from-emerald-500/20 to-emerald-500/5",
      borderColor: "border-emerald-500/20",
      glowColor: "bg-emerald-500/10"
    },
  ];

  return (
    <section className="py-40 bg-slate-950 relative overflow-hidden">
      {/* Deep Atmosphere */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-10 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl space-y-6"
          >
            <span className="inline-block py-2 px-5 rounded-2xl bg-white/5 text-slate-400 font-black text-[10px] tracking-[0.4em] uppercase border border-white/10">
              Integrity & Trust
            </span>
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
              A sanctuary built on <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-emerald-400">absolute security.</span>
            </h3>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-slate-400 leading-relaxed font-medium max-w-sm"
          >
            Your privacy is not just a feature—it's our foundation. We protect your dignity with every line of code.
          </motion.p>
        </div>

        {/* Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`group relative bg-white/[0.02] backdrop-blur-3xl p-12 rounded-[3rem] border ${item.borderColor} hover:bg-white/[0.04] transition-all duration-700 overflow-hidden flex flex-col`}
            >
              {/* Large Typographic ID */}
              <div className="absolute top-8 right-12 text-8xl font-black text-white/[0.03] group-hover:text-white/[0.07] transition-colors duration-700 pointer-events-none">
                {item.id}
              </div>

              <div className="relative z-10 flex-grow space-y-8">
                <div className={`w-12 h-1.5 bg-gradient-to-r ${item.accent} rounded-full group-hover:w-24 transition-all duration-700`}></div>
                
                <h4 className="text-3xl font-black text-white tracking-tight">
                  {item.title}
                </h4>
                
                <p className="text-lg text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Badge Section */}
              <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${item.glowColor} flex items-center justify-center border border-white/5`}>
                    <ShieldCheck size={20} className="text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Active</span>
                </div>
                <ArrowRight size={20} className="text-white/10 group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
              </div>

              {/* Inner Glow */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${item.glowColor} rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
