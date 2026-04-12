"use client";

import { lemonMilk } from "@/app/fonts";
import ProductCard from "../product/ProductCard";
import { products } from "@/utils/data";
import { useRef } from "react";

const newArrivals = products.slice(0, 30);

const NewArrival = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 352;
    container.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="px-4 text-black py-6">

      {/* Heading + Arrows */}
      <div className="flex items-center justify-center mb-4">
        <h2 className={`${lemonMilk.className} flex items-center tracking-wider text-lg text-black font-semibold`}>
          <span className="text-4xl">N</span>ew Arrivals
        </h2>

        <div className="gap-2 hidden md:block">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm"
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm"
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </div>

      {/* Scroll Container — exactly 2 cards visible */}
      <div
        ref={scrollRef}
        className="grid grid-rows-1 grid-flow-col gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        style={{ gridAutoColumns: "calc(50% - 8px)" }}
      >
        {newArrivals.map((item) => (
          <div key={item.id} className="snap-start">
            <ProductCard item={item} />
          </div>
        ))}
      </div>

    </section>
  );
};

export default NewArrival;