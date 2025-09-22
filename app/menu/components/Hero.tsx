import React from "react";

export default function MenuHero() {
  return (
    <div className="relative w-full py-24 md:py-32 flex items-center justify-center bg-background">
      {/* Content */}
      <div className="relative z-10 text-center text-foreground flex flex-col items-center p-6">
        <h1 className="text-5xl md:text-7xl font-light tracking-widest leading-tight mb-4">
          Our Menu
        </h1>
        <p className="max-w-xl text-lg md:text-xl font-light mb-8">
          Crafted with care, served with passion. Explore our selections.
        </p>
      </div>
    </div>
  );
}
