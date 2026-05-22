import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  User, Building2, ClipboardList, AlertCircle,
  Stethoscope, ShieldCheck, CheckCircle2,
} from "lucide-react";

const inputCls = "p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary transition-all w-full";
const selectCls = inputCls;

const SelfReferralForm = () => {
  const [formData, setFormData] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (!name) return;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((v) => v !== value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setErrorMessage("");

    const payload = {
      // Personal
      title:        formData.title        || "",
      givenNames:   formData.givenNames   || "",
      surname:      formData.surname      || "",
      gender:       formData.gender       || "",
      dateOfBirth:  formData.dateOfBirth  || "",
      homePhone:    formData.homePhone    || "",
      mobilePhone:  formData.mobilePhone  || "",
      email:        formData.email        || "",
      address:      formData.address      || "",
      // GP
      gpName:       formData.gpName       || "",
      gpClinic:     formData.gpClinic     || "",
      gpPhone:      formData.gpPhone      || "",
      gpFax:        formData.gpFax        || "",
      gpAddress:    formData.gpAddress    || "",
      // Consumer
      countryOfBirth:  formData.countryOfBirth  || "",
      languages:       formData.languages       || "",
      maritalStatus:   formData.maritalStatus   || "",
      isRefugee:       formData.isRefugee       || "",
      atsi:            formData.atsi            || "",
      medicareNumber:  formData.medicareNumber  || "",
      livingSituation: Array.isArray(formData.livingSituation)
        ? formData.livingSituation.join(", ")
        : formData.livingSituation || "",
      accommodationType: Array.isArray(formData.accommodationType)
        ? formData.accommodationType.join(", ")
        : formData.accommodationType || "",
      // Emergency
      emergencyName:         formData.emergencyName         || "",
      emergencyRelationship: formData.emergencyRelationship || "",
      emergencyPhone:        formData.emergencyPhone        || "",
      // Referral
      referralSource:  "SelfReferral",
      requestedServices: Array.isArray(formData.requestedServices)
        ? formData.requestedServices.join(", ")
        : formData.requestedServices || "",
      referralReason:  formData.referralReason  || "",
      referralNotes:   formData.referralNotes   || "",
      submittedByEmail: formData.email || "anonymous",
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/referrals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        let reason = `Server error (${response.status})`;
        try {
          const data = await response.json();
          reason = data.message || data.error || reason;
        } catch { /* not JSON */ }
        throw new Error(reason);
      }

      setSubmitStatus("success");
      setTimeout(() => navigate("/selfassessment"), 2500);
    } catch (err) {
      console.error("Referral submit error:", err);
      setErrorMessage(err.message || "Submission failed. Please try again.");
      setSubmitStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      {/* Success banner */}
      {submitStatus === "success" && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl
                        flex items-center gap-3 text-sm font-bold bg-emerald-500 text-white">
          <CheckCircle2 size={18} /> Referral submitted successfully! Redirecting…
        </div>
      )}

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_10%,rgba(30,64,175,0.05)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_90%_90%,rgba(5,150,105,0.05)_0%,transparent_60%)]" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gradient-to-br from-slate-900 to-primary text-white pt-32 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-[-60px] right-[-80px] w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-80px] left-[-60px] w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto relative z-10 space-y-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-black tracking-[0.2em] uppercase">
            GeronEssence · Mental Wellness Platform
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Community & Allied Health <br />
            <span className="text-blue-300 italic font-serif">Self-Referral Form</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 font-medium max-w-2xl mx-auto leading-relaxed">
            A compassionate, research-driven pathway connecting older adults to professional mental
            wellness and allied health services — in dignity, privacy, and safety.
          </p>
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse shrink-0" />
            <p className="text-sm font-black text-white tracking-wide">
              Official Platform &nbsp;·&nbsp;{" "}
              <span className="text-blue-200">Prof. Dr. Khoka Hamiduzzaman Medical Research Team</span>
            </p>
          </div>
        </motion.div>
      </header>

      {/* Intro strip */}
      <div className="relative z-10 bg-blue-50 border-b border-blue-100 py-6 px-6 text-center">
        <p className="text-sm md:text-base text-primary font-medium max-w-4xl mx-auto leading-relaxed">
          GeronEssence is dedicated to reducing emotional isolation and improving mental healthcare
          accessibility for seniors.{" "}
          <strong className="text-slate-900">Complete this form to connect with our allied health team.</strong>{" "}
          All information is handled with the highest level of privacy and respect.
        </p>
      </div>

      {/* Form */}
      <main className="relative z-10 max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <form onSubmit={handleSubmit} onChange={handleChange} className="space-y-8">

          {/* ── 1. Personal Details ── */}
          <Section icon={<User size={18} />} title="Personal Details">
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Field label="Title">
                <select name="title" defaultValue="" className={selectCls}>
                  <option value="">Select…</option>
                  {["Mr","Mrs","Ms","Miss","Dr","Prof"].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Given Names" span={2}>
                <input name="givenNames" type="text" placeholder="First and middle names" className={inputCls} />
              </Field>
              <Field label="Surname" span={2}>
                <input name="surname" type="text" placeholder="Family name" className={inputCls} />
              </Field>
              <Field label="Gender">
                <select name="gender" defaultValue="" className={selectCls}>
                  <option value="">Select…</option>
                  {["Male","Female","Non-binary","Prefer not to say"].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Date of Birth">
                <input name="dateOfBirth" type="date" className={inputCls} />
              </Field>
              <Field label="Home Phone">
                <input name="homePhone" type="tel" placeholder="(00) 0000 0000" className={inputCls} />
              </Field>
              <Field label="Mobile Phone">
                <input name="mobilePhone" type="tel" placeholder="0000 000 000" className={inputCls} />
              </Field>
              <Field label="Email Address" span={3}>
                <input name="email" type="email" placeholder="you@example.com" className={inputCls} />
              </Field>
              <Field label="Residential Address" span={3}>
                <input name="address" type="text" placeholder="Street, suburb, state, postcode" className={inputCls} />
              </Field>
            </div>
          </Section>

          {/* ── 2. GP Details ── */}
          <Section icon={<Building2 size={18} />} title="GP Details">
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="GP's Name">
                <input name="gpName" type="text" placeholder="Doctor's full name" className={inputCls} />
              </Field>
              <Field label="Clinic / Practice">
                <input name="gpClinic" type="text" placeholder="Clinic name" className={inputCls} />
              </Field>
              <Field label="Phone Number">
                <input name="gpPhone" type="tel" placeholder="(00) 0000 0000" className={inputCls} />
              </Field>
              <Field label="Fax Number">
                <input name="gpFax" type="tel" placeholder="(00) 0000 0000" className={inputCls} />
              </Field>
              <Field label="GP / Clinic Address" span={2}>
                <input name="gpAddress" type="text" placeholder="Street, suburb, state, postcode" className={inputCls} />
              </Field>
            </div>
          </Section>

          {/* ── 3. Consumer Details ── */}
          <Section icon={<ClipboardList size={18} />} title="Consumer Details">
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Country of Birth">
                  <input name="countryOfBirth" type="text" placeholder="Country" className={inputCls} />
                </Field>
                <Field label="Language(s) Spoken">
                  <input name="languages" type="text" placeholder="e.g. English, Bengali" className={inputCls} />
                </Field>
                <Field label="Marital Status">
                  <select name="maritalStatus" defaultValue="" className={selectCls}>
                    <option value="">Select…</option>
                    {["Single","Married","Widowed","Separated","Divorced","De facto"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Are you a refugee?">
                  <div className="flex gap-6 mt-2">
                    {["No","Yes"].map(v => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-600">
                        <input type="radio" name="isRefugee" value={v} className="w-4 h-4 accent-primary" /> {v}
                      </label>
                    ))}
                  </div>
                </Field>
              </div>

              <div className="border-t border-slate-100 pt-8">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-4">Aboriginal or Torres Strait Islander</p>
                <div className="flex flex-wrap gap-6">
                  {["Aboriginal","Torres Strait Islander","Neither"].map(v => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-600">
                      <input type="radio" name="atsi" value={v} className="w-4 h-4 accent-primary" /> {v}
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-4">Living Arrangements & Accommodation</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Living Situation</p>
                    {["Living alone","Living with family","Living with others","Has a carer"].map(v => (
                      <label key={v} className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl cursor-pointer hover:border-primary transition-all text-sm font-bold text-slate-700">
                        <input type="checkbox" name="livingSituation" value={v} className="w-4 h-4 accent-primary" /> {v}
                      </label>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Accommodation Type</p>
                    {["Independent living","Supported accommodation","Hostel / nursing home","Homeless"].map(v => (
                      <label key={v} className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl cursor-pointer hover:border-primary transition-all text-sm font-bold text-slate-700">
                        <input type="checkbox" name="accommodationType" value={v} className="w-4 h-4 accent-primary" /> {v}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label="Medicare Number">
                  <input name="medicareNumber" type="text" placeholder="0000 00000 0" className={inputCls} />
                </Field>
                <Field label="IRN">
                  <input name="irn" type="text" placeholder="IRN" className={inputCls} />
                </Field>
                <Field label="Expiry Date">
                  <input name="medicareExpiry" type="text" placeholder="MM / YYYY" className={inputCls} />
                </Field>
                <Field label="Health Care Card Number" span={2}>
                  <input name="healthCareCard" type="text" placeholder="Number" className={inputCls} />
                </Field>
                <Field label="Expiry Date">
                  <input name="healthCareExpiry" type="text" placeholder="MM / YYYY" className={inputCls} />
                </Field>
              </div>
            </div>
          </Section>

          {/* ── 4. Emergency Contact ── */}
          <Section icon={<AlertCircle size={18} />} title="Emergency Contact">
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Full Name" span={2}>
                <input name="emergencyName" type="text" placeholder="Contact person's full name" className={inputCls} />
              </Field>
              <Field label="Relationship">
                <input name="emergencyRelationship" type="text" placeholder="e.g. Spouse, Son, Daughter" className={inputCls} />
              </Field>
              <Field label="Phone Number">
                <input name="emergencyPhone" type="tel" placeholder="0000 000 000" className={inputCls} />
              </Field>
            </div>
          </Section>

          {/* ── 5. Referral Details ── */}
          <Section icon={<Stethoscope size={18} />} title="Referral Details">
            <div className="p-8 space-y-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-4">What service(s) are you requesting?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Occupational Therapy","Physiotherapy","Speech Pathology",
                    "Dietitian","Cardiopulmonary Rehabilitation","Diabetes Education",
                    "Social Work","Alcohol & Drug Counselling","Exercise Physiology",
                    "Mental Health Counselling","Chronic Disease Nursing","Strength Training",
                  ].map(s => (
                    <label key={s} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-primary transition-all text-xs font-bold text-slate-700">
                      <input type="checkbox" name="requestedServices" value={s} className="w-4 h-4 accent-primary" /> {s}
                    </label>
                  ))}
                </div>
              </div>
              <Field label="Reason for Referral">
                <textarea name="referralReason" placeholder="Briefly describe the main reason you are seeking support…" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm min-h-[120px] outline-none focus:border-primary transition-all w-full" />
              </Field>
              <Field label="Medical History">
                <textarea name="referralNotes" placeholder="Include any relevant diagnoses…" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm min-h-[120px] outline-none focus:border-primary transition-all w-full" />
              </Field>
            </div>
          </Section>

          {/* ── 6. Consent ── */}
          <Section icon={<ShieldCheck size={18} />} title="Consent">
            <div className="p-8 space-y-6">
              <div className="p-6 bg-blue-50 border border-blue-100 rounded-[2rem] space-y-4">
                <p className="text-sm font-bold text-slate-700">
                  I am <strong className="text-primary font-black">over the age of 18</strong>, I am making this referral on behalf of myself, and I consent to this referral.
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  {["No","Yes"].map(v => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer text-sm font-black text-slate-600">
                      <input type="radio" name="consent1" value={v} className="w-4 h-4 accent-primary" /> {v}
                    </label>
                  ))}
                  <input name="signature" type="text" placeholder="Signature (type full name)" className="flex-1 min-w-[200px] bg-transparent border-b-2 border-slate-200 py-1 italic font-serif text-slate-900 outline-none focus:border-primary" />
                </div>
              </div>

              {[
                "I consent to IDHS contacting my GP for further information.",
                "I consent to IDHS accessing relevant medical imaging.",
                "I consent to IDHS registering my referral with My Aged Care.",
              ].map((text, idx) => (
                <div key={idx} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-sm font-bold text-slate-700">{text}</p>
                  <div className="flex gap-6 shrink-0">
                    {["No","Yes"].map(v => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer text-sm font-black text-slate-600">
                        <input type="radio" name={`consent${idx + 2}`} value={v} className="w-4 h-4 accent-primary" /> {v}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="p-10 text-center space-y-4 bg-slate-50/50">
              <button
                type="submit"
                disabled={submitStatus === "success"}
                className="px-12 py-5 bg-gradient-to-r from-slate-900 to-primary text-white font-black rounded-full shadow-2xl hover:scale-105 transition-all text-sm uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Submit Referral
              </button>

              {submitStatus === "error" && errorMessage && (
                <div className="flex items-start justify-center gap-2 text-red-600 text-xs font-semibold max-w-md mx-auto">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <p className="text-xs font-bold text-slate-400">
                Or email completed form to{" "}
                <a href="mailto:referrals@idhs.vic.gov.au" className="text-primary hover:underline font-black">
                  referrals@idhs.vic.gov.au
                </a>
              </p>
            </div>
          </Section>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white/50 py-12 px-6 text-center text-[10px] space-y-4">
        <p><strong className="text-primary font-black uppercase tracking-widest text-xs">GeronEssence</strong> — Mental Wellness & Emotional Support Platform for Older Adults</p>
        <p className="font-bold">Official Platform of Prof. Dr. Khoka Hamiduzzaman Medical Research Team · Delivering Better Care</p>
        <p className="max-w-2xl mx-auto opacity-40">All information submitted is treated with strict confidentiality and in accordance with applicable privacy laws.</p>
      </footer>
    </div>
  );
};

/* ── Small layout helpers ── */
function Section({ icon, title, children }) {
  return (
    <section className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-r from-slate-900 to-primary p-4 px-8 text-white flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">{icon}</div>
        <h2 className="text-xs font-black uppercase tracking-widest">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({ label, span, children }) {
  return (
    <div className={`flex flex-col gap-2 ${span ? `md:col-span-${span}` : ""}`}>
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

export default SelfReferralForm;
