"use client";

import React, { useState } from "react";
import { EscrowOrder } from "@/types";
import { 
  Lock, 
  CheckCircle2, 
  Truck, 
  BadgeCheck, 
  MapPin, 
  ThermometerSnowflake, 
  ShieldCheck, 
  Sparkles, 
  Wallet, 
  ArrowRight,
  Clock,
  Phone,
  KeyRound,
  FileCheck2
} from "lucide-react";
import { formatINR } from "@/lib/utils";
import confetti from "canvas-confetti";

interface EscrowTrustTrackerProps {
  orders: EscrowOrder[];
  onUpdateOrder: (updatedOrder: EscrowOrder) => void;
}

export const EscrowTrustTracker: React.FC<EscrowTrustTrackerProps> = ({
  orders,
  onUpdateOrder,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || "");
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isAdvancingStep, setIsAdvancingStep] = useState<boolean>(false);

  const currentOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
        <p className="text-slate-600 font-semibold">No active Escrow orders currently in pipeline.</p>
      </div>
    );
  }

  // Handle step advance simulation
  const handleAdvanceStep = (nextStep: number) => {
    setIsAdvancingStep(true);
    setTimeout(() => {
      setIsAdvancingStep(false);
      const updatedMilestones = currentOrder.milestones.map((m) => {
        if (m.step <= nextStep) {
          return { ...m, completed: true, timestamp: m.timestamp || "Just now" };
        }
        return m;
      });

      let newStatus: EscrowOrder["escrowStatus"] = "Funds Held in Escrow";
      if (nextStep === 2) newStatus = "Quality Inspected";
      if (nextStep === 3) newStatus = "In Cold Transit";
      if (nextStep === 4) newStatus = "Delivered & Released";

      const updated: EscrowOrder = {
        ...currentOrder,
        currentStep: nextStep,
        escrowStatus: newStatus,
        milestones: updatedMilestones,
      };

      onUpdateOrder(updated);
    }, 600);
  };

  // Handle OTP Delivery Release
  const handleReleaseEscrowFunds = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    if (enteredOtp.trim() !== currentOrder.deliveryOtp) {
      setOtpError(`Invalid OTP. Please enter the 4-digit code #${currentOrder.deliveryOtp}`);
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);

      // Trigger payout celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      const updatedMilestones = currentOrder.milestones.map((m) => ({
        ...m,
        completed: true,
        timestamp: m.step === 4 ? "Verified & Paid Just Now" : m.timestamp,
      }));

      const updated: EscrowOrder = {
        ...currentOrder,
        currentStep: 4,
        escrowStatus: "Delivered & Released",
        isFundsReleased: true,
        payoutTxnId: `UPI/DBT/${new Date().getFullYear()}/${Math.floor(10000000000 + Math.random() * 90000000000)}`,
        milestones: updatedMilestones,
      };

      onUpdateOrder(updated);
      setEnteredOtp("");
    }, 1000);
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <Lock className="w-5 h-5" />;
      case 2: return <ShieldCheck className="w-5 h-5" />;
      case 3: return <Truck className="w-5 h-5" />;
      case 4: return <BadgeCheck className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Escrow Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-emerald-700/40">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-emerald-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-950" />
                Smart Escrow Protocol
              </span>
              <span className="text-xs text-emerald-300 font-semibold">
                RBI Compliant • Milestone Handshake
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Logistics & Escrow Trust Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Payments remain locked in a cryptographic escrow vault until cold-chain delivery is verified by the buyer via OTP, triggering instant UPI release to the farmer.
            </p>
          </div>

          {/* Quick order selector tabs */}
          <div className="bg-slate-900/80 p-2 rounded-2xl border border-slate-700 flex flex-col gap-1 w-full md:w-auto">
            <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-wider">Select Shipment:</span>
            <div className="flex flex-wrap gap-1">
              {orders.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setSelectedOrderId(o.id);
                    setOtpError(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    selectedOrderId === o.id
                      ? "bg-emerald-600 text-white shadow"
                      : "text-slate-400 hover:text-white bg-slate-800"
                  }`}
                >
                  <span>{o.orderNumber}</span>
                  {o.isFundsReleased ? (
                    <span className="text-[9px] bg-emerald-900 text-emerald-200 px-1 rounded">Paid</span>
                  ) : (
                    <span className="text-[9px] bg-amber-900 text-amber-200 px-1 rounded">Escrow</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Order Pipeline Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 4-Milestone Interactive Pipeline (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Order Header info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={currentOrder.cropImage}
                  alt={currentOrder.cropTitle}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-slate-900">{currentOrder.orderNumber}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      currentOrder.isFundsReleased 
                        ? "bg-emerald-100 text-emerald-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {currentOrder.escrowStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {currentOrder.cropTitle} • <strong>{currentOrder.quantity} {currentOrder.unit}</strong>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Total Escrow Value</span>
                <span className="text-xl font-black text-emerald-800">{formatINR(currentOrder.totalAmount)}</span>
              </div>
            </div>

            {/* Interactive 4-Stage Milestone Timeline */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Milestone Verification Timeline
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {currentOrder.milestones.map((m) => {
                  const isPastOrCurrent = m.step <= currentOrder.currentStep;
                  const isCurrent = m.step === currentOrder.currentStep;

                  return (
                    <div key={m.step} className="relative group">
                      {/* Step Circle Pin */}
                      <div className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition shadow ${
                        m.completed
                          ? "bg-emerald-600 text-white"
                          : isCurrent
                          ? "bg-amber-500 text-white animate-pulse"
                          : "bg-slate-200 text-slate-500"
                      }`}>
                        {m.completed ? "✓" : m.step}
                      </div>

                      {/* Step content card */}
                      <div className={`p-4 rounded-xl border transition ${
                        isCurrent
                          ? "bg-gradient-to-r from-emerald-50 to-amber-50 border-emerald-400 shadow-sm"
                          : m.completed
                          ? "bg-white border-slate-200"
                          : "bg-slate-50/60 border-slate-200 opacity-60"
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                            {getStepIcon(m.step)}
                            <span>{m.title}</span>
                          </h4>
                          {m.timestamp && (
                            <span className="text-[11px] font-mono text-slate-500">
                              {m.timestamp}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Interactive Step Simulator Controls for Judge / Demo */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Live Escrow State Simulation (For Hackathon Judges)
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Step {currentOrder.currentStep} of 4</span>
            </div>

            <p className="text-xs text-slate-400">
              Advance the simulated IoT telemetry & quality inspect states to test the escrow lock:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleAdvanceStep(1)}
                className={`p-2 rounded-lg text-xs font-bold border transition text-center ${
                  currentOrder.currentStep === 1
                    ? "bg-emerald-700 text-white border-emerald-500"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
              >
                1. Lock Escrow
              </button>

              <button
                type="button"
                onClick={() => handleAdvanceStep(2)}
                className={`p-2 rounded-lg text-xs font-bold border transition text-center ${
                  currentOrder.currentStep === 2
                    ? "bg-emerald-700 text-white border-emerald-500"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
              >
                2. Lab Assay Pass
              </button>

              <button
                type="button"
                onClick={() => handleAdvanceStep(3)}
                className={`p-2 rounded-lg text-xs font-bold border transition text-center ${
                  currentOrder.currentStep === 3
                    ? "bg-emerald-700 text-white border-emerald-500"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
              >
                3. GPS Transit
              </button>

              <button
                type="button"
                onClick={() => handleAdvanceStep(4)}
                className={`p-2 rounded-lg text-xs font-bold border transition text-center ${
                  currentOrder.currentStep === 4
                    ? "bg-emerald-700 text-white border-emerald-500"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
              >
                4. Handover Ready
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: IoT Telemetry, Quality Assay & OTP Release Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Reefer Telemetry & GPS Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-600" />
                Live Cold-Chain Telemetry
              </span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Reefer IoT Sensor #4412
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200">
                <span className="text-[11px] text-blue-900 block font-medium">Core Cargo Temp</span>
                <div className="text-xl font-black text-blue-950 flex items-center gap-1 mt-0.5">
                  <ThermometerSnowflake className="w-4 h-4 text-blue-600" />
                  <span>{currentOrder.logistics.currentTempCelsius}°C</span>
                </div>
                <span className="text-[10px] text-blue-700 block mt-0.5">Optimal target: {currentOrder.logistics.optimalTempCelsius}°C</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-600 block font-medium">Carrier Vehicle</span>
                <span className="font-bold text-slate-800 block text-xs mt-0.5">{currentOrder.logistics.vehicleNo}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">{currentOrder.logistics.vehicleName}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Live GPS Location:</span>
              </div>
              <p className="text-slate-600 text-[11px] font-mono">{currentOrder.logistics.gpsCoordinates}</p>
              <p className="text-emerald-700 font-semibold text-[11px]">ETA: {currentOrder.logistics.estimatedArrival}</p>
            </div>
          </div>

          {/* Farm-Gate Quality Assay Certificate */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Farm-Gate Assay Certificate
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Assayer Certified
              </span>
            </div>

            <div className="space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span>Inspector:</span>
                <span className="font-bold text-slate-900">{currentOrder.qualityAssay.inspectorName}</span>
              </div>
              <div className="flex justify-between">
                <span>Moisture Content:</span>
                <span className="font-bold text-emerald-800">{currentOrder.qualityAssay.moisturePercent}%</span>
              </div>
              <div className="flex justify-between">
                <span>Certified Grade:</span>
                <span className="font-bold text-slate-900">{currentOrder.qualityAssay.gradeCertified}</span>
              </div>
              <div className="flex justify-between">
                <span>Pesticide Residue:</span>
                <span className="font-bold text-emerald-700">&lt; {currentOrder.qualityAssay.chemicalResiduePpm} ppm (100% Safe)</span>
              </div>
            </div>
          </div>

          {/* OTP Verification & Direct Payout Release Box */}
          <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-950 text-white rounded-2xl p-5 shadow-xl border-2 border-emerald-500/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-sm">Delivery OTP Handover Release</h3>
              </div>
              <span className="text-[11px] font-mono bg-emerald-950/80 px-2 py-0.5 rounded text-amber-300 font-bold">
                Secret OTP: #{currentOrder.deliveryOtp}
              </span>
            </div>

            {currentOrder.isFundsReleased ? (
              <div className="p-4 bg-emerald-950/90 rounded-xl border border-emerald-400/60 text-center space-y-2">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-extrabold text-sm text-white">Funds Successfully Released!</h4>
                <p className="text-xs text-emerald-200">
                  ₹{currentOrder.transparencyScorecard.farmerAmount.toLocaleString()} (78%) transferred directly to <strong>{currentOrder.farmerName}</strong> ({currentOrder.farmerUpi}).
                </p>
                <span className="text-[10px] font-mono text-emerald-300 block bg-emerald-900/60 py-1 px-2 rounded">
                  Txn ID: {currentOrder.payoutTxnId}
                </span>
              </div>
            ) : (
              <form onSubmit={handleReleaseEscrowFunds} className="space-y-3">
                <p className="text-xs text-emerald-100">
                  When recipient confirms crate inspection at delivery point, enter the 4-digit code provided on buyer&apos;s receipt:
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    placeholder={`Enter OTP (${currentOrder.deliveryOtp})`}
                    className="flex-1 text-center font-mono font-black tracking-widest text-lg py-2 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-xs shadow-md transition flex items-center gap-1.5 shrink-0"
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-amber-950 border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Release Payout</span>
                      </>
                    )}
                  </button>
                </div>

                {otpError && (
                  <p className="text-xs text-amber-300 font-semibold bg-red-950/60 p-2 rounded border border-red-800">
                    ⚠️ {otpError}
                  </p>
                )}

                <div className="text-[11px] text-emerald-300 pt-1 flex justify-between">
                  <span>Farmer Payout: <strong>{formatINR(currentOrder.transparencyScorecard.farmerAmount)}</strong></span>
                  <span>UPI DBT Auto-Release</span>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
