"use client";

import { lemonMilk } from "@/app/fonts";
import { useRef, useEffect, useState } from "react";
import { productAPI } from "@/utils/api";
import Link from "next/link";

export default function NewArrival() {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productAPI.getLatest(40);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768 ? 4 : 2;
    }
    return 2;
  };

  const totalPages = Math.ceil(products.length / getItemsPerPage());

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const itemsPerPage = getItemsPerPage();
    const cardWidth = container.offsetWidth / itemsPerPage;
    
    container.scrollBy({
      left: dir === "left"
        ? -(cardWidth * itemsPerPage)
        : cardWidth * itemsPerPage,
      behavior: "smooth",
    });
  
    setCurrentPage((prev) => {
      if (dir === "left") {
        return prev === 0 ? 0 : prev - 1;
      } else {
        return prev === totalPages - 1 ? prev : prev + 1;
      }
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
          // style={{ gridAutoColumns: "calc(50% - 8px)" }}
          style={{
            gridAutoColumns:
              typeof window !== "undefined" && window.innerWidth >= 768
                ? "calc(25% - 12px)"
                : "calc(50% - 8px)",
          }}
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
                  <h3 className="mt-2 text-sm font-semibold line-clamp-1">{item.name}</h3>
                  {item.subcategory && (
                    <p className="text-xs text-gray-500 mt-0.5 capitalize">{item.subcategory}</p>
                  )}
                  <p className="text-sm font-semibold text-black">₹{item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const container = scrollRef.current;
              if (!container) return;
            
              const itemsPerPage = getItemsPerPage();
            
              container.scrollTo({
                left: i * container.offsetWidth,
                behavior: "smooth",
              });
            
              setCurrentPage(i);
            }}
            className={`transition-all duration-300 rounded-full ${
              currentPage === i
                ? "w-5 h-1.5 bg-black"
                : "w-1.5 h-1.5 bg-gray-400"
            }`}
          />
        ))}
      </div>

    </section>
  );
}