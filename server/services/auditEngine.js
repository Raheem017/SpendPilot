const generateAudit = (data) => {
  let monthlySavings = 0;
  const recommendations = [];

  data.tools.forEach((toolData) => {
    const { tool, plan, seats, monthlySpend } = toolData;
    const spend = Number(monthlySpend) || 0;
    const totalSeats = Number(seats) || 1;

    let recommendedPlan = plan;
    let savings = 0;
    let reason = "Current plan is appropriate.";

    // 1. CURSOR LOGIC
    if (tool === "Cursor") {
      // If team is small (< 3), Business ($40) admin features usually aren't worth it over Pro ($20)
      if (plan === "Business" && totalSeats < 3) {
        recommendedPlan = "Pro";
        const optimized = pricingData.Cursor.Pro * totalSeats;
        savings = spend - optimized;
        reason =
          "Individual Pro plans offer identical AI power without unnecessary admin overhead.";
      }
    }

    // 2. CHATGPT LOGIC (2026 Standard)
    if (tool === "ChatGPT") {
      // ChatGPT Team/Business has a 2-seat minimum ($60/mo).
      // If totalSeats is 1, they are overpaying.
      if (plan === "Team" && totalSeats === 1) {
        recommendedPlan = "Plus";
        const optimized = pricingData.ChatGPT.Plus;
        savings = spend - optimized;
        reason =
          "Single users should use Plus to avoid the 2-seat minimum on Team plans.";
      }
    }

    // 3. CLAUDE LOGIC (2026 Standard)
    if (tool === "Claude") {
      // Claude Team has a 5-seat minimum ($150/mo).
      // If team size is < 5, individual Pro seats ($20) are cheaper.
      if (plan === "Team" && totalSeats < 5) {
        recommendedPlan = "Pro";
        const optimized = pricingData.Claude.Pro * totalSeats;
        savings = spend - optimized;
        reason =
          "Claude Team enforces a 5-seat minimum payment. Individual Pro seats save significantly for your headcount.";
      }
    }

    // 4. GEMINI LOGIC
    if (tool === "Gemini") {
      if (plan === "Ultra") {
        recommendedPlan = "Pro";
        const optimized = pricingData.Gemini.Pro * totalSeats;
        savings = spend - optimized;
        reason =
          "Gemini Pro provides the core high-performance models at a better value for most tasks.";
      }
    }

    // 5. MARKETPLACE SAVINGS (15% Platform Credit)
    // We apply the 15% discount to the REMAINING spend after our optimization.
    const optimizedSpend = spend - Math.max(0, savings);
    const platformDiscount = optimizedSpend * 0.15;

    const totalItemSavings = Math.max(0, savings) + platformDiscount;
    monthlySavings += totalItemSavings;

    recommendations.push({
      tool,
      currentPlan: plan,
      recommendedPlan,
      savings: Math.round(totalItemSavings),
      reason,
    });
  });

  return {
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(monthlySavings * 12),
    recommendations,
  };
};

module.exports = generateAudit;
