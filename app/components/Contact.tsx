"use client";
import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setStatus({
        type: "success",
        message: "Your message has been sent successfully!",
      });
      setFormData({ name: "", email: "", message: "" }); // reset form
    } catch (err: unknown) {
      setStatus({
        type: "error",
        message:
          err instanceof Error ? err.message : "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto py-20 md:py-28">
      <div className="flex flex-col md:flex-row gap-16 px-4 md:px-0">
        {/* Contact Form Section */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-light tracking-widest text-primary mb-6">
            Let’s Connect
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-10">
            Have a question, suggestion, or just want to say hi? We’d love to
            hear from you — drop us a message below.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-4 py-4 bg-secondary text-foreground rounded-lg border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
              />
              <label className="absolute left-4 top-2 text-muted text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary">
                Your Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-4 py-4 bg-secondary text-foreground rounded-lg border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
              />
              <label className="absolute left-4 top-2 text-muted text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary">
                Your Email
              </label>
            </div>

            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                rows={4}
                className="peer w-full px-4 py-4 bg-secondary text-foreground rounded-lg border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all resize-none"
              />
              <label className="absolute left-4 top-2 text-muted text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary">
                Your Message
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="self-start bg-primary hover:bg-opacity-90 transition-all duration-300 text-foreground font-semibold py-3 px-10 rounded-full shadow-lg disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Success/Error Messages */}
          {status && (
            <p
              className={`mt-4 text-sm ${
                status.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.message}
            </p>
          )}
        </div>

        {/* Map & Hours Section */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-2xl font-light tracking-wide text-primary mb-4">
            Visit Us
          </h3>
          <div className="relative w-full h-72 overflow-hidden rounded-xl shadow-lg mb-10">
            <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">Map Placeholder</span>
            </div>
          </div>

          <h3 className="text-2xl font-light tracking-wide text-primary mb-4">
            Hours of Operation
          </h3>
          <ul className="text-muted text-lg leading-relaxed divide-y divide-primary/10">
            <li className="py-2 flex justify-between">
              <span>Monday - Friday</span>
              <span>8am - 6pm</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Saturday</span>
              <span>9am - 5pm</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Sunday</span>
              <span>9am - 4pm</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
