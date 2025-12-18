import { useState } from 'react';
import { Bookmark, Check, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ActionButtonsProps {
  isSaved: boolean;
  isVisited: boolean;
  onSave: () => void;
  onVisited: () => void;
  onShare: () => void;
  variant?: 'hero' | 'default';
}

export function ActionButtons({
  isSaved,
  isVisited,
  onSave,
  onVisited,
  onShare,
  variant = 'default',
}: ActionButtonsProps) {
  const isHero = variant === 'hero';

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onSave}
        className={cn(
          "rounded-full transition-all duration-300",
          isHero 
            ? "bg-background/20 backdrop-blur-sm hover:bg-background/40 text-primary-foreground" 
            : "hover:bg-secondary",
          isSaved && "text-primary"
        )}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-all",
            isSaved && "fill-current scale-110"
          )}
        />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onVisited}
        className={cn(
          "rounded-full transition-all duration-300",
          isHero 
            ? "bg-background/20 backdrop-blur-sm hover:bg-background/40 text-primary-foreground" 
            : "hover:bg-secondary",
          isVisited && "text-accent"
        )}
      >
        <Check
          className={cn(
            "h-5 w-5 transition-all",
            isVisited && "scale-110"
          )}
        />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onShare}
        className={cn(
          "rounded-full transition-all duration-300",
          isHero 
            ? "bg-background/20 backdrop-blur-sm hover:bg-background/40 text-primary-foreground" 
            : "hover:bg-secondary"
        )}
      >
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
