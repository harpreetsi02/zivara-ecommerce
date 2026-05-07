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

  const totalPages = Math.ceil(
    products.length / getItemsPerPage()
  );

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return;

    const itemsPerPage = getItemsPerPage();

    const cardWidth = container.offsetWidth / itemsPerPage;

    container.scrollBy({
      left:
        dir === "left"
          ? -(cardWidth * itemsPerPage)
          : cardWidth * itemsPerPage,
      behavior: "smooth",
    });
    setCurrentPage((prev) => {
      if (dir === "left") {
        return prev === 0 ? 0 : prev - 1;
      }
      return prev === totalPages - 1
        ? prev
        : prev + 1;
    });
  };

  return (
    <section className="py-5 px-2.5 md:px-5 overflow-hidden">
      {/* HEADING */}
      <div className="text-center">
        <h2
          className={`${lemonMilk.className} flex items-center justify-center text-black tracking-wide`}
        >
          <span className="text-5xl md:text-7xl leading-none">N</span>
          <span className="text-xl md:text-4xl">ew Arrivals</span>
        </h2>
        <p className="mt-5 text-xs md:text-sm text-center uppercase tracking-[0.25em] text-gray-400">
          Just Dropped — Fresh Picks This Week
        </p>
      </div>

      {/* TOP ACTIONS */}
      {!loading && (
        <div className="flex items-center justify-between mb-6">
          {/* Arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <i className="ri-arrow-left-line text-lg"></i>
            </button>

            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <i className="ri-arrow-right-line text-lg"></i>
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="flex gap-5 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="min-w-[calc(50%-10px)] md:min-w-[calc(25%-15px)]"
            >
              <div className="w-full h-80 md:h-130 lg:h-155 rounded-xl bg-gray-100 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded-full mt-4 w-2/3 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded-full mt-2 w-1/3 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="grid grid-flow-col auto-rows-fr gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3"
          style={{ gridAutoColumns: typeof window !== "undefined" && window.innerWidth >= 768
            ? "calc(25% - 15px)"
            : "calc(50% - 10px)",
          }}
        >
          {products.map((item, index) => (
            <div
              key={item.id}
              className="snap-start group"
            >
              <Link href={`/product/${item.id}`}>
                <div className="relative overflow-hidden rounded-xl bg-[#f8f8f8]">
                  {/* IMAGE */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-80 md:h-130 lg:h-155 object-cover transition-all duration-700 group-hover:scale-[1.05]"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/5 to-transparent"></div>

                    {/* Floating Tag */}
                    <div className="absolute top-4 left-4">
                      {item.stock <= 5 && item.stock > 0 ? (
                        <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em]">
                          Only {item.stock} Left
                        </div>
                      ) : item.stock === 0 ? (
                        <div className="bg-black text-white px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em]">
                          Sold Out
                        </div>
                      ) : (
                        <div className="bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
                          <p className="text-white text-[10px] uppercase tracking-[0.25em]">
                            New Drop
                          </p>
                        </div>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="absolute bottom-0 left-0 w-full p-5 md:p-6">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <h3 className="text-white text-lg md:text-2xl font-light leading-tight line-clamp-1">
                            {item.name}
                          </h3>

                          {item.subcategory && (
                            <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-[0.25em] mt-2">
                              {item.subcategory}
                            </p>
                          )}

                          <p className="text-white text-sm md:text-lg mt-4">
                            ₹{item.price}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div
                          className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        >
                          <i className="ri-arrow-right-up-line text-xl"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* DOTS */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: totalPages }).map(
          (_, i) => (
            <button
              key={i}
              onClick={() => {
                const container = scrollRef.current;
                if (!container) return;
                container.scrollTo({
                  left: i * container.offsetWidth,
                  behavior: "smooth",
                });
                setCurrentPage(i);
              }}
              className={`transition-all duration-500 rounded-full ${
                currentPage === i
                  ? "w-10 h-1.5 bg-black"
                  : "w-2 h-2 bg-gray-300"
              }`}
            />
          )
        )}
      </div>
    </section>
  );
}