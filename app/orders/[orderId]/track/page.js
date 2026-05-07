// "use client";

// import { useParams, useRouter } from "next/navigation";

// const steps = [
//   { label: "Order Placed", time: "2 Apr, 10:32 AM", done: true, icon: "ri-checkbox-circle-fill" },
//   { label: "Order Confirmed", time: "2 Apr, 11:00 AM", done: true, icon: "ri-checkbox-circle-fill" },
//   { label: "Packed & Dispatched", time: "3 Apr, 2:15 PM", done: true, icon: "ri-checkbox-circle-fill" },
//   { label: "Out for Delivery", time: "Today, 9:00 AM", done: true, icon: "ri-checkbox-circle-fill" },
//   { label: "Delivered", time: "Expected by 8 PM", done: false, icon: "ri-time-line" },
// ];

// export default function TrackOrderPage() {
//   const { orderId } = useParams();
//   const router = useRouter();

//   return (
//     <div className="mt-16 text-black min-h-screen bg-white pb-10">

//       {/* Header */}
//       <div className="px-4 py-5 border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
//           <div>
//             <h1 className="text-base font-semibold">Track Order</h1>
//             <p className="text-xs text-gray-400">#{orderId}</p>
//           </div>
//         </div>
//       </div>

//       {/* Live badge */}
//       <div className="mx-4 mt-5 bg-blue-50 rounded-2xl px-4 py-3 flex items-center gap-3">
//         <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
//         <div>
//           <p className="text-sm font-semibold text-blue-700">Out for Delivery</p>
//           <p className="text-xs text-blue-400 mt-0.5">Your order is on its way!</p>
//         </div>
//       </div>

//       {/* Delivery info */}
//       <div className="mx-4 mt-3 bg-gray-50 rounded-2xl px-4 py-3 flex items-center justify-between">
//         <div>
//           <p className="text-xs text-gray-400">Estimated Delivery</p>
//           <p className="text-sm font-semibold mt-0.5">Today, by 8:00 PM</p>
//         </div>
//         <div className="text-right">
//           <p className="text-xs text-gray-400">Courier</p>
//           <p className="text-sm font-semibold mt-0.5">Delhivery</p>
//         </div>
//       </div>

//       {/* Tracking Steps */}
//       <div className="px-4 mt-6">
//         <p className="text-sm font-semibold mb-5">Tracking Timeline</p>
//         <div className="relative">
//           {steps.map((step, i) => (
//             <div key={i} className="flex gap-4 mb-1">
//               <div className="flex flex-col items-center">
//                 <i className={`${step.icon} text-xl ${step.done ? "text-pink-500" : "text-gray-300"}`}></i>
//                 {i < steps.length - 1 && (
//                   <div className={`w-0.5 h-10 mt-1 ${step.done ? "bg-pink-200" : "bg-gray-100"}`}></div>
//                 )}
//               </div>
//               <div className="pb-6">
//                 <p className={`text-sm font-semibold ${step.done ? "text-black" : "text-gray-300"}`}>
//                   {step.label}
//                 </p>
//                 <p className={`text-xs mt-0.5 ${step.done ? "text-gray-400" : "text-gray-200"}`}>
//                   {step.time}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }

"use client";

import { useParams, useRouter } from "next/navigation";
import { lemonMilk } from "@/app/fonts";

const steps = [
  {
    label: "Order Placed",

    time: "2 Apr, 10:32 AM",

    done: true,

    icon: "ri-checkbox-circle-fill",
  },

  {
    label: "Order Confirmed",

    time: "2 Apr, 11:00 AM",

    done: true,

    icon: "ri-checkbox-circle-fill",
  },

  {
    label: "Packed & Dispatched",

    time: "3 Apr, 2:15 PM",

    done: true,

    icon: "ri-checkbox-circle-fill",
  },

  {
    label: "Out for Delivery",

    time: "Today, 9:00 AM",

    done: true,

    icon: "ri-truck-fill",
  },

  {
    label: "Delivered",

    time: "Expected by 8 PM",

    done: false,

    icon: "ri-time-line",
  },
];

