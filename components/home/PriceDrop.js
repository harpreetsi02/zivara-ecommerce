import { lemonMilk } from "@/app/fonts";
import Link from "next/link";

const PriceDrop = () => {
  return (
    <Link href="/price-drop">
      <section className="px-4 md:px-0 py-10 cursor-pointer overflow-hidden">
        {/* Heading */}
        <div className="flex items-center justify-center mb-10">
          <h2
            className={`${lemonMilk.className} flex items-center text-black tracking-wide`}
          >
            <span className="text-5xl md:text-7xl leading-none">P</span>
            <span className="text-xl md:text-4xl">RICE DROP CORNER</span>
          </h2>
        </div>

        {/* CARD */}
        <div
          className=" relative bg-[#f8f8f8] rounded-4xl overflow-hidden lg:min-h-187.5 group"
        >
          {/* Background Blur Circle */}
          <div className="absolute -top-32 -right-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-70"></div>

          {/* Content Layout */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center">

            {/* LEFT IMAGE */}
            <div className="w-full lg:w-[55%]">
              <div className="relative overflow-hidden lg:h-187.5">
                <img
                  src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200"
                  alt="sale"
                  className=" w-full h-105 md:h-137.5 lg:h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>

                {/* Floating Badge */}
                <div className="absolute top-5 left-5 md:top-8 md:left-8">
                  <div className="bg-white/80 backdrop-blur-md px-5 py-2 rounded-full shadow-sm">
                    <p className="text-[10px] md:text-xs tracking-[0.25em] text-black uppercase">
                      Limited Offer
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div
              className=" w-full lg:w-[45%] px-6 md:px-10 lg:px-16 py-12 lg:py-0 flex flex-col justify-center"
            >

              {/* Small Label */}
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400 mb-5">
                End of Season Edit
              </p>

              {/* Big Heading */}
              <div className="leading-none">
                <h1 className="text-5xl md:text-7xl lg:text-8xl italic font-serif text-black">
                  Flash
                </h1>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-blue-500 -mt-2">
                  SALE
                </h1>

              </div>

              {/* Description */}
              <p className="mt-8 text-gray-500 text-sm md:text-base leading-7 max-w-md">
                Curated markdowns on statement pieces, elevated essentials,
                and everyday silhouettes designed to stand out.
              </p>

              {/* Discount */}
              <div className="mt-10 flex items-end gap-3">
                <h2 className="text-6xl md:text-7xl font-black text-black leading-none">
                  50%
                </h2>
                <p className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 pb-2">
                  OFF SELECTED STYLES
                </p>
              </div>

              {/* CTA */}
              <div className="mt-10">
                <button
                  className=" bg-black text-white px-8 md:px-10 py-4 rounded-full text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-neutral-800 hover:scale-[1.03]"
                >
                  Explore Deals
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default PriceDrop;