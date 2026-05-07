"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { productAPI, cartAPI, wishlistAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const touchStartX = useRef(null);
  const searchParams = useSearchParams();
  const subcategory = searchParams.get("subcategory");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (user) checkWishlist();
  }, [user, id]);

  const fetchProduct = async () => {
    try {
      const data = await productAPI.getById(id);
      setProduct(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkWishlist = async () => {
    try {
      const data = await wishlistAPI.check(id);
      setLiked(data.wishlisted);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWishlist = async () => {
    if (!user) { router.push("/login"); return; }
    try {
      await wishlistAPI.toggle(id);
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async () => {
    if (!user) { router.push("/login"); return; }
    if (!selectedSize) { setSizeError(true); return; }
    try {
      await cartAPI.addToCart({
        productId: parseInt(id),
        quantity: 1,
        size: selectedSize,
      });
      setAdded(true);
      setSizeError(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Swipe support
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const total = images.length;
    if (diff > 50) setActiveImg((prev) => (prev + 1) % total);
    if (diff < -50) setActiveImg((prev) => (prev - 1 + total) % total);
    touchStartX.current = null;
  };

  if (loading) return (
    <div className="mt-16 flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm">Loading product...</p>
    </div>
  );

  if (!product) return (
    <div className="mt-16 flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm">Product not found</p>
    </div>
  );

  // Images — API se aayengi ya fallback
  const images = product.images?.length > 0
    ? product.images
    : [product.image];

  return (
  <div className="mt-16 pb-32 md:pb-16 bg-white">

    {/* MAIN LAYOUT */}
    <div className="lg:grid lg:grid-cols-[1.15fr_.85fr] lg:gap-20 xl:gap-20 items-start">

      {/* LEFT SIDE */}
      <div>

        {/* IMAGE SLIDER */}
        <div
          className="
            relative w-full h-115 md:h-165 lg:h-[82vh] bg-[#f8f8f8] overflow-hidden lg:rounded-2xl
          "
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.name} ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover scale-[1.01] hover:scale-[1.04] transition-all duration-700 ${
                i === activeImg ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Category badge */}
          <div className="absolute bottom-5 left-5 bg-black/90 backdrop-blur-md text-white text-sm md:text-lg px-4 py-2 uppercase tracking-[0.25em] rounded-full z-10">
            {product.category}
          </div>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeImg
                    ? "bg-white w-8"
                    : "bg-white/50 w-2"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveImg(
                    (prev) => (prev - 1 + images.length) % images.length
                  )
                }
                className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white"
              >
                <i className="ri-arrow-left-s-line text-2xl"></i>
              </button>

              <button
                onClick={() =>
                  setActiveImg((prev) => (prev + 1) % images.length)
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white"
              >
                <i className="ri-arrow-right-s-line text-2xl"></i>
              </button>
            </>
          )}
        </div>

        {/* THUMBNAILS */}
        {images.length > 1 && (
          <div className="flex gap-5 md:items-center md:justify-center px-4 lg:px-0 mt-5 overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                  i === activeImg
                    ? "border-black scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`thumb ${i}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

      </div>

      {/* RIGHT SIDE */}
      <div
        className="px-5 md:pr-20 pt-10 lg:pt-20 text-gray-700 lg:sticky lg:top-24 h-fit"
      >

        {/* PRODUCT HEADER */}
        <div className="flex items-start justify-between gap-4">

          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-none">
              {product.name}
            </h1>

            {product.subcategory && (
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-4">
                {product.subcategory}
              </p>
            )}
          </div>

          <button
            onClick={handleWishlist}
            className="shrink-0 mt-1"
          >
            <i
              className={`${
                liked
                  ? "ri-heart-fill text-red-500"
                  : "ri-heart-line text-gray-400"
              } text-3xl`}
            ></i>
          </button>

        </div>

        {/* PRICE */}
        <div className="mt-8">
          <p className="text-3xl lg:text-4xl font-light tracking-tight">
            ₹ {product.price}
          </p>

          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2">
            Inclusive of all taxes
          </p>
        </div>

        {/* STOCK */}
        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-sm text-orange-500 mt-4">
            Only {product.stock} left in stock
          </p>
        )}

        {product.stock === 0 && (
          <p className="text-sm text-red-500 mt-4">
            Out of Stock
          </p>
        )}

        {/* DESCRIPTION */}
        {product.description && (
          <p className="mt-10 text-[15px] leading-8 text-gray-500 max-w-md">
            {product.description}
          </p>
        )}

        {/* SIZE */}
        <div className="mt-12">

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm uppercase tracking-[0.2em] font-medium">
              Select Size
            </p>

            <p className="text-xs uppercase tracking-wider text-gray-500 underline cursor-pointer">
              Size Chart
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                className={`min-w-10 h-10 border rounded-full text-sm transition-all duration-300 ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {sizeError && (
            <p className="text-red-500 text-xs mt-3">
              Please select a size first.
            </p>
          )}

        </div>

        {/* BUTTONS */}
        <div
          className=" fixed lg:static bottom-0 left-0 w-full lg:w-auto flex gap-3 px-4 lg:px-0 py-4 bg-white border-t lg:border-0 border-gray-100 z-40 mt-12"
        >

          <button
            onClick={handleWishlist}
            className=" flex items-center justify-center gap-2 border border-gray-300 rounded-full py-4 px-6 text-sm font-medium text-gray-800 w-2/5 lg:w-auto hover:border-black transition-all"
          >
            <i
              className={`${
                liked
                  ? "ri-heart-fill text-red-500"
                  : "ri-heart-line"
              } text-lg`}
            ></i>

            SAVE
          </button>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 py-4 rounded-full text-white text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
              product.stock === 0
                ? "bg-gray-300"
                : added
                ? "bg-green-600"
                : "bg-red-500 hover:bg-neutral-800"
            }`}
          >
            {product.stock === 0
              ? "Out of Stock"
              : added
              ? "Added ✓"
              : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  </div>
);
}