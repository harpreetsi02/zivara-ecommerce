"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const defaultCards = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/27", name: "Zivara User", default: true },
  { id: 2, type: "Mastercard", last4: "8910", expiry: "06/26", name: "Zivara User", default: false },
];

const upiApps = [
  { name: "Google Pay", icon: "ri-google-fill", color: "text-blue-500" },
  { name: "PhonePe", icon: "ri-smartphone-line", color: "text-purple-500" },
  { name: "Paytm", icon: "ri-wallet-line", color: "text-blue-400" },
];

export default function PaymentMethodsPage() {
  const router = useRouter();
  const [cards, setCards] = useState(defaultCards);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ number: "", expiry: "", cvv: "", name: "" });

  const handleDelete = (id) => setCards((prev) => prev.filter((c) => c.id !== id));
  const handleDefault = (id) => setCards((prev) => prev.map((c) => ({ ...c, default: c.id === id })));

  return (
    <div className="mt-16 text-black min-h-screen bg-gray-50 pb-10">

      <div className="px-4 py-5 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
            <div>
              <h1 className="text-base font-semibold">Payment Methods</h1>
              <p className="text-xs text-gray-400">Manage your saved payments</p>
            </div>
          </div>
          <button onClick={() => setAdding(true)} className="text-xs text-pink-500 border border-pink-300 px-3 py-1 rounded-full">
            + Add Card
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">

        {/* Cards */}
        <p className="text-xs text-gray-400 uppercase tracking-widest px-1">Saved Cards</p>
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`text-xs font-bold px-2 py-0.5 rounded ${card.type === "Visa" ? "bg-blue-600 text-white" : "bg-red-500 text-white"}`}>
                  {card.type}
                </div>
                {card.default && <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">Default</span>}
              </div>
              <button onClick={() => handleDelete(card.id)}>
                <i className="ri-delete-bin-line text-gray-300 text-lg"></i>
              </button>
            </div>
            <p className="text-sm font-semibold tracking-widest">•••• •••• •••• {card.last4}</p>
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-400">{card.name}</p>
              <p className="text-xs text-gray-400">Expires {card.expiry}</p>
            </div>
            {!card.default && (
              <button onClick={() => handleDefault(card.id)} className="mt-3 text-xs text-pink-500 font-medium">
                Set as Default
              </button>
            )}
          </div>
        ))}

        {/* UPI */}
        <p className="text-xs text-gray-400 uppercase tracking-widest px-1 mt-2">UPI Apps</p>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {upiApps.map((app, i) => (
            <div key={app.name} className={`flex items-center justify-between px-4 py-3.5 ${i < upiApps.length - 1 ? "border-b border-gray-100" : ""}`}>
              <div className="flex items-center gap-3">
                <i className={`${app.icon} text-xl ${app.color}`}></i>
                <p className="text-sm font-medium">{app.name}</p>
              </div>
              <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">Linked</span>
            </div>
          ))}
        </div>

        {/* COD */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4 flex items-center gap-3">
          <i className="ri-money-rupee-circle-line text-2xl text-green-500"></i>
          <div>
            <p className="text-sm font-medium">Cash on Delivery</p>
            <p className="text-xs text-gray-400 mt-0.5">Available on orders above ₹499</p>
          </div>
          <i className="ri-checkbox-circle-fill text-green-500 text-xl ml-auto"></i>
        </div>

      </div>

      {/* Add Card Sheet */}
      {adding && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
          <div className="bg-white w-full rounded-t-3xl px-4 pt-5 pb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold">Add New Card</h2>
              <i className="ri-close-line text-xl cursor-pointer" onClick={() => setAdding(false)}></i>
            </div>
            <div className="space-y-3">
              {[
                { key: "number", placeholder: "Card Number", maxLength: 19 },
                { key: "name", placeholder: "Cardholder Name" },
                { key: "expiry", placeholder: "MM/YY" },
                { key: "cvv", placeholder: "CVV", maxLength: 3 },
              ].map(({ key, placeholder, maxLength }) => (
                <input
                  key={key}
                  value={form[key]}
                  maxLength={maxLength}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
                />
              ))}
              <button
                onClick={() => { setAdding(false); setCards((p) => [...p, { id: Date.now(), type: "Visa", last4: form.number.slice(-4), expiry: form.expiry, name: form.name, default: false }]); }}
                className="w-full py-3.5 bg-black text-white rounded-2xl text-sm font-semibold"
              >
                Save Card
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}