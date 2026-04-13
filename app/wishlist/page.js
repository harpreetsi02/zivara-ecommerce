"use client";

import { useEffect, useState } from "react";
import { getWishlist, toggleWishlist } from "@/utils/wishlist";
import { addToCart } from "@/utils/cart";
import { useRouter } from "next/navigation";
import { lemonMilk } from "../fonts";

export default function WishlistPage() {
  const [list, setList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setList(getWishlist());
  }, []);

  const handleRemove = (item) => {
    const updated = toggleWishlist(item);
    setList(updated);
  };

  const handleMoveToCart = (item) => {
    addToCart(item);
    const updated = toggleWishlist(item);
    setList(updated);
    window.dispatchEvent(new Event("storage"));
    router.push("/cart");
  };

  return (
    <div className="mt-16 min-h-screen z-20 text-gray-600">

      {/* Header */}
      <div className="text-center py-4 border-b pb-5 border-gray-100">
        <h1 className={`${lemonMilk.className} text-base flex items-center justify-center font-bold tracking-widest uppercase`}><span className="text-4xl">w</span>ishlist</h1>
        <p className="text-xs text-gray-500 mt-0.5">{list.length} Items</p>
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 px-8 text-center">
          <i className="ri-heart-line text-5xl text-gray-200 mb-4"></i>
          <p className="text-gray-500 text-sm">Your wishlist is empty</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-2 bg-black text-white text-sm rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-0">
          {list.map((item) => (
            <div key={item.id} className="relative border-b border-r border-gray-100">

              {/* Remove X */}
              <button
                onClick={() => handleRemove(item)}
                className="absolute top-2 right-2 z-10 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
              >
                <i className="ri-close-line text-sm text-gray-600"></i>
              </button>

              {/* Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-cover"
                />
              </div>

              {/* Info */}
              <div className="px-2 pt-2 pb-3">
                <h2 className="text-xs font-medium line-clamp-2 leading-snug">{item.name}</h2>
                <p className="text-xs text-gray-400 capitalize mt-0.5">{item.category}</p>

                <p className="text-sm font-semibold text-black mt-1">₹{item.price}</p>

                {/* Move to Cart */}
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="mt-2 w-full border border-gray-800 text-gray-800 text-xs font-semibold py-2 rounded tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  MOVE TO CART
                </button>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}