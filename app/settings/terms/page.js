"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const terms = [
  { title: "Acceptance of Terms", icon: "ri-file-check-line", color: "bg-blue-50 text-blue-500", content: "By accessing or using Zivara, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform." },
  { title: "User Accounts", icon: "ri-user-line", color: "bg-purple-50 text-purple-500", content: "You are responsible for maintaining the confidentiality of your account credentials. You must be at least 18 years old to create an account and make purchases on Zivara." },
  { title: "Orders & Payments", icon: "ri-shopping-bag-line", color: "bg-pink-50 text-pink-500", content: "All orders are subject to product availability. Prices are subject to change without notice. We reserve the right to refuse or cancel any order at our discretion." },
  { title: "Returns & Refunds", icon: "ri-refund-2-line", color: "bg-green-50 text-green-500", content: "Products may be returned within 7 days of delivery in their original condition. Refunds are processed to the original payment method within 5-7 business days after approval." },
  { title: "Intellectual Property", icon: "ri-copyright-line", color: "bg-amber-50 text-amber-500", content: "All content on Zivara, including logos, images, and text, is the intellectual property of Zivara and may not be used without written permission." },
  { title: "Limitation of Liability", icon: "ri-shield-line", color: "bg-red-50 text-red-400", content: "Zivara shall not be liable for any indirect, incidental, or consequential damages arising from your use of our platform or products purchased through it." },
  { title: "Governing Law", icon: "ri-scales-line", color: "bg-teal-50 text-teal-500", content: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India." },
];

export default function TermsPage() {
  const router = useRouter();
  const [open, setOpen] = useState(null);

  return (
    <div className="mt-16 text-black min-h-screen bg-gray-50 pb-10">

      <div className="px-4 py-5 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
          <div>
            <h1 className="text-base font-semibold">Terms of Service</h1>
            <p className="text-xs text-gray-400">Last updated: April 2026</p>
          </div>
        </div>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-2xl border border-gray-100 px-4 py-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          Please read these Terms of Service carefully before using Zivara. These terms govern your use of our platform and services.
        </p>
      </div>

      <div className="px-4 mt-3 space-y-2">
        {terms.map((term, i) => (
          <div key={term.title} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center gap-3 px-4 py-4 text-left"
            >
              <div className={`${term.color} w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0`}>
                <i className={`${term.icon} text-lg`}></i>
              </div>
              <p className="text-sm font-medium flex-1">{term.title}</p>
              <i className={`ri-arrow-${open === i ? "up" : "down"}-s-line text-gray-300 text-lg flex-shrink-0`}></i>
            </button>
            {open === i && (
              <div className="px-4 pb-4">
                <p className="text-xs text-gray-500 leading-relaxed">{term.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mx-4 mt-3 bg-gray-100 rounded-2xl px-4 py-4">
        <p className="text-xs text-gray-400 leading-relaxed text-center">
          By using Zivara, you acknowledge that you have read and understood these Terms of Service.
        </p>
      </div>

    </div>
  );
}