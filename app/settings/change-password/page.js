"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.current || !form.newPass || !form.confirm) {
      setError("Please fill all fields"); return;
    }
    if (form.newPass.length < 8) {
      setError("Password must be at least 8 characters"); return;
    }
    if (form.newPass !== form.confirm) {
      setError("Passwords do not match"); return;
    }
    setError("");
    setDone(true);
  };

  if (done) return (
    <div className="mt-16 min-h-screen bg-white flex flex-col items-center justify-center px-8 text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <i className="ri-lock-unlock-line text-green-500 text-4xl"></i>
      </div>
      <h2 className="text-lg font-semibold">Password Updated!</h2>
      <p className="text-sm text-gray-400 mt-2">Your password has been changed successfully.</p>
      <button onClick={() => router.push("/settings")} className="mt-6 w-full py-3.5 bg-black text-white rounded-2xl text-sm font-semibold">
        Back to Settings
      </button>
    </div>
  );

  return (
    <div className="mt-16 text-black min-h-screen bg-white">

      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
          <div>
            <h1 className="text-base font-semibold">Change Password</h1>
            <p className="text-xs text-gray-400">Keep your account secure</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">

        {[
          { key: "current", label: "Current Password" },
          { key: "newPass", label: "New Password" },
          { key: "confirm", label: "Confirm New Password" },
        ].map(({ key, label }) => (
          <div key={key}>
            <p className="text-xs text-gray-400 mb-1.5">{label}</p>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-2">
              <input
                type={show[key] ? "text" : "password"}
                value={form[key]}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="flex-1 text-sm outline-none"
              />
              <i
                className={`${show[key] ? "ri-eye-off-line" : "ri-eye-line"} text-gray-400 cursor-pointer`}
                onClick={() => setShow((p) => ({ ...p, [key]: !p[key] }))}
              ></i>
            </div>
          </div>
        ))}

        {/* Password strength hint */}
        <div className="bg-gray-50 rounded-xl px-4 py-3 space-y-1">
          {[
            { label: "At least 8 characters", ok: form.newPass.length >= 8 },
            { label: "Contains a number", ok: /\d/.test(form.newPass) },
            { label: "Contains uppercase letter", ok: /[A-Z]/.test(form.newPass) },
          ].map((rule) => (
            <div key={rule.label} className="flex items-center gap-2">
              <i className={`${rule.ok ? "ri-checkbox-circle-fill text-green-500" : "ri-checkbox-blank-circle-line text-gray-300"} text-sm`}></i>
              <p className={`text-xs ${rule.ok ? "text-green-600" : "text-gray-400"}`}>{rule.label}</p>
            </div>
          ))}
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button onClick={handleSubmit} className="w-full py-3.5 bg-black text-white rounded-2xl text-sm font-semibold mt-2">
          Update Password
        </button>

      </div>
    </div>
  );
}