"use client";

import React, { useState } from "react";
import { cropHistoricalPriceData } from "@/data/historicalPricing";
import { PriceTrendChart } from "./PriceTrendChart";
import { 
  Sparkles, 
  TrendingUp, 
  BrainCircuit, 
  CloudSun, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  ArrowUpRight, 
  Info,
  Calculator,
  Flame,
  ShieldAlert
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export const PricingForecastingEngine: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState("Nashik Onions");
  const [selectedState, setSelectedState] = useState("Maharashtra (Lasalgaon / Nashik)");
  const [supplyArrivalVolume, setSupplyArrivalVolume] = useState<number>(50); // 0 (Severe Shortage) to 100 (Glut/Surplus)
  const [seasonalDemandIndex, setSeasonalDemandIndex] = useState<number>(75); // 0 (Low) to 100 (Peak Festival)
  const [weatherShock, setWeatherShock] = useState<"normal" | "unseasonal_rain" | "heatwave">("normal");
  const [qualityGrade, setQualityGrade] = useState<"A" | "B" | "C">("A");

  const cropKeys = Object.keys(cropHistoricalPriceData);

  // Base dynamic calculations
  const chartData = cropHistoricalPriceData[selectedCrop] || cropHistoricalPriceData["Nashik Onions"];
  const currentBaseFair = chartData[chartData.length - 2]?.kisanDirectFair || 28;
  const currentMandi = chartData[chartData.length - 2]?.apmcMandi || 18;
  const unit = selectedCrop === "Alphonso Mangoes" ? "dozen" : selectedCrop === "Sharbati Wheat" ? "quintal" : "kg";

  // Dynamic simulation multipliers
  // High demand -> +%, High supply arrival -> -%, Weather shock -> +%, Grade A -> +15%
  const supplyMultiplier = 1 + (50 - supplyArrivalVolume) * 0.004; // supply low -> price up
  const demandMultiplier = 1 + (seasonalDemandIndex - 50) * 0.005; // demand high -> price up
  const weatherMultiplier = weatherShock === "unseasonal_rain" ? 1.18 : weatherShock === "heatwave" ? 1.12 : 1.0;
  const gradeMultiplier = qualityGrade === "A" ? 1.15 : qualityGrade === "B" ? 1.0 : 0.82;

  const simulatedFairPrice = Math.round(currentBaseFair * supplyMultiplier * demandMultiplier * weatherMultiplier * gradeMultiplier);
  const simulatedMandiRate = Math.round(currentMandi * supplyMultiplier * weatherMultiplier);
  const simulatedRetailPrice = Math.round(simulatedFairPrice * 1.42);

  const farmerProfitGain = simulatedMandiRate > 0 
    ? Math.round(((simulatedFairPrice - simulatedMandiRate) / simulatedMandiRate) * 100)
    : 35;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-6 sm:p-8 shadow-xl border border-emerald-800/50">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <BrainCircuit className="w-3 h-3 text-amber-950" />
                AI Agricultural Econometrics
              </span>
              <span className="text-xs text-emerald-300 font-semibold">
                Regression Supply-Demand Equilibrium
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              AI Fair-Price & Demand Forecasting Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Calculate optimal farm-gate pricing by analyzing real-time APMC arrivals, weather telemetry, mandi benchmark floors, and consumer retail elasticities.
            </p>
          </div>

          <div className="bg-emerald-900/60 backdrop-blur p-4 rounded-2xl border border-emerald-500/30 text-right w-full lg:w-auto">
            <span className="text-[11px] text-emerald-200 block">AI Recommended Farm-Gate</span>
            <div className="text-3xl font-black text-amber-300 mt-0.5">
              {formatINR(simulatedFairPrice)}/{unit}
            </div>
            <span className="text-[11px] text-emerald-300 font-bold flex items-center justify-end gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +{farmerProfitGain}% vs Distress APMC Mandi
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid: Controls on Left, Chart on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Parametric Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-600" />
                Simulation Parameters
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Live Recalculation</span>
            </div>

            {/* Crop Selector */}
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Indian Crop
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-semibold"
              >
                {cropKeys.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>

            {/* State & Mandi Belt */}
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-600" /> Mandi Production Belt
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
              >
                <option value="Maharashtra (Lasalgaon / Nashik)">Maharashtra (Lasalgaon / Nashik / Vashi)</option>
                <option value="Punjab & Haryana (Khanna Hub)">Punjab & Haryana (Khanna / Ludhiana)</option>
                <option value="Himachal Pradesh (Kotgarh / Shimla)">Himachal Pradesh (Kotgarh / Shimla)</option>
                <option value="Uttar Pradesh (Agra / Western UP)">Uttar Pradesh (Agra / Aligarh)</option>
                <option value="Andhra Pradesh (Guntur Hub)">Andhra Pradesh (Guntur / Tenali)</option>
              </select>
            </div>

            {/* Slider 1: Supply Arrival Volume */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <div className="flex justify-between font-semibold text-slate-700">
                <span>APMC Daily Arrivals Volume:</span>
                <span className="font-bold text-emerald-800">
                  {supplyArrivalVolume < 35 ? "Severe Shortage (-40%)" : supplyArrivalVolume > 70 ? "Surplus Glut (+50%)" : "Normal Equilibrium"}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={90}
                value={supplyArrivalVolume}
                onChange={(e) => setSupplyArrivalVolume(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Scarce Supply (Price ↑)</span>
                <span>Balanced</span>
                <span>Heavy Surplus (Price ↓)</span>
              </div>
            </div>

            {/* Slider 2: Seasonal Demand Index */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <div className="flex justify-between font-semibold text-slate-700">
                <span>Consumer & Festival Demand:</span>
                <span className="font-bold text-blue-800">
                  {seasonalDemandIndex > 70 ? "High Festive Surge" : seasonalDemandIndex < 35 ? "Sluggish" : "Moderate Demand"}
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={95}
                value={seasonalDemandIndex}
                onChange={(e) => setSeasonalDemandIndex(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Off-Season</span>
                <span>Regular</span>
                <span>Wedding / Diwali Peak</span>
              </div>
            </div>

            {/* Weather & Climate Shock Trigger */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="block font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <CloudSun className="w-3.5 h-3.5 text-amber-500" /> Climate / Harvest Shock Factor
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setWeatherShock("normal")}
                  className={`p-2 rounded-lg border text-center transition ${
                    weatherShock === "normal"
                      ? "bg-emerald-100 border-emerald-600 font-bold text-emerald-900"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Optimal Weather
                </button>

                <button
                  type="button"
                  onClick={() => setWeatherShock("unseasonal_rain")}
                  className={`p-2 rounded-lg border text-center transition ${
                    weatherShock === "unseasonal_rain"
                      ? "bg-blue-100 border-blue-600 font-bold text-blue-900"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Unseasonal Rain (+18%)
                </button>

                <button
                  type="button"
                  onClick={() => setWeatherShock("heatwave")}
                  className={`p-2 rounded-lg border text-center transition ${
                    weatherShock === "heatwave"
                      ? "bg-amber-100 border-amber-600 font-bold text-amber-900"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Heatwave Loss (+12%)
                </button>
              </div>
            </div>

            {/* Quality Grade selector */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="block font-bold text-slate-700 uppercase tracking-wider">
                Harvest Assay Quality Grade
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setQualityGrade("A")}
                  className={`p-2 rounded-lg border text-center font-bold transition ${
                    qualityGrade === "A"
                      ? "bg-emerald-600 text-white border-emerald-700 shadow"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  Grade A (Export)
                </button>

                <button
                  type="button"
                  onClick={() => setQualityGrade("B")}
                  className={`p-2 rounded-lg border text-center font-bold transition ${
                    qualityGrade === "B"
                      ? "bg-emerald-600 text-white border-emerald-700 shadow"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  Grade B (Standard)
                </button>

                <button
                  type="button"
                  onClick={() => setQualityGrade("C")}
                  className={`p-2 rounded-lg border text-center font-bold transition ${
                    qualityGrade === "C"
                      ? "bg-emerald-600 text-white border-emerald-700 shadow"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  Grade C (Industrial)
                </button>
              </div>
            </div>

          </div>

          {/* AI Decision Explainability Box */}
          <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl border border-emerald-200 p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-950">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Algorithm Justification</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Based on historical arrival patterns in {selectedState}, our regression model predicts an equilibrium price of <strong>{formatINR(simulatedFairPrice)}/{unit}</strong>. By bypassing the 4-tier commission agents, farmers gain an extra <strong>{formatINR(simulatedFairPrice - simulatedMandiRate)}/{unit}</strong> while buyers pay <strong>{formatINR(simulatedRetailPrice - simulatedFairPrice)} less</strong> than supermarket prices.
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Price Summary Cards & Recharts Line Visual (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* 3 Metric Cards */}
          <div className="grid grid-cols-3 gap-3">
            
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[11px] text-slate-500 block">APMC Distress Mandi</span>
              <span className="text-lg font-bold text-slate-700 mt-1 block">
                {formatINR(simulatedMandiRate)}/{unit}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Wholesale auction baseline</span>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-4 rounded-2xl border-2 border-emerald-500 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-emerald-950">KisanDirect Fair</span>
                <span className="text-[9px] bg-emerald-700 text-white font-bold px-1 rounded">Optimal</span>
              </div>
              <span className="text-xl font-black text-emerald-900 mt-1 block">
                {formatINR(simulatedFairPrice)}/{unit}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 block mt-0.5">
                +{farmerProfitGain}% Direct Farmer Gain
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[11px] text-slate-500 block">Intermediary Retail</span>
              <span className="text-lg font-bold text-red-600 mt-1 block">
                {formatINR(simulatedRetailPrice)}/{unit}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Supermarket shelf price</span>
            </div>

          </div>

          {/* Recharts Line Visual */}
          <PriceTrendChart
            data={chartData}
            cropTitle={selectedCrop}
            unit={unit}
          />

        </div>

      </div>

    </div>
  );
};
