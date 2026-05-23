/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  CheckCircle, ChevronRight, GraduationCap, LayoutGrid, Award, 
  Layers, Star, ShieldCheck, Heart, Calendar, ArrowRight, Smile, Sparkles, BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProgramPendidikan, ActivePage } from '../types';

interface ProgramsProps {
  programs: ProgramPendidikan[];
  setActivePage: (p: ActivePage) => void;
}

export default function Programs({ programs, setActivePage }: ProgramsProps) {
  // Secara bawaan kita render program SMA (id: "sma") yaitu SD Kelas Rendah
  const [activeTab, setActiveTab] = useState<'sma' | 'pt'>('sma');

  const selectedProg = programs.find((p) => p.id === activeTab) || programs[0];

  return (
    <div className="space-y-12 pb-16 bg-amber-50/10" id="programs-root">
      
      {/* Page Header banner */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-medium text-white py-12 md:py-16 text-center shadow-md relative overflow-hidden border-b-4 border-dashed border-brand-blue/20">
        <div className="absolute top-0 right-0 p-10 opacity-10 text-8xl pointer-events-none">🧸</div>
        <div className="absolute bottom-0 left-0 p-10 opacity-10 text-8xl pointer-events-none">🎨</div>
        <div className="max-w-4xl mx-auto px-4 space-y-3 relative z-10">
          <span className="text-brand-gold text-sm font-black bg-white/20 px-3.5 py-1.5 rounded-full inline-block">⭐ Jendela Kurikulum SD Nusantara</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-display text-white">
            Program Belajar Ceria Kita!
          </h1>
          <p className="text-slate-100 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed font-bold">
            Ingin tahu pelajaran apa saja yang akan kita pelajari bersama Kakak dan Bunda guru? Intip detail keseruan dan fasilitas ramah anak milik SD Nusantara di bawah ini.
          </p>
        </div>
      </section>

      {/* Interactive Tabs Switching */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-100 p-2.5 rounded-full flex border-3 border-brand-blue-medium/20 shadow-inner" id="programs-tab-bar">
          <motion.button
            onClick={() => setActiveTab('sma')}
            className={`flex-1 py-3.5 text-sm font-black rounded-full transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              activeTab === 'sma'
                ? 'bg-brand-blue text-white shadow-md border-2 border-white'
                : 'text-slate-600 hover:text-brand-blue hover:bg-slate-200/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <GraduationCap className="w-5 h-5 shrink-0 stroke-[2.5]" />
            <span>SD Kelas Rendah (Kelas 1 - 3) 🎈</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('pt')}
            className={`flex-1 py-3.5 text-sm font-black rounded-full transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              activeTab === 'pt'
                ? 'bg-brand-pink text-white shadow-md border-2 border-white'
                : 'text-slate-600 hover:text-brand-pink hover:bg-slate-200/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BookOpen className="w-5 h-5 shrink-0 stroke-[2.5]" />
            <span>SD Kelas Tinggi (Kelas 4 - 6) 🚀</span>
          </motion.button>
        </div>
      </section>

      {/* Detail Content Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sisi Kiri: Deskripsi Utama, Akreditasi, Keunggulan & Layanan */}
          <div className="lg:col-span-7 space-y-8" id="programs-content-left">
            
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-block px-4 py-1.5 bg-brand-gold-light text-brand-gold-dark font-black text-xs uppercase border-2 border-brand-gold/30 rounded-full shadow-xs">
                  🎖️ {selectedProg.akreditasi}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-blue font-display">
                {activeTab === 'sma' ? '🍎 Kelas Rendah (1-3)' : '🚀 Kelas Tinggi (4-6)'} - {selectedProg.nama}
              </h2>
              <p className="text-slate-650 text-base leading-relaxed text-justify font-bold">
                {selectedProg.deskripsi}
              </p>
            </div>

            {/* Keunggulan Pilihan */}
            <motion.div 
              className="bg-white p-6 rounded-3xl border-3 border-brand-blue-medium/10 shadow-md space-y-4 relative overflow-hidden"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              whileHover={{ y: -10, scale: 1.01 }}
            >
              <div className="absolute right-0 bottom-0 p-5 opacity-5 text-7xl font-bold">⭐</div>
              <h3 className="font-black text-lg text-brand-blue border-b-2 border-dashed pb-2 flex items-center gap-2">
                <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
                Mengapa Berpetualang Bersama Kami?
              </h3>
              <ul className="space-y-3">
                {selectedProg.keunggulan.map((k, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-sm text-slate-705 font-bold">
                    <CheckCircle className="w-5 h-5 text-brand-green mt-0.5 shrink-0 stroke-[2.5]" />
                    <span className="leading-snug">{k}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Fasilitas */}
            <motion.div 
              className="bg-white p-6 rounded-3xl border-3 border-brand-pink/10 shadow-md space-y-4 relative overflow-hidden"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut", delay: 0.3 }}
              whileHover={{ y: -10, scale: 1.01 }}
            >
              <div className="absolute right-1 bottom-1 p-5 opacity-5 text-6xl">🛴</div>
              <h3 className="font-black text-lg text-brand-pink border-b-2 border-dashed pb-2 flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-pink" />
                Ruang Penunjang & Fasilitas Anak
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
                {selectedProg.fasilitas.map((f, i) => (
                  <div key={i} className="p-4 bg-amber-50/50 border-2 border-brand-gold-light rounded-2xl flex items-center space-x-3 shadow-2xs">
                    <div className="w-3.5 h-3.5 bg-brand-pink rounded-full shrink-0 flex items-center justify-center text-[8px] text-white font-bold">✓</div>
                    <span className="text-xs text-slate-700 font-bold leading-tight">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Sisi Ranan: Kurikulum & Mata Pelajaran */}
          <div className="lg:col-span-5 space-y-6" id="programs-content-right">
            
            <motion.div 
              className="bg-brand-gold-light/60 p-6 rounded-3xl border-3 border-dashed border-brand-gold shadow-md space-y-5"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.4, ease: "easeInOut", delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.01 }}
            >
              <div className="border-b-2 border-brand-gold-dark/30 pb-3">
                <h3 className="font-black text-lg text-brand-blue flex items-center gap-2 font-display">
                  <Award className="w-5 h-5 text-brand-gold-dark" />
                  Mata Pelajaran & Mainan Edukatif
                </h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1 leading-none font-black">
                  Daftar Kegiatan Pelajaran Ramah Anak
                </p>
              </div>

              {/* Kurikulum Item Loops */}
              <div className="space-y-4">
                {selectedProg.kurikulum.map((kur, kIdx) => (
                  <div key={kIdx} className="space-y-2.5">
                    <h4 className="text-xs font-black text-slate-800 bg-white px-3.5 py-2 rounded-full border-2 border-brand-blue shadow-xs flex items-center gap-1.5">
                      <span>🎈</span> {kur.periode === 'Fase E (Kelas X SMA)' ? 'Kelas 1 (Awal Ceria)' : kur.periode === 'Fase F - Peminatan MIPA (Kelas XI & XII)' ? 'Kelas 2 & 3 (Eksplorasi)' : kur.periode}
                    </h4>
                    <div className="grid grid-cols-1 gap-1.5 pl-2">
                      {kur.matapelajaran.map((mapel, mIdx) => (
                        <div key={mIdx} className="flex items-center text-xs text-slate-700 py-1.5 border-b border-brand-gold-dark/10 last:border-0 pl-1 font-bold">
                          <ChevronRight className="w-4 h-4 text-brand-pink shrink-0 mr-1.5" />
                          <span>{mapel}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Tambahan Kurikulum */}
              <div className="p-3.5 bg-white rounded-2xl border-2 border-dashed border-brand-gold text-[10px] text-slate-500 font-bold leading-relaxed text-justify">
                Rancangan pelajaran sekolah dasar kami dikembangkan agar melatih ketangkasan sensorik, kepekaan sosial, kerjasama dalam kelompok, dan meletakkan budi pekerti dasar secara menyenangkan.
              </div>
            </motion.div>

            {/* CTA Daftar */}
            <motion.div 
              className="bg-brand-blue-light/50 p-6 rounded-3xl border-3 border-brand-blue/20 text-center space-y-4 shadow-sm"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.5 }}
              whileHover={{ y: -10, scale: 1.01 }}
            >
              <h4 className="font-black text-base text-brand-blue">
                Mau Bergabung Menjadi Petualang Hebat? 🥰
              </h4>
              <p className="text-xs text-slate-600 font-bold">
                Pendaftaran murid baru sangat mudah! Hanya perlu mengisi nama, tanggal lahir, dan melampirkan foto senyum menggemaskannya.
              </p>
              <div className="pt-2">
                <motion.button
                  onClick={() => setActivePage('pendaftaran-online')}
                  className="w-full py-3 bg-brand-pink hover:bg-pink-600 text-white font-extrabold text-xs rounded-full shadow-md flex items-center justify-center gap-1.5 cursor-pointer border-b-3 border-pink-700"
                  whileHover={{ scale: 1.05 }}
                  id="prog-btn-daftar-sekarang"
                >
                  <span>Daftar Online Sekarang! 🚀</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

    </div>
  );
}
