"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const defaultAddresses = [
  { id: 1, tag: "Home", name: "Zivara User", phone: "+91 98765 43210", address: "B-204, Green Valley Apartments, Sector 62, Noida, UP - 201301", default: true },
  { id: 2, tag: "Work", name: "Zivara User", phone: "+91 98765 43210", address: "Tower B, Cyber City, DLF Phase 2, Gurgaon, HR - 122002", default: false },
];

export default function AddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState(defaultAddresses);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ tag: "Home", name: "", phone: "", address: "" });

  const handleDelete = (id) => setAddresses((prev) => prev.filter((a) => a.id !== id));
  const handleDefault = (id) => setAddresses((prev) => prev.map((a) => ({ ...a, default: a.id === id })));

  const handleAdd = () => {
    if (!form.name || !form.phone || !form.address) return;
    setAddresses((prev) => [...prev, { ...form, id: Date.now(), default: false }]);
    setAdding(false);
    setForm({ tag: "Home", name: "", phone: "", address: "" });
  };

  return (
    <div className="mt-16 text-black min-h-screen bg-gray-50 pb-10">

      <div className="px-4 py-5 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
            <div>
              <h1 className="text-base font-semibold">Saved Addresses</h1>
              <p className="text-xs text-gray-400">{addresses.length} address{addresses.length !== 1 ? "es" : ""} saved</p>
            </div>
          </div>
          <button onClick={() => setAdding(true)} className="text-xs text-pink-500 border border-pink-300 px-3 py-1 rounded-full">
            + Add New
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-pink-50 text-pink-500 px-2 py-0.5 rounded-full font-medium">{addr.tag}</span>
                {addr.default && <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">Default</span>}
              </div>
              <button onClick={() => handleDelete(addr.id)}>
                <i className="ri-delete-bin-line text-gray-300 text-lg"></i>
              </button>
            </div>
            <p className="text-sm font-semibold">{addr.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{addr.phone}</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{addr.address}</p>
            {!addr.default && (
              <button onClick={() => handleDefault(addr.id)} className="mt-3 text-xs text-pink-500 font-medium">
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Address Sheet */}
      {adding && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
          <div className="bg-white w-full rounded-t-3xl px-4 pt-5 pb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold">Add New Address</h2>
              <i className="ri-close-line text-xl cursor-pointer" onClick={() => setAdding(false)}></i>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                {["Home", "Work", "Other"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setForm((p) => ({ ...p, tag: t }))}
                    className={`px-4 py-1.5 rounded-full text-xs border transition-all ${form.tag === t ? "bg-black text-white border-black" : "border-gray-200 text-gray-600"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {[
                { key: "name", placeholder: "Full Name" },
                { key: "phone", placeholder: "Phone Number" },
                { key: "address", placeholder: "Full Address" },
              ].map(({ key, placeholder }) => (
                <input
                  key={key}
                  value={form[key]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
                />
              ))}
              <button onClick={handleAdd} className="w-full py-3.5 bg-black text-white rounded-2xl text-sm font-semibold">
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}