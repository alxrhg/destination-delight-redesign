import { DestinationDetail } from '@/types/destination';

export const mockDestinationDetail: DestinationDetail = {
  id: '1',
  name: 'The Hoxton, Paris',
  tagline: 'Where bohemian spirit meets Parisian elegance',
  description: `Nestled in the heart of the 2nd arrondissement, The Hoxton Paris occupies an 18th-century hôtel particulier that once housed the personal court of the Duc de Choiseul. This isn't just a hotel—it's a time capsule wrapped in contemporary cool.

The lobby spills into Rivié, an all-day restaurant and bar that feels like stumbling into a friend's impossibly chic apartment. Velvet banquettes, brass fixtures, and towering ceilings create a space that locals and travelers alike have adopted as their own.

Each of the 172 rooms tells its own story through original architectural details—ornate moldings, chevron parquet floors, and working marble fireplaces—married with custom furnishings and contemporary art.`,
  category: 'Hotel',
  city: 'Paris',
  country: 'France',
  heroImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  ],
  rating: 4.6,
  reviewCount: 2847,
  priceLevel: 3,
  badges: [
    { type: 'featured', label: "Editor's Pick" },
    { type: 'award', label: 'Design Award 2023' },
  ],
  highlights: [
    'Original 18th-century architecture',
    'Rooftop terrace with city views',
    'On-site restaurant & cocktail bar',
    'Pet-friendly rooms available',
  ],
  amenities: [
    { icon: 'Wifi', label: 'Free WiFi' },
    { icon: 'Coffee', label: 'In-room coffee' },
    { icon: 'Utensils', label: 'Restaurant' },
    { icon: 'Wine', label: 'Bar' },
    { icon: 'PawPrint', label: 'Pet-friendly' },
    { icon: 'Clock', label: '24/7 Front desk' },
  ],
  hours: [
    { day: 'Check-in', time: '3:00 PM' },
    { day: 'Check-out', time: '11:00 AM' },
    { day: 'Restaurant', time: '7 AM - 11 PM' },
    { day: 'Bar', time: '5 PM - 1 AM' },
  ],
  contact: {
    phone: '+33 1 85 65 75 00',
    email: 'paris@thehoxton.com',
    website: 'https://thehoxton.com/paris',
    address: '30-32 Rue du Sentier, 75002 Paris, France',
  },
  coordinates: {
    lat: 48.8686,
    lng: 2.3469,
  },
  reviews: [
    {
      id: '1',
      author: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      rating: 5,
      date: '2024-01-15',
      text: 'Absolutely stunning property. The attention to detail is remarkable—from the vintage brass fixtures to the perfectly curated art on every wall.',
    },
    {
      id: '2',
      author: 'James L.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      rating: 5,
      date: '2024-01-10',
      text: "The Rivié restaurant alone is worth the trip. Incredible atmosphere, great cocktails, and the breakfast spread is one of the best I've had in Paris.",
    },
    {
      id: '3',
      author: 'Emma K.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      rating: 4,
      date: '2024-01-05',
      text: 'Love the location and the design. The lobby is a perfect place to work or meet friends. Only wish the room was a bit larger.',
    },
  ],
};
