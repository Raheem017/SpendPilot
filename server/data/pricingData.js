const pricingData = {
  Cursor: { Hobby: 0, Pro: 20, Business: 40, Enterprise: 80 },
  "GitHub Copilot": { Individual: 10, Business: 19, Enterprise: 39 },
  Claude: {
    Free: 0,
    Pro: 20,
    Max: 100,
    Team: 30,
    Enterprise: 150,
    "API direct": 50,
  },
  ChatGPT: { Plus: 20, Team: 30, Enterprise: 60, "API direct": 50 },
  Gemini: { Pro: 20, Ultra: 42, API: 50 },
  Windsurf: { Free: 0, Pro: 15, Teams: 30 },
  Anthropic: { "API direct": 50 },
  OpenAI: { "API direct": 50 },
};

module.exports = pricingData;
