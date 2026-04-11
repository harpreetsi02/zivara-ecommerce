"use client";

import { useEffect, useState } from "react";
import { getWishlist, toggleWishlist } from "@/utils/wishlist";

export default function WishlistPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getWishlist());
  }, []);

  const handleRemove = (item) => {
    const updated = toggleWishlist(item);
    setList(updated);
  };

  return (
    <div className="p-4 mt-16">

      <h1 className="text-xl font-semibold mb-4">
        Your Wishlist
      </h1>

      {list.length === 0 ? (
        <p className="text-gray-500">No items in wishlist</p>
      ) : (
        <div className="space-y-4">

          {list.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center border-b pb-3"
            >
              <img
                src={item.image}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="text-sm font-medium">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {item.price}
                </p>
              </div>

              <button
                onClick={() => handleRemove(item)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}