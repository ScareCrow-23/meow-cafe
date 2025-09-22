import React from "react";

// For a full-featured app, this data would come from a backend API.
const menuCategories = [
  { name: "Coffee", link: "#coffee" },
  { name: "Tea", link: "#tea" },
  { name: "Pastries", link: "#pastries" },
  { name: "Snacks", link: "#snacks" },
];

export default function MenuNavigation() {
  return (
    <nav className="container mx-auto py-8">
      <div className="flex flex-wrap justify-center gap-4 p-2 bg-secondary rounded-md shadow-lg">
        {menuCategories.map((category) => (
          <a
            key={category.name}
            href={category.link}
            className="py-2 px-6 font-semibold rounded-full transition-colors duration-200 hover:bg-primary hover:text-background"
          >
            {category.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
