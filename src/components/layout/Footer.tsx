import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      {/* Top feature badges bar */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Fast Delivery */}
            <div className="w-full max-w-70 mx-auto sm:max-w-none sm:mx-0 flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100">
                  Fast Delivery
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Free shipping on orders over $50
                </p>
              </div>
            </div>

            {/* Secure Checkout */}
            <div className="w-full max-w-70 mx-auto sm:max-w-none sm:mx-0 flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100">
                  Secure Checkout
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Protected payments & verified data
                </p>
              </div>
            </div>

            {/* Easy Returns */}
            <div className="w-full max-w-70 mx-auto sm:max-w-none sm:mx-0 flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100">
                  Easy Returns
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  30-day hassle-free return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand info & Socials */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="w-full max-w-70 sm:max-w-none flex flex-col items-center sm:items-start space-y-4">
              {/* Clickable logo returning to top */}
              <Link
                to="/"
                onClick={scrollToTop}
                className="flex items-center gap-3 cursor-pointer group"
                title="Go to top of catalog"
              >
                <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-emerald-600 to-teal-500 text-white font-extrabold flex items-center justify-center font-heading text-base shadow-sm group-hover:scale-105 transition-transform duration-200">
                  10X
                </div>
                <span className="font-heading font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                  10X{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">
                    SHOP
                  </span>
                </span>
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-center sm:text-left">
                Your premier online shopping destination for top-tier
                electronics, fashion, and everyday essentials.
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-2 pt-1">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/khatuna.chitishvili/?locale=ka_GE"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-slate-600 dark:text-slate-300 hover:text-white dark:hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/kh.chitishvili/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-slate-600 dark:text-slate-300 hover:text-white dark:hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/khatuna-chitishvili/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-slate-600 dark:text-slate-300 hover:text-white dark:hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
              Shop & Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  onClick={scrollToTop}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  View Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/checkout"
                  onClick={scrollToTop}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Checkout
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={scrollToTop}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
              Customer Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/orders"
                  onClick={scrollToTop}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <span className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer">
                  Shipping Policy
                </span>
              </li>
              <li>
                <span className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer">
                  Returns & Refunds
                </span>
              </li>
              <li>
                <span className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer">
                  Privacy & Terms
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
              Contact Us
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400 flex flex-col items-center sm:items-start">
              <li className="flex items-start gap-2.5 max-w-xs text-left">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  42 Rustaveli Avenue, 10X Plaza, Tbilisi, Georgia
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <a
                  href="tel:577189011"
                  className="text-xs hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
                >
                  +995 577 18 90 11
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <a
                  href="mailto:chitishvili.kh@gmail.com"
                  className="text-xs hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium break-all"
                >
                  chitishvili.kh@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} 10X Shop. All rights reserved.</p>
          <p>Secure online shopping experience</p>
        </div>
      </div>
    </footer>
  );
}
