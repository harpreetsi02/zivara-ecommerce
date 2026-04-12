import { lemonMilk } from "@/app/fonts";
import Link from "next/link";

const PriceDrop = () => {
  return (
    <Link href="/price-drop">
      <section className="px-4 py-10 cursor-pointer">

        {/* Heading */}
        <h2 className={`${lemonMilk.className} flex items-center justify-center text-black text-lg font-bold mb-6`}>
          <span className="text-4xl">P</span>RICE DROP CORNER
        </h2>

        {/* Content */}
        <div className="flex items-center justify-between gap-6">

          {/* LEFT IMAGE */}
          <div className="w-1/2">
            <img
              src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500"
              alt="sale"
              className="w-full h-52 object-cover rounded-xl"
            />
          </div>

          {/* RIGHT TEXT */}
          <div className="w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl text-black font-serif italic">Flash</h1>
            <h1 className="text-4xl font-bold text-blue-500">SALE</h1>
            <p className="mt-2 text-sm text-gray-700">on top, bottom & jacket</p>
            <p className="mt-3 text-xs text-blue-500 font-medium underline">View all deals →</p>
          </div>

        </div>

      </section>
    </Link>
  );
};

export default PriceDrop;