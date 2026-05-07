// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { lemonMilk } from "../fonts";

// const settingsList = [
//   {
//     section: "Preferences",
//     items: [
//       { label: "Notifications", icon: "ri-notification-line", toggle: true },
//       { label: "Email Updates", icon: "ri-mail-line", toggle: true },
//       { label: "SMS Alerts", icon: "ri-message-line", href: "/settings/sms" },
//     ],
//   },
//   {
//     section: "Account",
//     items: [
//       { label: "Change Password", icon: "ri-lock-line", href: "/settings/change-password" },
//       { label: "Saved Addresses", icon: "ri-map-pin-line", href: "/settings/addresses" },
//       { label: "Payment Methods", icon: "ri-bank-card-line", href: "/settings/payment-methods" },
//     ],
//   },
//   {
//     section: "More",
//     items: [
//       { label: "Privacy Policy", icon: "ri-shield-line", href: "/settings/privacy-policy" },
//       { label: "Terms of Service", icon: "ri-file-text-line", href: "/settings/terms" },
//       { label: "App Version 1.0.0", icon: "ri-information-line", info: true },
//     ],
//   },
// ];

// export default function SettingsPage() {
//   const router = useRouter();
//   const [toggles, setToggles] = useState({
//     "Notifications": true,
//     "Email Updates": true,
//   });
//   const [showVersion, setShowVersion] = useState(false);

//   return (
//     <div className="mt-16 text-black min-h-screen bg-gray-50">

//       {/* Header */}
//       <div className="px-4 py-5 bg-white border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
//           <div>
//             <h1 className="text-base font-semibold">Settings</h1>
//             <p className="text-xs text-gray-400">Manage your preferences</p>
//           </div>
//         </div>
//       </div>

//       {/* Settings List */}
//       <div className="px-4 py-4 space-y-4">
//         {settingsList.map((group) => (
//           <div key={group.section}>
//             <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 px-1">
//               {group.section}
//             </p>
//             <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
//               {group.items.map((item, i) => (
//                 <div
//                   key={item.label}
//                   onClick={() => {
//                     if (item.href) router.push(item.href);
//                     if (item.info) setShowVersion(true);
//                   }}
//                   className={`flex items-center justify-between px-4 py-3.5 ${
//                     i !== group.items.length - 1 ? "border-b border-gray-100" : ""
//                   } ${item.href || item.info ? "cursor-pointer active:bg-gray-50" : ""}`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <i className={`${item.icon} text-lg text-gray-500`}></i>
//                     <p className="text-sm font-medium">{item.label}</p>
//                   </div>

//                   {item.toggle ? (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setToggles((prev) => ({ ...prev, [item.label]: !prev[item.label] }));
//                       }}
//                       className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
//                         toggles[item.label] ? "bg-pink-500" : "bg-gray-200"
//                       }`}
//                     >
//                       <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
//                         toggles[item.label] ? "left-6" : "left-1"
//                       }`} />
//                     </button>
//                   ) : (
//                     <i className="ri-arrow-right-s-line text-gray-300 text-lg"></i>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* App Version Modal */}
//       {showVersion && (
//         <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
//           <div className="bg-white w-full rounded-t-3xl px-4 pt-5 pb-10">
//             <div className="flex items-center justify-between mb-5">
//               <h2 className="text-sm font-semibold">App Info</h2>
//               <i className="ri-close-line text-xl cursor-pointer" onClick={() => setShowVersion(false)}></i>
//             </div>
//             <div className="flex flex-col items-center py-4 space-y-3">
//               <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center">
//                 <i className="ri-shopping-bag-line text-pink-500 text-3xl"></i>
//               </div>
//               <p className={`${lemonMilk.className} flex items-center tracking-wider text-lg font-semibold`}><span className="text-4xl">z</span>ivara</p>
//               <p className="text-xs text-gray-400">Version 1.0.0 (Build 100)</p>
//               <div className="w-full bg-gray-50 rounded-2xl px-4 py-3 space-y-2 mt-2">
//                 {[
//                   { label: "Platform", value: "Next.js" },
//                   { label: "Released", value: "April 2026" },
//                   { label: "Developer", value: "Zivara Team" },
//                 ].map(({ label, value }) => (
//                   <div key={label} className="flex justify-between">
//                     <p className="text-xs text-gray-400">{label}</p>
//                     <p className="text-xs font-medium">{value}</p>
//                   </div>
//                 ))}
//               </div>
//               <p className="text-xs text-gray-500 mt-2">Made with love in India 🤍</p>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lemonMilk } from "../fonts";

const settingsList = [
  {
    section: "Preferences",

    items: [
      {
        label: "Notifications",
        icon: "ri-notification-line",
        toggle: true,
      },

      {
        label: "Email Updates",
        icon: "ri-mail-line",
        toggle: true,
      },

      {
        label: "SMS Alerts",
        icon: "ri-message-line",
        href: "/settings/sms",
      },
    ],
  },

  {
    section: "Account",

    items: [
      {
        label: "Change Password",
        icon: "ri-lock-line",
        href: "/settings/change-password",
      },

      {
        label: "Saved Addresses",
        icon: "ri-map-pin-line",
        href: "/settings/addresses",
      },

      {
        label: "Payment Methods",
        icon: "ri-bank-card-line",
        href: "/settings/payment-methods",
      },
    ],
  },

  {
    section: "More",

    items: [
      {
        label: "Privacy Policy",
        icon: "ri-shield-line",
        href: "/settings/privacy-policy",
      },

      {
        label: "Terms of Service",
        icon: "ri-file-text-line",
        href: "/settings/terms",
      },

      {
        label: "App Version 1.0.0",
        icon: "ri-information-line",
        info: true,
      },
    ],
  },
];

