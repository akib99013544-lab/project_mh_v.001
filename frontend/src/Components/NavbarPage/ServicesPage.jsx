import { ShieldCheck, XCircle, Lock, UserRound, Siren } from "lucide-react";

const ServicesPage = () => {
  const mainServices = [
    {
      id: 1,
      title: "Self-Assessment Tools",
      icon: "🧪",
      desc: "Check your emotional well-being using simple questionnaires. Results are explained clearly in plain language.",
      features: ["GAD-7 & GDS-15 Tests", "Automatic scoring", "Monthly tracking"],
      color: "border-blue-200 dark:border-blue-800",
    },
    {
      id: 2,
      title: "AI Chatbot (KOTHA)",
      icon: "🤖",
      desc: "A friendly AI companion that listens, asks gentle questions, and offers support based on Mental Health First Aid.",
      features: ["Friendly conversation", "Emotional validation", "24/7 availability"],
      color: "border-green-200 dark:border-green-800",
    },
    {
      id: 3,
      title: "Symptom Tracking",
      icon: "📊",
      desc: "Monitor your mood and symptoms over time to see improvement patterns and take action early.",
      features: ["History of results", "Visual progress graphs", "Reports for doctors"],
      color: "border-blue-200 dark:border-blue-800",
    },
    {
      id: 6,
      title: "Professional Referral",
      icon: "🏥",
      desc: "For moderate to severe symptoms, we connect you with doctors or mental health providers immediately.",
      features: ["GP referral help", "Emergency guidance", "Local resource links"],
      color: "border-green-200 dark:border-green-800",
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">

      {/* 1. HERO */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Simple, safe, and supportive mental health services designed specifically for older adults.
          </p>
        </div>
      </section>

      {/* 2. MAIN SERVICES GRID */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((service) => (
            <div
              key={service.id}
              className={`bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 ${service.color} shadow-sm hover:shadow-xl transition-all duration-500 group`}
            >
              <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-slate-400 text-lg mb-6 leading-relaxed italic">
                {service.desc}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-slate-300 font-medium">
                    <span className="text-[#6FCF97]">✔</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW OUR SERVICES WORK */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 italic text-gray-800 dark:text-slate-100">
            How Our Services Work
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["User shares feelings", "Takes self-test", "Gets AI support", "Tracks progress", "Referred if needed"].map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#4A90E2] text-white flex items-center justify-center font-bold text-xl">
                    {i + 1}
                  </div>
                  <span className="mt-2 font-bold text-gray-700 dark:text-slate-300 text-center max-w-[120px]">
                    {step}
                  </span>
                </div>
                {i !== 4 && <div className="hidden lg:block w-12 h-1 bg-gray-200 dark:bg-slate-700 mb-8" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SAFETY & ETHICS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px flex-1 max-w-[80px] bg-slate-200 dark:bg-slate-700" />
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
              Ethics &amp; Safety Protocol
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-slate-200 dark:bg-slate-700" />
          </div>

          <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-[0_8px_48px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-red-400 via-rose-500 to-slate-300" />

            <div className="p-8 md:p-12">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 flex items-center justify-center shrink-0">
                  <ShieldCheck size={22} className="text-red-500" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Your Safety Matters
                  </h2>
                  <p className="text-sm text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                    Please read the following clinical and ethical disclosures carefully.
                  </p>
                </div>
                <div className="sm:ml-auto shrink-0">
                  <span className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                    <ShieldCheck size={10} /> Ethical Disclosure
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-10" />

              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { Icon: XCircle, color: "text-red-400", hover: "hover:border-red-200 hover:bg-red-50/40 dark:hover:border-red-800 dark:hover:bg-red-950/20", iconHover: "group-hover:border-red-200 dark:group-hover:border-red-800", label: "Disclaimer", text: "This is not a formal medical diagnosis." },
                  { Icon: Lock, color: "text-blue-500", hover: "hover:border-blue-200 hover:bg-blue-50/40 dark:hover:border-blue-800 dark:hover:bg-blue-950/20", iconHover: "group-hover:border-blue-200 dark:group-hover:border-blue-800", label: "Data Privacy", text: "Your data is fully encrypted and private." },
                  { Icon: UserRound, color: "text-emerald-500", hover: "hover:border-emerald-200 hover:bg-emerald-50/40 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20", iconHover: "group-hover:border-emerald-200 dark:group-hover:border-emerald-800", label: "Clinical Guidance", text: "We always encourage professional doctor care." },
                  { Icon: Siren, color: "text-orange-500", hover: "hover:border-orange-200 hover:bg-orange-50/40 dark:hover:border-orange-800 dark:hover:bg-orange-950/20", iconHover: "group-hover:border-orange-200 dark:group-hover:border-orange-800", label: "Crisis Protocol", text: "Emergency help is advised for crisis situations." },
                ].map(({ Icon, color, hover, iconHover, label, text }) => (
                  <div key={label} className={`group flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 ${hover} transition-all duration-300`}>
                    <div className={`w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 ${iconHover} transition-colors`}>
                      <Icon size={17} className={color} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">{label}</p>
                      <p className="text-slate-700 dark:text-slate-300 font-semibold text-sm leading-relaxed">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1 sm:mt-0" />
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  GeronEssence is a research-backed digital support tool. It is not a substitute for
                  licensed medical or psychological care. If you are in immediate distress, please
                  contact emergency services or a qualified health professional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-20 text-center space-y-10">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
          Start your mental wellness <br /> journey today.
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6 px-6">
          <button className="bg-[#6FCF97] hover:bg-[#5bb884] text-gray-900 font-bold text-xl px-12 py-5 rounded-2xl shadow-lg transition-transform hover:scale-105">
            🟢 Start Self-Assessment
          </button>
          <button className="bg-[#4A90E2] hover:bg-[#357abd] text-white font-bold text-xl px-12 py-5 rounded-2xl shadow-lg transition-transform hover:scale-105">
            🔵 Talk to KOTHA
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
