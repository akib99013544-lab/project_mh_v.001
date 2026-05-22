import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router";
import {
  User, Mail, Calendar, Home, Brain, Heart, FileText,
  TrendingUp, Clock, ChevronRight, AlertCircle, CheckCircle,
  Activity, Shield, LogOut, BarChart2, ClipboardList,
  ArrowRight, Sparkles,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ── severity colour helper ── */
const severityColor = (result = "") => {
  const r = result.toLowerCase();
  if (r.includes("minimal") || r.includes("no depression") || r.includes("normal"))
    return { text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500" };
  if (r.includes("mild"))
    return { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500" };
  if (r.includes("moderate"))
    return { text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", dot: "bg-orange-500" };
  return { text: "text-red-600", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500" };
};

const fmt = (iso) =>
  new Date(iso).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });

const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });

/* ── stat card ── */
function StatCard({ icon: Icon, label, value, sub, color = "text-primary", bg = "bg-primary/8" }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
        <Icon size={22} className={color} />
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">{label}</p>
        {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

/* ── tab button ── */
function Tab({ active, onClick, icon: Icon, label, count }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
        active
          ? "bg-white text-primary shadow-sm border border-slate-100"
          : "text-slate-500 hover:text-slate-800"
      }`}
    >
      <Icon size={15} />
      {label}
      {count !== undefined && (
        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
          active ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}

export default function UserProfile() {
  const navigate = useNavigate();
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");
  const [tab, setTab]       = useState("overview");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    fetch(`${API}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        if (!r.ok) {
          const d = await r.json().catch(() => ({}));
          throw new Error(d.message || `Error ${r.status}`);
        }
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  /* ── loading ── */
  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );

  /* ── error ── */
  if (error)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-red-100 p-10 text-center max-w-sm shadow-lg">
          <AlertCircle size={40} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-black text-slate-900 mb-2">Could not load profile</h2>
          <p className="text-sm text-slate-500 mb-6">{error}</p>
          <button onClick={() => navigate("/login")} className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm">
            Go to Login
          </button>
        </div>
      </div>
    );

  const { user, assessments, referrals, stats } = data;

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-16 px-4 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── PROFILE HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
        >
          {/* ── Banner with mesh gradient ── */}
          <div className="h-40 relative"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 35%, #3b82f6 65%, #06b6d4 100%)",
            }}
          >
            {/* Dot grid overlay */}
            <div className="absolute inset-0 opacity-[0.08]"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            {/* Glow blobs */}
            <div className="absolute top-4 left-1/3 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl" />

            {/* Sign out — top right */}
            <button
              onClick={handleLogout}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3.5 py-2 rounded-xl
                         bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20
                         text-white text-xs font-bold transition-all duration-200"
            >
              <LogOut size={13} /> Sign Out
            </button>
          </div>

          {/* ── Avatar + info ── */}
          <div className="px-7 pb-7">
            {/* Avatar row — overlaps banner */}
            <div className="flex items-end justify-between -mt-9 mb-5">
              {/* Avatar */}
              <div className="relative">
                <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-primary via-blue-500 to-cyan-400
                               border-[3px] border-white shadow-[0_8px_32px_rgba(59,130,246,0.35)]
                               flex items-center justify-center text-white text-2xl font-black select-none">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {/* Online dot */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm" />
              </div>

              {/* Age + living badge */}
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200
                                 text-slate-600 text-[10px] font-black uppercase tracking-widest
                                 px-3 py-1.5 rounded-full">
                  <Home size={10} /> {user.livingSituation}
                </span>
                <span className="inline-flex items-center gap-1 bg-primary/8 text-primary
                                 text-[10px] font-black uppercase tracking-widest
                                 px-3 py-1.5 rounded-full border border-primary/15">
                  Age {user.ageRange}
                </span>
              </div>
            </div>

            {/* Name */}
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
              {user.name}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Mail size={11} className="text-slate-300" /> {user.email}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Calendar size={11} className="text-slate-300" /> Member since {fmt(user.createdAt)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── STATS ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatCard icon={Activity}     label="Assessments"  value={stats.totalAssessments} color="text-primary"      bg="bg-primary/8" />
          <StatCard icon={Brain}        label="Anxiety Tests" value={stats.anxietyCount}    color="text-blue-600"     bg="bg-blue-50" />
          <StatCard icon={Heart}        label="Depression"   value={stats.depressionCount}  color="text-emerald-600"  bg="bg-emerald-50" />
          <StatCard icon={FileText}     label="Referrals"    value={stats.totalReferrals}   color="text-orange-600"   bg="bg-orange-50" />
        </motion.div>

        {/* ── TABS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-slate-100/70 rounded-2xl p-1.5 flex flex-wrap gap-1"
        >
          <Tab active={tab === "overview"}    onClick={() => setTab("overview")}    icon={BarChart2}     label="Overview" />
          <Tab active={tab === "assessments"} onClick={() => setTab("assessments")} icon={Brain}         label="Assessments" count={assessments.length} />
          <Tab active={tab === "referrals"}   onClick={() => setTab("referrals")}   icon={ClipboardList} label="Referrals"   count={referrals.length} />
        </motion.div>

        {/* ── TAB CONTENT ── */}
        <AnimatePresence mode="wait">

          {/* ── OVERVIEW ── */}
          {tab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

              {/* Recent assessments */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-7 py-5 border-b border-slate-50 flex items-center justify-between">
                  <h2 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                    <Brain size={16} className="text-primary" /> Recent Assessments
                  </h2>
                  <button onClick={() => setTab("assessments")} className="text-xs text-primary font-bold flex items-center gap-1 hover:underline">
                    View all <ChevronRight size={13} />
                  </button>
                </div>
                {assessments.length === 0 ? (
                  <EmptyState icon={Brain} text="No assessments taken yet." cta="Take Assessment" to="/selfassessment" />
                ) : (
                  <div className="divide-y divide-slate-50">
                    {assessments.slice(0, 4).map((a) => (
                      <AssessmentRow key={a._id} a={a} />
                    ))}
                  </div>
                )}
              </div>

              {/* Recent referrals */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-7 py-5 border-b border-slate-50 flex items-center justify-between">
                  <h2 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                    <FileText size={16} className="text-orange-500" /> Recent Referrals
                  </h2>
                  <button onClick={() => setTab("referrals")} className="text-xs text-primary font-bold flex items-center gap-1 hover:underline">
                    View all <ChevronRight size={13} />
                  </button>
                </div>
                {referrals.length === 0 ? (
                  <EmptyState icon={FileText} text="No referrals submitted yet." cta="Submit Referral" to="/referral" />
                ) : (
                  <div className="divide-y divide-slate-50">
                    {referrals.slice(0, 3).map((r) => (
                      <ReferralRow key={r._id} r={r} />
                    ))}
                  </div>
                )}
              </div>

              {/* Quick actions */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Brain,       label: "Take Assessment",  desc: "GAD-7 or GDS-15",          to: "/selfassessment", color: "text-primary",     bg: "bg-primary/8" },
                  { icon: TrendingUp,  label: "View Analytics",   desc: "Progress over time",        to: "/analytics",     color: "text-emerald-600", bg: "bg-emerald-50" },
                  { icon: FileText,    label: "Submit Referral",  desc: "Connect with a specialist", to: "/referral",      color: "text-orange-600",  bg: "bg-orange-50" },
                ].map(({ icon: Icon, label, desc, to, color, bg }) => (
                  <Link key={to} to={to}
                    className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                  >
                    <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                      <Icon size={20} className={color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-slate-900 text-sm">{label}</p>
                      <p className="text-xs text-slate-400">{desc}</p>
                    </div>
                    <ArrowRight size={15} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── ASSESSMENTS ── */}
          {tab === "assessments" && (
            <motion.div key="assessments" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-7 py-5 border-b border-slate-50 flex items-center justify-between">
                  <h2 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                    <Brain size={16} className="text-primary" /> All Assessments
                  </h2>
                  <Link to="/selfassessment" className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-black rounded-xl hover:bg-primary/90 transition-all">
                    <Sparkles size={12} /> New Assessment
                  </Link>
                </div>
                {assessments.length === 0 ? (
                  <EmptyState icon={Brain} text="No assessments taken yet." cta="Take Assessment" to="/selfassessment" />
                ) : (
                  <div className="divide-y divide-slate-50">
                    {assessments.map((a) => (
                      <AssessmentRow key={a._id} a={a} expanded />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── REFERRALS ── */}
          {tab === "referrals" && (
            <motion.div key="referrals" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-7 py-5 border-b border-slate-50 flex items-center justify-between">
                  <h2 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                    <ClipboardList size={16} className="text-orange-500" /> All Referrals
                  </h2>
                  <Link to="/referral" className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white text-xs font-black rounded-xl hover:bg-orange-600 transition-all">
                    <FileText size={12} /> New Referral
                  </Link>
                </div>
                {referrals.length === 0 ? (
                  <EmptyState icon={FileText} text="No referrals submitted yet." cta="Submit Referral" to="/referral" />
                ) : (
                  <div className="divide-y divide-slate-50">
                    {referrals.map((r) => (
                      <ReferralRow key={r._id} r={r} expanded />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ── DISCLAIMER ── */}
        <div className="flex items-start gap-3 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <Shield size={16} className="text-slate-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 leading-relaxed">
            Your data is stored securely and used only to support your mental wellness journey.
            Assessment results are screening tools only and do not constitute a clinical diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Assessment row ── */
function AssessmentRow({ a, expanded }) {
  const c = severityColor(a.result);
  const maxScore = a.assessmentType === "Anxiety" ? 21 : 15;
  const pct = Math.round((a.score / maxScore) * 100);

  return (
    <div className="px-7 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
        a.assessmentType === "Anxiety" ? "bg-blue-50" : "bg-emerald-50"
      }`}>
        {a.assessmentType === "Anxiety"
          ? <Brain size={18} className="text-blue-600" />
          : <Heart size={18} className="text-emerald-600" />}
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-black text-slate-900 text-sm">{a.assessmentType} Assessment</span>
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
            {a.result}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Score bar */}
          <div className="flex-1 max-w-[140px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${c.dot}`} style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs font-bold text-slate-500">{a.score}/{maxScore}</span>
        </div>
        {expanded && (
          <p className="text-[11px] text-slate-400 mt-1">
            {a.answers?.length} questions answered
          </p>
        )}
      </div>

      {/* Date */}
      <div className="text-right shrink-0">
        <p className="text-xs font-bold text-slate-500">{fmt(a.createdAt)}</p>
        <p className="text-[10px] text-slate-400">{fmtTime(a.createdAt)}</p>
      </div>
    </div>
  );
}

/* ── Referral row ── */
function ReferralRow({ r, expanded }) {
  const name = [r.givenNames, r.surname].filter(Boolean).join(" ") || r.email || "Anonymous";

  return (
    <div className="px-7 py-5 flex flex-col sm:flex-row sm:items-start gap-4">
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
        <FileText size={18} className="text-orange-500" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-black text-slate-900 text-sm">{name}</span>
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
            {r.referralSource || "Self-Referral"}
          </span>
        </div>
        {r.referralReason && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{r.referralReason}</p>
        )}
        {expanded && r.requestedServices && (
          <p className="text-[11px] text-slate-400">Services: {r.requestedServices}</p>
        )}
        {expanded && r.gpName && (
          <p className="text-[11px] text-slate-400">GP: {r.gpName}{r.gpClinic ? ` — ${r.gpClinic}` : ""}</p>
        )}
      </div>

      {/* Date */}
      <div className="text-right shrink-0">
        <p className="text-xs font-bold text-slate-500">{fmt(r.createdAt)}</p>
        <p className="text-[10px] text-slate-400">{fmtTime(r.createdAt)}</p>
      </div>
    </div>
  );
}

/* ── Empty state ── */
function EmptyState({ icon: Icon, text, cta, to }) {
  return (
    <div className="py-14 text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto">
        <Icon size={24} className="text-slate-300" />
      </div>
      <p className="text-sm text-slate-400 font-medium">{text}</p>
      <Link to={to} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-black rounded-xl hover:bg-primary/90 transition-all">
        {cta} <ArrowRight size={14} />
      </Link>
    </div>
  );
}
