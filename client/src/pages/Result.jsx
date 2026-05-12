import { useLocation } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

const Result = () => {
  const location = useLocation();

  const data = location.state;

  const [leadData, setLeadData] = useState({
    email: "",

    companyName: "",

    role: "",

    website: "",
  });

  const handleLeadChange = (e) => {
    setLeadData({
      ...leadData,

      [e.target.name]: e.target.value,
    });
  };

  const saveLead = async () => {
    try {
      await API.post(
        "/leads",

        {
          ...leadData,

          monthlySavings: data.monthlySavings,

          annualSavings: data.annualSavings,
        },
      );

      alert("Lead Saved");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">Audit Results</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <p className="text-slate-400 mb-2">Monthly Savings</p>

            <h2 className="text-5xl font-bold text-green-400">
              ${data.monthlySavings}
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <p className="text-slate-400 mb-2">Annual Savings</p>

            <h2 className="text-5xl font-bold text-green-400">
              ${data.annualSavings}
            </h2>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-10">
          <h2 className="text-2xl font-bold mb-5">AI Summary</h2>

          <p className="text-slate-300 leading-8">{data.summary}</p>
        </div>

        <div className="space-y-6">
          {data.recommendations.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4">{item.tool}</h2>

              <p className="mb-2">Current Plan: {item.currentPlan}</p>

              <p className="mb-2">Recommendation: {item.recommendedPlan}</p>

              <p className="text-green-400 mb-3">
                Save ${item.savings}
                /month
              </p>

              <p className="text-slate-400">{item.reason}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-10">
          <div className="mt-10 bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-4">What Is Credex?</h3>

            <p className="text-slate-300 leading-8">
              Credex helps startups reduce AI infrastructure costs by connecting
              teams with discounted AI credits and unused enterprise allocations
              from companies that overcommitted or changed vendors.
            </p>

            <p className="text-slate-400 leading-8 mt-4">
              If your company has meaningful AI spend, the Credex team may be
              able to help you lower costs across platforms like ChatGPT,
              Claude, Cursor, Gemini, and other AI tools.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Get Your Full Optimization Report
            </h2>

            <p className="text-slate-400 leading-7 mb-8">
              Share your details to receive your full AI spend breakdown and let
              the Credex team reach out if additional savings opportunities are
              available for your stack.
            </p>
          </div>
          <h2 className="text-3xl font-bold mb-6">Get Full Report</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="email"
              placeholder="Email"
              onChange={handleLeadChange}
              name="email"
              className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4"
            />

            <input
              type="text"
              placeholder="Company"
              name="companyName"
              onChange={handleLeadChange}
              className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4"
            />

            <input
              type="text"
              placeholder="Role"
              name="role"
              onChange={handleLeadChange}
              className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4"
            />
            <input
              type="text"
              name="website"
              className="hidden"
              onChange={handleLeadChange}
            />
            <button
              className="bg-blue-600 rounded-2xl py-3 cursor-pointer"
              onClick={saveLead}
            >
              Get Report
            </button>
          </div>
        </div>
        <div className="mt-10">
          <p className="mb-3 text-slate-400">Shareable Report URL</p>

          <input
            readOnly
            value={`http://localhost:5173/audit/${data.publicId}`}
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Result;
