"use client";

import { useEffect, useState } from "react";
import { cartAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { lemonMilk } from "../fonts";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const data = await cartAPI.getCart();
      setCart(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQty = async (itemId, type) => {
    const item = cart.items.find(
      (i) => i.id === itemId
    );

    const newQty =
      type === "inc"
        ? item.quantity + 1
        : item.quantity - 1;

    try {
      const data =
        await cartAPI.updateQuantity(
          itemId,
          newQty
        );
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const data =
        await cartAPI.removeItem(itemId);
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  // LOADING
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 text-sm uppercase tracking-[0.25em] mt-5">
            Loading Cart
          </p>
        </div>
      </div>
    );

  return (
    <section className="min-h-screen z-20 relative pt-24 pb-32 overflow-hidden">
      {/* HEADING */}
      <div className="text-center mb-12 px-4">
        <h1
          className={`${lemonMilk.className} flex items-center justify-center text-black tracking-wide`}
        >
          <span className="text-5xl md:text-7xl leading-none">Y</span>
          <span className="text-xl md:text-4xl">our Cart</span>
        </h1>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Review Your Selected Pieces
        </p>
      </div>

      {/* EMPTY CART */}
      {!cart || cart.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-28 px-4">
          {/* Icon */}
          <div className="w-28 h-28 rounded-full bg-[#f8f8f8] flex items-center justify-center">
            <i className="ri-shopping-bag-line text-5xl text-gray-400"></i>
          </div>

          <h2 className="text-3xl md:text-5xl font-light text-black mt-10">
            Your cart feels empty
          </h2>

          <p className="text-gray-400 text-sm md:text-base mt-5 max-w-md leading-7">
            Looks like you haven’t added anything yet.
            Explore fresh drops and curated collections.
          </p>

          <Link href="/">
            <button
              className="mt-10 bg-black text-white px-10 py-4 rounded-full text-sm uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 px-4 md:px-6">
          {/* LEFT SIDE */}
          <div className="space-y-5">
            {cart.items.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-[#f8f8f8] p-4 md:p-5"
              >
                <div className="flex gap-4 md:gap-6">
                  {/* IMAGE */}
                  <div className="relative shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-28 h-40 md:w-40 md:h-56 object-cover transition-all duration-700 group-hover:scale-[1.05]"
                    />

                    {/* Number */}
                    <div className="absolute top-3 left-3">
                      <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <p className="text-white text-xs">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-lg md:text-2xl font-light text-black leading-tight">
                            {item.productName}
                          </h2>

                          <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-3">
                            Size: {item.size || "Free"}
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-red-500 transition-all"
                        >
                          <i className="ri-close-line text-xl"></i>
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-xl md:text-2xl text-black font-light mt-6">
                        ₹{item.productPrice}
                      </p>
                    </div>

                    {/* Bottom */}
                    <div className="flex items-center justify-between mt-8">

                      {/* Quantity */}
                      <div className="flex items-center gap-3 bg-white rounded-full px-3 py-2">
                        <button
                          onClick={() => handleQty(item.id, "dec")}
                          className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
                        >
                          <i className="ri-subtract-line"></i>
                        </button>

                        <span className="text-black text-sm min-w-5 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => handleQty(item.id, "inc")}
                          className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
                        >
                          <i className="ri-add-line"></i>
                        </button>
                      </div>

                      {/* Subtotal */}
                      <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                        ₹{item.productPrice * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-[#f8f8f8] rounded-4xl p-6 md:p-8">
              {/* Title */}
              <div className="pb-6 border-b border-gray-200">
                <h2 className="text-3xl font-light text-black">
                  Order Summary
                </h2>

                <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-3">
                  Final Checkout Details
                </p>
              </div>

              {/* Totals */}
              <div className="space-y-5 py-8">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 uppercase tracking-[0.15em] text-xs">
                    Total Items
                  </p>

                  <p className="text-black text-lg">
                    {cart.totalItems}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-500 uppercase tracking-[0.15em] text-xs">
                    Shipping
                  </p>
                  <p className="text-green-600 text-sm uppercase tracking-[0.2em]">
                    Free
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-500 uppercase tracking-[0.15em] text-xs">
                    Total Amount
                  </p>

                  <p className="text-3xl font-light text-black">
                    ₹{cart.totalAmount}
                  </p>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <button
                  className="w-full bg-black text-white py-5 rounded-full text-sm uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300"
                >
                  Proceed To Checkout
                </button>
              </Link>

              {/* Footer Text */}
              <p className="text-center text-gray-400 text-xs uppercase tracking-[0.2em] mt-6">
                Secure Payments • Easy Returns
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}