export default function TrackOrderPage() {

  const { orderId } =
    useParams();

  const router = useRouter();

  return (
    <section className="min-h-screen bg-white pt-24 pb-20 overflow-hidden">

      {/* HEADING */}
      <div className="text-center mb-12 px-4">

        <div className="flex items-center justify-center gap-4">

          <button
            onClick={() =>
              router.back()
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
              T
            </span>

            <span className="text-xl md:text-4xl">
              rack Order
            </span>

          </h1>

        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Order #{orderId}
        </p>

      </div>

      {/* LIVE STATUS */}
      <div className="px-4 md:px-6 mb-10">

        <div className="max-w-5xl mx-auto">

          <div
            className="
              relative
              overflow-hidden
              rounded-[2.5rem]
              bg-black
              text-white
            "
          >

            {/* Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

            {/* CONTENT */}
            <div
              className="
                relative
                p-8
                md:p-12
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-10
              "
            >

              {/* LEFT */}
              <div>

                <div className="flex items-center gap-3">

                  <span className="relative flex h-3 w-3">

                    <span
                      className="
                        animate-ping
                        absolute
                        inline-flex
                        h-full
                        w-full
                        rounded-full
                        bg-blue-400
                        opacity-75
                      "
                    ></span>

                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>

                  </span>

                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Live Tracking
                  </p>

                </div>

                <h2 className="text-4xl md:text-6xl font-light mt-6 leading-tight">
                  Out for
                  <br />
                  delivery.
                </h2>

                <p className="text-white/60 text-sm md:text-base leading-8 mt-6 max-w-xl">
                  Your package is on the way and
                  expected to arrive today before
                  8 PM.
                </p>

              </div>

              {/* RIGHT */}
              <div
                className="
                  bg-white/10
                  border border-white/10
                  backdrop-blur-md
                  rounded-[2rem]
                  p-6
                  md:min-w-[320px]
                "
              >

                <div className="space-y-5">

                  <div className="flex items-center justify-between gap-5">

                    <div>

                      <p className="text-white/40 text-xs uppercase tracking-[0.2em]">
                        Courier
                      </p>

                      <h3 className="text-xl font-light mt-3">
                        Delhivery
                      </h3>

                    </div>

                    <div
                      className="
                        w-14
                        h-14
                        rounded-full
                        bg-white
                        text-black
                        flex items-center justify-center
                      "
                    >

                      <i className="ri-truck-line text-2xl"></i>

                    </div>

                  </div>

                  <div className="border-t border-white/10 pt-5">

                    <p className="text-white/40 text-xs uppercase tracking-[0.2em]">
                      Expected Delivery
                    </p>

                    <h3 className="text-2xl font-light mt-3">
                      Today, 8 PM
                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* TIMELINE */}
      <div className="px-4 md:px-6">

        <div className="max-w-5xl mx-auto">

          {/* TITLE */}
          <div className="mb-10">

            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Shipment Progress
            </p>

            <h2 className="text-4xl md:text-6xl font-light text-black mt-5 leading-tight">
              Tracking
              <br />
              timeline.
            </h2>

          </div>

          {/* STEPS */}
          <div className="relative">

            {steps.map((step, i) => (

              <div
                key={i}
                className="
                  flex
                  gap-5
                  md:gap-8
                  mb-8
                "
              >

                {/* LEFT */}
                <div className="flex flex-col items-center shrink-0">

                  {/* ICON */}
                  <div
                    className={`
                      w-14
                      h-14
                      rounded-full
                      flex
                      items-center
                      justify-center
                      border
                      transition-all
                      duration-300
                      ${
                        step.done
                          ? "bg-black border-black text-white"
                          : "bg-white border-gray-200 text-gray-300"
                      }
                    `}
                  >

                    <i
                      className={`${step.icon} text-xl`}
                    ></i>

                  </div>

                  {/* LINE */}
                  {i <
                    steps.length - 1 && (

                    <div
                      className={`
                        w-[2px]
                        flex-1
                        min-h-[80px]
                        mt-3
                        ${
                          step.done
                            ? "bg-black"
                            : "bg-gray-100"
                        }
                      `}
                    ></div>

                  )}

                </div>

                {/* RIGHT */}
                <div
                  className={`
                    flex-1
                    rounded-[2rem]
                    p-6
                    md:p-8
                    transition-all
                    duration-300
                    ${
                      step.done
                        ? "bg-[#f8f8f8]"
                        : "bg-white border border-gray-100"
                    }
                  `}
                >

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-5 flex-wrap">

                    <div>

                      <p
                        className={`
                          text-xs
                          uppercase
                          tracking-[0.2em]
                          ${
                            step.done
                              ? "text-gray-400"
                              : "text-gray-300"
                          }
                        `}
                      >
                        {step.done
                          ? "Completed"
                          : "Pending"}
                      </p>

                      <h3
                        className={`
                          text-2xl
                          md:text-3xl
                          font-light
                          mt-4
                          ${
                            step.done
                              ? "text-black"
                              : "text-gray-300"
                          }
                        `}
                      >
                        {step.label}
                      </h3>

                    </div>

                    {/* STATUS */}
                    <div
                      className={`
                        px-5
                        py-3
                        rounded-full
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        ${
                          step.done
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-400"
                        }
                      `}
                    >
                      {step.done
                        ? "Done"
                        : "Upcoming"}
                    </div>

                  </div>

                  {/* TIME */}
                  <p
                    className={`
                      mt-6
                      text-sm
                      tracking-wide
                      ${
                        step.done
                          ? "text-gray-500"
                          : "text-gray-300"
                      }
                    `}
                  >
                    {step.time}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}