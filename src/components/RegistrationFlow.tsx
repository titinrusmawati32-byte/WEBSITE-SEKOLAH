/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, Users, GraduationCap, FileText, CheckCircle, 
  ChevronRight, ChevronLeft, Upload, Sparkles, AlertCircle, Eye, Smile, Star 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Pendaftar, DokumenUpload } from '../types';

interface RegistrationFlowProps {
  onRegisterSubmit: (applicantData: Omit<Pendaftar, 'id' | 'status' | 'tanggalDaftar'>) => void;
  setActivePage: (p: any) => void;
}

export default function RegistrationFlow({ onRegisterSubmit, setActivePage }: RegistrationFlowProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [valErrors, setValErrors] = useState<string[]>([]);

  // ---- STEP 1 STATE: DATA SISWA ----
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [alamat, setAlamat] = useState('');
  const [sekolahAsal, setSekolahAsal] = useState('');
  const [nomorHpSiswa, setNomorHpSiswa] = useState(''); // Kita isi HP Orang tua juga tidak apa-apa

  // ---- STEP 2 STATE: DATA ORANG TUA ----
  const [namaAyah, setNamaAyah] = useState('');
  const [namaIbu, setNamaIbu] = useState('');
  const [pekerjaanOrangTua, setPekerjaanOrangTua] = useState('');
  const [nomorHpOrtu, setNomorHpOrtu] = useState('');
  const [emailOrtu, setEmailOrtu] = useState('');
  const [alamatOrtu, setAlamatOrtu] = useState('');

  // ---- STEP 3 STATE: PILIH PROGRAM ----
  const [programPilihan, setProgramPilihan] = useState<'SMA' | 'Perguruan Tinggi'>('SMA');
  const [jurusanPilihan, setJurusanPilihan] = useState('SD Cilik (Kelas 1 - 3)');
  const [catatanTambahan, setCatatanTambahan] = useState('');

  // ---- STEP 4 STATE: UPLOAD DOKUMEN ----
  const [aktaLahirName, setAktaLahirName] = useState('');
  const [kartuKeluargaName, setKartuKeluargaName] = useState('');
  const [ijazahRaporName, setIjazahRaporName] = useState('');
  const [fotoSiswaName, setFotoSiswaName] = useState('');
  // Visual base64 holders
  const [fotoSiswaData, setFotoSiswaData] = useState<string>('');

  // ---- STEP 5 STATE: KONFIRMASI ----
  const [isAgreed, setIsAgreed] = useState(false);

  // Auto-set jurusan pilihan jika program pilihan berubah
  const handleProgramChange = (prog: 'SMA' | 'Perguruan Tinggi') => {
    setProgramPilihan(prog);
    if (prog === 'SMA') {
      setJurusanPilihan('SD Cilik (Kelas 1 - 3)');
    } else {
      setJurusanPilihan('SD Hebat (Kelas 4 - 6)');
    }
  };

  // Handler simulasi pembacaan file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: 'akta' | 'kk' | 'rapor' | 'foto') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (docType === 'akta') {
      setAktaLahirName(file.name);
    } else if (docType === 'kk') {
      setKartuKeluargaName(file.name);
    } else if (docType === 'rapor') {
      setIjazahRaporName(file.name);
    } else if (docType === 'foto') {
      setFotoSiswaName(file.name);
      
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFotoSiswaData(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Validasi individual langkah-langkah
  const validateStep = (step: number): boolean => {
    const errors: string[] = [];
    setValErrors([]);

    if (step === 1) {
      if (!namaLengkap.trim()) errors.push('Nama lengkap calon murid harus diisi.');
      if (!tempatLahir.trim()) errors.push('Tempat lahir calon murid harus diisi.');
      if (!tanggalLahir) errors.push('Tanggal lahir harus diisi.');
      if (!alamat.trim()) errors.push('Alamat tinggal harus diisi.');
      if (!sekolahAsal.trim()) errors.push('TK Asal / PAUD harus diisi.');
      if (!nomorHpSiswa.trim()) {
        errors.push('Nomor HP/WA Orang Tua wajib diisi.');
      }
    } else if (step === 2) {
      if (!namaAyah.trim() && !namaIbu.trim()) errors.push('Minimal salah satu nama orang tua diisi.');
      if (!pekerjaanOrangTua.trim()) errors.push('Pekerjaan orang tua wajib diisi.');
      if (!nomorHpOrtu.trim()) errors.push('Nomor HP Orang Tua wajib diisi.');
      if (!emailOrtu.trim()) {
        errors.push('Email Orang Tua wajib diisi untuk kabar kelulusan.');
      } else if (!/\S+@\S+\.\S+/.test(emailOrtu)) {
        errors.push('Format alamat email salah.');
      }
      if (!alamatOrtu.trim()) errors.push('Alamat orang tua wajib diisi.');
    } else if (step === 4) {
      if (!aktaLahirName) errors.push('File Akta Kelahiran wajib diunggah.');
      if (!kartuKeluargaName) errors.push('File Kartu Keluarga wajib diunggah.');
      if (!ijazahRaporName) errors.push('Sertifikat kelulusan TK / Surat pengantar wajib diunggah.');
      if (!fotoSiswaName) errors.push('Pasfoto imut anak wajib diunggah.');
    }

    if (errors.length > 0) {
      setValErrors(errors);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setValErrors([]);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
      alert('Anda harus menyetujui integritas pernyataan!');
      return;
    }

    onRegisterSubmit({
      namaLengkap,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      alamat,
      sekolahAsal,
      nomorHpSiswa,
      namaAyah,
      namaIbu,
      pekerjaanOrangTua,
      nomorHpOrtu,
      emailOrtu,
      alamatOrtu,
      programPilihan,
      jurusanPilihan,
      catatanTambahan,
      dokumen: {
        aktaLahirName,
        kartuKeluargaName,
        ijazahRaporName,
        fotoSiswaName,
        fotoSiswaData: fotoSiswaData || undefined,
      },
    });
  };

  // Navigasi visual tahapan
  const stepConfig = [
    { num: 1, label: 'Data Anak', icon: '👦' },
    { num: 2, label: 'Orang Tua', icon: '👪' },
    { num: 3, label: 'Pilih Kelas', icon: '🎒' },
    { num: 4, label: 'Kirim Berkas', icon: '📁' },
    { num: 5, label: 'Konfirmasi', icon: '✨' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8 bg-amber-50/15 min-h-screen" id="reg-flow-root">
      
      {/* progress Tracker */}
      <nav className="bg-white p-5 rounded-3xl border-3 border-brand-blue-medium/10 shadow-md" aria-label="Langkah Pendaftaran" id="reg-progress-tracker">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2.5 shrink-0">
            <span className="p-3 bg-brand-pink text-white rounded-2xl text-xl animate-pulse">
              🎒
            </span>
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-brand-pink leading-none">Pintu Pendaftaran Ceria</h2>
              <p className="text-sm font-black text-brand-blue font-display mt-0.5">SD Nusantara 2026/2027</p>
            </div>
          </div>

          {/* Stepper bubbles */}
          <div className="flex items-center space-x-2 overflow-x-auto py-1 max-w-full">
            {stepConfig.map((s) => {
              const works = currentStep >= s.num;
              const isCurrent = currentStep === s.num;
              return (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-extrabold transition-all border-2 ${
                        isCurrent 
                          ? 'bg-brand-pink text-white border-brand-pink ring-4 ring-pink-100 scale-105'
                          : works 
                            ? 'bg-brand-blue text-white border-brand-blue'
                            : 'bg-slate-105 text-slate-400 border-slate-200'
                      }`}
                      title={s.label}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-sm">{s.icon}</span>
                    </motion.div>
                    <span className="text-[10px] font-black mt-1 text-slate-600">
                      {s.label}
                    </span>
                  </div>
                  {s.num < 5 && (
                    <div className={`h-1 w-6 sm:w-10 transform -translate-y-2 mt-1 ${
                      currentStep > s.num ? 'bg-brand-blue' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* panel Error Alerts */}
      {valErrors.length > 0 && (
        <div className="bg-red-50 text-red-850 border-l-4 border-red-500 p-4 rounded-3xl text-sm space-y-1 shadow-md font-bold">
          <div className="flex items-center gap-2 font-black pb-0.5 text-red-650">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span>Ada isian penting yang kelewatan:</span>
          </div>
          <ul className="list-disc pl-5 space-y-0.5">
            {valErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* FORM BODY CONTAINER */}
      <div className="bg-white rounded-3xl border-4 border-dashed border-brand-blue/30 shadow-lg overflow-hidden relative" id="form-body-container">
        
        {/* STEP 1: DATA SISWA */}
        {currentStep === 1 && (
          <div className="p-6 md:p-8 space-y-6" id="form-step-1">
            <div className="border-b-2 border-dashed pb-3.5">
              <h3 className="text-xl font-black text-brand-blue font-display flex items-center gap-2">
                <Smile className="w-6 h-6 text-brand-gold animate-bounce" />
                Langkah 1: Profil Adik Calon Murid
              </h3>
              <p className="text-xs text-slate-500 font-bold mt-1">Isilah identitas calon murid baru dengan lengkap dan gembira!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">Nama Lengkap Anak <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Contoh: Budi Pratama Wijaya"
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">Jenis Kelamin <span className="text-red-500">*</span></label>
                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-1.5 cursor-pointer font-bold bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
                    <input
                      type="radio"
                      name="jk"
                      checked={jenisKelamin === 'Laki-laki'}
                      onChange={() => setJenisKelamin('Laki-laki')}
                      className="accent-brand-blue"
                    />
                    <span>👦 Laki-Laki</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-bold bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
                    <input
                      type="radio"
                      name="jk"
                      checked={jenisKelamin === 'Perempuan'}
                      onChange={() => setJenisKelamin('Perempuan')}
                      className="accent-brand-pink"
                    />
                    <span>👧 Perempuan</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">Tempat Lahir <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta"
                  value={tempatLahir}
                  onChange={(e) => setTempatLahir(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">Tanggal Lahir <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                  required
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="font-extrabold text-slate-700 block">Alamat Tinggal Calon Murid <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Tuliskan alamat rumah ayah bunda yang lengkap..."
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">TK / PAUD Asal Calon Murid <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Contoh: TK Pembina Lestari Ceria"
                  value={sekolahAsal}
                  onChange={(e) => setSekolahAsal(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">Nomor HP / WhatsApp Hubungan <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  placeholder="Contoh: 0812xxxxxxxx (HP Wali)"
                  value={nomorHpSiswa}
                  onChange={(e) => setNomorHpSiswa(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DATA ORANG TUA */}
        {currentStep === 2 && (
          <div className="p-6 md:p-8 space-y-6" id="form-step-2">
            <div className="border-b-2 border-dashed pb-3.5">
              <h3 className="text-xl font-black text-brand-blue font-display flex items-center gap-2">
                <Users className="w-6 h-6 text-brand-gold animate-bounce" />
                Langkah 2: Data Ayah & Bunda
              </h3>
              <p className="text-xs text-slate-400 mt-1">Dibutuhkan agar kakak guru berkabar gembira mengenai rahasia kejeniusan si kecil.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">Nama Lengkap Ayah Kandung</label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap bapak..."
                  value={namaAyah}
                  onChange={(e) => setNamaAyah(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">Nama Lengkap Ibu Kandung</label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap ibu..."
                  value={namaIbu}
                  onChange={(e) => setNamaIbu(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">Profesi Ayah/Bunda <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Contoh: Pegawai, Wiraswasta, Ibu Rumah Tangga"
                  value={pekerjaanOrangTua}
                  onChange={(e) => setPekerjaanOrangTua(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">Nomor HP Orang Tua (WhatsApp) <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  placeholder="Contoh: 081xxxxxxxxxx"
                  value={nomorHpOrtu}
                  onChange={(e) => setNomorHpOrtu(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">Alamat Email Aktif <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  placeholder="Contoh: ayahbunda@gmail.com"
                  value={emailOrtu}
                  onChange={(e) => setEmailOrtu(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setAlamatOrtu(alamat)}
                  className="text-xs text-brand-pink font-black hover:underline mb-1 inline-block cursor-pointer"
                >
                  Salin alamat rumah anak tinggal
                </button>
                <label className="font-extrabold text-slate-700 block">Alamat Lengkap Orang Tua <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Tuliskan alamat tinggal ayah bunda..."
                  value={alamatOrtu}
                  onChange={(e) => setAlamatOrtu(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none font-bold"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PILIH PROGRAM */}
        {currentStep === 3 && (
          <div className="p-6 md:p-8 space-y-6" id="form-step-3">
            <div className="border-b-2 border-dashed pb-3.5">
              <h3 className="text-xl font-black text-brand-blue font-display flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-brand-pink" />
                Langkah 3: Pilih Kelas & Jalur Mainan
              </h3>
              <p className="text-xs text-slate-500 font-bold mt-1">Pilih tingkat kelas sekolah dasar yang paling cocok bagi buah hati tercinta.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm">
              
              {/* Opsi Program Utama */}
              <div className="space-y-2">
                <label className="font-extrabold text-slate-900 block">Pilihan Jalur Kelas Dasar <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div 
                    onClick={() => handleProgramChange('SMA')}
                    className={`p-4 border-3 rounded-3xl text-center cursor-pointer select-none transition-all ${
                      programPilihan === 'SMA'
                        ? 'border-brand-blue bg-brand-blue-light/70 font-black shadow-md'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-base font-black text-brand-blue">Kelas Rendah</span>
                    <p className="text-[10px] text-slate-550 mt-1 font-bold block leading-none">Petualang Cilik (1 - 3)</p>
                  </div>
                  
                  <div 
                    onClick={() => handleProgramChange('Perguruan Tinggi')}
                    className={`p-4 border-3 rounded-3xl text-center cursor-pointer select-none transition-all ${
                      programPilihan === 'Perguruan Tinggi'
                        ? 'border-brand-pink bg-pink-50 font-black shadow-md'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-base font-black text-brand-pink">Kelas Tinggi</span>
                    <p className="text-[10px] text-slate-550 mt-1 font-bold block leading-none">Juara Hebat (4 - 6)</p>
                  </div>
                </div>
              </div>

              {/* Pilihan Jurusan / Program Studi */}
              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-650 block">Peminatan Belajar <span className="text-red-500">*</span></label>
                
                {programPilihan === 'SMA' ? (
                  <select
                    value={jurusanPilihan}
                    onChange={(e) => setJurusanPilihan(e.target.value)}
                    className="w-full px-4 py-2.5 font-bold border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none bg-white cursor-pointer"
                  >
                    <option value="SD Cilik (Kelas 1 - 3)">SD Cilik (Kelas 1 - 3)</option>
                    <option value="Kelas Bilingual Ceria">Kelas Bilingual Ceria</option>
                  </select>
                ) : (
                  <select
                    value={jurusanPilihan}
                    onChange={(e) => setJurusanPilihan(e.target.value)}
                    className="w-full px-4 py-2.5 font-bold border-2 border-slate-200 rounded-full focus:border-brand-blue outline-none bg-white cursor-pointer"
                  >
                    <option value="SD Hebat (Kelas 4 - 6)">SD Hebat (Kelas 4 - 6)</option>
                    <option value="Kelas Prestasi Robotik">Kelas Prestasi Robotik & Coding</option>
                  </select>
                )}
              </div>

              {/* Catatan Tambahan */}
              <div className="space-y-1 sm:col-span-2">
                <label className="font-extrabold text-slate-700 block">Keterangan Khusus Si Kecil (Alergi / Bakat Gambar / Kegemaran Kelinci dll)</label>
                <textarea
                  placeholder="Contoh: Ananda gemar melukis lumba-lumba, dan tidak bisa makan udang merah..."
                  rows={2.5}
                  value={catatanTambahan}
                  onChange={(e) => setCatatanTambahan(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-brand-blue outline-none font-bold"
                ></textarea>
              </div>

            </div>
          </div>
        )}

        {/* STEP 4: UPLOAD DOKUMEN */}
        {currentStep === 4 && (
          <div className="p-6 md:p-8 space-y-6" id="form-step-4">
            <div className="border-b-2 border-dashed pb-3.5">
              <h3 className="text-xl font-black text-brand-blue font-display flex items-center gap-2">
                <Upload className="w-5 h-5 text-brand-gold animate-bounce" />
                Langkah 4: Kirim Foto-Foto Lampiran
              </h3>
              <p className="text-xs text-slate-500 font-bold mt-1">Harap pilih berkas pindaian sederhana. Tidak perlu tegang, kuitansi menyusul!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm">
              
              {/* Akta kelahiran */}
              <div className="space-y-1.5 p-4 bg-amber-50/50 border-3 border-dashed border-brand-gold rounded-3xl relative flex flex-col justify-between">
                <div>
                  <label className="font-black text-slate-800 block">Akta Kelahiran Calon Murid <span className="text-red-500">*</span></label>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-bold">Membuktikan status umur calon peserta.</p>
                </div>
                <div className="flex items-center space-x-2.5 pt-2">
                  <label className="px-4 py-2 bg-brand-blue hover:bg-brand-blue-medium text-white font-extrabold text-xs rounded-full cursor-pointer flex items-center gap-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Pilih Berkas</span>
                    <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => handleFileChange(e, 'akta')} className="hidden" />
                  </label>
                  <span className="text-[11px] text-slate-500 font-bold truncate">
                    {aktaLahirName || 'Berkas belum dipilih'}
                  </span>
                </div>
              </div>

              {/* KK */}
              <div className="space-y-1.5 p-4 bg-amber-50/50 border-3 border-dashed border-brand-gold rounded-3xl relative flex flex-col justify-between">
                <div>
                  <label className="font-black text-slate-800 block">Kartu Keluarga (KK) <span className="text-red-500">*</span></label>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-bold">Menghubungkan asuransi wali dengan guru kelas.</p>
                </div>
                <div className="flex items-center space-x-2.5 pt-2">
                  <label className="px-4 py-2 bg-brand-blue hover:bg-brand-blue-medium text-white font-extrabold text-xs rounded-full cursor-pointer flex items-center gap-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Pilih Berkas</span>
                    <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => handleFileChange(e, 'kk')} className="hidden" />
                  </label>
                  <span className="text-[11px] text-slate-500 font-bold truncate">
                    {kartuKeluargaName || 'Berkas belum dipilih'}
                  </span>
                </div>
              </div>

              {/* Ijazah Rapor */}
              <div className="space-y-1.5 p-4 bg-amber-50/50 border-3 border-dashed border-brand-gold rounded-3xl relative flex flex-col justify-between">
                <div>
                  <label className="font-black text-slate-800 block">Keterangan Lulus TK / Rapor Sebelumnya <span className="text-red-500">*</span></label>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-bold">Rapor TK asli atau surat keterangan ramah belajar.</p>
                </div>
                <div className="flex items-center space-x-2.5 pt-2">
                  <label className="px-4 py-2 bg-brand-blue hover:bg-brand-blue-medium text-white font-extrabold text-xs rounded-full cursor-pointer flex items-center gap-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Pilih Berkas</span>
                    <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => handleFileChange(e, 'rapor')} className="hidden" />
                  </label>
                  <span className="text-[11px] text-slate-500 font-bold truncate">
                    {ijazahRaporName || 'Berkas belum dipilih'}
                  </span>
                </div>
              </div>

              {/* Pasfoto */}
              <div className="space-y-1.5 p-4 bg-pink-50/40 border-3 border-dashed border-brand-pink rounded-3xl relative flex flex-col justify-between">
                <div>
                  <label className="font-black text-slate-800 block">Lencana Pasfoto Imut Calon Murid <span className="text-red-550">*</span></label>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-bold">Unggah foto paling ganteng/cantik dengan senyum lebar!</p>
                </div>
                <div className="flex items-center space-x-2.5 pt-2 justify-between">
                  <div className="flex items-center space-x-2">
                    <label className="px-4 py-2 bg-brand-pink hover:bg-pink-600 text-white font-extrabold text-xs rounded-full cursor-pointer flex items-center gap-1 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Pilih Foto</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'foto')} className="hidden" />
                    </label>
                    <span className="text-[11px] text-slate-500 font-bold truncate max-w-[100px]">
                      {fotoSiswaName || 'Belum dipilih'}
                    </span>
                  </div>
                  {fotoSiswaData && (
                    <img 
                      src={fotoSiswaData} 
                      alt="Thumbnail murid" 
                      className="w-12 h-12 object-cover rounded-2xl border-2 border-brand-pink shadow shrink-0" 
                    />
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 5: RINGKASAN & KONFIRMASI */}
        {currentStep === 5 && (
          <div className="p-6 md:p-8 space-y-6" id="form-step-5">
            <div className="border-b-2 border-dashed pb-3.5">
              <h3 className="text-xl font-black text-brand-blue font-display flex items-center gap-1.5">
                <CheckCircle className="w-6 h-6 text-brand-green" />
                Langkah 5: Kotak Kebenaran Berkas
              </h3>
              <p className="text-xs text-slate-500 font-bold mt-1">Selesai! Yuk dicek lagi isian surat berkas dengan senyuman terbaik.</p>
            </div>

            {/* Resume Isian */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm bg-amber-50/20 p-5 rounded-3xl border-3 border-dashed border-brand-gold-medium/30">
              
              <div className="space-y-2">
                <h4 className="font-extrabold text-xs text-brand-blue border-b-2 border-brand-blue/15 pb-1">👦 PROFIL CALON MURID BARU</h4>
                <p className="font-bold">Nama Lengkap: <span className="text-slate-900">{namaLengkap}</span></p>
                <p className="font-bold">Model Anak: <span className="text-slate-900">{jenisKelamin} JK</span></p>
                <p className="font-bold">Ulang Tahun: <span className="text-slate-900">{tempatLahir}, {tanggalLahir}</span></p>
                <p className="font-bold">TK Asal: <span className="text-slate-900">{sekolahAsal}</span></p>
                <p className="font-bold">No. Kontak: <span className="text-slate-900">{nomorHpSiswa}</span></p>
                <p className="line-clamp-2 font-bold">Alamat: <span className="text-slate-700">{alamat}</span></p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-xs text-brand-blue border-b-2 border-brand-blue/15 pb-1">👪 DATA ORANG TUA / WALI</h4>
                <p className="font-bold">Nama Ayah/Ibu: <span className="text-slate-900">{namaAyah || '−'} / {namaIbu || '−'}</span></p>
                <p className="font-bold">Pekerjaan Ayah/Bunda: <span className="text-slate-900">{pekerjaanOrangTua}</span></p>
                <p className="font-bold">Nomor WA Wali: <span className="text-slate-900">{nomorHpOrtu}</span></p>
                <p className="font-bold">Email Komunikasi: <span className="text-slate-900">{emailOrtu}</span></p>
                <p className="line-clamp-2 font-bold">Alamat Rumah: <span className="text-slate-700">{alamatOrtu}</span></p>
              </div>

              <div className="space-y-2 md:col-span-2 border-t-2 border-dashed pt-3">
                <h4 className="font-extrabold text-xs text-brand-blue border-b-2 border-brand-blue/15 pb-1">🏫 PILIHAN TINGKAT BELAJAR & FOTO</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-bold">
                  <div>
                    <p>Fase Target: <span className="bg-brand-blue text-white font-extrabold px-3 py-1 rounded-full text-[10px] ml-1 uppercase">{programPilihan === 'SMA' ? 'Kelas Rendah (1-3)' : 'Kelas Tinggi (4-6)'}</span></p>
                    <p className="mt-1.5">Peminatan Cilik: <span className="text-brand-pink font-extrabold">{jurusanPilihan}</span></p>
                    {catatanTambahan && <p className="mt-1.5">Catatan/Alergi: <span className="italic font-medium">{catatanTambahan}</span></p>}
                  </div>
                  <div className="space-y-1 bg-white p-3 rounded-2xl border-2 border-slate-100 text-[11px] text-slate-500 font-bold">
                    <p>✓ Akta Lahir: <span className="text-slate-800">{aktaLahirName}</span></p>
                    <p>✓ Kartu Keluarga: <span className="text-slate-800">{kartuKeluargaName}</span></p>
                    <p>✓ Berkas TK: <span className="text-slate-800">{ijazahRaporName}</span></p>
                    <p>✓ Pasfoto Imut: <span className="text-slate-800">{fotoSiswaName}</span></p>
                  </div>
                </div>
              </div>

            </div>

            {/* Checkbox Persetujuan integritas */}
            <div className="p-4 bg-brand-gold-light/65 border-2 border-dashed border-brand-gold rounded-2xl text-xs sm:text-sm font-bold">
              <label className="flex items-start space-x-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="w-5 h-5 text-brand-blue accent-brand-blue rounded shrink-0 mt-0.5"
                  id="chk-flow-agreement"
                />
                <span className="text-slate-700 leading-relaxed font-bold">
                  Saya menyatakan dengan gembira, tulus, dan jujur bahwa seluruh dokumen foto serta data si kecil yang kami lampirkan di atas adalah asli kelulusan TK tanpa manipulasi. Kami siap bermain ceria dan bersahabat baik di SD Nusantara!
                </span>
              </label>
            </div>

          </div>
        )}

        {/* BOTTOM NAV BAR COMMANDS */}
        <div className="bg-slate-50 border-t px-6 py-4 flex justify-between items-center" id="form-footbar">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-4 py-2 border-2 rounded-full text-xs font-black transition-colors cursor-pointer flex items-center space-x-1 ${
              currentStep === 1 
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-300 border-slate-200'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
            }`}
            id="flow-btn-back"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {currentStep === 5 ? (
            <motion.button
              onClick={handleFinalSubmit}
              disabled={!isAgreed}
              className={`px-6 py-3 bg-brand-green hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-full transition-all shadow-md flex items-center space-x-1.5 cursor-pointer border-b-3 border-emerald-700 ${
                !isAgreed ? 'opacity-40 cursor-not-allowed' : ''
              }`}
              id="flow-btn-submit"
              whileHover={{ scale: 1.05 }}
            >
              <span>Kirim Pendaftaran Murid Baru! 🚀</span>
              <CheckCircle className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 bg-brand-blue hover:bg-brand-blue-medium text-white font-black text-xs sm:text-sm rounded-full transition-all flex items-center space-x-1 cursor-pointer border-b-3 border-blue-800"
              id="flow-btn-next"
              whileHover={{ scale: 1.05 }}
            >
              <span>Lanjutkan Yuk! ✨</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>

      </div>

    </div>
  );
}
