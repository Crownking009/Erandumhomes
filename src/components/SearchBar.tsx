/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, MapPin, Building2, Tag } from 'lucide-react';
import { PropertyType, ListingCategory } from '../types';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  className?: string;
  variant?: 'glass' | 'solid';
}

export interface SearchFilters {
  location: string;
  type: PropertyType | 'All';
  category: ListingCategory | 'All';
}

export default function SearchBar({ onSearch, className = '', variant = 'solid' }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    type: 'All',
    category: 'All',
  });

  const handleChange = (name: keyof SearchFilters, value: string) => {
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    onSearch(updated);
  };

  const isGlass = variant === 'glass';

  return (
    <div className={`
      ${isGlass 
        ? 'bg-[#004e32]' 
        : 'bg-white border border-accent/20'} 
      luxury-shadow p-3 md:p-4 grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 ${className}
    `}>
      {/* Location Search */}
      <div className={`relative group border-b md:border-b-0 md:border-r ${isGlass ? 'border-white/10' : 'border-primary/5'} p-4 md:p-2 flex items-center gap-4 transition-all hover:bg-white/5`}>
        <MapPin size={22} className="text-white shrink-0" />
        <div className="flex-grow">
          <label className={`block text-[9px] uppercase tracking-[0.2em] font-black ${isGlass ? 'text-white' : 'text-primary/60'} mb-1.5`}>Location</label>
          <input
            type="text"
            placeholder="Search neighborhood..."
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className={`w-full bg-transparent text-sm font-bold outline-none ${isGlass ? 'text-white placeholder:text-white/70' : 'text-primary placeholder:text-muted/30'}`}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className={`relative group border-b md:border-b-0 md:border-r ${isGlass ? 'border-white/10' : 'border-primary/5'} p-4 md:p-2 flex items-center gap-4 transition-all hover:bg-white/5`}>
        <Tag size={22} className="text-white shrink-0" />
        <div className="flex-grow">
          <label className={`block text-[9px] uppercase tracking-[0.2em] font-black ${isGlass ? 'text-white' : 'text-primary/60'} mb-1.5`}>Preference</label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value as ListingCategory | 'All')}
              className={`w-full bg-transparent text-sm font-bold outline-none appearance-none cursor-pointer pr-6 ${isGlass ? 'text-white [&>option]:text-primary' : 'text-primary'}`}
            >
              <option value="All">All Categories</option>
              {Object.values(ListingCategory).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none ${isGlass ? 'text-white' : 'text-primary/40'}`}>
              <Search size={14} className="rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Type Filter */}
      <div className={`relative group border-b md:border-b-0 md:border-r ${isGlass ? 'border-white/10' : 'border-primary/5'} p-4 md:p-2 flex items-center gap-4 transition-all hover:bg-white/5`}>
        <Building2 size={22} className="text-white shrink-0" />
        <div className="flex-grow">
          <label className={`block text-[9px] uppercase tracking-[0.2em] font-black ${isGlass ? 'text-white' : 'text-primary/60'} mb-1.5`}>Property Type</label>
          <div className="relative">
            <select
              value={filters.type}
              onChange={(e) => handleChange('type', e.target.value as PropertyType | 'All')}
              className={`w-full bg-transparent text-sm font-bold outline-none appearance-none cursor-pointer pr-6 ${isGlass ? 'text-white [&>option]:text-primary' : 'text-primary'}`}
            >
              <option value="All">All Types</option>
              {Object.values(PropertyType).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none ${isGlass ? 'text-white' : 'text-primary/40'}`}>
              <Search size={14} className="rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-1 md:p-0">
        <button 
          onClick={() => onSearch(filters)}
          className="w-full h-full bg-white text-[#004e32] flex items-center justify-center gap-3 py-6 md:py-0 hover:bg-accent hover:text-white transition-all duration-700 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#004e32]/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
          <Search size={18} className="group-hover:scale-110 transition-transform relative z-10" />
          <span className="text-[11px] uppercase tracking-[0.3em] font-black relative z-10">Find Home</span>
        </button>
      </div>
    </div>
  );
}
