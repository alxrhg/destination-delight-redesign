import { Heart, Check, Share2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingActionBarProps {
  isSaved: boolean;
  isVisited: boolean;
  onSave: () => void;
  onVisited: () => void;
  onShare: () => void;
  onBook?: () => void;
  website?: string;
}

export function FloatingActionBar({
  isSaved,
  isVisited,
  onSave,
  onVisited,
  onShare,
  onBook,
  website,
}: FloatingActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent pointer-events-none md:hidden">
      <div className="flex items-center gap-2 pointer-events-auto">
        <Button
          variant="outline"
          size="icon"
          onClick={onSave}
          className={cn(
            "rounded-full h-12 w-12 shadow-medium border-0 bg-card",
            isSaved && "text-primary"
          )}
        >
          <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onVisited}
          className={cn(
            "rounded-full h-12 w-12 shadow-medium border-0 bg-card",
            isVisited && "text-accent"
          )}
        >
          <Check className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onShare}
          className="rounded-full h-12 w-12 shadow-medium border-0 bg-card"
        >
          <Share2 className="h-5 w-5" />
        </Button>

        {website && (
          <Button
            asChild
            className="flex-1 h-12 rounded-full shadow-medium gap-2"
          >
            <a href={website} target="_blank" rel="noopener noreferrer">
              <Globe className="h-5 w-5" />
              Visit Website
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
