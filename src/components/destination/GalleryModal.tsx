import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface GalleryModalProps {
  images: string[];
  initialIndex?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GalleryModal({
  images,
  initialIndex = 0,
  open,
  onOpenChange,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-charcoal border-0 overflow-hidden">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-50 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 text-primary-foreground"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Image counter */}
        <div className="absolute top-4 left-4 z-50 px-3 py-1.5 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Main image */}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain animate-fade-in"
            key={currentIndex}
          />
        </div>

        {/* Navigation */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 text-primary-foreground h-12 w-12"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 text-primary-foreground h-12 w-12"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Thumbnail strip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-full bg-background/20 backdrop-blur-sm">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-12 h-12 rounded-lg overflow-hidden transition-all duration-200",
                currentIndex === index
                  ? "ring-2 ring-primary-foreground scale-110"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
