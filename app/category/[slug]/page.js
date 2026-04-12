"use client";

import { useParams } from "next/navigation";
import { products } from "@/utils/data";
import Link from "next/link";
import { lemonMilk } from "@/app/fonts";

export default function CategoryPage() {
  const { slug } = useParams();

  const filtered = products.filter(
    (item) => item.category === slug
  );

  return (
    <div className="p-4 text-gray-600 mt-16">

      <h1 className={`${lemonMilk.className} text-black text-center text-xl font-semibold capitalize mb-4`}>
        {slug}
      </h1>

      {filtered.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {filtered.map((item) => (
            <Link key={item.id} href={`/product/${item.id}`}>
              <div className="cursor-pointer">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded-sm"
                />
                <h2 className="text-sm font-medium mt-2 line-clamp-1">{item.name}</h2>
                <p className="text-xs text-gray-400 capitalize mt-0.5">{item.category}</p>
                <p className="text-sm font-semibold text-black mt-1">₹{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}