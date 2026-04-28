/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Inquiry, Property } from '../types';
import { MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InquiryFormProps {
  property: Property;
  onInquiry: (inquiry: Inquiry) => void;
}

export default function InquiryForm({ property, onInquiry }: InquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hi Erandum Homes, I am interested in ${property.title}. Could you provide more details?`,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const inquiry: Inquiry = {
      id: Math.random().toString(36).substr(2, 9),
      propertyId: property.id,
      propertyName: property.title,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      createdAt: Date.now(),
    };

    onInquiry(inquiry);
    setIsSubmitted(true);
    
    // Also prepare WhatsApp link
    const whatsappMsg = `*New Inquiry for ${property.title}*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n\n*Message:* ${formData.message}`;
    const encodedMsg = encodeURIComponent(whatsappMsg);
    const whatsappLink = `https://wa.me/${property.whatsappNumber}?text=${encodedMsg}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappLink, '_blank');
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 luxury-shadow border border-accent text-center"
      >
        <CheckCircle2 size={64} className="text-accent mx-auto mb-6" />
        <h3 className="text-2xl font-display font-bold mb-4">Inquiry Received</h3>
        <p className="text-muted mb-8 italic">"We've logged your interest and opened WhatsApp for your direct concierge connection."</p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="text-[10px] uppercase tracking-widest font-black text-accent hover:underline"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-10 luxury-shadow border border-primary/5">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
          <MessageCircle size={24} />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold">Express Interest</h3>
          <p className="text-[10px] uppercase tracking-widest text-muted font-bold">Direct Inquiry to Admin</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-muted mb-3 italic">Nom de Plume / Full Name</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="w-full bg-secondary/30 border-b border-primary/10 p-4 text-sm focus:border-accent outline-none transition-colors italic"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-muted mb-3 italic">Email Address</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full bg-secondary/30 border-b border-primary/10 p-4 text-sm focus:border-accent outline-none transition-colors italic"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-muted mb-3 italic">Phone Number</label>
            <input
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+234 ..."
              className="w-full bg-secondary/30 border-b border-primary/10 p-4 text-sm focus:border-accent outline-none transition-colors italic"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-muted mb-3 italic">Your Message</label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-secondary/30 border-b border-primary/10 p-4 text-sm focus:border-accent outline-none transition-colors italic resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-6 text-[10px] uppercase tracking-[0.4em] font-black flex items-center justify-center gap-4 hover:bg-accent transition-all duration-500 luxury-shadow"
        >
          <Send size={18} />
          Dispatch Inquiry
        </button>
        
        <p className="text-[9px] text-center text-muted uppercase tracking-widest mt-4">
          Submitting will log your inquiry & open WhatsApp
        </p>
      </form>
    </div>
  );
}
