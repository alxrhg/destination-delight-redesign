import { Review } from '@/types/destination';
import { Star, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4",
            star <= rating
              ? "fill-gold text-gold"
              : "text-stone"
          )}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const formattedDate = new Date(review.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card className="bg-card shadow-soft border-0 h-full">
      <CardContent className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.avatar} alt={review.author} />
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              {review.author.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate">
              {review.author}
            </h4>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
          <StarRating rating={review.rating} />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {review.text}
        </p>
      </CardContent>
    </Card>
  );
}

export function ReviewsSection({ reviews, rating, reviewCount }: ReviewsSectionProps) {
  const topReviews = reviews.slice(0, 3);

  return (
    <section id="reviews" className="py-12 md:py-16">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Reviews
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-display font-semibold text-foreground">
                  {rating}
                </span>
                <StarRating rating={Math.round(rating)} />
              </div>
              <span className="text-muted-foreground">
                Based on {reviewCount.toLocaleString()} reviews
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="self-start sm:self-auto gap-2 rounded-full"
          >
            See all reviews
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {topReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
