// "use client";

// import { useRouter } from "next/navigation";

// const steps = [
//   { icon: "ri-shopping-bag-line", title: "Initiate Return", desc: "Go to My Orders, select the item and click Return / Exchange." },
//   { icon: "ri-map-pin-line", title: "Schedule Pickup", desc: "Choose a convenient date and time for our courier to pick up." },
//   { icon: "ri-checkbox-circle-line", title: "Quality Check", desc: "Item is inspected at our warehouse within 2-3 business days." },
//   { icon: "ri-refund-2-line", title: "Refund Processed", desc: "Refund is credited to your original payment method in 5-7 days." },
// ];

// export default function ReturnsPage() {
//   const router = useRouter();

//   return (
//     <div className="mt-16 text-black min-h-screen bg-white">

//       {/* Header */}
//       <div className="px-4 py-5 border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
//           <div>
//             <h1 className="text-base font-semibold">Return Policy</h1>
//             <p className="text-xs text-gray-400">Easy returns within 7 days</p>
//           </div>
//         </div>
//       </div>

//       {/* Banner */}
//       <div className="mx-4 mt-5 bg-pink-50 rounded-2xl px-4 py-4 flex items-center gap-3">
//         <i className="ri-refund-2-line text-3xl text-pink-400"></i>
//         <div>
//           <p className="text-sm font-semibold text-pink-600">7-Day Easy Returns</p>
//           <p className="text-xs text-pink-400 mt-0.5">No questions asked return policy</p>
//         </div>
//       </div>

//       {/* Steps */}
//       <div className="px-4 mt-6">
//         <p className="text-sm font-semibold mb-4">How it works</p>
//         <div className="relative">
//           {steps.map((step, i) => (
//             <div key={i} className="flex gap-4 mb-6 relative">
//               <div className="flex flex-col items-center">
//                 <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
//                   <i className={`${step.icon} text-pink-500 text-lg`}></i>
//                 </div>
//                 {i < steps.length - 1 && (
//                   <div className="w-0.5 h-full bg-pink-100 mt-1"></div>
//                 )}
//               </div>
//               <div className="pt-2">
//                 <p className="text-sm font-semibold">{step.title}</p>
//                 <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Policy points */}
//       <div className="px-4 mt-2 mb-8">
//         <p className="text-sm font-semibold mb-3">Policy Details</p>
//         <div className="space-y-2">
//           {[
//             "Items must be unused and in original packaging",
//             "Tags should be intact at the time of return",
//             "Innerwear & swimwear are non-returnable",
//             "Sale items are eligible for exchange only",
//             "Refund timeline: 5-7 business days",
//           ].map((point, i) => (
//             <div key={i} className="flex items-start gap-2">
//               <i className="ri-checkbox-circle-fill text-pink-400 text-sm mt-0.5 flex-shrink-0"></i>
//               <p className="text-xs text-gray-600">{point}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { lemonMilk } from "@/app/fonts";

const steps = [
  {
    icon: "ri-shopping-bag-line",

    title: "Initiate Return",

    desc: "Go to My Orders, select the item and click Return / Exchange.",
  },

  {
    icon: "ri-map-pin-line",

    title: "Schedule Pickup",

    desc: "Choose a convenient date and time for our courier partner to collect your order.",
  },

  {
    icon: "ri-checkbox-circle-line",

    title: "Quality Check",

    desc: "Your product is inspected at our warehouse within 2-3 business days.",
  },

  {
    icon: "ri-refund-2-line",

    title: "Refund Processed",

    desc: "Refund is credited back to your original payment method within 5-7 business days.",
  },
];

const policyPoints = [
  "Items must be unused and in original packaging",

  "Tags should remain attached at the time of return",

  "Innerwear & swimwear are non-returnable",

  "Sale items are eligible for exchange only",

  "Refund timeline: 5-7 business days",
];

