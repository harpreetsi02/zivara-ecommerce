"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/utils/data";
import Link from "next/link";

export default function SearchComponent() {
  const params = useSearchParams();
  const raw = params.get("q") || "";

  // clean query
  const query = raw.trim().replace(/\s+/g, " ").toLowerCase();

  const filtered = products.filter((item) => {
    const name = item.name.toLowerCase();
    const category = item.category.toLowerCase();

    return name.includes(query) || category.includes(query);
  });

  return (
    <div className="p-4 mt-16">

      <h1 className="text-xl font-semibold mb-1">
        Results for &quot;{raw.trim()}&quot;
      </h1>

      <p className="text-sm text-gray-400 mb-4">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
      </p>

      {filtered.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            No products found for &quot;{raw.trim()}&quot;
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Check spelling ya koi aur word try karo
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((item) => (
            <Link key={item.id} href={`/product/${item.id}`}>
              <div className="cursor-pointer">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <h2 className="text-sm font-medium mt-2">{item.name}</h2>
                <p className="text-sm text-gray-600">₹{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}