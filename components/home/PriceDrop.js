import { lemonMilk } from "@/app/fonts";

const PriceDrop = () => {
  return (
    <section className="px-4 py-10 bg-gray-100">

      {/* Heading */}
      <h2 className={`${lemonMilk.className} text-black text-2xl font-bold mb-6"`}>
        PRICE DROP CORNER
      </h2>

      {/* Content */}
      <div className="flex items-center justify-between gap-6">

        {/* LEFT IMAGE */}
        <div className="w-1/2">
          <img
            src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500"
            alt="sale"
            className="w-full h-62.5 object-cover rounded-xl"
          />
        </div>

        {/* RIGHT TEXT */}
        <div className="w-1/2 flex flex-col justify-center">

          <h1 className="text-3xl text-black font-serif italic">
            Flash
          </h1>

          <h1 className="text-4xl font-bold text-blue-500">
            SALE
          </h1>

          <p className="mt-2 text-sm text-gray-700">
            on top, bottom & jacket
          </p>

        </div>

      </div>

    </section>
  );
};

export default PriceDrop;