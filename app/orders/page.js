"use client";

import { useEffect, useState } from "react";
import { orderAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { lemonMilk } from "../fonts";

const statusStyle = {
  DELIVERED: "bg-green-500/10 text-green-500 border border-green-500/20",
  SHIPPED: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
  CONFIRMED: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
  PENDING: "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20",
  CANCELLED: "bg-red-500/10 text-red-500 border border-red-500/20",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const data = await orderAPI.getOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 text-sm uppercase tracking-[0.25em] mt-5">
            Loading Orders
          </p>
        </div>
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
            <span className="text-5xl md:text-7xl leading-none">M</span>
            <span className="text-xl md:text-4xl">y Orders</span>
          </h1>
        </div>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Track & Manage Your Purchases
        </p>
      </div>

      {/* EMPTY */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-28 px-6">
          {/* Icon */}
          <div className="w-28 h-28 rounded-full bg-[#f8f8f8] flex items-center justify-center">
            <i className="ri-shopping-bag-line text-5xl text-gray-300"></i>
          </div>

          <h2 className="text-3xl md:text-5xl font-light text-black mt-10">
            No orders yet
          </h2>

          <p className="text-gray-400 text-sm md:text-base mt-5 max-w-md leading-7">
            Looks like you haven’t placed an order yet.
            Start exploring curated collections now.
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-10 bg-black text-white px-10 py-4 rounded-full text-sm uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6 px-4 md:px-6">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="group relative overflow-hidden rounded-4xl bg-[#f8f8f8]"
            >
              {/* TOP */}
              <div className="flex items-center justify-between px-5 md:px-7 py-5 border-b border-gray-200">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                    Order ID
                  </p>

                  <h2 className="text-xl md:text-2xl font-light text-black mt-2">
                    #ZV{order.id}
                  </h2>

                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-3">
                    {new Date(order.createdAt).toLocaleDateString("en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

                {/* STATUS */}
                <div
                  className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] ${statusStyle[order.status]}`}
                >
                  {order.status}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 md:p-7">
                <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                  {/* IMAGE */}
                  {order.items[0] && (
                    <div className="relative shrink-0 overflow-hidden rounded-3xl">
                      <img
                        src={order.items[0] .productImage}
                        alt="order"
                        className="w-full md:w-40 h-65 md:h-52 object-cover transition-all duration-700 group-hover:scale-[1.05]"
                      />

                      {/* Number */}
                      <div className="absolute top-3 left-3">
                        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                          <p className="text-white text-xs">
                            {String(index + 1).padStart( 2, "0")}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DETAILS */}
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                      {order.items.length} Item
                      {order.items.length !== 1
                        ? "s"
                        : ""}
                    </p>

                    <h3 className="text-3xl md:text-5xl font-light text-black mt-4">
                      ₹{order.totalAmount}
                    </h3>

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-4">
                      Payment •{" "}
                      {order.paymentMethod}
                    </p>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-3 mt-8">
                      {/* View */}
                      <Link
                        href={`/orders/${order.id}`}
                        className="px-7 py-4 rounded-full border border-black text-black text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300"
                      >
                        View Details
                      </Link>

                      {/* Dynamic Action */}
                      <Link
                        href={order.status === "DELIVERED"
                          ? `/orders/${order.id}/return` : order.status === "CANCELLED"
                          ? `/orders/${order.id}` : order.status === "PENDING" || order.status === "CONFIRMED"
                          ? `/orders/${order.id}/cancel` : `/orders/${order.id}/track`
                        }
                        className="px-7 py-4 rounded-full bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300"
                      >
                        {order.status === "DELIVERED"
                          ? "Return / Exchange" : order.status === "CANCELLED"
                          ? "View Details" : order.status === "PENDING" || order.status === "CONFIRMED"
                          ? "Cancel Order" : "Track Order"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}