'use client';

import { useState } from 'react';
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
      className="mt-6 md:mt-8 relative z-30 bg-white dark:bg-gray-950 w-full"
      role="banner"
    >
      {/* Primary Nav */}
      <div className="w-full px-6 md:px-10">
        <nav
          className="flex items-center justify-between py-4 w-full"
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className="font-medium text-sm hover:opacity-70 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 rounded-lg py-2 shrink-0"
            aria-label="Go to homepage"
          >
            Urban Manual®
          </Link>

          <div className="flex items-center gap-1.5">
            {/* Trips button - ghost style */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/trip')}
                  aria-label="View trips"
                >
                  <Map className="w-4 h-4" />
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
                  className="bg-black dark:bg-white text-white dark:text-black hover:opacity-80"
                >
                  <User className="w-4 h-4" />
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
