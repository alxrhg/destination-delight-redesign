import { Search, User, TreeDeciduous } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-foreground tracking-tight">
            Urban Manual<sup className="text-xs">®</sup>
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <TreeDeciduous className="h-5 w-5 text-muted-foreground hidden sm:block" />
          
          {/* Search shortcut */}
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground text-sm hover:bg-secondary/80 transition-colors">
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-muted rounded">⌘K</kbd>
          </button>

          {/* Trips */}
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Trips
          </Button>

          {/* Account */}
          <Button variant="outline" className="gap-2 rounded-full border-border/60">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
