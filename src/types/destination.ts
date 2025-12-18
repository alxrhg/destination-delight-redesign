export interface DestinationDetail {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  city: string;
  country: string;
  heroImage: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3 | 4;
  badges: { type: string; label: string }[];
  highlights: string[];
  amenities: { icon: string; label: string }[];
  hours: { day: string; time: string }[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  reviews: {
    id: string;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    text: string;
  }[];
}

export interface Destination {
  id: string;
  name: string;
  category: string;
  city: string;
  country?: string;
  image: string;
  rating?: number;
}

export interface City {
  id: string;
  name: string;
  count: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
