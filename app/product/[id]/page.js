"use client";

import { addToCart } from "@/utils/cart";
import { toggleWishlist, getWishlist } from "@/utils/wishlist";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { products } from "@/utils/data";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductPage() {
  const { id } = useParams();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [liked, setLiked] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const product = products.find((p) => p.id === parseInt(id)) || {
    id,
    name: "Stylish Product",
    price: 999,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    description: "A beautiful and stylish outfit perfect for any occasion.",
    category: "dresses",
  };

  // description category se generate karo agar nahi hai
  const description = product.description ||
    `A stunning ${product.name.toLowerCase()} from our ${product.category} collection. Perfect for any occasion, crafted with premium quality material.`;

  useEffect(() => {
    const list = getWishlist();
    setLiked(!!list.find((p) => p.id === product.id));
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart({ ...product, size: selectedSize });
    setAdded(true);
    setSizeError(false);
    // storage event trigger karo taaki navbar update ho
    window.dispatchEvent(new Event("storage"));
  };

  const handleWishlist = () => {
    const updated = toggleWishlist(product);
    setLiked(!!updated.find((p) => p.id === product.id));
  };

  return (
    <div className="mt-16 pb-32 text-black">

      {/* PRODUCT IMAGE */}
      <div className="relative w-full h-105 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Category badge */}
        <div className="absolute bottom-4 left-4 bg-black text-white text-xs px-3 py-1 uppercase tracking-widest rounded-sm">
          {product.category}
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="px-4 pt-5">

        {/* Name + Wishlist */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold leading-snug">{product.name}</h1>
            <p className="text-xs text-gray-400 mt-0.5 capitalize">{product.category}</p>
          </div>

          <button
            onClick={handleWishlist}
            className="shrink-0 mt-1"
          >
            <i className={`${liked ? "ri-heart-fill text-red-500" : "ri-heart-line text-gray-400"} text-2xl`}></i>
          </button>
        </div>

        {/* Price */}
        <p className="text-xl font-semibold mt-3">₹ {product.price}</p>
        <p className="text-xs text-gray-400">Price incl. of all taxes</p>

        {/* Description */}
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* SIZE SELECT */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">
              Please select a size.
            </p>
            <p className="text-xs text-blue-500 underline cursor-pointer">SIZE CHART</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => { setSelectedSize(size); setSizeError(false); }}
                className={`border rounded px-3 py-1.5 text-sm transition-all ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {sizeError && (
            <p className="text-red-500 text-xs mt-2">Please select a size first!</p>
          )}
        </div>

      </div>

      {/* BOTTOM BUTTONS — fixed */}
      <div className="fixed bottom-0 left-0 w-full flex gap-3 px-4 py-3 bg-white border-t border-gray-100 z-40">

        <button
          onClick={handleWishlist}
          className="flex items-center text-gray-600 font-semibold justify-center gap-2 border border-gray-300 rounded-lg py-3 px-4 text-sm w-2/5"
        >
          <i className={`${liked ? "ri-heart-fill text-red-500" : "ri-heart-line"} text-lg`}></i>
          WISHLIST
        </button>

        <button
          onClick={handleAddToCart}
          className={`flex-1 py-3 rounded-lg font-semibold text-white text-sm transition-all ${
            added ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {added ? "ADDED ✓" : "ADD TO CART"}
        </button>

      </div>

    </div>
  );
}