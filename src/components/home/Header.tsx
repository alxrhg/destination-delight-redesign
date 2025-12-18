import { Search, User, Menu, Map } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-[#F8F6F3]/95 backdrop-blur-md border-b border-gray-200/50" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-light tracking-[0.2em] uppercase text-gray-900">
            Urban Manual
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          <Link to="/" className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
            Destinations
          </Link>
          <Link to="/trip" className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1.5">
            <Map className="h-4 w-4" />
            Trip Planner
          </Link>
          <a href="#" className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
            Collections
          </a>
          <a href="#" className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors">
            About
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex w-10 h-10 rounded-full items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all">
            <Search className="h-5 w-5" />
          </button>

          <button className="hidden md:flex w-10 h-10 rounded-full items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all">
            <User className="h-5 w-5" />
          </button>

          {/* Mobile menu */}
          <button className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-700">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
