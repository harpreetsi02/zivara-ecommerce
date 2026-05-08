"use client";

import { useRouter } from "next/navigation";
import { lemonMilk } from "@/app/fonts";

const shippingOptions = [
  {
    type: "Standard Delivery",
    time: "5-7 Business Days",
    price: "Free Above ₹1099",
    icon: "ri-truck-line",
    glow: "from-blue-500/20 to-cyan-500/5",
    iconBg: "bg-blue-500",
  },
  {
    type: "Express Delivery",
    time: "2-3 Business Days",
    price: "₹99",
    icon: "ri-flashlight-line",
    glow: "from-amber-500/20 to-yellow-500/5",
    iconBg: "bg-amber-500",
  },
  {
    type: "Same Day Delivery",
    time: "Within 24 Hours",
    price: "₹199",
    icon: "ri-rocket-line",
    glow: "from-pink-500/20 to-rose-500/5",
    iconBg: "bg-pink-500",
  },
];

const points = [
  "Orders placed before 2 PM are dispatched the same day",
  "Tracking link is shared via SMS & email after dispatch",
  "Delivery available across 27,000+ pin codes in India",
  "Cash on Delivery available on orders above ₹499",
];

export default function ShippingPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-white pt-24 pb-20 overflow-hidden">
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
            <span className="text-xl md:text-4xl">hipping</span>
          </h1>
        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Delivery Options & Timelines
        </p>
      </div>

      {/* HERO */}
      <div className="px-4 md:px-6 mb-10">
        <div className="relative overflow-hidden rounded-4xl bg-black text-white">
          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="relative p-8 md:p-12">
            {/* TOP */}
            <div className="flex items-center justify-between gap-5 flex-wrap">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-[0.3em]">
                  Fast Delivery
                </p>

                <h2 className="text-3xl md:text-6xl font-light leading-tight mt-6">
                  Free shipping
                  <br />
                  on orders above ₹1099
                </h2>
              </div>

              {/* ICON */}
              <div
                className="w-24 h-24 rounded-4xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shrink-0"
              >
                <i className="ri-truck-line text-5xl text-white"></i>
              </div>
            </div>

            {/* TEXT */}
            <p className="text-white/70 text-sm md:text-base leading-8 mt-10 max-w-3xl">
              Experience smooth and reliable deliverie across India with multiple shipping option tailored to your needs.
            </p>
          </div>
        </div>
      </div>

      {/* SHIPPING OPTIONS */}
      <div className="px-4 md:px-6 mb-12">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Delivery Options
          </p>
        </div>

        <div className="space-y-5">
          {shippingOptions.map((opt, i) => (
            <div
              key={opt.type}
              className="relative overflow-hidden rounded-4xl bg-[#f8f8f8] group"
            >

              {/* Glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-linear-to-br ${opt.glow}`}
              ></div>

              {/* CONTENT */}
              <div className="relative p-6 md:p-8 flex items-center justify-between gap-5 flex-wrap">
                {/* LEFT */}
                <div className="flex items-center gap-5">
                  {/* ICON */}
                  <div
                    className={`w-16 h-16 rounded-3xl ${opt.iconBg} text-white flex items-center justify-center shrink-0`}
                  >
                    <i className={`${opt.icon} text-3xl`}></i>
                  </div>

                  {/* TEXT */}
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div
                        className="px-4 py-2 rounded-full bg-white text-[10px] uppercase tracking-[0.2em] text-black"
                      >
                        Option {i + 1}
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-light text-black mt-5">
                      {opt.type}
                    </h2>

                    <p className="text-gray-400 text-sm md:text-base mt-4">
                      {opt.time}
                    </p>
                  </div>
                </div>

                {/* PRICE */}
                <div
                  className="px-7 py-4 rounded-full bg-black text-white text-sm uppercase tracking-[0.2em] shrink-0"
                >
                  {opt.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INFO */}
      <div className="px-4 md:px-6">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Important Information
          </p>
        </div>

        <div
          className="bg-[#f8f8f8] rounded-4xl overflow-hidden"
        >
          {/* TOP */}
          <div className="p-6 md:p-8 border-b border-gray-200">
            <h2 className="text-3xl md:text-5xl font-light text-black">
              Delivery Guidelines
            </h2>

            <p className="text-gray-400 text-sm leading-7 mt-5">
              Everything you need to know about
              shipping, dispatch, and delivery.
            </p>
          </div>

          {/* POINTS */}
          <div className="p-6 md:p-8 space-y-5">
            {points.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-4"
              >
                {/* ICON */}
                <div
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0"
                >
                  <i className="ri-information-line text-blue-500 text-lg"></i>
                </div>

                {/* TEXT */}
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