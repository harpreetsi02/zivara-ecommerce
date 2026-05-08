"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { lemonMilk } from "@/app/fonts";

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
  const [step, setStep] = useState(1);
  const [type, setType] = useState(null);
  const [reason, setReason] = useState(null);

  // SUCCESS
  if (step === 4) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center px-4 pt-24 pb-20">
        <div className="w-full max-w-2xl">
          <div
            className="relative overflow-hidden rounded-[2.5rem] bg-black text-white p-10 md:p-14 text-center"
          >

            {/* Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>

            {/* Icon */}
            <div
              className="relative w-24 h-24 rounded-full bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center mx-auto"
            >
              <i className="ri-checkbox-circle-fill text-5xl text-green-400"></i>
            </div>

            {/* TEXT */}
            <h1 className="text-4xl md:text-6xl font-light mt-10">
              {type === "return" ? "Return" : "Exchange"}{" "}
              Requested
            </h1>

            <p className="text-white/60 text-sm md:text-base leading-8 mt-6 max-w-xl mx-auto">
              Your request has been submitted successfully. Our support team will contact you within 24 hours for pickup confirmation.
            </p>

            <div
              className="mt-8 inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 border border-white/10 text-sm uppercase tracking-[0.2em]"
            >
              Request ID : RT{orderId}01
            </div>

            {/* BUTTON */}
            <button onClick={() => router.push("/orders")}
              className="mt-10 px-10 py-5 rounded-full bg-white text-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all duration-300"
            >
              Back To Orders
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen relative z-20 pt-24 pb-20 overflow-hidden">
      {/* HEADING */}
      <div className="text-center mb-12 px-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => step === 1
              ? router.back()
              : setStep(step - 1)
            }
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            <i className="ri-arrow-left-line text-lg"></i>
          </button>

          <h1
            className={`${lemonMilk.className} flex items-center text-black tracking-wide`}
          >
            <span className="text-5xl md:text-7xl leading-none">R</span>
            <span className="text-xl md:text-4xl">eturn & Exchange</span>
          </h1>
        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Order #{orderId}
        </p>
      </div>

      {/* PROGRESS */}
      <div className="px-4 md:px-6 mb-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {[
              "Request Type",
              "Reason",
              "Confirmation",
            ].map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm transition-all duration-300
                    ${step >= i + 1
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-400"
                    }
                  `}
                >
                  {i + 1}
                </div>

                <p
                  className={`hidden md:block uppercase tracking-[0.2em] text-xs
                    ${step >= i + 1
                      ? "text-black"
                      : "text-gray-400"
                    }
                  `}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* BAR */}
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-black rounded-full transition-all duration-500"
              style={{width: `${(step / 3) * 100}%`,}}
            ></div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              {/* TOP */}
              <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Choose Request Type
                </p>

                <h2 className="text-4xl md:text-6xl font-light text-black mt-5 leading-tight">
                  What would you
                  <br />
                  like to do?
                </h2>
              </div>

              {/* OPTIONS */}
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  {
                    key: "return",
                    icon: "ri-refund-2-line",
                    title: "Return Item",
                    desc: "Get your refund back to the original payment method.",
                    glow: "from-pink-500/20 to-rose-500/5",
                    bg: "bg-pink-500",
                  },
                  {
                    key: "exchange",
                    icon: "ri-repeat-line",
                    title: "Exchange Item",
                    desc: "Swap your product for another size or color.",
                    glow: "from-blue-500/20 to-cyan-500/5",
                    bg: "bg-blue-500",
                  },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {setType(opt.key);
                      setStep(2);
                    }}
                    className="relative overflow-hidden rounded-4xl bg-[#f8f8f8] text-left group"
                  >
                    {/* Glow */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-linear-to-br ${opt.glow}`}
                    ></div>

                    {/* CONTENT */}
                    <div className="relative p-8">

                      {/* TOP */}
                      <div className="flex items-center justify-between gap-4">
                        <div
                          className={`w-16 h-16 rounded-3xl ${opt.bg} flex items-center justify-center text-white shrink-0`}
                        >
                          <i className={`${opt.icon} text-3xl`}></i>
                        </div>

                        <div
                          className="w-11 h-11 rounded-full border text-black border-gray-300 flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:border-black"
                        >
                          <i className="ri-arrow-right-up-line text-lg"></i>
                        </div>
                      </div>

                      {/* TEXT */}
                      <div className="mt-8">
                        <h2 className="text-3xl md:text-4xl font-light text-black">
                          {opt.title}
                        </h2>

                        <p className="text-gray-500 text-sm leading-7 mt-5">
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              {/* TOP */}
              <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Select Reason
                </p>

                <h2 className="text-4xl md:text-6xl font-light text-black mt-5 leading-tight">
                  Why are you
                  <br />
                  {type === "return"
                    ? " returning?"
                    : " exchanging?"}
                </h2>
              </div>

              {/* REASONS */}
              <div className="grid md:grid-cols-2 gap-5">
                {reasons.map((r, i) => (
                  <button
                    key={r}
                    onClick={() => setReason(r)}
                    className={`relative overflow-hidden rounded-4xl border p-7 text-left transition-all duration-300
                      ${reason === r
                        ? "border-black bg-black text-white"
                        : "border-gray-100 bg-[#f8f8f8] text-black"
                      }
                    `}
                  >

                    {/* NUMBER */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm
                        ${reason === r
                          ? "bg-white text-black"
                          : "bg-white text-black"
                        }
                      `}
                    >
                      {String(i + 1).padStart( 2, "0" )}
                    </div>

                    {/* TEXT */}
                    <h3 className="text-xl md:text-2xl font-light mt-8 leading-tight">
                      {r}
                    </h3>

                    {/* CHECK */}
                    {reason === r && (
                      <div className="absolute top-5 right-5">
                        <div
                          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
                        >
                          <i className="ri-check-line text-lg"></i>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* BUTTON */}
              <button
                disabled={!reason}
                onClick={() => setStep(3)}
                className={`mt-10 w-full py-5 rounded-full uppercase tracking-[0.2em] text-sm transition-all duration-300
                  ${reason
                    ? "bg-black text-white hover:scale-[1.01]"
                    : "bg-gray-100 text-gray-400"
                  }
                `}
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              {/* TOP */}
              <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Final Confirmation
                </p>

                <h2 className="text-4xl md:text-6xl font-light text-black mt-5 leading-tight">
                  Review your
                  <br />
                  request.
                </h2>
              </div>

              {/* DETAILS */}
              <div className="space-y-5">
                {/* TYPE */}
                <div
                  className="rounded-4xl bg-[#f8f8f8] p-8"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    Request Type
                  </p>

                  <h3 className="text-3xl font-light text-black mt-5 capitalize">
                    {type}
                  </h3>
                </div>

                {/* REASON */}
                <div
                  className="rounded-4xl bg-[#f8f8f8] p-8"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    Selected Reason
                  </p>

                  <h3 className="text-2xl font-light text-black mt-5 leading-tight">
                    {reason}
                  </h3>
                </div>

                {/* ADDRESS */}
                <div
                  className="rounded-4xl bg-[#f8f8f8] p-8"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    Pickup Address
                  </p>

                  <p className="text-gray-600 leading-8 mt-5">
                    B-204, Green Valley Apartments, Sector 62, Noida, Uttar Pradesh - 201301
                  </p>
                </div>

                {/* REFUND */}
                {type === "return" && (
                  <div
                    className="rounded-4xl bg-pink-50 border border-pink-100 p-8"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-pink-400">
                      Refund Information
                    </p>

                    <h3 className="text-2xl font-light text-pink-600 mt-5">
                      Refund within 5-7 business days
                    </h3>
                  </div>
                )}
              </div>

              {/* BUTTON */}
              <button
                onClick={() => setStep(4)}
                className="mt-10 w-full py-5 rounded-full bg-black text-white uppercase tracking-[0.2em] text-sm hover:scale-[1.01] transition-all duration-300"
              >
                Submit Request
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}