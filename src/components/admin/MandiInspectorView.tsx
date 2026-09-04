"use client";

import React, { useState } from "react";
import { MandiRateBenchmark, CropListing } from "@/types";
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Radio, 
  FileCheck2, 
  RefreshCw, 
  Award, 
  Sparkles,
  AlertTriangle,
  Building,
  Scale
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface MandiInspectorViewProps {
  mandiRates: MandiRateBenchmark[];
  listings: CropListing[];
  onUpdateMandiRate: (rateId: string, newRate: number) => void;
}

export const MandiInspectorView: React.FC<MandiInspectorViewProps> = ({
  mandiRates,
  listings,
  onUpdateMandiRate,
}) => {
  const [editingRateId, setEditingRateId] = useState<string | null>(null);
  const [tempRate, setTempRate] = useState<number>(0);
  const [approvedBatches, setApprovedBatches] = useState<Record<string, boolean>>({
    "crop-1": true,
    "crop-2": true,
    "crop-3": true,
    "crop-4": true,
  });

  const handleSaveRate = (id: string) => {
    onUpdateMandiRate(id, tempRate);
    setEditingRateId(null);
  };

  const handleToggleAssay = (cropId: string) => {
    setApprovedBatches((prev) => ({
      ...prev,
      [cropId]: !prev[cropId],
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Inspector Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-purple-800/50">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-purple-500 text-purple-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-purple-950" />
                Govt Mandi Inspector & Quality Assayer Portal
              </span>
              <span className="text-xs text-purple-300 font-semibold">
                APMC e-NAM Node #MH-402
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Quality Assay, Mandi Feeds & Dispute Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Certify farm-gate quality standards, verify pesticide limits, synchronize live APMC mandi benchmarks, and resolve escrow disputes.
            </p>
          </div>

          <div className="bg-purple-900/60 p-4 rounded-2xl border border-purple-500/30 text-right w-full md:w-auto">
            <span className="text-[11px] text-purple-200 block">Assayer License ID</span>
            <span className="text-lg font-black text-amber-300 font-mono">GOVT-AGRI-INSP-2026-991</span>
            <span className="text-[10px] text-purple-300 block mt-0.5">Mandi Board Certified</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Quality Assay Approvals & APMC Live Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Farm-Gate Batch Quality Certifications (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-purple-600" />
                  Farm-Gate Quality Assay Certifications
                </h3>
                <p className="text-xs text-slate-500">Approve laboratory assay parameters before shipment loading</p>
              </div>
              <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full">
                {listings.length} Batches Audited
              </span>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {listings.map((crop) => {
                const isCertified = approvedBatches[crop.id] !== false;

                return (
                  <div
                    key={crop.id}
                    className={`p-4 rounded-xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isCertified ? "bg-purple-50/50 border-purple-200" : "bg-red-50/50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={crop.image}
                        alt={crop.title}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-900">{crop.title}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-purple-800 border border-purple-200">
                            {crop.qualityGrade.split(" ")[0]}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Farmer: <strong>{crop.farmer.name}</strong> • Moisture: <strong>{crop.moisturePercent}%</strong> • Pesticide: &lt;0.02 ppm
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => handleToggleAssay(crop.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                          isCertified
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                      >
                        {isCertified ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Assay Certified</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Hold Batch</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Mandi Benchmark Sync Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                  APMC Mandi Rate Benchmarks
                </h3>
                <p className="text-xs text-slate-500">Live auction floor prices across major APMC terminals</p>
              </div>
            </div>

            <div className="space-y-3 text-xs max-h-[60vh] overflow-y-auto">
              {mandiRates.map((rate) => (
                <div
                  key={rate.id}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900 text-xs block">{rate.commodity}</span>
                      <span className="text-[10px] text-slate-500">{rate.mandiName} ({rate.state})</span>
                    </div>

                    <div className="text-right">
                      {editingRateId === rate.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={tempRate}
                            onChange={(e) => setTempRate(Number(e.target.value))}
                            className="w-16 p-1 text-xs border rounded text-right font-mono"
                          />
                          <button
                            onClick={() => handleSaveRate(rate.id)}
                            className="text-[10px] bg-emerald-600 text-white px-2 py-1 rounded font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div>
                            <span className="font-bold text-slate-800 text-sm font-mono">
                              {formatINR(rate.apmcModalPrice)}/{rate.unit}
                            </span>
                            <span className="text-[10px] text-emerald-700 block font-semibold">
                              Direct: {formatINR(rate.kisanDirectPrice)}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setEditingRateId(rate.id);
                              setTempRate(rate.apmcModalPrice);
                            }}
                            className="text-[10px] text-purple-700 font-bold hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dispute Arbitration Protocol Card */}
          <div className="bg-purple-900 text-white rounded-2xl p-5 shadow-sm space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-sm text-purple-200">
              <Scale className="w-4 h-4 text-amber-300" />
              <span>Smart Escrow Dispute Protocol</span>
            </div>
            <p className="text-purple-200 leading-relaxed">
              If cargo temperature deviates by &gt;4°C or defect rate exceeds Grade A tolerances at delivery, funds remain locked in Escrow. Mandi Inspector assay logs serve as legally binding arbitration under the Indian Agri Digital Commerce Act.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
