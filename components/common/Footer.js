"use client";

import { lemonMilk } from "@/app/fonts";

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 text-gray-700 mt-16">

      {/* Top Section */}
      <div className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className={`${lemonMilk.className} text-lg font-semibold tracking-wide`}>
          <span className="text-4xl">Z</span>ivara @zivara.in on Instagram
        </h2>

        <p className="text-sm mt-4 leading-relaxed text-gray-600">
          Zivara is a modern, women-led fashion brand focused on creating stylish,
          high-quality bags for everyday use. From elegant totes to versatile
          crossbody bags, we bring you designs that blend fashion with function.
        </p>

        {/* Social Icons */}
        <div className="flex text-2xl justify-center gap-6 mt-6">
          <i className="ri-instagram-line"></i>
          <i className="ri-facebook-circle-line"></i>
          <i className="ri-youtube-line"></i>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t text-center text-xs text-gray-500 pt-6 border-gray-300">
        <h2>UI Design by: Shagun Chauhan</h2>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-xs text-gray-500 py-3 px-4 flex flex-wrap justify-center gap-3">
        <span>© 2026, Zivara</span>
        <span>•</span>
        <span className="hover:underline cursor-pointer">Refund policy</span>
        <span>•</span>
        <span className="hover:underline cursor-pointer">Privacy policy</span>
        <span>•</span>
        <span className="hover:underline cursor-pointer">Terms of service</span>
        <span>•</span>
        <span className="hover:underline cursor-pointer">Shipping policy</span>
        <span>•</span>
        <span className="hover:underline cursor-pointer">Contact information</span>
        <span>•</span>
        <span className="hover:underline cursor-pointer">Cancellation policy</span>
      </div>

    </footer>
  );
}