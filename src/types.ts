/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum PropertyStatus {
  AVAILABLE = 'Available',
  BOOKED = 'Booked',
  MAINTENANCE = 'Maintenance',
}

export enum PropertyType {
  HOUSE = 'House',
  APARTMENT = 'Apartment',
  VILLA = 'Villa',
  STUDIO = 'Studio',
  PENTHOUSE = 'Penthouse',
}

export enum ListingCategory {
  FOR_SALE = 'For Sale',
  FOR_RENT = 'For Rent',
  SHORT_LET = 'Shortlet',
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: PropertyType;
  category: ListingCategory;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  description: string;
  images: string[];
  videoUrl?: string;
  amenities: string[];
  whatsappNumber: string;
  createdAt: number;
}

export interface AdminUser {
  isAuthenticated: boolean;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: number;
}

export interface HeroConfig {
  videoUrl: string;
  title: string;
  subtitle: string;
}
