"use client";

import { lemonMilk } from "@/app/fonts";
import { useEffect, useRef, useState } from "react";
import { productAPI } from "@/utils/api";
import Link from "next/link";

export default function Trending() {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [products]);

  const fetchTrending = async () => {
    try {
      const data = await productAPI.getByCategory("dresses");
      setProducts(data.slice(0, 8));
    } catch (err) {
      console.error(err);
    }
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3500);
  };

  const goTo = (index) => {
    setCurrent((index + products.length) % products.length);
    startTimer();
  };

  const getCardStyle = (index) => {
    const diff =  ((index - current) % products.length + products.length) % products.length;
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    const positions = isDesktop
      ? {
          0: { x: 0, y: 0, scale: 1.18, opacity: 1, z: 40, blur: false, rotate: 0,},
          1: { x: 260, y: 20, scale: 0.9, opacity: 0.55, z: 20, blur: true, rotate: 6,},
          2: { x: 430, y: 50, scale: 0.72, opacity: 0.15, z: 10, blur: true, rotate: 10, },
          [products.length - 1]: { x: -260, y: 20, scale: 0.9, opacity: 0.55, z: 20, blur: true, rotate: -6, },
          [products.length - 2]: { x: -430, y: 50, scale: 0.72, opacity: 0.15, z: 10, blur: true, rotate: -10, },
        }
      : {
          0: { x: 0, y: 0, scale: 1.08, opacity: 1, z: 40, blur: false, rotate: 0, },
          1: { x: 120, y: 25, scale: 0.84, opacity: 0.45, z: 20, blur: true, rotate: 6, },
          2: { x: 200, y: 60, scale: 0.65, opacity: 0.1, z: 10, blur: true, rotate: 10, },
          [products.length - 1]: { x: -120, y: 25, scale: 0.84, opacity: 0.45, z: 20, blur: true, rotate: -6, },
          [products.length - 2]: { x: -200, y: 60, scale: 0.65, opacity: 0.1, z: 10, blur: true, rotate: -10, },
        };
    return (
      positions[diff] || { x: 0, y: 100, scale: 0.5, opacity: 0, z: 0, blur: true, rotate: 0, }
    );
  };
  if (products.length === 0) return null;

  return (
    <section className="py-5 overflow-hidden">
      {/* HEADING */}
      <div className="text-center">

        <h2
          className={`${lemonMilk.className} uppercase tracking-wide text-black flex items-center justify-center`}
        >
          <span className="text-4xl">
            trending
          </span>
        </h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-pink-500 drop-shadow-[0_0_10px_rgba(255,0,150,0.7)] tracking-tight leading-none mt-3">
          NOW
        </h1>
        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500">
          Most Loved Pieces This Week
        </p>
      </div>

      {/* CAROUSEL */}
      <div className="relative flex justify-center items-center h-105 md:h-150 lg:h-190">
        {/* Glow Background */}
        <div className="absolute w-70 h-70 md:w-125 md:h-125 bg-pink-100 rounded-full blur-3xl opacity-40"></div>
        {products.map((item, index) => {
          const { x, y, scale, opacity, z, blur, rotate, } = getCardStyle(index);
          const isCenter =
            ((index - current + products.length) % products.length) === 0;
          return (
            <div
              key={item.id}
              onClick={() => !isCenter && goTo(index)}
              style={{ position: "absolute", transform: `translateX(${x}px) translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`,
                opacity, zIndex: z, 
                transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                filter: blur ? "blur(1px)" : "none",
                cursor: isCenter ? "default" : "pointer",
              }}
            >
              <Link
                href={isCenter ? `/product/${item.id}` : "#"}
                onClick={(e) => !isCenter && e.preventDefault()}
                className="group block"
              >
                {/* CARD */}
                <div className="relative overflow-hidden 4xl shadow-2xl">
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className=" w-55 h-80 md:w-80 md:h-115 lg:w-95 lg:h-140 object-cover transition-transform duration-700 group-hover:scale-[1.04] rounded-t-2xl"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"></div>

                  {/* TOP TAG */}
                  <div className="absolute top-5 left-5">
                    <div className="bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
                      <p className="text-black md:text-white font-semibold text-[10px] uppercase tracking-[0.15em]">
                        Trending
                      </p>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 w-full p-5 md:p-7">
                    <h3 className="text-white text-xl md:text-3xl font-light leading-tight">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-white/70 text-xs md:text-sm uppercase tracking-[0.25em]">
                        ₹ {item.price}
                      </p>

                      <div
                        className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      >
                        <i className="ri-arrow-right-up-line text-xl"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* PRODUCT NAME */}
      <div className="text-center mt-10 h-16">
        <p className="text-black text-xl md:text-3xl italic font-light">
          {products[current]?.name}
        </p>
        <p className="text-gray-500 uppercase tracking-[0.25em] text-xs md:text-sm mt-2">
          Tap To Explore
        </p>
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-2 mt-8">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current
                ? "bg-pink-500 w-10"
                : "bg-gray-300 w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}