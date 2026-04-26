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
  const [form, setForm] = useState({
    address: "",
    payment: "COD",
  });

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    cartAPI.getCart().then(setCart);
  }, [user]);

  const handleOrder = async () => {
    if (!form.address) { alert("Please enter delivery address"); return; }
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

  if (!cart) return (
    <div className="mt-16 flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm">Loading...</p>
    </div>
  );

  return (
    <div className="mt-16 min-h-screen bg-gray-50 pb-32">

      <div className="px-4 py-5 bg-white border-b border-gray-100">
        <h1 className={`${lemonMilk.className} text-base text-black font-semibold`}>Checkout</h1>
        <p className="text-xs text-gray-400 mt-0.5">{cart.totalItems} items</p>
      </div>

      <div className="px-4 py-4 space-y-3">

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
          <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">Order Summary</p>
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
              <p className="text-gray-600 line-clamp-1 flex-1">{item.productName} x{item.quantity}</p>
              <p className="font-medium text-gray-600 ml-2">₹{item.subtotal}</p>
            </div>
          ))}
          <div className="flex justify-between text-gray-600 text-sm font-semibold mt-3 pt-2 border-t border-gray-100">
            <p>Total</p>
            <p>₹{cart.totalAmount}</p>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
          <p className="text-sm text-gray-800 font-bold uppercase tracking-wide mb-3">Delivery Address</p>
          <textarea
            value={form.address}
            onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
            placeholder="Enter your full delivery address..."
            rows={3}
            className="w-full text-sm border text-gray-600 placeholder:text-gray-400 border-gray-200 rounded-xl px-3 py-2 outline-none resize-none"
          />
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
          <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">Payment Method</p>
          <div className="space-y-2">
            {[
              { key: "COD", label: "Cash on Delivery", icon: "ri-money-rupee-circle-line" },
              { key: "UPI", label: "UPI Payment", icon: "ri-smartphone-line" },
              { key: "CARD", label: "Credit / Debit Card", icon: "ri-bank-card-line" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setForm((p) => ({ ...p, payment: opt.key }))}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                  form.payment === opt.key
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-700"
                }`}
              >
                <i className={`${opt.icon} text-lg`}></i>
                <p className="text-sm font-medium">{opt.label}</p>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-0 w-full px-4 py-3 bg-white border-t border-gray-100 z-40">
        <button
          onClick={handleOrder}
          disabled={loading}
          className={`w-full py-3.5 rounded-2xl text-sm font-semibold text-white transition-all ${
            loading ? "bg-gray-300" : "bg-black"
          }`}
        >
          {loading ? "Placing Order..." : `Place Order • ₹${cart.totalAmount}`}
        </button>
      </div>

    </div>
  );
}