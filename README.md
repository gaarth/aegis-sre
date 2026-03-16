# aegis-sre
<div align="center">
  <img src="https://raw.githubusercontent.com/gaarth/cityboy/main/public/aegis-logo.png" alt="AEGIS SRE Logo" width="120" />
  <h1>AEGIS SRE</h1>
  <p><strong>Sentinel Governor (SG-1) — Agentic SRE Control Plane</strong></p>
  <p>
    <a href="https://aegis-sre.vercel.app"><b>Live Demo (aegis-sre.vercel.app)</b></a>
  </p>

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Edge_Functions-green?logo=supabase)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Groq](https://img.shields.io/badge/Groq-AI_Agent-f55036?logo=groq)](https://groq.com/)
</div>

<hr/>

AEGIS SRE is an advanced **Agentic Site Reliability Engineering (SRE) Control Plane**. It leverages large language models and autonomous agents to detect, analyze, and resolve infrastructure anomalies in real time. 

Powered by **Sentinel Governor (SG-1)**, the platform bridges the gap between full autonomous resolution and human oversight by introducing dynamic confidence scoring and **Human-In-The-Loop (HITL)** governance for sensitive, high-impact events.

## ✨ Core Features

🛡️ **Sentinel Governor (AI Agent)**
The brain of the system, powered by the Groq API. It actively monitors incoming telemetry and executes an intelligent "Thought Stream" loop: _Scanning → Detecting → Analyzing → Action → Resolved_.

🚦 **Human-In-The-Loop (HITL) Governance**
Not all fixes can be automated safely. LOW and MEDIUM risk anomalies are auto-healed. For HIGH-RISK events, Sentinel pauses execution, provides an RCA (Root Cause Analysis), and presents administrators with alternative fix strategies accompanied by statistical confidence scores (e.g., *Failover Database: 94%* vs *Restart Container: 62%*).

🌪️ **Chaos Engineering Sandbox ("SoleSource")**
To demonstrate the AI's capabilities, AEGIS includes a simulated e-commerce storefront. Administrators can inject real-time "Chaos Events" such as:
- **CDN Drops**: Breaking asset loading.
- **Cache Staleness**: Showing incorrect/old prices.
- **API Degradation**: Increasing P99 latency drastically.
- **DB Connection Pools Exhausted**: Triggering cascading 500 errors.

💬 **CRM Complaint Drip Simulation**
Tests how systems handle user feedback. When Chaos Events are injected, simulated customer complaints (e.g., "The cart won't checkout!", "Images are broken") realistically drip into the CRM dashboard, capping out organically until the AI resolves the root infrastructure issue.

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router), React 19
- **Database & Auth**: Supabase (Postgres, Row Level Security)
- **Backend Infrastructure**: Supabase Edge Functions (Deno) for incident post-processing and AI hooks.
- **AI Infrastructure**: Groq SDK for rapid, low-latency reasoning loops.
- **Styling & Animation**: Tailwind CSS, Framer Motion, Lucide React.
- **Language**: TypeScript throughout.

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/gaarth/cityboy.git
cd cityboy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory. You will need your Supabase project keys and a Groq API key to power the Sentinel agent.
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

### 4. Run the Dev Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the localized SRE dashboard, or hit `/demo` to interact with the interactive SoleSource Chaos Sandbox.

### 5. Edge Functions (Optional)
If deploying backend processing logic:
```bash
npm run deploy:functions
```

## 📂 Project Structure Snapshot

- `/app/dashboard/` - Main AEGIS SRE Command Center and incident overview.
- `/app/demo/` - The SoleSource Chaos Sandbox, featuring the interactive storefront, metrics panel, and CRM panel.
- `/app/api/simulation/` - API routes that handle injecting chaos (`/chaos`), healing anomalies (`/heal`), and state resets.
- `/components/` - Global reusable UI components including the Navigation and Capabilities sections.
- `/lib/` - Shared state hooks, event definitions, and simulation logic (`useSimulationState.ts`).
- `/supabase/functions/` - Deno Edge Functions handling secure or asynchronous agent operations.

## 🌐 Deployment
The primary application is configured natively for Vercel deployment. 

**Live Link**: [https://aegis-sre.vercel.app](https://aegis-sre.vercel.app)

## 📄 License
This project is licensed under the ISC License. See the `package.json` file for details.
