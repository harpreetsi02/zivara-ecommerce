// "use client";

// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import { productAPI, wishlistAPI } from "@/utils/api";
// import { categoryData } from "@/utils/categories";
// import { useAuth } from "@/context/AuthContext";
// import { gsap, ScrollTrigger } from "@/utils/gsap";
// import Link from "next/link";
// import { lemonMilk } from "@/app/fonts";

// export default function CategoryPage() {
//   const { slug } = useParams();
//   const searchParams = useSearchParams();
//   const subcategory = searchParams.get("subcategory");
//   const router = useRouter();
//   const { user } = useAuth();

//   const [products, setProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const gridRef = useRef(null);
//   const headingRef = useRef(null);
//   const filtersRef = useRef(null);
//   const animatedIndexes = useRef(new Set());

//   const currentCategory = categoryData.find((c) => c.slug === slug);

//   useEffect(() => {
//     fetchProducts();
//   }, [slug, subcategory]);

//   useEffect(() => {
//     if (user) fetchWishlist();
//   }, [user]);

//   // Products load hone ke baad animation
//   useEffect(() => {
//     if (loading || products.length === 0) return;
//     const timer = setTimeout(() => setupAnimations(), 100);
//     return () => clearTimeout(timer);
//   }, [loading, products]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     animatedIndexes.current.clear();
//     try {
//       const data = await productAPI.getByCategory(slug, subcategory);
//       setProducts(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWishlist = async () => {
//     try {
//       const data = await wishlistAPI.getWishlist();
//       setWishlist(data.map((item) => item.productId));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const setupAnimations = () => {
//     // Purane triggers clean karo
//     ScrollTrigger.getAll().forEach((t) => {
//       if (t.vars?.id?.startsWith("catpage")) t.kill();
//     });
//     animatedIndexes.current.clear();

//     // Heading
//     gsap.set(headingRef.current, { opacity: 0, y: -25 });
//     gsap.to(headingRef.current, {
//       opacity: 1,
//       y: 0,
//       duration: 0.5,
//       ease: "power3.out",
//       scrollTrigger: {
//         id: "catpage-heading",
//         trigger: headingRef.current,
//         start: "top 90%",
//         once: true,
//       },
//     });

//     // Filters
//     if (filtersRef.current) {
//       gsap.set(filtersRef.current, { opacity: 0, y: 15 });
//       gsap.to(filtersRef.current, {
//         opacity: 1,
//         y: 0,
//         duration: 0.4,
//         ease: "power3.out",
//         scrollTrigger: {
//           id: "catpage-filters",
//           trigger: filtersRef.current,
//           start: "top 90%",
//           once: true,
//         },
//       });
//     }

//     // Grid items — same ShopNow wala pair animation
//     const gridItems = gridRef.current?.querySelectorAll(".product-card");
//     if (!gridItems) return;

//     gridItems.forEach((item, index) => {
//       const pairIndex = Math.floor(index / 2);
//       const isLeft = index % 2 === 0;

//       gsap.set(item, {
//         opacity: 0,
//         x: isLeft ? -60 : 60,
//       });

//       ScrollTrigger.create({
//         id: `catpage-item-${index}`,
//         trigger: item,
//         start: "top 88%",
//         once: true,
//         onEnter: () => {
//           if (animatedIndexes.current.has(pairIndex)) return;

//           const pairStart = pairIndex * 2;
//           const pairItems = [
//             gridItems[pairStart],
//             gridItems[pairStart + 1],
//           ].filter(Boolean);

//           gsap.to(pairItems[0], {
//             opacity: 1,
//             x: 0,
//             duration: 0.55,
//             ease: "power3.out",
//           });

//           if (pairItems[1]) {
//             gsap.to(pairItems[1], {
//               opacity: 1,
//               x: 0,
//               duration: 0.55,
//               ease: "power3.out",
//               delay: 0.08,
//             });
//           }

//           animatedIndexes.current.add(pairIndex);
//         },
//       });
//     });
//   };

