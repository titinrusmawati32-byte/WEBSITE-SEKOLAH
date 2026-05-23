/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Award, Lightbulb, Users, Trophy, BookOpen, Clock, Heart, Smile, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ProfilYayasan, ActivePage } from '../types';

interface ProfileProps {
  profile: ProfilYayasan;
  setActivePage: (p: ActivePage) => void;
}

export default function Profile({ profile, setActivePage }: ProfileProps) {
  // Fungsi pemetaan icon dari teks demi ketahanan runtime
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5 text-brand-pink" />;
      case 'Award':
        return <Award className="w-5 h-5 text-brand-gold" />;
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5 text-brand-green" />;
      case 'Users':
        return <Users className="w-5 h-5 text-brand-blue" />;
      default:
        return <Heart className="w-5 h-5 text-brand-pink" />;
    }
  };

  return (
    <div className="space-y-16 pb-16 bg-amber-50/15 min-h-screen" id="profile-root">
      
      {/* Profil Header Banner */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-medium text-white py-12 md:py-16 text-center shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-1 opacity-10 text-8xl pointer-events-none">🏫</div>
        <div className="absolute bottom-1 left-2 opacity-15 text-7xl pointer-events-none">🎈</div>
        <div className="max-w-4xl mx-auto px-4 space-y-3 relative z-10 font-bold">
          <span className="text-brand-gold text-sm font-black bg-white/20 px-3.5 py-1.5 rounded-full inline-block">🐾 Intip Rumah Ceria Kita</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-display text-white">
            Kenalan Dengan SD Nusantara!
          </h1>
          <p className="text-slate-105 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Yuk, kita lihat bersama bagaimana sejarah berdirinya sekolah keduamu, mimpi-mimpi indah yang ingin kita raih, serta kakak guru ramah yang siap menyambutmu!
          </p>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="profile-vision-mission">
        {/* Visi card layout */}
        <div className="lg:col-span-5 bg-gradient-to-br from-brand-blue to-blue-800 text-white p-6 md:p-8 rounded-3xl border-3 border-white shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 bottom-0 text-9xl opacity-10 pointer-events-none">💭</div>
          <div className="space-y-4">
            <span className="px-4 py-1.5 bg-white/20 text-brand-gold border-2 border-brand-gold/30 rounded-full font-black text-xs uppercase inline-block">
              Mimpi Sekolah Kita 💭
            </span>
            <p className="text-lg sm:text-xl font-black tracking-wide font-display text-white leading-relaxed text-left">
              "{profile.visi}"
            </p>
          </div>
          <div className="pt-6 border-t-2 border-dashed border-white/20 text-xs text-brand-blue-light font-bold">
            Dirancang penuh cinta oleh seluruh Kakak Guru dan dewan pembina SD Nusantara.
          </div>
        </div>

        {/* Misi Accordion / List */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border-4 border-dashed border-brand-blue/20 shadow-md space-y-5">
          <h2 className="text-xl font-black text-brand-blue font-display flex items-center gap-2">
            <span className="w-2.5 h-6 bg-brand-pink rounded-full"></span>
            Misi Hebat Kami 🚀
          </h2>
          <div className="space-y-3">
            {profile.misi.map((misiText, index) => (
              <motion.div 
                key={index} 
                className="p-3.5 bg-amber-50/40 hover:bg-brand-blue-light/50 border-2 border-slate-200 hover:border-brand-blue/20 rounded-2xl transition-all flex items-start gap-3"
                whileHover={{ scale: 1.01 }}
              >
                <span className="w-7 h-7 rounded-full bg-brand-pink text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-left font-bold">
                  {misiText}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nilai-Nilai Budaya (Corporate Values -> Kid Friendly) */}
      <section className="bg-brand-gold-light/40 py-12 md:py-16 border-y-4 border-dashed border-brand-gold" id="profile-values">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xs font-black text-brand-pink uppercase tracking-widest">🛡️ Bekal Karakter Baik</h2>
            <h3 className="text-3xl font-black text-brand-blue font-display">Karakter Anak Nusantara 😇</h3>
            <p className="text-xs text-slate-500 font-bold leading-relaxed">
              Empat sikap terpuji yang dipraktikkan bersama oleh seluruh kawan cilik dan bapak ibu guru di sekolah agar belajar tetap nyaman!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.nilai.map((v, i) => (
              <motion.div 
                key={i} 
                className="bg-white p-5 rounded-3xl border-3 border-slate-100 shadow-md flex flex-col justify-between"
                whileHover={{ y: -5 }}
              >
                <div className="space-y-3.5">
                  <div className="bg-amber-50 w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-brand-gold-light">
                    {getIcon(v.ikon)}
                  </div>
                  <h4 className="font-black text-base text-slate-900 leading-tight">
                    {v.judul === 'Unggul Terpercaya' ? 'Saling Menghargai' : v.judul === 'Sinergi Harmoni' ? 'Saling Berbagi' : v.judul}
                  </h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    {v.deskripsi}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sejarah Yayasan */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-5" id="profile-history">
        <div className="text-center">
          <span className="text-brand-pink text-sm font-black uppercase tracking-widest block">📖 Cerita Bergambar</span>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-blue font-display inline-block border-b-4 border-brand-gold pb-1.5 leading-none">
            Kisah Pendirian SD Nusantara
          </h2>
        </div>
        
        <div className="bg-white p-6 md:p-8 rounded-3xl border-4 border-dashed border-brand-blue/20 shadow-md leading-relaxed text-sm text-slate-705 font-bold space-y-4 text-justify">
          {profile.sejarah.split('\n\n').map((para, pIdx) => (
            <p key={pIdx}>
              {para}
            </p>
          ))}
        </div>

        {/* Milestone stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center pt-4" id="milestones">
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-150 shadow-sm space-y-1.5 font-bold text-slate-700">
            <span className="text-[10px] text-brand-pink block font-black leading-none">SEJAK 2012 🍭</span>
            <p className="text-lg font-black text-brand-blue font-display leading-tight">Taman Impian Cilik</p>
            <p className="text-[10px] text-slate-500 leading-normal">Membangun area kebun stroberi dan rancangan sekolah bermain ramah anak.</p>
          </div>
          <div className="bg-brand-blue text-white p-4 rounded-2xl border-2 border-white shadow-md space-y-1.5 font-bold">
            <span className="text-[10px] text-brand-gold block font-black leading-none">TAHUN 2013 🏫</span>
            <p className="text-lg font-black text-brand-gold font-display leading-tight">Angkatan Pertama</p>
            <p className="text-[10px] text-brand-blue-light leading-normal">SD Nusantara resmi meluncurkan gerbang belajar ceria dengan 50 murid pertama.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-150 shadow-sm space-y-1.5 font-bold text-slate-700">
            <span className="text-[10px] text-brand-pink block font-black leading-none">SEJAK 2018 🤖</span>
            <p className="text-lg font-black text-brand-blue font-display leading-tight">Merakit Robot & Komputer</p>
            <p className="text-[10px] text-slate-500 leading-normal">Meluncurkan lab bermain komputer Scratch cilik dan asrama khusus anak berprestasi.</p>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi (Bunda & Kakak Guru) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8" id="profile-structure">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xs font-black text-brand-pink uppercase tracking-widest">🙋 Sahabat Guru Kita</h2>
          <h3 className="text-3xl font-black text-brand-blue font-display">Kakak & Bunda Guru Sekolah 🏫</h3>
          <p className="text-xs text-slate-500 font-bold leading-relaxed">
            Inilah wajah ramah para bunda, pengawas, serta pembimbing ceria yang siap mengajakmu bermain petualangan sains matematika setiap pagi!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-3">
          {profile.struktur.map((item, id) => (
            <motion.div 
              key={id} 
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border-3 border-slate-100 flex flex-col h-full"
              whileHover={{ y: -4 }}
            >
              <div className="h-56 bg-slate-150 relative overflow-hidden shrink-0">
                <img
                  src={item.foto}
                  alt={item.nama}
                  className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow text-center">
                <div className="space-y-1">
                  <h4 className="font-black text-base text-slate-900 leading-snug">
                    {item.nama}
                  </h4>
                  <p className="text-[11px] text-brand-pink font-black uppercase tracking-wider bg-pink-50 px-2 py-0.5 rounded-full inline-block">
                    {item.jabatan === 'Direktur Akademik Yayasan' ? 'Kepala Kurikulum Ceria' : item.jabatan === 'Pembina Utama Yayasan' ? 'Pendiri Utama Sekolah' : item.jabatan === 'Pengawas Pendidikan Nusantara' ? 'Bunda Konseling Hebat' : item.jabatan === 'Kepala Sekolah Menengah Nusantara' ? 'Kepala Sekolah SD Nusantara' : item.jabatan}
                  </p>
                </div>
                <div className="border-t-2 border-dashed border-slate-100 pt-2.5 mt-3.5 text-[10px] text-slate-400 font-bold">
                  SD Ceria Nusantara
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Pendaftaran bawah */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 text-center pt-8">
        <div className="bg-brand-pink text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border-b-4 border-pink-700 relative overflow-hidden">
          <div className="absolute right-0 top-0 text-7xl opacity-10">🧸</div>
          <h3 className="text-xl sm:text-2xl font-black font-display text-white">Ingin Bertemu Langsung dengan Bunda Guru? 🌟</h3>
          <p className="text-xs text-pink-50 font-bold max-w-xl mx-auto">
            Yuk daftarkan dirimu secara online di pendaftaran murid baru SD Nusantara untuk mendapatkan tur keliling kebun kelinci sekolah secara langsung!
          </p>
          <div className="pt-2">
            <motion.button
              onClick={() => setActivePage('pendaftaran-online')}
              className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-dark text-slate-900 font-extrabold text-xs rounded-full shadow-md cursor-pointer border-b-3 border-brand-gold-dark"
              whileHover={{ scale: 1.05 }}
            >
              Mau Daftar Sekolah Sekarang! 🚀
            </motion.button>
          </div>
        </div>
      </section>

    </div>
  );
}
