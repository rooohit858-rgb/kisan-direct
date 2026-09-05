"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    fullName: "",
    state: "",
    district: "",
    village: "",
    landSize: "",
    cropType: "",
  });

  useEffect(() => {
    // Mobile page se saved number auto-fetch karein
    const savedPhone = localStorage.getItem("userPhone") || "";
    setFormData((prev) => ({ ...prev, phone: savedPhone }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Supabase Database Insert
    const { error } = await supabase.from("farmers").insert([
      {
        phone: formData.phone,
        full_name: formData.fullName,
        state: formData.state,
        district: formData.district,
        village: formData.village,
        land_size_acres: formData.landSize ? parseFloat(formData.landSize) : null,
        crop_type: formData.cropType,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error saving details: " + error.message);
      return;
    }

    alert("Registration Successful!");
    router.push("/dashboard"); // Ya aapke main app page par navigate karega
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
          Farmer Registration
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              disabled
              className="w-full p-2 border rounded bg-gray-100 text-gray-600 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Kisan ka naam"
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">District</label>
              <input
                type="text"
                name="district"
                required
                value={formData.district}
                onChange={handleChange}
                placeholder="District"
                className="w-full p-2 border rounded mt-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Village</label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              placeholder="Gaon ka naam"
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Land (Acres)</label>
              <input
                type="number"
                step="0.1"
                name="landSize"
                value={formData.landSize}
                onChange={handleChange}
                placeholder="e.g. 2.5"
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Main Crop</label>
              <input
                type="text"
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                placeholder="e.g. Wheat/Rice"
                className="w-full p-2 border rounded mt-1"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 disabled:opacity-50 mt-4"
          >
            {loading ? "Saving..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}