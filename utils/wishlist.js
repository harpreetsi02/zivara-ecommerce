export const getWishlist = () => {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
};

export const toggleWishlist = (product) => {
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