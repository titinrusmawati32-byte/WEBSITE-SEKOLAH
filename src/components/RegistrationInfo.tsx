/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, FileText, CheckCircle, ArrowRight, BookOpen, GraduationCap, Clock, HelpCircle, Smile, Gift, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { ActivePage } from '../types';

interface RegistrationInfoProps {
  setActivePage: (p: ActivePage) => void;
}

export default function RegistrationInfo({ setActivePage }: RegistrationInfoProps) {
  // Alur pendaftaran gembira
  const steps = [
    {
      step: '1',
      title: 'Tulis Surat Pendaftaran 📝',
      desc: 'Isi nama imut adik, tanggal ulang tahun, Dan profil Ayah Bunda di halaman "Ayo Daftar".'
    },
    {
      step: '2',
      title: 'Kirim Pasfoto Lucu 📷',
      desc: 'Lampirkan foto ananda yang paling gembira tersenyum lebar beserta Akta Lahir.'
    },
    {
      step: '3',
      title: 'Kakak Guru Membaca 🧐',
      desc: 'Bunda dan Kakak Guru SD Nusantara meninjau surat pendaftaranmu dengan penuh kehangatan.'
    },
    {
      step: '4',
      title: 'Cek Bintang Kelulusan 🌟',
      desc: 'Buka menu "Cek Status" menggunakan nomormu untuk melihat sambutan selamat datang.'
    },
    {
      step: '5',
      title: 'Pesta Penyambutan! 🥳',
      desc: 'Mengambil seragam baru yang lucu, bermain perosotan di playground, dan makan es krim bersama!'
    }
  ];

  return (
    <div className="space-y-12 pb-16 bg-amber-50/15 min-h-screen" id="reg-info-root">
      
      {/* Page Header Banner */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-medium text-white py-12 md:py-16 text-center shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-1 opacity-10 text-8xl pointer-events-none">🎈</div>
        <div className="absolute bottom-1 left-2 opacity-15 text-7xl pointer-events-none">🧸</div>
        <div className="max-w-4xl mx-auto px-4 space-y-3 relative z-10">
          <span className="text-brand-gold text-sm font-black bg-white/20 px-3.5 py-1.5 rounded-full inline-block">📋 Panduan Pendaftaran SD Nusantara</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-display text-white">
            Informasi Pendaftaran Ceria!
          </h1>
          <p className="text-slate-105 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed font-bold">
            Ingin bergabung bermain dan belajar bersama teman-teman baru? Di sini ada jadwal lengkap, beasiswa istimewa, dan syarat pendaftaran yang sangat mudah.
          </p>
        </div>
      </section>

      {/* Grid: Jadwal Seleksi & Syarat Dokumen */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Kolom Kiri: Jadwal Gelombang Pendaftaran */}
        <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-3xl border-4 border-dashed border-brand-blue/20 shadow-md space-y-6 flex flex-col justify-between" id="reg-info-schedule">
          <div className="space-y-5">
            <h2 className="font-black text-lg text-brand-blue border-b-2 border-dashed border-slate-150 pb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-pink" />
              Kalender Pendaftaran Ceria 2026/2027
            </h2>

            <div className="space-y-4">
              <motion.div 
                className="p-4 bg-emerald-50/50 border-3 border-dashed border-brand-green rounded-3xl space-y-1.5"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex justify-between items-center text-xs font-black text-brand-green">
                  <span>🚀 GELOMBANG I (BINTANG CERIA)</span>
                  <span className="px-2.5 py-1 bg-brand-green text-white font-black rounded-full uppercase text-[9px] animate-pulse">
                    KINI AKTIF
                  </span>
                </div>
                <p className="text-xs text-slate-550 font-bold">Pendaftaran dibuka: Mei s.d Juli 2026</p>
                <p className="text-xs text-slate-600 text-justify font-bold">
                  ★ Hadiah Spesial: Gratis mainan bongkar pasang edukatif Lego, pengenalan kelas coding mini gratis, dan potongan biaya perlengkapan asrama sekolah dasar!
                </p>
              </motion.div>

              <div className="p-4 bg-slate-50 border-3 border-dashed border-slate-200 rounded-3xl space-y-1.5 opacity-60">
                <div className="flex justify-between items-center text-xs font-black text-slate-400">
                  <span>💤 GELOMBANG II (SAHABAT BARU)</span>
                  <span className="text-[9px] font-black uppercase text-slate-450 bg-slate-200 px-2 py-0.5 rounded-full">Belum Dibuka</span>
                </div>
                <p className="text-xs text-slate-400 font-bold">Pendaftaran: Agustus 2026</p>
                <p className="text-xs text-slate-400 text-justify font-black">Membuka kesempatan umum untuk kelas reguler pagi-siang.</p>
              </div>
            </div>
          </div>

          <div className="bg-brand-blue text-white p-4 rounded-2xl border-2 border-white shadow-md text-xs flex gap-3 mt-4 items-center">
            <Clock className="w-6 h-6 text-brand-gold animate-bounce shrink-0" />
            <p className="text-slate-100 font-bold leading-snug">
              Yuk Ayah Bunda, segera kirim berkas si kecil sebelum Gelombang Bintang Ceria berakhir pada <strong className="text-brand-gold">15 Juli 2026</strong>!
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Syarat Ketentuan Berkas */}
        <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-3xl border-4 border-dashed border-brand-pink/20 shadow-md space-y-6" id="reg-info-terms">
          <h2 className="font-black text-lg text-brand-blue border-b-2 border-dashed border-slate-150 pb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-gold" />
            Syarat Gampang Calon Murid baru
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
            {/* Syarat SMA (Rendah) */}
            <div className="space-y-3">
              <h3 className="font-black text-sm text-brand-blue uppercase tracking-wider flex items-center gap-1 bg-brand-blue-light/50 px-3 py-1.5 rounded-full">
                <span>🧸</span> Kelas 1 - 3
              </h3>
              <ul className="space-y-2 text-xs text-slate-650 font-bold">
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Lulusan TK atau PAUD ceria</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Usia minimal 6 tahun</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Suka mewarnai & bersahabat baik</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Membawa Akta Kelahiran asli</span>
                </li>
              </ul>
            </div>

            {/* Syarat PT (Tinggi) */}
            <div className="space-y-3">
              <h3 className="font-black text-sm text-brand-pink uppercase tracking-wider flex items-center gap-1 bg-pink-50 px-3 py-1.5 rounded-full">
                <span>🚀</span> Kelas 4 - 6
              </h3>
              <ul className="space-y-2 text-xs text-slate-650 font-bold">
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-pink shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Pindahan SD resmi</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-pink shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Membawa buku rapor sekolah dasar</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-pink shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Tertarik merakit robot cilik Scratch</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-pink shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Sehat jasmani & ceria berkreasi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </section>

      {/* Alur Seleksi Visual (Timeline style flowchart) */}
      <section className="bg-brand-gold-light/40 py-12 border-y-4 border-dashed border-brand-gold" id="reg-info-flowchart">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xs font-black text-brand-pink uppercase tracking-widest">★ PETA PETUALANGAN daftar</h2>
            <h3 className="text-3xl font-black text-brand-blue font-display">Alur Pendaftaran Online</h3>
            <p className="text-xs text-slate-500 font-bold">
              Yuk ikuti langkah-langkah mudah mendaftar agar segera resmi menjadi bagian sahabat cilik SD Nusantara!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative" id="steps-scoller">
            {steps.map((item, sIdx) => (
              <motion.div 
                key={sIdx} 
                className="bg-white p-5 rounded-3xl border-3 border-dashed border-slate-200 relative space-y-3.5 flex flex-col justify-between"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Visual Number circle indicator */}
                <div className="flex justify-between items-center shrink-0">
                  <span className="w-8 h-8 rounded-full bg-brand-pink text-white font-black text-sm flex items-center justify-center">
                    {item.step}
                  </span>
                  <span className="text-[10px] text-brand-blue font-black uppercase tracking-widest">
                    Langkah {item.step}
                  </span>
                </div>

                <div className="space-y-1.5 flex-grow font-bold">
                  <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-505 leading-relaxed text-left">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Area */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 text-center" id="reg-info-cta-block">
        <div className="bg-brand-blue text-white p-6 md:p-8 rounded-3xl border-4 border-white shadow-xl space-y-5 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 text-7xl opacity-10">🎁</div>
          <h3 className="text-xl sm:text-2xl font-black font-display text-brand-gold">
            Siap Mengajak Si Kecil Memulai Petualangan Barunya? ✨
          </h3>
          <p className="text-xs text-slate-200 font-bold max-w-xl mx-auto leading-relaxed">
            Pendaftaran online sekolah dasar kami dirancang sangat menyenangkan, tanpa repot, dan ramah anak. Ayo bergabung di keluarga besar SD Nusantara!
          </p>
          <div className="pt-2">
            <motion.button
              onClick={() => setActivePage('pendaftaran-online')}
              className="px-8 py-4 bg-brand-pink hover:bg-pink-600 text-white font-extrabold text-xs sm:text-sm rounded-full transition-all shadow-md flex items-center gap-2 mx-auto cursor-pointer border-b-4 border-pink-700"
              whileHover={{ scale: 1.05 }}
              id="info-btn-goto-pendaftaran"
            >
              <span>Isi Formulir Pendaftaran Ceria Sekarang! 🚀</span>
              <ArrowRight className="w-5 h-5 shrink-0 animate-pulse" />
            </motion.button>
          </div>
        </div>
      </section>

    </div>
  );
}
