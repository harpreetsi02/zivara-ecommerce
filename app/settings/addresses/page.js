"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lemonMilk } from "@/app/fonts";

const defaultAddresses = [
  {
    id: 1,
    tag: "Home",
    name: "Zivara User",
    phone: "+91 98765 43210",
    address:
      "B-204, Green Valley Apartments, Sector 62, Noida, UP - 201301",
    default: true,
  },
  {
    id: 2,
    tag: "Work",
    name: "Zivara User",
    phone: "+91 98765 43210",
    address:
      "Tower B, Cyber City, DLF Phase 2, Gurgaon, HR - 122002",
    default: false,
  },
];

export default function AddressesPage() {
  const router = useRouter();

  const [addresses, setAddresses] = useState(defaultAddresses);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    tag: "Home",
    name: "",
    phone: "",
    address: "",
  });

  const handleDelete = (id) =>
    setAddresses((prev) =>
      prev.filter((a) => a.id !== id)
    );

  const handleDefault = (id) =>
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        default: a.id === id,
      }))
    );

  const handleAdd = () => {
    if ( !form.name || !form.phone || !form.address ) return;

    setAddresses((prev) => [
      ...prev,
      {
        ...form,
        id: Date.now(),
        default: false,
      },
    ]);
    setAdding(false);
    setForm({
      tag: "Home",
      name: "",
      phone: "",
      address: "",
    });
  };

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
              A
            </span>

            <span className="text-xl md:text-4xl">
              ddresses
            </span>
          </h1>

        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          {addresses.length} Saved Address
          {addresses.length !== 1
            ? "es"
            : ""}
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
          + Add New Address
        </button>

      </div>

      {/* ADDRESS LIST */}
      <div className="space-y-5 px-4 md:px-6">

        {addresses.map((addr, index) => (

          <div
            key={addr.id}
            className="
              bg-[#f8f8f8]
              rounded-4xl
              overflow-hidden
              group
            "
          >

            {/* TOP */}
            <div className="flex items-start justify-between gap-4 p-6 md:p-8 border-b border-gray-200">

              <div className="flex items-center gap-3 flex-wrap">

                {/* TAG */}
                <div
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-black
                    text-white
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                  "
                >
                  {addr.tag}
                </div>

                {/* DEFAULT */}
                {addr.default && (

                  <div
                    className="
                      px-4
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
                    Default
                  </div>

                )}

              </div>

              {/* DELETE */}
              <button
                onClick={() =>
                  handleDelete(addr.id)
                }
                className="
                  w-11
                  h-11
                  rounded-full
                  border border-gray-200
                  flex items-center justify-center
                  text-gray-500
                  hover:bg-red-500
                  hover:border-red-500
                  hover:text-white
                  transition-all
                  duration-300
                "
              >
                <i className="ri-delete-bin-line text-lg"></i>
              </button>

            </div>

            {/* CONTENT */}
            <div className="p-6 md:p-8">

              {/* Number */}
              <div className="flex items-center justify-between gap-5 mb-6">

                <div>

                  <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                    Address #{index + 1}
                  </p>

                  <h2 className="text-2xl md:text-4xl font-light text-black mt-4">
                    {addr.name}
                  </h2>

                </div>

                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-white
                    flex items-center justify-center
                    shrink-0
                  "
                >

                  <i className="ri-map-pin-line text-2xl text-black"></i>

                </div>

              </div>

              {/* PHONE */}
              <div className="mb-5">

                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                  Phone Number
                </p>

                <p className="text-black text-lg">
                  {addr.phone}
                </p>

              </div>

              {/* ADDRESS */}
              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                  Full Address
                </p>

                <p className="text-gray-600 leading-8">
                  {addr.address}
                </p>

              </div>

              {/* ACTION */}
              {!addr.default && (

                <button
                  onClick={() =>
                    handleDefault(addr.id)
                  }
                  className="
                    mt-8
                    px-8
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
                  Set As Default
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

      {/* ADD ADDRESS MODAL */}
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
                  Delivery Details
                </p>

                <h2 className="text-2xl md:text-3xl font-light text-black mt-3">
                  Add New Address
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
            <div className="px-6 md:px-8 py-8">

              {/* TAGS */}
              <div className="flex gap-3 flex-wrap mb-8">

                {[
                  "Home",
                  "Work",
                  "Other",
                ].map((t) => (

                  <button
                    key={t}
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        tag: t,
                      }))
                    }
                    className={`
                      px-6
                      py-3
                      rounded-full
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      transition-all
                      duration-300
                      ${
                        form.tag === t
                          ? "bg-black text-white"
                          : "border border-gray-200 text-gray-500 hover:border-black hover:text-black"
                      }
                    `}
                  >
                    {t}
                  </button>

                ))}

              </div>

              {/* INPUTS */}
              <div className="space-y-5">

                {[
                  {
                    key: "name",
                    placeholder:
                      "Full Name",
                  },

                  {
                    key: "phone",
                    placeholder:
                      "Phone Number",
                  },

                  {
                    key: "address",
                    placeholder:
                      "Full Address",
                  },
                ].map(
                  ({
                    key,
                    placeholder,
                  }) => (

                    <div key={key}>

                      <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">
                        {placeholder}
                      </p>

                      {key ===
                      "address" ? (

                        <textarea
                          rows={4}
                          value={form[key]}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              [key]:
                                e.target
                                  .value,
                            }))
                          }
                          placeholder={`Enter ${placeholder.toLowerCase()}`}
                          className="
                            w-full
                            bg-[#f8f8f8]
                            border
                            border-gray-200
                            rounded-3xl
                            px-5
                            py-4
                            outline-none
                            resize-none
                            focus:border-black
                            transition-all
                          "
                        />

                      ) : (

                        <input
                          value={form[key]}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              [key]:
                                e.target
                                  .value,
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

                      )}

                    </div>

                  )
                )}

              </div>

              {/* BUTTON */}
              <button
                onClick={handleAdd}
                className="w-full mt-8 py-5 rounded-full bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}