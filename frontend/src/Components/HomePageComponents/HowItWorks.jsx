import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, ClipboardEdit, Shield, Stethoscope } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Share how you feel",
      desc: "Start a simple conversation with KOTHA or browse our resources.",
      icon: <MessageCircle size={36} className="text-white" />,
      color: "from-blue-400 to-primary",
      shadow: "shadow-blue-500/30",
    },
    {
      number: "02",
      title: "Take a quick test",
      desc: "Complete a clinically validated self-check designed for seniors.",
      icon: <ClipboardEdit size={36} className="text-white" />,
      color: "from-emerald-400 to-secondary",
      shadow: "shadow-emerald-500/30",
    },
    {
      number: "03",
      title: "Get support",
      desc: "Receive instant AI guidance and personalized self-care tips.",
      icon: <Shield size={36} className="text-white" />,
      color: "from-orange-400 to-accent",
      shadow: "shadow-orange-500/30",
    },
    {
      number: "04",
      title: "Talk to a professional",
      desc: "If needed, we connect you with experts who truly understand.",
      icon: <Stethoscope size={36} className="text-white" />,
      color: "from-purple-400 to-indigo-600",
      shadow: "shadow-purple-500/30",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white dark:bg-slate-800 text-primary dark:text-blue-400 font-bold text-sm tracking-widest uppercase mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
              Simple Steps
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Works</span>
            </h2>
            <p className="mt-6 text-slate-600 dark:text-slate-300 text-lg md:text-xl">
              Four simple steps to a better peace of mind. We've made it as easy as possible to get the support you need.
            </p>
          </motion.div>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-slate-200 dark:from-slate-800 via-primary/30 dark:via-primary/50 to-slate-200 dark:to-slate-800 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2, type: "spring", stiffness: 100 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Number Badge (floating above icon) */}
                <div className="absolute -top-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-1 rounded-full text-slate-800 dark:text-white font-bold text-sm shadow-md z-20">
                  Step {step.number}
                </div>

                {/* Icon Container */}
                <motion.div 
                  whileHover={{ y: -5, scale: 1.05 }}
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} ${step.shadow} flex items-center justify-center shadow-lg mb-8 relative z-10 border-4 border-white dark:border-slate-800`}
                >
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 rounded-xl bg-white/20 blur-sm"></div>
                  <span className="relative z-10">{step.icon}</span>
                </motion.div>

                {/* Content */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow w-full">
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                    {step.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow icon for mobile/tablet flow */}
                {index !== steps.length - 1 && (
                  <div className="absolute -bottom-10 lg:hidden text-slate-300 left-1/2 -translate-x-1/2">
                    <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
