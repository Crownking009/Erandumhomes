/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Property, PropertyType, ListingCategory } from '../types';
import PropertyCard from '../components/PropertyCard';
import SearchBar, { SearchFilters } from '../components/SearchBar';
import SEO from '../components/SEO';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

interface ListingsProps {
  properties: Property[];
}

export default function Listings({ properties }: ListingsProps) {
  const [filter, setFilter] = useState<PropertyType | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState<ListingCategory | 'All'>('All');
  const [locationSearch, setLocationSearch] = useState('');

  const filteredProperties = useMemo(() => {
    let results = properties;
    if (filter !== 'All') {
      results = results.filter((p) => p.type === filter);
    }
    if (categoryFilter !== 'All') {
      results = results.filter((p) => p.category === categoryFilter);
    }
    if (locationSearch) {
      const keywords = locationSearch.toLowerCase().split(' ').filter(k => k.trim().length > 0);
      results = results.filter((p) => {
        const searchableText = `${p.title} ${p.location} ${p.description} ${p.type} ${p.category}`.toLowerCase();
        return keywords.every(keyword => searchableText.includes(keyword));
      });
    }
    return results;
  }, [properties, filter, categoryFilter, locationSearch]);

  const handleSearch = (filters: SearchFilters) => {
    setFilter(filters.type);
    setCategoryFilter(filters.category);
    setLocationSearch(filters.location);
  };

  return (
    <div className="bg-secondary pt-32 pb-20">
      <SEO 
        title="Luxury Listings | Find Your Next Home in Lagos"
        description="Browse our exclusive collection of properties in Lagos. From Lekki short-lets to Ikoyi mansions, Erandum Homes has the perfect space for you."
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-accent uppercase tracking-[0.4em] font-black text-[10px] mb-4 block">The Collection</span>
            <h1 className="text-5xl md:text-7xl font-display font-medium text-primary mb-8">Exclusive <span className="italic">Inventory</span></h1>
          </motion.div>
          
          <SearchBar onSearch={handleSearch} className="luxury-shadow mt-12" />
        </header>

        {locationSearch || filter !== 'All' || categoryFilter !== 'All' ? (
          <div className="mb-12 flex items-center justify-between border-b border-primary/5 pb-8">
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest font-black text-muted">Applied Filters:</span>
              <div className="flex flex-wrap gap-2">
                {locationSearch && (
                  <span className="bg-primary text-white text-[8px] uppercase tracking-widest font-black px-3 py-1 rounded-full flex items-center gap-2">
                    <MapPin size={10} /> {locationSearch}
                  </span>
                )}
                {categoryFilter !== 'All' && (
                  <span className="bg-accent text-white text-[8px] uppercase tracking-widest font-black px-3 py-1 rounded-full">{categoryFilter}</span>
                )}
                {filter !== 'All' && (
                  <span className="bg-secondary text-primary border border-primary/10 text-[8px] uppercase tracking-widest font-black px-3 py-1 rounded-full">{filter}</span>
                )}
              </div>
            </div>
            <button 
              onClick={() => {
                setFilter('All');
                setCategoryFilter('All');
                setLocationSearch('');
              }}
              className="text-[10px] uppercase tracking-widest font-black text-accent hover:underline"
            >
              Clear All
            </button>
          </div>
        ) : null}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-40 text-center bg-white luxury-shadow border border-accent/5"
          >
            <p className="text-muted italic font-display text-2xl mb-4">No properties match your specific criteria.</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-black">Refine your search or contact our concierge.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
