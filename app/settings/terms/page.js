// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const terms = [
//   { title: "Acceptance of Terms", icon: "ri-file-check-line", color: "bg-blue-50 text-blue-500", content: "By accessing or using Zivara, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform." },
//   { title: "User Accounts", icon: "ri-user-line", color: "bg-purple-50 text-purple-500", content: "You are responsible for maintaining the confidentiality of your account credentials. You must be at least 18 years old to create an account and make purchases on Zivara." },
//   { title: "Orders & Payments", icon: "ri-shopping-bag-line", color: "bg-pink-50 text-pink-500", content: "All orders are subject to product availability. Prices are subject to change without notice. We reserve the right to refuse or cancel any order at our discretion." },
//   { title: "Returns & Refunds", icon: "ri-refund-2-line", color: "bg-green-50 text-green-500", content: "Products may be returned within 7 days of delivery in their original condition. Refunds are processed to the original payment method within 5-7 business days after approval." },
//   { title: "Intellectual Property", icon: "ri-copyright-line", color: "bg-amber-50 text-amber-500", content: "All content on Zivara, including logos, images, and text, is the intellectual property of Zivara and may not be used without written permission." },
//   { title: "Limitation of Liability", icon: "ri-shield-line", color: "bg-red-50 text-red-400", content: "Zivara shall not be liable for any indirect, incidental, or consequential damages arising from your use of our platform or products purchased through it." },
//   { title: "Governing Law", icon: "ri-scales-line", color: "bg-teal-50 text-teal-500", content: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India." },
// ];

// export default function TermsPage() {
//   const router = useRouter();
//   const [open, setOpen] = useState(null);

//   return (
//     <div className="mt-16 text-black min-h-screen bg-gray-50 pb-10">

//       <div className="px-4 py-5 bg-white border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
//           <div>
//             <h1 className="text-base font-semibold">Terms of Service</h1>
//             <p className="text-xs text-gray-400">Last updated: April 2026</p>
//           </div>
//         </div>
//       </div>

//       <div className="mx-4 mt-4 bg-white rounded-2xl border border-gray-100 px-4 py-4">
//         <p className="text-xs text-gray-500 leading-relaxed">
//           Please read these Terms of Service carefully before using Zivara. These terms govern your use of our platform and services.
//         </p>
//       </div>

//       <div className="px-4 mt-3 space-y-2">
//         {terms.map((term, i) => (
//           <div key={term.title} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
//             <button
//               onClick={() => setOpen(open === i ? null : i)}
//               className="w-full flex items-center gap-3 px-4 py-4 text-left"
//             >
//               <div className={`${term.color} w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0`}>
//                 <i className={`${term.icon} text-lg`}></i>
//               </div>
//               <p className="text-sm font-medium flex-1">{term.title}</p>
//               <i className={`ri-arrow-${open === i ? "up" : "down"}-s-line text-gray-300 text-lg flex-shrink-0`}></i>
//             </button>
//             {open === i && (
//               <div className="px-4 pb-4">
//                 <p className="text-xs text-gray-500 leading-relaxed">{term.content}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mx-4 mt-3 bg-gray-100 rounded-2xl px-4 py-4">
//         <p className="text-xs text-gray-400 leading-relaxed text-center">
//           By using Zivara, you acknowledge that you have read and understood these Terms of Service.
//         </p>
//       </div>

//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lemonMilk } from "@/app/fonts";

const terms = [
  {
    title: "Acceptance of Terms",

    icon: "ri-file-check-line",

    glow: "from-blue-500/20 to-cyan-500/5",

    content:
      "By accessing or using Zivara, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.",
  },

  {
    title: "User Accounts",

    icon: "ri-user-line",

    glow: "from-purple-500/20 to-pink-500/5",

    content:
      "You are responsible for maintaining the confidentiality of your account credentials. You must be at least 18 years old to create an account and make purchases on Zivara.",
  },

  {
    title: "Orders & Payments",

    icon: "ri-shopping-bag-line",

    glow: "from-pink-500/20 to-rose-500/5",

    content:
      "All orders are subject to product availability. Prices are subject to change without notice. We reserve the right to refuse or cancel any order at our discretion.",
  },

  {
    title: "Returns & Refunds",

    icon: "ri-refund-2-line",

    glow: "from-green-500/20 to-emerald-500/5",

    content:
      "Products may be returned within 7 days of delivery in their original condition. Refunds are processed to the original payment method within 5-7 business days after approval.",
  },

  {
    title: "Intellectual Property",

    icon: "ri-copyright-line",

    glow: "from-amber-500/20 to-yellow-500/5",

    content:
      "All content on Zivara, including logos, images, and text, is the intellectual property of Zivara and may not be used without written permission.",
  },

  {
    title: "Limitation of Liability",

    icon: "ri-shield-line",

    glow: "from-red-500/20 to-rose-500/5",

    content:
      "Zivara shall not be liable for any indirect, incidental, or consequential damages arising from your use of our platform or products purchased through it.",
  },

  {
    title: "Governing Law",

    icon: "ri-scales-line",

    glow: "from-teal-500/20 to-cyan-500/5",

    content:
      "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.",
  },
];

