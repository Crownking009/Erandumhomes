/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { HeroConfig } from '../types';
import SearchBar, { SearchFilters } from './SearchBar';

interface HeroProps {
  config: HeroConfig;
  onSearch: (filters: SearchFilters) => void;
}

export default function Hero({ config, onSearch }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-start md:items-center justify-center pt-40 md:pt-32">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          key={config.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover animate-slow-zoom"
          poster="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000"
        >
          <source 
            src={config.videoUrl} 
            // src="/my-local-video.mp4" // UNCOMMENT TO USE LOCAL VIDEO FROM public/my-local-video.mp4
            type="video/mp4" 
          />
        </video>
        {/* If you want a static image instead of video, uncomment below and comment out video above */}
        {/* <img src="/hero-bg.jpg" className="w-full h-full object-cover" /> */}
        {/* Layered Overlays */}
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-linear-to-b from-primary/70 via-transparent to-secondary" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-center">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-accent" />
            <span 
              className="text-accent uppercase tracking-[0.5em] font-black text-2xl md:text-5xl"
              style={{ WebkitTextStroke: '0.5px white' }}
            >
              ERANDUM HOMES
            </span>
            <div className="w-12 h-[1px] bg-accent" />
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-medium text-white mb-10 leading-[0.9] tracking-tighter">
            {config.title} <br />
            <span className="italic font-light text-accent">{config.subtitle}</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-14 font-light leading-relaxed italic">
            Curating the finest collection of luxury properties in Lagos. <br className="hidden md:block" /> 
            Experience a stay defined by elegance, security, and prestige.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link
              to="/listings"
              className="group relative bg-white text-primary px-12 py-6 text-[10px] uppercase tracking-[0.4em] font-black overflow-hidden luxury-shadow transition-all hover:pr-16"
            >
              <span className="relative z-10">Explore Inventory</span>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
            
            <a
              href="#contact"
              className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-12 py-6 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white hover:text-primary transition-all"
            >
              Contact Concierge
            </a>
          </div>

          {/* Search Bar - Positioned below buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="max-w-5xl mx-auto"
          >
            <SearchBar onSearch={onSearch} variant="glass" />
          </motion.div>
        </motion.div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
      >
        <span className="text-[8px] uppercase tracking-[0.6em] text-white/50 font-black mb-4">Discover</span>
        <div className="w-[1px] h-24 bg-linear-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}
