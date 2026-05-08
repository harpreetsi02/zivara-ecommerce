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
  {
    name: "Customer Service",
    href: "/help/customer-service",
  },
  {
    name: "Return Policy",
    href: "/help/returns",
  },
  {
    name: "Shipping",
    href: "/help/shipping",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [ wishlistCount, setWishlistCount] = useState(0);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  // GSAP REFS
  const navRef = useRef(null);
  const menuIconRef = useRef(null);
  const rightIconsRef = useRef(null);
  const logoRef = useRef(null);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  const router = useRouter();
  const { user, logout } = useAuth();

  // ACCOUNT LINKS
  const accountLinks = user ? [
        {
          name: "My Orders",
          href: "/orders",
        },
        {
          name: "Profile",
          href: "/profile",
        },
        {
          name: "Settings",
          href: "/settings",
        },
      ] : [
        {
          name: "Login / Register",
          href: "/login",
        },
      ];

  useEffect(() => {
    setMounted(true);
    if (user) updateCounts();

    window.addEventListener("cart-updated", updateCounts);
    window.addEventListener("wishlist-updated", updateCounts);

    return () => {
      window.removeEventListener("cart-updated", updateCounts);
      window.removeEventListener("wishlist-updated", updateCounts);
    };
  }, [user]);

  // COUNTS
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

  // OPEN SIDEBAR
  const openSidebar = () => {
    setMenuOpen(true);
    requestAnimationFrame(() => {
      gsap.fromTo(sidebarRef.current,
        { x: "-100%" },
        {
          x: "0%",
          duration: 0.5,
          ease: "power4.out",
        }
      );

      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
        }
      );
    });
  };

  // CLOSE SIDEBAR
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

  // NAVBAR INTRO
  useEffect(() => {
    if (!mounted) return;
    const seen = sessionStorage.getItem("introSeen");
    const delay = seen ? 0 : 2.8;
    const tl = gsap.timeline({delay,});

    gsap.set(menuIconRef.current,{
      x: -40,
      opacity: 0,
    });

    gsap.set(rightIconsRef.current,{
      x: 40,
      opacity: 0,
    });

    gsap.set(logoRef.current, {
      opacity: 0,
      scale: 0.8,
    });

    tl.to(menuIconRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(rightIconsRef.current,{
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },"-=0.4")

      .to(logoRef.current,{
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.7)",
      },"-=0.4");
  }, [mounted]);

  // SEARCH
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const trimmed = search.trim();
      if (!trimmed) return;
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      setShowSearch(false);
      setSearch("");
    }
  };

  // NAVIGATION
  const handleNavClick = (href) => {
    closeSidebar();
    setTimeout(() => {
      router.push(href);
    }, 300);
  };

  // HYDRATION FIX
  if (!mounted) {

    return (
      <nav className="fixed top-0 left-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 h-16 flex items-center justify-between px-4">
        <i className="ri-menu-line text-2xl text-black"></i>
        <div className="relative">
          <img
            className="rotate-12 w-16"
            src="/images/lips.png"
            alt=""
          />
        </div>
        <div className="flex items-center gap-4 text-2xl text-black">
          <i className="ri-search-line"></i>
          <i className="ri-heart-line"></i>
          <i className="ri-shopping-bag-line"></i>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100"
      >
        <div
          className="h-16 md:h-20 px-4 md:px-8 lg:px-12 flex items-center justify-between max-w-425 mx-auto"
        >
          {/* LEFT */}
          <div
            ref={menuIconRef}
            className="flex items-center gap-6"
          >
            {/* MENU */}
            <button
              onClick={openSidebar}
              className="w-8 h-8 md:w-11 md:h-11 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <i className="ri-menu-line text-xl md:text-2xl"></i>
            </button>

            {/* DESKTOP LINKS */}
            <div
              className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-[0.2em] text-black"
            >
              <Link
                href="/category/suits"
                className="hover:text-pink-500 transition-all"
              >
                Suits
              </Link>

              <Link
                href="/category/dresses"
                className="hover:text-pink-500 transition-all"
              >
                Dresses
              </Link>

              <Link
                href="/category/topwear"
                className="hover:text-pink-500 transition-all"
              >
                Tops
              </Link>
            </div>
          </div>

          {/* LOGO */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <div
              ref={logoRef}
              className="relative"
            >
              <img
                className="rotate-20 translate-x-4 w-18 md:w-20 lg:w-24"
                src="/images/lips.png"
                alt=""
              />

              <h1
                className={`${lemonMilk.className} absolute inset-0 flex items-center justify-center text-black tracking-[0.25em]`}
              >
                <span className="text-3xl md:text-5xl">z</span>
                <span className="text-sm md:text-lg">ivara</span>
              </h1>
            </div>
          </Link>

          {/* RIGHT */}
          <div
            ref={rightIconsRef}
            className="flex items-center gap-1 md:gap-5"
          >
            {/* SEARCH */}
            <button
              onClick={() =>setShowSearch(!showSearch)}
              className="w-8 h-8 md:w-11 md:h-11 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white duration-300 transition-all"
            >
              <i className="ri-search-line text-lg md:text-xl"></i>
            </button>

            {/* WISHLIST */}
            <Link href="/wishlist">
              <div
                className="relative w-8 h-8 md:w-11 md:h-11 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <i className="ri-heart-line text-lg md:text-xl"></i>
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 md:-top-1 md:-right-1 min-w-4 h-4 md:min-w-4.5 md:h-4.5 px-1 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center"
                  >
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            {/* CART */}
            <Link href="/cart">
              <div
                className="relative w-8 h-8 md:w-11 md:h-11 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <i className="ri-shopping-bag-line text-lg md:text-xl"></i>

                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 md:-top-1 md:-right-1 min-w-4 h-4 md:min-w-4.5 md:h-4.5 px-1 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center
                    "
                  >
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* SEARCH BAR */}
        {showSearch && (
          <div
            className="border-t border-gray-100 bg-white/90 backdrop-blur-xl px-4 md:px-8 py-4"
          >
            <div className="max-w-3xl mx-auto">
              <div
                className="bg-[#f8f8f8] border border-gray-200 rounded-full px-5 py-4 flex items-center gap-3 focus-within:border-black transition-all"
              >
                <i className="ri-search-line text-gray-400 text-lg"></i>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search for fashion, bags, tops..."
                  className="flex-1 bg-transparent outline-none text-black placeholder:text-gray-400"
                  autoFocus
                />

                <button
                  onClick={() => setShowSearch(false)}
                  className="text-gray-400"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* SIDEBAR */}
      {menuOpen && (
        <div className="fixed inset-0 z-60">
          {/* OVERLAY */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeSidebar}
          ></div>

          {/* SIDEBAR */}
          <div
            ref={sidebarRef}
            className="absolute top-0 left-0 h-full w-[88%] md:w-[45%] lg:w-[32%] bg-white overflow-y-auto rounded-r-4xl p-6 md:p-8 flex flex-col"
          >
            {/* TOP */}
            <div className="flex items-center justify-between mb-10">
              <div className="relative">
                <img
                  className="rotate-20 translate-x-4 w-18 md:w-20 lg:w-24"
                  src="/images/lips.png"
                  alt=""
                />

                <h1
                  className={`${lemonMilk.className} absolute inset-0 flex items-center justify-center text-black tracking-[0.25em]`}
                >
                  <span className="text-3xl">z</span>
                  <span className="text-sm">ivara</span>
                </h1>

              </div>

              <button
                onClick={closeSidebar}
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* MENU CONTENT */}
            <div className="space-y-10 flex-1">
              {/* CATEGORIES */}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-5">
                  Categories
                </p>

                <div className="space-y-3">
                  {categoryData.map((cat) => (
                      <div
                        key={cat.slug}
                        className="border border-gray-100 rounded-3xl overflow-hidden
                        "
                      >
                        <button
                          onClick={() => setOpenCategory(openCategory === cat.slug ? null : cat.slug)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left"
                        >
                          <span className="text-black">
                            {cat.name}
                          </span>

                          <i
                            className={`ri-arrow-${openCategory === cat.slug
                              ? "up"
                              : "down"
                            }-s-line text-gray-400`}
                          ></i>
                        </button>

                        {openCategory === cat.slug && (
                          <div className="px-5 pb-5 space-y-3">
                            <button
                              onClick={() =>handleNavClick(`/category/${cat.slug}`)}
                              className="block text-sm text-gray-600 hover:text-black"
                            >
                              All {cat.name}
                            </button>

                            {cat.subcategories.map((sub) => (
                                <button
                                  key={sub.slug}
                                  onClick={() =>handleNavClick(`/category/${cat.slug}?subcategory=${sub.slug}`)}
                                  className="block text-sm text-gray-500 hover:text-black"
                                >
                                  {sub.name}
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* ACCOUNT */}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-5">
                  My Account
                </p>

                <div className="space-y-3">
                  {accountLinks.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className="block text-left text-black hover:text-pink-500 transition-all"
                      >
                        {item.name}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* HELP */}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-5">
                  Help Centre
                </p>

                <div className="space-y-3">
                  {helpLinks.map((item) => (
                      <button
                        key={item.href}
                        onClick={() =>handleNavClick(item.href)}
                        className=" block text-left text-black hover:text-pink-500 transition-all"
                      >
                        {item.name}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="pt-10">
              {user && (
                <button
                  onClick={() => { logout(); closeSidebar();}}
                  className="w-full py-4 rounded-full bg-black text-white uppercase tracking-[0.2em] text-sm"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}