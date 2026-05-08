"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lemonMilk } from "../../fonts";

const alertTypes = [
  {
    label: "Order Updates",
    desc: "Confirmation, dispatch & delivery alerts",
    key: "orders",
    icon: "ri-shopping-bag-line",
  },

  {
    label: "Offers & Deals",
    desc: "Exclusive sale and discount alerts",
    key: "offers",
    icon: "ri-price-tag-3-line",
  },

  {
    label: "Price Drop Alerts",
    desc: "When wishlisted items go on sale",
    key: "price",
    icon: "ri-notification-3-line",
  },

  {
    label: "Return & Refund Updates",
    desc: "Status updates on your return requests",
    key: "returns",
    icon: "ri-refresh-line",
  },
];

export default function SmsAlertsPage() {
  const router = useRouter();

  const [phone, setPhone] = useState(
    "+91 98765 43210"
  );

  const [editing, setEditing] =
    useState(false);

  const [smsEnabled, setSmsEnabled] =
    useState(false);

  const [alerts, setAlerts] = useState({
    orders: true,
    offers: false,
    price: true,
    returns: true,
  });

  const toggle = (key) =>
    setAlerts((p) => ({
      ...p,
      [key]: !p[key],
    }));

  return (
    <section className="min-h-screen relative z-20 pt-24 pb-20 overflow-hidden">

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
              MS Alerts
            </span>
          </h1>

        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Manage Your SMS Preferences
        </p>

      </div>

      <div className="space-y-8 px-4 md:px-6">

        {/* MASTER TOGGLE */}
        <div
          className="
            bg-black
            rounded-4xl
            overflow-hidden
            relative
          "
        >

          {/* Glow */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative p-6 md:p-8 flex items-center justify-between gap-5">

            {/* LEFT */}
            <div className="flex items-center gap-5">

              <div
                className="
                  w-16
                  h-16
                  rounded-3xl
                  bg-white/10
                  backdrop-blur-md
                  border border-white/10
                  flex items-center justify-center
                  shrink-0
                "
              >

                <i className="ri-message-2-line text-3xl text-white"></i>

              </div>

              <div>

                <p className="text-white/50 text-xs uppercase tracking-[0.25em]">
                  Notifications
                </p>

                <h2 className="text-2xl md:text-4xl font-light text-white mt-3">
                  SMS Alerts
                </h2>

                <p className="text-white/60 text-sm mt-4">
                  {smsEnabled
                    ? "Enabled"
                    : "Disabled"}
                </p>

              </div>

            </div>

            {/* TOGGLE */}
            <button
              onClick={() =>
                setSmsEnabled(!smsEnabled)
              }
              className={`
                w-20
                h-11
                rounded-full
                relative
                transition-all
                duration-300
                ${
                  smsEnabled
                    ? "bg-white"
                    : "bg-white/20"
                }
              `}
            >

              <span
                className={`
                  absolute
                  top-1.5
                  w-8
                  h-8
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    smsEnabled
                      ? "left-10 bg-black"
                      : "left-1.5 bg-white"
                  }
                `}
              />

            </button>

          </div>

        </div>

        {/* PHONE */}
        <div className="bg-[#f8f8f8] rounded-4xl p-6 md:p-8">

          <div className="flex items-center justify-between gap-5 mb-6">

            <div>

              <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                Registered Number
              </p>

              <h2 className="text-2xl md:text-4xl font-light text-black mt-4">
                {phone}
              </h2>

            </div>

            <div
              className="
                w-14 h-14
                rounded-full
                bg-white
                flex items-center justify-center
                shrink-0
              "
            >

              <i className="ri-smartphone-line text-2xl text-black"></i>

            </div>

          </div>

          {editing ? (

            <div className="flex flex-col md:flex-row gap-3">

              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="
                  flex-1
                  bg-white
                  border
                  border-gray-200
                  rounded-full
                  px-5
                  py-4
                  text-black
                  outline-none
                  focus:border-black
                  transition-all
                "
              />

              <button
                onClick={() =>
                  setEditing(false)
                }
                className="
                  px-8
                  py-4
                  rounded-full
                  bg-black
                  text-white
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  hover:bg-neutral-800
                  transition-all
                  duration-300
                "
              >
                Save
              </button>

            </div>

          ) : (

            <button
              onClick={() =>
                setEditing(true)
              }
              className="
                px-7
                py-4
                rounded-full
                border
                border-black
                text-black
                text-sm
                uppercase
                tracking-[0.2em]
                hover:bg-black
                hover:text-white
                transition-all
                duration-300
              "
            >
              Edit Number
            </button>

          )}

        </div>

        {/* ALERT TYPES */}
        <div>

          <div className="mb-5">

            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Alert Types
            </p>

          </div>

          <div
            className={`
              space-y-4
              transition-all
              duration-300
              ${
                !smsEnabled
                  ? "opacity-40 pointer-events-none"
                  : ""
              }
            `}
          >

            {alertTypes.map((item) => (

              <div
                key={item.key}
                className="
                  group
                  bg-[#f8f8f8]
                  rounded-4xl
                  p-5 md:p-6
                  flex
                  items-center
                  justify-between
                  gap-5
                "
              >

                {/* LEFT */}
                <div className="flex items-center gap-5">

                  {/* ICON */}
                  <div
                    className="
                      w-16
                      h-16
                      rounded-3xl
                      bg-white
                      flex items-center justify-center
                      shrink-0
                    "
                  >

                    <i
                      className={`${item.icon} text-2xl text-black`}
                    ></i>

                  </div>

                  {/* CONTENT */}
                  <div>

                    <h2 className="text-lg md:text-2xl font-light text-black">
                      {item.label}
                    </h2>

                    <p className="text-sm text-gray-400 mt-3 leading-6">
                      {item.desc}
                    </p>

                  </div>

                </div>

                {/* TOGGLE */}
                <button
                  onClick={() =>
                    toggle(item.key)
                  }
                  className={`
                    w-16
                    h-9
                    rounded-full
                    relative
                    transition-all
                    duration-300
                    shrink-0
                    ${
                      alerts[item.key]
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
                        alerts[item.key]
                          ? "left-8"
                          : "left-1"
                      }
                    `}
                  />

                </button>

              </div>

            ))}

          </div>

          {!smsEnabled && (

            <p className="text-center text-gray-400 text-xs uppercase tracking-[0.2em] mt-6">
              Enable SMS alerts to manage preferences
            </p>

          )}

        </div>

      </div>

    </section>
  );
}