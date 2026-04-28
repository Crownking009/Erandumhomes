/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, Link } from 'react-router-dom';
import { Property, Inquiry } from '../types';
import { motion } from 'motion/react';
import { Bed, Bath, MapPin, MessageCircle, ArrowLeft, Check, ShieldCheck, Share2 } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import SEO from '../components/SEO';
import InquiryForm from '../components/InquiryForm';
import { useEffect } from 'react';

interface PropertyDetailsProps {
  properties: Property[];
  onInquiry: (inquiry: Inquiry) => void;
}

export default function PropertyDetails({ properties, onInquiry }: PropertyDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-4xl font-display mb-8">Collection Item Not Found</h2>
        <Link to="/" className="text-accent underline uppercase tracking-widest font-bold">Return to Gallery</Link>
      </div>
    );
  }

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.category === property.category || p.type === property.type))
    .slice(0, 3);

  const whatsappLink = `https://wa.me/${property.whatsappNumber}?text=I am viewing ${property.title} on your website and would like more details.`;

  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(property.price);

  // JSON-LD for Single Property
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product", // RealEstateListing doesn't exist in basic schema.org, using Product/Apartment more common
    "name": property.title,
    "description": property.description,
    "image": property.images,
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "NGN",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="bg-secondary pt-32 pb-20">
      <SEO 
        title={`${property.title} in ${property.location}`}
        description={`${property.description.substring(0, 155)}... Luxurious ${property.type} with ${property.bedrooms} bedrooms in ${property.location}.`}
        ogImage={property.images[0]}
        ogType="article"
      />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Navigation */}
        <Link 
            to="/" 
            className="inline-flex items-center gap-3 text-[10px] uppercase tracking-widest font-black text-muted hover:text-accent transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Back to Collections
        </Link>

        {/* Header Grid */}
        <div className="grid lg:grid-cols-2 gap-20 mb-32 items-start">
          {/* Visual Gallery */}
          <div className="space-y-6">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative aspect-[4/5] overflow-hidden luxury-shadow"
            >
              <img 
                src={property.images[0]} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8 bg-accent text-white px-6 py-2 text-[10px] uppercase tracking-[0.3em] font-black">
                {property.category}
              </div>
            </motion.div>
            
            {property.videoUrl && (
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="relative aspect-video overflow-hidden luxury-shadow bg-black"
              >
                <video 
                  src={property.videoUrl} 
                  controls 
                  className="w-full h-full object-contain"
                />
              </motion.div>
            )}
            
            {property.images.length > 1 && (
                <div className="grid grid-cols-2 gap-6">
                    {property.images.slice(1).map((img, idx) => (
                        <div key={idx} className="aspect-square overflow-hidden luxury-shadow">
                            <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={`${property.title} ${idx + 2}`} />
                        </div>
                    ))}
                </div>
            )}
          </div>

          {/* Details Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-40"
          >
            <div className="mb-10 pb-10 border-b border-primary/5">
                <h1 className="text-5xl md:text-7xl font-display font-medium text-primary mb-6 leading-tight">
                    {property.title}
                </h1>
                <div className="flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest">
                    <MapPin size={18} />
                    {property.location}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-12">
                <div>
                    <span className="text-[10px] uppercase tracking-widest font-black text-muted block mb-4">Investment</span>
                    <p className="text-4xl font-display font-bold text-primary">
                        {formattedPrice}
                        <span className="text-sm font-sans font-normal text-muted italic ml-2">
                             {property.category === 'Shortlet' ? '/ night' : property.category === 'For Rent' ? '/ annum' : ''}
                        </span>
                    </p>
                </div>
                <div>
                     <span className="text-[10px] uppercase tracking-widest font-black text-muted block mb-4">Status</span>
                     <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${property.status === 'Available' ? 'bg-accent' : 'bg-red-500'} animate-pulse`} />
                        <span className="text-lg font-bold text-primary uppercase tracking-tighter">{property.status}</span>
                     </div>
                </div>
            </div>

            <div className="flex items-center gap-12 py-10 border-y border-primary/5 mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center luxury-shadow text-accent">
                        <Bed size={20} />
                    </div>
                    <div>
                        <p className="text-xl font-bold font-display">{property.bedrooms}</p>
                        <p className="text-[10px] uppercase tracking-widest text-muted font-bold">Bedrooms</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center luxury-shadow text-accent">
                        <Bath size={20} />
                    </div>
                    <div>
                        <p className="text-xl font-bold font-display">{property.bathrooms}</p>
                        <p className="text-[10px] uppercase tracking-widest text-muted font-bold">Bathrooms</p>
                    </div>
                </div>
            </div>

            <div className="mb-12">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-primary mb-6">Property Narration</h4>
                <p className="text-lg text-muted leading-relaxed font-light italic">
                    "{property.description}"
                </p>
            </div>

            <div className="mb-12">
                 <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-primary mb-6">Curated Amenities</h4>
                 <div className="grid grid-cols-2 gap-4">
                    {property.amenities.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-muted">
                            <div className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center shrink-0">
                                <Check size={10} />
                            </div>
                            {item}
                        </div>
                    ))}
                 </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
                <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow bg-accent text-white py-6 text-[10px] uppercase tracking-[0.3em] font-black flex items-center justify-center gap-4 hover:bg-primary transition-all duration-500 luxury-shadow"
                >
                    <MessageCircle size={20} />
                    Secure Reservation
                </a>
                <button className="px-10 py-6 border border-primary/10 text-primary hover:border-accent hover:text-accent transition-all">
                    <Share2 size={20} />
                </button>
            </div>

            <div className="mt-12 p-6 bg-accent-soft flex items-center gap-4">
                 <ShieldCheck className="text-accent" size={24} />
                 <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-accent">Erandum Guarantee</p>
                    <p className="text-xs text-primary/70">Verified ownership, 24/7 security, and global hygiene standards.</p>
                 </div>
            </div>
          </motion.div>
        </div>

        {/* Inquiry Section */}
        <section className="mb-32">
            <div className="max-w-4xl mx-auto">
                <InquiryForm property={property} onInquiry={onInquiry} />
            </div>
        </section>

        {/* Similar Listings */}
        {similarProperties.length > 0 && (
            <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="pt-20 border-t border-primary/5"
            >
                <div className="flex items-center justify-between mb-16">
                    <h3 className="text-4xl font-display font-medium">Similar <span className="italic font-light">Elegance</span></h3>
                    <div className="h-[1px] flex-grow mx-8 bg-primary/5" />
                    <Link to="/" className="text-[10px] uppercase tracking-widest font-black text-accent hover:underline underline-offset-8">View All</Link>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {similarProperties.map((p) => (
                         <PropertyCard key={p.id} property={p} />
                    ))}
                </div>
            </motion.section>
        )}
      </div>
    </div>
  );
}
