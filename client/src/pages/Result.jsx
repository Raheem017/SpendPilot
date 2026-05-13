
import { useLocation } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

const Result = () => {
  const location = useLocation();
  const data = location.state || {}; // Fallback to empty object

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leadData, setLeadData] = useState({
    email: "",
    companyName: "",
    role: "",
    website: "", // Honeypot field
  });

  const isHighSavings = data.monthlySavings > 500;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // const saveLead = async () => {
  //   // Basic Honeypot Check
  //   if (leadData.website) return;

  //   setLoading(true);
  //   try {
  //     await API.post("/leads", {
  //       ...leadData,
  //       publicId: data.publicId,
  //       totalSavings: data.annualSavings,
  //     });
  //     setSubmitted(true);
  //   } catch (error) {
  //     console.error("Submission error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const saveLead = async () => {
    if (leadData.website) return;

    setLoading(true);
    try {
      // Match the keys expected by  leadController.js
      await API.post("/leads", {
        email: leadData.email,
        companyName: leadData.companyName,
        role: leadData.role,
        auditId: data.publicId, // Changed from publicId to auditId
        annualSavings: data.annualSavings, // Changed from totalSavings to annualSavings
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12 selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto">
        {/* HERO SECTION: The "Value" */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-black tracking-tight mb-4 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Audit Complete
          </h1>
          <p className="text-xl text-slate-400">
            Here is how your stack benchmarks against industry standards.
          </p>
        </header>

        {/* SAVINGS CARDS */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div
            className={`p-8 rounded-[2rem] border transition-all ${isHighSavings ? "bg-blue-600/10 border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.1)]" : "bg-slate-900 border-slate-800"}`}
          >
            <p className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-2">
              Monthly Savings
            </p>
            <h2 className="text-6xl font-black text-white">
              ${data.monthlySavings}
            </h2>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
            <p className="text-sm font-bold uppercase tracking-widest text-green-400 mb-2">
              Annualized
            </p>
            <h2 className="text-6xl font-black text-white">
              ${data.annualSavings}
            </h2>
          </div>
        </div>

        {/* AI SUMMARY SECTION */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 mb-12 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="flex h-3 w-3 rounded-full bg-blue-500 animate-pulse"></span>
            <h2 className="text-xl font-bold">Personalized Strategy</h2>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed italic">
            "{data.summary || "Generating optimized strategy..."}"
          </p>
        </section>

        {/* DETAILED BREAKDOWN */}
        <div className="space-y-4 mb-16">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 px-4">
            Tool-by-Tool Audit
          </h3>
          {data.recommendations?.map((item, index) => (
            <div
              key={index}
              className="group bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-2xl font-bold mb-1">{item.tool}</h4>
                  <p className="text-slate-400 text-sm">
                    Switch from{" "}
                    <span className="text-slate-200">{item.currentPlan}</span> →{" "}
                    <span className="text-blue-400 font-semibold">
                      {item.recommendedPlan}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-green-400">
                    +${item.savings}
                  </div>
                  <div className="text-xs text-slate-500 uppercase font-bold">
                    Saved Monthly
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800/50 text-slate-400 text-sm leading-relaxed">
                {item.reason}
              </div>
            </div>
          ))}
        </div>

        {/* THE LEAD GATE: THE CURE */}
        <div
          id="lead-gate"
          className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl"
        >
          {isHighSavings && (
            <div className="absolute top-0 right-0 px-6 py-2 bg-blue-600 text-xs font-black uppercase tracking-tighter rounded-bl-2xl">
              High Priority Optimization
            </div>
          )}

          {!submitted ? (
            <>
              <div className="max-w-xl mb-10">
                <h2 className="text-4xl font-bold mb-4">
                  Capture These Savings.
                </h2>
                <p className="text-slate-400 text-lg">
                  {isHighSavings
                    ? "Your overspend is significant. Enter your email to receive this full report and book a free Credex consultation to secure enterprise credits."
                    : "Enter your email to receive a PDF copy of this audit and join 1,000+ managers getting alerts when AI vendors drop their prices."}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Work Email"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 focus:ring-2 ring-blue-500 outline-none transition-all"
                  onChange={(e) =>
                    setLeadData({ ...leadData, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 focus:ring-2 ring-blue-500 outline-none transition-all"
                  onChange={(e) =>
                    setLeadData({ ...leadData, companyName: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 focus:ring-2 ring-blue-500 outline-none transition-all"
                  onChange={(e) =>
                    setLeadData({ ...leadData, role: e.target.value })
                  }
                />
                {/* Honeypot hidden field */}
                <input
                  type="text"
                  name="website"
                  className="hidden"
                  onChange={(e) =>
                    setLeadData({ ...leadData, website: e.target.value })
                  }
                />

                <button
                  onClick={saveLead}
                  disabled={loading || !isValidEmail(leadData.email)}
                    className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-blue-600/20"
                >
                  {loading ? "Processing..." : "Get Detailed Report"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-6 text-3xl">
                ✓
              </div>
              <h2 className="text-3xl font-bold mb-2">Report Dispatched</h2>
              <p className="text-slate-400">
                Check your inbox. A Credex advisor will follow up if your
                credits are eligible.
              </p>
            </div>
          )}
        </div>

        {/* SHAREABLE URL */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm mb-4 font-medium uppercase tracking-widest">
            Share This Audit
          </p>
          <div className="flex items-center gap-2 max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-2 pl-4">
            <span className="text-slate-500 text-xs truncate select-all">{`https://spendpilot.app/a/${data.publicId}`}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://spendpilot.app/a/${data.publicId}`,
                );
                alert("Link Copied!");
              }}
              className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
