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

  const [toggles, setToggles] = useState({ Notifications: true, "Email Updates": true, });
  const [showVersion, setShowVersion] = useState(false);

  return (
    <section className="min-h-screen relative z-20 pt-24 pb-20 overflow-hidden">
      {/* HEADING */}
      <div className="text-center mb-12 px-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            <i className="ri-arrow-left-line text-lg"></i>
          </button>

          <h1
            className={`${lemonMilk.className} flex items-center text-black tracking-wide`}
          >
            <span className="text-5xl md:text-7xl leading-none">S</span>
            <span className="text-xl md:text-4xl">ettings</span>
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
                    if (item.href) router.push(item.href);
                    if (item.info) setShowVersion(true);
                  }}
                  className={`group bg-[#f8f8f8] rounded-4xl p-5 md:p-6 flex items-center justify-between transition-all duration-300
                    ${item.href || item.info
                      ? "cursor-pointer hover:bg-black hover:text-white"
                      : ""
                    }
                  `}
                >

                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className="w-14 text-black h-14 rounded-full bg-white flex items-center justify-center border border-gray-300 shrink-0 transition-all duration-300 group-hover:bg-white/10"
                    >
                      <i className={`${item.icon} text-2xl`}></i>
                    </div>

                    {/* Content */}
                    <div>
                      <h2 className="text-lg text-gray-800 md:text-2xl font-semibold leading-tight">
                        {item.label}
                      </h2>

                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 group-hover:text-white/50 mt-2 transition-all">
                        {group.section}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  {item.toggle ? (
                    <button
                      onClick={(e) => {e.stopPropagation();
                        setToggles((prev) => ({
                          ...prev,
                          [item.label]:
                            !prev[item.label],
                        }));
                      }}
                      className={`w-16 h-9 rounded-full relative transition-all duration-300
                        ${toggles[item.label]
                          ? "bg-black"
                          : "bg-gray-300"
                        }
                      `}
                    >
                      <span
                        className={`absolute top-1 w-7 h-7 rounded-full bg-white transition-all duration-300
                          ${toggles[item.label]
                            ? "left-8"
                            : "left-1"
                          }
                        `}
                      />
                    </button>
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full border border-gray-300 flex items-center text-black justify-center transition-all duration-300 group-hover:border-white/20"
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
            className="bg-white w-full md:max-w-xl rounded-t-4xl md:rounded-4xl overflow-hidden animate-[slideUp_.4s_ease]"
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
                onClick={() => setShowVersion(false)}
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* CONTENT */}
            <div className="px-6 md:px-8 py-8">

              {/* Logo */}
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-28 h-28 rounded-4xl bg-[#f8f8f8] flex items-center justify-center"
                >
                  <i className="ri-shopping-bag-line text-5xl text-black"></i>
                </div>

                <p
                  className={`${lemonMilk.className} flex items-center tracking-wider text-black text-2xl md:text-3xl font-semibold mt-8`}
                >
                  <span className="text-6xl">Z</span>ivara
                </p>

                <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-4">
                  Version 1.0.0
                </p>
              </div>

              {/* INFO */}
              <div className="bg-[#f8f8f8] rounded-4xl p-5 md:p-6 mt-10 space-y-5">
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