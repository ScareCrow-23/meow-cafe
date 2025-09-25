"use client";
import React, { useState } from "react";

interface CartItem {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

interface FormData {
  name: string;
  email: string;
  contactNumber: string;
  deliveryMethod: "Dine-in" | "Delivery";
  tableNumber: string;
  deliveryAddress: string;
}

export default function OrderSummary({
  cart = [],
  onUpdateQuantity,
  onRemoveItem,
}: OrderSummaryProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contactNumber: "",
    deliveryMethod: "Dine-in",
    tableNumber: "",
    deliveryAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (cart.length === 0) return;

    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...formData,
        order: cart.map((item) => ({
          menuItem: item._id || item.id, // backend expects Mongo _id
          quantity: item.quantity,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Order placed successfully!");
      } else {
        setMessage("❌ " + data.error);
      }
    } catch (err) {
      setMessage("❌ Something went wrong while placing your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto py-16 md:py-24">
      <div className="bg-secondary p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-light tracking-wide text-primary mb-6">
          Order Summary
        </h2>

        {cart.length === 0 ? (
          <p className="text-muted italic text-center text-lg">
            Your cart is empty.
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <ul className="divide-y divide-gray-700">
              {cart.map((item) => {
                const itemId = item._id || item.id!;
                return (
                  <li
                    key={itemId}
                    className="py-4 flex items-center justify-between"
                  >
                    <div className="flex-1 flex flex-col">
                      <p className="text-lg font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(itemId, item.quantity - 1)
                          }
                          className="bg-primary/20 hover:bg-primary/50 text-foreground w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-lg text-foreground font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(itemId, item.quantity + 1)
                          }
                          className="bg-primary/20 hover:bg-primary/50 text-foreground w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(itemId)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        aria-label={`Remove ${item.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Subtotal */}
            <div className="mt-6 pt-6 border-t border-gray-700 flex justify-between items-center font-bold text-xl text-foreground">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* Checkout Form */}
            <div className="mt-6 space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-2 rounded bg-gray-800 text-foreground"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-2 rounded bg-gray-800 text-foreground"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                className="w-full p-2 rounded bg-gray-800 text-foreground"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              <select
                name="deliveryMethod"
                className="w-full p-2 rounded bg-gray-800 text-foreground"
                value={formData.deliveryMethod}
                onChange={handleChange}
              >
                <option value="Dine-in">Dine-in</option>
                <option value="Delivery">Delivery</option>
              </select>
              {formData.deliveryMethod === "Dine-in" && (
                <input
                  type="number"
                  name="tableNumber"
                  placeholder="Table Number"
                  className="w-full p-2 rounded bg-gray-800 text-foreground"
                  value={formData.tableNumber}
                  onChange={handleChange}
                />
              )}
              {formData.deliveryMethod === "Delivery" && (
                <input
                  type="text"
                  name="deliveryAddress"
                  placeholder="Delivery Address"
                  className="w-full p-2 rounded bg-gray-800 text-foreground"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-8 w-full bg-primary hover:bg-opacity-80 transition-all duration-300 text-foreground font-semibold py-3 px-8 rounded-full shadow-lg"
            >
              {loading ? "Placing Order..." : "Proceed to Checkout"}
            </button>

            {message && (
              <p className="mt-4 text-center text-lg font-medium">{message}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
