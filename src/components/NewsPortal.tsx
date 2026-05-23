/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, Calendar, ChevronLeft, Award, FileText, Share2, Printer, MapPin, MessageSquare } from 'lucide-react';
import { Berita } from '../types';

interface NewsPortalProps {
  news: Berita[];
  selectedNews: Berita | null;
  setSelectedNews: (b: Berita | null) => void;
}

type KategoriFilter = 'Semua' | 'Pengumuman' | 'Prestasi' | 'Kegiatan' | 'Akademik';

export default function NewsPortal({ news, selectedNews, setSelectedNews }: NewsPortalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeKategori, setActiveKategori] = useState<KategoriFilter>('Semua');

  // Filter List Berita berdasarkan kategori & kata pencarian
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchKategori = activeKategori === 'Semua' || item.kategori === activeKategori;
      const matchSearch = 
        item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.konten.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ringkasan.toLowerCase().includes(searchQuery.toLowerCase());
      return matchKategori && matchSearch;
    });
  }, [news, activeKategori, searchQuery]);

  // Jika ada berita terpilih, tampilkan Halaman Baca Berita (Detail Berita) secara terpisah
  if (selectedNews) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8" id="news-detail-container">
        
        {/* Tombol Back & Alat Kontrol */}
        <div className="flex items-center justify-between border-b pb-4">
          <button
            onClick={() => setSelectedNews(null)}
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-brand-blue hover:text-brand-gold transition-colors cursor-pointer"
            id="btn-news-back-to-list"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Hub Berita</span>
          </button>
          
          <div className="flex items-center space-x-3.5 text-slate-400">
            <button 
              onClick={() => alert(`Membagikan artikel "${selectedNews.judul}" ke Sosial Media...`)} 
              className="hover:text-brand-blue transition-colors p-1"
              title="Bagikan Artikel"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => window.print()} 
              className="hover:text-brand-blue transition-colors p-1"
              title="Cetak Halaman"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gambar Cover Utama Detail */}
        <div className="relative h-[280px] sm:h-[400px] rounded-2xl overflow-hidden border shadow-lg shrink-0">
          <img
            src={selectedNews.gambar}
            alt={selectedNews.judul}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 inline-block px-3 py-1 bg-brand-blue/90 text-brand-gold font-bold text-xs uppercase rounded-lg shadow-md border border-brand-gold/30">
            {selectedNews.kategori}
          </div>
        </div>

        {/* Judul & Metadata */}
        <div className="space-y-4">
          <div className="flex items-center text-slate-400 text-xs space-x-4">
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>{selectedNews.tanggal}</span>
            </span>
            <span className="text-slate-300">|</span>
            <span>Ditulis oleh: <strong>Humas Yayasan</strong></span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-3xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            {selectedNews.judul}
          </h1>
          
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed border-l-4 border-brand-gold pl-4 italic">
            {selectedNews.ringkasan}
          </p>
        </div>

        {/* Konten Terstruktur */}
        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed text-justify space-y-4">
          {selectedNews.konten.split('\n\n').map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Berita Footer Disclaimers */}
        <div className="p-4 bg-slate-50 border rounded-xl text-xs text-slate-500 leading-relaxed text-center">
          Kabar dan pengumuman di atas diterbitkan resmi oleh Kantor Hubungan Masyarakat (Humas) Yayasan Pendidikan Nusantara. Untuk informasi atau konfirmasi pers lebih lanjut, silakan layangkan surel ke <strong className="text-brand-blue">humas@yayasan-nusantara.sch.id</strong>.
        </div>

      </div>
    );
  }

  // JIKA TIDAK ADA BERITA TERPILIH, TAMPILKAN HUB DAFTAR BERITA (GRID VIEW)
  const kategoriList: KategoriFilter[] = ['Semua', 'Pengumuman', 'Prestasi', 'Kegiatan', 'Akademik'];

  return (
    <div className="space-y-12 pb-16" id="news-portal-root">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-medium text-white py-12 md:py-16 text-center shadow-lg border-b-2 border-brand-gold">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Kabar & Agenda</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display">
            Portal Berita Yayasan Nusantara
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Ikuti rilis prestasi tingkat nasional, jadwal ujian seleksi PPDB, kesepakatan magang mancanegara, serta bazzar kebudayaan harian kami.
          </p>
        </div>
      </section>

      {/* Kontrol Penjelajah: Pencarian & Kategori Filter */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="bg-white p-4 rounded-2xl border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4" id="news-filters-panel">
          
          {/* List Kategori */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto" id="news-categories-container">
            {kategoriList.map((kat) => (
              <button
                key={kat}
                onClick={() => setActiveKategori(kat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeKategori === kat
                    ? 'bg-brand-blue text-white shadow-inner border-b-2 border-brand-gold'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-650'
                }`}
                id={`news-cat-${kat}`}
              >
                {kat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Cari berita atau pengumuman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs border rounded-xl outline-none focus:ring-2 focus:ring-brand-blue/30"
              id="news-item-search-bar"
            />
            <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-slate-400" />
          </div>

        </div>
      </section>

      {/* Grid List Berita */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        {filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-white border rounded-2xl p-8 shadow-sm space-y-3">
            <div className="text-slate-300 font-bold text-3xl">?!</div>
            <p className="text-sm text-slate-500 font-medium">Berita atau pengumuman dengan kata ku kunci tersebut tidak ditemukan.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveKategori('Semua'); }}
              className="px-4 py-1.5 bg-brand-blue text-white hover:bg-brand-gold hover:text-slate-900 text-xs font-bold rounded-lg cursor-pointer"
            >
              Reset Setelan Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="news-hub-grid">
            {filteredNews.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col justify-between group h-full cursor-pointer"
                onClick={() => setSelectedNews(item)}
              >
                <div>
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <span className="absolute top-4 left-4 inline-block px-2.5 py-1 bg-brand-blue-medium/90 text-brand-gold text-[10px] font-bold rounded-lg uppercase">
                      {item.kategori}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center text-slate-400 text-[10px] space-x-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.tanggal}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-brand-blue leading-snug line-clamp-2">
                      {item.judul}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {item.ringkasan}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-50">
                  <span className="text-xs font-bold text-brand-blue group-hover:text-brand-gold flex items-center gap-1 transition-colors">
                    Baca Selengkapnya →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
