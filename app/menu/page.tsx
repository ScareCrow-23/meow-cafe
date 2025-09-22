"use client";
import React, { useState } from "react";
import HeroSection from "./components/Hero";
import MenuNavigation from "./components/MenuNavigation";
import MenuItems from "./components/MenuItems";
import OrderSummary from "./components/OrderSummary";

export default function MenuPage() {
  const [cart, setCart] = useState<any[]>([]);

  const handleAddToCart = (item: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(newQty, 1) } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  return (
    <>
      <HeroSection />
      {/* <MenuNavigation /> */}

      {/* Two-column layout: Menu + Order summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu section */}
        <div className="lg:col-span-2">
          <MenuItems onAddToCart={handleAddToCart} />
        </div>

        {/* Order summary */}
        <div>
          <OrderSummary
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      </div>
    </>
  );
}
