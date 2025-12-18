import { Destination, City, Category } from '@/types/destination';

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'The Nickel Hotel',
    category: 'Hotel',
    city: 'Charleston',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  },
  {
    id: '2',
    name: "Chef's Table by Katsuhito Inoue",
    category: 'Dining',
    city: 'Kyoto',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },
  {
    id: '3',
    name: 'Eleven Taylor River Lodge',
    category: 'Hotel',
    city: 'Colorado',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80',
  },
  {
    id: '4',
    name: 'MACAM Hotel',
    category: 'Hotel',
    city: 'Lisbon',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
  },
  {
    id: '5',
    name: 'Ogata at The Shinmonzen',
    category: 'Dining',
    city: 'Kyoto',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
  },
  {
    id: '6',
    name: 'Ace Hotel Brooklyn',
    category: 'Hotel',
    city: 'New York',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80',
  },
  {
    id: '7',
    name: 'Blue Bottle Coffee',
    category: 'Coffee',
    city: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
  },
  {
    id: '8',
    name: 'The NoMad Hotel',
    category: 'Hotel',
    city: 'London',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
  },
  {
    id: '9',
    name: 'Narisawa',
    category: 'Michelin',
    city: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
  },
  {
    id: '10',
    name: 'Chiltern Firehouse',
    category: 'Dining',
    city: 'London',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
  },
];

export const mockCities: City[] = [
  { id: 'all', name: 'All Cities', count: 909 },
  { id: 'taipei', name: 'Taipei', count: 45 },
  { id: 'tokyo', name: 'Tokyo', count: 87 },
  { id: 'london', name: 'London', count: 62 },
  { id: 'paris', name: 'Paris', count: 78 },
  { id: 'new-york', name: 'New York', count: 95 },
  { id: 'kyoto', name: 'Kyoto', count: 34 },
];

export const mockCategories: Category[] = [
  { id: 'all', name: 'All Categories', icon: 'LayoutGrid' },
  { id: 'michelin', name: 'Michelin', icon: 'Star' },
  { id: 'bakeries', name: 'Bakeries', icon: 'Croissant' },
  { id: 'bar', name: 'Bar', icon: 'Wine' },
  { id: 'cafe', name: 'Cafe', icon: 'Coffee' },
  { id: 'coffee', name: 'Coffee', icon: 'Cup' },
  { id: 'culture', name: 'Culture', icon: 'Building' },
  { id: 'dining', name: 'Dining', icon: 'Utensils' },
  { id: 'hotel', name: 'Hotel', icon: 'Hotel' },
  { id: 'others', name: 'Others', icon: 'MoreHorizontal' },
];
