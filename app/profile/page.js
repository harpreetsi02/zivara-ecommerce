"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { userAPI } from "@/utils/api";
import { lemonMilk } from "../fonts";

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
    if (!user) {
      router.push("/login");
      return;
    }
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

      setSuccess(
        "Profile updated successfully!"
      );
      setEdit(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key, val) =>
    setForm((prev) => ({
      ...prev,
      [key]: val,
    }));

  // LOADING
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-cente">
        <div className="text-center">
          <div className="w-14 h-14 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 text-sm uppercase tracking-[0.25em] mt-5">
            Loading Profile
          </p>
        </div>
      </div>
    );

  return (
    <section className="min-h-screen relative z-20 pt-24 pb-20 overflow-hidden">
      {/* HEADING */}
      <div className="text-center mb-12 px-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            <i className="ri-arrow-left-line text-lg"></i>
          </button>

          <h1
            className={`${lemonMilk.className} flex items-center text-black tracking-wide`}
          >
            <span className="text-5xl md:text-7xl leading-none">M</span>
            <span className="text-xl md:text-4xl">y Profile</span>
          </h1>
        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Manage Your Personal Information
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="px-4 md:px-6">
        <div className="bg-[#f8f8f8] rounded-4xl overflow-hidden">
          {/* TOP */}
          <div className="relative px-6 md:px-10 py-10 border-b border-gray-200">
            {/* Edit Button */}
            <button
              onClick={() => edit ? handleSave() : setEdit(true)}
              disabled={saving}
              className={`absolute top-6 right-6 px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-300
                ${edit
                  ? "bg-black text-white"
                  : "border border-black text-black hover:bg-black hover:text-white"
                }
              `}
            >
              {saving ? "Saving..." : edit ? "Save" : "Edit"}
            </button>

            {/* Avatar */}
            <div className="flex flex-col items-center text-center">
              <div
                className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-black text-white flex items-center justify-center text-4xl md:text-5xl font-light uppercase"
              >
                {form.name ?.charAt(0) ?.toUpperCase()}
              </div>

              <h2 className="text-3xl md:text-5xl font-light text-black mt-8">
                {form.name || "Your Name"}
              </h2>

              <p className="text-gray-400 text-sm uppercase tracking-[0.25em] mt-4">
                {form.email}
              </p>
            </div>
          </div>

          {/* ALERTS */}
          {success && (
            <div className="mx-6 md:mx-10 mt-6 bg-green-500/10 border border-green-500/20 rounded-3xl px-5 py-4">
              <p className="text-sm text-green-600">
                {success}
              </p>
            </div>
          )}

          {error && (
            <div className="mx-6 md:mx-10 mt-6 bg-red-500/10 border border-red-500/20 rounded-3xl px-5 py-4">
              <p className="text-sm text-red-500">
                {error}
              </p>
            </div>
          )}

          {/* FORM */}
          <div className="p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  label: "Full Name",
                  key: "name",
                  editable: true,
                },
                {
                  label: "Email",
                  key: "email",
                  editable: false,
                },
                {
                  label: "Phone",
                  key: "phone",
                  editable: true,
                },
                {
                  label: "Gender",
                  key: "gender",
                  editable: true,
                },
                {
                  label: "Date of Birth",
                  key: "dob",
                  editable: true,
                },
              ].map(
                ({ label, key, editable, }) => (
                  <div
                    key={key}
                    className="bg-white rounded-3xl p-5 border border-gray-200"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">
                      {label}
                    </p>

                    {edit && editable ? (
                      <input
                        value={form[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        className="w-full bg-transparent text-black text-lg outline-none border-b border-black pb-2"
                      />
                    ) : (
                      <p className="text-black text-lg font-light wrap-break-words">
                        {form[key] || (
                          <span className="text-gray-400">
                            Not set
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col md:flex-row gap-4 mt-10">

              {/* Orders */}
              <button
                onClick={() => router.push("/orders")}
                className="flex-1 py-5 rounded-full bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300"
              >
                View Orders
              </button>

              {/* Logout */}
              <button
                onClick={() => {logout(); router.push("/");}}
                className="flex-1 py-5 rounded-full border border-red-300 text-red-500 text-sm uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}