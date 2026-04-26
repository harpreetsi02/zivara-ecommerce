"use client";

import { useEffect, useState } from "react";
import { orderAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { lemonMilk } from "../fonts";

const statusStyle = {
  DELIVERED: "bg-green-100 text-green-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  CONFIRMED: "bg-purple-100 text-purple-700",
  PENDING: "bg-yellow-200/70 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-500",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
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

  if (loading) return (
    <div className="mt-16 flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm">Loading orders...</p>
    </div>
  );

  return (
    <div className="mt-16 min-h-screen bg-white">

      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i className="ri-arrow-left-line text-xl text-gray-800 cursor-pointer" onClick={() => router.back()}></i>
          <div>
            <h1 className={`${lemonMilk.className} text-base text-black font-semibold`}>My Orders</h1>
            <p className="text-xs text-gray-400">Track & manage your orders</p>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 px-8 text-center">
          <i className="ri-shopping-bag-line text-5xl text-gray-200 mb-4"></i>
          <p className="text-gray-500 text-sm">No orders yet</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-2 bg-black text-white text-sm rounded-lg"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="px-4 py-4 shadow space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-100 rounded-2xl overflow-hidden">

              {/* Top */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-100/50">
                <div>
                  <p className="text-xs font-semibold text-black">#ZV{order.id}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyle[order.status]}`}>
                  {order.status}
                </span>
              </div>

              {/* Item preview */}
              <div className="flex items-center gap-3 px-4 py-3">
                {order.items[0] && (
                  <img
                    src={order.items[0].productImage}
                    className="w-16 h-20 object-cover rounded-xl"
                    alt="order"
                  />
                )}
                <div>
                  <p className="text-xs text-gray-500">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </p>
                  <p className="text-sm text-gray-700 font-semibold mt-0.5">₹{order.totalAmount}</p>
                  <p className="text-xs text-gray-500 mt-0.5 capitalize">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex border-t border-gray-100">
                <Link
                  href={`/orders/${order.id}`}
                  className="flex-1 py-3 text-xs font-medium text-gray-600 border-r border-gray-100 text-center"
                >
                  View Details
                </Link>
                <Link
                  href={
                    order.status === "DELIVERED"
                      ? `/orders/${order.id}/return`
                      : order.status === "CANCELLED"
                      ? `/orders/${order.id}`
                      : order.status === "PENDING" || order.status === "CONFIRMED"
                      ? `/orders/${order.id}/cancel`
                      : `/orders/${order.id}/track`
                  }
                  className="flex-1 py-3 text-xs font-medium text-black text-center"
                >
                  {order.status === "DELIVERED"
                    ? "Return / Exchange"
                    : order.status === "CANCELLED"
                    ? "View Details"
                    : order.status === "PENDING" || order.status === "CONFIRMED"
                    ? "Cancel Order"
                    : "Track Order"}
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}