# 🌾 KisanDirect (किसान सेतु) - Direct Farm-to-Consumer Agri Marketplace

> **Smart India Hackathon (SIH 2026)**  
> **Problem Statement ID:** SIH26033  
> **Theme:** Agriculture, FoodTech & Rural Development  
> **Live Demo:** [http://localhost:3000](http://localhost:3000)

---

## 📌 Executive Summary
**KisanDirect** eliminates exploitative intermediary layers (aggregators, commission agents, multiple transport tiers) from the agricultural supply chain by connecting Indian farmers directly with household consumers, restaurants, and bulk institutional buyers. 

The platform guarantees **78% direct net farm-gate earnings** to farmers, provides dynamic **AI Fair-Price forecasting**, guarantees **100% price transparency**, and secures all transactions using an **RBI-compliant milestone-backed Escrow & Cold-Chain delivery protocol**.

---

## ✨ Key Features & Architecture

### 1. 🧭 3-in-1 Header Persona Switcher
- **Farmer Mode (Green)**: Real-time net revenue KPIs, listing management, buyer bid negotiation, and cold-chain carrier dispatch.
- **Consumer / Buyer Mode (Blue/Amber)**: Direct produce procurement with distance radius slider, Jaivik Bharat organic certification filters, and volume discounts.
- **Mandi Inspector Hub (Purple)**: Laboratory quality assay approvals, moisture testing, and APMC benchmark synchronization.

### 2. 📊 Live APMC Mandi Ticker
- Continuous ticker ribbon comparing local APMC terminal wholesale prices with direct KisanDirect selling margins (**+35% to +52% farmer profit boost**).

### 3. 🤖 AI Dynamic Pricing & Visual Quality Assay
- **AI Visual Assay Scanner**: Simulates moisture %, brix sugar index, purity score (98%), and defect tolerances (<1.2%).
- **AI Dynamic Pricing Engine**: Recalculates fair market pricing in real time based on local daily arrivals, weather anomalies, and festival demand curves.

### 4. 💯 100% Value Transparency Scorecard
- Direct visual comparison between KisanDirect and traditional 4-tier middlemen chains:
  - **Farmer Direct Net:** 78%
  - **Cold-Chain Logistics:** 12%
  - **Platform & Quality Assay Fee:** 10%
  - **Intermediary Middlemen Cut:** 0% (vs ~48% lost in traditional retail!)

### 5. 🔒 Logistics & Milestone Escrow Trust Protocol
- **4-Stage Delivery Pipeline:** Order Locked -> Farm-Gate Quality Certified -> Reefer GPS Transit (6.8°C telemetry) -> Handover & Payout.
- **OTP Payout Release:** 4-digit secret delivery OTP release triggering direct instant UPI DBT payout to the farmer's bank account.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, Custom Glassmorphic Gradients
- **Icons & Animation:** Lucide React, Canvas Confetti
- **Analytics & Charts:** Recharts (Dynamic 6-month historical & forecast trend curves)
- **Logistics:** Simulated IoT Cold-Chain Reefer Telematics

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 🌐 Deploy to Vercel in 1 Click

1. Push this repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Click **Deploy**. Vercel will automatically build and publish your Next.js application with an instant HTTPS URL and free global CDN.
