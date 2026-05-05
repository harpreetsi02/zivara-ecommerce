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


// Har item kahan se aayega
const directions = [
  { x: -100, y: 0 },   // 1 — left se
  { x: 0, y: -100 },   // 2 — top se
  { x: 100, y: 0 },    // 3 — right se
  { x: -100, y: 0 },   // 4 — left se
  { x: 0, y: 100 },    // 5 — bottom se
  { x: 100, y: 0 },    // 6 — right se
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

    // Initial state — sab hidden
    gsap.set(gridItemRefs.current, { opacity: 0, x: 0, y: 0 });
    gsap.set([topTextRef.current, bottomTextRef.current, bottomSubRef.current], {
      opacity: 0,
      y: -30,
    });

    // Direction set karo
    gridItemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        x: directions[i].x,
        y: directions[i].y,
        opacity: 0,
      });
    });

    const tl = gsap.timeline({ delay });

    // Top text slide down
    tl.to(topTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    // Grid items ek ek karke
    .to(gridItemRefs.current, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
    }, "-=0.2")

    // Bottom text
    .to([bottomTextRef.current, bottomSubRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=2");

  }, []);

  return (
    <div ref={sectionRef} className="img-background flex flex-col h-162.5 md:h-187.5 mt-10 w-screen">

      {/* TOP TEXT */}
      <div className="heading-top h-1/5 flex items-center justify-center p-2 bg-black text-center w-full">
        <h2
          ref={topTextRef}
          className={`${lemonMilk.className} top-text uppercase text-sm flex items-center text-white`}
        >
          <span className="text-3xl">m</span>ade for your vibe
        </h2>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 grid-rows-3 gap-2 px-4 py-2 h-4/5 w-full">
        {items.map((item, index) => (
          <Link
            key={index}
            href={`/category/${item.slug}`}
            className={`${item.big ? "row-span-2" : ""}`}
            ref={(el) => (gridItemRefs.current[index] = el)}
          >
            {/* Wrapper */}
            <div className="relative border-amber-500/30 border-2 w-full h-full overflow-hidden rounded-xl">
              
              {/* Image */}
               <img
                 src={item.img}
                 className="w-full h-full object-cover"
               />

              {/* Overlay (bottom text) */}
               <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/70 to-transparent p-2">
                 <h3 className={`${lemonMilk.className} text-white text-center text-sm font-semibold tracking-wide`}>
                   {item.title}
                 </h3>
               </div>

             </div>
          </Link>
        ))}
      </div>

      {/* BOTTOM TEXT */}
      <div className="heading-bottom h-1/5 flex flex-col py-2 items-center justify-center bg-black text-center w-full">
        <h2
          ref={bottomTextRef}
          className={`${lemonMilk.className} bottom-l line-clamp-2 uppercase text-lg flex items-center tracking-widest text-white`}
        >
          <span className="text-4xl">f</span>ree shipping
        </h2>
        <h4
          ref={bottomSubRef}
          className="bottom-r font-medium text-sm tracking-wide text-white"
        >
          on order above &#x20B9;1099
        </h4>
      </div>

    </div>
  );
}