"use client";

import Link from "next/link";

const ProductCard = ({ item }) => {
  return (
    <Link href={`/product/${item.id}`}>
      <div className="min-w-[150px] flex-shrink-0 cursor-pointer">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-75 object-cover rounded-xl"
        />
        <h3 className="mt-2 text-sm font-medium">{item.name}</h3>
        <p className="text-sm text-gray-600">₹{item.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;