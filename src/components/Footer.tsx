/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[#004e32] text-white pt-24 pb-12 px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <Logo size="md" variant="light" />
            <p className="text-white/90 text-sm leading-relaxed max-w-xs">
              Exceptional spaces and bespoke hospitality in Lagos' most desirable coastal neighborhoods. 
              We run your errands and take the stress off you.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/erandum_homes/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
              >
                <Instagram size={18} className="text-yellow-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-yellow-400">Navigation</h4>
            <ul className="space-y-4 text-sm text-white">
              <li><Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
              <li><a href="#properties" className="hover:text-yellow-400 transition-colors">Collections</a></li>
              <li><a href="#about" className="hover:text-yellow-400 transition-colors">Our Standard</a></li>
              <li><Link to="/admin/login" className="hover:text-yellow-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-yellow-400">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-white">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-yellow-400" />
                +234 812 345 6789
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-yellow-400" />
                info@erandumhomes.com
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={14} className="text-yellow-400" />
                Lekki, Lagos, Nigeria
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-yellow-400">Insights</h4>
            <p className="text-xs text-white/80 italic">
                Subscribe to receive early access to new curated properties.
            </p>
            <div className="flex">
                <input 
                    type="email" 
                    placeholder="Signature email" 
                    className="bg-white/10 border border-white/20 w-full p-4 text-xs outline-none focus:border-yellow-400 transition-colors placeholder:text-white/50 text-white" 
                />
                <button className="bg-white text-[#004e32] px-6 text-xs font-bold hover:bg-yellow-400 hover:text-white transition-all uppercase tracking-tighter">
                    Join
                </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">
            © 2024 ERANDUM HOMES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/50 font-bold">
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
