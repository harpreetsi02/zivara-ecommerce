"use client";

import { useEffect, useState } from "react";
import { getCart, updateQty, removeFromCart } from "@/utils/cart";
import { toggleWishlist } from "@/utils/wishlist";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const quantities = [1, 2, 3, 4, 5];

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [phone, setPhone] = useState("");
  const isLoggedIn = false; // baad mein auth se replace karna

  const mockAddress = {
    name: "Priya Sharma",
    address: "B-204, Green Park, New Delhi - 110016",
  };

  useEffect(() => {
    const items = getCart();
    setCart(items);
    // sab selected by default
    const sel = {};
    items.forEach((item) => (sel[item.id] = true));
    setSelected(sel);
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQty = (id, val) => {
    let cart = getCart();
    cart = cart.map((item) =>
      item.id === id ? { ...item, qty: parseInt(val) } : item
    );
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
    window.dispatchEvent(new Event("storage"));
  };

  const handleSize = (id, val) => {
    let cart = getCart();
    cart = cart.map((item) =>
      item.id === id ? { ...item, size: val } : item
    );
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  };

  const handleRemove = (id) => {
    const updated = removeFromCart(id);
    setCart(updated);
    window.dispatchEvent(new Event("storage"));
  };

  const handleMoveToWishlist = (item) => {
    toggleWishlist(item);
    handleRemove(item.id);
    window.dispatchEvent(new Event("storage"));
  };

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
    } else {
      // order place logic
    }
  };

  // billing calc — sirf selected items
  const selectedItems = cart.filter((item) => selected[item.id]);
  const mrp = selectedItems.reduce((acc, item) => acc + item.price * 1.3 * item.qty, 0);
  const discount = selectedItems.reduce((acc, item) => acc + item.price * 0.3 * item.qty, 0);
  const deliveryFee = selectedItems.length > 0 ? (mrp - discount > 1099 ? 0 : 79) : 0;
  const total = Math.round(selectedItems.reduce((acc, item) => acc + item.price * item.qty, 0) + deliveryFee);

  return (
    <div className="mt-16 min-h-screen z-20 text-gray-600">

      {/* ADDRESS */}
      {isLoggedIn ? (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Deliver to</p>
            <p className="text-sm font-semibold mt-0.5">{mockAddress.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{mockAddress.address}</p>
          </div>
          <button className="text-xs font-semibold text-blue-500 border border-blue-400 px-3 py-1.5 rounded">
            EDIT
          </button>
        </div>
      ) : (
        <div
          className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 cursor-pointer"
          onClick={() => setShowLogin(true)}
        >
          <div>
            <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Deliver to</p>
            <p className="text-sm text-gray-500 mt-0.5">Login to see your address</p>
          </div>
          <button className="text-xs font-semibold text-blue-500 border border-blue-400 px-3 py-1.5 rounded">
            LOGIN
          </button>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-center px-8">
          <i className="ri-shopping-bag-line text-5xl text-gray-200 mb-4"></i>
          <p className="text-gray-500 text-sm">Your cart is empty</p>
        </div>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="space-y-2 mt-2">
            {cart.map((item) => (
              <div key={item.id} className="bg-white px-4 py-4">

                <div className="flex gap-3">

                  {/* Checkbox */}
                  <div className="flex items-start pt-1">
                    <input
                      type="checkbox"
                      checked={!!selected[item.id]}
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                  </div>

                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-28 object-cover rounded-lg flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1">
                    <h2 className="text-sm font-medium line-clamp-2 leading-snug">{item.name}</h2>
                    <p className="text-xs text-gray-400 capitalize mt-0.5">{item.category}</p>

                    {/* Size + Qty */}
                    <div className="flex gap-2 mt-2">
                      <select
                        value={item.size || "M"}
                        onChange={(e) => handleSize(item.id, e.target.value)}
                        className="border border-gray-200 rounded text-xs px-2 py-1 bg-white"
                      >
                        {sizes.map((s) => (
                          <option key={s} value={s}>Size: {s}</option>
                        ))}
                      </select>

                      <select
                        value={item.qty}
                        onChange={(e) => handleQty(item.id, e.target.value)}
                        className="border border-gray-200 rounded text-xs px-2 py-1 bg-white"
                      >
                        {quantities.map((q) => (
                          <option key={q} value={q}>Qty: {q}</option>
                        ))}
                      </select>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-sm font-semibold">₹{item.price * item.qty}</p>
                      <p className="text-xs text-gray-400 line-through">
                        ₹{Math.round(item.price * 1.3 * item.qty)}
                      </p>
                      <p className="text-xs text-green-600 font-medium">MRP incl. of all taxes</p>
                    </div>
                  </div>
                </div>

                {/* Remove + Move to Wishlist */}
                <div className="flex border-t border-gray-100 mt-3">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="flex-1 py-2 text-xs font-semibold text-gray-600 tracking-widest"
                  >
                    REMOVE
                  </button>
                  <div className="w-px bg-gray-100"></div>
                  <button
                    onClick={() => handleMoveToWishlist(item)}
                    className="flex-1 py-2 text-xs font-semibold text-gray-600 tracking-widest"
                  >
                    MOVE TO WISHLIST
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* BILLING DETAILS */}
          <div className="bg-white mb-20 mt-2 px-4 py-4">
            <h3 className="text-sm font-semibold mb-3 tracking-wide">BILLING DETAILS</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Total MRP</span>
                <span>₹{Math.round(mrp)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discount on MRP</span>
                <span className="text-green-600">- ₹{Math.round(discount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Fee</span>
                <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              {deliveryFee === 0 && (
                <p className="text-xs text-green-600">
                  Yay! Free delivery on this order
                </p>
              )}
              <div className="flex justify-between font-semibold border-t border-gray-100 pt-2 mt-1">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

        </>
      )}

      {/* BOTTOM — Place Order */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between z-40">
          <div>
            <p className="text-lg font-bold">₹{total}</p>
            <p className="text-xs text-blue-500 cursor-pointer underline">VIEW DETAILS</p>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="bg-red-500 text-white px-10 py-3 rounded text-sm font-semibold tracking-widest"
          >
            PLACE ORDER
          </button>
        </div>
      )}

      {/* LOGIN POPUP */}
      {showLogin && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="bg-white rounded-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">Login / Signup</h2>
              <button onClick={() => setShowLogin(false)}>
                <i className="ri-close-line text-xl text-gray-500"></i>
              </button>
            </div>

            {/* Phone */}
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone Number"
              className="w-full border border-gray-200 rounded px-4 py-3 text-sm mb-4 outline-none"
            />

            <button className="w-full bg-red-500 text-white py-3 rounded text-sm font-semibold tracking-widest mb-4">
              CONTINUE
            </button>

            {/* OR */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Social */}
            <div className="flex justify-center gap-8">
              <button className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">f</span>
                </div>
                <span className="text-xs text-gray-500">FACEBOOK</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                  <span className="text-red-500 font-bold text-lg">G</span>
                </div>
                <span className="text-xs text-gray-500">GOOGLE</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}