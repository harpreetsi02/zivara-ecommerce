"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { orderAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { lemonMilk } from "@/app/fonts";

const statusStyle = {
  DELIVERED: "bg-green-100 text-green-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  CONFIRMED: "bg-purple-100 text-purple-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-500",
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
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

  if (loading) return (
    <div className="mt-16 flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm">Loading order...</p>
    </div>
  );

  if (!order) return (
    <div className="mt-16 flex flex-col items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm">Order not found</p>
      <button onClick={() => router.push("/orders")} className="mt-3 text-xs text-pink-500 underline">
        Back to Orders
      </button>
    </div>
  );

  return (
    <div className="mt-16 min-h-screen bg-gray-50 pb-10">

      <div className="px-4 py-5 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i className="ri-arrow-left-line text-gray-800 text-xl cursor-pointer" onClick={() => router.back()}></i>
          <div>
            <h1 className={`${lemonMilk.className} text-base text-black font-semibold`}>Order Details</h1>
            <p className="text-sm font-semibold text-gray-500">#ZV{order.id}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">

        {/* Status */}
        <div className="bg-white rounded-2xl px-4 py-4 flex items-center justify-between border border-gray-100">
          <div>
            <p className="text-xs text-gray-400">Order Status</p>
            <p className="text-sm text-gray-600 font-semibold mt-0.5">{order.status}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric"
              })}
            </p>
          </div>
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${statusStyle[order.status]}`}>
            {order.status}
          </span>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <p className="text-sm font-semibold text-black uppercase tracking-wide px-4 pt-4 pb-2">
            Items Ordered
          </p>
          {order.items.map((item, i) => (
            <div
              key={item.id}
              className={`flex gap-3 px-4 py-3 ${i < order.items.length - 1 ? "border-b border-gray-300" : ""}`}
            >
              <img
                src={item.productImage}
                className="w-16 h-20 object-cover rounded-xl shrink-0"
                alt={item.productName}
              />
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-semibold line-clamp-2">{item.productName}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Size: {item.size || "Free"} • Qty: {item.quantity}
                </p>
                <p className="text-sm text-gray-600 font-semibold mt-1">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
          <p className="text-sm font-semibold text-black uppercase tracking-wide mb-3">
            Price Details
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="text-gray-600">₹{order.totalAmount}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Delivery</p>
              <p className="text-green-600">Free</p>
            </div>
            <div className="flex justify-between text-sm font-semibold border-t text-gray-800 border-gray-100 pt-2 mt-2">
              <p>Total Paid</p>
              <p>₹{order.totalAmount}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Delivery Address
          </p>
          <div className="flex gap-2">
            <i className="ri-map-pin-line text-pink-400 mt-0.5 shrink-0"></i>
            <p className="text-sm text-gray-600 leading-relaxed">{order.deliveryAddress}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Payment Method
          </p>
          <div className="flex gap-2 items-center">
            <i className="ri-bank-card-line text-pink-400"></i>
            <p className="text-sm text-gray-600">{order.paymentMethod}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {order.status === "DELIVERED" && (
            <Link href={`/orders/${order.id}/return`}>
              <button className="w-full py-3.5 border border-gray-800 rounded-2xl text-sm font-semibold">
                Return / Exchange
              </button>
            </Link>
          )}
          {(order.status === "SHIPPED") && (
            <Link href={`/orders/${order.id}/track`}>
              <button className="w-full py-3.5 bg-black text-white rounded-2xl text-sm font-semibold">
                Track Order
              </button>
            </Link>
          )}
          {(order.status === "PENDING" || order.status === "CONFIRMED") && (
            <Link href={`/orders/${order.id}/cancel`}>
              <button className="w-full py-3.5 border border-red-300 text-red-500 rounded-2xl text-sm font-semibold">
                Cancel Order
              </button>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}