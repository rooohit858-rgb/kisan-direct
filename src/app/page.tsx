"use client";

import React, { useState } from "react";
import { UserRole, CropListing, BuyerBid, EscrowOrder, ColdStorageVehicle, MandiRateBenchmark } from "@/types";
import { initialCropsData } from "@/data/cropsData";
import { initialMandiRates } from "@/data/mandiRates";
import { initialOrdersData } from "@/data/mockOrders";
import { initialBidsData } from "@/data/mockBids";

import { Header } from "@/components/layout/Header";
import { MandiTicker } from "@/components/layout/MandiTicker";
import { Footer } from "@/components/layout/Footer";

import { FarmerDashboard } from "@/components/farmer/FarmerDashboard";
import { AddProduceModal } from "@/components/farmer/AddProduceModal";
import { MarketplaceView } from "@/components/marketplace/MarketplaceView";
import { PricingForecastingEngine } from "@/components/ai-engine/PricingForecastingEngine";
import { EscrowTrustTracker } from "@/components/escrow/EscrowTrustTracker";
import { MandiInspectorView } from "@/components/admin/MandiInspectorView";

import { 
  Tractor, 
  ShoppingBag, 
  Sparkles, 
  Lock, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  X,
  Layers,
  ArrowRight
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export default function Home() {
  // Global State
  const [currentRole, setCurrentRole] = useState<UserRole>("consumer");
  const [activeTab, setActiveTab] = useState<"marketplace" | "farmer" | "ai-pricing" | "escrow" | "inspector">("marketplace");
  
  const [crops, setCrops] = useState<CropListing[]>(initialCropsData);
  const [mandiRates, setMandiRates] = useState<MandiRateBenchmark[]>(initialMandiRates);
  const [orders, setOrders] = useState<EscrowOrder[]>(initialOrdersData);
  const [bids, setBids] = useState<BuyerBid[]>(initialBidsData);

  // Global Toast State
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type?: "success" | "info" } | null>(null);

  const showToast = (title: string, desc: string, type: "success" | "info" = "success") => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Role change handler
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    if (newRole === "farmer") {
      setActiveTab("farmer");
      showToast("Switched to Farmer Mode", "Experience farmer KPIs, active listings, and direct buyer bids.");
    } else if (newRole === "consumer") {
      setActiveTab("marketplace");
      showToast("Switched to Buyer Mode", "Browse farm-direct produce with 100% price transparency and escrow protection.");
    } else if (newRole === "inspector") {
      setActiveTab("inspector");
      showToast("Switched to Mandi Inspector Mode", "Audit farm-gate quality assays and verify APMC market benchmarks.");
    }
  };

  // Handlers for Farmer actions
  const handleAddListing = (newListing: CropListing) => {
    setCrops((prev) => [newListing, ...prev]);
    showToast("Harvest Listed Successfully!", `${newListing.title} is now live with AI dynamic pricing (${formatINR(newListing.directPricePerUnit)}/${newListing.unit}).`);
  };

  const handleAcceptBid = (bid: BuyerBid) => {
    // Mark bid accepted
    setBids((prev) =>
      prev.map((b) => (b.id === bid.id ? { ...b, status: "accepted" } : b))
    );

    // Create escrow order
    const matchingCrop = crops.find((c) => c.id === bid.listingId);
    const orderTotal = bid.totalAmount;
    const farmerShare = Math.round(orderTotal * 0.78);
    const logisticsShare = Math.round(orderTotal * 0.12);
    const platformShare = orderTotal - farmerShare - logisticsShare;

    const newOrder: EscrowOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `KD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      listingId: bid.listingId,
      cropTitle: bid.cropTitle,
      cropImage: matchingCrop?.image || "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800",
      quantity: bid.requestedQuantity,
      unit: bid.unit,
      pricePerUnit: bid.offeredPricePerUnit,
      totalAmount: orderTotal,
      farmerId: "farmer-101",
      farmerName: "Dnyaneshwar Patil",
      farmerLocation: "Ratnagiri, Maharashtra",
      farmerUpi: "dnyaneshwar.patil@okhdfcbank",
      buyerName: bid.buyerName,
      buyerType: bid.buyerType,
      buyerPhone: "+91 98200 11987",
      buyerAddress: "Commercial Delivery Hub",
      orderDate: "Just now",
      currentStep: 1,
      escrowStatus: "Funds Held in Escrow",
      milestones: [
        {
          step: 1,
          title: "Order Placed & Escrow Vault Locked",
          description: `Buyer locked ${formatINR(orderTotal)} into smart escrow.`,
          completed: true,
          timestamp: "Just now",
          iconName: "Lock",
        },
        {
          step: 2,
          title: "Farm-Gate Quality & IoT Assay Certified",
          description: "Inspector assigned for moisture & grade assay verification.",
          completed: false,
          iconName: "CheckCircle",
        },
        {
          step: 3,
          title: "Cold-Chain Reefer Dispatch (GPS Live)",
          description: "Carrier preparing temperature-controlled route.",
          completed: false,
          iconName: "Truck",
        },
        {
          step: 4,
          title: "Delivery Handover & OTP Payout Release",
          description: `Deliver harvest to receive OTP and release ${formatINR(farmerShare)} directly to bank account.`,
          completed: false,
          iconName: "BadgeCheck",
        },
      ],
      qualityAssay: {
        inspectorName: "Govt Certified Quality Assayer",
        inspectorBadge: "Assay Seal #MH-INSP-882",
        moisturePercent: matchingCrop?.moisturePercent || 12.0,
        gradeCertified: matchingCrop?.qualityGrade || "Grade A",
        chemicalResiduePpm: 0.01,
        passedDate: "Scheduled",
      },
      logistics: {
        vehicleName: "Tata Ace Reefer (-4°C to 10°C)",
        vehicleNo: "MH-08-AG-4412",
        driverPhone: "+91 97655 43210",
        currentTempCelsius: 6.8,
        optimalTempCelsius: 7.0,
        gpsCoordinates: "Ratnagiri Farm Gate",
        estimatedArrival: "Tomorrow, 10:00 AM",
      },
      deliveryOtp: Math.floor(1000 + Math.random() * 9000).toString(),
      isFundsReleased: false,
      transparencyScorecard: {
        farmerAmount: farmerShare,
        logisticsAmount: logisticsShare,
        platformAmount: platformShare,
        middlemanCost: 0,
      },
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast("Buyer Bid Accepted & Escrow Created!", `Contract locked for ${formatINR(orderTotal)}. Escrow order #${newOrder.orderNumber} initiated.`);
  };

  const handleRejectBid = (bidId: string) => {
    setBids((prev) => prev.filter((b) => b.id !== bidId));
    showToast("Bid Declined", "Buyer has been notified.", "info");
  };

  const handleBookVehicle = (vehicle: ColdStorageVehicle, distanceKm: number) => {
    showToast("Cold Fleet Confirmed!", `${vehicle.name} (${vehicle.vehicleNumber}) scheduled for pickup. Driver: ${vehicle.driverName}.`);
  };

  // Handlers for Buyer actions
  const handleBuyerOrderSuccess = (newOrder: EscrowOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    showToast("Escrow Payment Secured!", `₹${newOrder.totalAmount.toLocaleString()} funded into smart vault. Delivery OTP: #${newOrder.deliveryOtp}`);
  };

  const handleBuyerSubmitBid = (newBid: BuyerBid) => {
    setBids((prev) => [newBid, ...prev]);
    showToast("Institutional Bid Submitted!", `Offer of ${formatINR(newBid.offeredPricePerUnit)}/${newBid.unit} sent directly to farmer.`);
  };

  // Handler for Escrow Updates
  const handleUpdateOrder = (updatedOrder: EscrowOrder) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
    );
    if (updatedOrder.isFundsReleased) {
      showToast("₹ Payout Released to Farmer!", `₹${updatedOrder.transparencyScorecard.farmerAmount.toLocaleString()} transferred via UPI/DBT to ${updatedOrder.farmerName}.`);
    } else {
      showToast("Shipment Status Updated", `Order #${updatedOrder.orderNumber} advanced to '${updatedOrder.escrowStatus}'.`);
    }
  };

  // Handler for Mandi Rate edit
  const handleUpdateMandiRate = (rateId: string, newRate: number) => {
    setMandiRates((prev) =>
      prev.map((r) => (r.id === rateId ? { ...r, apmcModalPrice: newRate } : r))
    );
    showToast("APMC Benchmark Synced", `Modal rate updated to ₹${newRate}.`);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 font-sans">
      
      {/* Global Navigation Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeOrdersCount={orders.filter((o) => !o.isFundsReleased).length}
        onOpenOrders={() => setActiveTab("escrow")}
      />

      {/* Live APMC Mandi Ticker */}
      <MandiTicker rates={mandiRates} />

      {/* Secondary Feature Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-[73px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-2 gap-2 text-xs scrollbar-none">
            
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setActiveTab("marketplace");
                  setCurrentRole("consumer");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap ${
                  activeTab === "marketplace"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
                <span>Marketplace</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("farmer");
                  setCurrentRole("farmer");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap ${
                  activeTab === "farmer"
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-emerald-800"
                }`}
              >
                <Tractor className="w-3.5 h-3.5 text-emerald-400" />
                <span>Farmer Dashboard</span>
                <span className="bg-emerald-600/60 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {crops.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("ai-pricing")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap ${
                  activeTab === "ai-pricing"
                    ? "bg-gradient-to-r from-emerald-800 to-green-700 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-emerald-800"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Price Forecaster</span>
                <span className="bg-amber-400 text-amber-950 text-[9px] font-black px-1.5 py-0.2 rounded">
                  Recharts AI
                </span>
              </button>

              <button
                onClick={() => setActiveTab("escrow")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap ${
                  activeTab === "escrow"
                    ? "bg-blue-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-blue-900"
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>Escrow Trust Tracker</span>
                <span className="bg-blue-700 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("inspector");
                  setCurrentRole("inspector");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap ${
                  activeTab === "inspector"
                    ? "bg-purple-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-purple-900"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Mandi Inspection Hub</span>
              </button>
            </div>

            {/* Quick SIH Hackathon Persona guide badge */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-500 font-medium shrink-0">
              <span>Persona Active:</span>
              <span className="font-bold text-slate-800 uppercase bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {currentRole}
              </span>
            </div>

          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "marketplace" && (
          <MarketplaceView
            listings={crops}
            onOrderSuccess={handleBuyerOrderSuccess}
            onSubmitBid={handleBuyerSubmitBid}
            onOpenAiEngine={() => setActiveTab("ai-pricing")}
          />
        )}

        {activeTab === "farmer" && (
          <FarmerDashboard
            listings={crops}
            bids={bids}
            orders={orders}
            onAddListing={handleAddListing}
            onAcceptBid={handleAcceptBid}
            onRejectBid={handleRejectBid}
            onBookVehicle={handleBookVehicle}
            onOpenAiEngine={() => setActiveTab("ai-pricing")}
            onOpenEscrowOrders={() => setActiveTab("escrow")}
          />
        )}

        {activeTab === "ai-pricing" && (
          <PricingForecastingEngine />
        )}

        {activeTab === "escrow" && (
          <EscrowTrustTracker
            orders={orders}
            onUpdateOrder={handleUpdateOrder}
          />
        )}

        {activeTab === "inspector" && (
          <MandiInspectorView
            mandiRates={mandiRates}
            listings={crops}
            onUpdateMandiRate={handleUpdateMandiRate}
          />
        )}
      </main>

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-700 p-4 max-w-sm flex items-start gap-3">
            <div className={`p-2 rounded-xl shrink-0 ${
              toastMessage.type === "info" ? "bg-blue-900 text-blue-300" : "bg-emerald-900 text-emerald-300"
            }`}>
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-xs text-white">{toastMessage.title}</h4>
              <p className="text-[11px] text-slate-300 mt-0.5">{toastMessage.desc}</p>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />

    </div>
  );
}
