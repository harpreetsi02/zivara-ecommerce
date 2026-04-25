"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { productAPI, wishlistAPI } from "@/utils/api";
import { categoryData } from "@/utils/categories";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function CategoryPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const subcategory = searchParams.get("subcategory");
  const router = useRouter();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Current category ka data
  const currentCategory = categoryData.find((c) => c.slug === slug);

  useEffect(() => {
    fetchProducts();
  }, [slug, subcategory]);

  useEffect(() => {
    if (user) fetchWishlist();
  }, [user]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = subcategory
        ? `/products/category/${slug}?subcategory=${subcategory}`
        : `/products/category/${slug}`;
      const data = await productAPI.getByCategory(slug, subcategory);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const data = await wishlistAPI.getWishlist();
      setWishlist(data.map((item) => item.productId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleWishlist = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { router.push("/login"); return; }
    await wishlistAPI.toggle(productId);
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Active subcategory name
  const activeSubName = subcategory
    ? currentCategory?.subcategories.find((s) => s.slug === subcategory)?.name
    : null;

  return (
    <div className="mt-16 min-h-screen bg-white">

      {/* Header */}
      <div className="px-4 pt-5 pb-3 border-b border-gray-100">
        <h1 className="text-xl font-semibold capitalize">{slug}</h1>
        {activeSubName && (
          <p className="text-xs text-gray-400 mt-0.5">{activeSubName}</p>
        )}
        <p className="text-xs text-gray-400 mt-0.5">{products.length} products</p>
      </div>

      {/* Subcategory filter chips */}
      {currentCategory && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3 border-b border-gray-100">
          <button
            onClick={() => router.push(`/category/${slug}`)}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${
              !subcategory
                ? "bg-black text-white border-black"
                : "border-gray-200 text-gray-600"
            }`}
          >
            All
          </button>
          {currentCategory.subcategories.map((sub) => (
            <button
              key={sub.slug}
              onClick={() => router.push(`/category/${slug}?subcategory=${sub.slug}`)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${
                subcategory === sub.slug
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-600"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      <div className="p-4">
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="w-full h-52 bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-3 bg-gray-100 rounded mt-2 w-3/4 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded mt-1 w-1/2 animate-pulse" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-gray-400 text-sm">No products found</p>
            <button
              onClick={() => router.push(`/category/${slug}`)}
              className="mt-3 text-xs text-pink-500 underline"
            >
              View all {slug}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`}>
                <div className="cursor-pointer">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-52 object-cover rounded-xl"
                    />
                    <button
                      onClick={(e) => handleWishlist(e, item.id)}
                      className="absolute bottom-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                    >
                      <i className={`${
                        wishlist.includes(item.id)
                          ? "ri-heart-fill text-red-500"
                          : "ri-heart-line text-gray-500"
                      } text-base`}></i>
                    </button>
                    {item.stock === 0 && (
                      <div className="absolute inset-0 bg-white/60 rounded-xl flex items-center justify-center">
                        <p className="text-xs font-semibold text-gray-500">Sold Out</p>
                      </div>
                    )}
                  </div>
                  <h2 className="text-sm font-medium mt-2 line-clamp-1">{item.name}</h2>
                  {item.subcategory && (
                    <p className="text-xs text-gray-300 mt-0.5 capitalize">{item.subcategory}</p>
                  )}
                  <p className="text-sm font-semibold text-black mt-0.5">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}