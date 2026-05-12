const axios = require("axios");

const generateSummary = async (audit) => {
  try {
    const prompt = `
You are an AI infrastructure consultant.

Generate a short professional AI spend optimization summary.

Monthly Savings:
$${audit.monthlySavings}

Annual Savings:
$${audit.annualSavings}

Recommendations:
${JSON.stringify(audit.recommendations)}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",

            content: prompt,
          },
        ],
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
    console.log(error.response?.data || error.message);

    return `
Your organization has opportunities to optimize AI infrastructure spending through pricing adjustments, plan consolidation, and discounted infrastructure sourcing.
`;
  }
};

module.exports = generateSummary;
