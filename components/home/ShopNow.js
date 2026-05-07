"use client";

import { useState, useEffect, useRef } from "react";
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
  const animatedIndexes = useRef(new Set());

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user)
      fetchWishlist();
  },[user]);

  const fetchProducts =
    async () => {
      try {
        const data = await productAPI.getAll();

        setProducts(data);
        setFiltered(data);

        const cats = ["All", ...new Set(data.map((p) =>
          p.category
        )),];
        setCategories(cats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  const fetchWishlist =
    async () => {
      try {
        const data = await wishlistAPI.getWishlist();
        setWishlist(data.map((item) => item.productId));
      } catch (err) {
        console.error(err);
      }
    };

  useEffect(() => {
    if ( loading || filtered.length === 0 ) return;
    const timer = setTimeout(() => setupAnimations(), 100);
    return () => clearTimeout(timer);
  }, [loading, filtered]);

  const setupAnimations = () => {
    ScrollTrigger.getAll().forEach(
      (t) => {
        if (
          t.vars?.id?.startsWith("shopnow")
        )
        t.kill();
      }
    );

    animatedIndexes.current.clear();

    // HEADING
    gsap.set(headingRef.current,{
      opacity: 0,
      y: 40,
    });

    gsap.to(headingRef.current,{
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power4.out",
      scrollTrigger: { id: "shopnow-heading",
        trigger: headingRef.current,
        start: "top 88%",
        once: true,
      },
    });

    // FILTERS
    gsap.set(filtersRef.current,{
      opacity: 0,
      y: 30,
    });

    gsap.to(filtersRef.current,{
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease:"power3.out",
      scrollTrigger: {
        id: "shopnow-filters",
        trigger: filtersRef.current,
        start: "top 92%",
        once: true,
      },
    });

    // CARDS
    const gridItems = gridRef.current?.querySelectorAll(".product-card");
    if (!gridItems) return;

    gridItems.forEach((item, index) => {
      const pairIndex = Math.floor(index / 2);
      const isLeft = index % 2 === 0;
      gsap.set(item, {
        opacity: 0,
        x: isLeft ? -80 : 80,
        y: 40,
      });
      ScrollTrigger.create({
        id: `shopnow-item-${index}`,
        trigger: item,
        start: "top 88%",
        once: true,
        onEnter: () => {
          if (animatedIndexes.current.has(pairIndex)) return;
          const pairStart = pairIndex * 2;
          const pairItems =[
              gridItems[pairStart],
              gridItems[pairStart + 1],
            ].filter(
              Boolean
            );
          gsap.to(pairItems,{
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "power4.out",
            }
          );
          animatedIndexes.current.add(pairIndex);
        },
      });
    });
  };

  const handleFilter = (cat) => {setActive(cat);
    const newFiltered = cat === "All" ? products : products.filter((p) =>
      p.category === cat
    );
    setFiltered(newFiltered);
    setTimeout(() => {
      animatedIndexes.current.clear();
      setupAnimations();
    }, 50);
  };

  const handleWishlist = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {router.push("/login");
      return;
    }
    await wishlistAPI.toggle(item.id);
    setWishlist((prev) =>
      prev.includes(item.id) ? prev.filter(
        (id) => id !== item.id
      ) : [ ...prev, item.id ]
    );
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-24">
      {/* GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-140 h-140 blur-3xl rounded-full pointer-events-none"></div>

      {/* WRAPPER */}
      <div className="relative lg:max-w-7xl lg:mx-auto">

        {/* HEADING */}
        <div ref={headingRef} className="text-center px-4">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-5">
            Curated Collection
          </p>
          <h2
            className={`${lemonMilk.className} text-black leading-none`}
          >
            <span className="text-4xl md:text-6xl">shop</span>
            <span className="italic text-4xl text-pink-500 ml-3 drop-shadow-[0_0_15px_rgba(255,0,140,0.35)]">now</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-6 max-w-xl mx-auto leading-7">
            Explore premium styles crafted for everyday confidence and effortless fashion.
          </p>
        </div>

        {/* FILTERS */}
        <div
          ref={filtersRef}
          className="mt-10 flex gap-3 overflow-x-auto no-scrollbar px-4 md:px-0 lg:justify-center"
        >

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                handleFilter(
                  cat
                )
              }
              className={`shrink-0 px-6 md:px-8 py-3 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-300
                ${active === cat
                    ? "bg-black text-white shadow-xl"
                    : "bg-[#f7f7f7] text-gray-500 hover:bg-black hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7 mt-12 px-4 md:px-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse"
              >
                <div className="w-full h-60 md:h-128 rounded-xl bg-gray-100"></div>
                <div className="h-3 bg-gray-100 rounded-full mt-4 w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded-full mt-2 w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7 mt-14 px-4 md:px-0"
          >
            {filtered.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className="product-card block group"
              >
                <div>
                  {/* IMAGE */}
                  <div
                    className="relative overflow-hidden rounded-xl bg-[#f8f8f8]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-64 md:h-32 object-cover transition-all duration-700 group-hover:scale-105
                      "
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    {/* TOP TAG */}
                    <div
                      className="absolute top-3 left-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md text-black text-[10px] uppercase tracking-[0.25em]"
                    >
                      New
                    </div>

                    {/* HEART */}
                    <button
                      onClick={(e) => handleWishlist(e, item)}
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                    >
                      <i
                        className={`${wishlist.includes(item.id)
                          ? "ri-heart-fill text-red-500"
                          : "ri-heart-line text-black"
                        } text-lg`}
                      ></i>
                    </button>

                    {/* SOLD OUT */}
                    {item.stock === 0 && (
                      <div
                        className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center"
                      >
                        <div
                          className="px-5py-3rounded-fullbg-blacktext-whiteuppercasetracking-[0.2em]text-xs"
                        >
                          Sold Out
                        </div>
                      </div>
                    )}

                    {/* QUICK VIEW */}
                    <div
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                    >
                      <div
                        className="px-5 py-3 rounded-full bg-black text-white text-[10px] uppercase tracking-[0.25em]"
                      >
                        View Product
                      </div>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="pt-4 px-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm md:text-base text-black font-medium line-clamp-1">
                          {item.name}
                        </h3>
                        {item.subcategory && (
                          <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-gray-400 mt-2">
                            {item.subcategory}
                          </p>
                        )}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-[#f7f7f7] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shrink-0">
                        <i className="ri-arrow-right-up-line text-sm"></i>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="flex items-center gap-3 mt-4">
                      <p className="text-lg md:text-2xl font-light text-black">
                        ₹{item.price}
                      </p>
                      <p className="text-xs text-gray-400 line-through">
                        ₹{Math.round(item.price * 1.25)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}