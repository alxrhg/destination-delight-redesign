'use client';

import { Link, useNavigate } from 'react-router-dom';
import { User, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Header() {
  const navigate = useNavigate();

  return (
    <header
      className="relative z-30 w-full bg-background"
      role="banner"
    >
      {/* Primary Nav */}
      <div className="w-full px-8 md:px-12 lg:px-16">
        <nav
          className="flex items-center justify-between py-6 md:py-8 w-full border-b border-border"
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className="font-display text-xl md:text-2xl tracking-tight text-foreground hover:text-muted-foreground transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 rounded py-1"
            aria-label="Go to homepage"
          >
            Urban Manual
          </Link>

          <div className="flex items-center gap-3">
            {/* Trips button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/trip')}
                  aria-label="View trips"
                  className="text-xs uppercase tracking-widest font-normal text-muted-foreground hover:text-foreground hover:bg-transparent"
                >
                  <Map className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Trips</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Plan a trip</p>
              </TooltipContent>
            </Tooltip>

            {/* Sign In button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  aria-label="Sign in"
                  className="text-xs uppercase tracking-widest font-normal px-6"
                >
                  <User className="w-4 h-4 mr-2" />
                  <span>Sign In</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sign in to save trips</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </nav>
      </div>
    </header>
  );
}
