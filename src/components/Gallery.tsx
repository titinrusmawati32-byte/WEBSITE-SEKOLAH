/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { X, Play, ZoomIn, Eye, Download, Star, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { GaleriItem } from '../types';

interface GalleryProps {
  gallery: GaleriItem[];
}

type KategoriGaleri = 'Semua' | 'SMA' | 'Perguruan Tinggi' | 'Kegiatan' | 'Fasilitas';

export default function Gallery({ gallery }: GalleryProps) {
  const [activeKategori, setActiveKategori] = useState<KategoriGaleri>('Semua');
  const [selectedItem, setSelectedItem] = useState<GaleriItem | null>(null);

  // Kategori List
  const categories: KategoriGaleri[] = ['Semua', 'SMA', 'Perguruan Tinggi', 'Kegiatan', 'Fasilitas'];

  const filteredItems = useMemo(() => {
    return gallery.filter((item) => activeKategori === 'Semua' || item.kategori === activeKategori);
  }, [gallery, activeKategori]);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    const currentIndex = gallery.findIndex((item) => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % gallery.length;
    setSelectedItem(gallery[nextIndex]);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    const currentIndex = gallery.findIndex((item) => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    setSelectedItem(gallery[prevIndex]);
  };

  return (
    <div className="space-y-12 pb-16" id="gallery-root">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-medium text-white py-12 md:py-16 text-center shadow-lg border-b-2 border-brand-gold">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Dokumentasi Foto & Video</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display">
            Galeri Kegiatan Nusantara
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Menyajikan rekam jejak visual lingkungan pembelajaran, momentum sejarah wisuda, eksposisi riset sains, dan asrama taruna terpadu.
          </p>
        </div>
      </section>

      {/* Category Tabs Filter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-100 p-2 rounded-2xl flex flex-wrap gap-1 md:gap-0 justify-center border shadow-inner" id="gallery-filter-bar">
          {categories.map((kat) => (
            <button
              key={kat}
              onClick={() => setActiveKategori(kat)}
              className={`flex-1 py-2 px-3 text-xs md:text-sm font-extrabold rounded-xl transition-all text-center cursor-pointer ${
                activeKategori === kat
                  ? 'bg-brand-blue text-white shadow-md border-b-2 border-brand-gold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200'
              }`}
              id={`gallery-cat-${kat}`}
            >
              {kat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid Photos & Videos */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-photo-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 group relative cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-56 sm:h-64 overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={item.url}
                  alt={item.judul}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                
                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <div className="bg-white text-brand-blue p-2.5 rounded-full shadow-lg">
                    <Eye className="w-5 h-5 text-brand-blue" />
                  </div>
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Perbesar</span>
                </div>

                {/* Badge Kategori */}
                <span className="absolute top-4 left-4 inline-block px-2.5 py-1 bg-brand-blue/90 text-brand-gold text-[10px] font-bold rounded-lg uppercase tracking-wider">
                  {item.kategori}
                </span>

                {/* Video Play indicator */}
                {item.tipe === 'video' && (
                  <div className="absolute bottom-4 right-4 bg-brand-gold text-slate-900 p-2.5 rounded-full shadow-lg">
                    <Play className="w-4 h-4 fill-slate-900" />
                  </div>
                )}
              </div>

              {/* Deskripsi bawah */}
              <div className="p-4 border-t bg-white">
                <h3 className="font-extrabold text-xs sm:text-sm text-slate-800 line-clamp-2 leading-snug">
                  {item.judul}
                </h3>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 text-[10px] text-slate-400 font-semibold uppercase">
                  <span>YPN Nusantara</span>
                  <span className="text-brand-gold font-bold">Zoom {item.tipe}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal detail dengan AnimatePresence */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 transition-opacity"
          id="gallery-lightbox-modal"
          onClick={() => setSelectedItem(null)}
        >
          {/* Tombol Close */}
          <button 
            onClick={() => setSelectedItem(null)} 
            className="absolute top-6 right-6 p-2 bg-white/10 text-white hover:bg-white/20 transition-colors rounded-full cursor-pointer"
            id="gallery-modal-close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Kontainer Utama */}
          <div 
            className="max-w-4xl w-full flex flex-col bg-slate-905 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigasi Kiri */}
            <button 
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-slate-900/60 hover:bg-white hover:text-slate-900 text-white rounded-full transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Navigasi Kanan */}
            <button 
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-slate-900/60 hover:bg-white hover:text-slate-900 text-white rounded-full transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Area Media */}
            <div className="h-[300px] sm:h-[480px] bg-black flex items-center justify-center relative overflow-hidden">
              <img
                src={selectedItem.url}
                alt={selectedItem.judul}
                className="max-w-full max-h-full object-contain"
              />
              
              {selectedItem.tipe === 'video' && (
                <div className="absolute inset-x-0 bottom-6 flex justify-center">
                  <span className="px-4 py-2 bg-brand-gold hover:bg-yellow-500 text-slate-900 font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer">
                    <Play className="w-4 h-4 fill-slate-900" /> Putar Video Dokumentasi (Simulasi)
                  </span>
                </div>
              )}
            </div>

            {/* Keterangan Bawah */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 bg-brand-gold text-slate-900 text-[10px] font-black rounded uppercase tracking-wider">
                  {selectedItem.kategori}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">
                  Yayasan Pendidikan Nusantara
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white leading-normal">
                {selectedItem.judul}
              </h2>
              <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-[10px] text-slate-400">
                <span>Dokumentasi Resmi 2026</span>
                <button
                  onClick={() => alert(`Mengunduh berkas aset "${selectedItem.judul}" dalam resolusi penuh...`)}
                  className="flex items-center gap-1.5 text-brand-gold font-bold hover:underline cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Unduh Resolusi Penuh
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
