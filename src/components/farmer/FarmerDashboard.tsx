"use client";

import React, { useState } from "react";
import { CropListing, BuyerBid, ColdStorageVehicle, EscrowOrder } from "@/types";
import { CropManagementGrid } from "./CropManagementGrid";
import { AddProduceModal } from "./AddProduceModal";
import { BidsModal } from "./BidsModal";
import { ColdStorageModal } from "./ColdStorageModal";
import { 
  Tractor, 
  Sparkles, 
  TrendingUp, 
  Lock, 
  ShieldCheck, 
  Award, 
  Truck, 
  Wallet, 
  ArrowUpRight, 
  CheckCircle2, 
  Users,
  Clock,
  Plus
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface FarmerDashboardProps {
  listings: CropListing[];
  bids: BuyerBid[];
  orders: EscrowOrder[];
  onAddListing: (listing: CropListing) => void;
  onAcceptBid: (bid: BuyerBid) => void;
  onRejectBid: (bidId: string) => void;
  onBookVehicle: (vehicle: ColdStorageVehicle, distanceKm: number) => void;
  onOpenAiEngine: () => void;
  onOpenEscrowOrders: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  listings,
  bids,
  orders,
  onAddListing,
  onAcceptBid,
  onRejectBid,
  onBookVehicle,
  onOpenAiEngine,
  onOpenEscrowOrders,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBidsModalOpen, setIsBidsModalOpen] = useState(false);
  const [isColdModalOpen, setIsColdModalOpen] = useState(false);
  const [selectedCropForModal, setSelectedCropForModal] = useState<CropListing | null>(null);

  // Calculate live farmer metrics
  const totalInEscrow = orders
    .filter((o) => !o.isFundsReleased)
    .reduce((sum, o) => sum + o.transparencyScorecard.farmerAmount, 0);

  const totalReleasedEarnings = 428450 + orders
    .filter((o) => o.isFundsReleased)
    .reduce((sum, o) => sum + o.transparencyScorecard.farmerAmount, 0);

  const pendingBidsCount = bids.filter((b) => b.status === "pending").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Farmer Profile & Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-950 text-white p-6 sm:p-8 shadow-xl border border-emerald-700/50">
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-32 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left: Farmer Details & Credentials */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                alt="Dnyaneshwar Patil"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400/50 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full text-xs" title="Kisan Verified">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">Dnyaneshwar Patil</h1>
                <span className="bg-amber-400/90 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Kisan Credit Verified
                </span>
                <span className="bg-emerald-700/80 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Jaivik Bharat
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                Nate Village, Ratnagiri, Maharashtra • Kisan Card: <strong className="font-mono text-white">MH-RTN-2024-8842</strong>
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-emerald-300">
                <span>⭐ 4.9 Rating (128 buyer reviews)</span>
                <span>•</span>
                <span>🌾 340 Quintals Delivered Direct</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-sm px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>List New Produce</span>
            </button>

            <button
              onClick={onOpenAiEngine}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-950/70 hover:bg-emerald-950 text-emerald-100 border border-emerald-600/60 font-bold text-sm px-4 py-3 rounded-xl shadow transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Price Forecaster</span>
            </button>
          </div>

        </div>

        {/* Mini KPI Metric Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-emerald-800/80">
          
          {/* KPI 1 */}
          <div className="bg-emerald-950/50 backdrop-blur rounded-2xl p-4 border border-emerald-700/40">
            <div className="flex items-center justify-between text-emerald-300 text-xs">
              <span>Total Released Earnings</span>
              <Wallet className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">
              {formatINR(totalReleasedEarnings)}
            </div>
            <div className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3 text-emerald-400" />
              Direct DBT Bank Payouts
            </div>
          </div>

          {/* KPI 2 */}
          <div 
            onClick={onOpenEscrowOrders}
            className="bg-emerald-950/50 backdrop-blur rounded-2xl p-4 border border-emerald-700/40 cursor-pointer hover:bg-emerald-900/60 transition"
          >
            <div className="flex items-center justify-between text-emerald-300 text-xs">
              <span>Escrow in Transit</span>
              <Lock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
              {formatINR(totalInEscrow)}
            </div>
            <div className="text-[10px] text-emerald-200 font-semibold flex items-center gap-1 mt-1">
              <span>{orders.filter((o) => !o.isFundsReleased).length} Active Shipments</span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-emerald-950/50 backdrop-blur rounded-2xl p-4 border border-emerald-700/40">
            <div className="flex items-center justify-between text-emerald-300 text-xs">
              <span>Average Margin Boost</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-300 mt-1">
              +38.4%
            </div>
            <div className="text-[10px] text-emerald-300 font-semibold mt-1">
              vs Traditional APMC Mandi
            </div>
          </div>

          {/* KPI 4 */}
          <div 
            onClick={() => {
              setSelectedCropForModal(null);
              setIsBidsModalOpen(true);
            }}
            className="bg-emerald-950/50 backdrop-blur rounded-2xl p-4 border border-emerald-700/40 cursor-pointer hover:bg-emerald-900/60 transition"
          >
            <div className="flex items-center justify-between text-emerald-300 text-xs">
              <span>Active Buyer Bids</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">
              {pendingBidsCount} Pending Offers
            </div>
            <div className="text-[10px] text-amber-300 font-bold mt-1 flex items-center gap-1">
              <span>Click to view & accept</span>
            </div>
          </div>

        </div>

      </div>

      {/* Main Produce Grid */}
      <CropManagementGrid
        listings={listings}
        onOpenBids={(crop) => {
          setSelectedCropForModal(crop);
          setIsBidsModalOpen(true);
        }}
        onOpenColdStorage={(crop) => {
          setSelectedCropForModal(crop);
          setIsColdModalOpen(true);
        }}
      />

      {/* Modals */}
      <AddProduceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddListing={onAddListing}
      />

      <BidsModal
        isOpen={isBidsModalOpen}
        onClose={() => {
          setIsBidsModalOpen(false);
          setSelectedCropForModal(null);
        }}
        bids={bids}
        listing={selectedCropForModal}
        onAcceptBid={(bid) => {
          onAcceptBid(bid);
          setIsBidsModalOpen(false);
        }}
        onRejectBid={onRejectBid}
      />

      <ColdStorageModal
        isOpen={isColdModalOpen}
        onClose={() => {
          setIsColdModalOpen(false);
          setSelectedCropForModal(null);
        }}
        listing={selectedCropForModal}
        onBookVehicle={onBookVehicle}
      />

    </div>
  );
};
