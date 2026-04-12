"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const reasons = [
  "Wrong size / doesn't fit",
  "Wrong item received",
  "Damaged / defective product",
  "Not as described",
  "Changed my mind",
  "Other",
];

export default function ReturnPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const [step, setStep] = useState(1); // 1=type, 2=reason, 3=confirm, 4=success
  const [type, setType] = useState(null); // "return" or "exchange"
  const [reason, setReason] = useState(null);

  if (step === 4) return (
    <div className="mt-16 min-h-screen bg-white flex flex-col items-center justify-center px-8 text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <i className="ri-checkbox-circle-fill text-green-500 text-4xl"></i>
      </div>
      <h2 className="text-lg text-black font-semibold">{type === "return" ? "Return" : "Exchange"} Requested!</h2>
      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        Your request has been submitted. Our team will contact you within 24 hours to schedule a pickup.
      </p>
      <p className="text-xs text-gray-400 mt-1">Request ID: RT{orderId}01</p>
      <button
        onClick={() => router.push("/orders")}
        className="mt-6 w-full py-3.5 bg-black text-white rounded-2xl text-sm font-semibold"
      >
        Back to Orders
      </button>
    </div>
  );

  return (
    <div className="mt-16 text-black min-h-screen bg-white pb-10">

      {/* Header */}
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i
            className="ri-arrow-left-line text-xl cursor-pointer"
            onClick={() => step === 1 ? router.back() : setStep(step - 1)}
          ></i>
          <div>
            <h1 className="text-base font-semibold">Return / Exchange</h1>
            <p className="text-xs text-gray-400">#{orderId} • Step {step} of 3</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-pink-400 rounded-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-4 py-6">

        {/* Step 1 — Type */}
        {step === 1 && (
          <div>
            <h2 className="text-sm font-semibold mb-1">What would you like to do?</h2>
            <p className="text-xs text-gray-400 mb-5">Select an option to proceed</p>
            <div className="space-y-3">
              {[
                { key: "return", icon: "ri-refund-2-line", title: "Return Item", desc: "Get a full refund to your original payment method", color: "bg-pink-50 text-pink-500" },
                { key: "exchange", icon: "ri-repeat-line", title: "Exchange Item", desc: "Swap for a different size or color", color: "bg-blue-50 text-blue-500" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => { setType(opt.key); setStep(2); }}
                  className="w-full flex items-center gap-4 border border-gray-100 rounded-2xl px-4 py-4 text-left hover:border-pink-200 transition-all"
                >
                  <div className={`${opt.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <i className={`${opt.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{opt.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                  </div>
                  <i className="ri-arrow-right-s-line text-gray-300 text-lg ml-auto"></i>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Reason */}
        {step === 2 && (
          <div>
            <h2 className="text-sm font-semibold mb-1">Why are you {type === "return" ? "returning" : "exchanging"}?</h2>
            <p className="text-xs text-gray-400 mb-5">Select a reason</p>
            <div className="space-y-2">
              {reasons.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all ${
                    reason === r ? "border-pink-400 bg-pink-50" : "border-gray-100"
                  }`}
                >
                  <p className="text-sm">{r}</p>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    reason === r ? "border-pink-500 bg-pink-500" : "border-gray-300"
                  }`}>
                    {reason === r && <i className="ri-check-line text-white text-xs"></i>}
                  </div>
                </button>
              ))}
            </div>
            <button
              disabled={!reason}
              onClick={() => setStep(3)}
              className={`mt-5 w-full py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                reason ? "bg-black text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3 — Confirm */}
        {step === 3 && (
          <div>
            <h2 className="text-sm font-semibold mb-5">Confirm your request</h2>

            <div className="space-y-3">
              <div className="bg-gray-50 rounded-2xl px-4 py-4">
                <p className="text-xs text-gray-400 mb-1">Request Type</p>
                <p className="text-sm font-semibold capitalize">{type}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl px-4 py-4">
                <p className="text-xs text-gray-400 mb-1">Reason</p>
                <p className="text-sm font-semibold">{reason}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl px-4 py-4">
                <p className="text-xs text-gray-400 mb-1">Pickup Address</p>
                <p className="text-sm text-gray-600 leading-relaxed">B-204, Green Valley Apartments, Sector 62, Noida, UP - 201301</p>
              </div>
              {type === "return" && (
                <div className="bg-pink-50 rounded-2xl px-4 py-4">
                  <p className="text-xs text-pink-400 mb-1">Refund Info</p>
                  <p className="text-sm font-semibold text-pink-600">Refund in 5-7 business days</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setStep(4)}
              className="mt-5 w-full py-3.5 bg-black text-white rounded-2xl text-sm font-semibold"
            >
              Submit Request
            </button>
          </div>
        )}

      </div>
    </div>
  );
}