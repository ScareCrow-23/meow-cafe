import Image from "next/image";
import React from "react";

const testimonials = [
  {
    quote:
      "The Daily Grind has the most exquisite coffee I've ever tasted. The ambiance is perfect for a quiet afternoon.",
    name: "Jane Doe",
    image: "https://placehold.co/100x100/171717/ededed?text=JD",
  },
  {
    quote:
      "I'm obsessed with their pastries. They are fresh, flaky, and pair perfectly with their brew. A truly wonderful experience!",
    name: "John Smith",
    image: "https://placehold.co/100x100/171717/ededed?text=JS",
  },
  {
    quote:
      "A must-visit for any coffee lover. The staff are incredibly knowledgeable and the service is always impeccable.",
    name: "Alice Johnson",
    image: "https://placehold.co/100x100/171717/ededed?text=AJ",
  },
];

export default function Testimonials() {
  return (
    <section className="container mx-auto py-20 md:py-28 text-center">
      <h2 className="text-4xl md:text-5xl font-light tracking-widest text-primary mb-16">
        What Our Guests Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-0">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative bg-secondary p-10 rounded-xl shadow-xl transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Decorative Quote Mark */}
            <span className="absolute top-6 left-6 text-6xl text-primary opacity-20 select-none">
              “
            </span>

            {/* Content */}
            <div className="relative flex flex-col items-center">
              <Image
                src={testimonial.image}
                alt={`Profile of ${testimonial.name}`}
                width={80} // 20 * 4px (Tailwind default scale) → adjust as needed
                height={80}
                className="rounded-full mb-6 object-cover border-4 border-primary shadow-md"
              />
              <p className="text-muted text-lg leading-relaxed mb-6 italic">
                {testimonial.quote}
              </p>
              <p className="text-base font-semibold text-foreground tracking-wide uppercase">
                {testimonial.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
