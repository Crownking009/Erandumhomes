/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import SEO from '../components/SEO';
import SearchBar, { SearchFilters } from '../components/SearchBar';
import ImageCarousel from '../components/ImageCarousel';
import { Property, PropertyType, ListingCategory, HeroConfig } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Instagram, MapPin, Phone } from 'lucide-react';

interface HomeProps {
  properties: Property[];
  heroConfig: HeroConfig;
}

export default function Home({ properties, heroConfig }: HomeProps) {
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
    
    // Smooth scroll to results
    const resultsElement = document.getElementById('properties');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const propertyTypes: (PropertyType | 'All')[] = ['All', ...Object.values(PropertyType)];
  const categories: (ListingCategory | 'All')[] = ['All', ...Object.values(ListingCategory)];

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Erandum Homes",
    "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
    "description": "Premium short-lets, luxury apartments, and exclusive homes in Lagos. Erandum Homes provides top-tier property management and vacation management services.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressRegion": "Lagos State",
      "addressCountry": "NG"
    },
    "telephone": WHATSAPP_NUMBER,
    "url": "https://erandumhomes.com"
  };

  return (
    <div className="bg-secondary">
      <SEO 
        title="Luxury Real Estate Lagos | Short-Lets & Premium Apartments"
        description="Experience peak living with Erandum Homes. Curating the finest short-lets, luxury rentals, and exclusive properties in Lagos' most prestigious neighborhoods."
        keywords="luxury real estate lagos, short let victoria island, apartments for rent lekki, banana island mansion, erandum homes lagos"
      />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <Hero config={heroConfig} onSearch={handleSearch} />

      {/* Hero Sub-Gallery Marquee */}
      <section className="relative mt-20 mb-4 overflow-hidden py-6">
        <div className="flex relative items-center">
          <motion.div 
            className="flex gap-4 flex-nowrap"
            animate={{
              x: [-1 * (10 * 226), 0], // (210px width + 16px gap) * 10 
            }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...HERO_GALLERY, ...HERO_GALLERY].map((img, i) => (
              <div 
                key={i} 
                className="w-[210px] h-[250px] shrink-0 overflow-hidden luxury-shadow group border border-white/10"
              >
                <img 
                  src={img} 
                  // src="/gallery/local-1.jpg" // UNCOMMENT TO USE LOCAL IMAGE FROM public/gallery/local-1.jpg
                  alt={`Hero Gallery ${i}`} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section with Brand Motif */}
      <section className="pt-20 pb-40 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-1 relative z-20"
          >
            <div className="flex items-center gap-4 mb-8">
               <span className="text-accent uppercase tracking-[0.4em] font-black text-xs">The Vision</span>
               <div className="h-[1px] flex-grow bg-accent/20" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-display font-medium text-primary mb-10 leading-tight">
              Crafting <br /> 
              <span className="italic font-light text-accent">Unforgettable</span> <br />
              Moments.
            </h2>
            
            <p className="text-lg text-muted leading-relaxed mb-12 font-light">
              Erandum Homes isn't just a property agency; we are custodians of your peak experiences. 
              From the bustling heart of Victoria Island to the serene waves of Lekki, 
              we curate spaces that inspire productivity and nurture relaxation.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-4 group">
                <div className="w-14 h-14 bg-accent-soft flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                   <Phone size={24} />
                </div>
                <h4 className="font-display text-2xl font-bold">Bespoke Service</h4>
                <p className="text-[10px] uppercase tracking-widest text-muted leading-loose font-bold">
                  Dedicated concierge available 24/7 to cater to your every request.
                </p>
              </div>
              <div className="space-y-4 group">
                <div className="w-14 h-14 bg-accent-soft flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                   <MapPin size={24} />
                </div>
                <h4 className="font-display text-2xl font-bold">Prime Locations</h4>
                <p className="text-[10px] uppercase tracking-widest text-muted leading-loose font-bold">
                  All properties are situated in the safest and most prestigious zones in Lagos.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-2 group z-10"
          >
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="space-y-6 pt-12">
                  <img 
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" 
                    // src="/vision-1.jpg" // UNCOMMENT TO USE LOCAL IMAGE
                    className="w-full h-full object-cover rounded-none transition-all duration-1000 luxury-shadow" 
                    alt="Luxury Interior 1"
                 />
                 <img 
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800" 
                    // src="/vision-2.jpg" // UNCOMMENT TO USE LOCAL IMAGE
                    className="w-full h-full object-cover rounded-none transition-all duration-1000 luxury-shadow" 
                    alt="Luxury Interior 2"
                 />
              </div>
              <div className="space-y-6">
                 <img 
                    src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800" 
                    // src="/vision-3.jpg" // UNCOMMENT TO USE LOCAL IMAGE
                    className="w-full h-full object-cover rounded-none transition-all duration-1000 luxury-shadow" 
                    alt="Luxury Interior 3"
                 />
                 <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" 
                    // src="/vision-4.jpg" // UNCOMMENT TO USE LOCAL IMAGE
                    className="w-full h-full object-cover rounded-none transition-all duration-1000 luxury-shadow" 
                    alt="Luxury Interior 4"
                 />
              </div>
            </div>
            {/* The "Block" Logo Motif */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/10 block-pattern -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-40 bg-white border-y border-accent/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <span className="text-accent uppercase tracking-[0.4em] font-black text-xs mb-6 block">Current Offerings</span>
              <h2 className="text-5xl md:text-7xl font-display font-medium text-primary">Signature <span className="italic font-light">Collections</span></h2>
              {locationSearch && (
                <p className="mt-6 text-sm text-muted font-bold uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={16} className="text-accent" />
                  Showing results for "{locationSearch}"
                </p>
              )}
            </div>
            
            {/* Minimal Filter Indicator */}
            <div className="flex flex-col items-end gap-4">
               <button 
                onClick={() => {
                  setFilter('All');
                  setCategoryFilter('All');
                  setLocationSearch('');
                }}
                className="text-[10px] uppercase tracking-widest font-black text-accent hover:text-primary transition-colors flex items-center gap-2"
               >
                 Reset Filters
               </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="py-32 text-center bg-secondary/30 border border-dashed border-accent/20">
              <p className="text-muted italic font-display text-2xl">Tailoring new experiences... check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Values / Grid Section */}
      <section className="py-40 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-20">
                <div className="lg:col-span-1">
                    <h3 className="text-5xl font-display leading-[1.1] mb-8">Why the <br /><span className="italic text-accent">Discerning</span> Choose Us.</h3>
                    <div className="w-16 h-1 bg-accent mb-8" />
                </div>
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-x-20 gap-y-12">
                    {[
                        { t: "Rigorous Selection", d: "Every home in our portfolio undergoes a 50-point inspection for quality and aesthetics." },
                        { t: "Total Security", d: "Experience peace of mind with 24/7 armed response and advanced electronic surveillance." },
                        { t: "Elite Locations", d: "We only operate in the most exclusive, high-yield zones within Lagos State." },
                        { t: "Global Standard", d: "Hospitality services refined by international luxury protocols." }
                    ].map((v, i) => (
                        <div key={i} className="space-y-4">
                            <p className="text-accent font-display text-3xl font-bold">0{i+1}</p>
                            <h5 className="text-xl font-bold uppercase tracking-widest">{v.t}</h5>
                            <p className="text-white/50 text-sm leading-relaxed">{v.d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* 8-Image Seamless Carousel */}
      <ImageCarousel />

      {/* Instagram Feed / Contact CTA */}
      <section id="contact" className="py-40 px-6 lg:px-12 max-w-7xl mx-auto text-center border-b border-accent/5">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <div className="w-20 h-20 bg-accent-soft rounded-full flex items-center justify-center mx-auto mb-10 text-accent">
            <Instagram size={32} />
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-medium text-primary mb-8 tracking-tighter">Stay <span className="italic">Connected</span></h2>
          <p className="text-xl text-muted max-w-3xl mx-auto mb-16 font-light">
            Our most exclusive deals are shared first on social. Be part of the circle of 
            excellence and get a glimpse into the lifestyle we provide.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
                href="https://www.instagram.com/erandum_homes/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-white px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-primary transition-all luxury-shadow"
            >
                Follow @erandum_homes
            </a>
            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="bg-white text-primary border border-primary/10 px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-black hover:border-accent hover:text-accent transition-all"
            >
                Consult an Agent
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

const HERO_GALLERY = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1600607687940-4e5a994239b7?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1600585152223-176bc55bb24a?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1600566752355-35792bedbbb6?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1600607687940-4e5a994239b7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600585152223-176bc55bb24a?auto=format&fit=crop&q=80&w=800",
];
