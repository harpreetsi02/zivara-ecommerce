"use client";

import { addToCart } from "@/utils/cart";
import { toggleWishlist, getWishlist } from "@/utils/wishlist";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { products } from "@/utils/data";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductPage() {
  const { id } = useParams();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [liked, setLiked] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const touchStartX = useRef(null);

  const product = products.find((p) => p.id === parseInt(id)) || {
    id,
    name: "Stylish Product",
    price: 999,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    category: "dresses",
  };

  const images = product.images || [product.image];

  const description = product.description ||
    `A stunning ${product.name.toLowerCase()} from our ${product.category} collection. Perfect for any occasion, crafted with premium quality material.`;

  useEffect(() => {
    const list = getWishlist();
    setLiked(!!list.find((p) => p.id === product.id));
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    addToCart({ ...product, size: selectedSize });
    setAdded(true);
    setSizeError(false);
    window.dispatchEvent(new Event("storage"));
  };

  const handleWishlist = () => {
    const updated = toggleWishlist(product);
    setLiked(!!updated.find((p) => p.id === product.id));
  };

  // Swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) setActiveImg((prev) => (prev + 1) % images.length);
    if (diff < -50) setActiveImg((prev) => (prev - 1 + images.length) % images.length);
    touchStartX.current = null;
  };

  return (
    <div className="mt-16 text-black pb-32">

      {/* IMAGE SLIDER */}
      <div
        className="relative w-full h-105 bg-gray-100 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Images */}
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${product.name} ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              i === activeImg ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Category badge */}
        <div className="absolute bottom-4 left-4 bg-black text-white text-xs px-3 py-1 uppercase tracking-widest rounded-sm z-10">
          {product.category}
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeImg ? "bg-white w-5" : "bg-white/50 w-1.5"
              }`}
            />
          ))}
        </div>

        {/* Left / Right arrows */}
        <button
          onClick={() => setActiveImg((prev) => (prev - 1 + images.length) % images.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white"
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>
        <button
          onClick={() => setActiveImg((prev) => (prev + 1) % images.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white"
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>
      </div>

      {/* THUMBNAIL ROW */}
      <div className="flex gap-2 px-4 mt-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              i === activeImg ? "border-black" : "border-transparent"
            }`}
          >
            <img src={img} alt={`thumb ${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* PRODUCT INFO */}
      <div className="px-4 pt-5">

        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold leading-snug">{product.name}</h1>
            <p className="text-xs text-gray-400 mt-0.5 capitalize">{product.category}</p>
          </div>
          <button onClick={handleWishlist} className="shrink-0 mt-1">
            <i className={`${liked ? "ri-heart-fill text-red-500" : "ri-heart-line text-gray-400"} text-2xl`}></i>
          </button>
        </div>

        <p className="text-xl font-semibold mt-3">₹ {product.price}</p>
        <p className="text-xs text-gray-400">Price incl. of all taxes</p>

        <p className="mt-4 text-sm text-gray-600 leading-relaxed">{description}</p>

        {/* SIZE SELECT */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Please select a size.</p>
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
          {sizeError && <p className="text-red-500 text-xs mt-2">Please select a size first!</p>}
        </div>

      </div>

      {/* BOTTOM BUTTONS */}
      <div className="fixed bottom-0 left-0 w-full flex gap-3 px-4 py-3 bg-white border-t border-gray-100 z-40">
        <button
          onClick={handleWishlist}
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 px-4 text-sm font-medium w-2/5"
        >
          <i className={`${liked ? "ri-heart-fill text-red-500" : "ri-heart-line"} text-lg`}></i>
          WISHLIST
        </button>
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-3 rounded-lg text-white text-sm font-medium transition-all ${
            added ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {added ? "ADDED ✓" : "ADD TO CART"}
        </button>
      </div>

    </div>
  );
}