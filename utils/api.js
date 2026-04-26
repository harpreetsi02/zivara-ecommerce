const BASE_URL = "http://localhost:8080/api";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const request = async (endpoint, options = {}) => {
  const token = getToken();

  // Backend chal raha hai ya nahi check karo
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // Token expire — 401 aaya
    if (response.status === 401) {
      clearAuth();
      // User ko login page pe bhejo
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Session expired. Please login again.");
    }

    // Server error
    if (response.status === 500) {
      throw new Error("Server error. Please try again later.");
    }

    // Response body empty hai?
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new Error(data.error || data.message || "Something went wrong");
    }

    return data;

  } catch (err) {
    // Network error — backend down hai
    if (err.message === "Failed to fetch") {
      throw new Error("Cannot connect to server. Please check your connection.");
    }
    throw err;
  }
};

export const authAPI = {
  register: (body) => request("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  }),
  login: (body) => request("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  }),
};

export const productAPI = {
  getAll: () => request("/products"),
  getById: (id) => request(`/products/${id}`),
  getByCategory: (slug) => request(`/products/category/${slug}`),
  search: (query) => request(`/products?search=${encodeURIComponent(query)}`),
  getLatest: (limit = 30) => request(`/products?limit=${limit}`),
  getPriceDrop: () => request("/products/price-drop"),
  getByCategory: (slug, subcategory = null) => {
    const url = subcategory
      ? `/products/category/${slug}?subcategory=${subcategory}`
      : `/products/category/${slug}`;
    return request(url);
  },
};

export const cartAPI = {
  getCart: () => request("/cart"),
  addToCart: (body) => request("/cart", {
    method: "POST",
    body: JSON.stringify(body),
  }),
  updateQuantity: (itemId, quantity) => request(`/cart/${itemId}?quantity=${quantity}`, {
    method: "PUT",
  }),
  removeItem: (itemId) => request(`/cart/${itemId}`, {
    method: "DELETE",
  }),
  clearCart: () => request("/cart", { method: "DELETE" }),
};

export const wishlistAPI = {
  getWishlist: () => request("/wishlist"),
  toggle: (productId) => request(`/wishlist/${productId}/toggle`, {
    method: "POST",
  }),
  check: (productId) => request(`/wishlist/${productId}/check`),
};

export const orderAPI = {
  createOrder: (body) => request("/orders", {
    method: "POST",
    body: JSON.stringify(body),
  }),
  getOrders: () => request("/orders"),
  getOrderById: (id) => request(`/orders/${id}`),
  cancelOrder: (id) => request(`/orders/${id}/cancel`, {
    method: "PUT",
  }),
};

export const userAPI = {
  getProfile: () => request("/user/profile"),
  updateProfile: (body) => request("/user/profile", {
    method: "PUT",
    body: JSON.stringify(body),
  }),
  changePassword: (body) => request("/user/change-password", {
    method: "PUT",
    body: JSON.stringify(body),
  }),
};

export const otpAPI = {
  sendOtp: (email) => request("/otp/send", {
    method: "POST",
    body: JSON.stringify({ email }),
  }),
  verifyOtp: (email, otp) => request("/otp/verify", {
    method: "POST",
    body: JSON.stringify({ email, otp }),
  }),
};