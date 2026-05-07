"use client";

import { lemonMilk } from "@/app/fonts";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";

const items = [
  {
    img: "https://images.unsplash.com/photo-1693987647760-03d7babf5dac?w=500",
    slug: "suits",
    title: "Kurtas & Kurtis",
    big: true,
  },
  {
    img: "https://images.unsplash.com/photo-1711188053977-5d45da407737?w=500",
    slug: "topwear",
    title: "Top Wear",
  },
  {
    img: "https://images.unsplash.com/photo-1659107295515-6a0b2fb785a4?w=500",
    slug: "bags",
    title: "Bags",
    big: true,
  },
  {
    img: "https://images.unsplash.com/photo-1738618807972-97c329ff3ed7?w=500",
    slug: "bottom",
    title: "Bottom Wear",
    big: true,
  },
  {
    img: "https://images.unsplash.com/photo-1664552455995-ac507f7dddad?w=500",
    slug: "shirts",
    title: "Shirts",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1726930176874-96c2dc7c671d?w=500",
    slug: "jacket",
    title: "Jackets",
  },
];

// Animation directions
const directions = [
  { x: -120, y: 0 },
  { x: 0, y: -120 },
  { x: 120, y: 0 },
  { x: -120, y: 0 },
  { x: 0, y: 120 },
  { x: 120, y: 0 },
];

export default function HeroGrid() {

  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const bottomSubRef = useRef(null);
  const gridItemRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("introSeen");
    const delay = seen ? 0.2 : 3.2;

    gsap.set(gridItemRefs.current,{
      opacity: 0,
    });

    gsap.set(
      [
        topTextRef.current,
        bottomTextRef.current,
        bottomSubRef.current,
      ],
      {
        opacity: 0,
        y: -30,
      }
    );

    gridItemRefs.current.forEach(
      (el, i) => {
        if (!el) return;
        gsap.set(el, {
          x: directions[i].x,
          y: directions[i].y,
          opacity: 0,
        });
      });

    const tl = gsap.timeline({ delay });

    // TOP TEXT
    tl.to(topTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      // GRID
      .to(
        gridItemRefs.current,
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.18,
          ease: "power4.out",
        },"-=0.2")
      // BOTTOM TEXT
      .to(
        [
          bottomTextRef.current,
          bottomSubRef.current,
        ],
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },"-=1.8");
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-6 md:pt-10"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-md md:w-160 h-112 md:h-160 bg-pink-500/10 blur-3xl rounded-full"></div>

      {/* WRAPPER */}
      <div
        className="relative rounded-4xl md:rounded-[3rem] overflow-hidden border border-gray-100 shadow-[0_20px_80px_rgba(0,0,0,0.06)]"
      >
        {/* TOP BAR */}
        <div
          className="relative overflow-hidden bg-black text-white py-4 md:py-6 px-4"
        >
          {/* TOP GLOW */}
          <div className="absolute inset-0 bg-linear-to-r from-pink-500/20 via-transparent to-pink-500/20"></div>

          <h2
            ref={topTextRef}
            className={`${lemonMilk.className} relative z-10 flex items-center justify-center uppercase tracking-[0.25em] text-xs md:text-base text-center`}
          >
            <span className="text-3xl md:text-5xl leading-none">M</span>ade for your vibe
          </h2>
        </div>

        {/* GRID */}
        <div
          className="grid grid-cols-3 grid-rows-3 gap-2 md:gap-4 p-3 md:p-5 h-136 md:h-220"
        >
          {items.map(
            (item, index) => (
              <Link
                key={index}
                href={`/category/${item.slug}`}
                ref={(el) => (gridItemRefs.current[index] = el)}
                className={`group relative overflow-hidden rounded-xl md:rounded-4xl ${ item.big ? "row-span-2" : "" }`}
              >
                {/* IMAGE */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />

                {/* OVERLAY */}
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"
                ></div>

                {/* BORDER */}
                <div
                  className="absolute inset-0 border border-white/10 rounded-xl md:rounded-4xl"
                ></div>

                {/* ARROW */}
                <div
                  className="absolute top-2 md:top-4 right-2 md:right-4 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                >
                  <i className="ri-arrow-right-up-line text-lg"></i>
                </div>

                {/* TITLE */}
                <div
                  className="absolute bottom-0 left-0 w-full p-3 md:p-5"
                >
                  <h3
                    className={`${lemonMilk.className} text-white text-xs md:text-lg leading-snug tracking-[0.15em] drop-shadow-xl`}
                  >
                    {item.title}
                  </h3>
                </div>
              </Link>
            )
          )}
        </div>

        {/* BOTTOM BAR */}
        <div
          className="relative overflow-hidden bg-black text-white py-5 md:py-8 px-4 text-center"
        >
          {/* GLOW */}
          <div className="absolute inset-0 bg-linear-to-r from-pink-500/20 via-transparent to-pink-500/20"></div>

          <h2
            ref={bottomTextRef}
            className={`${lemonMilk.className} relative z-10 flex items-center justify-center uppercase tracking-[0.25em] text-sm md:text-2xl`}
          >
            <span className="text-4xl md:text-6xl leading-none">F</span>ree shipping
          </h2>

          <p
            ref={bottomSubRef}
            className="relative z-10 text-white/60 text-xs md:text-sm tracking-[0.25em] uppercase mt-2"
          >
            on orders above ₹1099
          </p>
        </div>
      </div>
    </section>
  );
}