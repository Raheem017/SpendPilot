# Automated Tests

### Audit Engine Tests

- **File**: `server/tests/auditEngine.test.js`
- **Coverage**:
  1. **Optimal Spend**: Returns $0 savings for optimized users.
  2. **Seat Overlap**: Detects ChatGPT Team for 1-person teams.
  3. **Plan Downgrade**: Suggests Pro instead of Business for low usage.
  4. **API vs Retail**: Recommends credits for high-token users.
  5. **Empty Input**: Handles partial form data gracefully.

**Run command**: `cd server && npm test`
