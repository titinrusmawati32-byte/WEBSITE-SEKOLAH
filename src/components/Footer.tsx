/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduationCap, MapPin, Phone, Mail, FileText, ArrowUp, CheckCircle, Download } from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  onDownloadBrochure: (program: 'sma' | 'pt') => void;
}

export default function Footer({ setActivePage, onDownloadBrochure }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200/80 pt-16 pb-8" id="footer-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Kolom 1: Branding & Deskripsi */}
        <div className="space-y-4" id="footer-branding">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setActivePage('home'); window.scrollTo({ top: 0 }); }}>
            <div className="bg-brand-blue p-2 rounded-xl text-white shadow-xs">
              <GraduationCap className="w-6 h-6 text-brand-gold" />
            </div>
            <span className="font-display font-bold text-brand-blue tracking-tight leading-snug">
              YAYASAN PENDIDIKAN <br />
              <span className="text-brand-gold text-sm tracking-wider uppercase">NUSANTARA</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Menyelenggarakan jenjang sekolah menengah atas bergengsi (SMA Nusantara) dan perguruan tinggi unggul terakreditasi nasional, membentuk bibit unggul perubah masa depan bangsa Indonesia.
          </p>
          <div className="flex space-x-2 pt-2">
            {['facebook', 'instagram', 'youtube', 'twitter'].map((soc) => (
              <a
                key={soc}
                href="#"
                onClick={(e) => { e.preventDefault(); alert(`Menghubungkan ke ${soc} Yayasan Pendidikan Nusantara...`); }}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-brand-blue hover:bg-brand-blue hover:text-white flex items-center justify-center transition-all text-slate-400 text-xs font-bold uppercase shadow-2xs"
                title={`Kunjungi kami di ${soc}`}
              >
                {soc[0].toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Kolom 2: Navigasi Cepat */}
        <div className="space-y-4" id="footer-links">
          <h3 className="font-display font-bold text-slate-800 border-b border-slate-200 pb-2 text-xs tracking-wider uppercase">
            Peta Situs
          </h3>
          <ul className="space-y-2 text-xs">
            {[
              { label: 'Beranda Utama', page: 'home' as ActivePage },
              { label: 'Profil Yayasan', page: 'profil' as ActivePage },
              { label: 'Program & Kurikulum', page: 'program' as ActivePage },
              { label: 'Portal Berita & Pengumuman', page: 'berita' as ActivePage },
              { label: 'Galeri Foto Kegiatan', page: 'galeri' as ActivePage },
              { label: 'Kontak & Alamat Kami', page: 'kontak' as ActivePage },
              { label: 'Informasi Jalur PPDB', page: 'informasi-pendaftaran' as ActivePage },
            ].map((link) => (
              <li key={link.page}>
                <button
                  onClick={() => { setActivePage(link.page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-brand-blue text-slate-500 transition-colors flex items-center space-x-1.5 text-left w-full font-medium"
                >
                  <span className="text-brand-blue text-lg leading-none select-none">•</span>
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Unduh Brosur Resmi */}
        <div className="space-y-4" id="footer-downloads">
          <h3 className="font-display font-bold text-slate-800 border-b border-slate-200 pb-2 text-xs tracking-wider uppercase">
            Brosur PPDB
          </h3>
          <p className="text-xs text-slate-500">
            Dapatkan file PDF katalog lengkap, rincian biaya, jadwal tes, dan kurikulum kami.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => onDownloadBrochure('sma')}
              className="w-full flex items-center justify-between px-3 py-2 bg-white hover:bg-slate-100/30 hover:text-brand-blue text-xs font-semibold rounded-lg transition-colors border border-slate-200 text-slate-700 shadow-2xs"
            >
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-brand-blue" />
                Brosur SMA Nusantara
              </span>
              <Download className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              onClick={() => onDownloadBrochure('pt')}
              className="w-full flex items-center justify-between px-3 py-2 bg-white hover:bg-slate-100/30 hover:text-brand-blue text-xs font-semibold rounded-lg transition-colors border border-slate-200 text-slate-700 shadow-2xs"
            >
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-brand-blue" />
                Brosur Univ Nusantara
              </span>
              <Download className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-100 p-2.5 rounded-lg text-[11px] text-emerald-800 flex items-start space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Pendaftaran Tahun Akademik 2026/2027 Gelombang I saat ini aktif dibuka.</span>
          </div>
        </div>

        {/* Kolom 4: Hubungi Kami */}
        <div className="space-y-4" id="footer-contact">
          <h3 className="font-display font-bold text-slate-800 border-b border-slate-200 pb-2 text-xs tracking-wider uppercase">
            Kantor Pusat YPN
          </h3>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              <span className="leading-relaxed text-slate-500 font-medium">
                Kampus Raya Nusantara, Jl. Pendidikan Kebangsaan No. 101, Kuningan Timur, Setiabudi, Jakarta Selatan, 12950
              </span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-brand-blue shrink-0" />
              <span className="text-slate-500 font-medium">+62 (21) 829-1025 / 829-1026</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-brand-blue shrink-0" />
              <span className="text-slate-500 font-medium hover:text-brand-blue break-all">info@yayasan-nusantara.sch.id</span>
            </li>
          </ul>
        </div>
        
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-center sm:text-left text-xs text-slate-400 font-medium">
          © 2026 Yayasan Pendidikan Nusantara. Hak Cipta Dilindungi Undang-Undang. <br />
          Sistem Penerimaan Peserta Didik & Mahasiswa Baru Terintegrasi.
        </p>
        <button
          onClick={scrollToTop}
          className="p-2 bg-white border border-slate-200 text-slate-400 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all rounded-xl flex items-center justify-center cursor-pointer shadow-2xs"
          title="Kembali ke atas"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
