"use client";

import React from "react";
import { ShieldCheck, Lock, HeartHandshake, Award, ExternalLink, Leaf } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 mt-16 pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-10 border-b border-slate-800">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/50">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">78% Direct Farmer Payout</h4>
              <p className="text-slate-400 text-xs mt-1">Eliminating 4-5 intermediaries so farmers earn 30-50% more on every harvest.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-blue-950 text-blue-400 border border-blue-800/50">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">RBI Compliant Smart Escrow</h4>
              <p className="text-slate-400 text-xs mt-1">Buyer funds held in cryptographic escrow until OTP delivery confirmation.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950 text-purple-400 border border-purple-800/50">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">APMC & IoT Quality Assay</h4>
              <p className="text-slate-400 text-xs mt-1">Every batch tested for moisture, pesticide limits, and certified at farm-gate.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-950 text-amber-400 border border-amber-800/50">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Cold-Chain Reefer Network</h4>
              <p className="text-slate-400 text-xs mt-1">Temperature-monitored direct transit reducing post-harvest wastage from 30% to &lt;3%.</p>
            </div>
          </div>
        </div>

        {/* Hackathon Details & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-800 text-white text-[10px] font-extrabold px-2 py-1 rounded">
              SIH 2026
            </div>
            <span className="text-slate-300 font-medium">
              Problem Statement SIH26033: Direct Farm-to-Consumer Agri Marketplace
            </span>
          </div>
          <div className="flex items-center gap-6 text-slate-400 text-xs">
            <span className="flex items-center gap-1 hover:text-emerald-400 transition cursor-pointer">
              e-NAM Portal Integration <ExternalLink className="w-3 h-3" />
            </span>
            <span className="flex items-center gap-1 hover:text-emerald-400 transition cursor-pointer">
              Jaivik Bharat Organic Registry <ExternalLink className="w-3 h-3" />
            </span>
            <span className="flex items-center gap-1 hover:text-emerald-400 transition cursor-pointer">
              AgriStack Kisan ID API <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>

        <div className="mt-6 text-center text-slate-600 text-[11px]">
          Empowering Indian Annadata with AI-driven fair price discovery, transparent value chain distribution, and zero exploitation.
        </div>
      </div>
    </footer>
  );
};
