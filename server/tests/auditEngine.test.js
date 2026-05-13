const generateAudit = require('../services/auditEngine');

// Mock pricing data to match your actual implementation
jest.mock('../data/pricingData', () => ({
  Claude: { Pro: 20, Team: 30 },
  ChatGPT: { Plus: 20, Team: 30 },
  Cursor: { Pro: 20, Business: 40 }
}));

describe('Audit Engine Logic', () => {
  
  test('Claude Team Trap: Should recommend Pro for < 5 seats', () => {
    const data = {
      tools: [{ tool: 'Claude', plan: 'Team', seats: 3, monthlySpend: 150 }]
    };
    const result = generateAudit(data);
    expect(result.recommendations[0].recommendedPlan).toBe('Pro');
    expect(result.monthlySavings).toBeGreaterThan(0);
  });

  test('ChatGPT Team Trap: Should recommend Plus for 1 seat', () => {
    const data = {
      tools: [{ tool: 'ChatGPT', plan: 'Team', seats: 1, monthlySpend: 60 }]
    };
    const result = generateAudit(data);
    expect(result.recommendations[0].recommendedPlan).toBe('Plus');
    expect(result.monthlySavings).toBe(40);
  });

  test('Enterprise Downgrade: Should flag Enterprise for 5 seats', () => {
    const data = {
      tools: [{ tool: 'ChatGPT', plan: 'Enterprise', seats: 5, monthlySpend: 500 }]
    };
    const result = generateAudit(data);
    expect(result.recommendations[0].recommendedPlan).toBe('Team');
  });

  test('Ghost Seats: Should detect overpayment for current seats', () => {
    const data = {
      tools: [{ tool: 'Cursor', plan: 'Pro', seats: 2, monthlySpend: 100 }] // Should be $40
    };
    const result = generateAudit(data);
    expect(result.recommendations[0].savings).toBe(60);
    expect(result.recommendations[0].reason).toContain('zombie');
  });

  test('Already Optimized: Should return $0 savings for correct plan', () => {
    const data = {
      tools: [{ tool: 'Cursor', plan: 'Pro', seats: 1, monthlySpend: 20 }]
    };
    const result = generateAudit(data);
    expect(result.monthlySavings).toBe(0);
  });
});