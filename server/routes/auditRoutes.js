const express = require("express");
const {
  createAudit,
  getPublicAudit,
} = require("../controllers/auditController");
const { createLead } = require("../controllers/leadController"); // Import new controller

const router = express.Router();

router.post("/audit", createAudit);
router.get("/audit/:id", getPublicAudit);

// Requirement 5: Lead Capture Route
router.post("/leads", createLead);

module.exports = router;
