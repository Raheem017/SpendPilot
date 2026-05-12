import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toolOptions } from "../data/toolOptions";
import { generateAudit } from "../services/api";

const Audit = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    teamSize: "",
    useCase: "coding",

    tools: [
      {
        tool: "Cursor",
        plan: toolOptions["Cursor"][0],
        spend: "",
        seats: "",
      },
    ],
  });

  useEffect(() => {
    const saved = localStorage.getItem("auditForm");

    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("auditForm", JSON.stringify(formData));
  }, [formData]);

  const handleTopLevelChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToolChange = (index, field, value) => {
    const updatedTools = [...formData.tools];

    updatedTools[index][field] = value;

    if (field === "tool") {
      updatedTools[index].plan = toolOptions[value][0];
    }

    setFormData((prev) => ({
      ...prev,
      tools: updatedTools,
    }));
  };

  const addTool = () => {
    setFormData((prev) => ({
      ...prev,

      tools: [
        ...prev.tools,
        {
          tool: "Cursor",
          plan: toolOptions["Cursor"][0],
          spend: "",
          seats: "",
        },
      ],
    }));
  };

  const removeTool = (index) => {
    const filteredTools = formData.tools.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      tools: filteredTools,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const result = await generateAudit(formData);

      navigate("/result", {
        state: result,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold">SpendPilot🍃</h1>

          <p className="text-slate-400 mt-4 text-lg">
            Discover AI overspending in your stack.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-8">Team Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-3">Team Size</label>

              <input
                type="number"
                value={formData.teamSize}
                onChange={(e) =>
                  handleTopLevelChange("teamSize", e.target.value)
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
              />
            </div>

            <div>
              <label className="block mb-3">Use Case</label>

              <select
                value={formData.useCase}
                onChange={(e) =>
                  handleTopLevelChange("useCase", e.target.value)
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
              >
                <option value="coding">Coding</option>

                <option value="writing">Writing</option>

                <option value="data">Data</option>

                <option value="research">Research</option>

                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Your AI Stack</h2>

            <button
              onClick={addTool}
              className="bg-blue-600 px-6 py-3 rounded-2xl"
            >
              + Add Tool
            </button>
          </div>

          {formData.tools.map((tool, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-3">Tool</label>

                  <select
                    value={tool.tool}
                    onChange={(e) =>
                      handleToolChange(index, "tool", e.target.value)
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
                  >
                    {Object.keys(toolOptions).map((toolName) => (
                      <option key={toolName} value={toolName}>
                        {toolName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-3">Plan</label>

                  <select
                    value={tool.plan}
                    onChange={(e) =>
                      handleToolChange(index, "plan", e.target.value)
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
                  >
                    {toolOptions[tool.tool].map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-3">Monthly Spend</label>

                  <input
                    type="number"
                    value={tool.spend}
                    onChange={(e) =>
                      handleToolChange(index, "spend", e.target.value)
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
                  />
                </div>

                <div>
                  <label className="block mb-3">Seats</label>

                  <input
                    type="number"
                    value={tool.seats}
                    onChange={(e) =>
                      handleToolChange(index, "seats", e.target.value)
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
                  />
                </div>
              </div>

              {formData.tools.length > 1 && (
                <button
                  onClick={() => removeTool(index)}
                  className="mt-6 text-red-400"
                >
                  Remove Tool
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-green-500 py-5 rounded-3xl text-xl font-semibold"
        >
          {loading ? "Generating Audit..." : "Generate Audit Report"}
        </button>
      </div>
    </div>
  );
};

export default Audit;
