// "use client";

// import { useRouter } from "next/navigation";

// const sections = [
//   { title: "Information We Collect", icon: "ri-database-line", color: "bg-blue-50 text-blue-500", content: "We collect information you provide directly to us, such as your name, email address, phone number, and payment information when you create an account or make a purchase. We also collect usage data and device information automatically." },
//   { title: "How We Use Your Data", icon: "ri-settings-line", color: "bg-purple-50 text-purple-500", content: "We use the information we collect to process transactions, send order confirmations, provide customer support, send promotional communications (with your consent), and improve our services and user experience." },
//   { title: "Data Sharing", icon: "ri-share-line", color: "bg-pink-50 text-pink-500", content: "We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our platform, processing payments, and delivering orders." },
//   { title: "Cookies", icon: "ri-cookie-line", color: "bg-amber-50 text-amber-500", content: "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent." },
//   { title: "Data Security", icon: "ri-shield-check-line", color: "bg-green-50 text-green-500", content: "We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure." },
//   { title: "Your Rights", icon: "ri-user-settings-line", color: "bg-teal-50 text-teal-500", content: "You have the right to access, update, or delete your personal information at any time. You can also opt out of marketing communications by clicking 'unsubscribe' in any email we send." },
// ];

// export default function PrivacyPolicyPage() {
//   const router = useRouter();

//   return (
//     <div className="mt-16 text-black min-h-screen bg-gray-50 pb-10">

//       <div className="px-4 py-5 bg-white border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
//           <div>
//             <h1 className="text-base font-semibold">Privacy Policy</h1>
//             <p className="text-xs text-gray-400">Last updated: April 2026</p>
//           </div>
//         </div>
//       </div>

//       {/* Intro */}
//       <div className="mx-4 mt-4 bg-white rounded-2xl border border-gray-100 px-4 py-4">
//         <p className="text-xs text-gray-500 leading-relaxed">
//           At Zivara, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use our platform.
//         </p>
//       </div>

//       <div className="px-4 mt-3 space-y-3">
//         {sections.map((sec) => (
//           <div key={sec.title} className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
//             <div className="flex items-center gap-3 mb-3">
//               <div className={`${sec.color} w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0`}>
//                 <i className={`${sec.icon} text-lg`}></i>
//               </div>
//               <p className="text-sm font-semibold">{sec.title}</p>
//             </div>
//             <p className="text-xs text-gray-500 leading-relaxed">{sec.content}</p>
//           </div>
//         ))}
//       </div>

//       <div className="mx-4 mt-3 bg-pink-50 rounded-2xl px-4 py-4">
//         <p className="text-xs text-pink-500 leading-relaxed text-center">
//           Questions about our privacy policy? Contact us at privacy@zivara.com
//         </p>
//       </div>

//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { lemonMilk } from "@/app/fonts";

const sections = [
  {
    title: "Information We Collect",

    icon: "ri-database-line",

    glow: "from-blue-500/20 to-cyan-500/5",

    content:
      "We collect information you provide directly to us, such as your name, email address, phone number, and payment information when you create an account or make a purchase. We also collect usage data and device information automatically.",
  },

  {
    title: "How We Use Your Data",

    icon: "ri-settings-line",

    glow: "from-purple-500/20 to-pink-500/5",

    content:
      "We use the information we collect to process transactions, send order confirmations, provide customer support, send promotional communications (with your consent), and improve our services and user experience.",
  },

  {
    title: "Data Sharing",

    icon: "ri-share-line",

    glow: "from-pink-500/20 to-rose-500/5",

    content:
      "We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our platform, processing payments, and delivering orders.",
  },

  {
    title: "Cookies",

    icon: "ri-cookie-line",

    glow: "from-amber-500/20 to-yellow-500/5",

    content:
      "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
  },

  {
    title: "Data Security",

    icon: "ri-shield-check-line",

    glow: "from-green-500/20 to-emerald-500/5",

    content:
      "We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.",
  },

  {
    title: "Your Rights",

    icon: "ri-user-settings-line",

    glow: "from-teal-500/20 to-cyan-500/5",

    content:
      "You have the right to access, update, or delete your personal information at any time. You can also opt out of marketing communications by clicking unsubscribe in any email we send.",
  },
];

