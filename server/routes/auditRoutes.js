const express = require("express");
const {
  createAudit,
  getPublicAudit,
} = require("../controllers/auditController");
const { createLead } = require("../controllers/leadController"); // Import new controller

const router = express.Router();

router.post("/audit", createAudit);
router.get("/public/:id", getPublicAudit);
router.post("/leads", createLead);

module.exports = router;
