"use client";

import { lemonMilk } from "@/app/fonts";
import { useState, useEffect } from "react";
import { getCart } from "@/utils/cart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getWishlist } from "@/utils/wishlist";
import 'remixicon/fonts/remixicon.css'

const categories = [
  { name: "Dresses", href: "/category/dresses" },
  { name: "Tops", href: "/category/tops" },
  { name: "Bottom", href: "/category/bottom" },
  { name: "Jewellery", href: "/category/jewellery" },
  { name: "Bags", href: "/category/bags" },
  { name: "Jacket", href: "/category/jacket" },
  { name: "Jeans", href: "/category/jeans" },
  { name: "Sneakers", href: "/category/sneakers" },
  { name: "Kurta", href: "/category/kurta" },
  { name: "Saree", href: "/category/saree" },
];

const accountLinks = [
  { name: "My Orders", href: "/orders" },
  { name: "Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
];

const helpLinks = [
  { name: "Customer Service", href: "/help/customer-service" },
  { name: "Return Policy", href: "/help/returns" },
  { name: "Shipping", href: "/help/shipping" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const updateWish = () => {
      const wish = getWishlist();
      setWishCount(wish.length);
    };

    updateWish();
    window.addEventListener("storage", updateWish);
    return () => window.removeEventListener("storage", updateWish);
  }, [])

  useEffect(() => {
    const updateCart = () => {
      const cart = getCart();
      setCartCount(cart.length);
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const trimmed = search.trim(); // extra spaces hata do
      if (trimmed === "") return;    // sirf spaces thi toh kuch mat karo
      router.push(`/search?q=${encodeURIComponent(trimmed)}`); // special chars safe
      setShowSearch(false);
      setSearch("");
    }
  };

  // Sidebar band karo + route karo
  const handleNavClick = (href) => {
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <nav className="fixed top-0 text-black left-0 z-50 w-full bg-white px-4 h-16 flex items-center shadow-sm justify-between">

      {/* LEFT */}
      <i
        className="ri-menu-line text-2xl cursor-pointer"
        onClick={() => setMenuOpen(true)}
      ></i>

      {/* CENTER LOGO */}
      <Link href="/" className="absolute left-1/2 -translate-x-1/2">
        <div className="relative inline-block">
          <img className="rotate-20 w-20 translate-x-4" src="/images/lips.png" />
          <h1
            className={`${lemonMilk.className} absolute inset-0 flex items-center justify-center text-lg tracking-widest uppercase`}
          >
            <span className="text-4xl">z</span>ivara
          </h1>
        </div>
      </Link>

      {/* RIGHT ICONS */}
      <div className="flex items-center gap-4 text-2xl">
        <i
          className="ri-search-line cursor-pointer"
          onClick={() => setShowSearch(!showSearch)}
        ></i>
        <Link href="/wishlist">
          <div className="relative">
          <i className="ri-heart-line cursor-pointer"></i>
          {wishCount > 0 && (
              <span className="absolute -top-0.5 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {wishCount}
              </span>
            )}
            </div>
        </Link>
        <Link href="/cart">
          <div className="relative">
            <i className="ri-shopping-bag-line cursor-pointer"></i>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* SEARCH BAR */}
      {showSearch && (
        <div className="absolute top-16 left-0 w-full bg-white px-4 py-2 shadow">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search products..."
            className="w-full border px-3 py-2 rounded"
            autoFocus
          />
        </div>
      )}

      {/* SIDEBAR */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Sidebar panel */}
          <div className="absolute left-0 top-0 w-[85%] h-full bg-white p-5 overflow-y-auto">

            <div className="flex items-center justify-between pb-5">
              {/* Logo */}
              <div className="relative inline-block" onClick={() => handleNavClick("/")}>
                <img className="rotate-20 w-20 translate-x-7" src="/images/lips.png" />
                <h1 className={`${lemonMilk.className} absolute inset-0 flex items-center justify-center text-sm tracking-widest uppercase`}>
                  <span className="text-4xl">z</span>ivara
                </h1>
              </div>

              {/* Close */}
              <div className="flex justify-end mb-5">
                <i
                  className="ri-close-line text-2xl cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                ></i>
              </div>
            </div>

            <div className="space-y-6">

              {/* Categories */}
              <div>
                <h2 className="text-xl font-semibold">Categories</h2>
                <ul className="mt-3 space-y-2 text-gray-600">
                  {categories.map((item) => (
                    <li
                      key={item.href}
                      className="cursor-pointer hover:text-black transition-colors"
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* My Account */}
              <div>
                <h2 className="text-xl font-semibold">My Account</h2>
                <ul className="mt-3 space-y-2 text-gray-600">
                  {accountLinks.map((item) => (
                    <li
                      key={item.href}
                      className="cursor-pointer hover:text-black transition-colors"
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help Centre */}
              <div>
                <h2 className="text-xl font-semibold">Help Centre</h2>
                <ul className="mt-3 space-y-2 text-gray-600">
                  {helpLinks.map((item) => (
                    <li
                      key={item.href}
                      className="cursor-pointer hover:text-black transition-colors"
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* BOTTOM RIGHT — Only lips */}
              <div className="flex mt-6">
                <img
                  className="-rotate-20 w-40 opacity-75 absolute bottom-10 right-5"
                  src="/images/lips.png"
                />
              </div>
          </div>
        </div>
      )}
    </nav>
  );
}