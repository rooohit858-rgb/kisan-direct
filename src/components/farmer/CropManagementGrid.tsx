"use client";

import React from "react";
import { CropListing } from "@/types";
import { 
  TrendingUp, 
  Leaf, 
  ThermometerSnowflake, 
  CheckCircle2, 
  MessageSquare, 
  Truck, 
  Eye, 
  ShieldCheck, 
  Award,
  Sparkles
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface CropManagementGridProps {
  listings: CropListing[];
  onOpenBids: (listing: CropListing) => void;
  onOpenColdStorage: (listing: CropListing) => void;
}

export const CropManagementGrid: React.FC<CropManagementGridProps> = ({
  listings,
  onOpenBids,
  onOpenColdStorage,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Your Active Farm Produce Listings</h3>
          <p className="text-xs text-slate-500">Live AI market pricing, buyer bids, and cold chain logistics</p>
        </div>
        <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
          {listings.length} Crops Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {listings.map((crop) => {
          const profitBoost = Math.round(
            ((crop.directPricePerUnit - crop.apmcBenchmarkPrice) / crop.apmcBenchmarkPrice) * 100
          );

          return (
            <div
              key={crop.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Image & Badges */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={crop.image}
                  alt={crop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Top badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                  <span className="bg-emerald-900/90 backdrop-blur text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    {crop.qualityGrade.split(" ")[0]} {crop.qualityGrade.split(" ")[1]}
                  </span>
                  {crop.isOrganic && (
                    <span className="bg-green-600/95 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                      <Leaf className="w-2.5 h-2.5" />
                      Jaivik Organic
                    </span>
                  )}
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-900" />
                    +{profitBoost}% Profit
                  </span>
                </div>

                {/* Title and bottom overlay */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <h4 className="font-bold text-sm leading-snug drop-shadow-md">{crop.title}</h4>
                  <p className="text-[11px] text-emerald-200 font-medium drop-shadow">
                    Available: {crop.quantity} {crop.unit} • Harvested: {crop.harvestDate}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                
                {/* Price & Benchmark Box */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">Your Direct Selling Price:</span>
                    <span className="text-base font-black text-emerald-800">
                      {formatINR(crop.directPricePerUnit)}/{crop.unit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                    <span className="text-[11px] text-slate-500">APMC Mandi Rate:</span>
                    <span className="font-semibold text-slate-600 line-through">
                      {formatINR(crop.apmcBenchmarkPrice)}/{crop.unit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">Supermarket Retail:</span>
                    <span className="font-semibold text-amber-800">
                      {formatINR(crop.retailSupermarketPrice)}/{crop.unit}
                    </span>
                  </div>
                </div>

                {/* Quality & Cold chain indicators */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5 bg-emerald-50/80 px-2 py-1 rounded border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Moisture: <strong>{crop.moisturePercent}%</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-blue-50/80 px-2 py-1 rounded border border-blue-100">
                    <ThermometerSnowflake className="w-3 h-3 text-blue-600 shrink-0" />
                    <span>{crop.coldStorageRequired ? "Reefer Req." : "Standard Amb."}</span>
                  </div>
                </div>

                {/* Action Buttons: Bids & Cold Chain */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onOpenBids(crop)}
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Buyer Bids ({crop.activeBidsCount})</span>
                  </button>

                  <button
                    onClick={() => onOpenColdStorage(crop)}
                    className="py-2 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 flex items-center justify-center gap-1.5 transition"
                    title="Book Cold Chain Reefer"
                  >
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Cold Fleet</span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
