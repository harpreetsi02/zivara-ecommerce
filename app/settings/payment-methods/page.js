"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lemonMilk } from "@/app/fonts";

const defaultCards = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiry: "12/27",
    name: "Zivara User",
    default: true,
  },

  {
    id: 2,
    type: "Mastercard",
    last4: "8910",
    expiry: "06/26",
    name: "Zivara User",
    default: false,
  },
];

const upiApps = [
  {
    name: "Google Pay",
    icon: "ri-google-fill",
    color: "text-blue-500",
  },

  {
    name: "PhonePe",
    icon: "ri-smartphone-line",
    color: "text-purple-500",
  },

  {
    name: "Paytm",
    icon: "ri-wallet-line",
    color: "text-blue-400",
  },
];

export default function PaymentMethodsPage() {
  const router = useRouter();

  const [cards, setCards] =
    useState(defaultCards);

  const [adding, setAdding] =
    useState(false);

  const [form, setForm] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleDelete = (id) =>
    setCards((prev) =>
      prev.filter((c) => c.id !== id)
    );

  const handleDefault = (id) =>
    setCards((prev) =>
      prev.map((c) => ({
        ...c,
        default: c.id === id,
      }))
    );

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
              P
            </span>

            <span className="text-xl md:text-4xl">
              ayments
            </span>
          </h1>

        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Manage Your Payment Methods
        </p>

      </div>

      {/* ADD BUTTON */}
      <div className="px-4 md:px-6 mb-8">

        <button
          onClick={() => setAdding(true)}
          className="
            w-full
            bg-black
            text-white
            py-5
            rounded-full
            text-sm
            uppercase
            tracking-[0.2em]
            hover:bg-neutral-800
            transition-all
            duration-300
          "
        >
          + Add New Card
        </button>

      </div>

      <div className="space-y-10 px-4 md:px-6">

        {/* SAVED CARDS */}
        <div>

          <div className="mb-5">

            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Saved Cards
            </p>

          </div>

          <div className="space-y-5">

            {cards.map((card, index) => (

              <div
                key={card.id}
                className="
                  relative
                  overflow-hidden
                  rounded-4xl
                  bg-black
                  text-white
                "
              >

                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-52 h-52 bg-white/10 rounded-full blur-3xl"></div>

                {/* CONTENT */}
                <div className="relative p-6 md:p-8">

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3 flex-wrap">

                      {/* TYPE */}
                      <div
                        className={`
                          px-4
                          py-2
                          rounded-full
                          text-[10px]
                          uppercase
                          tracking-[0.2em]
                          ${
                            card.type ===
                            "Visa"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-400/20"
                              : "bg-red-500/20 text-red-300 border border-red-400/20"
                          }
                        `}
                      >
                        {card.type}
                      </div>

                      {/* DEFAULT */}
                      {card.default && (

                        <div
                          className="
                            px-4
                            py-2
                            rounded-full
                            bg-green-500/10
                            border border-green-500/20
                            text-green-300
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                          "
                        >
                          Default
                        </div>

                      )}

                    </div>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        handleDelete(card.id)
                      }
                      className="
                        w-11
                        h-11
                        rounded-full
                        border border-white/10
                        bg-white/5
                        flex items-center justify-center
                        hover:bg-red-500
                        hover:border-red-500
                        transition-all
                        duration-300
                      "
                    >
                      <i className="ri-delete-bin-line text-lg"></i>
                    </button>

                  </div>

                  {/* CARD NUMBER */}
                  <div className="mt-14">

                    <p className="text-white/40 text-xs uppercase tracking-[0.25em] mb-4">
                      Card Number
                    </p>

                    <h2 className="text-3xl md:text-5xl font-light tracking-[0.15em]">
                      •••• •••• ••••{" "}
                      {card.last4}
                    </h2>

                  </div>

                  {/* BOTTOM */}
                  <div className="flex items-end justify-between gap-5 mt-14">

                    <div>

                      <p className="text-white/40 text-xs uppercase tracking-[0.25em] mb-3">
                        Card Holder
                      </p>

                      <p className="text-lg md:text-2xl font-light">
                        {card.name}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-white/40 text-xs uppercase tracking-[0.25em] mb-3">
                        Expiry
                      </p>

                      <p className="text-lg md:text-2xl font-light">
                        {card.expiry}
                      </p>

                    </div>

                  </div>

                  {/* ACTION */}
                  {!card.default && (

                    <button
                      onClick={() =>
                        handleDefault(card.id)
                      }
                      className="
                        mt-10
                        px-7
                        py-4
                        rounded-full
                        bg-white
                        text-black
                        text-sm
                        uppercase
                        tracking-[0.2em]
                        hover:bg-neutral-200
                        transition-all
                        duration-300
                      "
                    >
                      Set As Default
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* UPI APPS */}
        <div>

          <div className="mb-5">

            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Linked UPI Apps
            </p>

          </div>

          <div className="space-y-4">

            {upiApps.map((app) => (

              <div
                key={app.name}
                className="
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
                      className={`${app.icon} text-3xl ${app.color}`}
                    ></i>

                  </div>

                  {/* CONTENT */}
                  <div>

                    <h2 className="text-lg md:text-2xl font-light text-black">
                      {app.name}
                    </h2>

                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-3">
                      Linked Successfully
                    </p>

                  </div>

                </div>

                {/* STATUS */}
                <div
                  className="
                    px-5
                    py-2
                    rounded-full
                    bg-green-500/10
                    border border-green-500/20
                    text-green-600
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                  "
                >
                  Active
                </div>

              </div>

            ))}

          </div>

        </div>

        {/* COD */}
        <div
          className="
            bg-[#f8f8f8]
            rounded-4xl
            p-6 md:p-8
            flex
            items-center
            justify-between
            gap-5
          "
        >

          {/* LEFT */}
          <div className="flex items-center gap-5">

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

              <i className="ri-money-rupee-circle-line text-3xl text-green-500"></i>

            </div>

            <div>

              <h2 className="text-lg md:text-2xl font-light text-black">
                Cash On Delivery
              </h2>

              <p className="text-sm text-gray-400 mt-3">
                Available on orders above ₹499
              </p>

            </div>

          </div>

          {/* CHECK */}
          <div
            className="
              w-12
              h-12
              rounded-full
              bg-green-500/10
              border border-green-500/20
              flex items-center justify-center
              shrink-0
            "
          >

            <i className="ri-check-line text-green-500 text-xl"></i>

          </div>

        </div>

      </div>

      {/* ADD CARD MODAL */}
      {adding && (

        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6">

          <div
            className="
              bg-white
              w-full
              md:max-w-2xl
              rounded-t-4xl
              md:rounded-4xl
              overflow-hidden
              animate-[slideUp_.4s_ease]
            "
          >

            {/* TOP */}
            <div className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-gray-100">

              <div>

                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                  Secure Payment
                </p>

                <h2 className="text-2xl md:text-3xl font-light text-black mt-3">
                  Add New Card
                </h2>

              </div>

              <button
                onClick={() =>
                  setAdding(false)
                }
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
                <i className="ri-close-line text-xl"></i>
              </button>

            </div>

            {/* CONTENT */}
            <div className="px-6 md:px-8 py-8 space-y-5">

              {[
                {
                  key: "number",
                  placeholder:
                    "Card Number",
                  maxLength: 19,
                },

                {
                  key: "name",
                  placeholder:
                    "Cardholder Name",
                },

                {
                  key: "expiry",
                  placeholder: "MM/YY",
                },

                {
                  key: "cvv",
                  placeholder: "CVV",
                  maxLength: 3,
                },
              ].map(
                ({
                  key,
                  placeholder,
                  maxLength,
                }) => (

                  <div key={key}>

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">
                      {placeholder}
                    </p>

                    <input
                      value={form[key]}
                      maxLength={maxLength}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          [key]:
                            e.target.value,
                        }))
                      }
                      placeholder={`Enter ${placeholder.toLowerCase()}`}
                      className="
                        w-full
                        bg-[#f8f8f8]
                        border
                        border-gray-200
                        rounded-full
                        px-5
                        py-4
                        outline-none
                        focus:border-black
                        transition-all
                      "
                    />

                  </div>

                )
              )}

              {/* BUTTON */}
              <button
                onClick={() => {

                  setAdding(false);

                  setCards((p) => [
                    ...p,
                    {
                      id: Date.now(),
                      type: "Visa",
                      last4:
                        form.number.slice(-4),
                      expiry:
                        form.expiry,
                      name: form.name,
                      default: false,
                    },
                  ]);
                }}
                className="
                  w-full
                  mt-4
                  py-5
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
                Save Card
              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}