export default function PrivacyPolicyPage() {
  const router = useRouter();

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
              P
            </span>

            <span className="text-xl md:text-4xl">
              rivacy Policy
            </span>
          </h1>

        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Last Updated • April 2026
        </p>

      </div>

      {/* INTRO */}
      <div className="px-4 md:px-6 mb-10">

        <div className="relative overflow-hidden rounded-[2rem] bg-black text-white">

          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative p-8 md:p-12">

            <p className="text-white/50 text-xs uppercase tracking-[0.3em]">
              Privacy Commitment
            </p>

            <h2 className="text-3xl md:text-6xl font-light leading-tight mt-6">
              Your data deserves
              <br />
              protection & transparency.
            </h2>

            <p className="text-white/70 text-sm md:text-base leading-8 mt-8 max-w-3xl">
              At Zivara, we take your privacy seriously.
              This policy explains how we collect, use,
              and protect your personal information when
              you use our platform and services.
            </p>

          </div>

        </div>

      </div>

      {/* POLICY SECTIONS */}
      <div className="space-y-6 px-4 md:px-6">

        {sections.map((sec, index) => (

          <div
            key={sec.title}
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              bg-[#f8f8f8]
              group
            "
          >

            {/* Glow */}
            <div
              className={`
                absolute
                inset-0
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-700
                bg-gradient-to-br
                ${sec.glow}
              `}
            ></div>

            {/* CONTENT */}
            <div className="relative p-6 md:p-8">

              {/* TOP */}
              <div className="flex items-start justify-between gap-5">

                <div className="flex items-center gap-5">

                  {/* ICON */}
                  <div
                    className="
                      w-16
                      h-16
                      rounded-[1.5rem]
                      bg-white
                      flex items-center justify-center
                      shrink-0
                    "
                  >

                    <i
                      className={`${sec.icon} text-3xl text-black`}
                    ></i>

                  </div>

                  {/* TITLE */}
                  <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                      Section {String(index + 1).padStart(2, "0")}
                    </p>

                    <h2 className="text-2xl md:text-4xl font-light text-black mt-3">
                      {sec.title}
                    </h2>

                  </div>

                </div>

                {/* ARROW */}
                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    border border-gray-200
                    flex items-center justify-center
                    shrink-0
                    transition-all
                    duration-300
                    group-hover:bg-black
                    group-hover:text-white
                    group-hover:border-black
                  "
                >

                  <i className="ri-arrow-right-up-line text-lg"></i>

                </div>

              </div>

              {/* TEXT */}
              <div className="mt-8 md:pl-[5.3rem]">

                <p className="text-gray-600 leading-8 text-sm md:text-base">
                  {sec.content}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* CONTACT */}
      <div className="px-4 md:px-6 mt-10">

        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            bg-[#f8f8f8]
          "
        >

          {/* Glow */}
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>

          <div className="relative p-8 md:p-10 text-center">

            <div
              className="
                w-20
                h-20
                rounded-full
                bg-white
                flex items-center justify-center
                mx-auto
              "
            >

              <i className="ri-mail-line text-4xl text-black"></i>

            </div>

            <h2 className="text-3xl md:text-5xl font-light text-black mt-8">
              Need Help?
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-8 mt-5 max-w-2xl mx-auto">
              Questions about our privacy practices or
              how your data is handled? Our team is here
              to help you anytime.
            </p>

            <div
              className="
                inline-flex
                items-center
                gap-3
                mt-8
                px-7
                py-4
                rounded-full
                bg-black
                text-white
                text-sm
                uppercase
                tracking-[0.2em]
              "
            >

              <i className="ri-mail-send-line text-lg"></i>

              <span>privacy@zivara.com</span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}