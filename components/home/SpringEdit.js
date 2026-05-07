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
    href: "/category/suits",
    image:
      "https://www.nishorama.com/cdn/shop/files/DSC8812.jpg?format=webp&v=1768831304&width=1200",
    label: "NEW IN: COLLECTIONS",
  },
  {
    title: "Spring Edit",
    subtitle: "Fresh & Floral",
    description: "New Season Arrivals",
    tags: "Dresses | Skirts | Tops | Jewellery",
    href: "/category/topwear",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1746423412_9594146.jpg?w=1200&dpr=1",
    label: "NEW IN: SPRING",
  },
  {
    title: "Night Out",
    subtitle: "Party Ready",
    description: "Look Your Best",
    tags: "Dresses | Heels | Bags | Jewellery",
    href: "/category/bags",
    image:
      "https://azuracloset.com/cdn/shop/files/039A9097-D8BD-4BB3-890F-7473EA6F717A.png?v=1776322023&width=1200",
    label: "NEW IN: PARTY WEAR",
  },
  {
    title: "Street Style",
    subtitle: "Bold & Edgy",
    description: "Own Every Street",
    tags: "Jeans | Jackets | Sneakers | Tops",
    href: "/category/jacket",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1715258248_3167266.jpg?w=1200&dpr=1",
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
    }, 4500);
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
    <section className="py-10 md:py-16 overflow-hidden">
      {/* HEADING */}
      <div className="flex items-center justify-center mb-10">
        <h2
          className={`${lemonMilk.className} flex items-center text-black tracking-wide`}
        >
          <span className="text-5xl md:text-7xl leading-none">C</span>
          <span className="text-xl md:text-4xl">ollections</span>
        </h2>
      </div>

      {/* SLIDER */}
      <div className="relative group overflow-hidden bg-black">
        {/* Slides */}
        {slides.map((slide, i) => (
          <Link key={i} href={slide.href}>
            <div
              className={`transition-all duration-1000 ${
                i === current
                  ? "opacity-100 relative z-10"
                  : "opacity-0 absolute inset-0 z-0 pointer-events-none"
              }`}
            >
              {/* IMAGE */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-125 md:h-175 lg:h-[88vh] object-cover scale-[1.02] group-hover:scale-[1.05] transition-transform duration-2500"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/20"></div>

              {/* TOP LABEL */}
              <div className="absolute top-5 left-5 md:top-8 md:left-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full">
                  <p className="text-white text-[10px] md:text-xs uppercase tracking-[0.3em]">
                    {slide.label}
                  </p>
                </div>
              </div>

              {/* CENTER CONTENT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <h2
                  className="text-white italic font-light text-5xl md:text-7xl lg:text-8xl leading-none"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {slide.title}
                </h2>
                <p className="text-white/70 text-sm md:text-lg uppercase tracking-[0.25em] mt-5">
                  {slide.subtitle}
                </p>
              </div>

              {/* BOTTOM CONTENT */}
              <div className="absolute bottom-6 left-6 md:left-10 md:bottom-10">
                <p className="text-white text-lg md:text-2xl italic font-light">
                  {slide.description}
                </p>
                <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.25em] mt-3">
                  {slide.tags}
                </p>
              </div>

              {/* FLOATING CTA */}
              <div className="absolute bottom-6 right-6 md:right-10 md:bottom-10">
                <div
                  className="w-10 h-10 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110"
                >
                  <i className="ri-arrow-right-up-line text-xl md:text-3xl"></i>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* LEFT ARROW */}
        <button
          onClick={(e) => {
            e.preventDefault();
            goTo((current - 1 + slides.length) % slides.length);
          }}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <i className="ri-arrow-left-s-line text-2xl"></i>
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={(e) => {
            e.preventDefault();
            goTo((current + 1) % slides.length);
          }}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <i className="ri-arrow-right-s-line text-2xl"></i>
        </button>

        {/* DOTS */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                goTo(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current
                  ? "bg-white w-10"
                  : "bg-white/40 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}