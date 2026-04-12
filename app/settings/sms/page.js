"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const alertTypes = [
  { label: "Order Updates", desc: "Confirmation, dispatch & delivery alerts", key: "orders" },
  { label: "Offers & Deals", desc: "Exclusive sale and discount alerts", key: "offers" },
  { label: "Price Drop Alerts", desc: "When wishlisted items go on sale", key: "price" },
  { label: "Return & Refund Updates", desc: "Status updates on your return requests", key: "returns" },
];

export default function SmsAlertsPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("+91 98765 43210");
  const [editing, setEditing] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [alerts, setAlerts] = useState({ orders: true, offers: false, price: true, returns: true });

  const toggle = (key) => setAlerts((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="mt-16 text-black min-h-screen bg-gray-50 pb-10">

      {/* Header */}
      <div className="px-4 py-5 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
          <div>
            <h1 className="text-base font-semibold">SMS Alerts</h1>
            <p className="text-xs text-gray-400">Manage your SMS preferences</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">

        {/* Master Toggle */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
              <i className="ri-message-line text-pink-500 text-lg"></i>
            </div>
            <div>
              <p className="text-sm font-semibold">SMS Notifications</p>
              <p className="text-xs text-gray-400 mt-0.5">{smsEnabled ? "Enabled" : "Disabled"}</p>
            </div>
          </div>
          <button
            onClick={() => setSmsEnabled(!smsEnabled)}
            className={`w-11 h-6 rounded-full transition-all duration-300 relative ${smsEnabled ? "bg-pink-500" : "bg-gray-200"}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${smsEnabled ? "left-6" : "left-1"}`} />
          </button>
        </div>

        {/* Phone Number */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
          <p className="text-xs text-gray-400 mb-2">SMS will be sent to</p>
          {editing ? (
            <div className="flex gap-2 items-center">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none"
              />
              <button
                onClick={() => setEditing(false)}
                className="text-xs bg-black text-white px-3 py-2 rounded-xl"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="ri-smartphone-line text-gray-400"></i>
                <p className="text-sm font-semibold">{phone}</p>
              </div>
              <button onClick={() => setEditing(true)} className="text-xs text-pink-500 font-medium">
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Alert Types */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest px-1 mb-2">Alert Types</p>
          <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden transition-opacity ${!smsEnabled ? "opacity-40 pointer-events-none" : ""}`}>
            {alertTypes.map((item, i) => (
              <div key={item.key} className={`flex items-center justify-between px-4 py-3.5 ${i < alertTypes.length - 1 ? "border-b border-gray-100" : ""}`}>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggle(item.key)}
                  className={`w-11 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ml-3 ${alerts[item.key] ? "bg-pink-500" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${alerts[item.key] ? "left-6" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
          {!smsEnabled && (
            <p className="text-xs text-gray-400 text-center mt-2">Enable SMS alerts to manage preferences</p>
          )}
        </div>

      </div>
    </div>
  );
}