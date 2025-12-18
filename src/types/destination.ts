export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  gallery: string[];
  
  // Location
  address: string;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  
  // Categories & Tags
  category: 'hotel' | 'restaurant' | 'bar' | 'cafe' | 'museum' | 'landmark';
  tags: string[];
  badges: Badge[];
  
  // Architecture & Design
  architect?: ArchitectInfo;
  designer?: DesignerInfo;
  yearBuilt?: number;
  architecturalStyle?: string;
  designHighlights?: string[];
  
  // Contact & Hours
  phone?: string;
  email?: string;
  website?: string;
  hours: BusinessHours;
  
  // Reviews
  rating: number;
  reviewCount: number;
  reviews: Review[];
  
  // Relationships
  nestedDestinations?: NestedDestination[];
  similarDestinations?: SimilarDestination[];
  
  // User Interaction State
  isSaved?: boolean;
  isVisited?: boolean;
  visitedDate?: string;
  
  // Pricing
  priceLevel?: 1 | 2 | 3 | 4;
  
  // Micro descriptions
  microDescriptions: MicroDescription[];
}

export interface Badge {
  type: 'featured' | 'new' | 'trending' | 'award' | 'verified';
  label: string;
  icon?: string;
}

export interface ArchitectInfo {
  name: string;
  firm?: string;
  bio?: string;
  image?: string;
  notableWorks?: string[];
}

export interface DesignerInfo {
  name: string;
  firm?: string;
  bio?: string;
  image?: string;
  notableWorks?: string[];
}

export interface BusinessHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  source: 'google' | 'tripadvisor' | 'yelp';
}

export interface NestedDestination {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
}

export interface SimilarDestination {
  id: string;
  name: string;
  image: string;
  city: string;
  category: string;
  rating: number;
}

export interface MicroDescription {
  icon: string;
  label: string;
  value: string;
}
