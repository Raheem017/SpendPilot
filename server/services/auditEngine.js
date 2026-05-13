const pricingData = require("../data/pricingData");

const generateAudit = (data) => {
  let totalMonthlySavings = 0;
  const recommendations = [];

  // 1. Ensure tools exists and is an array to prevent crashes
  const inputTools = data.tools || [];

  inputTools.forEach((toolData) => {
    // Normalization of inputs
    const rawToolName = (toolData.tool || "").trim().toLowerCase();
    const rawPlanInput = (toolData.plan || "").trim().toLowerCase();
    const seats = Math.max(1, Number(toolData.seats) || 1);
    const currentSpend = Math.max(0, Number(toolData.monthlySpend) || 0);

    // Map common user inputs to your specific pricingData keys
    const toolMap = {
      claude: "Claude",
      cursor: "Cursor",
      chatgpt: "ChatGPT",
      gemini: "Gemini",
      "github copilot": "GitHub Copilot",
      windsurf: "Windsurf",
      anthropic: "Anthropic",
      openai: "OpenAI",
    };

    const toolName = toolMap[rawToolName] || toolData.tool;
    const toolPricing = pricingData[toolName] || {};

    // Find the correct casing for the plan from  pricingData (e.g., "pro" -> "Pro")
    const planKey =
      Object.keys(toolPricing).find(
        (key) => key.toLowerCase() === rawPlanInput,
      ) || toolData.plan;

    let recommendedPlan = toolData.plan;
    let savings = 0;
    let reason = "Your current plan is optimized for your team size.";

    // --- SCENARIO 1: Solo/Small Team "Enterprise" Trap ---
    // If user is on Enterprise/Business but has very few seats
    if (
      (rawPlanInput === "enterprise" || rawPlanInput === "business") &&
      seats < 5
    ) {
      recommendedPlan = "Pro";
      const proPrice = toolPricing.Pro || 20;
      const potentialSpend = proPrice * seats;

      if (currentSpend > potentialSpend) {
        savings = currentSpend - potentialSpend;
        reason = `You are on an ${planKey} tier with only ${seats} seat(s). The Pro plan ($${proPrice}/mo) offers nearly identical performance for individual/small team needs.`;
      }
    }

    // --- SCENARIO 2: Claude Team 5-Seat Minimum Leak ---
    else if (toolName === "Claude" && rawPlanInput === "team" && seats < 5) {
      recommendedPlan = "Pro";
      const teamMinCost = (toolPricing.Team || 30) * 5; // $150 minimum
      const proCost = (toolPricing.Pro || 20) * seats;
      savings = Math.max(currentSpend, teamMinCost) - proCost;
      reason = `Claude Team has a mandatory 5-seat minimum ($150). Switching your ${seats} user(s) to the Pro plan saves significant overhead.`;
    }

    // --- SCENARIO 3: ChatGPT Team 2-Seat Minimum Leak ---
    else if (toolName === "ChatGPT" && rawPlanInput === "team" && seats === 1) {
      recommendedPlan = "Plus";
      const teamMinCost = (toolPricing.Team || 30) * 2; // $60 minimum
      const plusCost = toolPricing.Plus || 20;
      savings = Math.max(currentSpend, teamMinCost) - plusCost;
      reason = `ChatGPT Team requires at least 2 seats ($60). As a solo user, you can save $40/mo by using the Plus plan.`;
    }

    // --- SCENARIO 4: Ghost Seats & Pricing Discrepancies ---
    // Calculate what the plan SHOULD cost vs what they ARE paying
    const unitPrice = toolPricing[planKey] || 0;
    const expectedCost = unitPrice * seats;

    // If they are paying more than the list price (with a $5 buffer for tax/local fees)
    if (unitPrice > 0 && currentSpend > expectedCost + 5) {
      const ghostSavings = currentSpend - expectedCost;
      // Only prioritize this reason if it yields higher savings than plan-switching
      if (ghostSavings > savings) {
        savings = ghostSavings;
        reason = `Your monthly spend of $${currentSpend} is higher than the standard ${toolName} ${planKey} rate for ${seats} seat(s). You may be paying for unused seats.`;
      }
    }

    // --- SCENARIO 5: High-Volume Enterprise Opportunity ---
    if (seats > 50 && rawPlanInput !== "enterprise") {
      reason =
        "High-volume usage detected. You are likely eligible for negotiated Enterprise credits and volume discounts not available on retail plans.";
    }

    // Accumulate total monthly savings
    totalMonthlySavings += Math.max(0, savings);

    recommendations.push({
      tool: toolName,
      currentPlan: toolData.plan,
      recommendedPlan: savings > 0 ? recommendedPlan : toolData.plan,
      savings: Math.round(savings),
      reason,
    });
  });

  return {
    monthlySavings: Math.round(totalMonthlySavings),
    annualSavings: Math.round(totalMonthlySavings * 12),
    recommendations,
  };
};

module.exports = generateAudit;
