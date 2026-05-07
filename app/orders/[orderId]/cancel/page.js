// "use client";

// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { orderAPI } from "@/utils/api";
// import { lemonMilk } from "@/app/fonts";

// const reasons = [
//   "Ordered by mistake",
//   "Found a better price elsewhere",
//   "Delivery time is too long",
//   "Want to change delivery address",
//   "Want to change payment method",
//   "Other",
// ];

// export default function CancelOrderPage() {
//   const { orderId } = useParams();
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [reason, setReason] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleCancel = async () => {
//     setLoading(true);
//     try {
//       await orderAPI.cancelOrder(orderId);
//       setStep(3);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (step === 3) return (
//     <div className="mt-16 min-h-screen bg-white flex flex-col items-center justify-center px-8 text-center">
//       <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
//         <i className="ri-close-circle-fill text-red-400 text-4xl"></i>
//       </div>
//       <h2 className="text-lg text-black font-semibold">Order Cancelled</h2>
//       <p className="text-sm text-gray-500 mt-2 leading-relaxed">
//         Your order #ZV{orderId} has been successfully cancelled. Refund will be processed within 5-7 business days.
//       </p>
//       <button
//         onClick={() => router.push("/orders")}
//         className="mt-6 w-full py-3.5 bg-black text-white rounded-2xl text-sm font-semibold"
//       >
//         Back to Orders
//       </button>
//     </div>
//   );

//   return (
//     <div className="mt-16 min-h-screen bg-white pb-10">

//       <div className="px-4 py-5 border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           <i
//             className="ri-arrow-left-line text-xl text-gray-800 cursor-pointer"
//             onClick={() => step === 1 ? router.back() : setStep(step - 1)}
//           ></i>
//           <div>
//             <h1 className={`${lemonMilk.className} text-base text-black font-semibold`}>Cancel Order</h1>
//             <p className="text-xs text-gray-400">#ZV{orderId} • Step {step} of 2</p>
//           </div>
//         </div>
//         <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-red-400 rounded-full transition-all duration-500"
//             style={{ width: `${(step / 2) * 100}%` }}
//           />
//         </div>
//       </div>

//       <div className="px-4 py-6">

//         {step === 1 && (
//           <div>
//             <h2 className="text-sm text-gray-800 font-semibold mb-1">Why are you cancelling?</h2>
//             <p className="text-xs text-gray-400 mb-5">Please select a reason</p>
//             <div className="space-y-2">
//               {reasons.map((r) => (
//                 <button
//                   key={r}
//                   onClick={() => setReason(r)}
//                   className={`w-full text-gray-500 flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all ${
//                     reason === r ? "border-red-400 bg-red-50" : "border-gray-100"
//                   }`}
//                 >
//                   <p className="text-sm">{r}</p>
//                   <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                     reason === r ? "border-red-500 bg-red-500" : "border-gray-300"
//                   }`}>
//                     {reason === r && <i className="ri-check-line text-white text-xs"></i>}
//                   </div>
//                 </button>
//               ))}
//             </div>
//             <button
//               disabled={!reason}
//               onClick={() => setStep(2)}
//               className={`mt-5 w-full py-3.5 rounded-2xl text-sm font-semibold transition-all ${
//                 reason ? "bg-red-500 text-white" : "bg-gray-100 text-gray-400"
//               }`}
//             >
//               Continue
//             </button>
//           </div>
//         )}

//         {step === 2 && (
//           <div>
//             <h2 className="text-sm text-black font-semibold mb-5">Confirm cancellation</h2>

//             <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-4 flex gap-3 mb-4">
//               <i className="ri-error-warning-line text-red-400 text-xl shrink-0 mt-0.5"></i>
//               <p className="text-xs text-red-500 leading-relaxed">
//                 Once cancelled, this action cannot be undone. Refund will be credited in 5-7 business days.
//               </p>
//             </div>

//             <div className="space-y-3">
//               <div className="bg-gray-50 rounded-2xl px-4 py-4">
//                 <p className="text-xs text-gray-400 mb-1">Order ID</p>
//                 <p className="text-sm text-gray-800 font-semibold">#ZV{orderId}</p>
//               </div>
//               <div className="bg-gray-50 rounded-2xl px-4 py-4">
//                 <p className="text-xs text-gray-400 mb-1">Reason</p>
//                 <p className="text-sm text-gray-800 font-semibold">{reason}</p>
//               </div>
//             </div>

//             <div className="flex gap-3 mt-5">
//               <button
//                 onClick={() => setStep(1)}
//                 className="flex-1 py-3.5 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600"
//               >
//                 Go Back
//               </button>
//               <button
//                 onClick={handleCancel}
//                 disabled={loading}
//                 className={`flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white ${
//                   loading ? "bg-gray-300" : "bg-red-500"
//                 }`}
//               >
//                 {loading ? "Cancelling..." : "Cancel Order"}
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { orderAPI } from "@/utils/api";
import { lemonMilk } from "@/app/fonts";

const reasons = [
  "Ordered by mistake",

  "Found a better price elsewhere",

  "Delivery time is too long",

  "Want to change delivery address",

  "Want to change payment method",

  "Other",
];

export default function CancelOrderPage() {

  const { orderId } =
    useParams();

  const router = useRouter();

  const [step, setStep] =
    useState(1);

  const [reason, setReason] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleCancel = async () => {

    setLoading(true);

    try {

      await orderAPI.cancelOrder(
        orderId
      );

      setStep(3);

    } catch (err) {

      alert(err.message);

    } finally {

      setLoading(false);

    }
  };

  // SUCCESS
  if (step === 3) {

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
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"></div>

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

              <i className="ri-close-circle-fill text-5xl text-red-400"></i>

            </div>

            {/* Text */}
            <h1 className="text-4xl md:text-6xl font-light mt-10">
              Order Cancelled
            </h1>

            <p className="text-white/60 text-sm md:text-base leading-8 mt-6 max-w-xl mx-auto">
              Your order #
              <span className="text-white">
                ZV{orderId}
              </span>{" "}
              has been cancelled successfully.
              Refund will reflect within
              5-7 business days.
            </p>

            {/* Button */}
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
              C
            </span>

            <span className="text-xl md:text-4xl">
              ancel Order
            </span>

          </h1>

        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Order #ZV{orderId}
        </p>

      </div>

      {/* PROGRESS */}
      <div className="px-4 md:px-6 mb-10">

        <div className="max-w-3xl mx-auto">

          <div className="flex items-center justify-between mb-4">

            {[1, 2].map((s) => (

              <div
                key={s}
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
                      step >= s
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-400"
                    }
                  `}
                >
                  {s}
                </div>

                <p
                  className={`
                    hidden
                    md:block
                    uppercase
                    tracking-[0.2em]
                    text-xs
                    ${
                      step >= s
                        ? "text-black"
                        : "text-gray-400"
                    }
                  `}
                >
                  {s === 1
                    ? "Reason"
                    : "Confirmation"}
                </p>

              </div>

            ))}

          </div>

          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">

            <div
              className="
                h-full
                bg-red-500
                rounded-full
                transition-all
                duration-500
              "
              style={{
                width: `${(step / 2) * 100}%`,
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

              {/* Top */}
              <div className="mb-10">

                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Cancellation Reason
                </p>

                <h2 className="text-4xl md:text-6xl font-light text-black mt-5 leading-tight">
                  Why are you
                  <br />
                  cancelling?
                </h2>

              </div>

              {/* Reasons */}
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
                          ? "border-red-500 bg-red-50"
                          : "border-gray-100 bg-[#f8f8f8]"
                      }
                    `}
                  >

                    {/* Number */}
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
                            ? "bg-red-500 text-white"
                            : "bg-white text-black"
                        }
                      `}
                    >
                      {String(i + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    {/* Text */}
                    <h3 className="text-xl md:text-2xl font-light text-black mt-8">
                      {r}
                    </h3>

                    {/* Check */}
                    {reason === r && (

                      <div className="absolute top-5 right-5">

                        <div
                          className="
                            w-10
                            h-10
                            rounded-full
                            bg-red-500
                            text-white
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <i className="ri-check-line text-lg"></i>

                        </div>

                      </div>

                    )}

                  </button>

                ))}

              </div>

              {/* Continue */}
              <button
                disabled={!reason}
                onClick={() =>
                  setStep(2)
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
                      ? "bg-red-500 text-white hover:scale-[1.01]"
                      : "bg-gray-100 text-gray-400"
                  }
                `}
              >

                Continue

              </button>

            </div>

          )}

          {/* STEP 2 */}
          {step === 2 && (

            <div>

              {/* Top */}
              <div className="mb-10">

                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Final Confirmation
                </p>

                <h2 className="text-4xl md:text-6xl font-light text-black mt-5 leading-tight">
                  Confirm
                  <br />
                  cancellation.
                </h2>

              </div>

              {/* Warning */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  bg-red-50
                  border
                  border-red-100
                  p-8
                  mb-8
                "
              >

                <div className="flex gap-5">

                  <div
                    className="
                      w-14
                      h-14
                      rounded-full
                      bg-white
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >

                    <i className="ri-error-warning-line text-red-500 text-2xl"></i>

                  </div>

                  <div>

                    <h3 className="text-2xl font-light text-black">
                      Important Notice
                    </h3>

                    <p className="text-red-500 text-sm leading-7 mt-4">
                      Once cancelled, this action cannot
                      be undone. Refunds are processed
                      within 5-7 business days.
                    </p>

                  </div>

                </div>

              </div>

              {/* DETAILS */}
              <div className="grid md:grid-cols-2 gap-5">

                <div
                  className="
                    rounded-[2rem]
                    bg-[#f8f8f8]
                    p-8
                  "
                >

                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    Order ID
                  </p>

                  <h3 className="text-3xl font-light text-black mt-5">
                    #ZV{orderId}
                  </h3>

                </div>

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

              </div>

              {/* ACTIONS */}
              <div className="flex flex-col md:flex-row gap-4 mt-10">

                <button
                  onClick={() =>
                    setStep(1)
                  }
                  className="
                    flex-1
                    py-5
                    rounded-full
                    border
                    border-gray-200
                    text-black
                    uppercase
                    tracking-[0.2em]
                    text-sm
                    hover:bg-black
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >

                  Go Back

                </button>

                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className={`
                    flex-1
                    py-5
                    rounded-full
                    uppercase
                    tracking-[0.2em]
                    text-sm
                    text-white
                    transition-all
                    duration-300
                    ${
                      loading
                        ? "bg-gray-300"
                        : "bg-red-500 hover:bg-red-600"
                    }
                  `}
                >

                  {loading
                    ? "Cancelling..."
                    : "Cancel Order"}

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </section>
  );
}