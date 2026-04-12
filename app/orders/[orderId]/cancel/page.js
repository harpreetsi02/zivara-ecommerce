"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const reasons = [
  "Ordered by mistake",
  "Found a better price elsewhere",
  "Delivery time is too long",
  "Want to change delivery address",
  "Want to change payment method",
  "Other",
];

export default function CancelOrderPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const [step, setStep] = useState(1); // 1=reason, 2=confirm, 3=success
  const [reason, setReason] = useState(null);

  if (step === 3) return (
    <div className="mt-16 min-h-screen bg-white flex flex-col items-center justify-center px-8 text-center">
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <i className="ri-close-circle-fill text-red-400 text-4xl"></i>
      </div>
      <h2 className="text-lg font-semibold">Order Cancelled</h2>
      <p className="text-sm text-gray-400 mt-2 leading-relaxed">
        Your order #{orderId} has been successfully cancelled. Refund will be processed within 5-7 business days.
      </p>
      <p className="text-xs text-gray-300 mt-1">Cancellation ID: CX{orderId}01</p>
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
            <h1 className="text-base font-semibold">Cancel Order</h1>
            <p className="text-xs text-gray-400">#{orderId} • Step {step} of 2</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-400 rounded-full transition-all duration-500"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-4 py-6">

        {/* Step 1 — Reason */}
        {step === 1 && (
          <div>
            <h2 className="text-sm font-semibold mb-1">Why are you cancelling?</h2>
            <p className="text-xs text-gray-400 mb-5">Please select a reason</p>

            <div className="space-y-2">
              {reasons.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all ${
                    reason === r ? "border-red-400 bg-red-50" : "border-gray-100"
                  }`}
                >
                  <p className="text-sm">{r}</p>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    reason === r ? "border-red-500 bg-red-500" : "border-gray-300"
                  }`}>
                    {reason === r && <i className="ri-check-line text-white text-xs"></i>}
                  </div>
                </button>
              ))}
            </div>

            <button
              disabled={!reason}
              onClick={() => setStep(2)}
              className={`mt-5 w-full py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                reason ? "bg-red-500 text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2 — Confirm */}
        {step === 2 && (
          <div>
            <h2 className="text-sm font-semibold mb-5">Confirm cancellation</h2>

            {/* Warning */}
            <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-4 flex gap-3 mb-4">
              <i className="ri-error-warning-line text-red-400 text-xl flex-shrink-0 mt-0.5"></i>
              <p className="text-xs text-red-500 leading-relaxed">
                Once cancelled, this action cannot be undone. If paid online, refund will be credited in 5-7 business days.
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-50 rounded-2xl px-4 py-4">
                <p className="text-xs text-gray-400 mb-1">Order ID</p>
                <p className="text-sm font-semibold">#{orderId}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl px-4 py-4">
                <p className="text-xs text-gray-400 mb-1">Cancellation Reason</p>
                <p className="text-sm font-semibold">{reason}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl px-4 py-4">
                <p className="text-xs text-gray-400 mb-1">Refund Method</p>
                <p className="text-sm font-semibold">Original Payment Method</p>
                <p className="text-xs text-gray-400 mt-0.5">Within 5-7 business days</p>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => router.back()}
                className="flex-1 py-3.5 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600"
              >
                Go Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 bg-red-500 text-white rounded-2xl text-sm font-semibold"
              >
                Cancel Order
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}