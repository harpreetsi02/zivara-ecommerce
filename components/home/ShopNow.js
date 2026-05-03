"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { productAPI, wishlistAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { lemonMilk } from "@/app/fonts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/utils/gsap";

export default function ShopNow() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const filtersRef = useRef(null);
  const gridRef = useRef(null);
  const animatedIndexes = useRef(new Set()); // track karo kaun animate ho chuka

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user) fetchWishlist();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const data = await productAPI.getAll();
      setProducts(data);
      setFiltered(data);
      const cats = ["All", ...new Set(data.map((p) => p.category))];
      setCategories(cats);
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

  // Products load hone ke baad animation setup karo
  useEffect(() => {
    if (loading || filtered.length === 0) return;

    // Thoda wait karo DOM update ke liye
    const timer = setTimeout(() => {
      setupAnimations();
    }, 100);

    return () => clearTimeout(timer);
  }, [loading, filtered]);

  const setupAnimations = () => {
    // Purane ScrollTriggers clean karo
    ScrollTrigger.getAll().forEach((t) => {
      if (t.vars?.id?.startsWith("shopnow")) t.kill();
    });
    animatedIndexes.current.clear();

    // Heading animation
    gsap.set(headingRef.current, { opacity: 0, y: 30 });
    gsap.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        id: "shopnow-heading",
        trigger: headingRef.current,
        start: "top 85%",
        once: true,
      },
    });

    // Filters animation
    gsap.set(filtersRef.current, { opacity: 0, y: 20 });
    gsap.to(filtersRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        id: "shopnow-filters",
        trigger: filtersRef.current,
        start: "top 88%",
        once: true,
      },
    });

    // Grid items — har 2 items ek pair mein
    const gridItems = gridRef.current?.querySelectorAll(".product-card");
    if (!gridItems) return;

    gridItems.forEach((item, index) => {
      // Pair decide karo — 0,1 = first pair, 2,3 = second pair...
      const pairIndex = Math.floor(index / 2);
      const isLeft = index % 2 === 0; // left column
      const isRight = index % 2 === 1; // right column

      // Initial state
      gsap.set(item, {
        opacity: 0,
        x: isLeft ? -60 : 60,
      });

      // ScrollTrigger — jab pair screen pe aaye
      ScrollTrigger.create({
        id: `shopnow-item-${index}`,
        trigger: item,
        start: "top 88%",
        once: true,
        onEnter: () => {
          // Sirf agar is pair ki animation nahi hui
          if (animatedIndexes.current.has(pairIndex)) return;

          // Dono items ek saath animate karo
          const pairStart = pairIndex * 2;
          const pairItems = [
            gridItems[pairStart],
            gridItems[pairStart + 1],
          ].filter(Boolean);

          gsap.to(pairItems[0], {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: "power3.out",
          });

          if (pairItems[1]) {
            gsap.to(pairItems[1], {
              opacity: 1,
              x: 0,
              duration: 0.55,
              ease: "power3.out",
              delay: 0.08,
            });
          }

          animatedIndexes.current.add(pairIndex);
        },
      });
    });
  };

  const handleFilter = (cat) => {
    setActive(cat);
    const newFiltered = cat === "All"
      ? products
      : products.filter((p) => p.category === cat);
    setFiltered(newFiltered);

    // Filter change hone pe animations reset karo
    setTimeout(() => {
      animatedIndexes.current.clear();
      setupAnimations();
    }, 50);
  };

  const handleWishlist = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { router.push("/login"); return; }
    await wishlistAPI.toggle(item.id);
    setWishlist((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    );
  };

  return (
    <section ref={sectionRef} className="pb-10">

      {/* Heading */}
      <div className="px-4 pt-8 pb-4">
        <h2
          ref={headingRef}
          className={`${lemonMilk.className} text-3xl font-light text-black`}
        >
          Shop{" "}
          <span className="italic text-pink-500 drop-shadow-[0_0_10px_rgba(255,0,150,0.7)]">
            now...
          </span>
        </h2>
      </div>

      {/* Filter Tabs */}
      <div ref={filtersRef} className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`shrink-0 text-xs px-4 py-1.5 rounded-full border transition-all ${
              active === cat
                ? "bg-black text-white border-black"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-3 px-4">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div className="w-full h-60 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-3 bg-gray-100 rounded mt-2 w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded mt-1 w-1/2 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-2 gap-3 px-4">
          {filtered.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="product-card block"
            >
              <div className="cursor-pointer">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-60 object-cover rounded-xl"
                  />
                  <button
                    onClick={(e) => handleWishlist(e, item)}
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
                <h3 className="text-sm text-gray-800 font-semibold mt-2 line-clamp-1">{item.name}</h3>
                <p className="text-xs text-gray-500 capitalize mt-0.5">{item.category}</p>
                <p className="text-sm font-semibold text-black mt-1">₹{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

    </section>
  );
}