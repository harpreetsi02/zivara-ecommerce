"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { orderAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { lemonMilk } from "@/app/fonts";

const statusStyle = {
  DELIVERED: "bg-green-500/10 text-green-500 border border-green-500/20",
  SHIPPED: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
  CONFIRMED: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
  PENDING: "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20",
  CANCELLED: "bg-red-500/10 text-red-500 border border-red-500/20",
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchOrder();
  }, [user]);

  const fetchOrder = async () => {
    try {
      const data = await orderAPI.getOrderById(orderId);
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-14 h-14 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 text-sm uppercase tracking-[0.25em] mt-5">
            Loading Order
          </p>
        </div>
      </div>
    );

  // NOT FOUND
  if (!order)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <div className="w-28 h-28 rounded-full bg-[#f8f8f8] flex items-center justify-center">
          <i className="ri-file-search-line text-5xl text-gray-300"></i>
        </div>

        <h2 className="text-3xl md:text-5xl font-light text-black mt-10">
          Order not found
        </h2>

        <p className="text-gray-400 text-sm md:text-base mt-5 max-w-md leading-7">
          We couldn’t find the order you’re looking for.
        </p>

        <button
          onClick={() => router.push("/orders")}
          className="mt-10 bg-black text-white px-10 py-4 rounded-full text-sm uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300"
        >
          Back To Orders
        </button>
      </div>
    );

  return (
    <section className="min-h-screen relative z-20 pt-24 pb-20 overflow-hidden">
      {/* HEADING */}
      <div className="text-center mb-12 px-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            <i className="ri-arrow-left-line text-lg"></i>
          </button>

          <h1
            className={`${lemonMilk.className} flex items-center text-black tracking-wide`}
          >
            <span className="text-5xl md:text-7xl leading-none">O</span>
            <span className="text-xl md:text-4xl">rder Details</span>
          </h1>
        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          #ZV{order.id}
        </p>
      </div>

      {/* MAIN */}
      <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 px-4 md:px-6">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* STATUS */}
          <div className="bg-[#f8f8f8] rounded-4xl p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                  Order Status
                </p>

                <h2 className="text-3xl md:text-5xl font-light text-black mt-4">
                  {order.status}
                </h2>

                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-4">
                  {new Date(order.createdAt).toLocaleDateString("en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>

              {/* Badge */}
              <div
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] ${statusStyle[order.status]}`}
              >
                {order.status}
              </div>
            </div>
          </div>

          {/* ITEMS */}
          <div className="bg-[#f8f8f8] rounded-4xl overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-200">
              <h2 className="text-3xl font-light text-black">
                Ordered Items
              </h2>

              <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-3">
                {order.items.length} Item
                {order.items.length !== 1
                  ? "s"
                  : ""}
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {order.items.map((item, i) => (
                <Link
                  key={item.id}
                  href={`/product/${item.productId}`}
                  className="flex gap-4 md:gap-6 p-5 md:p-6 group"
                >
                  {/* IMAGE */}
                  <div className="relative shrink-0 overflow-hidden rounded-3xl">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-24 h-32 md:w-32 md:h-40 object-cover transition-all duration-700 group-hover:scale-[1.05]"
                    />

                    {/* Number */}
                    <div className="absolute top-2 left-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <p className="text-white text-[10px]">
                          {String(i + 1).padStart( 2, "0" )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-light text-black leading-tight">
                        {item.productName}
                      </h3>

                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-4">
                        Size:{" "}
                        {item.size || "Free"} •
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <p className="text-xl text-black">
                        ₹{item.price}
                      </p>

                      <div
                        className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-black transition-all duration-300 group-hover:bg-black group-hover:text-white"
                      >
                        <i className="ri-arrow-right-up-line text-lg"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-[#f8f8f8] rounded-4xl p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
              Delivery Address
            </p>

            <div className="flex gap-4 mt-5">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                <i className="ri-map-pin-line text-xl text-black"></i>
              </div>

              <p className="text-gray-600 leading-8">
                {order.deliveryAddress}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 lg:sticky lg:top-28 h-fit">
          {/* PRICE */}
          <div className="bg-black rounded-4xl overflow-hidden">
            <div className="p-8 border-b border-white/10">
              <p className="text-white/50 text-xs uppercase tracking-[0.25em]">
                Total Paid
              </p>

              <h2 className="text-white text-5xl font-light mt-5">
                ₹{order.totalAmount}
              </h2>
            </div>

            <div className="p-8 space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-white/50 uppercase tracking-[0.2em] text-xs">
                  Subtotal
                </p>

                <p className="text-white">
                  ₹{order.totalAmount}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-white/50 uppercase tracking-[0.2em] text-xs">
                  Delivery
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
                  {order.paymentMethod}
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="bg-[#f8f8f8] rounded-4xl p-6">
            <div className="space-y-4">
              {order.status === "DELIVERED" && (
                <Link href={`/orders/${order.id}/return`}>
                  <button
                    className="w-full py-5 rounded-full border border-black text-black text-sm uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300
                    "
                  >
                    Return / Exchange
                  </button>
                </Link>
              )}

              {order.status === "SHIPPED" && (
                <Link href={`/orders/${order.id}/track`}>
                  <button
                    className="w-full py-5 rounded-full bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300"
                  >
                    Track Order
                  </button>
                </Link>
              )}

              {(order.status === "PENDING" || order.status === "CONFIRMED") && (
                <Link
                  href={`/orders/${order.id}/cancel`}
                >
                  <button
                    className="w-full py-5 rounded-full border border-red-300 text-red-500 text-sm uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    Cancel Order
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}