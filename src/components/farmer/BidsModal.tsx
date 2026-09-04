"use client";

import React, { useState } from "react";
import { BuyerBid, CropListing } from "@/types";
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Building2, 
  Sparkles,
  TrendingUp
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface BidsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bids: BuyerBid[];
  listing?: CropListing | null;
  onAcceptBid: (bid: BuyerBid) => void;
  onRejectBid: (bidId: string) => void;
}

export const BidsModal: React.FC<BidsModalProps> = ({
  isOpen,
  onClose,
  bids,
  listing,
  onAcceptBid,
  onRejectBid,
}) => {
  const [counterBidId, setCounterBidId] = useState<string | null>(null);
  const [counterPrice, setCounterPrice] = useState<number>(0);

  if (!isOpen) return null;

  const relevantBids = listing 
    ? bids.filter((b) => b.listingId === listing.id) 
    : bids;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/20">
              <TrendingUp className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Buyer Bids & Offers</h2>
              <p className="text-xs text-emerald-100">
                {listing ? `For ${listing.title}` : "All Active Direct Buyer Bids"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bids List */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {relevantBids.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-600">No active bids at the moment</p>
              <p className="text-xs text-slate-400 mt-1">Buyers browsing the marketplace will place bids shortly.</p>
            </div>
          ) : (
            relevantBids.map((bid) => (
              <div
                key={bid.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-md transition space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{bid.buyerName}</span>
                      <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {bid.buyerType}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 mt-0.5 block">{bid.cropTitle} • {bid.createdAt}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Offered Rate</span>
                    <span className="text-lg font-black text-emerald-700">
                      {formatINR(bid.offeredPricePerUnit)}/{bid.unit}
                    </span>
                  </div>
                </div>

                {bid.notes && (
                  <p className="text-xs bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700 italic">
                    &ldquo;{bid.notes}&rdquo;
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 text-xs">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-slate-500">Requested: </span>
                      <span className="font-bold text-slate-800">{bid.requestedQuantity} {bid.unit}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Gross Total: </span>
                      <span className="font-black text-slate-900">{formatINR(bid.totalAmount)}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      {bid.paymentMode}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRejectBid(bid.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-red-50 hover:text-red-700 text-slate-600 font-semibold transition"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => onAcceptBid(bid)}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold shadow-sm hover:shadow transition flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accept & Lock Escrow</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Accepting a bid instantly creates an Escrow-secured delivery order.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 font-semibold text-slate-800 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
