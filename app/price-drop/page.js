"use client";

import { products } from "@/utils/data";
import Link from "next/link";
import { lemonMilk } from "@/app/fonts";

// price drop simulation — jo items 999 se kam hain wo sale mein hain
// ya tu chahein toh data.js mein `originalPrice` field add kar sakta hai baad mein
const priceDropItems = products
  .filter((item) => item.price <= 999)
  .map((item) => ({
    ...item,
    originalPrice: Math.round(item.price * 1.3), // 30% upar dikhao as original
  }));

export default function PriceDropPage() {
  return (
    <div className="mt-16 px-4 py-6">

      {/* Heading */}
      <div className="mb-6">
        <h1 className={`${lemonMilk.className} text-2xl font-bold text-black flex items-center`}>
          <span className="text-4xl">P</span>RICE DROP
        </h1>
        <p className="text-sm text-gray-500 mt-1">{priceDropItems.length} items on sale</p>
      </div>

      {/* Sale banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6 flex items-center justify-between">
        <div>
          <p className="text-blue-700 font-semibold text-sm">Flash Sale — Limited Time!</p>
          <p className="text-blue-500 text-xs mt-0.5">Prices dropped on selected items</p>
        </div>
        <span className="text-2xl font-bold text-blue-500">SALE</span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4">
        {priceDropItems.map((item) => {
          const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

          return (
            <Link key={item.id} href={`/product/${item.id}`}>
              <div className="cursor-pointer">

                {/* Image + discount badge */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                    -{discount}%
                  </span>
                </div>

                <h2 className="text-sm text-black font-medium mt-2 line-clamp-1">{item.name}</h2>

                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-sm font-semibold text-black">₹{item.price}</p>
                  <p className="text-xs text-gray-400 line-through">₹{item.originalPrice}</p>
                </div>

              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}