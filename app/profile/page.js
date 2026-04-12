"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: "Zivara User",
    email: "user@zivara.com",
    phone: "+91 98765 43210",
    gender: "Female",
    dob: "01/01/2000",
  });

  const handleChange = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="mt-16 text-black min-h-screen bg-white">

      {/* Header */}
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
            <h1 className="text-base font-semibold">My Profile</h1>
          </div>
          <button
            onClick={() => setEdit(!edit)}
            className="text-xs font-medium text-pink-500 border border-pink-300 px-3 py-1 rounded-full"
          >
            {edit ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center py-6 border-b border-gray-100">
        <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-3xl font-bold text-pink-400">
          {form.name.charAt(0)}
        </div>
        <p className="mt-3 text-sm font-semibold">{form.name}</p>
        <p className="text-xs text-gray-400">{form.email}</p>
      </div>

      {/* Form Fields */}
      <div className="px-4 py-4 space-y-4">
        {[
          { label: "Full Name", key: "name" },
          { label: "Email", key: "email" },
          { label: "Phone", key: "phone" },
          { label: "Gender", key: "gender" },
          { label: "Date of Birth", key: "dob" },
        ].map(({ label, key }) => (
          <div key={key} className="border-b border-gray-100 pb-3">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            {edit ? (
              <input
                value={form[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="text-sm font-medium w-full outline-none border-b border-pink-300 pb-1"
              />
            ) : (
              <p className="text-sm font-medium">{form[key]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="px-4 mt-4">
        <button className="w-full py-3 border border-gray-200 rounded-xl text-sm text-red-500 font-medium">
          Log Out
        </button>
      </div>

    </div>
  );
}