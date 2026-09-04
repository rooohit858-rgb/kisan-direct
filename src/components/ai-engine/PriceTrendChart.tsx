"use client";

import React from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { PriceForecastPoint } from "@/types";
import { formatINR } from "@/lib/utils";

interface PriceTrendChartProps {
  data: PriceForecastPoint[];
  cropTitle: string;
  unit: string;
}

export const PriceTrendChart: React.FC<PriceTrendChartProps> = ({
  data,
  cropTitle,
  unit,
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 font-sans">
          <p className="font-bold text-amber-300 border-b border-slate-700 pb-1">{label}</p>
          <div className="space-y-1">
            <p className="flex justify-between gap-4 text-red-300">
              <span>Intermediary Retail:</span>
              <span className="font-bold font-mono">{formatINR(payload[0]?.value)}/{unit}</span>
            </p>
            <p className="flex justify-between gap-4 text-emerald-300">
              <span>KisanDirect Fair Price:</span>
              <span className="font-bold font-mono">{formatINR(payload[1]?.value)}/{unit}</span>
            </p>
            <p className="flex justify-between gap-4 text-blue-300">
              <span>APMC Mandi Rate:</span>
              <span className="font-bold font-mono">{formatINR(payload[2]?.value)}/{unit}</span>
            </p>
            <p className="flex justify-between gap-4 text-amber-200">
              <span>Govt MSP Floor:</span>
              <span className="font-bold font-mono">{formatINR(payload[3]?.value)}/{unit}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">
            6-Month Historical & AI Forecast Curve: {cropTitle}
          </h4>
          <p className="text-xs text-slate-500">
            Contrasting Intermediary Retail vs KisanDirect Fair Price vs APMC Mandi vs Govt MSP
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold">
          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
            KisanDirect vs Mandi: +35% Boost
          </span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 11, fill: "#64748b" }} 
              stroke="#cbd5e1" 
            />
            <YAxis 
              tick={{ fontSize: 11, fill: "#64748b" }} 
              stroke="#cbd5e1"
              tickFormatter={(val) => `₹${val}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} 
            />
            
            {/* 1. Supermarket Retail (Red dashed) */}
            <Line
              type="monotone"
              dataKey="supermarketRetail"
              name="Intermediary Supermarket Price"
              stroke="#ef4444"
              strokeWidth={2.5}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: "#ef4444" }}
            />

            {/* 2. KisanDirect Fair Platform (Emerald Green bold) */}
            <Line
              type="monotone"
              dataKey="kisanDirectFair"
              name="KisanDirect Fair Price"
              stroke="#10b981"
              strokeWidth={3.5}
              dot={{ r: 5, fill: "#10b981", stroke: "#ffffff", strokeWidth: 2 }}
              activeDot={{ r: 7 }}
            />

            {/* 3. APMC Mandi Wholesale (Blue) */}
            <Line
              type="monotone"
              dataKey="apmcMandi"
              name="APMC Mandi Wholesale"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3, fill: "#3b82f6" }}
            />

            {/* 4. Govt MSP (Amber) */}
            <Line
              type="monotone"
              dataKey="govtMsp"
              name="Govt Minimum Support Price (MSP)"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 3, fill: "#f59e0b" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
        <span>Data aggregated from Agmarknet API, APMC Terminal registers & Big Retail price crawlers.</span>
        <span className="font-semibold text-emerald-700">Equilibrium Index: High Liquidity</span>
      </div>
    </div>
  );
};
