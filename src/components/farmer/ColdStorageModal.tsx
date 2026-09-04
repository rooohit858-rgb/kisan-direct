"use client";

import React, { useState } from "react";
import { ColdStorageVehicle, CropListing } from "@/types";
import { coldStorageVehicles } from "@/data/historicalPricing";
import { 
  X, 
  Truck, 
  ThermometerSnowflake, 
  Star, 
  MapPin, 
  Phone, 
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface ColdStorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing?: CropListing | null;
  onBookVehicle: (vehicle: ColdStorageVehicle, distanceKm: number) => void;
}

export const ColdStorageModal: React.FC<ColdStorageModalProps> = ({
  isOpen,
  onClose,
  listing,
  onBookVehicle,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<ColdStorageVehicle>(coldStorageVehicles[0]);
  const [distanceKm, setDistanceKm] = useState(65);
  const [pickupDate, setPickupDate] = useState("2026-08-31");
  const [pickupTime, setPickupTime] = useState("06:00 AM");
  const [targetTemp, setTargetTemp] = useState("4°C to 8°C (Reefer Standard)");
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const estimatedCost = selectedVehicle.ratePerKm * distanceKm + 450; // base + rate

  const handleBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      onBookVehicle(selectedVehicle, distanceKm);
      setIsBooked(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/20">
              <ThermometerSnowflake className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Book Cold-Chain Reefer Logistics</h2>
              <p className="text-xs text-blue-100">
                {listing ? `For ${listing.title} (${listing.quantity} ${listing.unit})` : "Direct Farm-to-Buyer Cold Fleet"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Vehicle Selection Grid */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Temperature-Controlled Carrier:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {coldStorageVehicles.map((veh) => {
                const isSelected = selectedVehicle.id === veh.id;
                return (
                  <div
                    key={veh.id}
                    onClick={() => setSelectedVehicle(veh)}
                    className={`cursor-pointer rounded-xl border-2 p-3.5 transition flex flex-col justify-between ${
                      isSelected 
                        ? "border-blue-600 bg-blue-50/70 shadow-md" 
                        : "border-slate-200 bg-slate-50 hover:bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{veh.name}</span>
                        {isSelected && <span className="text-blue-600 font-bold text-xs">✓</span>}
                      </div>
                      <div className="mt-2 text-xs space-y-1 text-slate-600">
                        <div className="flex items-center gap-1 text-blue-800 font-semibold">
                          <ThermometerSnowflake className="w-3 h-3 text-blue-600" />
                          <span>{veh.tempRange}</span>
                        </div>
                        <div>Capacity: <strong>{veh.capacityKg} kg</strong></div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span>{veh.rating} rating</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                      <span className="text-slate-500">Rate:</span>
                      <span className="font-bold text-blue-700">₹{veh.ratePerKm}/km</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logistics Route & Specs */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Estimated Distance (km)</label>
                <input
                  type="number"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  min={5}
                  max={1500}
                  className="w-full text-sm p-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Temperature Target</label>
                <select
                  value={targetTemp}
                  onChange={(e) => setTargetTemp(e.target.value)}
                  className="w-full text-sm p-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="4°C to 8°C (Reefer Standard)">4°C to 8°C (Fruits & Veggies)</option>
                  <option value="-4°C to 0°C (Chilled)">-4°C to 0°C (High Perishable)</option>
                  <option value="-18°C (Deep Freeze)">-18°C (Deep Freeze Frozen)</option>
                  <option value="18°C to 22°C (Dry Ventilated)">18°C to 22°C (Dry Grains/Spices)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" /> Pickup Date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full text-sm p-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" /> Preferred Slot
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full text-sm p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="06:00 AM">06:00 AM (Early Morning Harvest)</option>
                  <option value="11:00 AM">11:00 AM (Midday Dispatch)</option>
                  <option value="05:00 PM">05:00 PM (Evening Overnight Run)</option>
                </select>
              </div>
            </div>

            {/* Assigned Driver and GPS */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 mt-2 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">Assigned Driver: {selectedVehicle.driverName}</span>
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                  Verified Fleet
                </span>
              </div>
              <div className="text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Vehicle: {selectedVehicle.vehicleNumber} • {selectedVehicle.currentLocation}</span>
              </div>
            </div>
          </div>

          {/* Pricing Calculation Summary */}
          <div className="p-4 rounded-xl bg-blue-900 text-white flex items-center justify-between">
            <div>
              <span className="text-xs text-blue-200 block">Total Cold-Chain Fare</span>
              <span className="text-xl font-black">{formatINR(estimatedCost)}</span>
              <span className="text-[10px] text-blue-300 block">Auto-factored in Buyer 12% Logistics Escrow</span>
            </div>

            <button
              onClick={handleBooking}
              disabled={isBooked}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-bold text-xs shadow transition flex items-center gap-1.5"
            >
              {isBooked ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-amber-950 border-t-transparent rounded-full animate-spin" />
                  <span>Dispatching Vehicle...</span>
                </>
              ) : (
                <>
                  <Truck className="w-4 h-4" />
                  <span>Confirm Reefer Booking</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
