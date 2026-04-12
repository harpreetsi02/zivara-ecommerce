"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lemonMilk } from "../fonts";

const settingsList = [
  {
    section: "Preferences",
    items: [
      { label: "Notifications", icon: "ri-notification-line", toggle: true },
      { label: "Email Updates", icon: "ri-mail-line", toggle: true },
      { label: "SMS Alerts", icon: "ri-message-line", href: "/settings/sms" },
    ],
  },
  {
    section: "Account",
    items: [
      { label: "Change Password", icon: "ri-lock-line", href: "/settings/change-password" },
      { label: "Saved Addresses", icon: "ri-map-pin-line", href: "/settings/addresses" },
      { label: "Payment Methods", icon: "ri-bank-card-line", href: "/settings/payment-methods" },
    ],
  },
  {
    section: "More",
    items: [
      { label: "Privacy Policy", icon: "ri-shield-line", href: "/settings/privacy-policy" },
      { label: "Terms of Service", icon: "ri-file-text-line", href: "/settings/terms" },
      { label: "App Version 1.0.0", icon: "ri-information-line", info: true },
    ],
  },
];

export default function SettingsPage() {
  const router = useRouter();
  const [toggles, setToggles] = useState({
    "Notifications": true,
    "Email Updates": true,
  });
  const [showVersion, setShowVersion] = useState(false);

  return (
    <div className="mt-16 text-black min-h-screen bg-gray-50">

      {/* Header */}
      <div className="px-4 py-5 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
          <div>
            <h1 className="text-base font-semibold">Settings</h1>
            <p className="text-xs text-gray-400">Manage your preferences</p>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="px-4 py-4 space-y-4">
        {settingsList.map((group) => (
          <div key={group.section}>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 px-1">
              {group.section}
            </p>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              {group.items.map((item, i) => (
                <div
                  key={item.label}
                  onClick={() => {
                    if (item.href) router.push(item.href);
                    if (item.info) setShowVersion(true);
                  }}
                  className={`flex items-center justify-between px-4 py-3.5 ${
                    i !== group.items.length - 1 ? "border-b border-gray-100" : ""
                  } ${item.href || item.info ? "cursor-pointer active:bg-gray-50" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`${item.icon} text-lg text-gray-500`}></i>
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>

                  {item.toggle ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setToggles((prev) => ({ ...prev, [item.label]: !prev[item.label] }));
                      }}
                      className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                        toggles[item.label] ? "bg-pink-500" : "bg-gray-200"
                      }`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                        toggles[item.label] ? "left-6" : "left-1"
                      }`} />
                    </button>
                  ) : (
                    <i className="ri-arrow-right-s-line text-gray-300 text-lg"></i>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* App Version Modal */}
      {showVersion && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
          <div className="bg-white w-full rounded-t-3xl px-4 pt-5 pb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold">App Info</h2>
              <i className="ri-close-line text-xl cursor-pointer" onClick={() => setShowVersion(false)}></i>
            </div>
            <div className="flex flex-col items-center py-4 space-y-3">
              <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center">
                <i className="ri-shopping-bag-line text-pink-500 text-3xl"></i>
              </div>
              <p className={`${lemonMilk.className} flex items-center tracking-wider text-lg font-semibold`}><span className="text-4xl">z</span>ivara</p>
              <p className="text-xs text-gray-400">Version 1.0.0 (Build 100)</p>
              <div className="w-full bg-gray-50 rounded-2xl px-4 py-3 space-y-2 mt-2">
                {[
                  { label: "Platform", value: "Next.js" },
                  { label: "Released", value: "April 2026" },
                  { label: "Developer", value: "Zivara Team" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-xs font-medium">{value}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Made with love in India 🤍</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}