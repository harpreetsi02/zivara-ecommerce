"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const orders = [
  { id: "ZV10234", date: "10 Apr 2026", status: "Delivered", items: 2, total: 2398, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500" },
  { id: "ZV10189", date: "2 Apr 2026", status: "Out for Delivery", items: 1, total: 999, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500" },
  { id: "ZV10102", date: "21 Mar 2026", status: "Cancelled", items: 3, total: 3697, image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500" },
];

const statusStyle = {
  "Delivered": "bg-green-100 text-green-700",
  "Out for Delivery": "bg-blue-100 text-blue-700",
  "Cancelled": "bg-red-100 text-red-500",
};

export default function OrdersPage() {
  const router = useRouter();

  return (
    <div className="mt-16 text-black min-h-screen bg-white">

      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <i className="ri-arrow-left-line text-xl cursor-pointer" onClick={() => router.back()}></i>
          <div>
            <h1 className="text-base font-semibold">My Orders</h1>
            <p className="text-xs text-gray-400">Track & manage your orders</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-100 rounded-2xl overflow-hidden">

            <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
              <div>
                <p className="text-xs font-semibold text-black">#{order.id}</p>
                <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyle[order.status]}`}>
                {order.status}
              </span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3">
              <img src={order.image} className="w-16 h-16 object-cover rounded-xl" alt="order" />
              <div>
                <p className="text-xs text-gray-500">{order.items} item{order.items > 1 ? "s" : ""}</p>
                <p className="text-sm font-semibold mt-0.5">₹{order.total}</p>
              </div>
            </div>

            <div className="flex border-t border-gray-100">
              <Link
                href={`/orders/${order.id}`}
                className="flex-1 py-3 text-xs font-medium text-gray-600 border-r border-gray-100 text-center"
              >
                View Details
              </Link>
              <Link
                href={order.status === "Delivered"
                  ? `/orders/${order.id}/return`
                  : order.status === "Cancelled"
                  ? `/orders/${order.id}`
                  : `/orders/${order.id}/track`
                }
                className="flex-1 py-3 text-xs font-medium text-black text-center"
              >
                {order.status === "Delivered" ? "Return / Exchange" : order.status === "Cancelled" ? "View Details" : "Track Order"}
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}