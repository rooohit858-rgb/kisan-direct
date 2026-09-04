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

    // Mobile number cleanup (+91 E.164 format guarantee)
    let cleanNumber = phone.replace(/\D/g, "");
    if (cleanNumber.startsWith("91") && cleanNumber.length === 12) {
      cleanNumber = cleanNumber.substring(2);
    }
    const formattedPhone = `+91${cleanNumber}`;

    // Supabase Auth call (Dashboard test numbers ke individual OTPs check karega)
    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp.trim(),
      type: "sms",
    });

    setLoading(false);

    if (error) {
      alert(`Invalid OTP: ${error.message}`);
      return;
    }

    if (data?.session || data?.user) {
      router.push("/register");
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