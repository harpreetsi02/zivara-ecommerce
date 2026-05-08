"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { productAPI } from "@/utils/api";
import { lemonMilk } from "@/app/fonts";
import Link from "next/link";

export default function SearchComponent() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") || "";

  const [search, setSearch] = useState(query);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSearch(query);
    if (query) fetchResults();
  }, [query]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const data = await productAPI.search(query);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?q=${search}`);
  };

  // LOADING
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-14 h-14 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 text-sm uppercase tracking-[0.25em] mt-5">
            Searching Products
          </p>
        </div>
      </div>
    );

  return (
    <section className="min-h-screen bg-white pt-24 pb-20 overflow-hidden">
      {/* HEADING */}
      <div className="text-center px-4 mb-10">
        <h1
          className={`${lemonMilk.className} flex items-center justify-center text-black tracking-wide`}
        >
          <span className="text-5xl md:text-7xl leading-none">S</span>
          <span className="text-xl md:text-4xl">earch</span>
        </h1>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          Find Your Perfect Style
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="px-4 md:px-6 mb-10">
        <form
          onSubmit={handleSearch}
          className="relative overflow-hidden rounded-full bg-[#f8f8f8] border border-gray-200 focus-within:border-black transition-all duration-300"
        >
          {/* Glow */}
          <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-black/5 to-transparent pointer-events-none"></div>

          <div className="relative flex items-center">
            {/* ICON */}
            <div className="pl-6">
              <i className="ri-search-line text-2xl text-gray-400"></i>
            </div>

            {/* INPUT */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search outfits, tops, dresses..."
              className="flex-1 bg-transparent px-4 py-5 text-black placeholder:text-gray-400 outline-none"
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="mr-2 px-6 py-3 rounded-full bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* RESULTS TOP */}
      <div className="px-4 md:px-6 mb-8">

        <div
          className="bg-[#f8f8f8] rounded-4xl p-6 md:p-8 flex items-center justify-between gap-5 flex-wrap"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
              Search Results
            </p>

            <h2 className="text-3xl md:text-5xl font-light text-black mt-4 wrap-break-words">
              "{query}"
            </h2>
          </div>

          <div
            className="px-6 py-3 rounded-full bg-black text-white text-xs uppercase tracking-[0.2em]"
          >
            {products.length} Product
            {products.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* EMPTY */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center px-6 mt-20">
          <div
            className="w-32 h-32 rounded-full bg-[#f8f8f8] flex items-center justify-center"
          >
            <i className="ri-search-eye-line text-6xl text-gray-300"></i>
          </div>

          <h2 className="text-3xl md:text-5xl font-light text-black mt-10">
            No Products Found
          </h2>

          <p className="text-gray-400 text-sm md:text-base mt-5 leading-7 max-w-md">
            We couldn't find anything matching your search. Try using another keyword.
          </p>
        </div>
      ) : (
        /* PRODUCTS */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4 md:px-6">
          {products.map((item, index) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="group"
            >
              <div>
                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-[1.8rem] bg-[#f8f8f8]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 md:h-120 object-cover transition-all duration-700 group-hover:scale-[1.05]"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"
                  ></div>

                  {/* Number */}
                  <div className="absolute top-3 left-3">
                    <div
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center"
                    >
                      <p className="text-white text-[10px]">
                        {String(index + 1).padStart( 2, "0" )}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                  >
                    <i className="ri-arrow-right-up-line text-lg"></i>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="mt-4 px-1">
                  <h2 className="text-base md:text-lg text-black font-light line-clamp-1">
                    {item.name}
                  </h2>

                  {item.subcategory && (
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2">
                      {item.subcategory}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg md:text-2xl text-black">
                      ₹{item.price}
                    </p>

                    <div
                      className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-black transition-all duration-300 group-hover:bg-black group-hover:text-white"
                    >
                      <i className="ri-heart-line"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}