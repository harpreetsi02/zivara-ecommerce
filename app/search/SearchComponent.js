"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { productAPI } from "@/utils/api";
import Link from "next/link";

export default function SearchComponent() {
  const params = useSearchParams();
  const query = params.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) fetchResults();
  }, [query]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const data = await productAPI.search(query);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="mt-16 flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm">Searching...</p>
    </div>
  );

  return (
    <div className="p-4 mt-16">

      <h1 className="text-xl font-semibold mb-1">
        Results for &quot;{query}&quot;
      </h1>
      <p className="text-sm text-gray-400 mb-4">
        {products.length} product{products.length !== 1 ? "s" : ""} found
      </p>

      {products.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-gray-400 text-sm">No products found</p>
          <p className="text-gray-300 text-xs mt-1">Try a different keyword</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map((item) => (
            <Link key={item.id} href={`/product/${item.id}`}>
              <div className="cursor-pointer">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <h2 className="text-sm font-medium mt-2 line-clamp-1">{item.name}</h2>
                <p className="text-xs text-gray-400 capitalize mt-0.5">{item.category}</p>
                <p className="text-sm font-semibold mt-1">₹{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}