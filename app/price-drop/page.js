"use client";

import { useEffect, useState } from "react";
import { productAPI, wishlistAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { lemonMilk } from "@/app/fonts";
import Link from "next/link";

export default function PriceDropPage() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user) fetchWishlist();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const data = await productAPI.getPriceDrop();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const data = await wishlistAPI.getWishlist();
      setWishlist(data.map((item) => item.productId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleWishlist = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { router.push("/login"); return; }
    await wishlistAPI.toggle(item.id);
    setWishlist((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    );
  };

  return (
    <div className="mt-16 min-h-screen bg-white pb-10">

      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className={`${lemonMilk.className} text-xl font-bold text-black flex items-center`}>
          <span className="text-4xl">p</span>rice drop
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {loading ? "Loading..." : `${products.length} items on sale`}
        </p>
      </div>

      {/* Banner */}
      <div className="mx-4 mb-5 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-blue-700 font-semibold text-sm">Flash Sale — Limited Time!</p>
          <p className="text-blue-400 text-xs mt-0.5">Prices dropped on selected items</p>
        </div>
        <span className="text-2xl font-bold text-blue-500">SALE</span>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 px-4">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div className="w-full h-48 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-3 bg-gray-100 rounded mt-2 w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded mt-1 w-1/2 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 px-4">
          {products.map((item) => {
            const originalPrice = Math.round(item.price * 1.3);
            const discount = Math.round(((originalPrice - item.price) / originalPrice) * 100);

            return (
              <Link key={item.id} href={`/product/${item.id}`}>
                <div className="cursor-pointer">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-55 object-cover rounded-xl"
                    />
                    {/* Discount badge */}
                    <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                      -{discount}%
                    </span>
                    {/* Wishlist */}
                    <button
                      onClick={(e) => handleWishlist(e, item)}
                      className="absolute bottom-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                    >
                      <i className={`${
                        wishlist.includes(item.id)
                          ? "ri-heart-fill text-red-500"
                          : "ri-heart-line text-gray-500"
                      } text-base`}></i>
                    </button>
                  </div>

                  <h2 className="text-sm text-gray-800 font-semibold mt-2 line-clamp-1">{item.name}</h2>
                  <p className="text-xs text-gray-500 capitalize mt-0.5">{item.category}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-sm font-semibold text-black">₹{item.price}</p>
                    <p className="text-xs text-gray-400 line-through">₹{originalPrice}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

    </div>
  );
}