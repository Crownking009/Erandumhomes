/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, PropertyStatus, PropertyType, ListingCategory } from './types';

export const WHATSAPP_NUMBER = '2348138436555'; // Updated from Instagram profile

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'The Emerald Penthouse',
    location: 'Lekki Phase 1, Lagos',
    price: 180000,
    type: PropertyType.PENTHOUSE,
    category: ListingCategory.SHORT_LET,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 3,
    bathrooms: 3.5,
    description: 'A masterpiece of contemporary design featuring emerald accents and state-of-the-art automation. This penthouse offers breathtaking city views and unmatched privacy.',
    images: [
      'https://images.unsplash.com/photo-1600607687940-4e5a994239b7?auto=format&fit=crop&q=80&w=1200',
      // '/my-images/penthouse.jpg', // UNCOMMENT THIS TO USE LOCAL IMAGE IN public/my-images/penthouse.jpg
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
    ],
    videoUrl: '',
    amenities: ['Private Elevator', 'Smart Home', 'Infinity Pool', 'Dedicated Concierge'],
    whatsappNumber: WHATSAPP_NUMBER,
    createdAt: Date.now(),
  },
  {
    id: 's1',
    title: 'The Ivory Mansion',
    location: 'Banana Island, Lagos',
    price: 850000000,
    type: PropertyType.VILLA,
    category: ListingCategory.FOR_SALE,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 6,
    bathrooms: 7,
    description: 'An architectural marvel in Nigeria\'s most exclusive neighborhood. This waterfront mansion features triple-height ceilings and artisanal finishes.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      // '/my-images/mansion.jpg', // UNCOMMENT THIS TO USE LOCAL IMAGE
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200'
    ],
    videoUrl: '',
    amenities: ['Waterfront', 'Private Cinema', 'Smart Security', 'Wine Cellar'],
    whatsappNumber: WHATSAPP_NUMBER,
    createdAt: Date.now(),
  },
  {
    id: 'r1',
    title: 'Skyline Terrace Apartment',
    location: 'Victoria Island, Lagos',
    price: 12000000,
    type: PropertyType.APARTMENT,
    category: ListingCategory.FOR_RENT,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 3,
    bathrooms: 3,
    description: 'Elegant semi-furnished apartment in a prime business hub. Features high ceilings, modern aesthetics, and 24/7 power.',
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200',
      // '/my-images/terrace.jpg', // UNCOMMENT THIS TO USE LOCAL IMAGE
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=1200'
    ],
    videoUrl: '',
    amenities: ['Gym', 'Pool', 'Parking', 'Steam Room'],
    whatsappNumber: WHATSAPP_NUMBER,
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Urban Oasis Studio',
    location: 'Victoria Island, Lagos',
    price: 75000,
    type: PropertyType.STUDIO,
    category: ListingCategory.SHORT_LET,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 1,
    bathrooms: 1,
    description: 'Sleek, modern, and perfectly situated. This studio is designed for the high-flying professional who values both style and proximity to the business district.',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
      // '/my-images/studio.jpg', // UNCOMMENT THIS TO USE LOCAL IMAGE
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200'
    ],
    videoUrl: '',
    amenities: ['Gym Access', 'High-speed Fiber', 'Secure Parking', 'Modern Kitchen'],
    whatsappNumber: WHATSAPP_NUMBER,
    createdAt: Date.now() - 86400000,
  }
];

export const SERVICES = [
  {
    id: 'service-1',
    title: 'Luxury Service Apartments',
    icon: 'DoorOpen',
    description: 'Immaculately maintained short-term residences featuring five-star styling, premium bedding, and fully equipped kitchens for the modern traveler.',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedbbb6?auto=format&fit=crop&q=80&w=1200'
    // image: '/services/apartments.jpg' // LOCAL IMAGE POTENTIAL
  },
  {
    id: 'service-2',
    title: 'Premium Homes',
    icon: 'Home',
    description: 'A curated portfolio of high-end houses and apartments available for outright sale or long-term lease in Nigeria\'s most prestigious postcodes.',
    image: 'https://images.unsplash.com/photo-1600585154566-267978ec4516?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'service-3',
    title: 'Property Management',
    icon: 'Key',
    description: 'Preserving the value of your real estate investment through expert facility management, tenant vetting, and maintenance coordination.',
    image: 'https://images.unsplash.com/photo-1560518883-3765e94b7f8e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'service-4',
    title: 'Booking & Reservation',
    icon: 'CalendarCheck',
    description: 'Seamless digital reservation systems backed by personalized concierge support to ensure your stay is planned to perfection.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'service-5',
    title: 'Party & Events Hosting',
    icon: 'GlassWater',
    description: 'Sophisticated venues for your most intimate celebrations. We provide the backdrop for events that leave a lasting impression.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'service-6',
    title: 'Vacation Management',
    icon: 'PalmTree',
    description: 'Transforming your holiday home into a lucrative asset through elite marketing, guest management, and hospitality standard upkeep.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200'
  }
];

export const DESIGN_TOKENS = {
  colors: {
    primary: '#121413', // Deep Charcoal
    secondary: '#f8faf9', // Off-White Mint
    accent: '#008542', // Erandum Green
    muted: '#64748b',
  },
  fonts: {
    display: "'Cormorant Garamond', serif",
    body: "'Inter', sans-serif",
  }
};
