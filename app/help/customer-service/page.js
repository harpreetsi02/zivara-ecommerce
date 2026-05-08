"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lemonMilk } from "@/app/fonts";

const faqs = [
  {
    q: "How do I track my order?",
    a: "Go to My Orders section and click on Track Order for real-time updates.",
  },
  {
    q: "Can I cancel my order?",
    a: "Orders can be cancelled within 24 hours of placing. Go to My Orders and select Cancel.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 5-7 business days. Express delivery takes 2-3 business days.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept UPI, Credit/Debit Cards, Net Banking, Wallets, and Cash on Delivery.",
  },
  {
    q: "How do I return a product?",
    a: "Returns are accepted within 7 days of delivery. Initiate your return request from the My Orders section.",
  },
];

const contacts = [
  {
    icon: "ri-whatsapp-line",
    label: "WhatsApp",
    sub: "Instant Chat Support",
    glow: "from-green-500/20 to-emerald-500/5",
    bg: "bg-green-500",
    href: "#",
  },
  {
    icon: "ri-mail-line",
    label: "Email Us",
    sub: "support@zivara.com",
    glow: "from-blue-500/20 to-cyan-500/5",
    bg: "bg-blue-500",
    href: "#",
  },
  {
    icon: "ri-phone-line",
    label: "Call Us",
    sub: "+91 98765 43210",
    glow: "from-pink-500/20 to-rose-500/5",
    bg: "bg-pink-500",
    href: "#",
  },
];

export default function CustomerServicePage() {
  const router = useRouter();
  const [open, setOpen] = useState(null);

  return (
    <section className="relative z-20 min-h-screen pt-24 pb-20 overflow-hidden">
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
            <span className="text-xl md:text-4xl">upport</span>
          </h1>
        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          We're Here To Help You
        </p>
      </div>

      {/* HERO */}
      <div className="px-4 md:px-6 mb-10">

        <div className="relative overflow-hidden rounded-4xl bg-black text-white">
          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative p-8 md:p-12">
            <p className="text-white/50 text-xs uppercase tracking-[0.3em]">
              Customer Care
            </p>

            <h2 className="text-3xl md:text-6xl font-light leading-tight mt-6">
              Fast solutions
              <br />
              for every problem.
            </h2>

            <p className="text-white/70 text-sm md:text-base leading-8 mt-8 max-w-3xl">
              Need help with your order, returns, delivery, or payments? Our support team is available to assist you anytime.
            </p>
          </div>
        </div>
      </div>

      {/* CONTACT OPTIONS */}
      <div className="px-4 md:px-6 mb-12">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Contact Options
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {contacts.map((c) => (
            <button
              key={c.label}
              className="relative overflow-hidden rounded-4xl bg-[#f8f8f8] text-left group"
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-linear-to-br ${c.glow}`}
              ></div>

              {/* CONTENT */}
              <div className="relative p-6 md:p-8">

                {/* TOP */}
                <div className="flex items-center justify-between gap-4">

                  <div
                    className={`w-16 h-16 rounded-3xl ${c.bg} flex items-center justify-center text-white shrink-0`}
                  >
                    <i className={`${c.icon} text-3xl`}></i>
                  </div>

                  <div
                    className="w-11 h-11 text-black rounded-full border border-gray-300 flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:border-black"
                  >
                    <i className="ri-arrow-right-up-line text-lg"></i>
                  </div>
                </div>

                {/* TEXT */}
                <div className="mt-8">
                  <h2 className="text-2xl md:text-4xl font-light text-black">
                    {c.label}
                  </h2>

                  <p className="text-gray-400 text-sm leading-7 mt-4">
                    {c.sub}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* FAQS */}
      <div className="px-4 md:px-6">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Frequently Asked Questions
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, i) => {
            const active = open === i;
            return (
              <div
                key={faq.q}
                className="bg-[#f8f8f8] rounded-4xl overflow-hidden"
              >
                {/* BUTTON */}
                <button onClick={() => setOpen(active ? null : i)}
                  className="w-full flex items-center justify-between gap-5 p-6 md:p-8 text-left"
                >
                  {/* LEFT */}
                  <div className="flex items-start gap-5">

                    {/* NUMBER */}
                    <div
                      className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0"
                    >
                      <p className="text-xs tracking-[0.2em] text-black">
                        {String(i + 1).padStart( 2, "0" )}
                      </p>
                    </div>

                    {/* QUESTION */}
                    <div>
                      <p className="text-2xl md:text-3xl font-light text-black leading-tight">
                        {faq.q}
                      </p>
                    </div>
                  </div>

                  {/* ICON */}
                  <div
                    className={`w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-500 shrink-0
                      ${active
                        ? "bg-black text-white border-black rotate-180"
                        : "bg-white text-black"
                      }
                    `}
                  >
                    <i className="ri-arrow-down-s-line text-xl"></i>
                  </div>
                </button>

                {/* ANSWER */}
                <div
                  className={`overflow-hidden transition-all duration-500
                    ${active
                      ? "max-h-60 opacity-100"
                      : "max-h-0 opacity-0"
                    }
                  `}
                >
                  <div className="px-6 md:px-8 pb-8 md:pl-26">
                    <div className="border-t border-gray-200 pt-6">
                      <p className="text-gray-600 text-sm md:text-base leading-8">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}