/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Property, PropertyStatus, PropertyType, ListingCategory, Inquiry, HeroConfig } from '../types';
import { Plus, Edit2, Trash2, X, Save, Search, MapPin, Mail, Phone as PhoneIcon, Calendar, Trash, Settings, Video, Type, Image, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminDashboardProps {
  properties: Property[];
  onUpdate: (properties: Property[]) => void;
  inquiries: Inquiry[];
  onUpdateInquiries: (inquiries: Inquiry[]) => void;
  heroConfig: HeroConfig;
  onUpdateHero: (config: HeroConfig) => void;
}

export default function AdminDashboard({ properties, onUpdate, inquiries, onUpdateInquiries, heroConfig, onUpdateHero }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'properties' | 'inquiries' | 'settings'>('properties');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Hero Settings local state
  const [tempHero, setTempHero] = useState<HeroConfig>(heroConfig);
  const [isSavingHero, setIsSavingHero] = useState(false);

  const handleDeleteInquiry = (id: string) => {
    if (confirm('Delete this inquiry?')) {
      onUpdateInquiries(inquiries.filter(i => i.id !== id));
    }
  };

  const handleHeroVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for localStorage
        alert('File is too large for local storage (max 2MB). Please use a URL instead.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempHero({ ...tempHero, videoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveHero = () => {
    setIsSavingHero(true);
    setTimeout(() => {
      onUpdateHero(tempHero);
      setIsSavingHero(false);
      alert('Hero settings updated successfully!');
    }, 800);
  };

  const handlePropertyFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'images' | 'videoUrl') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    // Check size - keep it small for localStorage (e.g., 2MB total limit typically for the whole DB, but let's be generous within reason)
    if (file.size > 1.5 * 1024 * 1024) {
      alert('File is too large (max 1.5MB recommended for local storage). Consider using a URL instead.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (field === 'images') {
        setFormState((prev) => ({
          ...prev,
          images: [dataUrl, ...(prev.images || []).slice(1)]
        }));
      } else {
        setFormState((prev) => ({
          ...prev,
          videoUrl: dataUrl
        }));
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Form State
  const [formState, setFormState] = useState<Partial<Property>>({
    title: '',
    location: '',
    price: 0,
    type: PropertyType.APARTMENT,
    category: ListingCategory.SHORT_LET,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 0,
    bathrooms: 0,
    description: '',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200'],
    amenities: [],
    whatsappNumber: '2348123456789',
  });

  const handleEdit = (property: Property) => {
    setFormState(property);
    setEditingId(property.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      onUpdate(properties.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(properties.map((p) => (p.id === editingId ? { ...(formState as Property), id: p.id } : p)));
    } else {
      const newProperty: Property = {
        ...(formState as Property),
        id: Date.now().toString(),
        createdAt: Date.now(),
      };
      onUpdate([newProperty, ...properties]);
    }
    resetForm();
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormState({
      title: '',
      location: '',
      price: 0,
      type: PropertyType.APARTMENT,
      category: ListingCategory.SHORT_LET,
      status: PropertyStatus.AVAILABLE,
      bedrooms: 0,
      bathrooms: 0,
      description: '',
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200'],
      videoUrl: '',
      amenities: [],
      whatsappNumber: '2348123456789',
    });
  };

  const filteredProperties = properties.filter((p) => {
    const keywords = searchTerm.toLowerCase().split(' ').filter(k => k.trim().length > 0);
    if (keywords.length === 0) return true;
    const searchableText = `${p.title} ${p.location} ${p.type} ${p.category}`.toLowerCase();
    return keywords.every(keyword => searchableText.includes(keyword));
  });

  return (
    <div className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div className="flex gap-8 border-b border-secondary pb-4">
          <button 
            onClick={() => setActiveTab('properties')}
            className={`text-[10px] uppercase tracking-[0.3em] font-black transition-all ${
              activeTab === 'properties' ? 'text-accent border-b-2 border-accent pb-4 -mb-[18px]' : 'text-muted hover:text-primary'
            }`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`text-[10px] uppercase tracking-[0.3em] font-black transition-all flex items-center gap-2 ${
              activeTab === 'inquiries' ? 'text-accent border-b-2 border-accent pb-4 -mb-[18px]' : 'text-muted hover:text-primary'
            }`}
          >
            Inquiries
            {inquiries.length > 0 && <span className="bg-accent text-white px-2 py-0.5 rounded-full text-[8px]">{inquiries.length}</span>}
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`text-[10px] uppercase tracking-[0.3em] font-black transition-all flex items-center gap-2 ${
              activeTab === 'settings' ? 'text-accent border-b-2 border-accent pb-4 -mb-[18px]' : 'text-muted hover:text-primary'
            }`}
          >
            <Settings size={14} />
            Visuals
          </button>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-3 bg-accent text-white px-10 py-5 text-[10px] uppercase tracking-[0.2em] font-black hover:bg-primary transition-all luxury-shadow"
        >
          <Plus size={18} />
          New Collection Listing
        </button>
      </div>

      {activeTab === 'properties' ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: 'Total Inventory', value: properties.length },
              { label: 'Active Rentals', value: properties.filter(p => p.status === PropertyStatus.AVAILABLE).length },
              { label: 'Short-Lets', value: properties.filter(p => p.category === ListingCategory.SHORT_LET).length },
              { label: 'Average Rate', value: '₦' + Math.round(properties.reduce((a, b) => a + b.price, 0) / (properties.length || 1)).toLocaleString() },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 luxury-shadow border-b-4 border-accent relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-accent/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-black mb-4">{stat.label}</p>
                <p className="text-3xl font-display font-medium text-primary">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="flex bg-white p-6 luxury-shadow mb-12 gap-6 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-accent" size={20} />
              <input
                type="text"
                placeholder="Search by neighborhood or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-secondary text-[10px] uppercase tracking-widest font-bold outline-none focus:bg-accent-soft focus:text-accent transition-all"
              />
            </div>
          </div>

          <div className="bg-white luxury-shadow border border-secondary overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-secondary/50 border-b border-secondary">
                <tr>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted">Property</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted">Type</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted">Price/Night</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted">Category</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-6 font-medium text-primary">
                      <div className="flex items-center gap-4">
                        <img src={property.images[0]} className="w-12 h-12 object-cover rounded-sm" />
                        <div>
                          <p className="font-display text-lg leading-tight">{property.title}</p>
                          <p className="text-[10px] text-muted flex items-center gap-1 uppercase tracking-tighter">
                              <MapPin size={10} /> {property.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-xs uppercase tracking-widest font-bold text-muted">{property.type}</td>
                    <td className="px-6 py-6 text-sm font-semibold">₦{property.price.toLocaleString()}</td>
                    <td className="px-6 py-6">
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                        property.status === PropertyStatus.AVAILABLE ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-[10px] uppercase tracking-widest font-bold text-accent">{property.category}</td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleEdit(property)} className="p-2 text-primary hover:text-accent transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(property.id)} className="p-2 text-primary hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProperties.length === 0 && (
              <div className="p-20 text-center text-muted italic text-sm">
                No properties found matching your criteria.
              </div>
            )}
          </div>
        </>
      ) : activeTab === 'inquiries' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inquiries.length === 0 && (
            <div className="col-span-full py-32 bg-white luxury-shadow text-center">
              <Mail size={48} className="text-accent/20 mx-auto mb-6" />
              <p className="text-muted italic">No digital footprints discovered yet.</p>
            </div>
          )}
          {inquiries.map((inquiry) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 luxury-shadow border-t-4 border-accent space-y-6 relative group"
            >
              <button 
                onClick={() => handleDeleteInquiry(inquiry.id)}
                className="absolute top-6 right-6 text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash size={16} />
              </button>
              
              <div>
                <h4 className="text-xl font-display font-bold text-primary mb-1">{inquiry.name}</h4>
                <p className="text-[10px] uppercase tracking-widest text-accent font-black">{inquiry.propertyName}</p>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-primary/5 text-xs text-muted">
                 <div className="flex items-center gap-3">
                    <Mail size={14} className="text-accent" />
                    {inquiry.email}
                 </div>
                 <div className="flex items-center gap-3">
                    <PhoneIcon size={14} className="text-accent" />
                    {inquiry.phone}
                 </div>
                 <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-accent" />
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                 </div>
              </div>

              <div className="bg-secondary/30 p-4 italic text-sm text-primary/80 border-l-2 border-accent">
                "{inquiry.message}"
              </div>

              <div className="pt-4 flex gap-4">
                <a 
                  href={`mailto:${inquiry.email}`}
                  className="flex-grow bg-primary text-white py-3 text-[9px] uppercase tracking-widest font-black text-center"
                >
                  Reply via Email
                </a>
                <a 
                  href={`https://wa.me/${inquiry.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  className="flex-grow bg-[#25D366] text-white py-3 text-[9px] uppercase tracking-widest font-black text-center"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white luxury-shadow border border-primary/5 p-12">
           <div className="flex items-center gap-4 mb-12">
             <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
               <Video size={24} />
             </div>
             <div>
               <h3 className="text-2xl font-display font-bold">Hero Experience</h3>
               <p className="text-[10px] uppercase tracking-widest text-muted font-black">Customize Global Visuals</p>
             </div>
           </div>

           <div className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-muted mb-4 italic flex items-center gap-2">
                    <Type size={12} /> Primary Headline
                  </label>
                  <input
                    type="text"
                    value={tempHero.title}
                    onChange={(e) => setTempHero({ ...tempHero, title: e.target.value })}
                    className="w-full bg-secondary/30 border-b border-primary/10 p-4 text-sm font-display focus:border-accent outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-muted mb-4 italic">
                    Accent Sub-Head
                  </label>
                  <input
                    type="text"
                    value={tempHero.subtitle}
                    onChange={(e) => setTempHero({ ...tempHero, subtitle: e.target.value })}
                    className="w-full bg-secondary/30 border-b border-primary/10 p-4 text-sm font-display focus:border-accent outline-none transition-colors italic text-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-muted mb-4 italic">
                  Background Video Source
                </label>
                <div className="flex flex-col gap-4">
                   <input
                    type="text"
                    placeholder="Enter mp4 URL (e.g. mixkit.co, pexels.com)"
                    value={tempHero.videoUrl}
                    onChange={(e) => setTempHero({ ...tempHero, videoUrl: e.target.value })}
                    className="w-full bg-secondary/30 border-b border-primary/10 p-4 text-sm focus:border-accent outline-none transition-colors"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleHeroVideoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="w-full border-2 border-dashed border-primary/10 p-8 text-center bg-secondary/10 hover:bg-secondary/30 transition-all">
                       <p className="text-[10px] uppercase tracking-widest font-black text-muted">Or Upload Small File (Max 2MB)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex justify-end">
                <button
                  onClick={handleSaveHero}
                  disabled={isSavingHero}
                  className="bg-primary text-white px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-black luxury-shadow hover:bg-accent transition-all duration-500 flex items-center gap-4"
                >
                  {isSavingHero ? 'Deploying Changes...' : 'Save Appearance Settings'}
                </button>
              </div>
           </div>
        </div>
      )}

      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-20">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={resetForm}
                className="absolute inset-0 bg-primary/60 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-white overflow-hidden luxury-shadow"
            >
              <div className="flex justify-between items-center p-8 border-b border-secondary">
                <h3 className="text-2xl font-display font-medium">
                  {editingId ? 'Edit Property' : 'Add New Property'}
                </h3>
                <button onClick={resetForm} className="text-muted hover:text-primary">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Title</label>
                      <input
                        type="text"
                        value={formState.title}
                        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                        className="w-full bg-secondary/30 border border-secondary p-4 text-sm focus:border-accent outline-none"
                        placeholder="Penthouse in Lagos"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Location</label>
                      <input
                        type="text"
                        value={formState.location}
                        onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                        className="w-full bg-secondary/30 border border-secondary p-4 text-sm focus:border-accent outline-none"
                        placeholder="Lekki Phase 1"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Price (₦)</label>
                        <input
                          type="number"
                          value={formState.price}
                          onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
                          className="w-full bg-secondary/30 border border-secondary p-4 text-sm focus:border-accent outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Type</label>
                        <select
                          value={formState.type}
                          onChange={(e) => setFormState({ ...formState, type: e.target.value as PropertyType })}
                          className="w-full bg-secondary/30 border border-secondary p-4 text-sm focus:border-accent outline-none appearance-none"
                        >
                          {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Category</label>
                        <select
                          value={formState.category}
                          onChange={(e) => setFormState({ ...formState, category: e.target.value as ListingCategory })}
                          className="w-full bg-secondary/30 border border-secondary p-4 text-sm focus:border-accent outline-none appearance-none"
                        >
                          {Object.values(ListingCategory).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Status</label>
                        <select
                          value={formState.status}
                          onChange={(e) => setFormState({ ...formState, status: e.target.value as PropertyStatus })}
                          className="w-full bg-secondary/30 border border-secondary p-4 text-sm focus:border-accent outline-none appearance-none"
                        >
                          {Object.values(PropertyStatus).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Bedrooms</label>
                        <input
                          type="number"
                          value={formState.bedrooms}
                          onChange={(e) => setFormState({ ...formState, bedrooms: Number(e.target.value) })}
                          className="w-full bg-secondary/30 border border-secondary p-4 text-sm focus:border-accent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Bathrooms</label>
                        <input
                          type="number"
                          value={formState.bathrooms}
                          onChange={(e) => setFormState({ ...formState, bathrooms: Number(e.target.value) })}
                          className="w-full bg-secondary/30 border border-secondary p-4 text-sm focus:border-accent outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Description</label>
                      <textarea
                        value={formState.description}
                        onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                        className="w-full bg-secondary/30 border border-secondary p-4 text-sm focus:border-accent outline-none h-[142px] resize-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Main Image (URL or Upload)</label>
                      <div className="flex flex-col gap-3">
                        <input
                          type="url"
                          value={formState.images?.[0]}
                          onChange={(e) => setFormState({ ...formState, images: [e.target.value] })}
                          className="w-full bg-secondary/30 border border-secondary p-4 text-sm focus:border-accent outline-none"
                          placeholder="https://images.unsplash.com/..."
                        />
                        <div className="relative group">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePropertyFileUpload(e, 'images')}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <div className="w-full bg-secondary/10 border border-dashed border-secondary p-3 flex items-center justify-center gap-2 group-hover:bg-secondary/20 transition-all">
                            <Image size={14} className="text-accent" />
                            <span className="text-[9px] uppercase tracking-widest font-black text-muted">Upload From Computer</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Property Video (URL or Upload)</label>
                      <div className="flex flex-col gap-3">
                        <input
                          type="url"
                          value={formState.videoUrl}
                          onChange={(e) => setFormState({ ...formState, videoUrl: e.target.value })}
                          className="w-full bg-secondary/30 border border-secondary p-4 text-sm focus:border-accent outline-none"
                          placeholder="https://assets.mixkit.co/..."
                        />
                        <div className="relative group">
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handlePropertyFileUpload(e, 'videoUrl')}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <div className="w-full bg-secondary/10 border border-dashed border-secondary p-3 flex items-center justify-center gap-2 group-hover:bg-secondary/20 transition-all">
                            <Film size={14} className="text-secondary-foreground" />
                            <span className="text-[9px] uppercase tracking-widest font-black text-muted">Upload Tour Video</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-muted mb-2">Status</label>
                      <select
                        value={formState.status}
                        onChange={(e) => setFormState({ ...formState, status: e.target.value as PropertyStatus })}
                        className="w-full bg-secondary/30 border border-secondary p-4 text-sm focus:border-accent outline-none appearance-none"
                      >
                         {Object.values(PropertyStatus).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-end gap-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-8 py-4 text-xs uppercase tracking-widest font-bold text-muted hover:text-primary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-accent text-white px-12 py-5 text-[10px] uppercase tracking-[0.2em] font-black flex items-center gap-4 hover:bg-primary transition-all duration-500 luxury-shadow"
                  >
                    <Save size={18} />
                    {editingId ? 'Confirm Updates' : 'Publish to Collection'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
