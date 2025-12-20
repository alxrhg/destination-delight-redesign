'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, Sun, Moon } from 'lucide-react';

const sitemapSections = [
  {
    title: 'Pages',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Trip Planner', href: '/trip' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'All Cities', href: '/' },
      { label: 'Restaurants', href: '/' },
      { label: 'Hotels', href: '/' },
      { label: 'Cafes', href: '/' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'About', href: '/' },
      { label: 'Contact', href: '/' },
      { label: 'Privacy Policy', href: '/' },
    ],
  },
];

export function Footer() {
  const [isSitemapExpanded, setIsSitemapExpanded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <footer
      className="mt-20 border-t border-gray-200 dark:border-gray-800 relative"
      role="contentinfo"
    >
      <div className="w-full px-6 md:px-10 lg:px-12 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div>© {new Date().getFullYear()} Urban Manual. All Rights Reserved.</div>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              to="/"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
            <button
              onClick={() => setIsSitemapExpanded(!isSitemapExpanded)}
              className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-expanded={isSitemapExpanded}
              aria-controls="footer-sitemap"
            >
              Sitemap
              {isSitemapExpanded ? (
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <Link
              to="/"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Expandable Sitemap */}
      {isSitemapExpanded && (
        <div
          id="footer-sitemap"
          className="w-full px-6 md:px-10 lg:px-12 py-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
              {sitemapSections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xs font-medium text-gray-900 dark:text-white mb-2">
                    {section.title}
                  </h2>
                  <nav className="space-y-1">
                    {section.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        to={link.href}
                        className="block text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
