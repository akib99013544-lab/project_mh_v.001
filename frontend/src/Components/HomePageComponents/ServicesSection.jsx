import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FlaskConical, Bot, BarChart3, GraduationCap, HandHeart, Hospital, Users } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "Self-Assessment ",
      icon: <FlaskConical size={32} className="text-blue-500" />,
      desc: "Easy-to-use tests to help you understand your mood and mental state.",
      color: "from-blue-500 to-primary",
      shadow: "hover:shadow-blue-500/20",
      delay: 0.1,
    },
     {
      title: "Professional Referral",
      icon: <Hospital size={32} className="text-rose-500" />,
      desc: "Direct connection to certified geriatric mental health experts.",
      color: "from-rose-400 to-red-500",
      shadow: "hover:shadow-red-500/20",
      delay: 0.6,
    },
    {
      title: "My Symptom Tracker",
      icon: <BarChart3 size={32} className="text-orange-500" />,
      desc: "Monitor your progress over time with simple daily check-ins.",
      color: "from-orange-400 to-accent",
      shadow: "hover:shadow-orange-500/20",
      delay: 0.3,
    },
    {
      title: "AI Chatbot Support",
      icon: <Bot size={32} className="text-emerald-500" />,
      desc: "Talk to KOTHA anytime, day or night, for instant emotional support.",
      color: "from-emerald-400 to-secondary",
      shadow: "hover:shadow-emerald-500/20",
      delay: 0.2,
    },
    {
  title: "Family Referral",
  icon: <Users size={32} className="text-blue-500" />,
  desc: "Connect family members and caregivers for better support and care coordination.",
  color: "from-blue-400 to-cyan-500",
  shadow: "hover:shadow-blue-500/20",
  delay: 0.4,
},

   
  ];

  return (
    <section className="py-32 bg-slate-50/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl"
          >
            <span className="inline-block py-2 px-4 rounded-xl bg-secondary/10 text-secondary font-black text-xs tracking-[0.2em] uppercase mb-6">
              Our Services
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Compassionate care <br />
              <span className="text-secondary italic font-serif">designed for you.</span>
            </h2>
            <p className="mt-8 text-slate-600 text-xl md:text-2xl font-medium leading-relaxed">
              Explore our specialized tools and resources built with dignity and respect for your mental well-being.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link to="/service" className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-xl shadow-slate-900/20">
              View All Services
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: service.delay }}
              viewport={{ once: true, margin: "-50px" }}
              className={`group relative bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)]`}
            >
              <div className="flex flex-col h-full relative z-10">
                {/* Icon */}
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${service.color} p-[3px] mb-10 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-lg leading-relaxed mb-10 flex-grow font-medium">
                  {service.desc}
                </p>

                {/* Minimalist "Explore" link */}
                <div className="mt-auto flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                  <span>Explore</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
