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

      // Unique categories nikalo with first product image
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
    <section className="px-4 py-6">

      <h2 className={`${lemonMilk.className} flex items-center justify-center text-lg text-black font-semibold mb-4`}>
        <span className="text-4xl">C</span>ATEGORIES
      </h2>

      {loading ? (
        <div className="grid grid-cols-3 gap-3">
          {[...Array(12)].map((_, i) => (
            <div key={i}>
              <div className="w-full h-24 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-2 bg-gray-100 rounded mt-1 w-2/3 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 grid-rows-4 gap-3">
          {categories.map((item) => (
            <Link key={item.slug} href={`/category/${item.slug}`}>
              <div className="cursor-pointer">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-24 rounded-lg object-cover"
                />
                <p className="text-xs mt-1 text-gray-800 font-medium tracking-wide capitalize">
                  {item.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

    </section>
  );
}