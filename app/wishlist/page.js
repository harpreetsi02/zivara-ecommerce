"use client";

import { useEffect, useState } from "react";
import { wishlistAPI, cartAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { lemonMilk } from "../fonts";

export default function WishlistPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    fetchWishlist();
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const data = await wishlistAPI.getWishlist();
      setList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await wishlistAPI.toggle(productId);
      setList((prev) => prev.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMoveToCart = async (item) => {
    try {
      await cartAPI.addToCart({
        productId: item.productId,
        quantity: 1,
        size: null,
      });
      await wishlistAPI.toggle(item.productId);
      setList((prev) => prev.filter((i) => i.productId !== item.productId));
      router.push("/cart");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="mt-16 flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm">Loading wishlist...</p>
    </div>
  );

  return (
    <div className="mt-16 min-h-screen bg-white">

      <div className="text-center py-4 border-b border-gray-100">
        <h1 className={`${lemonMilk.className} text-base flex items-center justify-center text-black font-semibold tracking-widest uppercase`}><span className="text-4xl">w</span>ishlist</h1>
        <p className="text-xs text-gray-400 mt-0.5">{list.length} Items</p>
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

              <button
                onClick={() => handleRemove(item.productId)}
                className="absolute top-2 right-2 z-10 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
              >
                <i className="ri-close-line text-sm text-gray-600"></i>
              </button>

              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-52 object-cover cursor-pointer"
                onClick={() => router.push(`/product/${item.productId}`)}
              />

              <div className="px-2 pt-2 pb-3">
                <h2 className="text-xs text-gray-600 font-semibold line-clamp-2 leading-snug">
                  {item.productName}
                </h2>
                <p className="text-xs text-gray-400 capitalize mt-0.5">
                  {item.category}
                </p>
                <p className="text-sm font-semibold text-black mt-1">
                  ₹{item.productPrice}
                </p>
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