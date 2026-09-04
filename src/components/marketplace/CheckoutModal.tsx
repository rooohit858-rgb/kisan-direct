"use client";

import React, { useState } from "react";
import { CropListing, EscrowOrder } from "@/types";
import { 
  X, 
  Lock, 
  ShieldCheck, 
  Tractor, 
  Truck, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Building2,
  Sparkles,
  MapPin
} from "lucide-react";
import { formatINR } from "@/lib/utils";
import confetti from "canvas-confetti";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  crop: CropListing | null;
  onOrderSuccess: (order: EscrowOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  crop,
  onOrderSuccess,
}) => {
  const [quantity, setQuantity] = useState(crop?.minOrderQuantity || 10);
  const [buyerName, setBuyerName] = useState("Aarav Sharma");
  const [buyerPhone, setBuyerPhone] = useState("+91 98201 55432");
  const [deliveryAddress, setDeliveryAddress] = useState("Flat 402, Green Meadows, Andheri West, Mumbai, 400053");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !crop) return null;

  const totalAmount = crop.directPricePerUnit * quantity;
  const farmerShare = Math.round(totalAmount * 0.78);
  const logisticsShare = Math.round(totalAmount * 0.12);
  const platformShare = totalAmount - farmerShare - logisticsShare;

  const handlePayAndLockEscrow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if not supported
      }

      const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
      const newOrder: EscrowOrder = {
        id: `ord-${Date.now()}`,
        orderNumber: `KD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        listingId: crop.id,
        cropTitle: crop.title,
        cropImage: crop.image,
        quantity,
        unit: crop.unit,
        pricePerUnit: crop.directPricePerUnit,
        totalAmount,
        farmerId: crop.farmer.id,
        farmerName: crop.farmer.name,
        farmerLocation: `${crop.farmer.district}, ${crop.farmer.state}`,
        farmerUpi: `${crop.farmer.name.toLowerCase().replace(/\s+/g, ".")}@okaxis`,
        buyerName,
        buyerType: "Individual Consumer Household",
        buyerPhone,
        buyerAddress: deliveryAddress,
        orderDate: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        currentStep: 1,
        escrowStatus: "Funds Held in Escrow",
        milestones: [
          {
            step: 1,
            title: "Order Placed & Escrow Vault Locked",
            description: `₹${totalAmount.toLocaleString()} safely locked in RBI-compliant escrow vault.`,
            completed: true,
            timestamp: "Just now",
            iconName: "Lock",
          },
          {
            step: 2,
            title: "Farm-Gate Quality & IoT Assay Check",
            description: `Quality inspector dispatching to ${crop.farmer.village} farm gate.`,
            completed: false,
            timestamp: "Scheduled within 2 hrs",
            iconName: "CheckCircle",
          },
          {
            step: 3,
            title: "Cold-Chain Reefer Dispatch (GPS Live)",
            description: "Carrier will load harvest with real-time temperature tracking.",
            completed: false,
            iconName: "Truck",
          },
          {
            step: 4,
            title: "Delivery Handover & OTP Payout Release",
            description: `Provide OTP #${generatedOtp} on delivery to release ₹${farmerShare.toLocaleString()} directly to farmer.`,
            completed: false,
            iconName: "BadgeCheck",
          },
        ],
        qualityAssay: {
          inspectorName: "Mandi Board Certified Assayer",
          inspectorBadge: "Assay Seal #INSP-882",
          moisturePercent: crop.moisturePercent,
          gradeCertified: crop.qualityGrade,
          chemicalResiduePpm: 0.01,
          passedDate: "Pending inspection",
        },
        logistics: {
          vehicleName: crop.coldStorageRequired ? "Tata Ace Reefer (-4°C to 10°C)" : "Eco Farm Logistics Van",
          vehicleNo: "MH-08-AG-4412",
          driverPhone: "+91 97655 43210",
          currentTempCelsius: 7.2,
          optimalTempCelsius: 7.0,
          gpsCoordinates: `${crop.farmer.district} Farm Gate`,
          estimatedArrival: "Tomorrow by 11:00 AM",
        },
        deliveryOtp: generatedOtp,
        isFundsReleased: false,
        transparencyScorecard: {
          farmerAmount: farmerShare,
          logisticsAmount: logisticsShare,
          platformAmount: platformShare,
          middlemanCost: 0,
        },
      };

      onOrderSuccess(newOrder);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/20">
              <Lock className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Secure Escrow Checkout</h2>
              <p className="text-xs text-emerald-100">Direct Payment Protection • Zero Middleman Cut</p>
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
        <form onSubmit={handlePayAndLockEscrow} className="p-6 space-y-6 max-h-[78vh] overflow-y-auto text-xs">
          
          {/* Item summary */}
          <div className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <img 
              src={crop.image} 
              alt={crop.title} 
              className="w-16 h-16 rounded-lg object-cover border border-slate-200" 
            />
            <div className="flex-1">
              <h4 className="font-bold text-sm text-slate-900">{crop.title}</h4>
              <p className="text-slate-500 mt-0.5">Farmer: <strong>{crop.farmer.name}</strong> ({crop.farmer.district}, {crop.farmer.state})</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-black text-emerald-800 text-sm">
                  {formatINR(crop.directPricePerUnit)}/{crop.unit}
                </span>
                <span className="text-slate-400 line-through text-[11px]">
                  Supermarket: {formatINR(crop.retailSupermarketPrice)}/{crop.unit}
                </span>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Order Quantity ({crop.unit}) *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  min={1}
                  max={crop.quantity}
                  className="w-full text-sm font-bold border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
                <span className="font-bold text-slate-600 shrink-0">{crop.unit}</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Max available from this harvest: {crop.quantity} {crop.unit}
              </span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Buyer Contact Phone *
              </label>
              <input
                type="text"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Delivery Destination Address *
            </label>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              rows={2}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Escrow Funding Method:
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition ${
                  paymentMethod === "upi"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <span>UPI (GPay / PhonePe)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition ${
                  paymentMethod === "card"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span>Debit / Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("netbanking")}
                className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition ${
                  paymentMethod === "netbanking"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Building2 className="w-5 h-5 text-purple-600" />
                <span>NetBanking / NEFT</span>
              </button>
            </div>
          </div>

          {/* Escrow Distribution Summary Card */}
          <div className="p-4 bg-emerald-50/90 rounded-xl border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-950 pb-2 border-b border-emerald-200">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                100% Escrow Split Breakdown
              </span>
              <span className="text-emerald-800">Total: {formatINR(totalAmount)}</span>
            </div>

            <div className="space-y-1.5 text-slate-700 text-xs">
              <div className="flex justify-between">
                <span>🌾 Farmer Payout (78% direct):</span>
                <span className="font-bold text-emerald-800">{formatINR(farmerShare)}</span>
              </div>
              <div className="flex justify-between">
                <span>🚚 Cold-Chain Reefer Logistics (12%):</span>
                <span className="font-bold text-blue-800">{formatINR(logisticsShare)}</span>
              </div>
              <div className="flex justify-between">
                <span>🛡️ Quality Assay & Escrow Platform (10%):</span>
                <span className="font-bold text-amber-800">{formatINR(platformShare)}</span>
              </div>
              <div className="flex justify-between text-slate-400 line-through">
                <span>❌ Intermediary Middleman Markup:</span>
                <span>₹0.00</span>
              </div>
            </div>

            <p className="text-[11px] text-emerald-800 bg-white p-2 rounded border border-emerald-200 mt-2">
              🔒 <strong>Escrow Guarantee:</strong> Your ₹{totalAmount.toLocaleString()} is locked in an RBI-compliant escrow vault. It is only released to Farmer {crop.farmer.name} when you confirm quality and provide the secret 4-digit delivery OTP at your doorstep.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Locking Escrow Vault...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>Lock {formatINR(totalAmount)} in Escrow</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
