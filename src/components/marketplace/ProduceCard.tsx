"use client";

import React from "react";
import { CropListing } from "@/types";
import { 
  Leaf, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Percent, 
  ShoppingCart, 
  Building2,
  Calendar,
  Lock,
  ArrowUpRight
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface ProduceCardProps {
  crop: CropListing;
  onOpenTransparency: (crop: CropListing) => void;
  onBuyNow: (crop: CropListing) => void;
  onPlaceBid: (crop: CropListing) => void;
}

export const ProduceCard: React.FC<ProduceCardProps> = ({
  crop,
  onOpenTransparency,
  onBuyNow,
  onPlaceBid,
}) => {
  const savingsVsSupermarket = Math.round(
    ((crop.retailSupermarketPrice - crop.directPricePerUnit) / crop.retailSupermarketPrice) * 100
  );

  const farmerGainVsMandi = Math.round(
    ((crop.directPricePerUnit - crop.apmcBenchmarkPrice) / crop.apmcBenchmarkPrice) * 100
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      
      {/* Image & Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={crop.image}
          alt={crop.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Top left badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          <span className="bg-emerald-900/90 backdrop-blur text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {crop.qualityGrade.split(" ")[0]} {crop.qualityGrade.split(" ")[1]}
          </span>

          {crop.isOrganic && (
            <span className="bg-green-700/90 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
              <Leaf className="w-2.5 h-2.5" />
              Jaivik Organic
            </span>
          )}
        </div>

        {/* Top right distance */}
        <div className="absolute top-2.5 right-2.5">
          <span className="bg-slate-900/80 backdrop-blur text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-amber-400" />
            {crop.distanceKm} km away
          </span>
        </div>

        {/* Bottom Farmer & Title Overlay */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-semibold mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{crop.farmer.name} • {crop.farmer.district}</span>
          </div>
          <h3 className="font-bold text-sm leading-snug drop-shadow-md">{crop.title}</h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        
        {/* Harvest Date & Quality Tag */}
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            Harvested: {crop.harvestDate}
          </span>
          <span className="font-semibold text-slate-700">
            Stock: {crop.quantity} {crop.unit}
          </span>
        </div>

        {/* Price & Savings Box */}
        <div className="p-3 bg-gradient-to-br from-emerald-50/80 to-slate-50 rounded-xl border border-emerald-100 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Direct Farm Price:</span>
            <span className="text-lg font-black text-emerald-800">
              {formatINR(crop.directPricePerUnit)}/{crop.unit}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
            <span className="text-[11px] text-slate-400 line-through">
              Supermarket: {formatINR(crop.retailSupermarketPrice)}
            </span>
            <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
              Save {savingsVsSupermarket}% vs Supermarkets
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-emerald-700 font-bold">
            <span>APMC Mandi: {formatINR(crop.apmcBenchmarkPrice)}/{crop.unit}</span>
            <span className="flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3 text-emerald-600" />
              Farmer gets +{farmerGainVsMandi}%
            </span>
          </div>
        </div>

        {/* Transparency Scorecard Button */}
        <button
          onClick={() => onOpenTransparency(crop)}
          className="w-full py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-[11px] font-bold border border-slate-200 hover:border-emerald-300 flex items-center justify-center gap-1.5 transition"
        >
          <Percent className="w-3 h-3 text-emerald-600" />
          <span>View 100% Transparency Scorecard</span>
        </button>

        {/* Action Buttons: Buy Now & Place Bid */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={() => onBuyNow(crop)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-xs font-bold shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 transition"
          >
            <Lock className="w-3.5 h-3.5 text-amber-300" />
            <span>Buy via Escrow</span>
          </button>

          <button
            onClick={() => onPlaceBid(crop)}
            className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 flex items-center justify-center gap-1 transition"
            title="Institutional Bulk Bid (500kg+)"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Bulk Bid</span>
          </button>
        </div>

      </div>

    </div>
  );
};
