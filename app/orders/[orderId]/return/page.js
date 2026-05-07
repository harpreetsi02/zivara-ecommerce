// "use client";

// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// const reasons = [
//   "Wrong size / doesn't fit",
//   "Wrong item received",
//   "Damaged / defective product",
//   "Not as described",
//   "Changed my mind",
//   "Other",
// ];

// export default function ReturnPage() {
//   const { orderId } = useParams();
//   const router = useRouter();
//   const [step, setStep] = useState(1); // 1=type, 2=reason, 3=confirm, 4=success
//   const [type, setType] = useState(null); // "return" or "exchange"
//   const [reason, setReason] = useState(null);

//   if (step === 4) return (
//     <div className="mt-16 min-h-screen bg-white flex flex-col items-center justify-center px-8 text-center">
//       <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
//         <i className="ri-checkbox-circle-fill text-green-500 text-4xl"></i>
//       </div>
//       <h2 className="text-lg text-black font-semibold">{type === "return" ? "Return" : "Exchange"} Requested!</h2>
//       <p className="text-sm text-gray-600 mt-2 leading-relaxed">
//         Your request has been submitted. Our team will contact you within 24 hours to schedule a pickup.
//       </p>
//       <p className="text-xs text-gray-400 mt-1">Request ID: RT{orderId}01</p>
//       <button
//         onClick={() => router.push("/orders")}
//         className="mt-6 w-full py-3.5 bg-black text-white rounded-2xl text-sm font-semibold"
//       >
//         Back to Orders
//       </button>
//     </div>
//   );

//   return (
//     <div className="mt-16 text-black min-h-screen bg-white pb-10">

//       {/* Header */}
//       <div className="px-4 py-5 border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           <i
//             className="ri-arrow-left-line text-xl cursor-pointer"
//             onClick={() => step === 1 ? router.back() : setStep(step - 1)}
//           ></i>
//           <div>
//             <h1 className="text-base font-semibold">Return / Exchange</h1>
//             <p className="text-xs text-gray-400">#{orderId} • Step {step} of 3</p>
//           </div>
//         </div>

//         {/* Progress bar */}
//         <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-pink-400 rounded-full transition-all duration-500"
//             style={{ width: `${(step / 3) * 100}%` }}
//           />
//         </div>
//       </div>

//       <div className="px-4 py-6">

//         {/* Step 1 — Type */}
//         {step === 1 && (
//           <div>
//             <h2 className="text-sm font-semibold mb-1">What would you like to do?</h2>
//             <p className="text-xs text-gray-400 mb-5">Select an option to proceed</p>
//             <div className="space-y-3">
//               {[
//                 { key: "return", icon: "ri-refund-2-line", title: "Return Item", desc: "Get a full refund to your original payment method", color: "bg-pink-50 text-pink-500" },
//                 { key: "exchange", icon: "ri-repeat-line", title: "Exchange Item", desc: "Swap for a different size or color", color: "bg-blue-50 text-blue-500" },
//               ].map((opt) => (
//                 <button
//                   key={opt.key}
//                   onClick={() => { setType(opt.key); setStep(2); }}
//                   className="w-full flex items-center gap-4 border border-gray-100 rounded-2xl px-4 py-4 text-left hover:border-pink-200 transition-all"
//                 >
//                   <div className={`${opt.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
//                     <i className={`${opt.icon} text-2xl`}></i>
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold">{opt.title}</p>
//                     <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
//                   </div>
//                   <i className="ri-arrow-right-s-line text-gray-300 text-lg ml-auto"></i>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Step 2 — Reason */}
//         {step === 2 && (
//           <div>
//             <h2 className="text-sm font-semibold mb-1">Why are you {type === "return" ? "returning" : "exchanging"}?</h2>
//             <p className="text-xs text-gray-400 mb-5">Select a reason</p>
//             <div className="space-y-2">
//               {reasons.map((r) => (
//                 <button
//                   key={r}
//                   onClick={() => setReason(r)}
//                   className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all ${
//                     reason === r ? "border-pink-400 bg-pink-50" : "border-gray-100"
//                   }`}
//                 >
//                   <p className="text-sm">{r}</p>
//                   <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
//                     reason === r ? "border-pink-500 bg-pink-500" : "border-gray-300"
//                   }`}>
//                     {reason === r && <i className="ri-check-line text-white text-xs"></i>}
//                   </div>
//                 </button>
//               ))}
//             </div>
//             <button
//               disabled={!reason}
//               onClick={() => setStep(3)}
//               className={`mt-5 w-full py-3.5 rounded-2xl text-sm font-semibold transition-all ${
//                 reason ? "bg-black text-white" : "bg-gray-100 text-gray-400"
//               }`}
//             >
//               Continue
//             </button>
//           </div>
//         )}

