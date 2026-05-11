// import { useEffect, useState } from "react";
// import { toolOptions } from "../data/toolOptions";

// const Audit = () => {
//   const [formData, setFormData] = useState({
//     teamSize: "",
//     useCase: "coding",

//     tools: [
//       {
//         tool: "Cursor",
//         plan: toolOptions["Cursor"][0],
//         spend: "",
//         seats: "",
//       },
//     ],
//   });

//   // Load localStorage data
//   useEffect(() => {
//     const savedData = localStorage.getItem("auditForm");

//     if (savedData) {
//       setFormData(JSON.parse(savedData));
//     }
//   }, []);

//   // Save localStorage data
//   useEffect(() => {
//     localStorage.setItem("auditForm", JSON.stringify(formData));
//   }, [formData]);

//   // Handle top level fields
//   const handleTopLevelChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // Handle tool card changes
//   const handleToolChange = (index, field, value) => {
//     const updatedTools = [...formData.tools];

//     updatedTools[index][field] = value;

//     // Reset plan when tool changes
//     if (field === "tool") {
//       updatedTools[index].plan = toolOptions[value][0];
//     }

//     setFormData((prev) => ({
//       ...prev,
//       tools: updatedTools,
//     }));
//   };

//   // Add new tool card
//   const addTool = () => {
//     setFormData((prev) => ({
//       ...prev,

//       tools: [
//         ...prev.tools,
//         {
//           tool: "Cursor",
//           plan: toolOptions["Cursor"][0],
//           spend: "",
//           seats: "",
//         },
//       ],
//     }));
//   };

//   // Remove tool card
//   const removeTool = (index) => {
//     const filteredTools = formData.tools.filter((_, i) => i !== index);

//     setFormData((prev) => ({
//       ...prev,
//       tools: filteredTools,
//     }));
//   };

//   // Submit
//   const handleSubmit = () => {
//     console.log(formData);
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
//       <div className="max-w-6xl mx-auto">
//         {/* Heading */}
//         <div className="mb-12">
//           <h1 className="text-5xl font-bold">AI Spend Audit🍃</h1>

//           <p className="text-slate-400 mt-4 text-lg">
//             Analyze your AI stack and uncover overspending opportunities.
//           </p>
//         </div>

//         {/* Team Info */}
//         <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-10">
//           <h2 className="text-2xl font-semibold mb-8">Team Information</h2>

//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Team Size */}
//             <div>
//               <label className="block mb-3 text-slate-300">Team Size</label>

//               <input
//                 type="number"
//                 value={formData.teamSize}
//                 onChange={(e) =>
//                   handleTopLevelChange("teamSize", e.target.value)
//                 }
//                 placeholder="10"
//                 className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
//               />
//             </div>

//             {/* Use Case */}
//             <div>
//               <label className="block mb-3 text-slate-300">
//                 Primary Use Case
//               </label>

//               <select
//                 value={formData.useCase}
//                 onChange={(e) =>
//                   handleTopLevelChange("useCase", e.target.value)
//                 }
//                 className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
//               >
//                 <option value="coding">Coding</option>

//                 <option value="writing">Writing</option>

//                 <option value="data">Data</option>

//                 <option value="research">Research</option>

//                 <option value="mixed">Mixed</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Tool Section */}
//         <div className="mb-10">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-2xl font-semibold">Your AI Stack</h2>

//             <button
//               onClick={addTool}
//               className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl transition"
//             >
//               + Add Tool
//             </button>
//           </div>

//           {/* Tool Cards */}
//           {formData.tools.map((tool, index) => (
//             <div
//               key={index}
//               className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8"
//             >
//               <div className="grid md:grid-cols-2 gap-6">
//                 {/* Tool */}
//                 <div>
//                   <label className="block mb-3 text-slate-300">Tool</label>

//                   <select
//                     value={tool.tool}
//                     onChange={(e) =>
//                       handleToolChange(index, "tool", e.target.value)
//                     }
//                     className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
//                   >
//                     {Object.keys(toolOptions).map((toolName) => (
//                       <option key={toolName} value={toolName}>
//                         {toolName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Plan */}
//                 <div>
//                   <label className="block mb-3 text-slate-300">Plan</label>

//                   <select
//                     value={tool.plan}
//                     onChange={(e) =>
//                       handleToolChange(index, "plan", e.target.value)
//                     }
//                     className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
//                   >
//                     {toolOptions[tool.tool].map((plan) => (
//                       <option key={plan} value={plan}>
//                         {plan}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Monthly Spend */}
//                 <div>
//                   <label className="block mb-3 text-slate-300">
//                     Monthly Spend ($)
//                   </label>

//                   <input
//                     type="number"
//                     value={tool.spend}
//                     onChange={(e) =>
//                       handleToolChange(index, "spend", e.target.value)
//                     }
//                     placeholder="200"
//                     className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
//                   />
//                 </div>

