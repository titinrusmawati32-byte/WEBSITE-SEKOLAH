/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DokumenUpload {
  aktaLahirName: string;
  kartuKeluargaName: string;
  ijazahRaporName: string;
  fotoSiswaName: string;
  // Kita simpan mock base64/data url untuk preview di Admin Panel jika diunggah
  fotoSiswaData?: string;
  aktaLahirData?: string;
}

export interface Pendaftar {
  id: string; // YPN-2026-X
  namaLengkap: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  sekolahAsal: string;
  nomorHpSiswa: string;
  
  // Data Orang Tua
  namaAyah: string;
  namaIbu: string;
  pekerjaanOrangTua: string;
  nomorHpOrtu: string;
  emailOrtu: string;
  alamatOrtu: string;

  // Pilihan Pendidikan
  programPilihan: 'SMA' | 'Perguruan Tinggi';
  jurusanPilihan: string;
  catatanTambahan?: string;

  // Dokumen
  dokumen: DokumenUpload;

  // Status Pendaftaran
  status: 'Pending' | 'Diterima' | 'Ditolak' | 'Revisi';
  catatanStatus?: string;
  tanggalDaftar: string;
}

export interface Berita {
  id: string;
  judul: string;
  kategori: 'Pengumuman' | 'Prestasi' | 'Kegiatan' | 'Akademik';
  konten: string;
  ringkasan: string;
  tanggal: string;
  gambar: string;
}

export interface GaleriItem {
  id: string;
  judul: string;
  kategori: 'SMA' | 'Perguruan Tinggi' | 'Kegiatan' | 'Fasilitas';
  url: string;
  tipe: 'foto' | 'video';
}

export interface AnggotaStruktur {
  nama: string;
  jabatan: string;
  foto: string;
}

export interface NilaiBudaya {
  judul: string;
  deskripsi: string;
  ikon: string;
}

export interface KurikulumItem {
  periode: string; // "Kelas X" / "Semester 1"
  matapelajaran: string[];
}

export interface ProgramPendidikan {
  id: 'sma' | 'pt';
  nama: string;
  singkatan: string;
  deskripsi: string;
  akreditasi: string;
  keunggulan: string[];
  fasilitas: string[];
  kurikulum: KurikulumItem[];
}

export interface ProfilYayasan {
  visi: string;
  misi: string[];
  sejarah: string;
  struktur: AnggotaStruktur[];
  nilai: NilaiBudaya[];
}

export type ActivePage = 
  | 'home' 
  | 'profil' 
  | 'program' 
  | 'berita' 
  | 'galeri' 
  | 'kontak' 
  | 'informasi-pendaftaran' 
  | 'pendaftaran-online' 
  | 'sukses' 
  | 'cek-status' 
  | 'admin-login' 
  | 'admin-dashboard';
