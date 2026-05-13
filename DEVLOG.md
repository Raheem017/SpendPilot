# Development Log: SpendPilot

## Day 1 — 2026-05-09

**Hours worked:** 3
**What I did:** Project initialization. Created the basic folder structure with separate `/client` and `/server` directories. Initialized Git.
**What I learned:** Organizing the monorepo structure early prevents deployment headaches later.
**Plan for tomorrow:** Start the frontend UI.

## Day 2 — 2026-05-10

**Hours worked:** 4
**What I did:** Frontend setup. Installed Tailwind CSS and built the basic Landing Page hero section.
**What I learned:** Tailwind's utility classes are significantly faster for rapid prototyping than standard CSS.
**Plan for tomorrow:** Improve UI and form inputs.

## Day 3 — 2026-05-11

**Hours worked:** 5
**What I did:** UI Refinement. Added the multi-step form for tool selection (Cursor, ChatGPT, etc.) and managed local state.
**What I learned:** Lifting state up is essential when the audit results depend on multiple form inputs.
**Plan for tomorrow:** Connect the backend.

## Day 4 — 2026-05-12

**Hours worked:** 7
**What I did:** Backend development. Integrated Mongoose and MongoDB Atlas. Created the Lead model to store user data.
**Blockers:** Connecting the local Express server to the remote MongoDB cluster took longer than expected due to IP allow-listing.
**Plan for tomorrow:** Build the Audit Engine.

## Day 5 — 2026-05-13

**Hours worked:** 8
**What I did:** Core Audit Engine logic. Wrote the math for seat-downsizing and tool-switching. Integrated Resend for emails.
**What I learned:** Hardcoded, defensible logic is often more reliable for financial audits than non-deterministic LLM outputs.
**Plan for tomorrow:** Final Polish and Submission.
