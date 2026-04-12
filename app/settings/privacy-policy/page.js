"use client";

import { useRouter } from "next/navigation";

const sections = [
  { title: "Information We Collect", icon: "ri-database-line", color: "bg-blue-50 text-blue-500", content: "We collect information you provide directly to us, such as your name, email address, phone number, and payment information when you create an account or make a purchase. We also collect usage data and device information automatically." },
  { title: "How We Use Your Data", icon: "ri-settings-line", color: "bg-purple-50 text-purple-500", content: "We use the information we collect to process transactions, send order confirmations, provide customer support, send promotional communications (with your consent), and improve our services and user experience." },
  { title: "Data Sharing", icon: "ri-share-line", color: "bg-pink-50 text-pink-500", content: "We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our platform, processing payments, and delivering orders." },
  { title: "Cookies", icon: "ri-cookie-line", color: "bg-amber-50 text-amber-500", content: "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent." },
  { title: "Data Security", icon: "ri-shield-check-line", color: "bg-green-50 text-green-500", content: "We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure." },
  { title: "Your Rights", icon: "ri-user-settings-line", color: "bg-teal-50 text-teal-500", content: "You have the right to access, update, or delete your personal information at any time. You can also opt out of marketing communications by clicking 'unsubscribe' in any email we send." },
];

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="mt-16 text-black min-h-screen bg-gray-50 pb-10">

      <div className="px-4 py-5 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
          <div>
            <h1 className="text-base font-semibold">Privacy Policy</h1>
            <p className="text-xs text-gray-400">Last updated: April 2026</p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="mx-4 mt-4 bg-white rounded-2xl border border-gray-100 px-4 py-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          At Zivara, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use our platform.
        </p>
      </div>

      <div className="px-4 mt-3 space-y-3">
        {sections.map((sec) => (
          <div key={sec.title} className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`${sec.color} w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0`}>
                <i className={`${sec.icon} text-lg`}></i>
              </div>
              <p className="text-sm font-semibold">{sec.title}</p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{sec.content}</p>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-3 bg-pink-50 rounded-2xl px-4 py-4">
        <p className="text-xs text-pink-500 leading-relaxed text-center">
          Questions about our privacy policy? Contact us at privacy@zivara.com
        </p>
      </div>

    </div>
  );
}