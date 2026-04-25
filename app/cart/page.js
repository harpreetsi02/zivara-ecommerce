"use client";

import { useEffect, useState } from "react";
import { cartAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
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
    const item = cart.items.find((i) => i.id === itemId);
    const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
    try {
      const data = await cartAPI.updateQuantity(itemId, newQty);
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const data = await cartAPI.removeItem(itemId);
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="mt-16 flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm">Loading cart...</p>
    </div>
  );

  return (
    <div className="p-4 mt-16">

      <h1 className="text-xl font-semibold mb-4">Your Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-400 text-sm">Cart is empty</p>
          <Link href="/" className="text-pink-500 text-sm mt-2 block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center border-b pb-3">
                <img
                  src={item.productImage}
                  className="w-20 h-20 object-cover rounded-lg"
                  alt={item.productName}
                />
                <div className="flex-1">
                  <h2 className="text-sm font-medium line-clamp-1">{item.productName}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Size: {item.size || "Free"}</p>
                  <p className="text-sm font-semibold mt-0.5">₹{item.productPrice}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleQty(item.id, "dec")}
                      className="px-2 py-0.5 bg-gray-200 rounded text-sm"
                    >
                      -
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => handleQty(item.id, "inc")}
                      className="px-2 py-0.5 bg-gray-200 rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-400 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-sm mb-1">
              <p className="text-gray-500">Total Items</p>
              <p>{cart.totalItems}</p>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <p>Total Amount</p>
              <p>₹{cart.totalAmount}</p>
            </div>
            <Link href="/checkout">
              <button className="mt-4 w-full bg-black text-white py-3 rounded-xl text-sm font-semibold">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}

    </div>
  );
}