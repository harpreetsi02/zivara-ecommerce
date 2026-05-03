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
    <div className="mt-16 pb-32">

      {/* IMAGE SLIDER */}
      <div
        className="relative w-full h-105 bg-gray-100 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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

        {/* Dots */}
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

        {/* Arrows */}
        {images.length > 1 && (
          <>
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
          </>
        )}
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
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
      )}

      {/* PRODUCT INFO */}
      <div className="px-4 text-gray-600 pt-5">

        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold leading-snug">{product.name}</h1>
            {/* <p className="text-xs text-gray-400 mt-0.5 capitalize">{product.category}</p> */}
            {product.subcategory && (
              <p className="text-xs text-gray-400 mt-0.5 capitalize">{product.subcategory}</p>
            )}
          </div>
          <button onClick={handleWishlist} className="shrink-0 mt-1">
            <i className={`${liked ? "ri-heart-fill text-red-500" : "ri-heart-line text-gray-400"} text-2xl`}></i>
          </button>
        </div>

        <p className="text-xl font-semibold mt-3">₹ {product.price}</p>
        <p className="text-xs text-gray-400">Price incl. of all taxes</p>

        {/* Stock */}
        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs text-orange-500 mt-1">
            Only {product.stock} left!
          </p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-red-500 mt-1">Out of Stock</p>
        )}

        {product.description && (
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* SIZE */}
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
          {sizeError && (
            <p className="text-red-500 text-xs mt-2">Please select a size first!</p>
          )}
        </div>

      </div>

      {/* BOTTOM BUTTONS */}
      <div className="fixed bottom-0 left-0 w-full flex gap-3 px-4 py-3 bg-white border-t border-gray-100 z-40">
        <button
          onClick={handleWishlist}
          className="flex items-center text-gray-800 font-semibold justify-center gap-2 border border-gray-300 rounded-lg py-3 px-4 text-sm w-2/5"
        >
          <i className={`${liked ? "ri-heart-fill text-red-500" : "ri-heart-line"} text-lg`}></i>
          WISHLIST
        </button>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`flex-1 py-3 font-semibold rounded-lg text-white text-sm transition-all ${
            product.stock === 0
              ? "bg-gray-300"
              : added
              ? "bg-green-600"
              : "bg-red-500"
          }`}
        >
          {product.stock === 0 ? "Out of Stock" : added ? "ADDED ✓" : "ADD TO CART"}
        </button>
      </div>

    </div>
  );
}