export default function SettingsPage() {
  const router = useRouter();

  const [toggles, setToggles] = useState({
    Notifications: true,
    "Email Updates": true,
  });

  const [showVersion, setShowVersion] =
    useState(false);

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
              S
            </span>

            <span className="text-xl md:text-4xl">
              ettings
            </span>
          </h1>

        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Manage Your Preferences
        </p>

      </div>

      {/* SETTINGS */}
      <div className="space-y-8 px-4 md:px-6">

        {settingsList.map((group) => (

          <div key={group.section}>

            {/* Section Title */}
            <div className="mb-4">

              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                {group.section}
              </p>

            </div>

            {/* Cards */}
            <div className="space-y-4">

              {group.items.map((item) => (

                <div
                  key={item.label}
                  onClick={() => {
                    if (item.href)
                      router.push(item.href);

                    if (item.info)
                      setShowVersion(true);
                  }}
                  className={`
                    group
                    bg-[#f8f8f8]
                    rounded-[2rem]
                    p-5 md:p-6
                    flex
                    items-center
                    justify-between
                    transition-all
                    duration-300
                    ${
                      item.href || item.info
                        ? "cursor-pointer hover:bg-black hover:text-white"
                        : ""
                    }
                  `}
                >

                  {/* LEFT */}
                  <div className="flex items-center gap-4">

                    {/* Icon */}
                    <div
                      className="
                        w-14 h-14
                        rounded-full
                        bg-white
                        flex items-center justify-center
                        shrink-0
                        transition-all
                        duration-300
                        group-hover:bg-white/10
                      "
                    >

                      <i
                        className={`${item.icon} text-2xl`}
                      ></i>

                    </div>

                    {/* Content */}
                    <div>

                      <h2 className="text-lg md:text-2xl font-light leading-tight">
                        {item.label}
                      </h2>

                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400 group-hover:text-white/50 mt-2 transition-all">
                        {group.section}
                      </p>

                    </div>

                  </div>

                  {/* RIGHT */}
                  {item.toggle ? (

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        setToggles((prev) => ({
                          ...prev,
                          [item.label]:
                            !prev[item.label],
                        }));
                      }}
                      className={`
                        w-16
                        h-9
                        rounded-full
                        relative
                        transition-all
                        duration-300
                        ${
                          toggles[item.label]
                            ? "bg-black"
                            : "bg-gray-300"
                        }
                      `}
                    >

                      <span
                        className={`
                          absolute
                          top-1
                          w-7
                          h-7
                          rounded-full
                          bg-white
                          transition-all
                          duration-300
                          ${
                            toggles[item.label]
                              ? "left-8"
                              : "left-1"
                          }
                        `}
                      />

                    </button>

                  ) : (

                    <div
                      className="
                        w-12 h-12
                        rounded-full
                        border border-gray-200
                        flex items-center justify-center
                        transition-all
                        duration-300
                        group-hover:border-white/20
                      "
                    >

                      <i className="ri-arrow-right-up-line text-lg"></i>

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

      {/* VERSION MODAL */}
      {showVersion && (

        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6">

          <div
            className="
              bg-white
              w-full
              md:max-w-xl
              rounded-t-[2rem]
              md:rounded-[2rem]
              overflow-hidden
              animate-[slideUp_.4s_ease]
            "
          >

            {/* TOP */}
            <div className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-gray-100">

              <div>

                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                  Application Info
                </p>

                <h2 className="text-2xl md:text-3xl font-light text-black mt-3">
                  Zivara
                </h2>

              </div>

              <button
                onClick={() =>
                  setShowVersion(false)
                }
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
                <i className="ri-close-line text-xl"></i>
              </button>

            </div>

            {/* CONTENT */}
            <div className="px-6 md:px-8 py-8">

              {/* Logo */}
              <div className="flex flex-col items-center text-center">

                <div
                  className="
                    w-28
                    h-28
                    rounded-[2rem]
                    bg-[#f8f8f8]
                    flex items-center justify-center
                  "
                >

                  <i className="ri-shopping-bag-line text-5xl text-black"></i>

                </div>

                <p
                  className={`${lemonMilk.className} flex items-center tracking-wider text-2xl md:text-3xl font-semibold mt-8`}
                >
                  <span className="text-6xl">
                    Z
                  </span>

                  ivara
                </p>

                <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-4">
                  Version 1.0.0
                </p>

              </div>

              {/* INFO */}
              <div className="bg-[#f8f8f8] rounded-[2rem] p-5 md:p-6 mt-10 space-y-5">

                {[
                  {
                    label: "Platform",
                    value: "Next.js",
                  },

                  {
                    label: "Released",
                    value: "April 2026",
                  },

                  {
                    label: "Developer",
                    value: "Zivara Team",
                  },

                  {
                    label: "Region",
                    value: "India",
                  },
                ].map(({ label, value }) => (

                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >

                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      {label}
                    </p>

                    <p className="text-sm text-black">
                      {value}
                    </p>

                  </div>

                ))}

              </div>

              {/* FOOTER */}
              <p className="text-center text-gray-400 text-xs uppercase tracking-[0.2em] mt-8">
                Made with love in India 🤍
              </p>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}