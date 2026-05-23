/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, Award, BookOpen, Users, Building, ChevronRight, 
  MapPin, Phone, Mail, FileText, Calendar, Sparkles, Star, Quote,
  GraduationCap, Smile, Heart, Palette, Rocket, HelpCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { Berita, GaleriItem, ProfilYayasan, ActivePage } from '../types';

interface HomepageProps {
  news: Berita[];
  gallery: GaleriItem[];
  profile: ProfilYayasan;
  setActivePage: (page: ActivePage) => void;
  setSelectedNews: (berita: Berita) => void;
  onDownloadBrochure: (program: 'sma' | 'pt') => void;
}

export default function Homepage({
  news,
  gallery,
  profile,
  setActivePage,
  setSelectedNews,
  onDownloadBrochure,
}: HomepageProps) {
  // Ambil 3 berita teratas / teranyar
  const latestNews = news.slice(0, 3);
  // Ambil 4 galeri acak
  const previewGallery = gallery.slice(0, 4);

  // State untuk interaktivitas peta
  const [activeMapPin, setActiveMapPin] = useState(true);

  // State Kontak Form
  const [formNama, setFormNama] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPesan, setFormPesan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNama || !formEmail || !formPesan) {
      alert('Mohon lengkapi semua isian formulir!');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormNama('');
      setFormEmail('');
      setFormPesan('');
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  // List sticker menggemaskan yang melayang
  const stickers = [
    { text: '🎈 Bermain Seru', color: 'bg-brand-pink', x: '10%', y: '15%' },
    { text: '🌟 Gurunya Baik', color: 'bg-brand-gold', x: '82%', y: '12%' },
    { text: '🚀 Coding Cilik', color: 'bg-brand-blue', x: '4%', y: '75%' },
    { text: '🎨 Mewarnai Gembira', color: 'bg-brand-green', x: '85%', y: '72%' },
  ];

  return (
    <div className="space-y-16 pb-16 overflow-x-hidden bg-amber-50/20" id="homepage-root">
      
      {/* 1. HERO SECTION (Bouncy, Pastel, Melayang) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-light via-white to-brand-gold-light text-slate-800 py-16 lg:py-24 border-b-4 border-dashed border-brand-blue/20" id="hero-section">
        {/* Melayang stickers background */}
        {stickers.map((st, i) => (
          <motion.div
            key={i}
            className={`absolute hidden md:flex items-center px-4 py-2 rounded-full text-white font-extrabold text-xs shadow-md ${st.color} border-2 border-white`}
            style={{ left: st.x, top: st.y }}
            animate={{ 
              y: [0, -12, 0],
              rotate: [i % 2 === 0 ? -3 : 3, i % 2 === 0 ? 3 : -3, i % 2 === 0 ? -3 : 3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3 + i, 
              ease: "easeInOut" 
            }}
          >
            {st.text}
          </motion.div>
        ))}

        {/* Floating clouds deco */}
        <div className="absolute top-10 left-1/4 opacity-10 animate-cloud pointer-events-none">
          <span className="text-8xl">☁️</span>
        </div>
        <div className="absolute top-24 right-1/3 opacity-15 animate-cloud pointer-events-none" style={{ animationDelay: '2s' }}>
          <span className="text-7xl">☁️</span>
        </div>
        <div className="absolute bottom-12 left-1/2 opacity-10 animate-cloud pointer-events-none" style={{ animationDelay: '4s' }}>
          <span className="text-6xl">☁️</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-gold text-slate-900 text-xs font-black uppercase tracking-wider border-2 border-white shadow-md animate-bounce">
              <Sparkles className="w-4 h-4 text-white fill-white" />
              <span>PENERIMAAN MURID BARU SD NEGERI SUMBEREJO 04</span>
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-display text-brand-blue leading-none">
              Ayo Belajar Ceria, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-gold-dark to-brand-purple">
                Bermain Gembira! ✨
              </span>
            </h1>
            
            <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-bold">
              SD Negeri Sumberejo 04 mempersembahkan dunia sekolah yang ramah anak, penuh warna, dan seru! Kami mengasah bakat hebat si kecil lewat robotik cilik, coding catur lego, sains ceria, dan petualangan penuh kasih sayang. 🥰
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.button
                onClick={() => setActivePage('pendaftaran-online')}
                className="w-full sm:w-auto px-8 py-4 bg-brand-pink hover:bg-pink-600 text-white font-extrabold text-base rounded-full shadow-lg border-b-4 border-pink-700 transform cursor-pointer flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                id="hero-cta-daftar"
              >
                <Rocket className="w-5 h-5 animate-pulse" />
                <span>Mau Daftar Sekolah! 🎒</span>
              </motion.button>
              <motion.button
                onClick={() => setActivePage('informasi-pendaftaran')}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-amber-50 text-brand-blue font-black text-sm rounded-full border-3 border-brand-blue shadow-md transition-all text-center cursor-pointer"
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                id="hero-cta-info"
              >
                Lihat Jadwal & Beasiswa ⭐
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Image widget */}
          <motion.div 
            className="lg:col-span-5 relative" 
            id="hero-widget"
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.2 }}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute inset-0 bg-brand-pink/10 transform rotate-6 rounded-3xl"></div>
              <div className="absolute inset-0 bg-brand-gold/10 transform -rotate-3 rounded-3xl"></div>
              <div className="relative bg-white border-4 border-brand-blue p-3.5 rounded-3xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=500"
                  alt="Anak-anak belajar ceria"
                  className="rounded-2xl w-full object-cover h-64 sm:h-80 border-2 border-dashed border-slate-200"
                />
                
                {/* Floating kid-badge */}
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-brand-blue text-white p-4 rounded-3xl flex items-center gap-3 shadow-xl max-w-xs border-4 border-white"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  <div className="bg-brand-gold text-white p-2.5 rounded-2xl shrink-0 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-lg font-black leading-none text-brand-gold">Sekolah Ramah Anak</p>
                    <p className="text-[10px] text-brand-blue-light mt-1 font-bold">AKREDITASI A (UNGGUL & FUN)</p>
                  </div>
                </motion.div>
                
                {/* Smiley float */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-brand-green text-white p-2.5 rounded-full shadow-lg border-3 border-white text-xl font-bold flex items-center justify-center"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                >
                  😊
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PENGANTAR / PERKENALAN YAYASAN (Friendly & Engaging) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8" id="yayasan-intro">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏫</span>
              <h2 className="text-sm font-black tracking-widest text-brand-pink uppercase">Mengenal Lebih Dekat</h2>
            </div>
            
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-blue" id="intro-title">
              Sekolah Kita, Rumah Kedua yang Ceria!
            </h3>
            
            <p className="text-slate-650 text-base leading-relaxed text-justify font-bold">
              SD Negeri Sumberejo 04 didesain khusus agar anak-anak menikmati masa belajarnya dengan bahagia. Kami percaya anak yang ceria adalah anak yang mudah belajar! Didampingi Kakak dan Bunda Guru yang sangat sabar, penyayang, serta ahli, si kecil dipandu menjelajahi dunia sains cilik, keroncong dongeng, seni warna, dan teknologi ramah anak.
            </p>

            <div className="bg-brand-gold-light p-5 rounded-3xl border-3 border-dashed border-brand-gold/60 flex gap-4 my-2 relative overflow-hidden">
              <Quote className="w-10 h-10 text-brand-gold shrink-0 rotate-180 opacity-50" />
              <p className="text-sm text-brand-gold-dark font-extrabold italic leading-relaxed">
                "{profile.visi}"
              </p>
              <span className="absolute right-2 bottom-2 text-3xl opacity-20">✨</span>
            </div>

            <div className="pt-2">
              <motion.button
                onClick={() => setActivePage('profil')}
                className="inline-flex items-center text-sm font-black text-brand-pink hover:text-brand-pink/80 transition-colors gap-2 shadow-md px-6 py-3 bg-white rounded-full border-3 border-brand-pink"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                id="intro-btn-profil"
              >
                Intip Visi-Misi Seru Kami <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" id="intro-stats">
            {/* Stat 1 */}
            <motion.div 
              className="bg-white p-6 rounded-3xl shadow-md border-3 border-brand-blue-medium/10 hover:border-brand-blue/30 transition-all flex flex-col justify-between group"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              whileHover={{ y: -12, scale: 1.02 }}
            >
              <div className="bg-brand-blue-light w-14 h-14 rounded-2xl flex items-center justify-center text-brand-blue mb-4 border-2 border-white shadow-inner">
                <BookOpen className="w-7 h-7 text-brand-blue" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900 group-hover:text-brand-blue transition-colors">Sains & Coding Seru</h4>
                <p className="text-xs text-slate-500 mt-2 font-bold leading-relaxed">
                  Belajar matematika mengasyikkan pakai balok warna dan merancang game seru sendiri di komputer Scratch.
                </p>
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div 
              className="bg-white p-6 rounded-3xl shadow-md border-3 border-brand-gold/10 hover:border-brand-gold/30 transition-all flex flex-col justify-between group"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.0, ease: "easeInOut", delay: 0.3 }}
              whileHover={{ y: -12, scale: 1.02 }}
            >
              <div className="bg-brand-gold-light w-14 h-14 rounded-2xl flex items-center justify-center text-brand-gold mb-4 border-2 border-white shadow-inner">
                <Users className="w-7 h-7 text-brand-gold-dark" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900 group-hover:text-brand-gold-dark transition-colors">Guru Penyayang</h4>
                <p className="text-xs text-slate-500 mt-2 font-bold leading-relaxed">
                  Guru yang asyik seperti kakak sendiri, sabar mendengarkan dongeng, kreatif mengajar eksperimen menarik.
                </p>
              </div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div 
              className="bg-white p-6 rounded-3xl shadow-md border-3 border-brand-pink/10 hover:border-brand-pink/30 transition-all flex flex-col justify-between group"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.6 }}
              whileHover={{ y: -12, scale: 1.02 }}
            >
              <div className="bg-pink-50 w-14 h-14 rounded-2xl flex items-center justify-center text-brand-pink mb-4 border-2 border-white shadow-inner">
                <Smile className="w-7 h-7 text-brand-pink" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900 group-hover:text-brand-pink transition-colors">Taman Bermain Luas</h4>
                <p className="text-xs text-slate-500 mt-2 font-bold leading-relaxed">
                  Bermain bouncer, perosotan aman, panjat tali, lapangan rumput hijau luas, hingga kolam renang mini gembira!
                </p>
              </div>
            </motion.div>

            {/* Stat 4 */}
            <motion.div 
              className="bg-white p-6 rounded-3xl shadow-md border-3 border-brand-green/10 hover:border-brand-green/30 transition-all flex flex-col justify-between group"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.9 }}
              whileHover={{ y: -12, scale: 1.02 }}
            >
              <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center text-brand-green mb-4 border-2 border-white shadow-inner">
                <Award className="w-7 h-7 text-brand-green" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900 group-hover:text-brand-green transition-colors">100% Karakter Baik</h4>
                <p className="text-xs text-slate-500 mt-2 font-bold leading-relaxed">
                  Setiap anak dihargai kebaikan hatinya melalui lencana Bintang Sopan, Jujur, dan Peduli Sahabatku.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM UTAMA (SD KELAS RENDAH & SD KELAS TINGGI) - Bouncy & Animated */}
      <section className="bg-brand-blue-light/40 border-y-4 border-dashed border-brand-blue/20 py-16" id="primary-programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-brand-pink text-sm font-black uppercase tracking-widest block">🎯 Dua Jalur Petualangan Ilmu</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-brand-blue">
              Program Belajar Ceria SD Negeri Sumberejo 04
            </h2>
            <div className="h-1.5 w-24 bg-brand-gold rounded-full mx-auto"></div>
            <p className="text-slate-600 text-sm font-bold leading-relaxed">
              Kami merancang kurikulum sekolah dasar yang menyenangkan sesuai tumbuh kembang serta senyuman manis putra-putri Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="programs-cards-container">
            {/* SD Kelas Rendah (1-3) */}
            <motion.div 
              className="bg-white border-4 border-brand-blue rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-2xl transition-all group shadow-md relative overflow-hidden"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }}
              whileHover={{ y: -12, scale: 1.01 }}
            >
              {/* Background badge decorations */}
              <div className="absolute -top-6 -right-6 text-6xl opacity-10 font-bold group-hover:rotate-12 transition-transform">🎈</div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="inline-block px-3 py-1.5 bg-brand-blue/10 text-brand-blue border-2 border-brand-blue/20 rounded-full font-black text-xs uppercase shadow-xs">
                    Kelas Rendah (1 - 3)
                  </span>
                  <span className="text-brand-pink text-xs font-black bg-pink-50 px-2.5 py-1 rounded-full">Sekolah Ramah Anak 🧸</span>
                </div>
                <h3 className="text-2xl font-black font-display text-brand-blue group-hover:text-brand-pink transition-colors">Petualang Cilik (Kelas 1-3)</h3>
                <p className="text-slate-650 text-sm leading-relaxed text-justify font-bold">
                  Mengajarkan Membaca, Menulis, dan Berhitung (Calistung) dengan bernyanyi, memegang lego berwarna, menggambar, mendengarkan dongeng Nusantara bergambar, serta eksplorasi alam.
                </p>
                <div className="space-y-2 pt-2">
                  <h4 className="text-brand-gold-dark font-black text-xs uppercase tracking-wider">Aktivitas Seru & Unggulan:</h4>
                  <ul className="text-xs text-slate-500 space-y-1.5 font-bold">
                    <li className="flex items-center gap-1.5">🍭 Eksperimen Sains Mewarnai Air Alam</li>
                    <li className="flex items-center gap-1.5">📖 Sesi Dongeng Boneka Tangan Kakak Guru</li>
                    <li className="flex items-center gap-1.5">🧩 Puzzle Logika & Pengenalan Komputer Lucu</li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setActivePage('program')}
                  className="w-full sm:w-auto px-6 py-3 bg-brand-blue hover:bg-brand-blue-medium text-white font-extrabold text-xs rounded-full shadow-md transition-all text-center cursor-pointer"
                >
                  Lihat Pelajaran Kelas 1-3 📚
                </button>
                <button
                  onClick={() => onDownloadBrochure('sma')}
                  className="w-full sm:w-auto px-5 py-3 bg-brand-gold-light hover:bg-brand-gold-light/80 text-brand-gold-dark font-black text-xs rounded-full transition-all inline-flex items-center justify-center gap-1.5 border-2 border-dashed border-brand-gold"
                >
                  <FileText className="w-4 h-4 text-brand-gold-dark" /> Brosur Petualang (PDF)
                </button>
              </div>
            </motion.div>

            {/* SD Kelas Tinggi (4-6) */}
            <motion.div 
              className="bg-white border-4 border-brand-pink rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-2xl transition-all group shadow-md relative overflow-hidden"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut", delay: 0.5 }}
              whileHover={{ y: -12, scale: 1.01 }}
            >
              {/* Background badge decorations */}
              <div className="absolute -top-6 -right-6 text-6xl opacity-10 font-bold group-hover:rotate-12 transition-transform">🚀</div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="inline-block px-3 py-1.5 bg-pink-50 text-brand-pink border-2 border-brand-pink/20 rounded-full font-black text-xs uppercase shadow-xs">
                    Kelas Tinggi (4 - 6)
                  </span>
                  <span className="text-brand-green text-xs font-black bg-emerald-50 px-2.5 py-1 rounded-full">Sains & Coding 🤖</span>
                </div>
                <h3 className="text-2xl font-black font-display text-brand-blue group-hover:text-brand-pink transition-colors">Juara Hebat (Kelas 4-6)</h3>
                <p className="text-slate-650 text-sm leading-relaxed text-justify font-bold">
                  Mengembangkan bakat kritis dengan pemrograman game Scratch, merakit robot lego pintar, melakukan riset sains seru, melakukan studi ekspedisi cilik, dan ujian kelulusan yang santai tanpa membuat tegang.
                </p>
                <div className="space-y-2 pt-2">
                  <h4 className="text-brand-gold-dark font-black text-xs uppercase tracking-wider">Aktivitas Seru & Unggulan:</h4>
                  <ul className="text-xs text-slate-500 space-y-1.5 font-bold">
                    <li className="flex items-center gap-1.5">👾 Coding Membuat Game Sendiri (Scratch)</li>
                    <li className="flex items-center gap-1.5">🤖 Merakit Robot LEGO Catur Cerdas</li>
                    <li className="flex items-center gap-1.5">🏕️ Kemah Pramuka Ceria & Dokter Cilik</li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setActivePage('program')}
                  className="w-full sm:w-auto px-6 py-3 bg-brand-pink hover:bg-pink-600 text-white font-extrabold text-xs rounded-full shadow-md transition-all text-center cursor-pointer"
                >
                  Lihat Pelajaran Kelas 4-6 🧪
                </button>
                <button
                  onClick={() => onDownloadBrochure('pt')}
                  className="w-full sm:w-auto px-5 py-3 bg-brand-gold-light hover:bg-brand-gold-light/80 text-brand-gold-dark font-black text-xs rounded-full transition-all inline-flex items-center justify-center gap-1.5 border-2 border-dashed border-brand-gold"
                >
                  <FileText className="w-4 h-4 text-brand-gold-dark" /> Brosur Juara Hebat (PDF)
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 4. BERITA TERBARU (Sains Ceria, Gambar Pemenang) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10" id="latest-news">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b-3 border-dashed border-slate-200 pb-5 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl">📰</span>
              <h2 className="text-sm font-black text-brand-gold uppercase tracking-wider">Kabar Seru Sekolah</h2>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-brand-blue">Kegiatan & Berita Ceria</h3>
          </div>
          <motion.button
            onClick={() => setActivePage('berita')}
            className="flex items-center text-sm font-black text-brand-blue hover:text-brand-pink transition-colors gap-2 shadow-md px-6 py-3 bg-white rounded-full border-3 border-brand-blue"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            id="home-btn-all-news"
          >
            Buka Koran Sekolah Ceria 📬 <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="news-grid-preview">
          {latestNews.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border-3 border-slate-100 flex flex-col justify-between group h-full relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ y: [0, -5, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 4.0 + index * 0.4, 
                ease: "easeInOut",
                delay: index * 0.2
              }}
              whileHover={{ y: -12, scale: 1.02 }}
            >
              <div>
                <div className="relative h-48 overflow-hidden m-2 rounded-2xl">
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 inline-block px-3 py-1 bg-brand-pink text-white text-[10px] font-black rounded-full uppercase border border-white tracking-widest shadow-xs">
                    {item.kategori}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center text-slate-400 text-xs gap-1.5 font-bold">
                    <Calendar className="w-4 h-4 text-brand-blue-medium" />
                    <span>{item.tanggal}</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 group-hover:text-brand-pink transition-colors line-clamp-2 leading-snug">
                    {item.judul}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-bold line-clamp-3">
                    {item.ringkasan}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0 border-t-2 border-dashed border-slate-50 flex items-center justify-between">
                <button
                  onClick={() => { setSelectedNews(item); setActivePage('berita'); }}
                  className="text-xs font-black text-brand-blue hover:text-brand-gold-dark flex items-center gap-1 transition-colors cursor-pointer"
                >
                  Baca Dongeng/Berita Ini 📖
                </button>
                <div className="text-lg">🎈</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. PREVIEW GALERI KEGIATAN (Mading Sekolah) */}
      <section className="bg-brand-gold-light/40 py-14 border-y-4 border-dashed border-brand-gold/40" id="gallery-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-sm font-bold text-brand-pink uppercase tracking-widest">📸 Mading Foto SD Negeri Sumberejo 04</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-blue">Galeri Sekolah Ceria Kita</h3>
            <p className="text-xs text-slate-500 font-bold">
              Kumpulan foto seru aktivitas bermain kolaboratif, karya seni gambar, merakit robot, dan pentas musik gembira teman-teman kita!
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" id="home-gallery-grid">
            {previewGallery.map((img, idx) => (
              <motion.div 
                key={img.id} 
                className="relative h-44 sm:h-56 rounded-3xl overflow-hidden group shadow-md border-4 border-white cursor-pointer transform"
                onClick={() => setActivePage('galeri')}
                whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                <img
                  src={img.url}
                  alt={img.judul}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[10px] text-brand-gold font-black uppercase tracking-widest leading-none mb-1">
                    {img.kategori === 'SMA' ? 'Kelas Rendah' : img.kategori === 'Perguruan Tinggi' ? 'Kelas Tinggi' : img.kategori}
                  </span>
                  <p className="text-white text-xs font-black leading-snug line-clamp-2">
                    {img.judul}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              onClick={() => setActivePage('galeri')}
              className="px-6 py-3 bg-white border-3 border-brand-gold hover:border-brand-pink text-slate-800 hover:text-brand-pink font-black text-xs rounded-full shadow-sm transition-all inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              id="home-btn-all-gallery"
            >
              Lihat Album Foto Lengkap 📁 <ArrowRight className="w-4 h-4 text-brand-gold-dark" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* 6. KONTAK PREVIEW + PETA DEKORATIF MAINAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8" id="home-contacts-maps">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Kolom Form Kirim Surat */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl shadow-md border-3 border-brand-blue-medium/10 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-brand-pink text-xs font-black uppercase tracking-wider block">💌 Surat untuk Sekolah</span>
              <h2 className="text-2xl font-black text-brand-blue leading-none" id="header-contact-form">Tanya Kakak Guru!</h2>
              <p className="text-xs text-slate-500 font-bold leading-normal">
                Ayah, bunda, atau adik hebat punya pertanyaan seputar pendaftaran? Kirimkan surat elektronik di bawah ini ya!
              </p>
              
              <ul className="space-y-3 text-xs text-slate-600 font-bold pt-2">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-brand-pink mt-0.5 shrink-0" />
                  <span>Kampus Raya Nusantara SD, Jl. Pendidikan Kebangsaan No. 101, Kuningan Timur, Jakarta Selatan, 12950</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-brand-blue shrink-0 animate-bounce" />
                  <span>+62 (21) 829-1025 / 829-1026</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-brand-green shrink-0" />
                  <span>halo@sd-nusantara.sch.id</span>
                </li>
              </ul>
            </div>

            <div className="border-t-2 border-dashed pt-4 mt-5">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <span>📝 Isi Surat Ceria:</span>
              </h3>
              
              {submitSuccess ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 border-2 border-emerald-300 text-xs rounded-2xl text-center font-bold leading-relaxed animate-bouncy-slow">
                  🎉 Yippie! Surat berhasil dikirim ke Kantor Guru SD Nusantara. Kakak Humas akan segera membalas lewat email ya!
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3" id="form-home-kontak">
                  <input
                    type="text"
                    placeholder="Nama Ayah/Bunda/Anak Hebat"
                    value={formNama}
                    onChange={(e) => setFormNama(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                    id="input-home-kontak-nama"
                  />
                  <input
                    type="email"
                    placeholder="Alamat Email Balasan"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                    id="input-home-kontak-email"
                  />
                  <textarea
                    placeholder="Tuliskan pertanyaan seru mengenai pendaftaran di sini..."
                    rows={2.5}
                    value={formPesan}
                    onChange={(e) => setFormPesan(e.target.value)}
                    required
                    className="w-full px-4 py-3 text-xs border-2 border-slate-200 rounded-2xl focus:border-brand-blue outline-none font-bold"
                    id="input-home-kontak-pesan"
                  ></textarea>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-brand-blue hover:bg-brand-blue-medium text-white font-extrabold text-xs rounded-full shadow-md cursor-pointer-none border-b-4 border-blue-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    id="btn-home-kontak-submit"
                  >
                    {isSubmitting ? 'Mengirim Surat... ✉️' : 'Kirim Surat Ke Sekolah ✈️'}
                  </motion.button>
                </form>
              )}
            </div>
          </div>

          {/* Kolom Peta Google Simulation (Playground-style) */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border-4 border-brand-blue relative flex flex-col justify-between shadow-md group min-h-[350px]" id="simulated-google-maps">
            {/* Header Kontrol Peta */}
            <div className="absolute top-3 left-3 right-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-slate-800 flex items-center justify-between z-10 border-2 border-slate-200 shadow-md">
              <span className="flex items-center gap-1.5 font-bold text-brand-blue">
                <MapPin className="w-4 h-4 text-brand-pink animate-bounce" />
                Sekretariat Utama SD Nusantara (Jakarta CBD)
              </span>
              <button 
                onClick={() => setActiveMapPin(!activeMapPin)}
                className="px-3 py-1 bg-brand-pink text-white text-[10px] uppercase font-black rounded-full"
              >
                {activeMapPin ? 'Sembunyikan Pin 📍' : 'Tampilkan Pin 📌'}
              </button>
            </div>

            {/* Peta Mainan */}
            <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
              <div className="w-full h-full relative overflow-hidden bg-amber-50/10 opacity-90">
                {/* Garis Jalan Kartun */}
                <div className="absolute inset-y-0 left-1/3 w-12 bg-yellow-200/60 border-x-4 border-dashed border-yellow-300 shadow-inner transform -rotate-12"></div>
                <div className="absolute inset-x-0 bottom-1/4 h-14 bg-yellow-200/60 border-y-4 border-dashed border-yellow-300 shadow-inner"></div>

                {/* Sektor Playground Hijau */}
                <div className="absolute top-10 left-8 w-28 h-20 bg-emerald-200/50 rounded-full border-3 border-dashed border-emerald-300 flex items-center justify-center text-[10px] text-emerald-800 font-bold uppercase tracking-wider text-center">
                  🌳 Taman Bermain Kelinci
                </div>
                <div className="absolute top-1/4 right-8 w-32 h-20 bg-sky-200/50 rounded-full border-3 border-dashed border-sky-300 flex flex-col items-center justify-center text-[9px] text-slate-500 font-bold">
                  <span>🏊 Kolam Renang</span>
                  <span>Mini Fun</span>
                </div>

                {/* Kampus Nusantara Block */}
                <div className="absolute top-[40%] left-[34%] w-48 h-28 bg-brand-gold-light/90 border-3 border-dashed border-brand-gold rounded-3xl flex flex-col items-center justify-center shadow-md p-2">
                  <span className="text-[9px] uppercase font-bold text-brand-gold-dark">Gerbang Ceria</span>
                  <span className="text-[10px] font-black text-brand-blue text-center leading-tight mt-1">🏰 Kompleks Gedung Warna-Warni SD Negeri Sumberejo 04</span>
                </div>

                {/* Pin Utama */}
                {activeMapPin && (
                  <div className="absolute top-[43%] left-[46%] z-20 flex flex-col items-center animate-fade-in">
                    <motion.div 
                      className="bg-brand-pink text-white p-3 rounded-full shadow-lg border-2 border-white cursor-pointer"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <GraduationCap className="w-6 h-6 stroke-[2.5]" />
                    </motion.div>
                    <div className="bg-slate-950 text-white text-[9px] px-2.5 py-1 rounded-full shadow-md mt-1 font-black whitespace-nowrap border border-white">
                      🏫 SD Sumberejo 04 Di Sini!
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Kontrol Peta */}
            <div className="bg-slate-50 px-5 py-4 border-t-2 border-dashed w-full absolute bottom-0 z-10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3">
              <div>
                <p className="font-extrabold text-slate-800">Ayo Berkunjung: Kuningan Timur, Setiabudi</p>
                <p className="text-[10px] text-slate-400 font-bold mt-0.5">Sangat dekat dengan Halte Transit Jakarta Selatan</p>
              </div>
              <motion.button 
                onClick={() => alert('Membuka rute helikopter fantasi ke SD Nusantara... 🛸 \nHanya perlu 5 menit terbang gembira!')}
                className="px-4 py-2 bg-brand-blue border-b-3 border-blue-800 text-white hover:bg-brand-blue-medium text-xs font-black rounded-full transition-colors cursor-pointer shrink-0"
                whileHover={{ scale: 1.05 }}
              >
                🗺️ Petunjuk Arah Jalan
              </motion.button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. KONSULTASI / REKRUTMEN CTA BANNER */}
      <section className="bg-brand-gold py-10 rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 text-slate-900 flex flex-col lg:flex-row justify-between items-center gap-6 border-b-4 border-brand-gold-dark" id="recruitment-cta-banner">
        <div className="space-y-2 text-center lg:text-left">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-brand-blue leading-none">
            Ingin Jalan-Jalan Keliling Sekolah? 🧭
          </h3>
          <p className="text-sm text-brand-blue-medium font-bold max-w-xl">
            Bunda dan Ayah bisa mengajak si kecil berkunjung gratis secara langsung! Kami siap menemani kalian melihat kandang kelinci hias, playground mini, mengintip robotik cilik, dan menikmati es krim gratis di kantin sehat.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto shrink-0">
          <motion.button
            onClick={() => setActivePage('kontak')}
            className="w-full sm:w-auto px-6 py-3 bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs rounded-full shadow-md cursor-pointer border-b-3 border-blue-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mau Kirim WA Chat / Janji Temu 📞
          </motion.button>
          <motion.button
            onClick={() => setActivePage('informasi-pendaftaran')}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 font-black text-xs rounded-full shadow-sm cursor-pointer border-2 border-slate-350"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pelajari Syarat Sederhananya 📋
          </motion.button>
        </div>
      </section>

    </div>
  );
}
