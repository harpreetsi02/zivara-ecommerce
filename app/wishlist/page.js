"use client";

import { useEffect, useState } from "react";
import { wishlistAPI, cartAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { lemonMilk } from "../fonts";
import Link from "next/link";

export default function WishlistPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
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
      setList((prev) =>
        prev.filter(
          (item) =>
            item.productId !== productId
        )
      );
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

      await wishlistAPI.toggle(
        item.productId
      );

      setList((prev) =>
        prev.filter((i) => i.productId !== item.productId)
      );
      router.push("/cart");
    } catch (err) {
      console.error(err);
    }
  };

  // LOADING
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 text-sm uppercase tracking-[0.25em] mt-5">
            Loading Wishlist
          </p>
        </div>
      </div>
    );

  return (
    <section className="min-h-screen relative z-20 pt-24 pb-20 overflow-hidden">
      {/* HEADING */}
      <div className="text-center mb-12 px-4">
        <h1
          className={`${lemonMilk.className} flex items-center justify-center text-black tracking-wide`}
        >
          <span className="text-5xl md:text-7xl leading-none">W</span>
          <span className="text-xl md:text-4xl">ishlist</span>
        </h1>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          {list.length} Saved Pieces
        </p>
      </div>

      {/* EMPTY */}
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-28 px-6">
          {/* Icon */}
          <div className="w-28 h-28 rounded-full bg-[#f8f8f8] flex items-center justify-center">
            <i className="ri-heart-3-line text-5xl text-gray-300"></i>
          </div>

          <h2 className="text-3xl md:text-5xl font-light text-black mt-10">
            Your wishlist is empty
          </h2>

          <p className="text-gray-400 text-sm md:text-base mt-5 max-w-md leading-7">
            Save your favorite styles and keep track of pieces you love the most.
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-10 bg-black text-white px-10 py-4 rounded-full text-sm uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-6"
        >
          {list.map((item, index) => (
            <Link
              key={item.id}
              href={`/product/${item.productId}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl bg-[#f8f8f8]">
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-70 md:h-105 lg:h-130 object-cover cursor-pointer transition-all duration-700 group-hover:scale-[1.05]"
                    onClick={() => router.push(`/product/${item.productId}`)}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent"></div>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="absolute top-4 right-4 w-8 h-8 md:w-11 md:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <i className="ri-close-line text-lg"></i>
                  </button>

                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4">
                    <div className="hidden md:block bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
                      <p className="text-white text-[10px] uppercase tracking-[0.25em]">
                        Saved Item
                      </p>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 w-full p-5 md:p-6">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h2 className="text-white text-lg md:text-2xl font-light leading-tight line-clamp-1">
                          {item.productName}
                        </h2>

                        <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-[0.25em] mt-2">
                          {item.category}
                        </p>

                        <p className="text-white text-sm md:text-lg mt-4">
                          ₹{item.productPrice}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div
                        className="w-6 h-6 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      >
                        <i className="ri-arrow-right-up-line text-lg md:text-xl"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => handleMoveToCart(item)}
                className="mt-4 w-full bg-black text-white py-4 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300"
              >
                Move To Cart
              </button>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}