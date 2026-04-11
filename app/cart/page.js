"use client";

import { useEffect, useState } from "react";
import {
  getCart,
  updateQty,
  removeFromCart,
} from "@/utils/cart";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleQty = (id, type) => {
    const updated = updateQty(id, type);
    setCart(updated);
  };

  const handleRemove = (id) => {
    const updated = removeFromCart(id);
    setCart(updated);
  };

  const total = cart.reduce((acc, item) => {
    return acc + parseInt(item.price.replace("₹", "")) * item.qty;
  }, 0);

  return (
    <div className="p-4 mt-16">

      <h1 className="text-xl font-semibold mb-4">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center border-b pb-3"
              >
                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h2 className="text-sm font-medium">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleQty(item.id, "dec")}
                      className="px-2 bg-gray-200"
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() => handleQty(item.id, "inc")}
                      className="px-2 bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

          </div>

          {/* TOTAL */}
          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-semibold">
              Total: ₹{total}
            </h2>

            <button className="mt-3 w-full bg-black text-white py-3 rounded-lg">
              Checkout
            </button>
          </div>
        </>
      )}

    </div>
  );
}   