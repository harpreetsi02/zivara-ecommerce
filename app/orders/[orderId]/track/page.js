"use client";

import { useParams, useRouter } from "next/navigation";

const steps = [
  { label: "Order Placed", time: "2 Apr, 10:32 AM", done: true, icon: "ri-checkbox-circle-fill" },
  { label: "Order Confirmed", time: "2 Apr, 11:00 AM", done: true, icon: "ri-checkbox-circle-fill" },
  { label: "Packed & Dispatched", time: "3 Apr, 2:15 PM", done: true, icon: "ri-checkbox-circle-fill" },
  { label: "Out for Delivery", time: "Today, 9:00 AM", done: true, icon: "ri-checkbox-circle-fill" },
  { label: "Delivered", time: "Expected by 8 PM", done: false, icon: "ri-time-line" },
];

export default function TrackOrderPage() {
  const { orderId } = useParams();
  const router = useRouter();

  return (
    <div className="mt-16 text-black min-h-screen bg-white pb-10">

      {/* Header */}
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
          <div>
            <h1 className="text-base font-semibold">Track Order</h1>
            <p className="text-xs text-gray-400">#{orderId}</p>
          </div>
        </div>
      </div>

      {/* Live badge */}
      <div className="mx-4 mt-5 bg-blue-50 rounded-2xl px-4 py-3 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        <div>
          <p className="text-sm font-semibold text-blue-700">Out for Delivery</p>
          <p className="text-xs text-blue-400 mt-0.5">Your order is on its way!</p>
        </div>
      </div>

      {/* Delivery info */}
      <div className="mx-4 mt-3 bg-gray-50 rounded-2xl px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400">Estimated Delivery</p>
          <p className="text-sm font-semibold mt-0.5">Today, by 8:00 PM</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Courier</p>
          <p className="text-sm font-semibold mt-0.5">Delhivery</p>
        </div>
      </div>

      {/* Tracking Steps */}
      <div className="px-4 mt-6">
        <p className="text-sm font-semibold mb-5">Tracking Timeline</p>
        <div className="relative">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 mb-1">
              <div className="flex flex-col items-center">
                <i className={`${step.icon} text-xl ${step.done ? "text-pink-500" : "text-gray-300"}`}></i>
                {i < steps.length - 1 && (
                  <div className={`w-0.5 h-10 mt-1 ${step.done ? "bg-pink-200" : "bg-gray-100"}`}></div>
                )}
              </div>
              <div className="pb-6">
                <p className={`text-sm font-semibold ${step.done ? "text-black" : "text-gray-300"}`}>
                  {step.label}
                </p>
                <p className={`text-xs mt-0.5 ${step.done ? "text-gray-400" : "text-gray-200"}`}>
                  {step.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}