//                 {/* Seats */}
//                 <div>
//                   <label className="block mb-3 text-slate-300">
//                     Number of Seats
//                   </label>

//                   <input
//                     type="number"
//                     value={tool.seats}
//                     onChange={(e) =>
//                       handleToolChange(index, "seats", e.target.value)
//                     }
//                     placeholder="5"
//                     className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
//                   />
//                 </div>
//               </div>

//               {/* Remove Button */}
//               {formData.tools.length > 1 && (
//                 <button
//                   onClick={() => removeTool(index)}
//                   className="mt-6 text-red-400 hover:text-red-300 transition"
//                 >
//                   Remove Tool
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Submit */}
//         <button
//           onClick={handleSubmit}
//           className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:opacity-90 transition py-5 rounded-3xl text-xl font-semibold cursor-pointer"
//         >
//           Generate Audit Report
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Audit;


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
    const saved = localStorage.getItem(
      "auditForm"
    );

    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "auditForm",
      JSON.stringify(formData)
    );
  }, [formData]);

  const handleTopLevelChange = (
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToolChange = (
    index,
    field,
    value
  ) => {
    const updatedTools = [
      ...formData.tools,
    ];

    updatedTools[index][field] = value;

    if (field === "tool") {
      updatedTools[index].plan =
        toolOptions[value][0];
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
          plan:
            toolOptions["Cursor"][0],
          spend: "",
          seats: "",
        },
      ],
    }));
  };

  const removeTool = (index) => {
    const filteredTools =
      formData.tools.filter(
        (_, i) => i !== index
      );

    setFormData((prev) => ({
      ...prev,
      tools: filteredTools,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const result =
        await generateAudit(formData);

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
          <h1 className="text-5xl font-bold">
            AI Spend Audit
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Discover AI overspending in your stack.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-10">

          <h2 className="text-2xl font-semibold mb-8">
            Team Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-3">
                Team Size
              </label>

              <input
                type="number"
                value={formData.teamSize}
                onChange={(e) =>
                  handleTopLevelChange(
                    "teamSize",
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
              />
            </div>

            <div>
              <label className="block mb-3">
                Use Case
              </label>

              <select
                value={formData.useCase}
                onChange={(e) =>
                  handleTopLevelChange(
                    "useCase",
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
              >
                <option value="coding">
                  Coding
                </option>

                <option value="writing">
                  Writing
                </option>

                <option value="data">
                  Data
                </option>

                <option value="research">
                  Research
                </option>

                <option value="mixed">
                  Mixed
                </option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8">

            <h2 className="text-2xl font-semibold">
              Your AI Stack
            </h2>

            <button
              onClick={addTool}
              className="bg-blue-600 px-6 py-3 rounded-2xl"
            >
              + Add Tool
            </button>
          </div>

          {formData.tools.map(
            (tool, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8"
              >

                <div className="grid md:grid-cols-2 gap-6">

                  <div>
                    <label className="block mb-3">
                      Tool
                    </label>

                    <select
                      value={tool.tool}
                      onChange={(e) =>
                        handleToolChange(
                          index,
                          "tool",
                          e.target.value
                        )
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
                    >
                      {Object.keys(
                        toolOptions
                      ).map((toolName) => (
                        <option
                          key={toolName}
                          value={toolName}
                        >
                          {toolName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-3">
                      Plan
                    </label>

                    <select
                      value={tool.plan}
                      onChange={(e) =>
                        handleToolChange(
                          index,
                          "plan",
                          e.target.value
                        )
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
                    >
                      {toolOptions[
                        tool.tool
                      ].map((plan) => (
                        <option
                          key={plan}
                          value={plan}
                        >
                          {plan}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-3">
                      Monthly Spend
                    </label>

                    <input
                      type="number"
                      value={tool.spend}
                      onChange={(e) =>
                        handleToolChange(
                          index,
                          "spend",
                          e.target.value
                        )
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
                    />
                  </div>

                  <div>
                    <label className="block mb-3">
                      Seats
                    </label>

                    <input
                      type="number"
                      value={tool.seats}
                      onChange={(e) =>
                        handleToolChange(
                          index,
                          "seats",
                          e.target.value
                        )
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4"
                    />
                  </div>
                </div>

                {formData.tools.length >
                  1 && (
                  <button
                    onClick={() =>
                      removeTool(index)
                    }
                    className="mt-6 text-red-400"
                  >
                    Remove Tool
                  </button>
                )}
              </div>
            )
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-5 rounded-3xl text-xl font-semibold"
        >
          {loading
            ? "Generating Audit..."
            : "Generate Audit Report"}
        </button>
      </div>
    </div>
  );
};

export default Audit;