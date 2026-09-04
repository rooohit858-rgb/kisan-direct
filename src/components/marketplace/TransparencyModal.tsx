"use client";

import React, { useState } from "react";
import { CropListing } from "@/types";
import { 
  X, 
  ShieldCheck, 
  Tractor, 
  Truck, 
  Layers, 
  XCircle, 
  CheckCircle2, 
  HeartHandshake, 
  Sparkles,
  TrendingDown,
  TrendingUp,
  Percent
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface TransparencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  crop: CropListing | null;
}

export const TransparencyModal: React.FC<TransparencyModalProps> = ({
  isOpen,
  onClose,
  crop,
}) => {
  const [activeTab, setActiveTab] = useState<"kisan" | "traditional">("kisan");

  if (!isOpen || !crop) return null;

  const directPrice = crop.directPricePerUnit;
  const farmerAmount = (directPrice * 0.78).toFixed(1);
  const logisticsAmount = (directPrice * 0.12).toFixed(1);
  const platformAmount = (directPrice * 0.10).toFixed(1);
  const retailSupermarketPrice = crop.retailSupermarketPrice;

  // Traditional Supply Chain Breakdown (for comparison)
  // Traditional: Farmer gets ~30-35%, Village Aggregator ~15%, APMC Commission Agent ~12%, Wholesaler ~18%, Supermarket Retail Markup ~25%
  const tradFarmer = (retailSupermarketPrice * 0.32).toFixed(1);
  const tradMiddlemen = (retailSupermarketPrice * 0.48).toFixed(1);
  const tradLogisticsWastage = (retailSupermarketPrice * 0.20).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/20">
              <Percent className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">100% Value Transparency Scorecard</h2>
              <p className="text-xs text-emerald-100">{crop.title}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: KisanDirect vs Traditional Chain */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab("kisan")}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === "kisan"
                  ? "bg-emerald-700 text-white shadow-md"
                  : "text-slate-600 hover:text-emerald-800"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>KisanDirect Model (0% Exploitation)</span>
            </button>

            <button
              onClick={() => setActiveTab("traditional")}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === "traditional"
                  ? "bg-amber-700 text-white shadow-md"
                  : "text-slate-600 hover:text-amber-800"
              }`}
            >
              <Layers className="w-4 h-4 text-amber-300" />
              <span>Traditional Middlemen Chain (4-5 Tiers)</span>
            </button>
          </div>

          {activeTab === "kisan" ? (
            /* KisanDirect Fair Model */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                    Direct Farm Price Distribution
                  </span>
                  <span className="text-base font-black text-emerald-800">
                    {formatINR(crop.directPricePerUnit)}/{crop.unit}
                  </span>
                </div>

                {/* Progress bar visual */}
                <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                  <div style={{ width: "78%" }} className="bg-emerald-600 h-full" title="Farmer: 78%" />
                  <div style={{ width: "12%" }} className="bg-blue-500 h-full" title="Cold Logistics: 12%" />
                  <div style={{ width: "10%" }} className="bg-amber-500 h-full" title="Platform Quality: 10%" />
                </div>

                <div className="flex justify-between text-[11px] font-semibold mt-2 text-slate-600">
                  <span className="text-emerald-800">Farmer: 78%</span>
                  <span className="text-blue-700">Cold Chain: 12%</span>
                  <span className="text-amber-700">Quality & Tech: 10%</span>
                  <span className="text-red-600 line-through">Middlemen: 0%</span>
                </div>
              </div>

              {/* Breakdown detail rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* 1. Farmer Share */}
                <div className="p-3.5 bg-white rounded-xl border-2 border-emerald-500/30 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                      <Tractor className="w-4 h-4 text-emerald-600" />
                      <span>Farmer Direct Net</span>
                    </div>
                    <span className="font-extrabold text-emerald-800 text-sm">78% (₹{farmerAmount})</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Transferred instantly via Aadhaar DBT / UPI directly to {crop.farmer.name}&apos;s verified bank account upon delivery.
                  </p>
                </div>

                {/* 2. Cold Chain Logistics */}
                <div className="p-3.5 bg-white rounded-xl border-2 border-blue-500/30 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-blue-900">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>Reefer Cold Chain</span>
                    </div>
                    <span className="font-extrabold text-blue-800 text-sm">12% (₹{logisticsAmount})</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Insulated temperature-controlled transit, IoT telemetry, fuel, and eco-friendly recyclable farm crates.
                  </p>
                </div>

                {/* 3. Platform & Assay */}
                <div className="p-3.5 bg-white rounded-xl border-2 border-amber-500/30 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>Quality Assay & Tech</span>
                    </div>
                    <span className="font-extrabold text-amber-800 text-sm">10% (₹{platformAmount})</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Mandi quality assayer lab testing, RBI-compliant escrow smart vaults, and 24/7 dispute resolution.
                  </p>
                </div>

                {/* 4. Middlemen cut */}
                <div className="p-3.5 bg-white rounded-xl border-2 border-slate-200 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <XCircle className="w-4 h-4 text-emerald-600" />
                      <span>Intermediary Markup</span>
                    </div>
                    <span className="font-extrabold text-emerald-600 text-sm">0% (₹0.00)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Completely eliminated commission agents, village aggregators, and predatory wholesale cartel margins.
                  </p>
                </div>

              </div>

              {/* Summary Impact callout */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-700 to-green-700 text-white space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Win-Win Impact Analysis</span>
                </div>
                <p className="text-xs text-emerald-100">
                  Buyer saves <strong>{Math.round(((retailSupermarketPrice - directPrice) / retailSupermarketPrice) * 100)}%</strong> vs supermarket shelves ({formatINR(retailSupermarketPrice)}/{crop.unit}), while Farmer earns <strong>+35% to +50%</strong> more than local distress APMC mandi rates!
                </p>
              </div>
            </div>
          ) : (
            /* Traditional Supply Chain comparison */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                    Traditional Retail Price Breakdown
                  </span>
                  <span className="text-base font-black text-amber-900">
                    {formatINR(retailSupermarketPrice)}/{crop.unit}
                  </span>
                </div>

                {/* Traditional progress bar */}
                <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                  <div style={{ width: "32%" }} className="bg-emerald-600 h-full" title="Farmer: 32%" />
                  <div style={{ width: "48%" }} className="bg-red-500 h-full" title="Middlemen: 48%" />
                  <div style={{ width: "20%" }} className="bg-slate-500 h-full" title="Transit & Wastage: 20%" />
                </div>

                <div className="flex justify-between text-[11px] font-semibold mt-2 text-slate-600">
                  <span className="text-emerald-800">Farmer: 32%</span>
                  <span className="text-red-700">4-5 Middlemen Cut: 48%</span>
                  <span className="text-slate-600">Wastage Loss: 20%</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-white rounded-lg border border-red-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-red-950 block">Tier 1: Village Aggregator & Arhatiya</span>
                    <span className="text-[11px] text-slate-500">Unregulated weighing deductions and interest locks</span>
                  </div>
                  <span className="font-black text-red-700 text-sm">~15% Markup</span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-red-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-red-950 block">Tier 2: APMC Mandi Commission Agent (Dalal)</span>
                    <span className="text-[11px] text-slate-500">Auction fees, loading charges, market cess</span>
                  </div>
                  <span className="font-black text-red-700 text-sm">~12% Markup</span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-red-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-red-950 block">Tier 3: Secondary Wholesaler & Distant Transporter</span>
                    <span className="text-[11px] text-slate-500">Non-refrigerated transit causes ~25% spoilage</span>
                  </div>
                  <span className="font-black text-red-700 text-sm">~18% Markup</span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-red-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-red-950 block">Tier 4: Supermarket / Big City Retail Margin</span>
                    <span className="text-[11px] text-slate-500">Packaging markup, shelf fees, retailer profit</span>
                  </div>
                  <span className="font-black text-red-700 text-sm">~25-35% Markup</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Audited & Verified via Smart Contract Logic</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
