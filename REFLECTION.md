# Reflection: The SpendPilot Journey

### 1. The Hardest Bug

The hardest bug was a persistent 404 error on the public Vercel URL when trying to access sub-routes or the audit results page. My hypothesis was that Vercel couldn't find the `index.html` because of my nested folder structure (`/client`). I tried changing the build settings multiple times. The fix was twofold: setting the "Root Directory" to `client` in Vercel settings and adding a `vercel.json` with a rewrite rule to redirect all traffic to `index.html`, allowing React Router to take over.

### 2. A Decision Reversed

Mid-week, I initially planned to use an LLM to calculate the audit savings directly from user text. I reversed this because the LLM often "hallucinated" pricing or missed seat-minimum requirements (like ChatGPT Team needing 2 seats). I switched to a hardcoded Audit Engine for the math to ensure the results were "defensible" to a finance person, using the LLM only for the final personalized summary.

### 3. Week 2 Roadmap

If I had a second week, I would build a "Benchmark Mode" that compares a startup's spend against real-time industry averages for their specific funding stage. I would also implement a PDF export feature so founders could easily share the professional report with their board of directors to justify seat-cuts.

### 4. AI Tool Usage

I used Gemini and Claude for three main tasks: drafting the boilerplate for the Express server, generating the initial Tailwind components, and writing the personalized summary logic. I didn't trust the AI with the specific pricing math for 2026—I manually verified every tool price against official docs. One specific fail: the AI suggested GitHub Copilot had a "Pro" tier for $10, which was outdated; I caught it and corrected it to the $19/mo "Business" tier.

### 5. Self-Rating

- **Discipline: 9/10** — I stayed consistent with the 5-day build window and hit every MVP requirement.
- **Code Quality: 8/10** — The separation of concerns between the frontend and backend is clean and scalable.
- **Design Sense: 8/10** — Achieved a 96 Accessibility score while keeping a modern, dark-mode "SaaS" aesthetic.
- **Problem Solving: 10/10** — Successfully navigated deployment blockers and API restrictions (Resend sandbox).
- **Entrepreneurial Thinking: 9/10** — Focused heavily on the "Credex Lead Gen" aspect rather than just making a calculator.
