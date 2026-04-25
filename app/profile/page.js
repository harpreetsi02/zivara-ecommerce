"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { userAPI } from "@/utils/api";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const data = await userAPI.getProfile();
      setForm({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        gender: data.gender || "",
        dob: data.dob || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await userAPI.updateProfile({
        name: form.name,
        phone: form.phone,
        gender: form.gender,
        dob: form.dob,
      });
      setSuccess("Profile updated successfully!");
      setEdit(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key, val) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  if (loading) return (
    <div className="mt-16 flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm">Loading profile...</p>
    </div>
  );

  return (
    <div className="mt-16 min-h-screen bg-white">

      {/* Header */}
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
            <h1 className="text-base font-semibold">My Profile</h1>
          </div>
          <button
            onClick={() => edit ? handleSave() : setEdit(true)}
            disabled={saving}
            className="text-xs font-medium text-pink-500 border border-pink-300 px-3 py-1 rounded-full"
          >
            {saving ? "Saving..." : edit ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center py-6 border-b border-gray-100">
        <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-3xl font-bold text-pink-400">
          {form.name.charAt(0).toUpperCase()}
        </div>
        <p className="mt-3 text-sm font-semibold">{form.name}</p>
        <p className="text-xs text-gray-400">{form.email}</p>
      </div>

      {/* Success / Error */}
      {success && (
        <div className="mx-4 mt-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
          <p className="text-xs text-green-600">{success}</p>
        </div>
      )}
      {error && (
        <div className="mx-4 mt-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}

      {/* Form */}
      <div className="px-4 py-4 space-y-4">
        {[
          { label: "Full Name", key: "name", editable: true },
          { label: "Email", key: "email", editable: false },
          { label: "Phone", key: "phone", editable: true },
          { label: "Gender", key: "gender", editable: true },
          { label: "Date of Birth", key: "dob", editable: true },
        ].map(({ label, key, editable }) => (
          <div key={key} className="border-b border-gray-100 pb-3">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            {edit && editable ? (
              <input
                value={form[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="text-sm font-medium w-full outline-none border-b border-pink-300 pb-1 bg-transparent"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            ) : (
              <p className="text-sm font-medium">
                {form[key] || (
                  <span className="text-gray-300">Not set</span>
                )}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="px-4 mt-4 pb-10">
        <button
          onClick={() => { logout(); router.push("/"); }}
          className="w-full py-3 border border-gray-200 rounded-xl text-sm text-red-500 font-medium"
        >
          Log Out
        </button>
      </div>

    </div>
  );
}