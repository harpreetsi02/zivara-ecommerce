import { lemonMilk } from "@/app/fonts";
import Link from "next/link";
import { products } from "@/utils/data";

// data.js se unique categories nikalo with image
const categoryMap = {};
products.forEach((item) => {
  if (!categoryMap[item.category]) {
    categoryMap[item.category] = item.image;
  }
});

const categories = Object.entries(categoryMap).map(([slug, image]) => ({
  slug,
  name: slug.charAt(0).toUpperCase() + slug.slice(1),
  image,
})).slice(0, 12); // 3 cols x 4 rows = 12

const Categories = () => {
  return (
    <section className="px-4 py-6">

      {/* Heading */}
      <h2 className={`${lemonMilk.className} flex items-center justify-center text-lg text-black font-semibold mb-4`}>
        <span className="text-4xl">C</span>ATEGORIES
      </h2>

      {/* Grid — 3 col, 4 row */}
      <div className="grid grid-cols-3 grid-rows-4 gap-3">
        {categories.map((item) => (
          <Link key={item.slug} href={`/category/${item.slug}`}>
            <div className="cursor-pointer">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-35 rounded-sm object-cover"
              />
              <p className="text-xs mt-1 text-gray-800 font-medium tracking-wide capitalize">
                {item.name}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
};

export default Categories;