"use client";

import { useState, useEffect } from "react";
import { cartAPI, orderAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { lemonMilk } from "../fonts";

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({address: "", payment: "COD",});

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    cartAPI.getCart().then(setCart);
  }, [user]);

  const handleOrder = async () => {
    if (!form.address) {
      alert("Please enter delivery address");
      return;
    }
    setLoading(true);

    try {
      const orderBody = {
        items: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
        })),
        deliveryAddress: form.address,
        paymentMethod: form.payment,
      };

      const order = await orderAPI.createOrder(orderBody);
      await cartAPI.clearCart();
      router.push(`/orders/${order.id}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (!cart)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-14 h-14 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 text-sm uppercase tracking-[0.25em] mt-5">
            Preparing Checkout
          </p>
        </div>
      </div>
    );

  return (
    <section className="min-h-screen bg-white pt-24 pb-36 overflow-hidden">
      {/* HEADING */}
      <div className="text-center mb-12 px-4">
        <h1 className={`${lemonMilk.className} flex items-center justify-center text-black tracking-wide`}>
          <span className="text-5xl md:text-7xl leading-none">C</span>
          <span className="text-xl md:text-4xl">heckout</span>
        </h1>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          {cart.totalItems} Items • Secure Checkout
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 px-4 md:px-6">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* ORDER SUMMARY */}
          <div className="bg-[#f8f8f8] rounded-4xl p-6 md:p-8">
            <div className="pb-5 border-b border-gray-200">
              <h2 className="text-3xl font-light text-black">
                Order Summary
              </h2>

              <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-3">
                Review Your Selected Pieces
              </p>
            </div>

            {/* ITEMS */}
            <div className="space-y-5 mt-6">
              {cart.items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4"
                >
                  {/* IMAGE */}
                  <div className="relative shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-20 h-28 md:w-24 md:h-32 object-cover"
                    />

                    {/* Number */}
                    <div className="absolute top-2 left-2">
                      <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <p className="text-white text-[10px]">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-light text-black line-clamp-1">
                      {item.productName}
                    </h3>

                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2">
                      Qty {item.quantity}
                      {item.size &&
                        ` • Size ${item.size}`}
                    </p>

                    <p className="text-lg text-black mt-4">
                      ₹{item.subtotal}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="flex items-center justify-between border-t border-gray-200 mt-8 pt-6">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                Total Amount
              </p>

              <p className="text-3xl font-light text-black">
                ₹{cart.totalAmount}
              </p>
            </div>
          </div>

          {/* DELIVERY ADDRESS */}
          <div className="bg-[#f8f8f8] rounded-4xl p-6 md:p-8">
            <div className="pb-5 border-b border-gray-200">
              <h2 className="text-3xl font-light text-black">
                Delivery Address
              </h2>

              <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-3">
                Enter Your Shipping Details
              </p>
            </div>

            <textarea
              value={form.address}
              onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
              placeholder="Enter your full delivery address..."
              rows={5}
              className="w-full mt-6 bg-white border border-gray-200 rounded-3xl px-5 py-4 text-sm text-gray-700 placeholder:text-gray-400 outline-none resize-none focus:border-black transition-all"
            />
          </div>

          {/* PAYMENT */}
          <div className="bg-[#f8f8f8] rounded-4xl p-6 md:p-8">
            <div className="pb-5 border-b border-gray-200">
              <h2 className="text-3xl font-light text-black">
                Payment Method
              </h2>

              <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-3">
                Choose Your Preferred Option
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {[
                {
                  key: "COD",
                  label: "Cash on Delivery",
                  icon: "ri-money-rupee-circle-line",
                },

                {
                  key: "UPI",
                  label: "UPI Payment",
                  icon: "ri-smartphone-line",
                },

                {
                  key: "CARD",
                  label: "Credit / Debit Card",
                  icon: "ri-bank-card-line",
                },
              ].map((opt) => (

                <button
                  key={opt.key}
                  onClick={() => setForm((p) => ({ ...p, payment: opt.key }))}
                  className={`w-full flex items-center justify-between px-5 py-5 rounded-3xl transition-all duration-300 border
                    ${
                      form.payment === opt.key
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-200 hover:border-black"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <i className={`${opt.icon} text-2xl`}></i>
                    <div className="text-left">
                      <p className="text-sm uppercase tracking-[0.15em]">
                        {opt.label}
                      </p>
                    </div>
                  </div>

                  {form.payment === opt.key && (
                    <i className="ri-check-line text-xl"></i>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:sticky lg:top-28 h-fit">

          <div className="bg-black rounded-4xl overflow-hidden">

            {/* TOP */}
            <div className="p-8 border-b border-white/10">
              <p className="text-white/60 text-xs uppercase tracking-[0.3em]">
                Final Payment
              </p>

              <h2 className="text-white text-5xl font-light mt-5">
                ₹{cart.totalAmount}
              </h2>
            </div>

            {/* DETAILS */}
            <div className="p-8 space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-white/50 uppercase tracking-[0.2em] text-xs">
                  Items
                </p>

                <p className="text-white">
                  {cart.totalItems}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-white/50 uppercase tracking-[0.2em] text-xs">
                  Shipping
                </p>

                <p className="text-green-400 uppercase tracking-[0.2em] text-xs">
                  Free
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-white/50 uppercase tracking-[0.2em] text-xs">
                  Payment
                </p>

                <p className="text-white uppercase tracking-[0.2em] text-xs">
                  {form.payment}
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <div className="p-8 pt-2">
              <button
                onClick={handleOrder}
                disabled={loading}
                className={`w-full py-5 rounded-full text-sm uppercase tracking-[0.2em] transition-all duration-300
                  ${loading
                    ? "bg-gray-400 text-white"
                    : "bg-white text-black hover:bg-neutral-200"
                  }
                `}
              >
                {loading
                  ? "Placing Order..."
                  : `Place Order • ₹${cart.totalAmount}`}
              </button>

              <p className="text-center text-white/40 text-xs uppercase tracking-[0.2em] mt-6">
                Secure Payments • Trusted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}