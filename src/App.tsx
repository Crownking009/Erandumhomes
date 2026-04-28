/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Property, Inquiry, HeroConfig } from './types';
import { INITIAL_PROPERTIES } from './constants';
import Home from './pages/Home';
import Listings from './pages/Listings';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import PropertyDetails from './pages/PropertyDetails';
import ServicesPage from './pages/ServicesPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [heroConfig, setHeroConfig] = useState<HeroConfig>({
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-of-a-modern-apartment-4348-large.mp4',
    title: 'Experience Premier',
    subtitle: 'Lagos Living.',
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Load properties from localStorage or use initial data
    const saved = localStorage.getItem('erandum_properties_v2');
    if (saved) {
      setProperties(JSON.parse(saved));
    } else {
      setProperties(INITIAL_PROPERTIES);
      localStorage.setItem('erandum_properties_v2', JSON.stringify(INITIAL_PROPERTIES));
    }

    // Load inquiries from localStorage
    const savedInquiries = localStorage.getItem('erandum_inquiries');
    if (savedInquiries) {
      setInquiries(JSON.parse(savedInquiries));
    }

    // Load hero config from localStorage
    const savedHero = localStorage.getItem('erandum_hero');
    if (savedHero) {
      setHeroConfig(JSON.parse(savedHero));
    }

    // Check admin auth from session storage
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleUpdateProperties = (newProperties: Property[]) => {
    setProperties(newProperties);
    localStorage.setItem('erandum_properties', JSON.stringify(newProperties));
  };

  const handleAddInquiry = (inquiry: Inquiry) => {
    const updatedInquiries = [inquiry, ...inquiries];
    setInquiries(updatedInquiries);
    localStorage.setItem('erandum_inquiries', JSON.stringify(updatedInquiries));
  };

  const handleUpdateInquiries = (newInquiries: Inquiry[]) => {
    setInquiries(newInquiries);
    localStorage.setItem('erandum_inquiries', JSON.stringify(newInquiries));
  };

  const handleUpdateHero = (config: HeroConfig) => {
    setHeroConfig(config);
    localStorage.setItem('erandum_hero', JSON.stringify(config));
  };

  const handleLogin = (status: boolean) => {
    setIsAdmin(status);
    if (status) {
      sessionStorage.setItem('admin_authenticated', 'true');
    } else {
      sessionStorage.removeItem('admin_authenticated');
    }
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar isAdmin={isAdmin} onLogout={() => handleLogin(false)} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home properties={properties} heroConfig={heroConfig} />} />
              <Route path="/listings" element={<Listings properties={properties} />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/property/:id" element={<PropertyDetails properties={properties} onInquiry={handleAddInquiry} />} />
              <Route 
                path="/admin/login" 
                element={isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={() => handleLogin(true)} />} 
              />
              <Route 
                path="/admin/dashboard" 
                element={isAdmin ? <AdminDashboard 
                  properties={properties} 
                  onUpdate={handleUpdateProperties} 
                  inquiries={inquiries} 
                  onUpdateInquiries={handleUpdateInquiries}
                  heroConfig={heroConfig}
                  onUpdateHero={handleUpdateHero}
                /> : <Navigate to="/admin/login" />} 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
