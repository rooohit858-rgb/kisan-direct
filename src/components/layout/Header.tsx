"use client";

import React, { useState } from "react";
import { UserRole } from "@/types";
import { 
  Tractor, 
  ShoppingBag, 
  ShieldCheck, 
  Globe, 
  Bell, 
  Sparkles,
  TrendingUp,
  Lock,
  ChevronDown
} from "lucide-react";

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeOrdersCount: number;
  onOpenOrders: () => void;
  onOpenAddProduce?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeOrdersCount,
  onOpenOrders,
  onOpenAddProduce,
}) => {
  const [selectedLang, setSelectedLang] = useState("EN");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const languages = [
    { code: "EN", name: "English" },
    { code: "HI", name: "हिन्दी (Hindi)" },
    { code: "MR", name: "मराठी (Marathi)" },
    { code: "PA", name: "ਪੰਜਾਬੀ (Punjabi)" },
    { code: "TA", name: "தமிழ் (Tamil)" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/10 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top micro bar with SIH Hackathon & Trust info */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-emerald-100 text-xs px-4 py-1.5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase shadow-sm">
            SIH 2026 • PS: SIH26033
          </span>
          <span className="hidden sm:inline font-medium text-emerald-200">
            🌾 Direct Farm-to-Consumer Agri Marketplace • 0% Middleman Cut • 100% Escrow Backed
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden md:flex items-center gap-1 text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Govt e-NAM & APMC Benchmarked
          </span>
          <div className="relative">
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 bg-emerald-950/60 hover:bg-emerald-950 text-white px-2 py-0.5 rounded transition"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-emerald-300" />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-white text-slate-800 rounded-md shadow-lg py-1 border border-slate-200 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setShowLangMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between"
                  >
                    <span>{lang.name}</span>
                    {selectedLang === lang.code && <span className="text-emerald-600 font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation & role switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Tractor className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-800 via-green-700 to-amber-600 bg-clip-text text-transparent">
                    KisanDirect
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    किसान सेतु
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Direct Agri Value Network</p>
              </div>
            </div>

            {/* Mobile Escrow button */}
            <button
              onClick={onOpenOrders}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Escrow ({activeOrdersCount})</span>
            </button>
          </div>

          {/* Persona / Role Switcher Header Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner w-full md:w-auto justify-center">
            
            {/* Farmer Persona */}
            <button
              onClick={() => onRoleChange("farmer")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                currentRole === "farmer"
                  ? "bg-gradient-to-r from-emerald-700 to-green-600 text-white shadow-md shadow-emerald-600/30 scale-[1.02]"
                  : "text-slate-600 hover:text-emerald-700 hover:bg-white/60"
              }`}
            >
              <Tractor className={`w-4 h-4 ${currentRole === "farmer" ? "text-emerald-200" : "text-emerald-600"}`} />
              <span>Farmer Mode</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                currentRole === "farmer" ? "bg-emerald-900/50 text-emerald-200" : "bg-emerald-100 text-emerald-800"
              }`}>
                +35% Profit
              </span>
            </button>

            {/* Consumer / Buyer Persona */}
            <button
              onClick={() => onRoleChange("consumer")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                currentRole === "consumer"
                  ? "bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]"
                  : "text-slate-600 hover:text-indigo-700 hover:bg-white/60"
              }`}
            >
              <ShoppingBag className={`w-4 h-4 ${currentRole === "consumer" ? "text-blue-200" : "text-indigo-600"}`} />
              <span>Buyer / Consumer</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                currentRole === "consumer" ? "bg-indigo-900/50 text-indigo-200" : "bg-blue-100 text-indigo-800"
              }`}>
                -22% Save
              </span>
            </button>

            {/* Admin / Mandi Inspector Persona */}
            <button
              onClick={() => onRoleChange("inspector")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                currentRole === "inspector"
                  ? "bg-gradient-to-r from-purple-700 to-violet-600 text-white shadow-md shadow-purple-600/30 scale-[1.02]"
                  : "text-slate-600 hover:text-purple-700 hover:bg-white/60"
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${currentRole === "inspector" ? "text-purple-200" : "text-purple-600"}`} />
              <span>Mandi Inspector</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                currentRole === "inspector" ? "bg-purple-900/50 text-purple-200" : "bg-purple-100 text-purple-800"
              }`}>
                Assay Hub
              </span>
            </button>
          </div>

          {/* Actions & Escrow Status */}
          <div className="hidden md:flex items-center gap-3">
            {currentRole === "farmer" && onOpenAddProduce && (
              <button
                onClick={onOpenAddProduce}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm hover:shadow transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>+ List New Harvest</span>
              </button>
            )}

            <button
              onClick={onOpenOrders}
              className="relative flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-200 transition"
              title="View Escrow Milestone Orders"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Escrow Vault</span>
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {activeOrdersCount}
              </span>
            </button>

            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
              </button>
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-xs text-slate-800">Live Agri Alerts</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Mark read</span>
                  </div>
                  <div className="space-y-2 mt-2 max-h-56 overflow-y-auto text-xs">
                    <div className="p-2 bg-emerald-50/70 rounded-lg border border-emerald-100">
                      <div className="font-semibold text-emerald-900 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        Alphonso Mandi Spike (+12%)
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">Vashi APMC rates up. Recommended direct farm price: ₹650/dozen.</p>
                    </div>
                    <div className="p-2 bg-blue-50/70 rounded-lg border border-blue-100">
                      <div className="font-semibold text-blue-900 flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5 text-blue-600" />
                        Escrow Order Locked (₹25,600)
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">Taj Santacruz funded escrow for 40 dozen Alphonso Mangoes.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
