/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import Programs from './components/Programs';
import NewsPortal from './components/NewsPortal';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import RegistrationInfo from './components/RegistrationInfo';
import RegistrationFlow from './components/RegistrationFlow';
import RegistrationStatus from './components/RegistrationStatus';
import AdminPanel from './components/AdminPanel';

import { ActivePage, Pendaftar, Berita, GaleriItem, ProfilYayasan, ProgramPendidikan } from './types';
import { 
  INITIAL_PROFIL_YAYASAN, 
  INITIAL_PROGRAMS, 
  INITIAL_NEWS, 
  INITIAL_GALLERY, 
  INITIAL_APPLICANTS 
} from './data';

import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { collection, doc, getDocs, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  // -------------------------------------------------------------
  // STATE MANAGEMENT WITH LOCAL PERSISTENCE & FIRESTORE SYNC
  // -------------------------------------------------------------
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedNews, setSelectedNews] = useState<Berita | null>(null);
  const [recentId, setRecentId] = useState<string | null>(null);

  // 1. Data Pendaftar
  const [applicants, setApplicants] = useState<Pendaftar[]>(() => {
    const cached = localStorage.getItem('ypn_applicants');
    return cached ? JSON.parse(cached) : INITIAL_APPLICANTS;
  });

  // 2. Data Berita CMS
  const [news, setNews] = useState<Berita[]>(() => {
    const cached = localStorage.getItem('ypn_news');
    return cached ? JSON.parse(cached) : INITIAL_NEWS;
  });

  // 3. Data Galeri CMS
  const [gallery, setGallery] = useState<GaleriItem[]>(() => {
    const cached = localStorage.getItem('ypn_gallery');
    return cached ? JSON.parse(cached) : INITIAL_GALLERY;
  });

  // 4. Data Profil Yayasan CMS
  const [profile, setProfile] = useState<ProfilYayasan>(() => {
    const cached = localStorage.getItem('ypn_profile');
    return cached ? JSON.parse(cached) : INITIAL_PROFIL_YAYASAN;
  });

  // 5. Data Program Pendidikan
  const [programs, setPrograms] = useState<ProgramPendidikan[]>(INITIAL_PROGRAMS);

  // 6. Security login status pengurus
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('ypn_admin_loggedin') === 'true';
  });

  // Sinkronisasi ke Storage setiap kali terjadi mutasi state
  useEffect(() => {
    localStorage.setItem('ypn_applicants', JSON.stringify(applicants));
  }, [applicants]);

  useEffect(() => {
    localStorage.setItem('ypn_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('ypn_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('ypn_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('ypn_admin_loggedin', String(adminLoggedIn));
  }, [adminLoggedIn]);

  // Scroll to top on page switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // -------------------------------------------------------------
  // FIRESTORE SYNC & DATA SEEDING
  // -------------------------------------------------------------
  useEffect(() => {
    async function loadPublicData() {
      // 1. Load News
      try {
        const newsSnap = await getDocs(collection(db, 'news'));
        if (newsSnap.empty) {
          // Sync & Seed
          for (const item of INITIAL_NEWS) {
            await setDoc(doc(db, 'news', item.id), item);
          }
          setNews(INITIAL_NEWS);
        } else {
          const loadedNews: Berita[] = [];
          newsSnap.forEach((docSnap) => {
            loadedNews.push(docSnap.data() as Berita);
          });
          setNews(loadedNews);
        }
      } catch (err) {
        console.warn("Using cached news:", err);
      }

      // 2. Load Gallery
      try {
        const gallerySnap = await getDocs(collection(db, 'gallery'));
        if (gallerySnap.empty) {
          // Sync & Seed
          for (const item of INITIAL_GALLERY) {
            await setDoc(doc(db, 'gallery', item.id), item);
          }
          setGallery(INITIAL_GALLERY);
        } else {
          const loadedGallery: GaleriItem[] = [];
          gallerySnap.forEach((docSnap) => {
            loadedGallery.push(docSnap.data() as GaleriItem);
          });
          setGallery(loadedGallery);
        }
      } catch (err) {
        console.warn("Using cached gallery:", err);
      }

      // 3. Load Profile
      try {
        const profileDoc = await getDoc(doc(db, 'profile', 'yayasan'));
        if (!profileDoc.exists()) {
          // Sync & Seed
          await setDoc(doc(db, 'profile', 'yayasan'), INITIAL_PROFIL_YAYASAN);
          setProfile(INITIAL_PROFIL_YAYASAN);
        } else {
          setProfile(profileDoc.data() as ProfilYayasan);
        }
      } catch (err) {
        console.warn("Using cached profile:", err);
      }
    }

    loadPublicData();
  }, []);

  // Listen to Auth State for admin listing
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const applicantsSnap = await getDocs(collection(db, 'applicants'));
          const loadedApplicants: Pendaftar[] = [];
          applicantsSnap.forEach((docSnap) => {
            loadedApplicants.push(docSnap.data() as Pendaftar);
          });
          setApplicants(loadedApplicants);
          setAdminLoggedIn(true);
        } catch (err) {
          console.warn("Could not list applicants from Firestore:", err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // -------------------------------------------------------------
  // BUSINESS LOGIC & CALLBACKS
  // -------------------------------------------------------------

  // Callback unduh brosur PDF simulasi
  const handleDownloadBrochure = (program: 'sma' | 'pt') => {
    const label = program === 'sma' ? 'SMA Nusantara' : 'Universitas Nusantara';
    alert(`[UNDUH BERHASIL]\n\nMenyiapkan file unduhan...\nBrosur Resmi PPDB/PMB ${label} tahun akademik 2026/2027 berhasil diunduh dalam bentuk file PDF.`);
  };

  // Submit pendaftar baru dari Multi-Step Form
  const handleRegisterSubmit = async (applicantData: Omit<Pendaftar, 'id' | 'status' | 'tanggalDaftar'>) => {
    // Generate unique ID: YPN-2026-X
    const lastIdNum = applicants.reduce((acc, current) => {
      const parts = current.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > acc ? num : acc;
    }, 0);
    
    const nextIdNum = lastIdNum + 1;
    const generatedId = `YPN-2026-${String(nextIdNum).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    // Buat objek pendaftar baru
    const newApplicant: Pendaftar = {
      ...applicantData,
      id: generatedId,
      status: 'Pending',
      tanggalDaftar: today,
    };

    // Save to Firestore!
    try {
      await setDoc(doc(db, 'applicants', generatedId), newApplicant);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `applicants/${generatedId}`);
    }

    // Push ke state & set rujukan
    setApplicants([newApplicant, ...applicants]);
    setRecentId(generatedId);
    
    // Alihkan ke halaman SUKSES
    setActivePage('sukses');
  };

  // Update status verifikasi pendaftar oleh Admin
  const handleUpdateApplicantStatus = async (id: string, status: Pendaftar['status'], catatan?: string) => {
    const updated = applicants.map((a) => {
      if (a.id === id) {
        const item: Pendaftar = {
          ...a,
          status,
          catatanStatus: catatan || a.catatanStatus,
        };
        // Update in Firestore
        setDoc(doc(db, 'applicants', id), item).catch(err => {
          handleFirestoreError(err, OperationType.UPDATE, `applicants/${id}`);
        });
        return item;
      }
      return a;
    });
    setApplicants(updated);
  };

  // Tambah Berita Baru (CMS)
  const handleAddNews = async (newBerita: Omit<Berita, 'id'>) => {
    const newId = `n-${news.length + 1}`;
    const item: Berita = {
      ...newBerita,
      id: newId,
    };
    try {
      await setDoc(doc(db, 'news', newId), item);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `news/${newId}`);
    }
    setNews([item, ...news]);
  };

  // Hapus Berita (CMS)
  const handleDeleteNews = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'news', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `news/${id}`);
    }
    setNews(news.filter((n) => n.id !== id));
  };

  // Tambah Media Galeri (CMS)
  const handleAddGallery = async (newGalItem: Omit<GaleriItem, 'id'>) => {
    const newId = `g-${gallery.length + 1}`;
    const item: GaleriItem = {
      ...newGalItem,
      id: newId,
    };
    try {
      await setDoc(doc(db, 'gallery', newId), item);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `gallery/${newId}`);
    }
    setGallery([item, ...gallery]);
  };

  // Hapus Media Galeri (CMS)
  const handleDeleteGallery = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `gallery/${id}`);
    }
    setGallery(gallery.filter((g) => g.id !== id));
  };

  // Update Profil Yayasan (CMS)
  const handleUpdateProfile = async (updatedProfile: ProfilYayasan) => {
    try {
      await setDoc(doc(db, 'profile', 'yayasan'), updatedProfile);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'profile/yayasan');
    }
    setProfile(updatedProfile);
  };

  // Update Programs list
  const handleUpdatePrograms = (updatedPrograms: ProgramPendidikan[]) => {
    setPrograms(updatedPrograms);
  };

  // -------------------------------------------------------------
  // LAYOUT INTERFACES
  // -------------------------------------------------------------
  const renderActiveScreen = () => {
    switch (activePage) {
      case 'home':
        return (
          <Homepage 
            news={news}
            gallery={gallery}
            profile={profile}
            setActivePage={setActivePage}
            setSelectedNews={setSelectedNews}
            onDownloadBrochure={handleDownloadBrochure}
          />
        );
      case 'profil':
        return <Profile profile={profile} setActivePage={setActivePage} />;
      case 'program':
        return <Programs programs={programs} setActivePage={setActivePage} />;
      case 'berita':
        return (
          <NewsPortal 
            news={news} 
            selectedNews={selectedNews} 
            setSelectedNews={setSelectedNews} 
          />
        );
      case 'galeri':
        return <Gallery gallery={gallery} />;
      case 'kontak':
        return <Contact />;
      case 'informasi-pendaftaran':
        return <RegistrationInfo setActivePage={setActivePage} />;
      case 'pendaftaran-online':
        return (
          <RegistrationFlow 
            onRegisterSubmit={handleRegisterSubmit} 
            setActivePage={setActivePage} 
          />
        );
      case 'sukses':
      case 'cek-status':
        return (
          <RegistrationStatus 
            applicants={applicants}
            recentId={recentId}
            activePage={activePage}
            setActivePage={setActivePage}
            onClearRecentId={() => setRecentId(null)}
          />
        );
      case 'admin-login':
      case 'admin-dashboard':
        return (
          <AdminPanel 
            applicants={applicants}
            onUpdateApplicantStatus={handleUpdateApplicantStatus}
            news={news}
            onAddNews={handleAddNews}
            onDeleteNews={handleDeleteNews}
            gallery={gallery}
            onAddGallery={handleAddGallery}
            onDeleteGallery={handleDeleteGallery}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            programs={programs}
            onUpdatePrograms={handleUpdatePrograms}
            adminLoggedIn={adminLoggedIn}
            onLoginAdmin={() => {
              setAdminLoggedIn(true);
              setActivePage('admin-dashboard');
            }}
          />
        );
      default:
        return (
          <div className="text-center py-20 bg-white border max-w-sm mx-auto rounded-3xl p-5 shadow space-y-3">
             <div className="text-3xl font-extrabold text-brand-blue">404</div>
             <p className="text-sm font-medium text-slate-500">Halaman tidak ditemukan.</p>
             <button onClick={() => setActivePage('home')} className="px-5 py-2 bg-brand-blue text-white rounded-lg">Kembali ke Beranda</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between" id="app-viewport">
      
      {/* 1. STICKY BRAND HEADER */}
      <Header 
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          // Reset pembacaan artikel jika pindah halaman
          if (page !== 'berita') setSelectedNews(null);
        }}
        adminLoggedIn={adminLoggedIn}
        onLogoutAdmin={() => {
          setAdminLoggedIn(false);
          setActivePage('home');
        }}
      />

      {/* 2. DYNAMIC WORK BENCH DISPLAY VIEW */}
      <main className="flex-grow">
        {renderActiveScreen()}
      </main>

      {/* 3. COHESIVE FOOTER PANEL */}
      <Footer 
        setActivePage={(page) => {
          setActivePage(page);
          if (page !== 'berita') setSelectedNews(null);
        }} 
        onDownloadBrochure={handleDownloadBrochure} 
      />

    </div>
  );
}
