"use client";

import { lemonMilk } from "@/app/fonts";
import Link from "next/link";

const HeroGrid = () => {
  const items = [
    {
      img: "https://images.unsplash.com/photo-1693987647760-03d7babf5dac?w=500",
      slug: "suit",
      title: "Suits",
      big: true,
    },
    {
      img: "https://images.unsplash.com/photo-1711188053977-5d45da407737?w=500",
      slug: "tops",
      title: "Tops",
    },
    {
      img: "https://images.unsplash.com/photo-1659107295515-6a0b2fb785a4?w=500",
      slug: "bags",
      title: "bags",
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
      title: "shirts",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1726930176874-96c2dc7c671d?w=500",
      slug: "jacket",
      title: "Jackets",
    },
  ];

  return (
    <div className="img-background flex flex-col h-162.5 md:h-187.5 mt-10 w-screen">
      
      {/* Top */}
      <div className="h-1/5 flex items-center justify-center p-2 bg-black text-center w-full">
        <h2 className={`${lemonMilk.className} uppercase text-sm flex items-center`}>
          <span className="text-3xl">m</span>ade for your vibe
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 grid-rows-3 gap-2 px-4 py-2 h-4/5 w-full">
        {items.map((item, index) => (
          <Link
            key={index}
            href={`/category/${item.slug}`}
            className={`${item.big ? "row-span-2" : ""}`}
          >
            {/* Wrapper */}
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              
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

      {/* Bottom */}
      <div className="h-1/5 flex flex-col py-2 items-center justify-center bg-black text-center w-full">
        <h2 className={`${lemonMilk.className} uppercase flex items-center text-lg tracking-widest`}>
          <span className="text-4xl">f</span>ree shipping
        </h2>
        <h4 className="font-medium text-sm tracking-wide">
          on order above ₹1099
        </h4>
      </div>

    </div>
  );
};

export default HeroGrid;