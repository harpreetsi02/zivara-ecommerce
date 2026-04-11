"use client";

import { useParams } from "next/navigation";
import { products } from "@/utils/data";

export default function CategoryPage() {
  const { slug } = useParams();

  const filtered = products.filter(
    (item) => item.category === slug
  );

  return (
    <div className="p-4 mt-16">

      <h1 className="text-xl font-semibold capitalize mb-4">
        {slug}
      </h1>

      {filtered.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">

          {filtered.map((item) => (
            <div key={item.id}>
              <img
                src={item.image}
                className="w-full h-50 object-cover rounded-lg"
              />
              <h2 className="text-sm mt-2">{item.name}</h2>
              <p className="text-sm text-gray-600">
                {item.price}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}