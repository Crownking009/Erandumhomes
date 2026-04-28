/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Home as HomeIcon, LogOut, ShieldCheck, Instagram, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  isAdmin: boolean;
  onLogout: () => void;
}

export default function Navbar({ isAdmin, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Inventory', path: '/listings' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-secondary/80 backdrop-blur-lg border-b border-accent/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Logo size="md" hideIcon />

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.name}
                  href={link.path}
                  className="relative text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60 hover:text-accent transition-all duration-300 group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60 hover:text-accent transition-all duration-300 group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            ))}
            
            {isAdmin ? (
              <div className="flex items-center gap-6">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white bg-accent px-6 py-3 rounded-none hover:bg-primary transition-all luxury-shadow"
                >
                  <ShieldCheck size={14} />
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="text-primary/70 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <a 
                  href="https://www.instagram.com/erandum_homes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/60 hover:text-accent transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <Link
                  to="/admin/login"
                  className="w-10 h-10 flex items-center justify-center border border-primary/10 rounded-full text-primary/30 hover:text-accent hover:border-accent transition-all"
                  title="Admin Access"
                >
                  <ShieldCheck size={16} />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-4">
            <a 
              href="https://www.instagram.com/erandum_homes/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/60 hover:text-accent transition-colors"
            >
              <Instagram size={20} />
            </a>
            {!isAdmin && (
              <Link
                to="/admin/login"
                className="text-primary/60 hover:text-accent transition-all"
                title="Admin Access"
              >
                <ShieldCheck size={20} />
              </Link>
            )}
            <button
              className="text-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-secondary border-b border-primary/5"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                link.path.startsWith('/#') ? (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-sm uppercase tracking-widest font-semibold text-primary"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-sm uppercase tracking-widest font-semibold text-primary"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              {isAdmin ? (
                <div className="flex flex-col gap-6 pt-4 border-t border-primary/5">
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-accent"
                  >
                    <ShieldCheck size={16} />
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-red-500"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-8 pt-6 border-t border-primary/5">
                  <a 
                    href="https://www.instagram.com/erandum_homes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Instagram size={22} />
                  </a>
                  <Link
                    to="/admin/login"
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-primary/40"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShieldCheck size={18} />
                    Admin Access
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
