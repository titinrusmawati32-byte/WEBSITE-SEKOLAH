/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Lock, LayoutDashboard, Users, FileText, Image, Settings, 
  Search, ShieldAlert, Award, FileClock, CheckCircle2, XCircle, 
  HelpCircle, Edit, Plus, Trash2, Globe2, Building2, Upload, Trash 
} from 'lucide-react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Pendaftar, Berita, GaleriItem, ProfilYayasan, ProgramPendidikan, ActivePage } from '../types';

interface AdminPanelProps {
  applicants: Pendaftar[];
  onUpdateApplicantStatus: (id: string, status: Pendaftar['status'], catatan?: string) => void;
  news: Berita[];
  onAddNews: (newBerita: Omit<Berita, 'id'>) => void;
  onDeleteNews: (id: string) => void;
  gallery: GaleriItem[];
  onAddGallery: (newGalItem: Omit<GaleriItem, 'id'>) => void;
  onDeleteGallery: (id: string) => void;
  profile: ProfilYayasan;
  onUpdateProfile: (updatedProfile: ProfilYayasan) => void;
  programs: ProgramPendidikan[];
  onUpdatePrograms: (updatedPrograms: ProgramPendidikan[]) => void;
  adminLoggedIn: boolean;
  onLoginAdmin: () => void;
}

