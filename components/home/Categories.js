"use client";

import { lemonMilk } from "@/app/fonts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { productAPI } from "@/utils/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const products = await productAPI.getAll();

      // Unique categories
      const categoryMap = {};

      products.forEach((p) => {
        if (!categoryMap[p.category]) {
          categoryMap[p.category] = p.image;
        }
      });

      const cats = Object.entries(categoryMap)
        .map(([slug, image]) => ({
          slug,
          name: slug.charAt(0).toUpperCase() + slug.slice(1),
          image,
        }))
        .slice(0, 12);
      setCategories(cats);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 px-2.5 md:px-10 overflow-hidden">
      {/* HEADING */}
      <div className="flex items-center justify-center mb-12">
        <h2
          className={`${lemonMilk.className} flex items-center text-black tracking-wide`}
        >
          <span className="text-5xl md:text-7xl leading-none">C</span>
          <span className="text-xl md:text-4xl">ATEGORIES</span>
        </h2>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse"
            >
              <div className="w-full h-60 md:h-105 bg-gray-100 rounded-4xl" />
              <div className="h-3  bg-gray-100 rounded-full mt-4 w-2/3 mx-auto" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((item, index) => (
            <Link
              key={item.slug}
              href={`/category/${item.slug}`}
              className={` group relative overflow-hidden rounded-2xl bg-[#f8f8f8]`}
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className=" w-full h-65 md:h-105 lg:h-130 object-cover transition-all duration-700 group-hover:scale-[1.05]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent opacity-90"></div>

                {/* Floating Number */}
                <div className="absolute top-5 left-5">
                  <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center">
                    <p className="text-xs font-medium text-black">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="absolute bottom-0 left-0 w-full p-5 md:p-7">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h3 className="text-white text-2xl md:text-4xl font-light tracking-tight leading-none">
                        {item.name}
                      </h3>
                      <p className="text-white/70 text-xs md:text-sm uppercase tracking-[0.25em] mt-3">
                        Explore Collection
                      </p>
                    </div>

                    {/* Arrow */}
                    <div
                      className="w-12 h-12rounded-fullbg-white/15backdrop-blur-mdflex items-center justify-centertext-whitetransition-allduration-300group-hover:translate-x-1group-hover:-translate-y-1"
                    >
                      <i className="ri-arrow-right-up-line text-xl"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}