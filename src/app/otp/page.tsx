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
    const savedPhone = localStorage.getItem("userPhone") || "";
    setPhone(savedPhone);
  }, []);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const cleanOtp = otp.trim();

    // 1. DEV / TESTING MODE (Gateway na hone par 696969 direct pass karega)
    if (process.env.NEXT_PUBLIC_DEV_MODE === "true" || cleanOtp === "696969") {
      setLoading(false);
      router.push("/register");
      return;
    }

    // 2. PRODUCTION MODE (SMS Gateway active hone par Supabase Verify karega)
    let cleanNumber = phone.replace(/\D/g, "");
    if (cleanNumber.startsWith("91") && cleanNumber.length === 12) {
      cleanNumber = cleanNumber.substring(2);
    }

    const { data, error } = await supabase.auth.verifyOtp({
      phone: `+91${cleanNumber}`,
      token: cleanOtp,
      type: "sms",
    });

    setLoading(false);

    if (error) {
      alert(`Invalid OTP: ${error.message}`);
      return;
    }

    if (data?.session || data?.user) {
      router.push("/role");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <form onSubmit={handleVerifyOtp} className="p-6 border rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-xl font-bold mb-2 text-center">Verify OTP</h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Sent to: +91{phone}
        </p>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
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