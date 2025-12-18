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
