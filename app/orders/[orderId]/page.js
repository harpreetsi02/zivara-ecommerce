"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const orders = {
  "ZV10234": {
    id: "ZV10234", date: "10 Apr 2026", status: "Delivered", total: 2398,
    deliveredOn: "12 Apr 2026",
    address: "B-204, Green Valley Apartments, Sector 62, Noida, UP - 201301",
    payment: "UPI • Google Pay",
    items: [
      { name: "Floral Wrap Midi Dress", size: "M", qty: 1, price: 1299, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500" },
      { name: "Pearl Drop Earrings", size: "Free", qty: 1, price: 449, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500" },
    ],
  },
  "ZV10189": {
    id: "ZV10189", date: "2 Apr 2026", status: "Out for Delivery", total: 999,
    deliveredOn: null,
    address: "B-204, Green Valley Apartments, Sector 62, Noida, UP - 201301",
    payment: "Cash on Delivery",
    items: [
      { name: "Black Bodycon Mini Dress", size: "S", qty: 1, price: 999, image: "https://images.unsplash.com/photo-1502716119720-f3738b993f8e?w=500" },
    ],
  },
  "ZV10102": {
    id: "ZV10102", date: "21 Mar 2026", status: "Cancelled", total: 3697,
    deliveredOn: null,
    address: "B-204, Green Valley Apartments, Sector 62, Noida, UP - 201301",
    payment: "Credit Card •• 4242",
    items: [
      { name: "Beige Quilted Sling Bag", size: "Free", qty: 1, price: 1499, image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500" },
      { name: "White Crop Tied Top", size: "L", qty: 2, price: 1198, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
    ],
  },
};

const statusStyle = {
  "Delivered": "bg-green-100 text-green-700",
  "Out for Delivery": "bg-blue-100 text-blue-700",
  "Cancelled": "bg-red-100 text-red-500",
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const order = orders[orderId];

  if (!order) return (
    <div className="mt-16 flex flex-col items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm">Order not found</p>
      <button onClick={() => router.push("/orders")} className="mt-3 text-xs text-pink-500 underline">Back to Orders</button>
    </div>
  );

  return (
    <div className="mt-16 text-black min-h-screen bg-gray-50 pb-10">

      {/* Header */}
      <div className="px-4 py-5 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
          <div>
            <h1 className="text-base font-semibold">Order Details</h1>
            <p className="text-xs text-gray-400">#{order.id}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">

        {/* Status Card */}
        <div className="bg-white rounded-2xl px-4 py-4 flex items-center justify-between border border-gray-100">
          <div>
            <p className="text-xs text-gray-400">Order Status</p>
            <p className="text-sm font-semibold mt-0.5">{order.status}</p>
            {order.deliveredOn && <p className="text-xs text-gray-400 mt-0.5">Delivered on {order.deliveredOn}</p>}
          </div>
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${statusStyle[order.status]}`}>
            {order.status}
          </span>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-4 pt-4 pb-2">Items Ordered</p>
          {order.items.map((item, i) => (
            <div key={i} className={`flex gap-3 px-4 py-3 ${i < order.items.length - 1 ? "border-b border-gray-100" : ""}`}>
              <img src={item.image} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" alt={item.name} />
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">Size: {item.size} • Qty: {item.qty}</p>
                <p className="text-sm font-semibold mt-1">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Price Details</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p>₹{order.total}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Delivery</p>
              <p className="text-green-600">Free</p>
            </div>
            <div className="flex justify-between text-sm font-semibold border-t border-gray-100 pt-2 mt-2">
              <p>Total Paid</p>
              <p>₹{order.total}</p>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Delivery Address</p>
          <div className="flex gap-2">
            <i className="ri-map-pin-line text-pink-400 mt-0.5 flex-shrink-0"></i>
            <p className="text-sm text-gray-600 leading-relaxed">{order.address}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Payment Method</p>
          <div className="flex gap-2 items-center">
            <i className="ri-bank-card-line text-pink-400"></i>
            <p className="text-sm text-gray-600">{order.payment}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {order.status === "Delivered" && (
            <Link href={`/orders/${order.id}/return`}>
              <button className="w-full py-3.5 border border-gray-800 rounded-2xl text-sm font-semibold tracking-wide">
                Return / Exchange
              </button>
            </Link>
          )}
          {order.status === "Out for Delivery" && (
            <Link href={`/orders/${order.id}/track`}>
              <button className="w-full py-3.5 bg-black text-white rounded-2xl text-sm font-semibold tracking-wide">
                Track Order
              </button>
            </Link>
          )}
          {order.status !== "Delivered" && order.status !== "Cancelled" && (
            <Link href={`/orders/${order.id}/cancel`}>
              <button className="w-full py-3.5 border border-red-300 text-red-500 rounded-2xl text-sm font-semibold tracking-wide">
                Cancel Order
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}