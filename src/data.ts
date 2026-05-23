/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProfilYayasan, ProgramPendidikan, Berita, GaleriItem, Pendaftar } from './types';

export const INITIAL_PROFIL_YAYASAN: ProfilYayasan = {
  visi: 'Membina anak-anak hebat yang ceria, kreatif, berbudi pekerti luhur, dan siap meraih mimpi dengan hati gembira!',
  misi: [
    'Menumbuhkan rasa ingin tahu anak melalui metode belajar dan bermain interaktif yang seru.',
    'Membiasakan karakter jujur, mandiri, saling peduli, dan cinta tanah air sejak usia dini.',
    'Mengembangkan bakat kreativitas anak melalui kelas robotik cilik, seni mewarnai, serta coding gembira.',
    'Menyediakan lingkungan belajar yang aman, bersih, penuh warna, dan nyaman bagi anak.',
    'Membangun kerja sama yang harmonis dan erat antara guru, anak-anak, dan orang tua hebat.'
  ],
  sejarah: `Sekolah Dasar Nusantara didirikan pada tahun 2015 oleh para guru kreatif dan praktisi pendidikan anak yang mendambakan ruang sekolah yang ramah anak, bebas stres, dan penuh inspirasi. Mengawali kiprahnya dengan membuka kelas bermain dan belajar yang interaktif, dalam waktu singkat sekolah ini diakui secara nasional sebagai Sekolah Model Pembelajaran Kreatif Berbasis Karakter.

Merespons antusiasme orang tua hebat yang luar biasa, SD Nusantara terus memperbarui fasilitas bermain interaktif, laboratorium komputer cilik, serta studio seni lukis. Hingga tahun 2026 ini, kami telah menemani ribuan anak hebat mengasah talenta terbaik mereka di bidang sains cilik, dongeng, tari tradisional, hingga pemrograman game sederhana. Kami percaya bahwa setiap anak adalah bintang yang siap bersinar!`,
  struktur: [
    {
      nama: 'Kak Hermawan Kartajaya, M.Sc.',
      jabatan: 'Ketua Dewan Pembina Pramuka Ceria',
      foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      nama: 'Bunda Sekar Arum, M.B.A.',
      jabatan: 'Kepala Sekolah SD Nusantara',
      foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      nama: 'Kak Ahmad Fauzi, M.Ed.',
      jabatan: 'Kepala Pelatih Robotik & Sains Ceria',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      nama: 'Ibu Guru Rini Wulandari, M.Kom.',
      jabatan: 'Koordinator Lab Coding & Game Cilik',
      foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200'
    }
  ],
  nilai: [
    {
      judul: 'Ceria (Joyful)',
      deskripsi: 'Belajar dengan senyuman dan hati gembira di dalam kelas penuh warna yang interaktif.',
      ikon: 'Smile'
    },
    {
      judul: 'Kreatif (Creative)',
      deskripsi: 'Membuat karya seni menakjubkan, prakarya unik, dan tantangan sains kecil yang seru!',
      ikon: 'Palette'
    },
    {
      judul: 'Jujur (Honest)',
      deskripsi: 'Menanamkan kejujuran berbicara, sportif saat bermain, dan selalu rukun sesama teman.',
      ikon: 'ShieldCheck'
    },
    {
      judul: 'Peduli (Caring)',
      deskripsi: 'Saling menyayangi, senang berbagi mainan, membantu teman, serta merawat hewan dan tanaman.',
      ikon: 'Heart'
    }
  ]
};

