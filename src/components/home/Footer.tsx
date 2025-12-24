'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

export function Footer() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <footer
      className="mt-24 border-t border-border relative"
      role="contentinfo"
    >
      <div className="w-full px-8 md:px-12 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link to="/" className="font-display text-2xl text-foreground">
                Urban Manual
              </Link>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
                A curated collection of destinations for those who understand that how we live is expressed through the places we inhabit.
              </p>
            </div>

            {/* Navigation */}
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  Explore
                </h3>
                <nav className="space-y-3">
                  <Link
                    to="/"
                    className="block text-sm text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Destinations
                  </Link>
                  <Link
                    to="/trip"
                    className="block text-sm text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Trip Planner
                  </Link>
                </nav>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  Categories
                </h3>
                <nav className="space-y-3">
                  <Link
                    to="/"
                    className="block text-sm text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Restaurants
                  </Link>
                  <Link
                    to="/"
                    className="block text-sm text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Hotels
                  </Link>
                  <Link
                    to="/"
                    className="block text-sm text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Cafes
                  </Link>
                </nav>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  Information
                </h3>
                <nav className="space-y-3">
                  <Link
                    to="/"
                    className="block text-sm text-foreground hover:text-muted-foreground transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    to="/"
                    className="block text-sm text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    to="/"
                    className="block text-sm text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Privacy
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground tracking-wide">
              © {new Date().getFullYear()} Urban Manual. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
