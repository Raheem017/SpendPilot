const Audit = require("../models/auditModel");

const generateAudit = require("../services/auditEngine");

const generateSummary = require("../services/aiSummary");

const { nanoid } = require("nanoid");

const createAudit = async (req, res) => {
  try {
    const auditResult = generateAudit(req.body);

    const summary = await generateSummary(auditResult);

    const audit = await Audit.create({
      publicId: nanoid(10),

      tools: req.body.tools,

      monthlySavings: auditResult.monthlySavings,

      annualSavings: auditResult.annualSavings,

      recommendations: auditResult.recommendations,

      summary,
    });

    res.json(audit);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getPublicAudit = async (req, res) => {
  try {
    const audit = await Audit.findOne({
      publicId: req.params.id,
    });

    res.json(audit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAudit,
  getPublicAudit,
};
