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
      // Random category se 8 products lo
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
    }, 3000);
  };

  const goTo = (index) => {
    setCurrent((index + products.length) % products.length);
    startTimer();
  };

  const getCardStyle = (index) => {
    const diff = ((index - current) % products.length + products.length) % products.length;
    const positions = {
      0: { x: 0, y: 0, scale: 1.12, opacity: 1, z: 30, blur: false },
      1: { x: 115, y: 30, scale: 0.88, opacity: 0.55, z: 20, blur: true },
      2: { x: 195, y: 65, scale: 0.7, opacity: 0.2, z: 10, blur: true },
      [products.length - 1]: { x: -115, y: 30, scale: 0.88, opacity: 0.55, z: 20, blur: true },
      [products.length - 2]: { x: -195, y: 65, scale: 0.7, opacity: 0.2, z: 10, blur: true },
    };
    return positions[diff] || { x: 0, y: 100, scale: 0.5, opacity: 0, z: 0, blur: true };
  };

  if (products.length === 0) return null;

  return (
    <section className="py-10 bg-gray-100 text-center overflow-hidden">

      <h2 className={`${lemonMilk.className} text-2xl text-black uppercase font-light tracking-wide`}>
        trending
      </h2>
      <h1 className="text-4xl font-bold text-pink-500 drop-shadow-[0_0_10px_rgba(255,0,150,0.7)] mb-10">
        NOW
      </h1>

      <div className="relative flex justify-center items-center h-70">
        {products.map((item, index) => {
          const { x, y, scale, opacity, z, blur } = getCardStyle(index);
          const isCenter = ((index - current + products.length) % products.length) === 0;

          return (
            <div
              key={item.id}
              onClick={() => !isCenter && goTo(index)}
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
                  className="w-31.25 h-46.25 object-cover rounded-2xl"
                />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="h-8 mt-2">
        <p className="text-black text-sm italic font-medium">
          {products[current]?.name}
        </p>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {products.map((_, i) => (
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