export default function AdminPanel({
  applicants,
  onUpdateApplicantStatus,
  news,
  onAddNews,
  onDeleteNews,
  gallery,
  onAddGallery,
  onDeleteGallery,
  profile,
  onUpdateProfile,
  onUpdatePrograms,
  programs,
  adminLoggedIn,
  onLoginAdmin,
}: AdminPanelProps) {
  
  // ---- SECURITY LOGIN LOCAL ACTIONS ----
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'admin') {
      setLoginError('');
      onLoginAdmin();
    } else {
      setLoginError('Kombinasi sandi sandi salah. Gunakan username: "admin" & sandi: "admin".');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoginError('');
      await signInWithPopup(auth, provider);
      onLoginAdmin();
    } catch (err: any) {
      setLoginError(`Gagal otentikasi Google: ${err.message}`);
    }
  };

  // ---- CONTROL PANEL ACTIVE TAB ----
  // 'dashboard' | 'applicants' | 'news' | 'profile' | 'gallery'
  const [adminTab, setAdminTab] = useState<'dashboard' | 'applicants' | 'news' | 'profile' | 'gallery'>('dashboard');

  // ---- STATE UNTUK MANAJEMEN PENDAFTAR ----
  const [selectedApplicant, setSelectedApplicant] = useState<Pendaftar | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [filterProgram, setFilterProgram] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusComment, setStatusComment] = useState('');

  // ---- STATE UNTUK MANAJEMEN KONTEN BERITA ----
  const [newJudul, setNewJudul] = useState('');
  const [newKategori, setNewKategori] = useState<Berita['kategori']>('Pengumuman');
  const [newRingkasan, setNewRingkasan] = useState('');
  const [newKonten, setNewKonten] = useState('');
  const [newGambar, setNewGambar] = useState('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600');

  // ---- STATE UNTUK MANAJEMEN KONTEN GALERI ----
  const [newGalJudul, setNewGalJudul] = useState('');
  const [newGalKategori, setNewGalKategori] = useState<GaleriItem['kategori']>('SMA');
  const [newGalUrl, setNewGalUrl] = useState('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800');
  const [newGalTipe, setNewGalTipe] = useState<'foto' | 'video'>('foto');

  // ---- STATE EDIT INSTITUSI PROFILE ----
  const [editVisi, setEditVisi] = useState(profile.visi);
  const [editSejarah, setEditSejarah] = useState(profile.sejarah);
  const [misiList, setMisiList] = useState<string[]>(profile.misi);
  const [newMisiInput, setNewMisiInput] = useState('');

  // ---- RECENT ACTIVITIES SIMULATION ----
  const recentActivities = [
    { text: 'Aplikasi baru an. Anissa Putri Syahrini masuk jalur Sarjana', time: '1 jam lalu' },
    { text: 'Dokumen Rian Hidayatullah dinyatakan Diterima di SMA Nusantara', time: '5 jam lalu' },
    { text: 'Dimas Aditya Nugraha diminta merevisi Berkas Rapor SMP', time: '1 hari lalu' }
  ];

  // METRIKS STATISTIK
  const totalPendaftar = applicants.length;
  const totalDiterima = applicants.filter((a) => a.status === 'Diterima').length;
  const totalPending = applicants.filter((a) => a.status === 'Pending').length;
  const totalRevisi = applicants.filter((a) => a.status === 'Revisi').length;

  // Filter queue pendaftar
  const filteredApplicants = applicants.filter((a) => {
    const matchStatus = filterStatus === 'Semua' || a.status === filterStatus;
    const matchProgram = filterProgram === 'Semua' || a.programPilihan === filterProgram;
    const matchSearch = a.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) || a.sekolahAsal.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchProgram && matchSearch;
  });

  // Action pengajuan update status
  const submitStatusUpdate = (status: Pendaftar['status']) => {
    if (!selectedApplicant) return;
    onUpdateApplicantStatus(selectedApplicant.id, status, statusComment || undefined);
    
    // update instant local copy
    setSelectedApplicant({
      ...selectedApplicant,
      status: status,
      catatanStatus: statusComment || undefined
    });
    setStatusComment('');
    alert(`Status pendaftar ${selectedApplicant.id} berhasil diperbarui menjadi: "${status}"!`);
  };

  // Add news handler
  const handleAddNewNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJudul || !newRingkasan || !newKonten) {
      alert('Mohon isi semua kolom berita!');
      return;
    }
    onAddNews({
      judul: newJudul,
      kategori: newKategori,
      ringkasan: newRingkasan,
      konten: newKonten,
      gambar: newGambar,
      tanggal: 'Mei 23, 2026'
    });
    setNewJudul('');
    setNewRingkasan('');
    setNewKonten('');
    alert('Artikel Berita Terbaru berhasil diterbitkan resmi di Portal Utama!');
  };

  // Add Gallery handler
  const handleAddNewGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalJudul || !newGalUrl) {
      alert('Mohon isi judul dan pindaian URL dokumentasi!');
      return;
    }
    onAddGallery({
      judul: newGalJudul,
      kategori: newGalKategori,
      url: newGalUrl,
      tipe: newGalTipe
    });
    setNewGalJudul('');
    alert('Media dokumentasi baru berhasil digabungkan dalam galeri situs!');
  };

  // Save Profil Yayasan CMS Changes
  const handleSaveProfileCMS = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      visi: editVisi,
      misi: misiList,
      sejarah: editSejarah,
      struktur: profile.struktur,
      nilai: profile.nilai
    });
    alert('Pembaruan data profil Yayasan berhasil tersimpan secara aman di database!');
  };

  // -------------------------------------------------------------
  // RENDERING LOGIN SCREEN (SECURITY GATEKEEPER)
  // -------------------------------------------------------------
  if (!adminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16" id="admin-login-screen">
        <div className="bg-white rounded-3xl border shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="bg-brand-gold-light text-brand-blue p-3 rounded-2xl border inline-block">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-brand-blue font-display">Login Portal Pengurus YPN</h1>
            <p className="text-xs text-slate-400">Gunakan kredensial pengurus administrasi untuk mengakses dashboard evaluasi pendaftar.</p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 text-red-800 border-l-4 border-red-500 rounded-r-xl text-xs font-semibold leading-relaxed">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs sm:text-sm" id="form-login-admin">
            <div className="space-y-1">
              <label className="font-bold text-slate-705">Username Pengurus</label>
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-brand-blue/30"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="font-bold text-slate-705">Kata Sandi / Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-brand-blue/30"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-brand-blue hover:bg-slate-905 text-white hover:text-brand-gold font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
              id="btn-admin-login-submit"
            >
              Masuk Dashboard Sistem
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2.5 text-slate-400 font-bold uppercase tracking-wider">atau</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-brand-blue font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              id="btn-admin-google-login"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.51l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Login dengan Akun Google</span>
            </button>

            <p className="text-[10px] text-slate-400 text-center">Rujukan Sandbox Kredensial Administrasi: (ID: <strong className="text-slate-500">admin</strong> / Sandi: <strong className="text-slate-500">admin</strong>)</p>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDERING CORE PORTAL (ADMIN DASHBOARD ACTIVE)
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8" id="admin-dashboard-root">
      
      {/* Samping layout: Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDE BAR NAVIGATION */}
        <div className="lg:col-span-3 bg-slate-900 text-slate-300 rounded-2xl overflow-hidden border border-slate-800 shadow-xl" id="admin-sidebar">
          
          <div className="bg-slate-950 p-4 border-b border-slate-900 flex items-center space-x-3">
            <div className="bg-emerald-500 p-1.5 rounded-lg text-white font-extrabold text-[10px]">
              ONLINE
            </div>
            <div>
              <p className="text-xs font-bold text-white">Ferdinand Siregar</p>
              <p className="text-[10px] text-slate-505 leading-none mt-0.5">Administrator Utama</p>
            </div>
          </div>

          <div className="px-3 py-4 space-y-1 text-xs">
            <button
              onClick={() => { setAdminTab('dashboard'); setSelectedApplicant(null); }}
              className={`w-full text-left py-2.5 px-3.5 rounded-xl font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                adminTab === 'dashboard' ? 'bg-brand-blue text-brand-gold border-l-4 border-brand-gold font-black' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Ringkasan Dashboard</span>
            </button>

            <button
              onClick={() => { setAdminTab('applicants'); }}
              className={`w-full text-left py-2.5 px-3.5 rounded-xl font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                adminTab === 'applicants' ? 'bg-brand-blue text-brand-gold border-l-4 border-brand-gold font-black' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Manajemen Pendaftar ({totalPendaftar})</span>
            </button>

            <button
              onClick={() => { setAdminTab('news'); setSelectedApplicant(null); }}
              className={`w-full text-left py-2.5 px-3.5 rounded-xl font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                adminTab === 'news' ? 'bg-brand-blue text-brand-gold border-l-4 border-brand-gold font-black' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>CMS Berita & PPDB</span>
            </button>

            <button
              onClick={() => { setAdminTab('profile'); setSelectedApplicant(null); }}
              className={`w-full text-left py-2.5 px-3.5 rounded-xl font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                adminTab === 'profile' ? 'bg-brand-blue text-brand-gold border-l-4 border-brand-gold font-black' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>CMS Profil Yayasan</span>
            </button>

            <button
              onClick={() => { setAdminTab('gallery'); setSelectedApplicant(null); }}
              className={`w-full text-left py-2.5 px-3.5 rounded-xl font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                adminTab === 'gallery' ? 'bg-brand-blue text-brand-gold border-l-4 border-brand-gold font-black' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Image className="w-4 h-4 shrink-0" />
              <span>Manajemen Galeri</span>
            </button>
          </div>

        </div>

        {/* WORK BENCH DISPLAY PANEL */}
        <div className="lg:col-span-9 space-y-6" id="admin-workbench">
          
          {/* TAB 1: DASHBOARD METRICS HIGHLIGHTS */}
          {adminTab === 'dashboard' && (
            <div className="space-y-6" id="admin-subtab-dashboard">
              
              {/* Statistik bar info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border shadow-sm space-y-1">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">Total Registrasi</span>
                  <p className="text-2xl font-black text-brand-blue font-display">{totalPendaftar}</p>
                  <p className="text-[9px] text-slate-505 font-medium">Calon Siswa & Mhs</p>
                </div>
                <div className="bg-white p-4 rounded-xl border shadow-sm space-y-1">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase text-emerald-600">Diterima (Lulus)</span>
                  <p className="text-2xl font-black text-emerald-500 font-display">{totalDiterima}</p>
                  <p className="text-[9px] text-slate-505 font-medium">Valid Teruji</p>
                </div>
                <div className="bg-white p-4 rounded-xl border shadow-sm space-y-1">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase text-blue-500">Pending (Uji berkas)</span>
                  <p className="text-2xl font-black text-blue-550 text-blue-500 font-display">{totalPending}</p>
                  <p className="text-[9px] text-slate-505 font-medium">Daftar Antrean</p>
                </div>
                <div className="bg-white p-4 rounded-xl border shadow-sm space-y-1">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase text-amber-500">Revisi Terkirim</span>
                  <p className="text-2xl font-black text-amber-500 font-display">{totalRevisi}</p>
                  <p className="text-[9px] text-slate-505 font-medium">Perbaikan Dokumen</p>
                </div>
              </div>

              {/* Grid bento layout: Recent activities & content summaries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Aktivitas Terkini */}
                <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-3">
                  <h3 className="font-extrabold text-sm text-slate-900 border-b pb-1.5 uppercase tracking-wider block">Log Aktivitas Portal</h3>
                  <div className="space-y-2.5">
                    {recentActivities.map((act, aIdx) => (
                      <div key={aIdx} className="p-2.5 bg-slate-50 border border-slate-105 rounded-lg text-xs leading-relaxed flex justify-between items-center">
                        <span className="font-medium text-slate-700">{act.text}</span>
                        <span className="text-[10px] text-slate-400 font-semibold shrink-0 ml-2">{act.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ringkasan Berita saat ini */}
                <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-3">
                  <h3 className="font-extrabold text-sm text-slate-900 border-b pb-1.5 uppercase tracking-wider block">Inventori Konten</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-brand-blue-light/50 p-3 rounded-lg border-l-4 border-brand-blue">
                      <span className="text-slate-500 block">Total Berita</span>
                      <strong className="text-base text-brand-blue">{news.length} Artikel</strong>
                    </div>
                    <div className="bg-brand-gold-light/40 p-3 rounded-lg border-l-4 border-brand-gold">
                      <span className="text-slate-500 block">Galeri Foto</span>
                      <strong className="text-base text-brand-gold-dark">{gallery.length} Dokumentasi</strong>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setAdminTab('news')}
                      className="w-full text-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-705 text-xs font-bold rounded-xl"
                    >
                      Kelola Kabar Berita CMS →
                    </button>
                  </div>
                </div>

              </div>
              
            </div>
          )}

          {/* TAB 2: MANAJEMEN PENDAFTAR (APPLICANT TRACKING) */}
          {adminTab === 'applicants' && (
            <div className="space-y-6" id="admin-subtab-applicants">
              
              {/* Header Kontrol Queue */}
              <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
                
                {/* Search */}
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Cari nama, sekolah, ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-brand-blue/30 outline-none"
                  />
                  <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-slate-400" />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-2 py-1 bg-white border rounded text-xs outline-none cursor-pointer font-medium"
                  >
                    <option value="Semua">Status: Semua</option>
                    <option value="Pending">Pending</option>
                    <option value="Diterima">Diterima</option>
                    <option value="Ditolak">Ditolak</option>
                    <option value="Revisi">Revisi</option>
                  </select>

                  <select
                    value={filterProgram}
                    onChange={(e) => setFilterProgram(e.target.value)}
                    className="px-2 py-1 bg-white border rounded text-xs outline-none cursor-pointer font-medium"
                  >
                    <option value="Semua">Program: Semua</option>
                    <option value="SMA">SMA</option>
                    <option value="Perguruan Tinggi">Perguruan Tinggi</option>
                  </select>
                </div>

              </div>

              {/* Urutan Queue Table */}
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden text-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-slate-200 uppercase text-[10px] font-bold tracking-widest border-b border-slate-950">
                        <th className="p-3">No. Registrasi</th>
                        <th className="p-3">Nama Lengkap</th>
                        <th className="p-3">Lembaga Pilihan</th>
                        <th className="p-3">Sekolah Asal</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y font-medium text-slate-700">
                      {filteredApplicants.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400 font-semibold">Tidap ada antrean pendaftar yang cocok.</td>
                        </tr>
                      ) : (
                        filteredApplicants.map((ap) => (
                          <tr key={ap.id} className="hover:bg-slate-50 max-h-min">
                            <td className="p-3 text-brand-blue font-bold">{ap.id}</td>
                            <td className="p-3">{ap.namaLengkap}</td>
                            <td className="p-3">
                              <span className="p-1 bg-slate-100 rounded text-[9px] uppercase font-bold">
                                {ap.programPilihan}
                              </span>
                            </td>
                            <td className="p-3 truncate max-w-[150px]">{ap.sekolahAsal}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                                ap.status === 'Diterima' ? 'bg-emerald-100 text-emerald-800' :
                                ap.status === 'Ditolak' ? 'bg-red-105 bg-red-100 text-red-800' :
                                ap.status === 'Revisi' ? 'bg-amber-100 text-amber-800' :
                                'bg-blue-100 text-slate-800'
                              }`}>
                                {ap.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => { setSelectedApplicant(ap); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                                className="px-3.5 py-1 bg-brand-blue hover:bg-slate-905 text-white hover:text-brand-gold font-bold text-[10px] rounded-lg cursor-pointer"
                              >
                                Tinjau Dokumen
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DETAILED EVALUATION DRAWER / VIEW */}
              {selectedApplicant && (
                <div className="bg-white rounded-2xl border-2 border-brand-blue/30 shadow-xl overflow-hidden animate-fade-in p-5 md:p-6 space-y-6" id="applicant-detail-workbench">
                  
                  {/* Visual Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b gap-3 shrink-0">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-none">Berkas Evaluasi Aktif</span>
                      <h4 className="text-base font-extrabold text-slate-900 font-display leading-tight">{selectedApplicant.namaLengkap} ({selectedApplicant.id})</h4>
                    </div>
                    <button 
                      onClick={() => setSelectedApplicant(null)}
                      className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-650 px-2.5 py-1 rounded-lg"
                    >
                      Tutup Peninjauan ×
                    </button>
                  </div>

                  {/* Biodata Lengkap Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    
                    <div className="space-y-2 p-4 bg-slate-50 border rounded-xl">
                      <h5 className="font-extrabold text-slate-900 border-b pb-1">BIODATA LENGKAP SISWA</h5>
                      <p><span className="text-slate-450 mr-2">Tempat, Tgl Lahir:</span> {selectedApplicant.tempatLahir}, {selectedApplicant.tanggalLahir}</p>
                      <p><span className="text-slate-450 mr-2">Jenis Kelamin:</span> {selectedApplicant.jenisKelamin}</p>
                      <p><span className="text-slate-450 mr-2">Asal Sekolah:</span> {selectedApplicant.sekolahAsal}</p>
                      <p><span className="text-slate-450 mr-2">HP Siswa / WA:</span> {selectedApplicant.nomorHpSiswa}</p>
                      <p className="line-clamp-2"><span className="text-slate-450 mr-2">Alamat Tinggal:</span> {selectedApplicant.alamat}</p>
                    </div>

                    <div className="space-y-2 p-4 bg-slate-50 border rounded-xl">
                      <h5 className="font-extrabold text-slate-900 border-b pb-1">BIODATA ORANG TUA / WALI</h5>
                      <p><span className="text-slate-450 mr-2">Nama Ayah / Ibu:</span> {selectedApplicant.namaAyah} / {selectedApplicant.namaIbu}</p>
                      <p><span className="text-slate-450 mr-2">Pekerjaan Utama:</span> {selectedApplicant.pekerjaanOrangTua}</p>
                      <p><span className="text-slate-450 mr-2">HP Orang Tua:</span> {selectedApplicant.nomorHpOrtu}</p>
                      <p><span className="text-slate-450 mr-2">Email Wali:</span> {selectedApplicant.emailOrtu}</p>
                      <p className="line-clamp-2"><span className="text-slate-450 mr-2">Alamat Tinggal:</span> {selectedApplicant.alamatOrtu}</p>
                    </div>

                    {/* Lampiran files */}
                    <div className="space-y-2 p-4 bg-slate-50 border rounded-xl md:col-span-2">
                       <h5 className="font-extrabold text-slate-900 border-b pb-1">UNGGAHAN LAMPIRAN DOKUMEN PINDAIAN (MOCK PROOFS)</h5>
                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] pt-1">
                         <div className="p-2 bg-white rounded-lg border text-center">
                           <span className="block text-slate-400 font-semibold uppercase text-[9px]">Akta Kelahiran</span>
                           <strong className="block text-slate-800 mt-1 truncate">{selectedApplicant.dokumen.aktaLahirName}</strong>
                         </div>
                         <div className="p-2 bg-white rounded-lg border text-center">
                           <span className="block text-slate-400 font-semibold uppercase text-[9px]">Kartu Keluarga</span>
                           <strong className="block text-slate-800 mt-1 truncate">{selectedApplicant.dokumen.kartuKeluargaName}</strong>
                         </div>
                         <div className="p-2 bg-white rounded-lg border text-center">
                           <span className="block text-slate-400 font-semibold uppercase text-[9px]">Nilai Rapor / SKL</span>
                           <strong className="block text-slate-800 mt-1 truncate">{selectedApplicant.dokumen.ijazahRaporName}</strong>
                         </div>
                         <div className="p-2 bg-white rounded-lg border text-center">
                           <span className="block text-slate-400 font-semibold uppercase text-[9px]">Pasfoto Peserta</span>
                           <strong className="block text-slate-800 mt-1 truncate font-medium">{selectedApplicant.dokumen.fotoSiswaName}</strong>
                         </div>
                       </div>
                       
                       {/* Wajah pasfoto preview jika diunggah */}
                       {selectedApplicant.dokumen.fotoSiswaData && (
                         <div className="pt-2 flex items-center gap-3">
                           <img 
                             src={selectedApplicant.dokumen.fotoSiswaData} 
                             alt="Pasfoto resmi" 
                             className="w-24 h-24 object-cover border-2 border-slate-200 rounded-lg shadow" 
                           />
                           <div>
                             <p className="font-bold text-slate-800 leading-none">Pasfoto Pendaftar Resmi</p>
                             <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Tercatat dalam basis data utama YPN</p>
                           </div>
                         </div>
                       )}
                    </div>

                  </div>

                  {/* KONTROL STATUS VERIFIKASI */}
                  <div className="border-t pt-5 space-y-4">
                    <h5 className="font-extrabold text-xs text-brand-blue uppercase tracking-widest leading-none">Kontrol Hasil Seleksi & Status:</h5>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Input Catatan status */}
                      <div className="space-y-1 text-xs">
                        <label className="font-bold text-slate-700 block">Tulis Catatan Verifikasi (Opsional - Tampil di Hasil Cek Status Siswa)</label>
                        <textarea
                          placeholder="Masukkan alasan atau ucapan selamat, misal: 'Rapor memenuhi kualifikasi kelas MIPA.'"
                          rows={2.5}
                          value={statusComment}
                          onChange={(e) => setStatusComment(e.target.value)}
                          className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-brand-blue/30 outline-none"
                        ></textarea>
                      </div>

                      {/* Buttons queue */}
                      <div className="flex flex-col justify-end space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => submitStatusUpdate('Diterima')}
                            className="py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-lg text-xs"
                          >
                            ✓ Terima (Lulus)
                          </button>
                          
                          <button
                            onClick={() => submitStatusUpdate('Revisi')}
                            className="py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-lg text-xs"
                          >
                            ⚠ Minta Revisi
                          </button>

                          <button
                            onClick={() => submitStatusUpdate('Ditolak')}
                            className="py-2.5 bg-red-500 hover:bg-red-650 text-white font-black rounded-lg text-xs"
                          >
                            × Tolak (Gugur)
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 text-center font-medium">Memilih salah satu status akan memperbaharui akses status siswa di menu Cek Status kelulusan secara real-time.</p>
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 3: CMS BERITA & PENGUMUMAN */}
          {adminTab === 'news' && (
            <div className="space-y-6" id="admin-subtab-news">
              
              {/* Form Tambah Berita Baru */}
              <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900 border-b pb-1.5 flex items-center gap-1.5 uppercase font-display">
                  <Plus className="w-4 h-4 text-brand-gold" />
                  Menerbitkan Artikel Berita / Pengumuman Baru
                </h3>

                <form onSubmit={handleAddNewNews} className="space-y-3.5 text-xs sm:text-sm" id="form-add-news">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-705">Judul Pengumuman Berita <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        placeholder="Masukkan judul kabar berita..."
                        value={newJudul}
                        onChange={(e) => setNewJudul(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-brand-blue/30"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="font-bold text-slate-705">Kategori Berita <span className="text-red-500">*</span></label>
                      <select
                        value={newKategori}
                        onChange={(e) => setNewKategori(e.target.value as Berita['kategori'])}
                        className="w-full px-3 py-2 border rounded-xl bg-white focus:ring-2 focus:ring-brand-blue/30 outline-none"
                      >
                        <option value="Pengumuman">Pengumuman</option>
                        <option value="Prestasi">Prestasi</option>
                        <option value="Kegiatan">Kegiatan</option>
                        <option value="Akademik">Akademik</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-705">Ringkasan Deskripsi Singkat <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Tulis ringkasan satu kalimat yang memukau..."
                      value={newRingkasan}
                      onChange={(e) => setNewRingkasan(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-brand-blue/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-705">Konten Berita Lengkap <span className="text-red-500">*</span></label>
                    <textarea
                      placeholder="Tuliskan jurnalisme berita lengkap secara rapi..."
                      rows={4}
                      value={newKonten}
                      onChange={(e) => setNewKonten(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-brand-blue/30"
                    ></textarea>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-705">URL Contoh Cover Gambar Berita</label>
                    <input
                      type="text"
                      value={newGambar}
                      onChange={(e) => setNewGambar(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-brand-blue/30 bg-slate-50 font-mono text-[10px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Terbitkan Berita Resmi
                  </button>
                </form>
              </div>

              {/* Tabel Managing Berita */}
              <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900 border-b pb-1.5 block">Katalog Inventori Berita Lama ({news.length} Berita)</h3>
                
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left font-medium text-slate-700">
                    <thead>
                      <tr className="border-b bg-slate-50 font-bold uppercase text-[10px] text-slate-500">
                        <th className="p-2">Judul Artikel</th>
                        <th className="p-2">Kategori</th>
                        <th className="p-2">Kunci Waktu</th>
                        <th className="p-2 text-right">Aksi Hapus</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {news.map((n) => (
                        <tr key={n.id} className="hover:bg-slate-50">
                          <td className="p-2 font-bold max-w-[200px] truncate">{n.judul}</td>
                          <td className="p-2">
                            <span className="p-1 bg-brand-blue-light text-brand-blue font-bold rounded text-[9px] uppercase">{n.kategori}</span>
                          </td>
                          <td className="p-2 text-slate-400">{n.tanggal}</td>
                          <td className="p-2 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Yakin mendelet rilis berita "${n.judul}"?`)) {
                                  onDeleteNews(n.id);
                                }
                              }}
                              className="text-red-500 hover:text-red-700 font-bold p-1 cursor-pointer inline-block"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CMS PROFIL YAYASAN */}
          {adminTab === 'profile' && (
            <div className="space-y-6" id="admin-subtab-profile">
              <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-5">
                <h3 className="font-extrabold text-sm text-slate-900 border-b pb-1.5 flex items-center gap-1.5 uppercase font-display">
                  <Settings className="w-4 h-4 text-brand-gold" />
                  Mengubah Informasi Profil Yayasan (Visi, Misi, Sejarah)
                </h3>

                <form onSubmit={handleSaveProfileCMS} className="space-y-4 text-xs sm:text-sm" id="form-edit-visi-misi">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-705">Visi Utama Yayasan</label>
                    <textarea
                      rows={2.5}
                      value={editVisi}
                      onChange={(e) => setEditVisi(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-brand-blue/30 text-justify"
                    ></textarea>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-705">Sejarah Pendirian & Lintasan Waktu Yayasan</label>
                    <textarea
                      rows={5}
                      value={editSejarah}
                      onChange={(e) => setEditSejarah(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-brand-blue/30 text-justify font-sans"
                    ></textarea>
                  </div>

                  <div className="space-y-3">
                    <label className="font-bold text-slate-705 block">Daftar Misi Yayasan saat ini:</label>
                    
                    <div className="space-y-2">
                      {misiList.map((misi, mIdx) => (
                        <div key={mIdx} className="flex gap-2 items-center">
                          <span className="w-6 h-6 rounded bg-brand-blue text-brand-gold font-bold flex items-center justify-center shrink-0">{mIdx + 1}</span>
                          <input
                            type="text"
                            value={misi}
                            onChange={(e) => {
                              const updated = [...misiList];
                              updated[mIdx] = e.target.value;
                              setMisiList(updated);
                            }}
                            className="flex-grow px-2 py-1.5 border rounded-lg text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = misiList.filter((_, idx) => idx !== mIdx);
                              setMisiList(updated);
                            }}
                            className="text-red-500 hover:text-red-700 shrink-0 cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Misi Form */}
                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Tuliskan butir misi baru..."
                        value={newMisiInput}
                        onChange={(e) => setNewMisiInput(e.target.value)}
                        className="flex-grow px-2 py-1 border rounded-lg text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!newMisiInput.trim()) return;
                          setMisiList([...misiList, newMisiInput.trim()]);
                          setNewMisiInput('');
                        }}
                        className="px-3 py-1 bg-brand-blue text-white rounded font-bold text-xs"
                      >
                        Tambah Misi
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow cursor-pointer transition-colors"
                  >
                    Simpan Semua Perubahan Profil
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 5: MANAGING GALERI */}
          {adminTab === 'gallery' && (
            <div className="space-y-6" id="admin-subtab-gallery">
              
              {/* Form Tambah Item Galeri */}
              <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900 border-b pb-1.5 flex items-center gap-1.5 uppercase font-display">
                  <Plus className="w-4 h-4 text-brand-gold" />
                  Mengunggah Media Dokumentasi Galeri Baru
                </h3>

                <form onSubmit={handleAddNewGallery} className="space-y-3.5 text-xs sm:text-sm" id="form-add-gallery">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-705">Judul Kegiatan / Fasilitas <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        placeholder="Contoh: Bazzar Kuliner Taruna Muda..."
                        value={newGalJudul}
                        onChange={(e) => setNewGalJudul(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-brand-blue/30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-705">Kategori Galeri <span className="text-red-500">*</span></label>
                      <select
                        value={newGalKategori}
                        onChange={(e) => setNewGalKategori(e.target.value as GaleriItem['kategori'])}
                        className="w-full px-3 py-2 border rounded-xl bg-white focus:ring-2 focus:ring-brand-blue/30 outline-none cursor-pointer"
                      >
                        <option value="SMA">SMA</option>
                        <option value="Perguruan Tinggi">Perguruan Tinggi</option>
                        <option value="Kegiatan">Kegiatan</option>
                        <option value="Fasilitas">Fasilitas</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-705">Tipe Media Berkas</label>
                      <div className="flex gap-4 pt-1.5 font-medium">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" checked={newGalTipe === 'foto'} onChange={() => setNewGalTipe('foto')} className="accent-brand-blue" />
                          <span>Foto</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" checked={newGalTipe === 'video'} onChange={() => setNewGalTipe('video')} className="accent-brand-blue" />
                          <span>Video</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-705">URL Contoh File Media</label>
                      <input
                        type="text"
                        value={newGalUrl}
                        onChange={(e) => setNewGalUrl(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-brand-blue/30 font-mono text-[10px]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Gabungkan ke Galeri Situs
                  </button>
                </form>
              </div>

              {/* Inventori Galeri lama */}
              <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900 border-b pb-1.5 block">Katalog Inventori Media ({gallery.length} Media)</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  {gallery.map((g) => (
                    <div key={g.id} className="p-3 bg-slate-50 border rounded-xl flex flex-col justify-between">
                      <div className="h-24 bg-slate-200 rounded-lg overflow-hidden relative">
                        <img src={g.url} alt={g.judul} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-brand-blue/90 text-brand-gold text-[8px] rounded font-black uppercase">
                          {g.kategori}
                        </span>
                      </div>
                      <div className="pt-2 text-center space-y-2">
                        <p className="font-extrabold text-[11px] text-slate-800 line-clamp-1 leading-normal">{g.judul}</p>
                        <button
                          onClick={() => {
                            if (confirm(`Yakin mendelet item galeri "${g.judul}"?`)) {
                              onDeleteGallery(g.id);
                            }
                          }}
                          className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 text-[10px] font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1 mx-auto"
                        >
                          <Trash2 className="w-3 h-3" /> Hapus Media
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