//   const handleWishlist = async (e, productId) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!user) { router.push("/login"); return; }
//     await wishlistAPI.toggle(productId);
//     setWishlist((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const activeSubName = subcategory
//     ? currentCategory?.subcategories.find((s) => s.slug === subcategory)?.name
//     : null;

//   return (
//     <div className="mt-16 z-20 min-h-screen overflow-hidden">

//       {/* Header */}
//       <div ref={headingRef} className="px-4 pt-5 md:pt-10 pb-3 border-b border-gray-100">
//         <h1 className={`${lemonMilk.className} text-xl md:text-3xl text-black font-semibold capitalize`}>{slug}</h1>
//         {activeSubName && (
//           <p className="text-xs text-gray-400 mt-0.5">{activeSubName}</p>
//         )}
//         <p className="text-xs md:text-lg text-gray-400 mt-0.5">{products.length} products</p>
//       </div>

//       {/* Subcategory filter chips */}
//       {currentCategory && (
//         <div ref={filtersRef} className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3 border-b border-gray-100">
//           <button
//             onClick={() => router.push(`/category/${slug}`)}
//             className={`shrink-0 text-xs md:text-lg px-3 py-1.5 rounded-full border transition-all ${
//               !subcategory ? "bg-black text-white border-black" : "border-gray-200 text-gray-600"
//             }`}
//           >
//             All
//           </button>
//           {currentCategory.subcategories.map((sub) => (
//             <button
//               key={sub.slug}
//               onClick={() => router.push(`/category/${slug}?subcategory=${sub.slug}`)}
//               className={`shrink-0 text-xs md:text-lg px-3 py-1.5 rounded-full border transition-all ${
//                 subcategory === sub.slug
//                   ? "bg-black text-white border-black"
//                   : "border-gray-200 text-gray-600"
//               }`}
//             >
//               {sub.name}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Products Grid */}
//       <div className="p-4">
//         {loading ? (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[...Array(4)].map((_, i) => (
//               <div key={i}>
//                 <div className="w-full h-60 bg-gray-100 rounded-xl animate-pulse" />
//                 <div className="h-3 bg-gray-100 rounded mt-2 w-3/4 animate-pulse" />
//                 <div className="h-3 bg-gray-100 rounded mt-1 w-1/2 animate-pulse" />
//               </div>
//             ))}
//           </div>
//         ) : products.length === 0 ? (
//           <div className="text-center mt-16">
//             <p className="text-gray-400 text-sm">No products found</p>
//             <button
//               onClick={() => router.push(`/category/${slug}`)}
//               className="mt-3 text-xs text-pink-500 underline"
//             >
//               View all {slug}
//             </button>
//           </div>
//         ) : (
//           <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 md:p-5 gap-4 md:gap-8">
//             {products.map((item) => (
//               <Link
//                 key={item.id}
//                 href={`/product/${item.id}`}
//                 className="product-card block"
//               >
//                 <div className="cursor-pointer">
//                   <div className="relative">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-60 md:h-140 object-cover rounded-xl"
//                     />
//                     <button
//                       onClick={(e) => handleWishlist(e, item.id)}
//                       className="absolute bottom-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
//                     >
//                       <i className={`${
//                         wishlist.includes(item.id)
//                           ? "ri-heart-fill text-red-500"
//                           : "ri-heart-line text-gray-500"
//                       } text-base`}></i>
//                     </button>
//                     {item.stock === 0 && (
//                       <div className="absolute inset-0 bg-white/60 rounded-xl flex items-center justify-center">
//                         <p className="text-xs font-semibold text-gray-500">Sold Out</p>
//                       </div>
//                     )}
//                   </div>
//                   <h2 className="text-sm text-gray-800 font-semibold mt-2 line-clamp-1">{item.name}</h2>
//                   {item.subcategory && (
//                     <p className="text-xs text-gray-500 mt-0.5 capitalize">{item.subcategory}</p>
//                   )}
//                   <p className="text-sm font-semibold text-black mt-0.5">₹{item.price}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { productAPI, wishlistAPI } from "@/utils/api";
import { categoryData } from "@/utils/categories";
import { useAuth } from "@/context/AuthContext";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import Link from "next/link";
import { lemonMilk } from "@/app/fonts";

