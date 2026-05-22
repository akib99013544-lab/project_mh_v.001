import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import aboutImage from "../../assets/supportive_senior.png";
import { 
  Heart, Target, Eye, Bot, FlaskConical, GraduationCap, HandHeart, 
  Lock, Users, Book, Handshake, Check, ShieldCheck
} from "lucide-react";
import ResearchTeam from "../HomePageComponents/ResearchTeam";
import DeveloperTeam from "../HomePageComponents/DeveloperTeam";

const AboutUs = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans">

      {/* 1. HERO */}
      <section className="relative pt-28 lg:pt-40 pb-20 lg:pb-32 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] lg:w-[1000px] h-[600px] lg:h-[1000px] bg-primary/5 rounded-full blur-[100px] lg:blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] bg-secondary/5 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none translate-y-1/4 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 space-y-8 lg:space-y-10 text-center lg:text-left"
          >
            <div className="space-y-6">
              <span className="inline-block py-2 px-5 lg:px-6 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-400 font-black text-[9px] lg:text-[10px] tracking-[0.3em] lg:tracking-[0.4em] uppercase border border-slate-100 dark:border-slate-700">
                GeronEssence Protocol
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-950 dark:text-white tracking-tighter leading-[1.1] lg:leading-[1.05]">
                About <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-emerald-400 font-serif italic pr-4">GeronEssence</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                Supporting emotional well-being in later life through clinical expertise,
                AI innovation, and deep human compassion.
              </p>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-2 lg:pt-4">
              <div className="w-16 lg:w-20 h-1.5 bg-gradient-to-r from-blue-400 to-primary rounded-full" />
              <span className="text-[10px] lg:text-xs font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em] lg:tracking-[0.3em]">est. 2024</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full max-w-2xl relative"
          >
            <div className="relative z-10 rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.08)] lg:shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-[8px] lg:border-[12px] border-white dark:border-slate-800 bg-white dark:bg-slate-800">
              <img
                src={aboutImage}
                alt="Supportive care and compassion"
                className="w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover transition-transform duration-[2s] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 lg:-bottom-10 left-4 lg:-left-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl p-5 lg:p-8 rounded-[2rem] lg:rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/50 dark:border-slate-700/50 flex items-center gap-4 lg:gap-6 z-20"
            >
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-[1rem] lg:rounded-[1.5rem] bg-slate-950 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-lg">
                <ShieldCheck size={24} className="lg:hidden" strokeWidth={1.5} />
                <ShieldCheck size={32} className="hidden lg:block" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[8px] lg:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] mb-1">Our Core Drive</p>
                <p className="text-lg lg:text-2xl font-black text-slate-950 dark:text-white tracking-tight uppercase">Compassion</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. RESEARCH TEAM */}
      <ResearchTeam />

      {/* 2.1 DEVELOPER TEAM */}
      <DeveloperTeam />

      {/* 3. WHO WE ARE */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-bold text-xl uppercase tracking-widest mb-6">
              Who We Are
            </h2>
            <p className="text-3xl md:text-4xl text-slate-800 dark:text-slate-100 leading-snug font-bold mb-8">
              We are a team of clinicians, researchers, and students dedicated to
              improving the mental health of older adults.
            </p>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
              Our platform focuses on anxiety, depression, and loneliness—the most
              common challenges in later life. We combine advanced technology with human
              care to provide simple, respectful, and highly accessible support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4 & 5. MISSION & VISION */}
      <section className="py-24 bg-white dark:bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-10 md:p-14 bg-gradient-to-br from-blue-50 dark:from-blue-950/40 to-white dark:to-slate-900 rounded-[3rem] border border-blue-100 dark:border-blue-900/50 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all"
          >
            <div className="absolute top-0 right-0 p-8 text-blue-100/50 dark:text-blue-900/30 -mt-10 -mr-10 group-hover:scale-110 transition-transform">
              <Target size={180} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8 flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                  <Target size={24} />
                </span>
                Our Mission
              </h3>
              <ul className="space-y-6 text-lg text-slate-700 dark:text-slate-300 font-medium">
                {[
                  "Promote early detection of mental health problems",
                  "Reduce loneliness and emotional distress",
                  "Connect older adults with proper support",
                  "Respect personal values, culture, and faith",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-300 mt-0.5 shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-10 md:p-14 bg-gradient-to-br from-emerald-50 dark:from-emerald-950/40 to-white dark:to-slate-900 rounded-[3rem] border border-emerald-100 dark:border-emerald-900/50 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all"
          >
            <div className="absolute top-0 right-0 p-8 text-emerald-100/50 dark:text-emerald-900/30 -mt-10 -mr-10 group-hover:scale-110 transition-transform">
              <Eye size={180} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8 flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
                  <Eye size={24} />
                </span>
                Our Vision
              </h3>
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                To create a safe, friendly, and accessible digital mental health
                companion for older adults, helping them live with dignity,
                confidence, and profound emotional well-being.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. WHAT MAKES US DIFFERENT */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-4">Unique Approach</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              What Makes Us Different
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { t: "AI with Care", d: "AI chatbot trained to listen and support emotionally", Icon: Bot, color: "from-blue-400 to-blue-600", bg: "bg-blue-50 dark:bg-blue-950/40", textColor: "text-blue-600 dark:text-blue-400" },
              { t: "Evidence-Based", d: "Uses GAD-7 and GDS-15 clinically validated tools", Icon: FlaskConical, color: "from-emerald-400 to-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/40", textColor: "text-emerald-600 dark:text-emerald-400" },
              { t: "Student Support", d: "Supervised allied health students provide assistance", Icon: GraduationCap, color: "from-purple-400 to-purple-600", bg: "bg-purple-50 dark:bg-purple-950/40", textColor: "text-purple-600 dark:text-purple-400" },
              { t: "Faith-Respectful", d: "Optional faith-based emotional care", Icon: HandHeart, color: "from-orange-400 to-orange-600", bg: "bg-orange-50 dark:bg-orange-950/40", textColor: "text-orange-600 dark:text-orange-400" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`w-20 h-20 rounded-2xl ${item.bg} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ${item.textColor}`}>
                  <item.Icon size={40} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">{item.t}</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OUR VALUES */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-400 dark:text-slate-500 mb-12 uppercase tracking-widest">
            Our Core Values
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { l: "Confidentiality", Icon: Lock, color: "text-blue-500" },
              { l: "Compassion", Icon: Heart, color: "text-red-500" },
              { l: "Respect for Elders", Icon: Users, color: "text-emerald-500" },
              { l: "Science-based", Icon: Book, color: "text-indigo-500" },
              { l: "Inclusiveness", Icon: Handshake, color: "text-orange-500" },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-6 py-4 md:px-8 md:py-5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <v.Icon size={24} className={v.color} />
                <span className="font-bold text-slate-700 dark:text-slate-200 text-lg">{v.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-primary via-blue-600 to-secondary rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-20 -mb-20 blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight">You are not alone.</h2>
            <p className="text-blue-100 text-xl md:text-3xl font-medium max-w-2xl mx-auto">
              We are here to support your mental well-being every step of the way.
            </p>
            <div className="pt-4">
              <Link to="/service">
                <button className="bg-white text-primary hover:bg-slate-50 font-bold text-xl px-10 py-5 rounded-2xl transition-transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 mx-auto">
                  Explore Our Services
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
