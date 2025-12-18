import { Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F6F3]/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-gray-900 tracking-tight">
            Urban Manual<sup className="text-xs">®</sup>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Destinations
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Collections
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            About
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="hidden sm:flex items-center gap-2 h-10 px-4 rounded-full bg-white border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition-colors">
            <Search className="h-4 w-4" />
            <span>Search</span>
            <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 rounded border border-gray-200">⌘K</kbd>
          </button>

          {/* Account */}
          <Button 
            variant="outline" 
            className="h-10 px-4 gap-2 rounded-full bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </Button>

          {/* Mobile menu */}
          <button className="md:hidden w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
