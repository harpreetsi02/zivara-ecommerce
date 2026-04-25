"use client";

import { useState, useEffect } from "react";
import { productAPI, wishlistAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { lemonMilk } from "@/app/fonts";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ShopNow() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("All");
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
      const data = await productAPI.getAll();
      setProducts(data);
      setFiltered(data);

      // Categories nikalo
      const cats = ["All", ...new Set(data.map((p) => p.category))];
      setCategories(cats);
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

  const handleFilter = (cat) => {
    setActive(cat);
    setFiltered(cat === "All" ? products : products.filter((p) => p.category === cat));
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
    <section className="bg-white pb-10">

      {/* Heading */}
      <div className="px-4 pt-8 pb-4">
        <h2 className={`${lemonMilk.className} text-3xl font-light text-black`}>
          Shop{" "}
          <span className="italic text-pink-500 drop-shadow-[0_0_10px_rgba(255,0,150,0.7)]">
            now...
          </span>
        </h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
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

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-2 gap-3 px-4">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div className="w-full h-52 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-3 bg-gray-100 rounded mt-2 w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded mt-1 w-1/2 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4">
          {filtered.map((item) => (
            <Link key={item.id} href={`/product/${item.id}`}>
              <div className="cursor-pointer">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover rounded-xl"
                  />
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
                  {item.stock === 0 && (
                    <div className="absolute inset-0 bg-white/60 rounded-xl flex items-center justify-center">
                      <p className="text-xs font-semibold text-gray-500">Sold Out</p>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-medium mt-2 line-clamp-1">{item.name}</h3>
                <p className="text-xs text-gray-400 capitalize mt-0.5">{item.category}</p>
                <p className="text-sm font-semibold text-black mt-1">₹{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

    </section>
  );
}