export const INITIAL_PROGRAMS: ProgramPendidikan[] = [
  {
    id: 'sma',
    nama: 'SD Nusantara - Kelas Rendah (Kelas 1 - 3)',
    singkatan: 'Kelas Rendah (1-3)',
    deskripsi: 'Pondasi pendidikan dasar terbaik yang dikemas asyik dengan fokus pada Membaca, Menulis, Berhitung (Calistung) Kreatif, pembiasaan karakter baik, serta pengenalan sains lewat praktik sederhana.',
    akreditasi: 'A (Unggul) - Sekolah Ramah Anak',
    keunggulan: [
      'Metode Belajar Sambil Bermainan (Game-Based Learning)',
      'Aktivitas bercerita / dongeng inspiratif setiap pagi hari',
      'Pengenalan logika matematika dasar memakai balok warna-warni',
      'Kelas bahasa Inggris interaktif dengan nyanyian gembira',
      'Pemberian Bintang Prestasi harian bagi keaktifan siswa'
    ],
    fasilitas: [
      'Gedung Kelas Ber-AC yang dipenuhi gambar mural lucu',
      'Taman Bermain Anak (Indoor & Outdoor Playground) yang aman',
      'Ruang kreativitas Lego, Clay, dan Puzzle Pintar',
      'Perpustakaan Dongeng Nusantara dengan ribuan buku bergambar',
      'Kolam renang mini ramah anak dengan pelatih berpengalaman'
    ],
    kurikulum: [
      {
        periode: 'Kelas 1 (Fase A - Kelas Awal)',
        matapelajaran: [
          'Agama Menyenangkan & Budi Pekerti',
          'Pancasila Cilik (Mengenal Lambang & Budaya)',
          'Bahasa Indonesia (Membaca Seru & Bercerita)',
          'Matematika Kreatif (Berhitung Bintang & Balok)',
          'Sains Sederhana (Mengenal Hewan & Tumbuhan)',
          'Bahasa Inggris Gembira (Song & Fun Activities)',
          'Seni Rupa Mewarnai & Prakarya Clay'
        ]
      },
      {
        periode: 'Kelas 2 & 3 (Fase A - Kelas Eksplorasi)',
        matapelajaran: [
          'Bahasa Indonesia Menengah (Menulis Kreatif)',
          'Matematika Logika (Penjumlahan & Perkalian Seru)',
          'IPAS Cilik (Eksperimen Air, Udara, dan Tanah)',
          'Dasar Coding Cilik (Bermain Puzzle Logika Komputer)',
          'Seni Musik Ceria (Piano Mainan & Menyanyi Bersama)',
          'Pendidikan Jasmani (Senam Ceria & Menangkap Bola)',
          'Keterampilan Kerjasama Kelompok Cilik'
        ]
      }
    ]
  },
  {
    id: 'pt',
    nama: 'SD Nusantara - Kelas Tinggi (Kelas 4 - 6)',
    singkatan: 'Kelas Tinggi (4-6)',
    deskripsi: 'Pengembangan nalar kritis dan kemandirian bagi siswa kelas atas. Memadukan literasi digital yang aman, dasar robotik cerdas, sains-sosial interaktif, serta bimbingan kelulusan yang menyenangkan tanpa membuat stres.',
    akreditasi: 'A (Unggul) - Sekolah Digital Mandiri',
    keunggulan: [
      'Membuat game komputasi cilik menggunakan Scratch Coding',
      'Kelas Robotik Cerdas tingkat pemula (merakit lego sensor)',
      'Metode hitung cepat matematika gembira dan asyik',
      'Studi Ekspedisi Sains Cilik ke museum sains dan planetarium',
      'Bimbingan belajar siap masuk SMP Favorit dengan metode interaktif'
    ],
    fasilitas: [
      'Laboratorium Komputer & Studio Animasi khusus anak',
      'Studio Seni Menggambar & Melukis Kanvas serta Alat Musik Lengkap',
      'Lapangan futsal mini, bulutangkis, dan tenis meja ramah anak',
      'Laboratorium IPA Cilik dengan alat eksperimen terlatih aman',
      'UKS Sehat Ramah Anak yang bermitra dengan tim Dokter Cilik'
    ],
    kurikulum: [
      {
        periode: 'Kelas 4 & 5 (Fase B/C - Kelas Analitis)',
        matapelajaran: [
          'Agama & Pendidikan Karakter Kepemimpinan',
          'Bahasa Indonesia (Pidato Cilik & Resensi Buku Dongeng)',
          'Matematika Menengah (Pecahan & Bangun Ruang Gembira)',
          'Sains Terapan Eksperimen (Siklus Air & Kelistrikan Sederhana)',
          'Ilmu Pengetahuan Sosial Nusantara (Peta & Sejarah Raja Cilik)',
          'Informatika Scratch (Membuat Game Petualangan Sendiri)',
          'Bahasa Inggris Aktif (Drama Cilik & Conversation Club)'
        ]
      },
      {
        periode: 'Kelas 6 (Fase C - Kelas Prestasi & Kelulusan)',
        matapelajaran: [
          'Pemantapan Ujian Kelulusan dengan Metode Seru',
          'Riset Ilmu Detektif Sains Cilik (Karya Kreatif)',
          'Robotik Tingkat Lanjut (Navigasi Labirin Sederhana)',
          'Kewirausahaan Cilik (Market Day Sekolah)',
          'Bahasa Inggris Percakapan Umum (Bilingual Project)',
          'Seni Teater Drama & Paduan Suara Bencana Budaya'
        ]
      }
    ]
  }
];

