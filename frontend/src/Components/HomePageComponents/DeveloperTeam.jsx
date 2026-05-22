import { motion } from "framer-motion";
import { Mail, Users, Globe, Code, Star, Layers } from "lucide-react";
import researchTeamImg from "../../assets/research_team.png";
import leadDevImg from "../../assets/Mohammad-Hamiduzzaman-2.webp";

const developers = [
  {
    name: "Mohammad Hamiduzzaman",
    role: "Team Lead",
    specialization: "Senior Lecturer",
    isLead: true,
    bio: (
      <>
        Senior Lecturer, School of Allied Health, Faculty of Health Sciences —
        Australian Catholic University &amp; School of Health Sciences, The University of Sydney.
      </>
    ),
    image: leadDevImg,
    social: {
      linkedin: "#",
      github: "#",
      mail: "mailto:m.hamiduzzaman@example.com",
    },
  },
  {
    name: "Md Perbej Bhuiyan Akib",
    role: "Software Developer",
    specialization: "CSE Graduate",
    bio: "Graduated in Computer Science and Engineering, specialising in modern web technologies, full-stack development, and scalable software architecture.",
    image: researchTeamImg,
    social: {
      linkedin: "#",
      github: "#",
      mail: "mailto:akib@example.com",
    },
  },
];

const techStack = [
  { label: "React + Vite", color: "bg-sky-50 text-sky-600 border-sky-100" },
  { label: "Node.js", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { label: "MongoDB", color: "bg-green-50 text-green-600 border-green-100" },
  { label: "Tailwind CSS", color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
  { label: "Framer Motion", color: "bg-violet-50 text-violet-600 border-violet-100" },
];

/* ── Regular developer card ── */
const DevCard = ({ person, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    viewport={{ once: true }}
    className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100
               shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(99,102,241,0.10)]
               hover:-translate-y-2 transition-all duration-500 flex flex-col"
  >
    {/* Accent bar */}
    <div className="h-1 w-full bg-gradient-to-r from-secondary/60 via-secondary to-secondary/40" />

    {/* Image */}
    <div className="relative h-60 overflow-hidden bg-slate-100">
      <img
        src={person.image}
        alt={person.name}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0
                   scale-105 group-hover:scale-100 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent" />

      {/* Specialization pill */}
      <div className="absolute bottom-3 left-3">
        <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm
                         text-secondary text-[10px] font-black uppercase tracking-widest
                         px-3 py-1.5 rounded-full border border-white/30 shadow-sm">
          <Code size={10} />
          {person.specialization}
        </span>
      </div>

      {/* Index */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm
                      border border-white/30 flex items-center justify-center
                      text-white text-xs font-black">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-lg font-black text-slate-900 tracking-tight mb-0.5
                     group-hover:text-secondary transition-colors duration-300">
        {person.name}
      </h3>
      <p className="text-secondary text-sm font-bold mb-4">{person.role}</p>
      <p className="text-slate-500 text-sm leading-relaxed flex-1">{person.bio}</p>

      {/* Social */}
      <div className="flex items-center gap-2 mt-6 pt-5 border-t border-slate-100">
        <a
          href={person.social.linkedin}
          className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center
                     text-slate-400 hover:bg-secondary/10 hover:text-secondary transition-all"
          aria-label="LinkedIn"
        >
          <Users size={16} />
        </a>
        <a
          href={person.social.github}
          className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center
                     text-slate-400 hover:bg-secondary/10 hover:text-secondary transition-all"
          aria-label="GitHub"
        >
          <Globe size={16} />
        </a>
        <a
          href={person.social.mail}
          className="ml-auto w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center
                     text-slate-400 hover:bg-secondary/10 hover:text-secondary transition-all"
          aria-label="Email"
        >
          <Mail size={16} />
        </a>
      </div>
    </div>
  </motion.div>
);

/* ── Featured lead card ── */
const LeadCard = ({ person }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
    className="group relative col-span-full bg-white rounded-3xl overflow-hidden border border-secondary/15
               shadow-[0_8px_48px_rgba(99,102,241,0.10)] hover:shadow-[0_24px_80px_rgba(99,102,241,0.16)]
               hover:-translate-y-1 transition-all duration-500"
  >
    {/* Accent bar */}
    <div className="h-1 w-full bg-gradient-to-r from-secondary via-indigo-400 to-secondary/60" />

    <div className="flex flex-col md:flex-row">
      {/* Image */}
      <div className="relative md:w-2/5 h-72 md:h-auto overflow-hidden bg-slate-100 shrink-0">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />

        {/* Lead badge */}
        <div className="absolute top-5 left-5">
          <span className="inline-flex items-center gap-1.5 bg-secondary text-white
                           text-[10px] font-black uppercase tracking-widest
                           px-3 py-1.5 rounded-full shadow-lg">
            <Star size={10} className="fill-current" />
            Team Lead
          </span>
        </div>

        {/* Specialization */}
        <div className="absolute bottom-5 left-5">
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm
                           text-secondary text-[10px] font-black uppercase tracking-widest
                           px-3 py-1.5 rounded-full border border-white/30 shadow-sm">
            <Code size={10} />
            {person.specialization}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-10 md:p-12 flex flex-col justify-center">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-secondary/60 mb-4">
          01 — Project Lead
        </span>

        <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2
                       group-hover:text-secondary transition-colors duration-300">
          {person.name}
        </h3>
        <p className="text-secondary font-bold text-lg mb-6">{person.role}</p>

        <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-xl">{person.bio}</p>

        {/* Social */}
        <div className="flex items-center gap-3">
          <a
            href={person.social.linkedin}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary/5
                       text-secondary text-sm font-bold hover:bg-secondary hover:text-white
                       border border-secondary/15 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Users size={16} />
            LinkedIn
          </a>
          <a
            href={person.social.github}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50
                       text-slate-500 text-sm font-bold hover:bg-slate-100
                       border border-slate-100 transition-all duration-300"
            aria-label="GitHub"
          >
            <Globe size={16} />
            GitHub
          </a>
          <a
            href={person.social.mail}
            className="ml-auto w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center
                       text-slate-400 hover:bg-secondary/10 hover:text-secondary
                       border border-slate-100 transition-all duration-300"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

const DeveloperTeam = () => {
  const lead = developers.find((d) => d.isLead);
  const members = developers.filter((d) => !d.isLead);

  return (
    <section className="py-28 relative overflow-hidden bg-white">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full
                           bg-secondary/8 text-secondary font-black text-[11px] tracking-[0.2em]
                           uppercase mb-6 border border-secondary/12">
            <Code size={12} />
            Technical Excellence
          </span>

          <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Meet our{" "}
            <span className="italic font-serif text-secondary">Development team.</span>
          </h2>

          <p className="text-lg text-slate-500 leading-relaxed">
            The technical minds behind GeronEssence — building a seamless, accessible,
            and performant experience for every user.
          </p>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lead && <LeadCard person={lead} />}
          {members.map((person, i) => (
            <DevCard key={person.name} person={person} index={i + 1} />
          ))}
        </div>

        {/* ── Tech stack strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 bg-slate-50 rounded-2xl border border-slate-100
                     px-8 py-6 flex flex-wrap items-center gap-4"
        >
          <div className="flex items-center gap-2 mr-4">
            <Layers size={16} className="text-slate-400" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
              Built with
            </span>
          </div>
          {techStack.map(({ label, color }) => (
            <span
              key={label}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border ${color}`}
            >
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperTeam;
