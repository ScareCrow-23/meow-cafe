"use client";
import React, { useState, useEffect } from "react";

// Define a type for menu items
interface MenuItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
}

interface MenuItemsProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuItems({ onAddToCart }: MenuItemsProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/menu");
        if (!res.ok) throw new Error("Failed to fetch menu items");
        const data: { success: boolean; data: MenuItem[] } = await res.json();
        setMenuItems(data.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto py-24 text-center">
        <p className="text-lg text-muted">Loading menu...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto py-24 text-center">
        <p className="text-lg text-red-500">{error}</p>
      </section>
    );
  }

  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <section className="container mx-auto py-20 md:py-28">
      {categories.map((category) => (
        <div key={category} id={category.toLowerCase()} className="mb-20">
          {/* Category Heading */}
          <div className="flex items-center justify-center mb-10">
            <span className="h-[1px] w-12 bg-primary/30"></span>
            <h2 className="mx-6 text-3xl md:text-5xl font-light tracking-wide text-primary">
              {category}
            </h2>
            <span className="h-[1px] w-12 bg-primary/30"></span>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-0">
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <div
                  key={item._id}
                  className="bg-secondary/80 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={
                        item.image ||
                        "https://placehold.co/600x400/171717/ededed?text=No+Image"
                      }
                      alt={item.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-6 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-muted mb-4">
                        {item.description}
                      </p>
                    )}
                    <p className="text-lg font-bold text-primary mb-6">
                      ₹{item.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="mt-auto bg-primary hover:bg-opacity-90 transition-all duration-300 text-foreground font-medium py-2 px-6 rounded-full shadow-lg"
                    >
                      Add to Order
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}