export const INITIAL_NEWS: Berita[] = [
  {
    id: 'n-1',
    judul: 'Ayo Daftar Sekolah! Penerimaan Siswa Baru SD Nusantara Resmi Dibuka',
    kategori: 'Pengumuman',
    ringkasan: 'SD Nusantara membuka gerbang pendaftaran siswa baru untuk calon anak hebat dengan diskon mainan edukatif dan beasiswa SPP hingga gratis!',
    konten: `Sekolah Dasar Nusantara secara resmi membuka Penerimaan Peserta Didik Baru (PPDB) untuk Tahun Ajaran 2026/2027. Bersiaplah menyambut pengalaman sekolah yang paling seru di Indonesia!

Pendaftaran Gelombang Ceria ini dibuka mulai tanggal 1 Mei hingga 15 Juli 2026. Guna mendukung potensi luar biasa anak-anak Indonesia, kami menghadirkan "Beasiswa Bintang Cilik" berupa potongan biaya SPP hingga gratis bagi anak-anak yang memiliki prestasi menggambar, menyanyi, mengaji, olahraga cilik, maupun beasiswa afirmasi kemanusiaan.

"Tahun ini, kami menghadirkan kurikulum berbasis game edukasi terintegrasi. Calon siswa baru tidak perlu tegang menghadapi ujian masuk, karena tes seleksi kami bermodelkan observasi bermain dan wawancara ramah anak," pungkas Bunda Sekar Arum selaku Kepala Sekolah. Daftarkan putra-putri hebat Anda sekarang sebelum kuota kelas yang terbatas ini terisi penuh!`,
    tanggal: 'Mei 12, 2026',
    gambar: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'n-2',
    judul: 'Hebat! Tim Robotik Cilik SD Nusantara Sabet Medali Emas Internasional',
    kategori: 'Prestasi',
    ringkasan: 'Tim robotik cilik binaan ekstrakurikuler SD Nusantara mengalahkan puluhan sekolah luar negeri pada ajang Kompetisi Robot Kreatif Cilik Hamburg, Jerman.',
    konten: `Prestasi luar biasa yang menggemaskan lahir di Hamburg, Jerman! Tim Robotik Cilik SD Nusantara yang beranggotakan Muhammad Rakha (Kelas 3) dan Nabila Az-Zahra (Kelas 3) berhasil meraih Medali Emas kategori Robot Penolong Alam pada ajang World Robot Olympiad Kids 2025.

Mereka berdua menciptakan "Sawah-Bot Mini", sebuah robot mungil dari balok lego yang dilengkapi sensor pendeteksi tanaman layu. Sawah-Bot mampu berjalan di sela-sela pot tanaman hias, menyiram air secara otomatis, serta mengeluarkan suara lonceng lucu jika tangki airnya hampir habis.

"Adik-adik kita membuat programnya sendiri di komputer khusus anak dengan memasangkan blok instruksi warna-warni. Keberanian mereka berpresentasi di depan juri internasional benar-benar patut diajungi jempol!" ujar Kak Ahmad Fauzi selaku pelatih utama sains.`,
    tanggal: 'Mei 18, 2026',
    gambar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'n-3',
    judul: 'Keseruan Eksperimen Sains Ceria: Membuat Gunung Berapi Buatan yang Meletup-letup!',
    kategori: 'Kegiatan',
    ringkasan: 'Anak-anak kelas 2 mencoba praktik seru mencampurkan baking soda, pewarna merah makanan, dan cuka untuk menciptakan miniatur magma gunung berapi.',
    konten: `Laughter and fun filled the garden of SD Nusantara! Hari ini, anak-anak kelas 2 belajar sains alam dengan metode "Eksperimen Detektif Cilik". Mereka bersama-sama membuat miniatur gunung merah menggunakan tanah liat, lalu memasukkan campuran baking soda dan pewarna merah cerah.

Saat Ibu Guru menuangkan cairan cuka ajaib, "BHOOM!" busa merah langsung menyembur keluar layaknya lava gunung merapi yang meletus dengan aman. Anak-anak bersorak gembira menyaksikan reaksi kimia sederhana yang menakjubkan ini.

"Sains tidak harus rumit dan membosankan. Melalui eksperimen visual seperti ini, anak-anak langsung mengingat konsep asam-basa dan kegunungapian dengan senyuman lebar," terang Ibu Guru Rini.`,
    tanggal: 'Mei 21, 2026',
    gambar: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'n-4',
    judul: 'Parade Kostum Karakter Dongeng Meriahkan Hari Anak di Sekolah',
    kategori: 'Kegiatan',
    ringkasan: 'Seluruh murid dan guru mengenakan kostum rubah cerdik, astronot antariksa, putri dongeng, hingga pahlawan super lokal untuk membangkitkan imajinasi cilik.',
    konten: `SD Nusantara berubah menjadi negeri dongeng yang ajaib! Dalam rangka memeriahkan Hari Anak Nusantara, sekolah menggelar parade kostum bertajuk "Bebas Berimajinasi, Berani Bercerita".

Mulai dari pagi hari, lobi sekolah dipadati astronot cilik membawa helm dari kardus berkilau, peri bersayap kertas krep, harimau ramah, hingga kancil bijak. Acara dilanjutkan dengan pertunjukan dongeng multimedia interaktif oleh Bunda Sekar Arum, bazzar jajanan es krim buah buatan sendiri, serta pembagian hadiah krayon gambar 24 warna untuk semua anak.

"Kegiatan ini bermaksud memicu rasa percaya diri anak-anak tampil di depan umum, meluapkan imajinasi kreatif mereka secara sehat, serta mempererat tali persahabatan antar jenjang kelas," jelas Panitia Fest Budaya.`,
    tanggal: 'Mei 23, 2026',
    gambar: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600'
  }
];

