"use client";

import { useRouter } from "next/navigation";

const steps = [
  { icon: "ri-shopping-bag-line", title: "Initiate Return", desc: "Go to My Orders, select the item and click Return / Exchange." },
  { icon: "ri-map-pin-line", title: "Schedule Pickup", desc: "Choose a convenient date and time for our courier to pick up." },
  { icon: "ri-checkbox-circle-line", title: "Quality Check", desc: "Item is inspected at our warehouse within 2-3 business days." },
  { icon: "ri-refund-2-line", title: "Refund Processed", desc: "Refund is credited to your original payment method in 5-7 days." },
];

export default function ReturnsPage() {
  const router = useRouter();

  return (
    <div className="mt-16 text-black min-h-screen bg-white">

      {/* Header */}
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
          <div>
            <h1 className="text-base font-semibold">Return Policy</h1>
            <p className="text-xs text-gray-400">Easy returns within 7 days</p>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="mx-4 mt-5 bg-pink-50 rounded-2xl px-4 py-4 flex items-center gap-3">
        <i className="ri-refund-2-line text-3xl text-pink-400"></i>
        <div>
          <p className="text-sm font-semibold text-pink-600">7-Day Easy Returns</p>
          <p className="text-xs text-pink-400 mt-0.5">No questions asked return policy</p>
        </div>
      </div>

      {/* Steps */}
      <div className="px-4 mt-6">
        <p className="text-sm font-semibold mb-4">How it works</p>
        <div className="relative">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 mb-6 relative">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                  <i className={`${step.icon} text-pink-500 text-lg`}></i>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 h-full bg-pink-100 mt-1"></div>
                )}
              </div>
              <div className="pt-2">
                <p className="text-sm font-semibold">{step.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policy points */}
      <div className="px-4 mt-2 mb-8">
        <p className="text-sm font-semibold mb-3">Policy Details</p>
        <div className="space-y-2">
          {[
            "Items must be unused and in original packaging",
            "Tags should be intact at the time of return",
            "Innerwear & swimwear are non-returnable",
            "Sale items are eligible for exchange only",
            "Refund timeline: 5-7 business days",
          ].map((point, i) => (
            <div key={i} className="flex items-start gap-2">
              <i className="ri-checkbox-circle-fill text-pink-400 text-sm mt-0.5 flex-shrink-0"></i>
              <p className="text-xs text-gray-600">{point}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}