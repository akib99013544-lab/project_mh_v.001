import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import {
  ArrowRight, Download, TrendingUp, Brain, Heart,
  CheckCircle, ChevronLeft, Sparkles, Shield, Clock,
} from "lucide-react";
import html2pdf from "html2pdf.js";
import anxietyImg from "../../assets/marek-studzinski-7QusMpfuKIc-unsplash.jpg";
import depressionImg from "../../assets/markus-spiske-wSJ2mM25F8Y-unsplash.jpg";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const gad7Questions = [
  "Feeling nervous, anxious, or on edge?",
  "Not being able to stop or control worrying?",
  "Worrying too much about different things?",
  "Trouble relaxing?",
  "Being so restless that it's hard to sit still?",
  "Becoming easily annoyed or irritable?",
  "Feeling afraid as if something awful might happen?",
];

const gds15Questions = [
  "Are you basically satisfied with your life?",
  "Have you dropped many of your activities and interests?",
  "Do you feel that your life is empty?",
  "Do you often get bored?",
  "Are you in good spirits most of the time?",
  "Are you afraid that something bad is going to happen to you?",
  "Do you feel happy most of the time?",
  "Do you often feel helpless?",
  "Do you prefer to stay at home rather than going out and doing new things?",
  "Do you feel you have more problems with memory than most?",
  "Do you think it is wonderful to be alive now?",
  "Do you feel pretty worthless the way you are now?",
  "Do you feel full of energy?",
  "Do you feel that your situation is hopeless?",
  "Do you think that most people are better off than you are?",
];

const gdsReverseItems = [1, 5, 7, 11, 13];

const testConfig = {
  Anxiety: {
    title: "Anxiety Assessment",
    subtitle: "GAD-7 Scale",
    desc: "A clinically validated 7-question tool to measure generalised anxiety disorder symptoms over the past two weeks.",
    img: anxietyImg,
    accent: "blue",
    accentClass: "text-blue-600",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-200",
    gradientFrom: "from-blue-500",
    gradientTo: "to-primary",
    icon: Brain,
    duration: "~3 min",
    questions: gad7Questions,
    options: [
      { label: "Not at all", score: 0 },
      { label: "Several days", score: 1 },
      { label: "More than half the days", score: 2 },
      { label: "Nearly every day", score: 3 },
    ],
  },
  Depression: {
    title: "Depression Assessment",
    subtitle: "GDS-15 Scale",
    desc: "A standardised 15-question geriatric depression scale designed to identify depressive symptoms in older adults.",
    img: depressionImg,
    accent: "emerald",
    accentClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
    borderClass: "border-emerald-200",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-secondary",
    icon: Heart,
    duration: "~5 min",
    questions: gds15Questions,
    options: [
      { label: "Yes", score: 1 },
      { label: "No", score: 0 },
    ],
  },
};

