import { lemonMilk } from "@/app/fonts";
import Link from "next/link";

const shopItems = [
  {
    name: "Jewellery",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500",
  },
  {
    name: "Top",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
  },
  {
    name: "Jackets",
    image: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=500",
  },
  {
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500",
  },
  {
    name: "Bottom",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
  },
  {
    name: "Bags",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500",
  },
];

const ShopNow = () => {
  return (
    <section className="px-4 py-8 bg-white text-center">

      {/* Heading */}
      <h2 className={`${lemonMilk.className} text-3xl font-light mb-6 text-black`}>
        Shop <span className="italic text-pink-500 drop-shadow-[0_0_10px_rgba(255,0,150,0.7)]">now...</span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">

        {shopItems.map((item, index) => (
          <Link key={index} href={`/category/${item.name.toLowerCase()}`}>
            <div className="cursor-pointer">

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[120px] object-cover rounded-xl"
              />

              <p className="mt-2 text-sm font-semibold text-orange-500">
                {item.name}
              </p>

            </div>
          </Link>
        ))}

      </div>

    </section>
  );
};

export default ShopNow;