"use client";

import { lemonMilk } from "@/app/fonts";
import { products } from "@/utils/data";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const trending = products.slice(50, 58);
const total = trending.length;

export default function Trending() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (index) => {
    setCurrent((index + total) % total);
    startTimer();
  };

  // Circular position — angle calculate karo
  const getCardStyle = (index) => {
    const diff = ((index - current) % total + total) % total;
    
    const positions = {
      0: { x: 0,      y: 0,   scale: 1.12, opacity: 1,    z: 30, blur: false },
      1: { x: 170,    y: 0,  scale: 0.88, opacity: 0.55, z: 20, blur: true  },
      2: { x: 220,    y: 15,  scale: 0.7,  opacity: 0.2,  z: 10, blur: true  },
      [total-1]: { x: -170, y: 0,  scale: 0.88, opacity: 0.55, z: 20, blur: true  },
      [total-2]: { x: -220, y: 15,  scale: 0.7,  opacity: 0.2,  z: 10, blur: true  },
    };

    return positions[diff] || { x: 0, y: 100, scale: 0.5, opacity: 0, z: 0, blur: true };
  };

  return (
    <section className="py-10 text-center overflow-hidden">

      {/* Heading */}
      <h2 className={`${lemonMilk.className} text-2xl text-black uppercase font-light tracking-wide`}>
        trending
      </h2>
      <h1 className="text-4xl font-bold text-pink-500 drop-shadow-[0_0_10px_rgba(255,0,150,0.7)] mb-10">
        NOW
      </h1>

      {/* Circular Carousel */}
      <div className="relative flex justify-center items-center h-70">
        {trending.map((item, index) => {
          const { x, y, scale, opacity, z, blur } = getCardStyle(index);
          const isCenter = ((index - current + total) % total) === 0;

          return (
            <div
              key={item.id}
              onClick={() => isCenter ? null : goTo(index)}
              style={{
                position: "absolute",
                transform: `translateX(${x}px) translateY(${y}px) scale(${scale})`,
                opacity,
                zIndex: z,
                transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                filter: blur ? "blur(0.8px)" : "none",
                cursor: isCenter ? "default" : "pointer",
              }}
            >
              <Link
                href={isCenter ? `/product/${item.id}` : "#"}
                onClick={(e) => !isCenter && e.preventDefault()}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-60 object-cover rounded-2xl shadow-md"
                />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Center item name */}
      <div className="h-8 mt-2">
        <p className="text-black text-sm italic font-medium transition-all duration-300">
          {trending[current].name}
        </p>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {trending.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-pink-500 w-5" : "bg-gray-300 w-2"
            }`}
          />
        ))}
      </div>

    </section>
  );
}