import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number, compact: boolean = false): string {
  if (compact && amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  if (compact && amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)} K`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPerUnit(amount: number, unit: string = "kg"): string {
  return `₹${amount.toFixed(amount % 1 === 0 ? 0 : 1)}/${unit}`;
}

export function calculateEarningsBoost(mandiRate: number, directRate: number): number {
  if (mandiRate <= 0) return 0;
  return Math.round(((directRate - mandiRate) / mandiRate) * 100);
}
