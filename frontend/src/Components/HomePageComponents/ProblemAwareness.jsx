import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router";

// Reuse the high-quality assets
import anxietyImg from "../../assets/marek-studzinski-7QusMpfuKIc-unsplash.jpg";
import depressionImg from "../../assets/markus-spiske-wSJ2mM25F8Y-unsplash.jpg";

const ProblemAwareness = () => {
  const problems = [
    {
      title: "Anxiety",
      img: anxietyImg,
      description:
        "Constant worrying or fear that interferes with daily activities and peace of mind.",
      color: "blue",
      tag: "Support Available"
    },
    {
      title: "Depression",
      img: depressionImg,
      description:
        "Persistent sadness or loss of interest in things you once loved to do.",
      color: "emerald",
      tag: "You're Not Alone"
    },
  ];

  return (
    <section className="py-40 relative overflow-hidden bg-white">
      {/* Soft Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/4 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-28 max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-2 px-5 rounded-2xl bg-slate-50 text-slate-400 font-black text-[10px] tracking-[0.3em] uppercase mb-6 border border-slate-100">
              Personalized Care
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
              Understanding your <br />
              <span className="text-primary italic font-serif">emotional path.</span>
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto"
          >
            Navigating mental health is a journey of courage. We provide the tools and support to help you reclaim your inner peace.
          </motion.p>
        </div>

        {/* Cards Grid - Modern Horizontal Style */}
        <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-[4rem] p-6 shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-slate-50 hover:border-primary/20 transition-all duration-700 group"
            >
              {/* Image Container */}
              <div className="w-full md:w-[400px] h-[300px] rounded-[3rem] overflow-hidden shrink-0 relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.tag}</span>
                </div>
              </div>

              {/* Content Container */}
              <div className="flex-grow space-y-6 px-4 py-4">
                <div className="space-y-2">
                  <h3 className={`text-4xl font-black text-slate-900 group-hover:text-primary transition-colors`}>
                    {item.title}
                  </h3>
                  <div className={`h-1.5 w-16 ${item.color === 'blue' ? 'bg-blue-400/20' : 'bg-emerald-400/20'} rounded-full group-hover:w-32 transition-all duration-500`}></div>
                </div>
                
                <p className="text-xl text-slate-500 leading-relaxed font-medium">
                  {item.description}
                </p>

                <div className="pt-4">
                  <Link to="/selfassessment" className="inline-flex items-center gap-3 text-slate-900 font-black text-base group/btn">
                    Take assessment 
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                      <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-28 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-6 px-10 py-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
              <Sparkles size={24} className="text-primary animate-pulse" />
            </div>
            <p className="text-slate-600 font-black text-lg md:text-xl tracking-tight">
              "Your mental health is the foundation of a vibrant life."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemAwareness;
