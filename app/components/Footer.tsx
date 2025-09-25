import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer className="bg-secondary/60 backdrop-blur-sm border-t border-primary/20">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Typography
            variant="h5"
            sx={{
              color: "var(--foreground)",
              fontWeight: 300,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontFamily: "inherit",
            }}
          >
            The Daily Grind
          </Typography>
          <p className="text-muted mt-3 text-sm leading-relaxed">
            A cozy corner where coffee meets community. Crafted flavors,
            heartfelt service, and timeless ambience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/menu"
                className="text-muted hover:text-primary transition-colors"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-muted hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/reservations"
                className="text-muted hover:text-primary transition-colors"
              >
                Reservations
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-muted hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4">
            Get in Touch
          </h4>
          <ul className="space-y-3 text-muted text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-primary" /> +91 11-41729511
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-primary" /> info@thedailygrind.com
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-primary mt-1" />
              <span>The Daily Grind, Navi Mumbai</span>
            </li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4">
            Stay Connected
          </h4>
          <div className="flex gap-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://instagram.com/youbescafe"
              target="_blank"
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition"
            >
              <Instagram size={18} />
            </a>
          </div>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 bg-secondary border border-primary/20 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-opacity-90 transition-all text-foreground font-medium py-2 px-6 rounded-full text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary/20 mt-8 py-4 text-center text-sm text-muted">
        © {new Date().getFullYear()} The Daily Grind. All rights reserved.
      </div>
    </footer>
  );
}
