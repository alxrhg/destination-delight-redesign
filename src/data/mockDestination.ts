import { Destination } from '@/types/destination';
import heroHotel from '@/assets/hero-hotel.jpg';
import restaurantInterior from '@/assets/restaurant-interior.jpg';
import hotelRoom from '@/assets/hotel-room.jpg';
import cocktailBar from '@/assets/cocktail-bar.jpg';
import hotelLobby from '@/assets/hotel-lobby.jpg';

export const mockDestination: Destination = {
  id: '1',
  name: 'The Hoxton, Paris',
  tagline: 'Where bohemian spirit meets Parisian elegance',
  description: `Nestled in the heart of the 2nd arrondissement, The Hoxton Paris occupies an 18th-century hôtel particulier that once housed the personal court of the Duc de Choiseul. This isn't just a hotel—it's a time capsule wrapped in contemporary cool.

The lobby spills into Rivié, an all-day restaurant and bar that feels like stumbling into a friend's impossibly chic apartment. Velvet banquettes, brass fixtures, and towering ceilings create a space that locals and travelers alike have adopted as their own.

Each of the 172 rooms tells its own story through original architectural details—ornate moldings, chevron parquet floors, and working marble fireplaces—married with custom furnishings and contemporary art. The smallest "Shoebox" rooms prove that great design needs no square footage, while the larger categories offer space to spread out and stay awhile.`,
  heroImage: heroHotel,
  gallery: [
    restaurantInterior,
    hotelRoom,
    cocktailBar,
    hotelLobby,
  ],
  
  address: '30-32 Rue du Sentier',
  city: 'Paris',
  country: 'France',
  coordinates: {
    lat: 48.8686,
    lng: 2.3461,
  },
  
  category: 'hotel',
  tags: ['Boutique Hotel', 'Design Hotel', 'Historic Building', 'Restaurant', 'Bar'],
  badges: [
    { type: 'featured', label: 'Editor\'s Pick' },
    { type: 'award', label: 'Design Award 2023' },
  ],
  
  architect: {
    name: 'Soho House Design',
    firm: 'Soho House & Co',
    bio: 'The in-house design team behind Soho House properties worldwide, known for their signature mix of vintage finds, contemporary art, and eclectic comfort.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    notableWorks: ['Soho House Berlin', 'The Ned London', 'Soho Farmhouse'],
  },
  designer: {
    name: 'Humbert & Poyet',
    firm: 'Humbert & Poyet Architecture',
    bio: 'Monaco-based architects Emil Humbert and Christophe Poyet are known for their refined yet playful interiors that honor history while embracing modernity.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    notableWorks: ['Beefbar Monaco', 'Song Qi Monaco', 'La Môme Paris'],
  },
  yearBuilt: 1780,
  architecturalStyle: 'Neoclassical / Contemporary',
  designHighlights: [
    'Original 18th-century moldings and chevron parquet',
    'Working marble fireplaces in select rooms',
    'Custom terrazzo flooring in bathrooms',
    'Curated vintage furniture from Parisian flea markets',
  ],
  
  phone: '+33 1 85 65 75 00',
  email: 'paris@thehoxton.com',
  website: 'https://thehoxton.com/paris',
  hours: {
    monday: '24 hours',
    tuesday: '24 hours',
    wednesday: '24 hours',
    thursday: '24 hours',
    friday: '24 hours',
    saturday: '24 hours',
    sunday: '24 hours',
    notes: 'Rivié restaurant: 7am - 11pm daily',
  },
  
  rating: 4.6,
  reviewCount: 2847,
  reviews: [
    {
      id: '1',
      author: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      rating: 5,
      date: '2024-01-15',
      text: 'Absolutely stunning property. The attention to detail is remarkable—from the vintage brass fixtures to the perfectly curated art on every wall. Staff made us feel like regulars from the moment we arrived.',
      source: 'google',
    },
    {
      id: '2',
      author: 'James L.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      rating: 5,
      date: '2024-01-10',
      text: 'The Rivié restaurant alone is worth the trip. Incredible atmosphere, great cocktails, and the breakfast spread is one of the best I\'ve had in Paris. The room was compact but beautifully designed.',
      source: 'google',
    },
    {
      id: '3',
      author: 'Emma K.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      rating: 4,
      date: '2024-01-05',
      text: 'Love the location and the design. The lobby is a perfect place to work or meet friends. Only wish the "Cosy" room was a bit larger, but the quality and charm more than made up for it.',
      source: 'google',
    },
  ],
  
  nestedDestinations: [
    {
      id: 'n1',
      name: 'Rivié',
      category: 'Restaurant & Bar',
      image: restaurantInterior,
      description: 'All-day Parisian brasserie with soaring ceilings and an eclectic crowd',
    },
    {
      id: 'n2',
      name: 'Jacques\' Bar',
      category: 'Cocktail Bar',
      image: cocktailBar,
      description: 'Intimate basement bar serving inventive cocktails until late',
    },
  ],
  
  similarDestinations: [
    {
      id: 's1',
      name: 'The Hoxton, Amsterdam',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80',
      city: 'Amsterdam',
      category: 'Hotel',
      rating: 4.5,
    },
    {
      id: 's2',
      name: 'Hôtel Providence',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80',
      city: 'Paris',
      category: 'Hotel',
      rating: 4.7,
    },
    {
      id: 's3',
      name: 'The Ned NoMad',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
      city: 'New York',
      category: 'Hotel',
      rating: 4.4,
    },
  ],
  
  isSaved: false,
  isVisited: false,
  priceLevel: 3,
  
  microDescriptions: [
    { icon: 'Bed', label: 'Rooms', value: '172 rooms' },
    { icon: 'Building2', label: 'Style', value: 'Boutique' },
    { icon: 'Utensils', label: 'Dining', value: 'On-site restaurant' },
    { icon: 'Wifi', label: 'Amenities', value: 'Free WiFi' },
    { icon: 'PawPrint', label: 'Pets', value: 'Pet-friendly' },
    { icon: 'Clock', label: 'Check-in', value: '3 PM' },
  ],
};