export default function ReturnsPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-white pt-24 pb-20 overflow-hidden">

      {/* HEADING */}
      <div className="text-center mb-12 px-4">

        <div className="flex items-center justify-center gap-4">

          <button
            onClick={() => router.back()}
            className="
              w-11 h-11
              rounded-full
              border border-gray-200
              flex items-center justify-center
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
              eturn Policy
            </span>
          </h1>

        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Easy Returns Within 7 Days
        </p>

      </div>

      {/* HERO */}
      <div className="px-4 md:px-6 mb-10">

        <div className="relative overflow-hidden rounded-[2rem] bg-black text-white">

          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>

          <div className="relative p-8 md:p-12">

            {/* Top */}
            <div className="flex items-center gap-5">

              <div
                className="
                  w-20
                  h-20
                  rounded-[1.8rem]
                  bg-white/10
                  backdrop-blur-md
                  border border-white/10
                  flex items-center justify-center
                  shrink-0
                "
              >

                <i className="ri-refund-2-line text-4xl text-white"></i>

              </div>

              <div>

                <p className="text-white/50 text-xs uppercase tracking-[0.3em]">
                  Hassle Free Process
                </p>

                <h2 className="text-3xl md:text-6xl font-light leading-tight mt-5">
                  7-Day Easy
                  <br />
                  Returns
                </h2>

              </div>

            </div>

            {/* Bottom */}
            <p className="text-white/70 text-sm md:text-base leading-8 mt-10 max-w-3xl">
              Shop confidently with our smooth and
              transparent return process designed for
              a stress-free experience.
            </p>

          </div>

        </div>

      </div>

      {/* HOW IT WORKS */}
      <div className="px-4 md:px-6 mb-12">

        <div className="mb-6">

          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Return Process
          </p>

        </div>

        <div className="space-y-6">

          {steps.map((step, i) => (

            <div
              key={step.title}
              className="
                relative
                bg-[#f8f8f8]
                rounded-[2rem]
                overflow-hidden
              "
            >

              {/* Connector */}
              {i < steps.length - 1 && (

                <div
                  className="
                    absolute
                    left-11
                    top-24
                    bottom-[-2rem]
                    w-[2px]
                    bg-gradient-to-b
                    from-pink-200
                    to-transparent
                  "
                ></div>

              )}

              {/* Content */}
              <div className="p-6 md:p-8 flex gap-5">

                {/* Icon */}
                <div
                  className="
                    w-16
                    h-16
                    rounded-[1.5rem]
                    bg-white
                    flex items-center justify-center
                    shrink-0
                  "
                >

                  <i
                    className={`${step.icon} text-3xl text-pink-500`}
                  ></i>

                </div>

                {/* Text */}
                <div className="flex-1">

                  <div className="flex items-center gap-3 flex-wrap">

                    <div
                      className="
                        px-4
                        py-2
                        rounded-full
                        bg-pink-500/10
                        border border-pink-500/20
                        text-pink-500
                        text-[10px]
                        uppercase
                        tracking-[0.2em]
                      "
                    >
                      Step {i + 1}
                    </div>

                  </div>

                  <h2 className="text-2xl md:text-4xl font-light text-black mt-5">
                    {step.title}
                  </h2>

                  <p className="text-gray-500 text-sm md:text-base leading-8 mt-5">
                    {step.desc}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* POLICY DETAILS */}
      <div className="px-4 md:px-6">

        <div className="mb-6">

          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Policy Details
          </p>

        </div>

        <div
          className="
            bg-[#f8f8f8]
            rounded-[2rem]
            overflow-hidden
          "
        >

          {/* Top */}
          <div className="p-6 md:p-8 border-b border-gray-200">

            <h2 className="text-3xl md:text-5xl font-light text-black">
              Important Guidelines
            </h2>

            <p className="text-gray-400 text-sm leading-7 mt-5">
              Please review the following conditions
              before initiating a return request.
            </p>

          </div>

          {/* Points */}
          <div className="p-6 md:p-8 space-y-5">

            {policyPoints.map((point, i) => (

              <div
                key={i}
                className="
                  flex
                  items-start
                  gap-4
                "
              >

                {/* Check */}
                <div
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-white
                    flex items-center justify-center
                    shrink-0
                  "
                >

                  <i className="ri-check-line text-pink-500 text-lg"></i>

                </div>

                {/* Text */}
                <p className="text-gray-600 leading-7 pt-1">
                  {point}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}