"use client";

export const getWishlist = () => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  } catch {
    return [];
  }
};

export const toggleWishlist = (product) => {
  if (typeof window === "undefined") return [];

  let list = getWishlist();

  const exists = list.find((item) => item.id === product.id);

  if (exists) {
    list = list.filter((item) => item.id !== product.id);
  } else {
    list.push(product);
  }

  localStorage.setItem("wishlist", JSON.stringify(list));
  return list;
};