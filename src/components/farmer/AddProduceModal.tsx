"use client";

import React, { useState } from "react";
import { CropListing, CropCategory, QualityGrade } from "@/types";
import { 
  X, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  TrendingUp, 
  Leaf, 
  ThermometerSnowflake, 
  ShieldCheck,
  Calculator,
  Image as ImageIcon
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface AddProduceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (newListing: CropListing) => void;
}

export const AddProduceModal: React.FC<AddProduceModalProps> = ({
  isOpen,
  onClose,
  onAddListing,
}) => {
  const [cropName, setCropName] = useState("Ratnagiri Alphonso Mango");
  const [variety, setVariety] = useState("Devgad GI Certified");
  const [category, setCategory] = useState<CropCategory>("Fruits");
  const [quantity, setQuantity] = useState(250);
  const [unit, setUnit] = useState<"kg" | "quintal" | "crate" | "dozen">("dozen");
  const [qualityGrade, setQualityGrade] = useState<QualityGrade>("Grade A (Export/Premium)");
  const [harvestDate, setHarvestDate] = useState("2026-08-31");
  const [shelfLifeDays, setShelfLifeDays] = useState(15);
  const [isOrganic, setIsOrganic] = useState(true);
  const [coldStorageRequired, setColdStorageRequired] = useState(true);
  const [description, setDescription] = useState("Naturally ripened Grade A crop with rich aroma and uniform export quality.");
  const [selectedImage, setSelectedImage] = useState("https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800");

  // AI Pricing Toggle & State
  const [useAiPricing, setUseAiPricing] = useState(true);
  const [apmcBenchmark, setApmcBenchmark] = useState(420);
  const [aiCalculatedPrice, setAiCalculatedPrice] = useState(650);
  const [customPrice, setCustomPrice] = useState(650);

  // AI Quality Inspection scan simulation
  const [isScanningPhoto, setIsScanningPhoto] = useState(false);
  const [scanResult, setScanResult] = useState<{
    moisture: number;
    grade: string;
    brix: number;
    defectRate: number;
    purityScore: number;
  } | null>({
    moisture: 82.5,
    grade: "Grade A Export",
    brix: 18.2,
    defectRate: 1.2,
    purityScore: 98,
  });

  const sampleImages = [
    { label: "Mangoes", url: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800" },
    { label: "Onions", url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=800" },
    { label: "Wheat", url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800" },
    { label: "Apples", url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=800" },
    { label: "Chillies", url: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&q=80&w=800" },
    { label: "Potatoes", url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800" },
  ];

  if (!isOpen) return null;

  const handleSimulateAiScan = () => {
    setIsScanningPhoto(true);
    setTimeout(() => {
      setIsScanningPhoto(false);
      setScanResult({
        moisture: +(Math.random() * 5 + 78).toFixed(1),
        grade: qualityGrade.includes("Grade A") ? "Grade A Export" : "Grade B Standard",
        brix: +(Math.random() * 4 + 15).toFixed(1),
        defectRate: +(Math.random() * 1.5 + 0.5).toFixed(1),
        purityScore: Math.floor(Math.random() * 5 + 95),
      });
    }, 900);
  };

  const handleCropChange = (crop: string) => {
    setCropName(crop);
    if (crop.includes("Mango")) {
      setApmcBenchmark(420);
      setAiCalculatedPrice(650);
      setCustomPrice(650);
      setUnit("dozen");
      setCategory("Fruits");
      setSelectedImage("https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800");
    } else if (crop.includes("Onion")) {
      setApmcBenchmark(18);
      setAiCalculatedPrice(28);
      setCustomPrice(28);
      setUnit("kg");
      setCategory("Vegetables");
      setSelectedImage("https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=800");
    } else if (crop.includes("Wheat")) {
      setApmcBenchmark(2275);
      setAiCalculatedPrice(2900);
      setCustomPrice(2900);
      setUnit("quintal");
      setCategory("Grains");
      setSelectedImage("https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800");
    } else if (crop.includes("Apple")) {
      setApmcBenchmark(75);
      setAiCalculatedPrice(115);
      setCustomPrice(115);
      setUnit("kg");
      setCategory("Fruits");
      setSelectedImage("https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=800");
    } else {
      setApmcBenchmark(35);
      setAiCalculatedPrice(50);
      setCustomPrice(50);
      setUnit("kg");
      setCategory("Vegetables");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPrice = useAiPricing ? aiCalculatedPrice : customPrice;
    const newListing: CropListing = {
      id: `crop-${Date.now()}`,
      title: `${variety} ${cropName}`,
      cropName,
      variety,
      category,
      description,
      image: selectedImage,
      farmer: {
        id: "farmer-101",
        name: "Dnyaneshwar Patil",
        phone: "+91 98224 51920",
        kisanCardId: "MH-RTN-2024-8842",
        village: "Nate Village",
        district: "Ratnagiri",
        state: "Maharashtra",
        rating: 4.9,
        totalSoldQuintals: 340,
        joinedYear: 2023,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        isKisanCreditVerified: true,
        isJaivikBharatCertified: isOrganic,
        isGiTagged: true,
      },
      harvestDate,
      shelfLifeDays,
      quantity,
      minOrderQuantity: unit === "quintal" ? 1 : 10,
      unit,
      directPricePerUnit: finalPrice,
      apmcBenchmarkPrice: apmcBenchmark,
      retailSupermarketPrice: Math.round(finalPrice * 1.45),
      aiRecommendedPrice: aiCalculatedPrice,
      qualityGrade,
      moisturePercent: scanResult?.moisture || 82.5,
      pesticideResidueSafe: true,
      coldStorageRequired,
      activeBidsCount: 0,
      inEscrowOrdersCount: 0,
      distanceKm: 32,
      isOrganic,
      giTagTitle: isOrganic ? "Jaivik Bharat Certified Organic" : undefined,
      transparencyBreakdown: {
        farmerSharePercent: 78,
        logisticsSharePercent: 12,
        platformSharePercent: 10,
        middlemenPercent: 0,
      },
    };

    onAddListing(newListing);
    onClose();
  };

  const finalSellingPrice = useAiPricing ? aiCalculatedPrice : customPrice;
  const profitBoost = Math.round(((finalSellingPrice - apmcBenchmark) / apmcBenchmark) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/20">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">List Fresh Farm Produce</h2>
              <p className="text-xs text-emerald-100">AI Quality Grading & Dynamic Market Benchmark</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Produce Selection & Variety */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Crop / Commodity *
              </label>
              <select
                value={cropName}
                onChange={(e) => handleCropChange(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Ratnagiri Alphonso Mango">Ratnagiri Alphonso Mango (हापूस)</option>
                <option value="Nashik Red Onion">Nashik Red Onion (कांदा)</option>
                <option value="Punjab Sharbati Wheat">Punjab Sharbati Wheat (गेहूं)</option>
                <option value="Himachal Royal Apple">Himachal Royal Delicious Apple (सेब)</option>
                <option value="Guntur Fiery Chilli">Guntur S334 Red Chilli (मिर्च)</option>
                <option value="Kufri Jyoti Potato">Kufri Jyoti Potato (आलू)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Variety / GI Specialty *
              </label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="e.g. Devgad GI Tagged / Garwa Red"
                required
              />
            </div>
          </div>

          {/* Category & Quantity Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CropCategory)}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Grains">Grains</option>
                <option value="Pulses">Pulses</option>
                <option value="Spices">Spices</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quantity Available *
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Unit *
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="kg">kg (Kilogram)</option>
                <option value="quintal">quintal (100 kg)</option>
                <option value="dozen">dozen</option>
                <option value="crate">crate (20 kg)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quality Grade
              </label>
              <select
                value={qualityGrade}
                onChange={(e) => setQualityGrade(e.target.value as QualityGrade)}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-emerald-800"
              >
                <option value="Grade A (Export/Premium)">Grade A (Export)</option>
                <option value="Grade B (Standard Market)">Grade B (Domestic)</option>
                <option value="Grade C (Processing/Industrial)">Grade C (Processing)</option>
              </select>
            </div>
          </div>

          {/* AI Image Assay Scan & Photo Preview */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>Crop Photo & AI Quality Assay Scanner</span>
              </div>
              <button
                type="button"
                onClick={handleSimulateAiScan}
                disabled={isScanningPhoto}
                className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold px-3 py-1 rounded-md border border-emerald-300 flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{isScanningPhoto ? "AI Analyzing Pixels..." : "Run AI Visual Assay"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="relative rounded-lg overflow-hidden border-2 border-dashed border-emerald-300 bg-white aspect-video sm:aspect-square flex items-center justify-center">
                <img 
                  src={selectedImage} 
                  alt="Crop preview" 
                  className="w-full h-full object-cover" 
                />
                {isScanningPhoto && (
                  <div className="absolute inset-0 bg-emerald-950/70 flex flex-col items-center justify-center text-white text-xs gap-2">
                    <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing Color, Texture & Defect %</span>
                  </div>
                )}
              </div>

              {/* Sample Photo selector */}
              <div className="sm:col-span-2 space-y-3">
                <div>
                  <span className="text-xs text-slate-600 block mb-1 font-medium">Quick Photo Selector:</span>
                  <div className="flex flex-wrap gap-2">
                    {sampleImages.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedImage(s.url);
                          handleSimulateAiScan();
                        }}
                        className={`text-xs px-2.5 py-1 rounded-md border transition ${
                          selectedImage === s.url
                            ? "bg-emerald-600 text-white border-emerald-700 font-semibold"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scan Result Metrics */}
                {scanResult && (
                  <div className="grid grid-cols-2 gap-2 bg-emerald-50/80 p-3 rounded-lg border border-emerald-200 text-xs">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-slate-600">Assay Grade:</span>
                      <span className="font-bold text-emerald-800">{scanResult.grade}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-slate-600">Moisture Index:</span>
                      <span className="font-bold text-slate-800">{scanResult.moisture}%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-slate-600">Visual Quality:</span>
                      <span className="font-bold text-emerald-700">{scanResult.purityScore}% Pure</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-slate-600">Defect Level:</span>
                      <span className="font-bold text-slate-800">&lt; {scanResult.defectRate}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Dynamic Price Recommendation Engine Card */}
          <div className="p-4 rounded-xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50 via-white to-amber-50 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-700" />
                <span className="text-sm font-bold text-emerald-950">AI Dynamic Fair-Price Recommendation</span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-xs font-semibold text-slate-600">Use AI Auto-Pricing</span>
                <input 
                  type="checkbox"
                  checked={useAiPricing}
                  onChange={(e) => setUseAiPricing(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Local APMC Mandi Rate</span>
                <span className="text-base font-bold text-slate-700">{formatINR(apmcBenchmark)}/{unit}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Govt benchmark base</span>
              </div>

              <div className="p-3 bg-emerald-100/70 rounded-lg border border-emerald-300">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-900">AI Suggested Price</span>
                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded">Recommended</span>
                </div>
                <span className="text-lg font-black text-emerald-800">{formatINR(aiCalculatedPrice)}/{unit}</span>
                <span className="text-[10px] text-emerald-700 font-bold block mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  +{profitBoost}% Higher Profit vs Mandi
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Your Custom Price ({unit})</span>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => {
                    setCustomPrice(Number(e.target.value));
                    setUseAiPricing(false);
                  }}
                  className="w-full text-base font-bold text-slate-800 border-b border-slate-300 focus:border-emerald-600 focus:outline-none mt-0.5 bg-transparent"
                />
                <span className="text-[10px] text-slate-500 block mt-0.5">Manual override</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 bg-white/80 p-2 rounded border border-slate-200">
              💡 <strong>AI Algorithm Insight:</strong> Factored Lasalgaon/Vashi terminal arrival volumes, high holiday demand, and solar storage index. Selling at <strong>{formatINR(finalSellingPrice)}/{unit}</strong> gives you an extra <strong>{formatINR(finalSellingPrice - apmcBenchmark)}</strong> per {unit} directly to your bank account!
            </p>
          </div>

          {/* Quality & Storage toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer">
              <input
                type="checkbox"
                checked={isOrganic}
                onChange={(e) => setIsOrganic(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
              <div>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-green-600" />
                  <span>Jaivik Bharat Certified Organic</span>
                </div>
                <p className="text-[11px] text-slate-500">Zero synthetic pesticides, 100% natural manure</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer">
              <input
                type="checkbox"
                checked={coldStorageRequired}
                onChange={(e) => setColdStorageRequired(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <div>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ThermometerSnowflake className="w-3.5 h-3.5 text-blue-600" />
                  <span>Requires Cold-Chain Logistics</span>
                </div>
                <p className="text-[11px] text-slate-500">Temperature-controlled Reefer vehicle auto-assigned</p>
              </div>
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Harvest Notes & Details
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Describe ripening method, soil type, and packing crates..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Publish Harvest to Marketplace</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
