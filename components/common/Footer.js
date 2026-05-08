"use client";

import { lemonMilk } from "@/app/fonts";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white mt-10">

      {/* GLOW */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-140 h-140 bg-pink-500/10 rounded-full blur-3xl"></div>

      {/* TOP */}
      <div
        className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-20 pb-16"
      >
        {/* BRAND */}
        <div className="text-center max-w-4xl mx-auto">

          {/* LOGO */}
          <div className="relative inline-block">
            <img
              src="/images/lips.png"
              alt="zivara"
              className="w-24 md:w-32 translate-x-6 md:translate-x-10 rotate-18 opacity-80 mx-auto"
            />

            <h1
              className={`${lemonMilk.className} absolute inset-0 flex items-center justify-center tracking-[0.3em]`}
            >
              <span className="text-4xl md:text-6xl">z</span>
              <span className="text-sm md:text-xl">ivara</span>
            </h1>
          </div>

          {/* HEADING */}
          <h2
            className="text-3xl md:text-6xl font-light leading-tight mt-10"
          >
            Fashion made <br /> for your vibe.
          </h2>

          {/* TEXT */}
          <p
            className="text-white/60 text-sm md:text-base leading-8 max-w-2xl mx-auto mt-8
            "
          >
            Zivara is a modern women-led fashion brand creating stylish collections for everyday confidence. From statement pieces to timeless essentials — fashion that feels bold, effortless and premium.
          </p>

          {/* SOCIAL */}
          <div
            className="flex items-center justify-center gap-4 md:gap-6 mt-10
            "
          >
            {[
              "ri-instagram-line",
              "ri-facebook-circle-line",
              "ri-youtube-line",
              "ri-pinterest-line",
            ].map((icon, i) => (
              <button
                key={i}
                className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-xl hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
              >
                <i className={icon}></i>
              </button>
            ))}
          </div>
        </div>

        {/* LINKS */}
        <div
          className="grid md:grid-cols-3 gap-10 mt-24 pt-14 border-t border-white/10"
        >
          {/* HELP */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
              Help
            </p>

            <div className="space-y-4">
              <Link
                href="/help/customer-service"
                className="block text-white/70 hover:text-white transition-all"
              >
                Customer Service
              </Link>

              <Link
                href="/help/returns"
                className="block text-white/70 hover:text-white transition-all"
              >
                Return Policy
              </Link>

              <Link
                href="/help/shipping"
                className="block text-white/70 hover:text-white transition-all"
              >
                Shipping Info
              </Link>
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
              Legal
            </p>

            <div className="space-y-4">
              <Link
                href="/privacy-policy"
                className="block text-white/70 hover:text-white transition-all"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-of-service"
                className="block text-white/70 hover:text-white transition-all"
              >
                Terms of Service
              </Link>

              <Link
                href="/cancellation-policy"
                className="block text-white/70 hover:text-white transition-all"
              >
                Cancellation Policy
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
              Contact
            </p>

            <div className="space-y-4">
              <p className="text-white/70">
                support@zivara.in
              </p>

              <p className="text-white/70">
                +91 98765 43210
              </p>

              <p className="text-white/70 leading-7">
                New Delhi,
                India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        className="relative border-t border-white/10"
      >
        <div
          className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-5"
        >

          {/* LEFT */}
          <p
            className="text-white/40 text-xs uppercase tracking-[0.2em] text-center md:text-left
            "
          >
            © 2026 Zivara — All Rights Reserved
          </p>

          {/* CENTER */}
          <div
            className="flex items-center gap-3 text-white/30 text-lg"
          >
            <i className="ri-visa-line"></i>
            <i className="ri-mastercard-line"></i>
            <i className="ri-paypal-line"></i>
            <i className="ri-amazon-pay-line"></i>
          </div>

          {/* RIGHT */}
          <p
            className="text-white/40 text-xs uppercase tracking-[0.2em] text-center md:text-right
            "
          >
            Designed by Shagun Chauhan
          </p>
        </div>
      </div>
    </footer>
  );
}