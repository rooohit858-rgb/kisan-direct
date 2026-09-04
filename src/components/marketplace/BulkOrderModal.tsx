"use client";

import React, { useState } from "react";
import { CropListing, BuyerBid } from "@/types";
import { 
  X, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  TrendingDown, 
  FileText, 
  CheckCircle2,
  Lock
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface BulkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  crop: CropListing | null;
  onSubmitBid: (bid: BuyerBid) => void;
}

export const BulkOrderModal: React.FC<BulkOrderModalProps> = ({
  isOpen,
  onClose,
  crop,
  onSubmitBid,
}) => {
  const [buyerName, setBuyerName] = useState("Taj Santacruz Fine Dining & Banquets");
  const [buyerType, setBuyerType] = useState<BuyerBid["buyerType"]>("Restaurant / Cloud Kitchen");
  const [offeredPrice, setOfferedPrice] = useState(crop ? Math.round(crop.directPricePerUnit * 0.95) : 100);
  const [requestedQuantity, setRequestedQuantity] = useState(crop ? Math.min(crop.quantity, 100) : 50);
  const [notes, setNotes] = useState("Direct procurement for restaurant kitchen. Reefer vehicle pickup arranged.");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !crop) return null;

  const totalAmount = offeredPrice * requestedQuantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newBid: BuyerBid = {
        id: `bid-${Date.now()}`,
        listingId: crop.id,
        cropTitle: crop.title,
        buyerName,
        buyerType,
        offeredPricePerUnit: offeredPrice,
        requestedQuantity,
        unit: crop.unit,
        totalAmount,
        status: "pending",
        createdAt: "Just now",
        paymentMode: "Full Escrow Locked",
        notes,
      };

      onSubmitBid(newBid);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/20">
              <Building2 className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">B2B Institutional Bid & Procurement</h2>
              <p className="text-xs text-blue-200">Bulk Tier Contracts • Escrow Guarantee</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-blue-950 text-sm block">{crop.title}</span>
              <span className="text-slate-600">Farmer: {crop.farmer.name} • Available: {crop.quantity} {crop.unit}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[11px]">List Price</span>
              <span className="font-black text-blue-900 text-sm">{formatINR(crop.directPricePerUnit)}/{crop.unit}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Organization / Buyer Name *
              </label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Buyer Category
              </label>
              <select
                value={buyerType}
                onChange={(e) => setBuyerType(e.target.value as any)}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
              >
                <option value="Restaurant / Cloud Kitchen">Restaurant / Cloud Kitchen</option>
                <option value="Retail Chain / Supermarket">Retail Chain / Supermarket</option>
                <option value="Institutional Bulk">Institutional Bulk Processor</option>
                <option value="Consumer Co-op">Consumer Cooperative Society</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Offered Rate ({crop.unit}) *
              </label>
              <input
                type="number"
                value={offeredPrice}
                onChange={(e) => setOfferedPrice(Number(e.target.value))}
                min={1}
                className="w-full text-sm font-bold text-emerald-800 border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                vs Mandi: {formatINR(crop.apmcBenchmarkPrice)} • List: {formatINR(crop.directPricePerUnit)}
              </span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Requested Quantity ({crop.unit}) *
              </label>
              <input
                type="number"
                value={requestedQuantity}
                onChange={(e) => setRequestedQuantity(Number(e.target.value))}
                min={1}
                max={crop.quantity}
                className="w-full text-sm font-bold border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Procurement Terms & Logistics Request
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[11px]">Total Contract Value</span>
              <span className="text-lg font-black text-amber-400">{formatINR(totalAmount)}</span>
            </div>
            <span className="text-xs bg-slate-800 px-3 py-1.5 rounded-lg text-emerald-300 font-semibold border border-slate-700 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              Escrow Guaranteed
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold shadow transition flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Offer...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Submit Institutional Bid</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