export const INITIAL_GALLERY: GaleriItem[] = [
  {
    id: 'g-1',
    judul: 'Kemah Pramuka Cilik Ceria di Halaman Sekolah',
    kategori: 'SMA', // mapped as Kelas Rendah
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    tipe: 'foto'
  },
  {
    id: 'g-2',
    judul: 'Eksperimen Mencampur Warna Ajaib Memakai Larutan Alami',
    kategori: 'Fasilitas',
    url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    tipe: 'foto'
  },
  {
    id: 'g-3',
    judul: 'Juara Turnamen Lego Kreatif Antar Kelas Bawah',
    kategori: 'Perguruan Tinggi', // mapped as Kelas Tinggi
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    tipe: 'foto'
  },
  {
    id: 'g-4',
    judul: 'Pentas Seni Paduan Suara & Musik Angklung Cilik',
    kategori: 'Perguruan Tinggi', // mapped as Kelas Tinggi
    url: 'https://images.unsplash.com/photo-1531058020387-3be344559be6?auto=format&fit=crop&q=80&w=800',
    tipe: 'foto'
  },
  {
    id: 'g-5',
    judul: 'Pertandingan Bola Gawang Mini di Lapangan Hijau Sekolah',
    kategori: 'Kegiatan',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
    tipe: 'foto'
  },
  {
    id: 'g-6',
    judul: 'Sudut Baca Mewah nan Nyaman di Perpustakaan Buku Dongeng',
    kategori: 'Fasilitas',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    tipe: 'foto'
  }
];

