"use client";

import { useRouter } from "next/navigation";

const shippingOptions = [
  { type: "Standard Delivery", time: "5-7 Business Days", price: "Free above ₹1099", icon: "ri-truck-line", color: "bg-blue-50 text-blue-500" },
  { type: "Express Delivery", time: "2-3 Business Days", price: "₹99", icon: "ri-flashlight-line", color: "bg-amber-50 text-amber-500" },
  { type: "Same Day Delivery", time: "Within 24 Hours", price: "₹199 (select cities)", icon: "ri-rocket-line", color: "bg-pink-50 text-pink-500" },
];

export default function ShippingPage() {
  const router = useRouter();

  return (
    <div className="mt-16 min-h-screen text-black bg-white">

      {/* Header */}
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
          <div>
            <h1 className="text-base font-semibold">Shipping Info</h1>
            <p className="text-xs text-gray-400">Delivery options & timelines</p>
          </div>
        </div>
      </div>

      {/* Free shipping banner */}
      <div className="mx-4 mt-5 bg-black text-white rounded-2xl px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Free Shipping</p>
          <p className="text-xs text-gray-300 mt-0.5">On all orders above ₹1099</p>
        </div>
        <i className="ri-truck-line text-3xl text-white/60"></i>
      </div>

      {/* Shipping Options */}
      <div className="px-4 mt-6 space-y-3">
        <p className="text-sm font-semibold mb-3">Delivery Options</p>
        {shippingOptions.map((opt) => (
          <div key={opt.type} className="border border-gray-100 rounded-2xl px-4 py-4 flex items-center gap-4">
            <div className={`${opt.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
              <i className={`${opt.icon} text-2xl`}></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{opt.type}</p>
              <p className="text-xs text-gray-400 mt-0.5">{opt.time}</p>
            </div>
            <p className="text-xs font-medium text-black">{opt.price}</p>
          </div>
        ))}
      </div>

      {/* Info points */}
      <div className="px-4 mt-6 mb-8">
        <p className="text-sm font-semibold mb-3">Important Info</p>
        <div className="space-y-2">
          {[
            "Orders placed before 2 PM are dispatched same day",
            "Tracking link sent via SMS & email after dispatch",
            "Delivery available across 27,000+ pin codes in India",
            "Cash on Delivery available on orders above ₹499",
          ].map((point, i) => (
            <div key={i} className="flex items-start gap-2">
              <i className="ri-information-line text-blue-400 text-sm mt-0.5 flex-shrink-0"></i>
              <p className="text-xs text-gray-600">{point}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}