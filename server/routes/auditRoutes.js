const express = require("express");

const {
  createAudit,
  getPublicAudit,
} = require("../controllers/auditController");

const router = express.Router();

router.post("/audit", createAudit);

router.get("/audit/:id", getPublicAudit);

module.exports = router;