export const INITIAL_APPLICANTS: Pendaftar[] = [
  {
    id: 'YPN-2026-001',
    namaLengkap: 'Rian Hidayatullah',
    jenisKelamin: 'Laki-laki',
    tempatLahir: 'Jakarta',
    tanggalLahir: '2019-04-12',
    alamat: 'Jl. Merdeka Baru No. 45, Kebayoran Baru, Jakarta Selatan',
    sekolahAsal: 'TK Mentari Pagi Jakarta',
    nomorHpSiswa: '081234567890',
    namaAyah: 'Budi Hidayatullah',
    namaIbu: 'Siti Rahma',
    pekerjaanOrangTua: 'Wiraswasta',
    nomorHpOrtu: '081234567891',
    emailOrtu: 'budi.hidayat@gmail.com',
    alamatOrtu: 'Jl. Merdeka Baru No. 45, Kebayoran Baru, Jakarta Selatan',
    programPilihan: 'SMA', // internal SMA is Class 1-3
    jurusanPilihan: 'SD Cilik (Kelas 1 - 3)',
    catatanTambahan: 'Rian senang menggambar dan bisa menyusun lego dengan cepat.',
    dokumen: {
      aktaLahirName: 'akta_rian.pdf',
      kartuKeluargaName: 'kk_rian.pdf',
      ijazahRaporName: 'rapor_tk_rian.pdf',
      fotoSiswaName: 'rian_pasfoto.png',
      fotoSiswaData: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150'
    },
    status: 'Diterima',
    catatanStatus: 'Selamat! Berkas terverifikasi lengkap. Selamat bergabung menjadi agen petualang cerdas SD Nusantara!',
    tanggalDaftar: '2026-05-15'
  },
  {
    id: 'YPN-2026-002',
    namaLengkap: 'Anissa Putri Syahrini',
    jenisKelamin: 'Perempuan',
    tempatLahir: 'Bandung',
    tanggalLahir: '2017-08-22',
    alamat: 'Apartemen Gateway Cicadas Lantai 7 No. A-12, Bandung',
    sekolahAsal: 'TK Bina Lestari Bandung',
    nomorHpSiswa: '085712345678',
    namaAyah: 'Wawan Hermawan',
    namaIbu: 'Dewi Sartika',
    pekerjaanOrangTua: 'IT Operator',
    nomorHpOrtu: '085712345679',
    emailOrtu: 'dewi.sartika@yahoo.com',
    alamatOrtu: 'Apartemen Gateway Cicadas Lantai 7 No. A-12, Bandung',
    programPilihan: 'Perguruan Tinggi', // internal PT is Class 4-6
    jurusanPilihan: 'SD Hebat (Kelas 4 - 6)',
    catatanTambahan: 'Anissa pandai berbicara bahasa Inggris dasar dan berani tampil drama.',
    dokumen: {
      aktaLahirName: 'akta-anissa.pdf',
      kartuKeluargaName: 'fam-card-anissa.pdf',
      ijazahRaporName: 'rapor-tk-anissa.pdf',
      fotoSiswaName: 'anissa-profile.jpg',
      fotoSiswaData: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
    },
    status: 'Pending',
    tanggalDaftar: '2026-05-20'
  }
];
