const axios = require("axios");

const generateSummary = async (audit) => {
  if (audit.monthlySavings === 0) {
    return "Your AI infrastructure is currently optimized for your team size. No immediate cost-saving adjustments are required.";
  }

  try {
    const prompt = `
      You are an AI infrastructure consultant. 
      Generate a professional 2-sentence executive summary.
      Total Annual Savings: $${audit.annualSavings}.
      Focus strictly on the specific plan downgrades or seat-minimum avoidance identified.
      Data: ${JSON.stringify(audit.recommendations)}
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    return `We have identified $${audit.annualSavings} in potential annual savings by optimizing your tool tiers and avoiding unnecessary seat minimums.`;
  }
};

module.exports = generateSummary;
