"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const faqs = [
  { q: "How do I track my order?", a: "Go to My Orders section and click on 'Track Order' for real-time updates." },
  { q: "Can I cancel my order?", a: "Orders can be cancelled within 24 hours of placing. Go to My Orders and select Cancel." },
  { q: "How long does delivery take?", a: "Standard delivery takes 5-7 business days. Express delivery 2-3 days." },
  { q: "What payment methods are accepted?", a: "We accept UPI, Credit/Debit cards, Net Banking, and Cash on Delivery." },
  { q: "How do I return a product?", a: "Returns are accepted within 7 days of delivery. Initiate from My Orders section." },
];

export default function CustomerServicePage() {
  const router = useRouter();
  const [open, setOpen] = useState(null);

  return (
    <div className="mt-16 text-black min-h-screen bg-white">

      {/* Header */}
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
          <div>
            <h1 className="text-base font-semibold">Customer Service</h1>
            <p className="text-xs text-gray-400">We are here to help</p>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="px-4 pt-5 grid grid-cols-3 gap-3">
        {[
          { icon: "ri-whatsapp-line", label: "WhatsApp", color: "bg-green-50 text-green-600" },
          { icon: "ri-mail-line", label: "Email Us", color: "bg-blue-50 text-blue-600" },
          { icon: "ri-phone-line", label: "Call Us", color: "bg-pink-50 text-pink-500" },
        ].map((c) => (
          <div key={c.label} className={`${c.color} rounded-2xl py-4 flex flex-col items-center gap-1 cursor-pointer`}>
            <i className={`${c.icon} text-2xl`}></i>
            <p className="text-xs font-medium">{c.label}</p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="px-4 mt-6">
        <p className="text-sm font-semibold mb-3">Frequently Asked Questions</p>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <p className="text-sm font-medium pr-2">{faq.q}</p>
                <i className={`ri-arrow-${open === i ? "up" : "down"}-s-line text-gray-400 flex-shrink-0`}></i>
              </button>
              {open === i && (
                <div className="px-4 pb-3">
                  <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}