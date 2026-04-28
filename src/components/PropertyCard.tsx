/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property } from '../types';
import { Bed, Bath, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
  key?: string | number;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const whatsappLink = `https://wa.me/${property.whatsappNumber}?text=Hi Erandum Homes, I am interested in ${property.title} in ${property.location}. Is it available?`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white overflow-hidden rounded-none luxury-shadow hover:translate-y-[-12px] transition-all duration-700"
    >
      {/* Image Container */}
      <Link to={`/property/${property.id}`} className="block relative h-[400px] overflow-hidden">
        <img
          src={property.images[0]}
          // src="/my-local-property.jpg" // UNCOMMENT TO USE LOCAL IMAGE FOR ALL CARDS (TESTING)
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
        />
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-700" />
        
        <div className="absolute top-6 left-6">
          <span className="bg-white text-primary text-[10px] uppercase tracking-[0.3em] px-5 py-2 font-black luxury-shadow">
            {property.category}
          </span>
        </div>
        
        <div className="absolute bottom-6 left-6 right-6 translate-y-20 group-hover:translate-y-0 transition-transform duration-700">
           <div className="bg-accent/90 backdrop-blur-md text-white p-4 flex justify-between items-center luxury-shadow">
              <span className="text-[10px] uppercase tracking-widest font-black">Learn More</span>
              <span className="text-lg font-display font-bold">₦{property.price.toLocaleString()}</span>
           </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-10 pt-12 relative">
        {/* Status indicator */}
        <div className={`absolute top-0 right-10 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border-4 border-white luxury-shadow ${
            property.status === 'Available' ? 'bg-accent text-white' : 'bg-red-500 text-white'
        }`}>
            <span className="text-[10px] font-black uppercase tracking-tighter">{property.status === 'Available' ? 'LIVE' : 'OFF'}</span>
        </div>

        <div className="mb-8">
          <Link to={`/property/${property.id}`}>
            <h3 className="text-3xl font-display font-semibold text-primary mb-2 group-hover:text-accent transition-colors">{property.title}</h3>
          </Link>
          <div className="flex items-center gap-2 text-muted text-[10px] uppercase tracking-[0.2em] font-bold">
            <MapPin size={14} className="text-accent" />
            {property.location}
          </div>
        </div>

        <div className="flex items-center gap-8 py-8 border-y border-secondary mb-8 text-muted">
          <div className="flex items-center gap-3">
            <Bed size={20} className="text-primary/40" />
            <span className="text-[10px] uppercase tracking-widest font-bold">{property.bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-3">
            <Bath size={20} className="text-primary/40" />
            <span className="text-[10px] uppercase tracking-widest font-bold">{property.bathrooms} Bath</span>
          </div>
        </div>

        <p className="text-sm text-muted leading-relaxed mb-10 line-clamp-2 font-light">
          {property.description}
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-primary text-white py-5 text-[10px] uppercase tracking-[0.3em] font-black flex items-center justify-center gap-4 hover:bg-accent hover:text-white transition-all duration-500 luxury-shadow group/btn"
        >
          <MessageCircle size={18} className="group-hover/btn:rotate-12 transition-transform" />
          Secure Reservation
        </a>
      </div>
    </motion.div>
  );
}
