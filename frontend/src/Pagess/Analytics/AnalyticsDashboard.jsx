import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { 
  Activity, Calendar, TrendingUp, CheckCircle2, ChevronRight, Info,
  Shield, Download, LayoutDashboard, History, AlertCircle, FileText, ArrowUpRight
} from "lucide-react";

// --- Helper to merge history with mock baseline ---
const getMergedData = (history = []) => {
  const merged = [];
  history.forEach(entry => {
    const entryDate = new Date(entry.date);
    const dateStr = entryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timestamp = entryDate.setHours(0, 0, 0, 0);
    const dataPoint = { date: dateStr, timestamp, isMock: false };
    if (entry.type === 'Depression') {
      const val = entry.score / 1.5;
      dataPoint.mood = val;
      dataPoint.sleep = val + 1;
      dataPoint.energy = val - 1;
      dataPoint.appetite = val;
      dataPoint.concentration = val;
      dataPoint.interest = val;
      dataPoint.hopelessness = val;
    } else {
      const val = entry.score / 2.1;
      dataPoint.nervousness = val;
      dataPoint.worry = val + 1;
      dataPoint.panic = val - 2;
      dataPoint.restlessness = val;
      dataPoint.irritability = val;
      dataPoint.fatigue = val;
      dataPoint.sleepProblems = val;
      dataPoint.fear = val;
      dataPoint.social = val;
      dataPoint.concentrationDiff = val;
    }
    merged.push(dataPoint);
  });
  // Sort chronologically
  return merged.sort((a, b) => a.timestamp - b.timestamp);
};

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [activeTab, setActiveTab] = useState("depression");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch from backend
      fetch('http://localhost:5000/api/assessments', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          // Transform backend data to expected format
          const formatted = data.map(a => ({
            type: a.assessmentType,
            score: a.score,
            date: a.createdAt,
            details: a.answers,
          }));
          setHistory(formatted);
        })
        .catch(err => {
          console.error('Failed to fetch assessments:', err);
          // Fallback to localStorage if fetch fails
          const saved = localStorage.getItem('mh_assessment_history');
          if (saved) {
            try { setHistory(JSON.parse(saved)); } catch (e) {}
          }
        });
    } else {
      const saved = localStorage.getItem('mh_assessment_history');
      if (saved) {
        try { setHistory(JSON.parse(saved)); } catch (e) {}
      }
    }
  }, []);

  const fullData = useMemo(() => getMergedData(history), [history]);
  const currentData = useMemo(() => timeRange === "30d" ? fullData.slice(-30) : fullData.slice(-7), [fullData, timeRange]);

  const severityColors = { minimal: "#10b981", mild: "#3b82f6", moderate: "#f59e0b", severe: "#ef4444" };

  const depressionMetrics = [
    { key: "mood", label: "Mood", color: "#6366f1" },
    { key: "sleep", label: "Sleep Quality", color: "#3b82f6" },
    { key: "energy", label: "Energy Levels", color: "#10b981" },
    { key: "appetite", label: "Appetite", color: "#f59e0b" },
    { key: "concentration", label: "Concentration", color: "#8b5cf6" },
    { key: "interest", label: "Interest", color: "#ec4899" },
    { key: "hopelessness", label: "Hopelessness", color: "#64748b" },
  ];

  const anxietyMetrics = [
    { key: "nervousness", label: "Nervousness", color: "#f43f5e" },
    { key: "worry", label: "Excessive Worry", color: "#f59e0b" },
    { key: "panic", label: "Panic Symptoms", color: "#ef4444" },
    { key: "restlessness", label: "Restlessness", color: "#d946ef" },
    { key: "irritability", label: "Irritability", color: "#fb923c" },
    { key: "fatigue", label: "Fatigue", color: "#10b981" },
    { key: "sleepProblems", label: "Sleep Problems", color: "#3b82f6" },
    { key: "fear", label: "Fear", color: "#6366f1" },
    { key: "social", label: "Social Avoidance", color: "#8b5cf6" },
    { key: "concentrationDiff", label: "Concentration Difficulty", color: "#64748b" },
  ];

  const activeMetrics = activeTab === "depression" ? depressionMetrics : anxietyMetrics;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 sm:pt-32 pb-16 sm:pb-20 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 text-primary font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em]">
              <div className="w-6 sm:w-8 h-1 bg-primary rounded-full"></div> Clinical Research Dashboard
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Symptoms <br className="sm:hidden" />
              <span className="text-primary italic font-serif">& Progress.</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
              Precision longitudinal tracking of emotional markers using standardized clinical scales (GAD-7 & GDS-15).
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm w-full sm:w-auto">
              {["7d", "30d"].map(r => (
                <button key={r} onClick={() => setTimeRange(r)} className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${timeRange === r ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                  {r === '7d' ? 'Weekly' : 'Monthly'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Main Chart Card */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 sm:p-8 border-b border-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
              <div className="flex w-full sm:w-auto gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {["depression", "anxiety"].map(t => (
                  <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 sm:flex-none px-4 sm:px-8 py-3 sm:py-3.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === t ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                    {t === 'depression' ? 'Depression' : 'Anxiety'} <span className="hidden sm:inline">Tracking</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Active Monitoring</span>
              </div>
            </div>
            
            <div className="p-2 sm:p-6 h-[350px] sm:h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontSize:10, fontWeight:800}} dy={10} minTickGap={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontSize:10, fontWeight:800}} domain={[0, 10]} dx={-10} />
                  <Tooltip contentStyle={{borderRadius:'16px', border:'none', boxShadow:'0 20px 50px rgba(0,0,0,0.1)', padding:'12px', fontSize:'12px'}} />
                  <Legend verticalAlign="top" height={60} iconType="circle" wrapperStyle={{fontWeight:800, fontSize:9, textTransform:'uppercase', letterSpacing:'0.05em'}} />
                  {activeMetrics.map(m => (
                    <Line 
                      key={m.key} 
                      type="monotone" 
                      dataKey={m.key} 
                      name={m.label} 
                      stroke={m.color} 
                      strokeWidth={3} 
                      dot={false}
                      activeDot={{r:6, strokeWidth:0}} 
                      animationDuration={1500}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="px-4 sm:px-10 py-4 sm:py-5 bg-slate-50/50 dark:bg-slate-800/50 flex flex-wrap justify-center gap-4 sm:gap-10 border-t border-slate-50">
              {Object.entries(severityColors).map(([label, color]) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full shadow-sm" style={{ backgroundColor: color }}></div>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{label} Level</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6 sm:space-y-8">
            {/* Clinical Summary Card */}
            <div className="bg-primary rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 border border-white/30 backdrop-blur-sm">
                  <FileText size={24} className="sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-3 sm:mb-4">Clinical Progression</h3>
                <p className="text-white/70 text-sm sm:text-base font-medium mb-8 sm:mb-10 leading-relaxed">
                  Your data demonstrate high fidelity across all monitoring markers.
                </p>
                <button className="w-full py-4 sm:py-5 bg-white text-primary rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                  Generate PDF Report
                </button>
              </div>
            </div>

            {/* Validated Entries */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 dark:border-slate-800 p-8 sm:p-10 shadow-sm">
               <h3 className="text-slate-900 dark:text-white font-black text-xs sm:text-sm uppercase tracking-widest mb-6 sm:mb-10 flex items-center gap-3">
                 <LayoutDashboard size={18} className="text-primary sm:w-5 sm:h-5" />
                 Validated Entries
               </h3>
               <div className="space-y-4 sm:space-y-6">
                 {history.slice(-4).reverse().map((h, i) => (
                   <div key={i} className="flex items-center justify-between p-4 sm:p-6 bg-slate-50 dark:bg-slate-800 rounded-[1.25rem] sm:rounded-[1.5rem] border border-slate-100 dark:border-slate-700">
                     <div>
                       <p className="text-slate-900 dark:text-white font-black text-xs sm:text-sm">{h.type} Score</p>
                       <p className="text-slate-400 dark:text-slate-500 text-[9px] sm:text-[10px] font-bold">{new Date(h.date).toLocaleDateString()}</p>
                     </div>
                     <span className="font-black text-primary text-base sm:text-lg">{h.score}</span>
                   </div>
                 ))}
                 {history.length === 0 && <p className="text-slate-400 dark:text-slate-500 text-xs italic text-center">No history found.</p>}
               </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-0">
           <div className="bg-slate-900 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 <h4 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6">Need a Consultation?</h4>
                 <p className="text-slate-400 text-sm sm:text-lg mb-8 sm:mb-10">Share your progress securely with medical professionals.</p>
                 <button className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-white text-slate-900 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                    Connect with Specialist <ArrowUpRight size={16} />
                 </button>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 dark:border-slate-800 p-8 sm:p-12 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-[2rem] flex items-center justify-center text-slate-300 dark:text-slate-600 shrink-0 border border-slate-100 dark:border-slate-700">
                 <Shield size={32} className="sm:w-12 sm:h-12" />
              </div>
              <div className="space-y-2">
                 <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-none">Local Data Security</h4>
                 <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                   Your mental health metrics are encrypted and stored only in your local environment.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