function getResult(testType, score) {
  if (testType === "Anxiety") {
    if (score <= 4) return { level: "Minimal Anxiety", severity: 0, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", bar: "bg-emerald-500", advice: "You're doing well. Keep nurturing your peace with regular self-care." };
    if (score <= 9) return { level: "Mild Anxiety", severity: 1, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", bar: "bg-blue-500", advice: "Some mild signs present. Taking time for yourself and mindfulness can really help." };
    if (score <= 14) return { level: "Moderate Anxiety", severity: 2, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", bar: "bg-orange-500", advice: "Moderate level detected. Consider reaching out for professional support." };
    return { level: "Severe Anxiety", severity: 3, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", bar: "bg-red-500", advice: "This is significant. Please talk to a healthcare professional or loved one soon." };
  }
  if (score <= 4) return { level: "No Depression Likely", severity: 0, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", bar: "bg-emerald-500", advice: "Your score is in the normal range. Keep up the good habits and social connections!" };
  if (score <= 8) return { level: "Mild Depression Possible", severity: 1, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", bar: "bg-blue-500", advice: "Some mild symptoms present. Staying connected with others and routine activities may help." };
  if (score <= 11) return { level: "Moderate Depression", severity: 2, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", bar: "bg-orange-500", advice: "Moderate symptoms detected. Additional professional support is recommended." };
  return { level: "Severe Depression", severity: 3, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", bar: "bg-red-500", advice: "High score detected. Please reach out to a doctor or mental health professional soon." };
}

const severityLabels = ["Minimal", "Mild", "Moderate", "Severe"];

/* ─────────────────────────────────────────────
   ENTRY CARD
───────────────────────────────────────────── */
function TestCard({ type, config, onStart }) {
  const Icon = config.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5 }}
      onClick={() => onStart(type)}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800
                 shadow-[0_4px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]
                 cursor-pointer transition-all duration-500 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={config.img}
          alt={config.title}
          className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md
                           border border-white/20 text-white text-[10px] font-black
                           uppercase tracking-widest px-3 py-1.5 rounded-full">
            <Shield size={9} /> Clinical
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/15 backdrop-blur-md
                        border border-white/20 text-white text-[10px] font-black
                        uppercase tracking-widest px-3 py-1.5 rounded-full">
          <Clock size={9} /> {config.duration}
        </div>

        {/* Bottom title overlay */}
        <div className="absolute bottom-4 left-5 right-5">
          <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">
            {config.subtitle}
          </p>
          <h3 className="text-white text-2xl font-black tracking-tight">{config.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-1 mb-6">{config.desc}</p>

        {/* Question count pill */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-9 h-9 rounded-xl ${config.bgClass} flex items-center justify-center`}>
            <Icon size={16} className={config.accentClass} />
          </div>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            {config.questions.length} Questions
          </span>
        </div>

        {/* CTA */}
        <button
          className={`w-full py-3.5 rounded-2xl font-black text-sm text-white
                      bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo}
                      flex items-center justify-center gap-2
                      shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300`}
        >
          Begin Assessment
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   QUESTION SCREEN
───────────────────────────────────────────── */
const answerStyles = [
  "hover:border-slate-400 hover:bg-slate-50",
  "hover:border-blue-400 hover:bg-blue-50",
  "hover:border-orange-400 hover:bg-orange-50",
  "hover:border-red-400 hover:bg-red-50",
];

function QuestionScreen({ testType, currentQuestion, totalQuestions, question, options, onAnswer, onBack }) {
  const config = testConfig[testType];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      className="max-w-2xl mx-auto w-full"
    >
      {/* Header bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200
                       text-sm font-bold transition-colors"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
            {currentQuestion + 1} / {totalQuestions}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo}`}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800
                      shadow-[0_8px_48px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Accent top strip */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo}`} />

        <div className="p-8 md:p-12">
          {/* Question number chip */}
          <div className={`inline-flex items-center gap-2 ${config.bgClass} ${config.accentClass}
                           text-[11px] font-black uppercase tracking-widest
                           px-3 py-1.5 rounded-full mb-6`}>
            <Sparkles size={11} />
            Question {currentQuestion + 1}
          </div>

          {/* Question text */}
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-snug mb-10">
            {question}
          </h2>

          {/* Answer options */}
          <div className="space-y-3">
            {options.map((opt, idx) => (
              <motion.button
                key={idx}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAnswer(opt.score)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl
                             border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-base
                             transition-all duration-200 group ${answerStyles[idx] || answerStyles[0]}`}
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600
                                   flex items-center justify-center text-xs font-black text-slate-400 dark:text-slate-400
                                   group-hover:border-current transition-colors shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt.label}
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-current
                                                  group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Reassurance note */}
      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6 font-medium">
        Your responses are private and stored only on this device.
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   RESULT SCREEN
───────────────────────────────────────────── */
function ResultScreen({ testType, totalScore, answers, result, onRetake, onNavigate, isGenerating, reportRef }) {
  const config = testConfig[testType];
  const maxScore = testType === "Anxiety" ? 21 : 15;
  const pct = Math.round((totalScore / maxScore) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto w-full"
    >
      {/* Main result card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800
                      shadow-[0_8px_48px_rgba(0,0,0,0.08)] overflow-hidden">
        {/* Gradient header */}
        <div className={`bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} p-10 text-center relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10"
               style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 80%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30
                       flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle size={36} className="text-white" />
          </motion.div>

          <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-2">
            Assessment Complete
          </p>
          <h2 className="text-3xl font-black text-white mb-1">{config.title}</h2>
          <p className="text-white/60 text-sm">{config.subtitle}</p>
        </div>

        <div className="p-8">
          {/* Score display */}
          <div className={`${result.bg} ${result.border} border rounded-2xl p-6 mb-6 text-center dark:bg-slate-800 dark:border-slate-700`}>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Your Result</p>
            <p className={`text-3xl font-black ${result.color} mb-3`}>{result.level}</p>

            {/* Score bar */}
            <div className="flex items-center gap-3 max-w-xs mx-auto">
              <span className="text-xs font-bold text-slate-400 w-6 text-right">0</span>
              <div className="flex-1 h-3 bg-white dark:bg-slate-700 rounded-full overflow-hidden border border-slate-100 dark:border-slate-600">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${result.bar}`}
                />
              </div>
              <span className="text-xs font-bold text-slate-400 w-6">{maxScore}</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-medium">
              Score: <span className="font-black text-slate-700 dark:text-slate-200">{totalScore}</span> / {maxScore}
            </p>
          </div>

          {/* Severity steps */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {severityLabels.map((label, i) => (
              <div
                key={label}
                className={`rounded-xl py-2 text-center text-[10px] font-black uppercase tracking-wide
                             transition-all ${i === result.severity
                               ? `${result.bg} ${result.color} border ${result.border}`
                               : "bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 border border-slate-100 dark:border-slate-700"}`}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Advice */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 mb-6 border border-slate-100 dark:border-slate-700">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
              Recommendation
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">{result.advice}</p>
          </div>

          {/* Professional support CTA */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border border-primary/10 dark:border-primary/20
                          rounded-2xl p-6 mb-6 text-center">
            <p className="text-sm font-black text-slate-800 dark:text-slate-100 mb-1">
              Would you like professional support?
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Our specialised team can provide personalised guidance tailored to your results.
            </p>
            <button
              onClick={() => onNavigate("/referral")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white
                         font-black text-sm rounded-xl shadow-lg hover:bg-slate-900
                         transition-all duration-300"
            >
              Get Professional Support <ArrowRight size={15} />
            </button>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate("/analytics")}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl
                         bg-slate-900 text-white font-black text-sm
                         hover:bg-slate-700 transition-all"
            >
              <TrendingUp size={16} /> Analytics
            </button>
            <button
              onClick={onNavigate.bind(null, "pdf")}
              disabled={isGenerating}
              className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl
                          font-black text-sm border-2 transition-all
                          ${config.bgClass} ${config.accentClass} ${config.borderClass}
                          hover:opacity-80 disabled:opacity-50`}
            >
              <Download size={16} />
              {isGenerating ? "Generating…" : "Download PDF"}
            </button>
            <button
              onClick={onRetake}
              className="col-span-2 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700
                         text-slate-600 dark:text-slate-400 font-black text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Take Another Assessment
            </button>
          </div>
        </div>
      </div>

      {/* ── Hidden PDF Report (full doctor-style) ── */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <div ref={reportRef} style={{
          width: "794px",
          minHeight: "1123px",
          backgroundColor: "#ffffff",
          fontFamily: "'Segoe UI', Arial, sans-serif",
          color: "#1e293b",
          fontSize: "13px",
          lineHeight: "1.6",
          position: "relative",
        }}>

          {/* ── HEADER BAND ── */}
          <div style={{
            background: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 60%, #0369a1 100%)",
            padding: "36px 48px 28px",
            color: "#fff",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.7, marginBottom: "6px" }}>
                  GeronEssence · Mental Health Platform
                </div>
                <div style={{ fontSize: "26px", fontWeight: "900", letterSpacing: "-0.5px", marginBottom: "4px" }}>
                  Clinical Wellness Report
                </div>
                <div style={{ fontSize: "13px", opacity: 0.75 }}>
                  {testType === "Anxiety" ? "Generalised Anxiety Disorder — GAD-7 Scale" : "Geriatric Depression Scale — GDS-15"}
                </div>
              </div>
              <div style={{ textAlign: "right", fontSize: "11px", opacity: 0.8, lineHeight: "1.8" }}>
                <div style={{ fontWeight: "700" }}>Report ID</div>
                <div style={{ fontFamily: "monospace", fontSize: "12px" }}>
                  GE-{Date.now().toString(36).toUpperCase().slice(-8)}
                </div>
                <div style={{ marginTop: "6px", fontWeight: "700" }}>Generated</div>
                <div>{new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "long", year: "numeric" })}</div>
                <div>{new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            </div>
          </div>

          {/* ── THIN ACCENT LINE ── */}
          <div style={{ height: "4px", background: "linear-gradient(90deg, #3b82f6, #10b981, #f59e0b)" }} />

          {/* ── BODY ── */}
          <div style={{ padding: "36px 48px" }}>

            {/* ── SECTION 1: Assessment Summary ── */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "28px" }}>

              {/* Score box */}
              <div style={{
                flex: "0 0 160px",
                background: result?.severity === 0 ? "#f0fdf4" : result?.severity === 1 ? "#eff6ff" : result?.severity === 2 ? "#fff7ed" : "#fef2f2",
                border: `2px solid ${result?.severity === 0 ? "#86efac" : result?.severity === 1 ? "#93c5fd" : result?.severity === 2 ? "#fdba74" : "#fca5a5"}`,
                borderRadius: "16px",
                padding: "20px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.15em", color: "#64748b", marginBottom: "8px" }}>
                  Total Score
                </div>
                <div style={{
                  fontSize: "52px", fontWeight: "900", lineHeight: 1,
                  color: result?.severity === 0 ? "#16a34a" : result?.severity === 1 ? "#2563eb" : result?.severity === 2 ? "#ea580c" : "#dc2626",
                  marginBottom: "6px",
                }}>
                  {totalScore}
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600" }}>
                  out of {testType === "Anxiety" ? "21" : "15"}
                </div>
                <div style={{
                  marginTop: "12px", padding: "6px 10px", borderRadius: "8px",
                  background: result?.severity === 0 ? "#dcfce7" : result?.severity === 1 ? "#dbeafe" : result?.severity === 2 ? "#ffedd5" : "#fee2e2",
                  fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.1em",
                  color: result?.severity === 0 ? "#15803d" : result?.severity === 1 ? "#1d4ed8" : result?.severity === 2 ? "#c2410c" : "#b91c1c",
                }}>
                  {result?.level}
                </div>
              </div>

              {/* Summary info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a", marginBottom: "12px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>
                  Assessment Summary
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                  <tbody>
                    {[
                      ["Assessment Type", testType === "Anxiety" ? "Generalised Anxiety Disorder (GAD-7)" : "Geriatric Depression Scale (GDS-15)"],
                      ["Scale Version", testType === "Anxiety" ? "GAD-7 (Spitzer et al., 2006)" : "GDS-15 (Sheikh & Yesavage, 1986)"],
                      ["Total Questions", testType === "Anxiety" ? "7" : "15"],
                      ["Score Range", testType === "Anxiety" ? "0 – 21" : "0 – 15"],
                      ["Severity Classification", result?.level || "—"],
                      ["Date of Assessment", new Date().toLocaleDateString("en-AU", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })],
                    ].map(([label, value]) => (
                      <tr key={label} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "6px 0", color: "#64748b", fontWeight: "600", width: "45%" }}>{label}</td>
                        <td style={{ padding: "6px 0", color: "#1e293b", fontWeight: "700" }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── SECTION 2: Severity Scale ── */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "13px", fontWeight: "800", color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "inline-block", width: "3px", height: "14px", background: "#1d4ed8", borderRadius: "2px" }} />
                Severity Classification Scale
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {(testType === "Anxiety"
                  ? [{ label: "Minimal", range: "0–4", color: "#16a34a", bg: "#f0fdf4", border: "#86efac" },
                     { label: "Mild", range: "5–9", color: "#2563eb", bg: "#eff6ff", border: "#93c5fd" },
                     { label: "Moderate", range: "10–14", color: "#ea580c", bg: "#fff7ed", border: "#fdba74" },
                     { label: "Severe", range: "15–21", color: "#dc2626", bg: "#fef2f2", border: "#fca5a5" }]
                  : [{ label: "Normal", range: "0–4", color: "#16a34a", bg: "#f0fdf4", border: "#86efac" },
                     { label: "Mild", range: "5–8", color: "#2563eb", bg: "#eff6ff", border: "#93c5fd" },
                     { label: "Moderate", range: "9–11", color: "#ea580c", bg: "#fff7ed", border: "#fdba74" },
                     { label: "Severe", range: "12–15", color: "#dc2626", bg: "#fef2f2", border: "#fca5a5" }]
                ).map((band, i) => (
                  <div key={band.label} style={{
                    flex: 1, padding: "10px 12px", borderRadius: "10px",
                    background: i === result?.severity ? band.bg : "#f8fafc",
                    border: `1.5px solid ${i === result?.severity ? band.border : "#e2e8f0"}`,
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.1em", color: i === result?.severity ? band.color : "#94a3b8", marginBottom: "3px" }}>
                      {band.label}
                    </div>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: i === result?.severity ? band.color : "#cbd5e1" }}>
                      {band.range}
                    </div>
                    {i === result?.severity && (
                      <div style={{ marginTop: "4px", fontSize: "9px", fontWeight: "800", color: band.color }}>▲ YOUR SCORE</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── SECTION 3: Question-by-Question Breakdown ── */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "13px", fontWeight: "800", color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "inline-block", width: "3px", height: "14px", background: "#1d4ed8", borderRadius: "2px" }} />
                Item-Level Response Breakdown
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11.5px" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9" }}>
                    <th style={{ padding: "8px 10px", textAlign: "left", fontWeight: "800", color: "#475569", borderRadius: "6px 0 0 6px", width: "40px" }}>#</th>
                    <th style={{ padding: "8px 10px", textAlign: "left", fontWeight: "800", color: "#475569" }}>Question</th>
                    <th style={{ padding: "8px 10px", textAlign: "center", fontWeight: "800", color: "#475569", width: "120px" }}>Response</th>
                    <th style={{ padding: "8px 10px", textAlign: "center", fontWeight: "800", color: "#475569", borderRadius: "0 6px 6px 0", width: "60px" }}>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {(testType === "Anxiety" ? gad7Questions : gds15Questions).map((q, i) => {
                    const rawScore = answers[i] ?? 0;
                    const isReverse = testType === "Depression" && gdsReverseItems.includes(i + 1);
                    const displayScore = isReverse ? (1 - rawScore) : rawScore;
                    const responseLabel = testType === "Anxiety"
                      ? ["Not at all", "Several days", "More than half the days", "Nearly every day"][rawScore]
                      : rawScore === 1 ? "Yes" : "No";
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                        <td style={{ padding: "7px 10px", color: "#94a3b8", fontWeight: "700", textAlign: "center" }}>{i + 1}</td>
                        <td style={{ padding: "7px 10px", color: "#334155" }}>{q}</td>
                        <td style={{ padding: "7px 10px", textAlign: "center", color: "#475569", fontWeight: "600" }}>{responseLabel}</td>
                        <td style={{ padding: "7px 10px", textAlign: "center" }}>
                          <span style={{
                            display: "inline-block", minWidth: "28px", padding: "2px 8px",
                            borderRadius: "6px", fontWeight: "800", fontSize: "11px",
                            background: displayScore === 0 ? "#f0fdf4" : displayScore === 1 ? "#eff6ff" : displayScore === 2 ? "#fff7ed" : "#fef2f2",
                            color: displayScore === 0 ? "#16a34a" : displayScore === 1 ? "#2563eb" : displayScore === 2 ? "#ea580c" : "#dc2626",
                          }}>
                            {displayScore}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {/* Total row */}
                  <tr style={{ background: "#f1f5f9", borderTop: "2px solid #e2e8f0" }}>
                    <td colSpan={3} style={{ padding: "9px 10px", fontWeight: "800", color: "#0f172a", textAlign: "right" }}>Total Score</td>
                    <td style={{ padding: "9px 10px", textAlign: "center" }}>
                      <span style={{ fontWeight: "900", fontSize: "14px", color: "#1d4ed8" }}>{totalScore}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ── SECTION 4: Clinical Interpretation ── */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "13px", fontWeight: "800", color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "inline-block", width: "3px", height: "14px", background: "#1d4ed8", borderRadius: "2px" }} />
                Clinical Interpretation &amp; Recommendation
              </div>
              <div style={{
                background: "#f8fafc", border: "1.5px solid #e2e8f0",
                borderLeft: "4px solid #1d4ed8",
                borderRadius: "10px", padding: "16px 20px",
              }}>
                <p style={{ margin: "0 0 10px", fontWeight: "700", color: "#1e293b", fontSize: "12.5px" }}>
                  {result?.advice}
                </p>
                <p style={{ margin: 0, color: "#64748b", fontSize: "11.5px", lineHeight: "1.7" }}>
                  {testType === "Anxiety"
                    ? "The GAD-7 is a validated screening tool for generalised anxiety disorder. Scores of 5, 10, and 15 represent cut-off points for mild, moderate, and severe anxiety respectively. This report is intended as a screening aid and does not constitute a clinical diagnosis."
                    : "The GDS-15 is a validated short-form screening tool for depression in older adults. A score of 5 or greater suggests depressive symptoms warranting further evaluation. This report is intended as a screening aid and does not constitute a clinical diagnosis."}
                </p>
              </div>
            </div>

            {/* ── SECTION 5: Next Steps ── */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "13px", fontWeight: "800", color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "inline-block", width: "3px", height: "14px", background: "#1d4ed8", borderRadius: "2px" }} />
                Recommended Next Steps
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {[
                  { step: "01", title: "Share with your GP", desc: "Present this report to your general practitioner at your next appointment." },
                  { step: "02", title: "Track over time", desc: "Retake the assessment in 2–4 weeks to monitor changes in your symptoms." },
                  { step: "03", title: "Seek support if needed", desc: "If symptoms are moderate or severe, consider speaking with a mental health professional." },
                  { step: "04", title: "Use GeronEssence tools", desc: "Explore the KOTHA chatbot and resource hub for ongoing daily support." },
                ].map(({ step, title, desc }) => (
                  <div key={step} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "12px 14px", display: "flex", gap: "12px" }}>
                    <div style={{ fontSize: "18px", fontWeight: "900", color: "#cbd5e1", lineHeight: 1, flexShrink: 0 }}>{step}</div>
                    <div>
                      <div style={{ fontWeight: "800", color: "#1e293b", fontSize: "12px", marginBottom: "3px" }}>{title}</div>
                      <div style={{ color: "#64748b", fontSize: "11px", lineHeight: "1.5" }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DISCLAIMER BOX ── */}
            <div style={{
              background: "#fef2f2", border: "1.5px solid #fecaca",
              borderRadius: "10px", padding: "12px 16px", marginBottom: "28px",
            }}>
              <div style={{ fontWeight: "800", color: "#b91c1c", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                ⚠ Important Disclaimer
              </div>
              <p style={{ margin: 0, color: "#7f1d1d", fontSize: "11px", lineHeight: "1.6" }}>
                This report is generated by GeronEssence, a digital mental health support platform. It is <strong>not a formal medical diagnosis</strong> and should not replace professional clinical assessment. If you are experiencing a mental health crisis or emergency, please contact emergency services (000 in Australia) or a qualified healthcare provider immediately.
              </p>
            </div>

          </div>

          {/* ── FOOTER ── */}
          <div style={{
            borderTop: "1px solid #e2e8f0",
            padding: "16px 48px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "#f8fafc",
          }}>
            <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600" }}>
              GeronEssence · Mental Health Platform · geronessence.com.au
            </div>
            <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600" }}>
              Confidential — For personal use only · {new Date().getFullYear()}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const SelfAssessment = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState("entry");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [testType, setTestType] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef(null);

  const handleDownloadPDF = async () => {
    const element = reportRef.current;
    if (!element || isGenerating) return;
    setIsGenerating(true);
    try {
      const opt = {
        margin: 0,
        filename: `GeronEssence_${testType}_Report_${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true, logging: false, width: 794 },
        jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF error:", err);
      alert("There was an issue generating your report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStart = (type) => {
    setTestType(type);
    setCurrentQuestion(0);
    setAnswers([]);
    setTotalScore(0);
    setStage("testing");
  };

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    const questions = testConfig[testType].questions;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      let sum = newAnswers.reduce((a, b) => a + b, 0);
      if (testType === "Depression") {
        gdsReverseItems.forEach((qIndex) => {
          const idx = qIndex - 1;
          if (idx < newAnswers.length) {
            sum -= newAnswers[idx];
            sum += 1 - newAnswers[idx];
          }
        });
      }
      // Save to localStorage
      try {
        const history = JSON.parse(localStorage.getItem("mh_assessment_history") || "[]");
        history.push({ type: testType, score: sum, date: new Date().toISOString(), details: newAnswers });
        localStorage.setItem("mh_assessment_history", JSON.stringify(history));
      } catch (e) { /* silent */ }

      // Persist to MongoDB if user is authenticated
      const token = localStorage.getItem("token");
      const resultObj = getResult(testType, sum);
      if (token) {
        fetch("http://localhost:5000/api/assessments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            assessmentType: testType,
            score: sum,
            result: resultObj.level,
            answers: newAnswers
          })
        })
        .then(response => {
          if (!response.ok) {
            console.error("Failed to save assessment to backend");
          }
        })
        .catch(err => {
          console.error("Error saving assessment:", err);
        });
      }

      setTotalScore(sum);
      setStage("result");
    }
  };

  const handleBack = () => {
    if (currentQuestion === 0) {
      setStage("entry");
    } else {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleNavigate = (path) => {
    if (path === "pdf") { handleDownloadPDF(); return; }
    navigate(path);
  };

  const result = stage === "result" && testType ? getResult(testType, totalScore) : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pt-24 pb-16 px-4 relative overflow-x-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/4 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatePresence mode="wait">

          {/* ── ENTRY ── */}
          {stage === "entry" && (
            <motion.div
              key="entry"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              {/* Page header */}
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full
                                 bg-primary/8 text-primary font-black text-[11px]
                                 tracking-[0.2em] uppercase mb-5 border border-primary/12">
                  <Sparkles size={11} /> Mental Wellness Check
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-5">
                  Clinical{" "}
                  <span className="italic font-serif text-primary">Self-Assessments</span>
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                  Standardised psychological tools to help you monitor and understand your emotional health.
                </p>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { icon: Shield, text: "Clinically Validated" },
                  { icon: Clock, text: "3–5 Minutes" },
                  { icon: CheckCircle, text: "Private & Secure" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800
                                              rounded-full px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400
                                              shadow-sm">
                    <Icon size={13} className="text-primary" /> {text}
                  </div>
                ))}
              </div>

              {/* Test cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(testConfig).map(([type, config]) => (
                  <TestCard key={type} type={type} config={config} onStart={handleStart} />
                ))}
              </div>
            </motion.div>
          )}

          {/* ── TESTING ── */}
          {stage === "testing" && testType && (
            <QuestionScreen
              key={`q-${currentQuestion}`}
              testType={testType}
              currentQuestion={currentQuestion}
              totalQuestions={testConfig[testType].questions.length}
              question={testConfig[testType].questions[currentQuestion]}
              options={testConfig[testType].options}
              onAnswer={handleAnswer}
              onBack={handleBack}
            />
          )}

          {/* ── RESULT ── */}
          {stage === "result" && result && (
            <ResultScreen
              key="result"
              testType={testType}
              totalScore={totalScore}
              answers={answers}
              result={result}
              onRetake={() => setStage("entry")}
              onNavigate={handleNavigate}
              isGenerating={isGenerating}
              reportRef={reportRef}
            />
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default SelfAssessment;
