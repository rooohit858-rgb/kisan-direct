"use client";

import React from "react";
import { MandiRateBenchmark } from "@/types";
import { TrendingUp, ArrowUpRight, Radio } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface MandiTickerProps {
  rates: MandiRateBenchmark[];
}

export const MandiTicker: React.FC<MandiTickerProps> = ({ rates }) => {
  return (
    <div className="bg-slate-900 border-y border-slate-800 text-white overflow-hidden relative shadow-inner">
      <div className="flex items-center">
        {/* Static badge on the left */}
        <div className="z-10 bg-gradient-to-r from-emerald-700 to-green-600 px-3.5 py-2 flex items-center gap-2 text-xs font-bold shrink-0 shadow-lg tracking-wide uppercase">
          <Radio className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="hidden sm:inline">Live APMC Mandi Ticker</span>
          <span className="sm:hidden">APMC Live</span>
        </div>

        {/* Dynamic ticker content ribbon */}
        <div className="flex overflow-x-hidden whitespace-nowrap py-2 relative flex-1 mask-fade">
          <div className="flex animate-marquee gap-8 items-center text-xs">
            {rates.concat(rates).map((rate, idx) => {
              const boostPercent = Math.round(((rate.kisanDirectPrice - rate.apmcModalPrice) / rate.apmcModalPrice) * 100);
              return (
                <div 
                  key={`${rate.id}-${idx}`} 
                  className="inline-flex items-center gap-2.5 bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700 hover:border-emerald-500/50 transition cursor-pointer"
                >
                  <span className="font-semibold text-slate-200">{rate.commodity}</span>
                  <span className="text-slate-400 text-[11px]">({rate.mandiName})</span>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-slate-400 line-through text-[11px]">{formatINR(rate.apmcModalPrice)}/{rate.unit}</span>
                    <span className="text-emerald-400 font-bold">{formatINR(rate.kisanDirectPrice)}/{rate.unit}</span>
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    +{boostPercent}% Farmer Gain
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
