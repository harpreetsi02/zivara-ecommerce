"use client";

import { lemonMilk } from "@/app/fonts";
import { useRef, useEffect, useState } from "react";
import { productAPI } from "@/utils/api";
import Link from "next/link";

export default function NewArrival() {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productAPI.getLatest(30);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({
      left: dir === "left" ? -352 : 352,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-4 text-black py-6">

      {/* Heading + Arrows */}
      <div className="flex items-center justify-center mb-4">
        <h2 className={`${lemonMilk.className} flex items-center tracking-wider text-lg text-black font-semibold`}>
          <span className="text-4xl">N</span>ew Arrivals
        </h2>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex gap-4 overflow-hidden">
          {[1, 2].map((i) => (
            <div key={i} className="min-w-[calc(50%-8px)] shrink-0">
              <div className="w-full h-50 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-3 bg-gray-100 rounded mt-2 w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded mt-1 w-1/2 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="grid grid-rows-1 grid-flow-col gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
          style={{ gridAutoColumns: "calc(50% - 8px)" }}
        >
          {products.map((item) => (
            <div key={item.id} className="snap-start">
              <Link href={`/product/${item.id}`}>
                <div className="cursor-pointer">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-70 object-cover rounded-lg"
                    />
                    {item.stock <= 5 && item.stock > 0 && (
                      <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-md">
                        Only {item.stock} left
                      </span>
                    )}
                    {item.stock === 0 && (
                      <span className="absolute top-2 left-2 bg-gray-500 text-white text-xs px-2 py-0.5 rounded-md">
                        Sold Out
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-sm font-medium line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-gray-600">₹{item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}