"use client";

import { useState, useEffect, useRef } from "react";
import { lemonMilk } from "@/app/fonts";
import Link from "next/link";

const slides = [
  {
    title: "Self Care Edit",
    subtitle: "By Zivara",
    description: "Explore the Collection",
    tags: "Loungewear | Kurtas | Co-ords | Tops",
    href: "/category/co-ords",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    label: "NEW IN: COLLECTIONS",
  },
  {
    title: "Spring Edit",
    subtitle: "Fresh & Floral",
    description: "New Season Arrivals",
    tags: "Dresses | Skirts | Tops | Jewellery",
    href: "/category/dresses",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
    label: "NEW IN: SPRING",
  },
  {
    title: "Night Out",
    subtitle: "Party Ready",
    description: "Look Your Best",
    tags: "Dresses | Heels | Bags | Jewellery",
    href: "/category/dresses",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
    label: "NEW IN: PARTY WEAR",
  },
  {
    title: "Street Style",
    subtitle: "Bold & Edgy",
    description: "Own Every Street",
    tags: "Jeans | Jackets | Sneakers | Tops",
    href: "/category/jeans",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800",
    label: "NEW IN: STREET",
  },
];

export default function SpringEdit() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => {
    setCurrent(i);
    startTimer();
  };

  return (
    <section className="py-10">
      <h2 className={`${lemonMilk.className} text-black p-4 tracking-wider flex items-center justify-center uppercase`}><span className="text-5xl -translate-y-px translate-x-1.5">c</span><span className="text-2xl">o</span>llections</h2>
      <div className="relative overflow-hidden">

        {/* Slides */}
        {slides.map((slide, i) => (
          <Link key={i} href={slide.href}>
            <div
              className={`transition-opacity duration-700 ${
                i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0"
              }`}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-80 object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/35" />

              {/* TOP label */}
              <div className="absolute top-4 left-4">
                <p className="text-white text-xs font-semibold tracking-widest uppercase opacity-80">
                  {slide.label}
                </p>
              </div>

              {/* CENTER text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <h2
                  className="text-white font-light italic text-3xl leading-tight"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {slide.title}
                </h2>
                <p className="text-white/80 text-sm mt-1 tracking-wide">
                  {slide.subtitle}
                </p>
              </div>

              {/* BOTTOM text */}
              <div className="absolute bottom-10 left-4">
                <p className="text-white text-sm font-light italic mb-1">
                  {slide.description}
                </p>
                <p className="text-white/70 text-xs tracking-wide">
                  {slide.tags}
                </p>
              </div>
            </div>
          </Link>
        ))}

        {/* LEFT ARROW */}
        <button
          onClick={(e) => { e.preventDefault(); goTo((current - 1 + slides.length) % slides.length); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>
              
        {/* RIGHT ARROW */}
        <button
          onClick={(e) => { e.preventDefault(); goTo((current + 1) % slides.length); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-0 w-full flex justify-center gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); goTo(i); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-white w-5" : "bg-white/40 w-1.5"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}