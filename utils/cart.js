export const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const updateQty = (id, type) => {
  let cart = getCart();

  cart = cart.map((item) => {
    if (item.id === id) {
      if (type === "inc") item.qty += 1;
      if (type === "dec" && item.qty > 1) item.qty -= 1;
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

export const removeFromCart = (id) => {
  let cart = getCart().filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};