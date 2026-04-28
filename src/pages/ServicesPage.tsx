/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import SEO from '../components/SEO';
import * as Icons from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="bg-secondary pt-40 pb-32">
      <SEO 
        title="Luxury Services | Property Management & Vacation Rentals Lagos"
        description="Erandum Homes provides elite property management, vacation home hosting, and premium booking services in Lagos. We ensure your real estate investments thrive."
        keywords="property management lagos, vacation rental management nigeria, luxury concierge lagos, erandum homes services"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent uppercase tracking-[0.4em] font-black text-xs mb-6 block">Our Expertise</span>
            <h1 className="text-6xl md:text-8xl font-display font-medium text-primary mb-10 leading-tight">
              Bespoke <br />
              <span className="italic font-light">Ecosystem of Care.</span>
            </h1>
            <p className="text-xl text-muted leading-relaxed font-light">
              Beyond simple listings, Erandum Homes offers a full-spectrum real estate experience. 
              We manage, host, and curate with an obsessive attention to detail that sets us apart.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {SERVICES.map((service, i) => {
            const IconComponent = (Icons as any)[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group"
              >
                <div className="relative h-[300px] overflow-hidden mb-8 luxury-shadow">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-accent/10 mix-blend-multiply opacity-50 group-hover:opacity-0 transition-opacity" />
                  <div className="absolute top-6 right-6 w-14 h-14 bg-white flex items-center justify-center text-accent luxury-shadow">
                    {IconComponent && <IconComponent size={24} />}
                  </div>
                </div>
                
                <h3 className="text-3xl font-display font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted leading-loose text-sm font-light">
                  {service.description}
                </p>
                <div className="mt-8">
                    <div className="w-12 h-[1px] bg-accent group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Philosophy Section */}
      <section className="mt-40 py-32 bg-primary text-white overflow-hidden relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
            >
                <h2 className="text-5xl md:text-7xl font-display mb-10">The Erandum <span className="italic font-light">Standard.</span></h2>
                <div className="w-24 h-1 bg-accent mx-auto mb-12" />
                <p className="text-xl text-white/60 leading-relaxed font-light mb-16 max-w-3xl mx-auto">
                    We don't settle for "good enough." Every service we provide is benchmarked against 
                    global luxury hospitality standards. When you choose Erandum, you aren't just 
                    getting a service; you're gaining a partner in property excellence.
                </p>
                <a 
                    href="#contact" 
                    className="inline-block bg-accent text-white px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-white hover:text-primary transition-all luxury-shadow"
                >
                    Start a Partnership
                </a>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
