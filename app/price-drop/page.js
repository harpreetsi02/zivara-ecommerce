 "use client";
import { useEffect, useState } from "react";
import { productAPI, wishlistAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { lemonMilk } from "@/app/fonts";
import Link from "next/link";

export default function PriceDropPage() {

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user) fetchWishlist();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const data = await productAPI.getPriceDrop();
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
      setWishlist(data.map(
        (item) => item.productId
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const handleWishlist = async ( e, item ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push("/login");
      return;
    }
    await wishlistAPI.toggle(item.id);

    setWishlist((prev) => prev.includes(item.id)
      ? prev.filter(
          (id) => id !== item.id
        )
      : [...prev, item.id]
    );
  };

  return (
    <section className="min-h-screen relative z-20 pt-24 pb-10 overflow-hidden">
      {/* HEADING */}
      <div className="text-center mb-12 px-4">
        <h1
          className={`${lemonMilk.className} flex items-center justify-center text-black tracking-wide`}
        >
          <span className="text-5xl md:text-7xl leading-none">P</span>
          <span className="text-xl md:text-4xl">rice Drop</span>
        </h1>

        <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
          {loading
            ? "Loading Products..."
            : `${products.length} Sale Items Available`}
        </p>

      </div>
      {/* HERO */}
      <div className="px-4 md:px-6 mb-10">
        <div className="relative overflow-hidden rounded-4xl bg-black text-white">
          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

          {/* Content */}
          <div className="relative p-8 md:p-12">

            {/* TOP */}
            <div className="flex items-center justify-between gap-5 flex-wrap">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-[0.3em]">
                  Limited Time Offer
                </p>
                <h2 className="text-3xl md:text-6xl font-light leading-tight mt-6">
                  Flash Sale <br /> up to 70% off
                </h2>
              </div>

              {/* Badge */}
              <div
                className="px-8 py-5 rounded-full bg-white text-black text-sm uppercase tracking-[0.3em] shrink-0"
              >
                Sale Live
              </div>
            </div>

            {/* Bottom */}
            <p className="text-white/70 text-sm md:text-base leading-8 mt-10 max-w-3xl">
              Prices dropped on selected collections. Grab your favorites before they're gone.
            </p>
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4 md:px-6">
          {[...Array(8)].map((_, i) => (
            <div key={i}>
              <div className="w-full h-64 md:h-120 bg-gray-100 rounded-4xl animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded mt-4 w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded mt-2 w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : (
        /* PRODUCTS */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4 md:px-6">
          {products.map((item, index) => {
            const originalPrice = Math.round(item.price * 1.3);
            const discount = Math.round(
              ((originalPrice - item.price) / originalPrice) * 100
            );

            return (
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

                    {/* Discount */}
                    <div className="absolute top-3 left-3">
                      <div
                        className="px-4 py-2 rounded-full bg-blue-500 text-white text-[10px] uppercase tracking-[0.2em]"
                      >
                        -{discount}% OFF
                      </div>
                    </div>

                    {/* Number */}
                    <div className="absolute top-3 right-3">
                      <div
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center"
                      >
                        <p className="text-white text-[10px]">
                          {String(index + 1).padStart( 2, "0" )}
                        </p>
                      </div>
                    </div>

                    {/* Wishlist */}
                    <button
                      onClick={(e) => handleWishlist(e, item)
                      }
                      className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <i className={`${wishlist.includes(item.id)
                          ? "ri-heart-fill text-red-500"
                          : "ri-heart-line"
                        } text-lg`}
                      ></i>
                    </button>

                    {/* Arrow */}
                    <div
                      className="absolute bottom-3 left-3 w-11 h-11 rounded-full bg-black text-white flex items-center justify-center opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                    >
                      <i className="ri-arrow-right-up-line text-lg"></i>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="mt-4 px-1">

                    {/* Category */}
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      {item.category}
                    </p>

                    {/* Name */}
                    <h2 className="text-base md:text-lg text-black font-light line-clamp-1 mt-2">
                      {item.name}
                    </h2>

                    {/* Prices */}
                    <div className="flex items-center gap-3 mt-4 flex-wrap">
                      <p className="text-lg md:text-2xl text-black">
                        ₹{item.price}
                      </p>

                      <p className="text-gray-400 line-through text-sm">
                        ₹{originalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}