/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle, ArrowRight, Clipboard, Printer, Search, 
  AlertCircle, HelpCircle, XCircle, FileClock, Smile, Sparkles, Star
} from 'lucide-react';
import { motion } from 'motion/react';
import { Pendaftar, ActivePage } from '../types';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface RegistrationStatusProps {
  applicants: Pendaftar[];
  recentId: string | null; // Nomor registrasi pendaftar yang baru submit
  activePage: ActivePage;
  setActivePage: (p: ActivePage) => void;
  onClearRecentId: () => void;
}

export default function RegistrationStatus({
  applicants,
  recentId,
  activePage,
  setActivePage,
  onClearRecentId,
}: RegistrationStatusProps) {
  const [searchInput, setSearchInput] = useState(recentId || '');
  const [searchedApplicant, setSearchedApplicant] = useState<Pendaftar | null>(
    recentId ? applicants.find((a) => a.id === recentId) || null : null
  );
  const [hasSearched, setHasSearched] = useState(!!recentId);
  const [isSearching, setIsSearching] = useState(false);

  // Cari pendaftar berdasarkan ID
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      setHasSearched(true);
      setSearchedApplicant(null);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    // 1. Try querying Firestore live (ABAC Dynamic Check)
    try {
      const applicantId = searchInput.trim().toUpperCase();
      const docRef = doc(db, 'applicants', applicantId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSearchedApplicant(docSnap.data() as Pendaftar);
        setIsSearching(false);
        return;
      }
    } catch (err) {
      console.warn("Firestore status look-up failed, running local cache search:", err);
    }

    // 2. Fallback to local offline context
    const found = applicants.find(
      (a) => a.id.toLowerCase().trim() === searchInput.toLowerCase().trim()
    );
    setSearchedApplicant(found || null);
    setIsSearching(false);
  };

  const handleCopyId = () => {
    if (!searchInput) return;
    navigator.clipboard.writeText(searchInput);
    alert(`Nomor registrasi ${searchInput} berhasil disalin ke clipboard! 📋`);
  };

  // Rendering status visual styling (Child Friendly)
  const renderStatusBadge = (status: Pendaftar['status']) => {
    switch (status) {
      case 'Diterima':
        return (
          <motion.div 
            className="bg-emerald-55 bg-emerald-50 border-4 border-dashed border-emerald-400 text-emerald-800 p-6 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-4 relative overflow-hidden"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="absolute right-1 bottom-1 text-7xl opacity-10">🥳</div>
            <div className="bg-emerald-500 text-white p-3 rounded-full shrink-0 shadow-lg animate-bounce text-xl">
              🎉
            </div>
            <div className="text-center md:text-left space-y-2">
              <span className="text-[10px] bg-emerald-500 text-white font-black px-2.5 py-1 rounded-full uppercase tracking-widest">Hore! Lulus Seleksi ⭐</span>
              <h4 className="font-extrabold text-lg text-emerald-900 leading-tight">YESS! Selamat, Kamu Diterima Menjadi Teman Baru Kami! 😍</h4>
              <p className="text-xs text-emerald-700 leading-relaxed font-bold">
                Berkas pendaftaranmu berstatus unggul dan sudah divalidasi oleh Tim Guru SD Nusantara dengan gembira. Ayah dan Bunda bisa melakukan pengurusan ulang kuitansi, seragam imut, dan mengunjungi sekolah terhitung sejak hari ini ya!
              </p>
            </div>
          </motion.div>
        );
      case 'Ditolak':
        return (
          <div className="bg-red-50 border-4 border-dashed border-red-300 text-red-800 p-6 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-4 relative overflow-hidden">
            <div className="absolute right-1 bottom-1 text-7xl opacity-10">🧸</div>
            <div className="bg-red-500 text-white p-3 rounded-full shrink-0 shadow-lg text-xl">
              💔
            </div>
            <div className="text-center md:text-left space-y-2">
              <span className="text-[10px] bg-red-450 bg-red-500 text-white font-black px-2.5 py-1 rounded-full uppercase tracking-widest">Tetap Semangat Ya!</span>
              <h4 className="font-extrabold text-lg text-red-900 leading-tight">Jangan Bersedih, Kamu Belum Bisa Masuk Gelombang Ini...</h4>
              <p className="text-xs text-red-600 leading-relaxed font-bold">
                Kuota kelas pendaftaran bermain saat ini sedang sangat penuh atau usia ananda kurang sedikit. Jangan kecewa ya, adik hebat! Tetap belajar menggambar dan bermain lego gembira bersama ayah bunda di rumah untuk menyambut pendaftaran berikutnya.
              </p>
            </div>
          </div>
        );
      case 'Revisi':
        return (
          <div className="bg-amber-50 border-4 border-dashed border-brand-gold text-amber-900 p-6 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-4 relative overflow-hidden">
            <div className="absolute right-1 bottom-1 text-7xl opacity-10">✏️</div>
            <div className="bg-brand-gold text-white p-3 rounded-full shrink-0 shadow-lg text-xl">
              ✍️
            </div>
            <div className="text-center md:text-left space-y-2">
              <span className="text-[10px] bg-brand-gold text-slate-800 font-black px-2.5 py-1 rounded-full uppercase tracking-widest">Perlu Perbaikan 📝</span>
              <h4 className="font-extrabold text-lg text-amber-950 leading-tight">Ups, Ada Berkas yang Perlu Dirapikan Sedikit!</h4>
              <p className="text-xs text-amber-800 leading-relaxed font-bold">
                Terdapat catatan dari admin guru kelas: "Mohon ganti file pasfoto calon murid atau pindaian Kartu Keluarga yang berwarna lebih jelas/terbaca". Sila hubungi Whatsapp Helpdesk kami untuk pengiriman file perbaikan ya!
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-sky-50 border-4 border-dashed border-sky-300 text-sky-800 p-6 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-4 relative overflow-hidden">
            <div className="absolute right-1 bottom-1 text-7xl opacity-10">⏳</div>
            <div className="bg-brand-blue text-white p-3 rounded-full shrink-0 shadow-lg animate-pulse text-xl">
              🕵️‍♂️
            </div>
            <div className="text-center md:text-left space-y-2">
              <span className="text-[10px] bg-brand-blue text-white font-black px-2.5 py-1 rounded-full uppercase tracking-widest">Sedang Dibaca Guru 📝</span>
              <h4 className="font-extrabold text-lg text-brand-blue leading-tight">Yuhuu! Suratmu Sedang Dibaca dengan Teliti...</h4>
              <p className="text-xs text-sky-800 leading-relaxed font-bold">
                Guru admisi pendaftaran SD Nusantara sedang memeriksa kelengkapan nama, foto lucu, dan data ananda dengan penuh cinta. Tunggu sekitar 1-2 hari kerja ya Ayah Bunda! Kabar gembira akan segera meluncur.
              </p>
            </div>
          </div>
        );
    }
  };

  // RENDERING HALAMAN SUKSES (BARU SUBMIT FORM)
  if (activePage === 'sukses' && recentId) {
    const freshApplicant = applicants.find((a) => a.id === recentId);

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10" id="success-submit-root">
        <div className="bg-white rounded-3xl border-4 border-dashed border-brand-gold p-8 sm:p-12 text-center space-y-8 relative shadow-lg">
          
          <div className="absolute top-0 right-0 p-8 opacity-10 text-7xl pointer-events-none">🎈</div>
          <div className="absolute bottom-0 left-0 p-8 opacity-10 text-7xl pointer-events-none">🍭</div>

          {/* Icon Checkmark */}
          <div className="flex justify-center">
            <div className="bg-emerald-50 text-emerald-500 border-4 border-emerald-200 p-4 rounded-full shadow-lg shrink-0 animate-bounce">
              <CheckCircle className="w-12 h-12" />
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-brand-pink text-xs font-black uppercase tracking-widest block bg-pink-100/50 px-3 py-1 rounded-full inline-block">Yippie! Pengiriman Sukses</span>
            <h1 className="text-3xl font-black text-brand-blue font-display">
              Surat Pendaftaranmu Sudah Sampai! ✈️
            </h1>
            <p className="text-sm font-bold text-slate-500 max-w-lg mx-auto leading-relaxed">
              Berkas data identitas, catatan menarik, dan lampiran foto menggemaskanmu sudah masuk ke kotak mading admin pendaftaran SD Nusantara.
            </p>
          </div>

          {/* Kartu Rujukan Nomor Registrasi */}
          <div className="bg-amber-50/50 border-3 border-brand-gold-medium/30 p-6 rounded-3xl max-w-sm mx-auto space-y-3 shadow-inner">
            <p className="text-[10px] text-brand-gold-dark font-black uppercase tracking-widest leading-none">Nomor Surat Pendaftaranmu: 📌</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-display text-brand-blue flex items-center justify-center gap-2">
              <span>{recentId}</span>
              <button 
                onClick={handleCopyId}
                className="p-1 text-slate-400 hover:text-brand-blue cursor-pointer"
                title="Salin Nomor Registrasi"
              >
                <Clipboard className="w-4 h-4" />
              </button>
            </h2>
            <div className="text-[10px] text-zinc-400 text-center leading-relaxed font-bold">
              *Tolong disimpan nomor cantik di atas ya Ayah Bunda, untuk dipakai memeriksa keputusan kakak guru di tombol cek status.
            </div>
          </div>

          {/* Langkah Selanjutnya */}
          <div className="text-left space-y-4 max-w-lg mx-auto border-t-2 border-dashed pt-6 text-xs sm:text-sm text-slate-650">
            <h3 className="font-extrabold text-slate-900 text-center">Tiga Langkah Gembira Berikutnya</h3>
            <ul className="space-y-3 pl-2 sm:pl-4 font-bold">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-brand-pink text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                <p>Ambil Gambar Layar: Boleh screenshot atau salin kode surat di atas di buku catatan mainan.</p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-brand-blue text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                <p>Tunggu Kakak Guru Membaca: Beri panitia pendaftaran waktu 1 atau 2 hari untuk memeriksa foto-foto lucu ananda.</p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-brand-green text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                <p>Cek Status Bintang: Masuklah ke halaman <strong className="text-brand-blue">Cek Status</strong> untuk melihat apakah si kecil berhak mendapat lencana bintang muria baru!</p>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                onClearRecentId(); // Bersihkan agar normal
                setSearchInput(recentId);
                setSearchedApplicant(freshApplicant || null);
                setHasSearched(true);
                setActivePage('cek-status');
              }}
              className="w-full sm:w-auto px-6 py-3 bg-brand-blue hover:bg-slate-900 border-b-3 border-blue-800 text-white font-extrabold text-xs rounded-full shadow transition-colors cursor-pointer"
              id="success-btn-cek"
            >
              Cek Pengumuman Bintangku Sekarang ✨
            </button>
            <button
              onClick={() => { onClearRecentId(); setActivePage('home'); }}
              className="w-full sm:w-auto px-6 py-3 bg-white border-2 text-slate-700 hover:text-slate-950 hover:bg-slate-55 text-xs font-black rounded-full transition-all"
              id="success-btn-home"
            >
              Kembali Bermain di Beranda 🏡
            </button>
          </div>

        </div>
      </div>
    );
  }

  // RENDERING HALAMAN CARI STATUS SELEKSI (CHECK RESULTS)
  return (
    <div className="space-y-12 pb-16 bg-amber-50/15 min-h-screen" id="lookup-status-root">
      
      {/* Page Header Banner */}
      <section className="bg-gradient-to-br from-brand-pink to-brand-pink/80 text-white py-12 md:py-16 text-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-1 opacity-10 text-8xl pointer-events-none">⭐</div>
        <div className="absolute bottom-1 left-2 opacity-15 text-7xl pointer-events-none">🎈</div>
        <div className="max-w-4xl mx-auto px-4 space-y-3 relative z-10">
          <span className="text-brand-gold text-sm font-black bg-white/20 px-3.5 py-1.5 rounded-full inline-block">🔍 Jendela Pengumuman Seleksi</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-display text-white">
            Cek Status Bintang Penuhamu!
          </h1>
          <p className="text-slate-100 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed font-bold">
            Gunakan Nomor Surat Pendaftaran unik dari kuitansi (Contoh: <strong className="text-brand-gold">YPN-2026-001</strong>) untuk melacak keputusan kelulusan murid baru.
          </p>
        </div>
      </section>

      {/* Lookup Form */}
      <section className="max-w-xl mx-auto px-4">
        <div className="bg-white p-6 rounded-3xl border-4 border-dashed border-brand-pink/30 shadow-md space-y-5">
          
          <form onSubmit={handleSearch} className="space-y-3" id="form-cek-status">
            <label className="text-xs font-black text-slate-700 block">Nomor Surat Pendaftaranmu <span className="text-red-550">*</span></label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Contoh: YPN-2026-001"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                required
                className="flex-grow px-4 py-2.5 border-2 rounded-full border-slate-200 outline-none text-xs sm:text-sm font-bold text-slate-900 shadow-inner focus:border-brand-pink"
                id="checked-reg-id-input"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-2.5 bg-brand-pink hover:bg-pink-600 disabled:opacity-50 text-white text-xs sm:text-sm font-black rounded-full shadow-md shrink-0 flex items-center gap-1 cursor-pointer"
                id="btn-cari-status"
              >
                {isSearching ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>{isSearching ? 'Mencari...' : 'Cari Status'}</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 font-bold">Lupa nomor suratnya? Ayah Bunda bisa mengecek folder kotak masuk Gmail orang tua yang didaftarkan ya.</p>
          </form>

        </div>
      </section>

      {/* Result Cards Display */}
      <section className="max-w-3xl mx-auto px-4">
        {hasSearched && (
          <div className="space-y-6">
            {searchedApplicant ? (
              <div className="bg-white rounded-3xl border-4 border-dashed border-brand-blue/30 shadow-md p-6 sm:p-8 space-y-6 animate-fade-in" id="checked-result-card">
                
                {/* Visual Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b-2 border-dashed gap-3">
                  <div className="text-center sm:text-left">
                    <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest leading-none block">Nomor Surat</span>
                    <strong className="text-lg text-brand-blue font-display">{searchedApplicant.id}</strong>
                  </div>
                  <div className="text-center sm:text-right">
                    <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest leading-none block">Tanggal Pendaftaran</span>
                    <strong className="text-xs text-slate-700 font-bold">{searchedApplicant.tanggalDaftar}</strong>
                  </div>
                </div>

                {/* Status Box Callout */}
                {renderStatusBadge(searchedApplicant.status)}

                {/* Catatan Admin / Status Catatan */}
                {searchedApplicant.catatanStatus && (
                  <div className="p-4 bg-amber-50/50 border-l-4 border-brand-gold rounded-r-2xl text-xs text-slate-705 font-bold leading-relaxed text-justify">
                    <strong className="block text-slate-900 mb-1.5 uppercase font-black text-[10px] tracking-widest text-brand-gold-dark">Pesan Catatan Guru Kelas:</strong>
                    "{searchedApplicant.catatanStatus}"
                  </div>
                )}

                {/* Detail Identitas Calon Siswa */}
                <div className="space-y-3.5 border-t-2 border-dashed pt-5">
                  <h4 className="text-xs font-black uppercase text-brand-blue tracking-widest flex items-center gap-1.5">
                    <span>👦</span> Biodata Adik Calon Murid:
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-bold">
                    <p className="p-3 bg-amber-50/20 rounded-2xl border-2 border-slate-100"><span className="text-slate-405 mr-2">Nama Calon Murid:</span> <strong className="text-slate-800">{searchedApplicant.namaLengkap}</strong></p>
                    <p className="p-3 bg-amber-50/20 rounded-2xl border-2 border-slate-100"><span className="text-slate-405 mr-2">Jenis Kelamin:</span> <strong className="text-slate-800">{searchedApplicant.jenisKelamin}</strong></p>
                    <p className="p-3 bg-amber-50/20 rounded-2xl border-2 border-slate-100"><span className="text-slate-405 mr-2">TK Asal / PAUD:</span> <strong className="text-slate-800">{searchedApplicant.sekolahAsal}</strong></p>
                    <p className="p-3 bg-amber-50/20 rounded-2xl border-2 border-slate-100"><span className="text-slate-450 mr-2">Fase Kelas Belajar:</span> <strong className="text-brand-pink font-extrabold uppercase">{searchedApplicant.programPilihan === 'SMA' ? 'Kelas Rendah (1-3)' : 'Kelas Tinggi (4-6)'} ({searchedApplicant.jurusanPilihan})</strong></p>
                  </div>
                </div>

                {/* Footer Dokumen Unduh */}
                <div className="flex justify-between items-center border-t-2 border-dashed pt-5 text-[11px] text-slate-400 gap-2 font-bold">
                  <span>Mading Kelulusan Ceria © SD Nusantara 2026.</span>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1 text-slate-600 hover:text-brand-pink transition-colors font-black cursor-pointer bg-slate-50 px-3 py-1.5 border border-slate-200 rounded-full"
                  >
                    <Printer className="w-3.5 h-3.5" /> Cetak Bukti Bintang Kelulusan
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-white border-4 border-dashed border-slate-200 text-center p-8 rounded-3xl shadow-sm space-y-4">
                <div className="text-slate-350 font-black text-4xl animate-bounce">🔍?!</div>
                <h3 className="font-extrabold text-sm text-slate-800">Ups, Pengajuan Surat Tidak Ditemukan</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-bold">
                  Kami tidak mendeteksi berkas dengan no surat <strong className="text-brand-pink">{searchInput}</strong>. Harap periksa tanda hubung (-) atau tanyakan admin pendaftaran ya Ayah Bunda!
                </p>
              </div>
            )}
          </div>
        )}
      </section>

    </div>
  );
}
