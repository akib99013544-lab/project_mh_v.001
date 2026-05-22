import { motion } from "framer-motion";
import {
  Mail,
  Users,
  MessageSquare,
  GraduationCap,
  Award,
  Microscope,
  Star,
  ExternalLink,
} from "lucide-react";
import researchTeamImg from "../../assets/research_team.png";

const researchers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Lead Clinical Researcher",
    specialization: "Geriatric Psychiatry",
    isLead: true,
    bio: "With over 20 years of experience, Dr. Johnson leads our clinical trials focusing on early detection of age-related emotional challenges. Her pioneering work in senior mental wellness has been recognised internationally by the Global Health Institute.",
    image: researchTeamImg,
    social: {
      linkedin: "#",
      twitter: "#",
      mail: "mailto:sarah.j@geronessence.com",
    },
  },
  {
    name: "Dr. Michael Chen",
    role: "Senior Neuroscientist",
    specialization: "Cognitive Health",
    bio: "Dr. Chen specialises in neuroplasticity and how digital interventions can improve cognitive resilience in older adults.",
    image: researchTeamImg,
    social: {
      linkedin: "#",
      twitter: "#",
      mail: "mailto:m.chen@geronessence.com",
    },
  },
  {
    name: "Dr. Elena Rodriguez",
    role: "Clinical Psychologist",
    specialization: "Emotional Wellness",
    bio: "Expert in developing patient-centric therapy models, Dr. Rodriguez ensures our AI tools maintain high empathy and clinical rigour.",
    image: researchTeamImg,
    social: {
      linkedin: "#",
      twitter: "#",
      mail: "mailto:elena.r@geronessence.com",
    },
  },
  {
    name: "Prof. David Miller",
    role: "Data Scientist",
    specialization: "Health Informatics",
    bio: "Professor Miller oversees the integration of large-scale clinical data into our predictive models for mental health outcomes.",
    image: researchTeamImg,
    social: {
      linkedin: "#",
      twitter: "#",
      mail: "mailto:d.miller@geronessence.com",
    },
  },
];

const stats = [
  { icon: GraduationCap, label: "Academic Partners", value: "12+" },
  { icon: Award, label: "Certified Protocols", value: "8" },
  { icon: Microscope, label: "Published Studies", value: "34+" },
];

/* ── Card for non-lead members ── */
const MemberCard = ({ person, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.12 }}
    viewport={{ once: true }}
    className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100
               shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(30,64,175,0.10)]
               hover:-translate-y-2 transition-all duration-500 flex flex-col"
  >
    {/* Top accent line */}
    <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/40" />

    {/* Image */}
    <div className="relative h-56 overflow-hidden bg-slate-100">
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
                         text-primary text-[10px] font-black uppercase tracking-widest
                         px-3 py-1.5 rounded-full border border-white/30 shadow-sm">
          <Microscope size={10} />
          {person.specialization}
        </span>
      </div>

      {/* Index number */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm
                      border border-white/30 flex items-center justify-center
                      text-white text-xs font-black">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-lg font-black text-slate-900 tracking-tight mb-0.5
                     group-hover:text-primary transition-colors duration-300">
        {person.name}
      </h3>
      <p className="text-primary text-sm font-bold mb-4">{person.role}</p>
      <p className="text-slate-500 text-sm leading-relaxed flex-1">{person.bio}</p>

      {/* Social row */}
      <div className="flex items-center gap-2 mt-6 pt-5 border-t border-slate-100">
        <a
          href={person.social.linkedin}
          className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center
                     text-slate-400 hover:bg-primary/10 hover:text-primary transition-all"
          aria-label="LinkedIn"
        >
          <Users size={16} />
        </a>
        <a
          href={person.social.twitter}
          className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center
                     text-slate-400 hover:bg-primary/10 hover:text-primary transition-all"
          aria-label="Twitter"
        >
          <MessageSquare size={16} />
        </a>
        <a
          href={person.social.mail}
          className="ml-auto w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center
                     text-slate-400 hover:bg-primary/10 hover:text-primary transition-all"
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
    className="group relative col-span-full bg-white rounded-3xl overflow-hidden border border-primary/15
               shadow-[0_8px_48px_rgba(30,64,175,0.10)] hover:shadow-[0_24px_80px_rgba(30,64,175,0.16)]
               hover:-translate-y-1 transition-all duration-500"
  >
    {/* Gradient accent bar */}
    <div className="h-1 w-full bg-gradient-to-r from-primary via-blue-400 to-primary/60" />

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
          <span className="inline-flex items-center gap-1.5 bg-primary text-white
                           text-[10px] font-black uppercase tracking-widest
                           px-3 py-1.5 rounded-full shadow-lg">
            <Star size={10} className="fill-current" />
            Team Lead
          </span>
        </div>

        {/* Specialization */}
        <div className="absolute bottom-5 left-5">
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm
                           text-primary text-[10px] font-black uppercase tracking-widest
                           px-3 py-1.5 rounded-full border border-white/30 shadow-sm">
            <Microscope size={10} />
            {person.specialization}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-10 md:p-12 flex flex-col justify-center">
        {/* Eyebrow */}
        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary/60 mb-4">
          01 — Lead Researcher
        </span>

        <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2
                       group-hover:text-primary transition-colors duration-300">
          {person.name}
        </h3>
        <p className="text-primary font-bold text-lg mb-6">{person.role}</p>

        <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-xl">{person.bio}</p>

        {/* Social row */}
        <div className="flex items-center gap-3">
          <a
            href={person.social.linkedin}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/5
                       text-primary text-sm font-bold hover:bg-primary hover:text-white
                       border border-primary/15 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Users size={16} />
            LinkedIn
          </a>
          <a
            href={person.social.twitter}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50
                       text-slate-500 text-sm font-bold hover:bg-slate-100
                       border border-slate-100 transition-all duration-300"
            aria-label="Twitter"
          >
            <MessageSquare size={16} />
            Twitter
          </a>
          <a
            href={person.social.mail}
            className="ml-auto w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center
                       text-slate-400 hover:bg-primary/10 hover:text-primary
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

const ResearchTeam = () => {
  const lead = researchers.find((r) => r.isLead);
  const members = researchers.filter((r) => !r.isLead);

  return (
    <section className="py-28 relative overflow-hidden bg-[#f8fafc]">
      {/* Subtle background blobs */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />

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
                           bg-primary/8 text-primary font-black text-[11px] tracking-[0.2em]
                           uppercase mb-6 border border-primary/12">
            <Microscope size={12} />
            Evidence-Based Innovation
          </span>

          <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Meet our{" "}
            <span className="italic font-serif text-primary">Research team.</span>
          </h2>

          <p className="text-lg text-slate-500 leading-relaxed">
            A multidisciplinary group of clinicians, neuroscientists, and data scientists
            ensuring GeronEssence delivers the highest standard of care.
          </p>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lead spans full width */}
          {lead && <LeadCard person={lead} />}

          {/* Regular members */}
          {members.map((person, i) => (
            <MemberCard key={person.name} person={person} index={i + 1} />
          ))}
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-4 bg-white rounded-2xl px-7 py-5
                         border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">{value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchTeam;