export default function TermsPage() {
  const router = useRouter();

  const [open, setOpen] = useState(null);

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
              T
            </span>

            <span className="text-xl md:text-4xl">
              erms Of Service
            </span>
          </h1>

        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Last Updated • April 2026
        </p>

      </div>

      {/* INTRO */}
      <div className="px-4 md:px-6 mb-10">

        <div className="relative overflow-hidden rounded-[2rem] bg-black text-white">

          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative p-8 md:p-12">

            <p className="text-white/50 text-xs uppercase tracking-[0.3em]">
              Legal Agreement
            </p>

            <h2 className="text-3xl md:text-6xl font-light leading-tight mt-6">
              Terms that protect
              <br />
              both you & Zivara.
            </h2>

            <p className="text-white/70 text-sm md:text-base leading-8 mt-8 max-w-3xl">
              Please read these Terms of Service carefully
              before using Zivara. These terms govern your
              access to our platform, products, and services.
            </p>

          </div>

        </div>

      </div>

      {/* TERMS */}
      <div className="space-y-5 px-4 md:px-6">

        {terms.map((term, i) => {

          const active = open === i;

          return (

            <div
              key={term.title}
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                bg-[#f8f8f8]
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
                  ${term.glow}
                `}
              ></div>

              {/* BUTTON */}
              <button
                onClick={() =>
                  setOpen(
                    active ? null : i
                  )
                }
                className="
                  relative
                  w-full
                  flex
                  items-center
                  justify-between
                  gap-5
                  p-6 md:p-8
                  text-left
                "
              >

                {/* LEFT */}
                <div className="flex items-center gap-5">

                  {/* ICON */}
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
                      className={`${term.icon} text-3xl text-black`}
                    ></i>

                  </div>

                  {/* TITLE */}
                  <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                      Section {String(i + 1).padStart(2, "0")}
                    </p>

                    <h2 className="text-2xl md:text-4xl font-light text-black mt-3">
                      {term.title}
                    </h2>

                  </div>

                </div>

                {/* TOGGLE */}
                <div
                  className={`
                    w-12
                    h-12
                    rounded-full
                    border
                    border-gray-200
                    flex
                    items-center
                    justify-center
                    shrink-0
                    transition-all
                    duration-500
                    ${
                      active
                        ? "bg-black text-white border-black rotate-180"
                        : "bg-white text-black"
                    }
                  `}
                >

                  <i className="ri-arrow-down-s-line text-xl"></i>

                </div>

              </button>

              {/* CONTENT */}
              <div
                className={`
                  relative
                  transition-all
                  duration-500
                  overflow-hidden
                  ${
                    active
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }
                `}
              >

                <div className="px-6 md:px-8 pb-8 md:pl-[7.5rem]">

                  <div className="border-t border-gray-200 pt-6">

                    <p className="text-gray-600 leading-8 text-sm md:text-base">
                      {term.content}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          );
        })}

      </div>

      {/* FOOTER */}
      <div className="px-4 md:px-6 mt-10">

        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            bg-[#f8f8f8]
          "
        >

          {/* Glow */}
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-black/5 rounded-full blur-3xl"></div>

          <div className="relative p-8 md:p-10 text-center">

            <div
              className="
                w-20
                h-20
                rounded-full
                bg-white
                flex items-center justify-center
                mx-auto
              "
            >

              <i className="ri-scales-3-line text-4xl text-black"></i>

            </div>

            <h2 className="text-3xl md:text-5xl font-light text-black mt-8">
              Agreement Notice
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-8 mt-5 max-w-2xl mx-auto">
              By using Zivara, you acknowledge that
              you have read, understood, and agreed
              to these Terms of Service.
            </p>

            <div
              className="
                inline-flex
                items-center
                gap-3
                mt-8
                px-7
                py-4
                rounded-full
                bg-black
                text-white
                text-sm
                uppercase
                tracking-[0.2em]
              "
            >

              <i className="ri-checkbox-circle-line text-lg"></i>

              <span>Terms Accepted</span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}