import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();

  const data = location.state;

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          Audit Results
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
            <p className="text-slate-400 mb-2">
              Monthly Savings
            </p>

            <h2 className="text-4xl font-bold">
              ${data.monthlySavings}
            </h2>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
            <p className="text-slate-400 mb-2">
              Annual Savings
            </p>

            <h2 className="text-4xl font-bold">
              ${data.annualSavings}
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {data.recommendations.map(
            (item, index) => (
              <div
                key={index}
                className="bg-slate-900 p-8 rounded-3xl border border-slate-800"
              >
                <h2 className="text-2xl font-semibold mb-3">
                  {item.tool}
                </h2>

                <p className="text-slate-300 mb-2">
                  Current Plan: {item.currentPlan}
                </p>

                <p className="text-slate-300 mb-2">
                  Recommended: {item.recommendedPlan}
                </p>

                <p className="text-green-400 mb-4">
                  Save ${item.savings}/month
                </p>

                <p className="text-slate-400">
                  {item.reason}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;