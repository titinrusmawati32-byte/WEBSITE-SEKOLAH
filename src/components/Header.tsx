/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, GraduationCap, Search, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  adminLoggedIn: boolean;
  onLogoutAdmin: () => void;
}

export default function Header({
  activePage,
  setActivePage,
  adminLoggedIn,
  onLogoutAdmin,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Menentukan list navigasi utama
  const navItems = [
    { title: 'Beranda', page: 'home' as ActivePage },
    { title: 'Profil', page: 'profil' as ActivePage },
    { title: 'Program', page: 'program' as ActivePage },
    { title: 'Berita', page: 'berita' as ActivePage },
    { title: 'Galeri', page: 'galeri' as ActivePage },
    { title: 'Info PPDB', page: 'informasi-pendaftaran' as ActivePage },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-slate-800 shadow-sm border-b border-slate-150" id="header-root">
      {/* Top bar untuk info ringkas & akses admin */}
      <div className="bg-slate-50 border-b border-slate-100 h-9 text-xs flex items-center justify-between px-4 sm:px-8 text-slate-600">
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline text-slate-500">Hubungi Kami: <strong className="text-brand-blue">+62 (21) 829-1025</strong></span>
          <span className="text-slate-400 font-medium">TA 2026/2027</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleNavClick('cek-status')}
            className={`flex items-center space-x-1.5 transition-colors font-semibold hover:text-brand-blue py-1 ${
              activePage === 'cek-status' ? 'text-brand-blue' : 'text-slate-500'
            }`}
            id="nav-cek-status"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Cek Status Seleksi</span>
          </button>
          
          {adminLoggedIn ? (
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Admin Active
              </span>
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className={`transition-colors hover:text-brand-blue font-semibold py-1 ${
                  activePage === 'admin-dashboard' ? 'text-brand-blue' : 'text-slate-500'
                }`}
                id="nav-go-admin"
              >
                Panel Admin
              </button>
              <button
                onClick={onLogoutAdmin}
                className="text-red-500 hover:text-red-600 transition-colors cursor-pointer py-1 font-semibold"
                id="btn-logout-instant"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('admin-login')}
              className={`flex items-center space-x-1 border-l border-slate-200 pl-4 transition-colors hover:text-brand-blue py-1 font-semibold ${
                activePage === 'admin-login' ? 'text-brand-blue' : 'text-slate-500'
              }`}
              id="nav-admin-login"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Login Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand logo */}
        <motion.div
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 cursor-pointer select-none group"
          id="header-brand-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="bg-brand-gold text-white p-3 rounded-full border-2 border-white shadow-md group-hover:rotate-12 transition-transform duration-300 flex items-center justify-center"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <GraduationCap className="w-7 h-7 text-white stroke-[2.5]" />
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight font-display leading-tight text-brand-blue flex items-center gap-1">
              SD <span className="text-brand-pink">NEGERI SUMBEREJO 04</span>
            </h1>
            <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400 leading-none mt-1">
              Sekolah Dasar Unggulan & Ceria
            </p>
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-1.5" id="nav-desktop-menu">
          {navItems.map((item) => {
            const isActive = activePage === item.page;
            return (
              <motion.button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`relative px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-brand-blue shadow-md'
                    : 'text-slate-600 hover:text-brand-blue hover:bg-brand-blue-light/50'
                }`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                id={`nav-item-${item.page}`}
              >
                {item.title}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-2.5 right-2.5 h-1 bg-brand-pink rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
          
          <motion.button
            onClick={() => handleNavClick('pendaftaran-online')}
            className="ml-3 px-6 py-2.5 bg-brand-pink hover:bg-pink-600 text-white font-extrabold text-sm rounded-full shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer border-2 border-white"
            whileHover={{ scale: 1.1, rotate: [-1, 1, -1, 1, 0], transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.95 }}
            id="nav-btn-ppdb-online"
          >
            Ayo Daftar! 🚀
          </motion.button>
        </nav>

        {/* Mobile menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue-light rounded-lg cursor-pointer"
          id="btn-mobile-menu-toggle"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-lg"
            id="mobile-drawer"
          >
            <div className="px-5 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full text-left px-4 py-3 rounded-xl block text-sm font-semibold transition-colors ${
                    activePage === item.page
                      ? 'bg-slate-50 text-brand-blue border-l-4 border-brand-blue'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  id={`nav-mobile-${item.page}`}
                >
                  {item.title}
                </button>
              ))}

              <div className="pt-4 border-t border-slate-100 mt-2 space-y-2.5">
                <button
                  onClick={() => handleNavClick('cek-status')}
                  className="w-full py-2.5 px-4 bg-brand-gold-light text-brand-gold-dark font-extrabold text-center text-sm rounded-full border border-brand-gold block"
                  id="mobile-nav-cek"
                >
                  🔍 Cek Status Penerimaan
                </button>
                <button
                  onClick={() => handleNavClick('pendaftaran-online')}
                  className="w-full py-3 bg-brand-pink text-white font-extrabold text-center text-sm rounded-full shadow-md block border-2 border-white"
                  id="mobile-nav-daftar"
                >
                  🚀 Ayo Daftar SD Ceria!
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