export default function CategoryPage() {

  const { slug } =
    useParams();

  const searchParams =
    useSearchParams();

  const subcategory =
    searchParams.get(
      "subcategory"
    );

  const router =
    useRouter();

  const { user } =
    useAuth();

  const [products, setProducts] =
    useState([]);

  const [wishlist, setWishlist] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const gridRef =
    useRef(null);

  const headingRef =
    useRef(null);

  const filtersRef =
    useRef(null);

  const animatedIndexes =
    useRef(new Set());

  const currentCategory =
    categoryData.find(
      (c) => c.slug === slug
    );

  useEffect(() => {

    fetchProducts();

  }, [slug, subcategory]);

  useEffect(() => {

    if (user)
      fetchWishlist();

  }, [user]);

  useEffect(() => {

    if (
      loading ||
      products.length === 0
    )
      return;

    const timer =
      setTimeout(
        () =>
          setupAnimations(),

        100
      );

    return () =>
      clearTimeout(timer);

  }, [loading, products]);

  const fetchProducts =
    async () => {

      setLoading(true);

      animatedIndexes.current.clear();

      try {

        const data =
          await productAPI.getByCategory(
            slug,

            subcategory
          );

        setProducts(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }
    };

  const fetchWishlist =
    async () => {

      try {

        const data =
          await wishlistAPI.getWishlist();

        setWishlist(
          data.map(
            (item) =>
              item.productId
          )
        );

      } catch (err) {

        console.error(err);

      }
    };

  const setupAnimations =
    () => {

      ScrollTrigger.getAll().forEach(
        (t) => {

          if (
            t.vars?.id?.startsWith(
              "catpage"
            )
          )
            t.kill();
        }
      );

      animatedIndexes.current.clear();

      // HEADING
      gsap.set(
        headingRef.current,

        {
          opacity: 0,
          y: -30,
        }
      );

      gsap.to(
        headingRef.current,

        {
          opacity: 1,

          y: 0,

          duration: 0.8,

          ease:
            "power4.out",

          scrollTrigger: {
            id: "catpage-heading",

            trigger:
              headingRef.current,

            start:
              "top 92%",

            once: true,
          },
        }
      );

      // FILTERS
      if (
        filtersRef.current
      ) {

        gsap.set(
          filtersRef.current,

          {
            opacity: 0,
            y: 25,
          }
        );

        gsap.to(
          filtersRef.current,

          {
            opacity: 1,

            y: 0,

            duration: 0.6,

            ease:
              "power3.out",

            scrollTrigger: {
              id: "catpage-filters",

              trigger:
                filtersRef.current,

              start:
                "top 92%",

              once: true,
            },
          }
        );
      }

      // GRID ITEMS
      const gridItems =
        gridRef.current?.querySelectorAll(
          ".product-card"
        );

      if (!gridItems)
        return;

      gridItems.forEach(
        (item, index) => {

          const pairIndex =
            Math.floor(
              index / 2
            );

          const isLeft =
            index % 2 === 0;

          gsap.set(item, {
            opacity: 0,

            x: isLeft
              ? -80
              : 80,

            y: 40,
          });

          ScrollTrigger.create({
            id: `catpage-item-${index}`,

            trigger: item,

            start:
              "top 88%",

            once: true,

            onEnter: () => {

              if (
                animatedIndexes.current.has(
                  pairIndex
                )
              )
                return;

              const pairStart =
                pairIndex *
                2;

              const pairItems =
                [
                  gridItems[
                    pairStart
                  ],

                  gridItems[
                    pairStart +
                      1
                  ],
                ].filter(
                  Boolean
                );

              gsap.to(
                pairItems,

                {
                  opacity: 1,

                  x: 0,

                  y: 0,

                  duration: 0.9,

                  stagger: 0.12,

                  ease:
                    "power4.out",
                }
              );

              animatedIndexes.current.add(
                pairIndex
              );
            },
          });
        }
      );
    };

  const handleWishlist =
    async (
      e,
      productId
    ) => {

      e.preventDefault();

      e.stopPropagation();

      if (!user) {

        router.push(
          "/login"
        );

        return;
      }

      await wishlistAPI.toggle(
        productId
      );

      setWishlist((prev) =>
        prev.includes(productId)
          ? prev.filter(
              (id) =>
                id !==
                productId
            )
          : [
              ...prev,
              productId,
            ]
      );
    };

  const activeSubName =
    subcategory
      ? currentCategory?.subcategories.find(
          (s) =>
            s.slug ===
            subcategory
        )?.name
      : null;

  return (
    <section className="min-h-screen bg-white pt-20 pb-16 overflow-hidden">

      {/* GLOW */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[35rem] h-[35rem] bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* HERO */}
      <div
        ref={headingRef}
        className="
          relative
          overflow-hidden
          rounded-[2rem]
          md:rounded-[3rem]
          bg-black
          text-white
          mx-4
          md:mx-6
          lg:mx-auto
          lg:max-w-7xl
        "
      >

        {/* GLOW */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-transparent to-pink-500/20"></div>

        <div
          className="
            relative
            px-5
            md:px-12
            py-10
            md:py-16
            flex
            flex-col
            md:flex-row
            md:items-end
            md:justify-between
            gap-8
          "
        >

          {/* LEFT */}
          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
              Zivara Collection
            </p>

            <h1
              className={`
                ${lemonMilk.className}
                uppercase
                leading-none
                text-white
              `}
            >

              <span className="text-6xl md:text-9xl">
                {slug?.charAt(
                  0
                )}
              </span>

              <span className="text-2xl md:text-5xl ml-1">
                {slug?.slice(
                  1
                )}
              </span>

            </h1>

            {activeSubName && (

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-6
                  px-5
                  py-2.5
                  rounded-full
                  bg-white/10
                  border border-white/10
                  backdrop-blur-md
                "
              >

                <span className="w-2 h-2 rounded-full bg-pink-400"></span>

                <p className="text-xs uppercase tracking-[0.2em] text-white">
                  {activeSubName}
                </p>

              </div>

            )}

          </div>

          {/* RIGHT */}
          <div className="md:text-right">

            <p className="text-white/50 text-xs uppercase tracking-[0.3em]">
              Available Products
            </p>

            <h2 className="text-5xl md:text-7xl font-light mt-3">
              {products.length}
            </h2>

          </div>

        </div>

      </div>

      {/* FILTERS */}
      {currentCategory && (

        <div
          ref={filtersRef}
          className="
            mt-6
            px-4
            md:px-6
            lg:px-0
          "
        >

          <div
            className="
              lg:max-w-7xl
              lg:mx-auto
              flex
              gap-3
              overflow-x-auto
              no-scrollbar
              pb-2
            "
          >

            <button
              onClick={() =>
                router.push(
                  `/category/${slug}`
                )
              }
              className={`
                shrink-0
                px-5
                md:px-7
                py-3
                rounded-full
                text-xs
                md:text-sm
                uppercase
                tracking-[0.2em]
                transition-all
                duration-300
                ${
                  !subcategory
                    ? "bg-black text-white"
                    : "bg-[#f7f7f7] text-gray-500 hover:bg-black hover:text-white"
                }
              `}
            >
              All
            </button>

            {currentCategory.subcategories.map(
              (sub) => (

                <button
                  key={sub.slug}
                  onClick={() =>
                    router.push(
                      `/category/${slug}?subcategory=${sub.slug}`
                    )
                  }
                  className={`
                    shrink-0
                    px-5
                    md:px-7
                    py-3
                    rounded-full
                    text-xs
                    md:text-sm
                    uppercase
                    tracking-[0.2em]
                    transition-all
                    duration-300
                    ${
                      subcategory ===
                      sub.slug
                        ? "bg-black text-white"
                        : "bg-[#f7f7f7] text-gray-500 hover:bg-black hover:text-white"
                    }
                  `}
                >
                  {sub.name}
                </button>

              )
            )}

          </div>

        </div>

      )}

      {/* PRODUCTS */}
      <div className="mt-10 px-4 md:px-6 lg:px-0">

        {loading ? (

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
              md:gap-7
              lg:max-w-7xl
              lg:mx-auto
            "
          >

            {[...Array(8)].map(
              (_, i) => (

                <div
                  key={i}
                  className="animate-pulse"
                >

                  <div className="w-full h-60 md:h-[32rem] rounded-[2rem] bg-gray-100"></div>

                  <div className="h-3 rounded-full bg-gray-100 mt-4 w-3/4"></div>

                  <div className="h-3 rounded-full bg-gray-100 mt-2 w-1/2"></div>

                </div>

              )
            )}

          </div>

        ) : products.length ===
          0 ? (

          <div className="text-center py-28">

            <div
              className="
                w-28
                h-28
                rounded-full
                bg-[#f7f7f7]
                flex
                items-center
                justify-center
                mx-auto
              "
            >

              <i className="ri-shopping-bag-line text-5xl text-gray-300"></i>

            </div>

            <h2 className="text-3xl font-light mt-8 text-black">
              No products found
            </h2>

            <p className="text-gray-400 mt-3">
              Try another subcategory.
            </p>

            <button
              onClick={() =>
                router.push(
                  `/category/${slug}`
                )
              }
              className="
                mt-8
                px-8
                py-4
                rounded-full
                bg-black
                text-white
                uppercase
                tracking-[0.2em]
                text-xs
              "
            >
              View All
            </button>

          </div>

        ) : (

          <div
            ref={gridRef}
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
              md:gap-7
              lg:max-w-7xl
              lg:mx-auto
            "
          >

            {products.map(
              (item) => (

                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="product-card block group"
                >

                  <div>

                    {/* IMAGE */}
                    <div
                      className="
                        relative
                        overflow-hidden
                        rounded-[1.7rem]
                        bg-[#f8f8f8]
                      "
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-full
                          h-60
                          md:h-[32rem]
                          object-cover
                          transition-all
                          duration-700
                          group-hover:scale-105
                        "
                      />

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                      {/* HEART */}
                      <button
                        onClick={(e) =>
                          handleWishlist(
                            e,

                            item.id
                          )
                        }
                        className="
                          absolute
                          top-3
                          right-3
                          w-10
                          h-10
                          rounded-full
                          bg-white/90
                          backdrop-blur-md
                          flex
                          items-center
                          justify-center
                          shadow-lg
                          hover:scale-110
                          transition-all
                        "
                      >

                        <i
                          className={`${
                            wishlist.includes(
                              item.id
                            )
                              ? "ri-heart-fill text-red-500"
                              : "ri-heart-line text-black"
                          } text-lg`}
                        ></i>

                      </button>

                      {/* SOLD OUT */}
                      {item.stock ===
                        0 && (

                        <div
                          className="
                            absolute
                            inset-0
                            bg-white/70
                            backdrop-blur-sm
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <div
                            className="
                              px-5
                              py-3
                              rounded-full
                              bg-black
                              text-white
                              uppercase
                              tracking-[0.2em]
                              text-xs
                            "
                          >
                            Sold Out
                          </div>

                        </div>

                      )}

                    </div>

                    {/* INFO */}
                    <div className="pt-4 px-1">

                      <h2 className="text-sm md:text-base text-black font-medium line-clamp-1">
                        {item.name}
                      </h2>

                      {item.subcategory && (

                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2">
                          {item.subcategory}
                        </p>

                      )}

                      <div className="flex items-center justify-between mt-3">

                        <p className="text-lg md:text-xl font-light text-black">
                          ₹{item.price}
                        </p>

                        <div
                          className="
                            w-9
                            h-9
                            rounded-full
                            bg-[#f7f7f7]
                            flex
                            items-center
                            justify-center
                            group-hover:bg-black
                            group-hover:text-white
                            transition-all
                          "
                        >

                          <i className="ri-arrow-right-up-line text-sm"></i>

                        </div>

                      </div>

                    </div>

                  </div>

                </Link>

              )
            )}

          </div>

        )}

      </div>

    </section>
  );
}