//         {/* Step 3 — Confirm */}
//         {step === 3 && (
//           <div>
//             <h2 className="text-sm font-semibold mb-5">Confirm your request</h2>

//             <div className="space-y-3">
//               <div className="bg-gray-50 rounded-2xl px-4 py-4">
//                 <p className="text-xs text-gray-400 mb-1">Request Type</p>
//                 <p className="text-sm font-semibold capitalize">{type}</p>
//               </div>
//               <div className="bg-gray-50 rounded-2xl px-4 py-4">
//                 <p className="text-xs text-gray-400 mb-1">Reason</p>
//                 <p className="text-sm font-semibold">{reason}</p>
//               </div>
//               <div className="bg-gray-50 rounded-2xl px-4 py-4">
//                 <p className="text-xs text-gray-400 mb-1">Pickup Address</p>
//                 <p className="text-sm text-gray-600 leading-relaxed">B-204, Green Valley Apartments, Sector 62, Noida, UP - 201301</p>
//               </div>
//               {type === "return" && (
//                 <div className="bg-pink-50 rounded-2xl px-4 py-4">
//                   <p className="text-xs text-pink-400 mb-1">Refund Info</p>
//                   <p className="text-sm font-semibold text-pink-600">Refund in 5-7 business days</p>
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={() => setStep(4)}
//               className="mt-5 w-full py-3.5 bg-black text-white rounded-2xl text-sm font-semibold"
//             >
//               Submit Request
//             </button>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

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

  const { orderId } =
    useParams();

  const router = useRouter();

  const [step, setStep] =
    useState(1);

  const [type, setType] =
    useState(null);

  const [reason, setReason] =
    useState(null);

  // SUCCESS
  if (step === 4) {

    return (

      <section className="min-h-screen bg-white flex items-center justify-center px-4 pt-24 pb-20">

        <div className="w-full max-w-2xl">

          <div
            className="
              relative
              overflow-hidden
              rounded-[2.5rem]
              bg-black
              text-white
              p-10
              md:p-14
              text-center
            "
          >

            {/* Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>

            {/* Icon */}
            <div
              className="
                relative
                w-24
                h-24
                rounded-full
                bg-white/10
                border
                border-white/10
                backdrop-blur-md
                flex
                items-center
                justify-center
                mx-auto
              "
            >

              <i className="ri-checkbox-circle-fill text-5xl text-green-400"></i>

            </div>

            {/* TEXT */}
            <h1 className="text-4xl md:text-6xl font-light mt-10">
              {type === "return"
                ? "Return"
                : "Exchange"}{" "}
              Requested
            </h1>

            <p className="text-white/60 text-sm md:text-base leading-8 mt-6 max-w-xl mx-auto">
              Your request has been submitted
              successfully. Our support team
              will contact you within 24 hours
              for pickup confirmation.
            </p>

            <div
              className="
                mt-8
                inline-flex
                items-center
                justify-center
                px-6
                py-3
                rounded-full
                bg-white/10
                border border-white/10
                text-sm
                uppercase
                tracking-[0.2em]
              "
            >
              Request ID :
              RT{orderId}01
            </div>

            {/* BUTTON */}
            <button
              onClick={() =>
                router.push("/orders")
              }
              className="
                mt-10
                px-10
                py-5
                rounded-full
                bg-white
                text-black
                uppercase
                tracking-[0.2em]
                text-sm
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Back To Orders
            </button>

          </div>

        </div>

      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white pt-24 pb-20 overflow-hidden">

      {/* HEADING */}
      <div className="text-center mb-12 px-4">

        <div className="flex items-center justify-center gap-4">

          <button
            onClick={() =>
              step === 1
                ? router.back()
                : setStep(step - 1)
            }
            className="
              w-11
              h-11
              rounded-full
              border
              border-gray-200
              flex
              items-center
              justify-center
              text-black
              hover:bg-black
              hover:text-white
              transition-all
              duration-300
            "
          >

            <i className="ri-arrow-left-line text-lg"></i>

          </button>

          <h1
            className={`${lemonMilk.className} flex items-center text-black tracking-wide`}
          >

            <span className="text-5xl md:text-7xl leading-none">
              R
            </span>

            <span className="text-xl md:text-4xl">
              eturn & Exchange
            </span>

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
                  className={`
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-sm
                    transition-all
                    duration-300
                    ${
                      step >= i + 1
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-400"
                    }
                  `}
                >
                  {i + 1}
                </div>

                <p
                  className={`
                    hidden
                    md:block
                    uppercase
                    tracking-[0.2em]
                    text-xs
                    ${
                      step >= i + 1
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
              className="
                h-full
                bg-black
                rounded-full
                transition-all
                duration-500
              "
              style={{
                width: `${(step / 3) * 100}%`,
              }}
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

                    icon:
                      "ri-refund-2-line",

                    title:
                      "Return Item",

                    desc:
                      "Get your refund back to the original payment method.",

                    glow:
                      "from-pink-500/20 to-rose-500/5",

                    bg:
                      "bg-pink-500",
                  },

                  {
                    key: "exchange",

                    icon:
                      "ri-repeat-line",

                    title:
                      "Exchange Item",

                    desc:
                      "Swap your product for another size or color.",

                    glow:
                      "from-blue-500/20 to-cyan-500/5",

                    bg:
                      "bg-blue-500",
                  },
                ].map((opt) => (

                  <button
                    key={opt.key}
                    onClick={() => {

                      setType(
                        opt.key
                      );

                      setStep(2);
                    }}
                    className="
                      relative
                      overflow-hidden
                      rounded-[2rem]
                      bg-[#f8f8f8]
                      text-left
                      group
                    "
                  >

                    {/* Glow */}
                    <div
                      className={`
                        absolute
                        inset-0
                        opacity-0
                        group-hover:opacity-100
                        transition-all
                        duration-700
                        bg-gradient-to-br
                        ${opt.glow}
                      `}
                    ></div>

                    {/* CONTENT */}
                    <div className="relative p-8">

                      {/* TOP */}
                      <div className="flex items-center justify-between gap-4">

                        <div
                          className={`
                            w-16
                            h-16
                            rounded-[1.5rem]
                            ${opt.bg}
                            flex items-center justify-center
                            text-white
                            shrink-0
                          `}
                        >

                          <i
                            className={`${opt.icon} text-3xl`}
                          ></i>

                        </div>

                        <div
                          className="
                            w-11
                            h-11
                            rounded-full
                            border border-gray-200
                            flex items-center justify-center
                            transition-all
                            duration-300
                            group-hover:bg-black
                            group-hover:text-white
                            group-hover:border-black
                          "
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
                    onClick={() =>
                      setReason(r)
                    }
                    className={`
                      relative
                      overflow-hidden
                      rounded-[2rem]
                      border
                      p-7
                      text-left
                      transition-all
                      duration-300
                      ${
                        reason === r
                          ? "border-black bg-black text-white"
                          : "border-gray-100 bg-[#f8f8f8] text-black"
                      }
                    `}
                  >

                    {/* NUMBER */}
                    <div
                      className={`
                        w-12
                        h-12
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-sm
                        ${
                          reason === r
                            ? "bg-white text-black"
                            : "bg-white text-black"
                        }
                      `}
                    >
                      {String(i + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    {/* TEXT */}
                    <h3 className="text-xl md:text-2xl font-light mt-8 leading-tight">
                      {r}
                    </h3>

                    {/* CHECK */}
                    {reason === r && (

                      <div className="absolute top-5 right-5">

                        <div
                          className="
                            w-10
                            h-10
                            rounded-full
                            bg-white
                            text-black
                            flex items-center justify-center
                          "
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
                onClick={() =>
                  setStep(3)
                }
                className={`
                  mt-10
                  w-full
                  py-5
                  rounded-full
                  uppercase
                  tracking-[0.2em]
                  text-sm
                  transition-all
                  duration-300
                  ${
                    reason
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
                  className="
                    rounded-[2rem]
                    bg-[#f8f8f8]
                    p-8
                  "
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
                  className="
                    rounded-[2rem]
                    bg-[#f8f8f8]
                    p-8
                  "
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
                  className="
                    rounded-[2rem]
                    bg-[#f8f8f8]
                    p-8
                  "
                >

                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    Pickup Address
                  </p>

                  <p className="text-gray-600 leading-8 mt-5">
                    B-204, Green Valley Apartments,
                    Sector 62, Noida,
                    Uttar Pradesh - 201301
                  </p>

                </div>

                {/* REFUND */}
                {type ===
                  "return" && (

                  <div
                    className="
                      rounded-[2rem]
                      bg-pink-50
                      border border-pink-100
                      p-8
                    "
                  >

                    <p className="text-xs uppercase tracking-[0.2em] text-pink-400">
                      Refund Information
                    </p>

                    <h3 className="text-2xl font-light text-pink-600 mt-5">
                      Refund within
                      5-7 business days
                    </h3>

                  </div>

                )}

              </div>

              {/* BUTTON */}
              <button
                onClick={() =>
                  setStep(4)
                }
                className="
                  mt-10
                  w-full
                  py-5
                  rounded-full
                  bg-black
                  text-white
                  uppercase
                  tracking-[0.2em]
                  text-sm
                  hover:scale-[1.01]
                  transition-all
                  duration-300
                "
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