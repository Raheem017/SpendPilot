const Lead = require("../models/leadModel");
const { Resend } = require("resend");

// Initialize Resend with  API Key
const resend = new Resend(process.env.RESEND_API_KEY);

const createLead = async (req, res) => {
  const { email, companyName, role, auditId, annualSavings, website } =
    req.body;

  //   Honeypot
  if (website) return res.status(400).json({ message: "Bot detected" });

  try {
    const lead = await Lead.create({
      email,
      companyName,
      role,
      auditId,
      annualSavings,
    });

    const reportLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/a/${auditId}`;

    await resend.emails.send({
      from: "SpendPilot <onboarding@resend.dev>",
      to: email,
      subject: `Your AI Spend Audit: $${annualSavings} Savings Found`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h1>Optimization Roadmap Ready</h1>
          <p>Hi ${companyName || "there"},</p>
          <p>We found <strong>$${annualSavings}</strong> in potential annual savings for your stack.</p>
          <p><a href="${reportLink}" style="background: #2563eb; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px;">View Your Full Report</a></p>
          <small>Link not working? Copy this: ${reportLink}</small>
        </div>
      `,
    });

    res.json({ message: "Lead captured and report sent", lead });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLead };

//  html: `
//         <h1>Optimization Roadmap Ready</h1>
//         <p>Thanks for using SpendPilot. We found <strong>$${annualSavings}</strong> in potential annual savings.</p>
//         <p>View your permanent report here:
//           <a href="${process.env.FRONTEND_URL}/a/${auditId}">View Full Report</a>
//         </p>
//         ${annualSavings > 6000 ? "<p><strong>Note:</strong> Your savings qualify for a priority Credex consultation.</p>" : ""}
//       `,
