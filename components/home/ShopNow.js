"use client";

import { useState, useEffect } from "react";
import { products } from "@/utils/data";
import { toggleWishlist, getWishlist } from "@/utils/wishlist";
import { lemonMilk } from "@/app/fonts";
import Link from "next/link";

const categories = ["All", ...new Set(products.map((p) => p.category))];

export default function ShopNow() {
  const [active, setActive] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWishlist(getWishlist());
  }, []);

  if (!mounted) return null;

  const filtered =
    active === "All"
      ? products
      : products.filter((p) => p.category === active);

  const isLiked = (id) => wishlist.some((p) => p.id === id);

  const handleWishlist = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleWishlist(item);
    setWishlist(updated);
  };

  return (
    <section className="pb-10">

      {/* Heading */}
      <div className="px-4 pt-8 pb-4">
        <h2 className={`${lemonMilk.className} text-center text-3xl font-light text-black`}>
          Shop <span className="italic text-pink-500 drop-shadow-[0_0_10px_rgba(255,0,150,0.7)]">now...</span>
        </h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-300 overflow-x-auto no-scrollbar px-4 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`shrink-0 text-xs px-4 py-1.5 rounded-full border transition-all ${
              active === cat
                ? "bg-black text-white border-black"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3 py-3 px-4">
        {filtered.map((item) => (
          <Link key={item.id} href={`/product/${item.id}`}>
            <div className="cursor-pointer">

              {/* Image + Wishlist */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-65 object-cover"
                />

                <button
                  onClick={(e) => handleWishlist(e, item)}
                  className="absolute top-2 right-2 bg-white/20 rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                >
                  <i
                    className={`${
                      isLiked(item.id)
                        ? "ri-heart-fill text-red-500"
                        : "ri-heart-line text-gray-500"
                    } text-base`}
                  ></i>
                </button>
              </div>

              {/* Info */}
              <div className="mt-2 px-0.5">
                <h3 className="text-sm text-black font-medium line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-400 capitalize mt-0.5">
                  {item.category}
                </p>
                <p className="text-sm font-semibold text-black mt-1">
                  ₹{item.price}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}