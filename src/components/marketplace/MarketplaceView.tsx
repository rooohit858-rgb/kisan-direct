"use client";

import React, { useState, useMemo } from "react";
import { CropListing, CropCategory, EscrowOrder, BuyerBid } from "@/types";
import { ProduceCard } from "./ProduceCard";
import { TransparencyModal } from "./TransparencyModal";
import { CheckoutModal } from "./CheckoutModal";
import { BulkOrderModal } from "./BulkOrderModal";
import { 
  Search, 
  SlidersHorizontal, 
  Leaf, 
  ShieldCheck, 
  Building2, 
  ShoppingBag, 
  MapPin, 
  Sparkles,
  Percent,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface MarketplaceViewProps {
  listings: CropListing[];
  onOrderSuccess: (order: EscrowOrder) => void;
  onSubmitBid: (bid: BuyerBid) => void;
  onOpenAiEngine: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  listings,
  onOrderSuccess,
  onSubmitBid,
  onOpenAiEngine,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [maxDistance, setMaxDistance] = useState<number>(350);
  const [onlyOrganic, setOnlyOrganic] = useState<boolean>(false);
  const [selectedGrade, setSelectedGrade] = useState<string>("All");
  const [buyerMode, setBuyerMode] = useState<"household" | "bulk">("household");

  // Modals state
  const [transparencyCrop, setTransparencyCrop] = useState<CropListing | null>(null);
  const [checkoutCrop, setCheckoutCrop] = useState<CropListing | null>(null);
  const [bulkCrop, setBulkCrop] = useState<CropListing | null>(null);

  const categories = ["All", "Fruits", "Vegetables", "Grains", "Pulses", "Spices"];

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter((crop) => {
      // Search
      const matchesSearch = 
        crop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.farmer.district.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const matchesCategory = selectedCategory === "All" || crop.category === selectedCategory;

      // Distance
      const matchesDistance = crop.distanceKm <= maxDistance;

      // Organic
      const matchesOrganic = !onlyOrganic || crop.isOrganic;

      // Grade
      const matchesGrade = 
        selectedGrade === "All" || 
        (selectedGrade === "Grade A" && crop.qualityGrade.includes("Grade A")) ||
        (selectedGrade === "Grade B" && crop.qualityGrade.includes("Grade B"));

      return matchesSearch && matchesCategory && matchesDistance && matchesOrganic && matchesGrade;
    });
  }, [listings, searchQuery, selectedCategory, maxDistance, onlyOrganic, selectedGrade]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Consumer Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white p-6 sm:p-8 shadow-xl border border-blue-800/50">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Direct Farm-to-Fork
              </span>
              <span className="text-xs text-blue-200 font-semibold">
                ⭐ 100% Quality Inspected • Escrow Protected
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Buy Direct From Verified Farmers. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-amber-300 bg-clip-text text-transparent">
                Save 20-30% on Supermarket Prices.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-blue-200">
              Every rupee you spend sends <strong>78% directly to the farmer&apos;s bank account</strong> with zero middleman deductions.
            </p>
          </div>

          {/* Buyer mode toggle */}
          <div className="bg-slate-900/80 p-1.5 rounded-2xl border border-blue-500/40 flex flex-col gap-1 w-full sm:w-auto">
            <span className="text-[10px] font-bold text-blue-300 px-3 uppercase tracking-wider">Buyer Mode:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setBuyerMode("household")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  buyerMode === "household"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Family Basket</span>
              </button>

              <button
                onClick={() => setBuyerMode("bulk")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  buyerMode === "bulk"
                    ? "bg-amber-500 text-amber-950 shadow-md font-black"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Bulk Institutional</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filterable Search Bar & Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
        
        {/* Search row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by crop name (Alphonso Mango, Onion), district, or farmer..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50 focus:bg-white"
            />
          </div>

          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setMaxDistance(350);
              setOnlyOrganic(false);
              setSelectedGrade("All");
            }}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center gap-1 shrink-0"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          <span className="font-bold text-slate-700 uppercase tracking-wider shrink-0 mr-1 text-[11px]">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary filters row: Distance Radius, Organic, Quality Grade */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100 text-xs items-center">
          
          {/* Distance Radius */}
          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Distance Radius
              </span>
              <span className="font-bold text-blue-700">&le; {maxDistance} km</span>
            </div>
            <input
              type="range"
              min={20}
              max={500}
              step={10}
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Organic Jaivik Filter */}
          <div className="flex items-center">
            <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white cursor-pointer w-full">
              <input
                type="checkbox"
                checked={onlyOrganic}
                onChange={(e) => setOnlyOrganic(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Leaf className="w-3.5 h-3.5 text-green-600" />
                <span>Jaivik Bharat Organic Only</span>
              </div>
            </label>
          </div>

          {/* Quality Grade Filter */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 shrink-0">Quality Grade:</span>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-slate-50 focus:bg-white font-semibold text-slate-800"
              >
                <option value="All">All Grades (Grade A & B)</option>
                <option value="Grade A">Grade A (Export / Premium)</option>
                <option value="Grade B">Grade B (Standard Market)</option>
              </select>
            </div>
          </div>

        </div>

      </div>

      {/* Produce Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">
            Available Farm-Direct Produce ({filteredListings.length} results)
          </h2>
          <span className="text-xs text-slate-500">
            Sorted by freshness & farm distance
          </span>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-base font-bold text-slate-700">No produce matching your current filter criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try expanding your distance radius slider or selecting another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((crop) => (
              <ProduceCard
                key={crop.id}
                crop={crop}
                onOpenTransparency={(c) => setTransparencyCrop(c)}
                onBuyNow={(c) => setCheckoutCrop(c)}
                onPlaceBid={(c) => setBulkCrop(c)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <TransparencyModal
        isOpen={!!transparencyCrop}
        onClose={() => setTransparencyCrop(null)}
        crop={transparencyCrop}
      />

      <CheckoutModal
        isOpen={!!checkoutCrop}
        onClose={() => setCheckoutCrop(null)}
        crop={checkoutCrop}
        onOrderSuccess={onOrderSuccess}
      />

      <BulkOrderModal
        isOpen={!!bulkCrop}
        onClose={() => setBulkCrop(null)}
        crop={bulkCrop}
        onSubmitBid={onSubmitBid}
      />

    </div>
  );
};
