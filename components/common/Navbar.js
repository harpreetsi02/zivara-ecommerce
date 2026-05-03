"use client";

import { lemonMilk } from "@/app/fonts";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "remixicon/fonts/remixicon.css";

import { useAuth } from "@/context/AuthContext";
import { cartAPI, wishlistAPI } from "@/utils/api";
import { categoryData } from "@/utils/categories";
import { gsap } from "@/utils/gsap";

const helpLinks = [
  { name: "Customer Service", href: "/help/customer-service" },
  { name: "Return Policy", href: "/help/returns" },
  { name: "Shipping", href: "/help/shipping" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);  

  // GSAP refs
  const navRef = useRef(null);
  const menuIconRef = useRef(null);
  const rightIconsRef = useRef(null);
  const logoRef = useRef(null);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  const router = useRouter();
  const { user, logout } = useAuth();

  // Account links
  const accountLinks = user
    ? [
        { name: "My Orders", href: "/orders" },
        { name: "Profile", href: "/profile" },
        { name: "Settings", href: "/settings" },
      ]
    : [{ name: "Login / Register", href: "/login" }];

  useEffect(() => {
    setMounted(true);
    if (user) updateCounts();

    // Custom event listen karo
    window.addEventListener("cart-updated", updateCounts);
    window.addEventListener("wishlist-updated", updateCounts);

    return () => {
      window.removeEventListener("cart-updated", updateCounts);
      window.removeEventListener("wishlist-updated", updateCounts);
    };
  }, [user]);

  // Fetch cart/wishlist counts
  const updateCounts = async () => {
    try {
      const cart = await cartAPI.getCart();
      setCartCount(cart.totalItems || 0);

      const wish = await wishlistAPI.getWishlist();
      setWishlistCount(wish.length || 0);
    } catch (err) {
      setCartCount(0);
      setWishlistCount(0);
    }
  };

  // Sidebar open karne ka function ---------->
  const openSidebar = () => {
    setMenuOpen(true);
    // Next tick mein animate karo
    requestAnimationFrame(() => {
      gsap.fromTo(sidebarRef.current,
        { x: "-100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    });
  };

  // Sidebar close karne ka function ---------->
  const closeSidebar = () => {
    gsap.to(sidebarRef.current, {
      x: "-100%",
      duration: 0.35,
      ease: "power3.in",
      onComplete: () => setMenuOpen(false),
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  };

  // Navbar intro animation
  useEffect(() => {
    if (!mounted) return;

    const seen = sessionStorage.getItem("introSeen");
    const delay = seen ? 0 : 2.8;

    const tl = gsap.timeline({ delay });

    gsap.set(menuIconRef.current, {
      x: -40,
      opacity: 0,
    });

    gsap.set(rightIconsRef.current, {
      x: 40,
      opacity: 0,
    });

    gsap.set(logoRef.current, {
      opacity: 0,
    });

    tl.to(menuIconRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        rightIconsRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(
        logoRef.current,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2"
      );
  }, [mounted]);

  // Search
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const trimmed = search.trim();

      if (trimmed === "") return;

      router.push(`/search?q=${encodeURIComponent(trimmed)}`);

      setShowSearch(false);
      setSearch("");
    }
  };

  // Navigation
  const handleNavClick = (href) => {
    setMenuOpen(false);
    router.push(href);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 z-50 w-full bg-white px-4 h-16 flex items-center justify-between shadow-sm">
        <i className="ri-menu-line text-2xl text-black"></i>

        <Link href="/">
          <div className="relative inline-block">
            <img
              className="rotate-20 w-20 translate-x-4"
              src="/images/lips.png"
              alt="logo"
            />

            <h1
              className={`${lemonMilk.className} absolute inset-0 flex items-center justify-center text-lg tracking-widest uppercase text-black`}
            >
              <span className="text-4xl">z</span>ivara
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-2xl text-black">
          <i className="ri-search-line"></i>
          <i className="ri-heart-line"></i>
          <i className="ri-shopping-bag-line"></i>
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 z-50 w-full bg-white px-4 h-16 flex items-center justify-between shadow-sm"
    >
      {/* LEFT */}
      <div ref={menuIconRef}>
        <i
          className="ri-menu-line text-2xl cursor-pointer text-black"
          onClick={openSidebar}
        ></i>
      </div>

      {/* CENTER LOGO */}
      <Link href="/" className="absolute left-1/2 -translate-x-1/2">
        <div
          id="navbar-logo"
          ref={logoRef}
          className="relative inline-block"
        >
          <img
            className="rotate-20 w-20 translate-x-4"
            src="/images/lips.png"
            alt="logo"
          />

          <h1
            className={`${lemonMilk.className} absolute inset-0 flex items-center justify-center text-lg tracking-widest uppercase text-black`}
          >
            <span className="text-4xl">z</span>ivara
          </h1>
        </div>
      </Link>

      {/* RIGHT ICONS */}
      <div
        ref={rightIconsRef}
        className="flex items-center gap-4 text-2xl text-black"
      >
        {/* Search */}
        <i
          className="ri-search-line cursor-pointer"
          onClick={() => setShowSearch(!showSearch)}
        ></i>

        {/* Wishlist */}
        <Link href="/wishlist">
          <div className="relative">
            <i className="ri-heart-line cursor-pointer"></i>

            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full leading-4">
                {wishlistCount}
              </span>
            )}
          </div>
        </Link>

        {/* Cart */}
        <Link href="/cart">
          <div className="relative">
            <i className="ri-shopping-bag-line cursor-pointer"></i>

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full leading-4">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* SEARCH BAR */}
      {showSearch && (
        <div className="absolute top-16 left-0 w-full bg-white px-4 py-2 shadow z-50">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search products..."
            className="w-full border px-3 py-2 rounded text-black text-sm"
            autoFocus
          />
        </div>
      )}

      {/* SIDEBAR */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/40"
            onClick={closeSidebar}
          ></div>

          {/* Sidebar */}
          <div ref={sidebarRef} className="absolute left-0 top-0 w-[85%] h-full bg-white p-5 overflow-y-auto flex flex-col relative">
            {/* TOP */}
            <div className="flex items-center justify-between mb-6">
              {/* Logo */}
              <div
                className="relative inline-block cursor-pointer"
                onClick={() => { closeSidebar(); }}
              >
                <img
                  className="rotate-20 w-16 translate-x-3"
                  src="/images/lips.png"
                  alt="logo"
                />

                <h1
                  className={`${lemonMilk.className} absolute inset-0 flex items-center justify-center text-sm tracking-widest uppercase text-black`}
                >
                  <span className="text-3xl">z</span>ivara
                </h1>
              </div>

              {/* Close */}
              <i
                className="ri-close-line text-2xl cursor-pointer text-black"
                onClick={closeSidebar}
              ></i>
            </div>

            {/* CONTENT */}
            <div className="space-y-6 flex-1">
              {/* Categories */}
              <div>
                <h2 className="text-xl font-semibold text-black">
                  Categories
                </h2>

                <ul className="mt-2 space-y-0.5">
                  {categoryData.map((cat) => (
                    <li key={cat.slug}>
                      {/* Category button */}
                      <button
                        onClick={() =>
                          setOpenCategory(
                            openCategory === cat.slug ? null : cat.slug
                          )
                        }
                        className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-black transition-colors"
                      >
                        <span className="text-sm font-medium">
                          {cat.name}
                        </span>

                        <i
                          className={`ri-arrow-${
                            openCategory === cat.slug ? "up" : "down"
                          }-s-line text-gray-400 text-sm`}
                        ></i>
                      </button>

                      {/* Subcategories */}
                      {openCategory === cat.slug && (
                        <ul className="pl-3 pb-2 space-y-1 bg-gray-50 rounded-r-xl border-l border-gray-100 ml-2">
                          {/* All category */}
                          <li
                            className="text-xs text-gray-500 py-1 cursor-pointer hover:text-black transition-colors"
                            onClick={() =>
                              handleNavClick(`/category/${cat.slug}`)
                            }
                          >
                            All {cat.name}
                          </li>

                          {/* Subs */}
                          {cat.subcategories.map((sub) => (
                            <li
                              key={sub.slug}
                              className="text-xs text-gray-500 py-1 cursor-pointer hover:text-black transition-colors"
                              onClick={() =>
                                handleNavClick(
                                  `/category/${cat.slug}?subcategory=${sub.slug}`
                                )
                              }
                            >
                              {sub.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Account */}
              <div>
                <h2 className="text-xl font-semibold text-black">
                  My Account
                </h2>

                <ul className="mt-3 space-y-2 text-gray-600">
                  {accountLinks.map((item) => (
                    <li
                      key={item.href}
                      className="cursor-pointer hover:text-black transition-colors text-sm"
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help */}
              <div>
                <h2 className="text-xl font-semibold text-black">
                  Help Centre
                </h2>

                <ul className="mt-3 space-y-2 text-gray-600">
                  {helpLinks.map((item) => (
                    <li
                      key={item.href}
                      className="cursor-pointer hover:text-black transition-colors text-sm"
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logout */}
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left text-red-500 text-sm font-medium"
                >
                  Log Out
                </button>
              )}
            </div>

            {/* Bottom image */}
            <img
              className="-rotate-20 w-40 opacity-50 absolute bottom-5 right-5"
              src="/images/lips.png"
              alt=""
            />
          </div>
        </div>
      )}
    </nav>
  );
}