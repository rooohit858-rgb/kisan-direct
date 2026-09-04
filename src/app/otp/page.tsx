"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Mobile screen se bhej gaya 10-digit number localStorage se read karein
    const savedPhone = localStorage.getItem("userPhone");
    if (savedPhone) {
      setPhone(savedPhone);
    }
  }, []);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Supabase backend ke liye +91 background me attach kar rahe hain
    const formattedPhone = `+91${phone.trim()}`;

    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: "sms",
    });

    setLoading(false);

    // 🔴 GALAT OTP -> Redirection stop kar dega
    if (error) {
      alert("Invalid OTP! Sahi OTP enter karein.");
      return; 
    }

    // 🟢 SAHI OTP -> Success redirect
    if (data?.session || data?.user) {
      router.push("/register"); // Sahi OTP par registration ya home page par le jayega
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <form onSubmit={handleVerifyOtp} className="p-6 border rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          className="w-full p-2 border rounded mb-4 text-center text-lg"
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}