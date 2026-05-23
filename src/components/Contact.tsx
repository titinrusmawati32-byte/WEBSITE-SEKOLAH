/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, HelpCircle, CheckCircle, Send, 
  MessageSquare, Users, Globe2, Building2 
} from 'lucide-react';

export default function Contact() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [subjek, setSubjek] = useState('');
  const [pesan, setPesan] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // FAQ list untuk memperkaya halaman Kontak
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    {
      q: 'Bagaimana cara mendaftar beasiswa 100% di YPN?',
      a: 'Calon pendaftar dapat mendaftar melalui formulir Multi-Step dengan memilih opsi Program Peminatan, kemudian mengunggah dokumen bukti prestasi (rata-rata rapor >85 atau sertifikat juara lomba minimal tingkat kabupaten/kota).'
    },
    {
      q: 'Apakah pendaftaran offline masih dilayani?',
      a: 'Kami sangat menyarankan pendaftaran secara online melalui portal resmi ini. Namun jika terkendala jaringan, Sekretariat Utama kami melayani penyerahan berkas fisik di Kampus Raya Nusantara setiap Senin s.d Sabtu pukul 08.00–15.00 WIB.'
    },
    {
      q: 'Bagaimana sistem seleksi masuk SMA Nusantara?',
      a: 'Sistem penyeleksian meliputi evaluasi berkas portofolio prestasi, verifikasi rapor, serta Tes Potensi Akademik (TPA) & wawancara kepribadian jarak jauh (daring).'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !email || !subjek || !pesan) {
      alert('Mohon melengkapi seluruh kolom isian!');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setNama('');
      setEmail('');
      setSubjek('');
      setPesan('');
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-16" id="contact-page-root">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-medium text-white py-12 md:py-16 text-center shadow-lg border-b-2 border-brand-gold">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Hubungi Kami</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display">
            Hub, Alamat & Formulir Kontak
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Menghubungkan Anda langsung ke Sekretaris Utama Yayasan Pendidikan Nusantara, Tim Penerimaan Baru, atau Humas Lembaga kami.
          </p>
        </div>
      </section>

      {/* Main Grid: Alamat Details & Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Kolom Kiri: Detil Kontak & Alamat Fisik */}
        <div className="lg:col-span-5 space-y-6" id="contact-info-panel">
          
          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-5">
            <h2 className="font-extrabold text-base text-brand-blue border-b pb-2 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-brand-gold" />
              Sekretariat Pusat YPN
            </h2>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Kampus Raya Nusantara, Jl. Pendidikan Kebangsaan No. 101, Kuningan Timur, Setiabudi, Jakarta Selatan, 12950
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <span>+62 (21) 829-1025 / 829-1026</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <span className="break-all font-medium text-slate-800">info@yayasan-nusantara.sch.id</span>
              </li>
              <li className="flex items-center space-x-3">
                <Globe2 className="w-5 h-5 text-brand-gold shrink-0" />
                <span>www.yayasan-nusantara.sch.id</span>
              </li>
            </ul>
          </div>

          {/* Sub Call Center Section */}
          <div className="bg-brand-blue-light p-5 rounded-2xl border border-blue-100 space-y-3">
            <span className="text-[10px] font-extrabold uppercase bg-brand-gold/20 text-brand-gold-dark px-2.5 py-1 rounded inline-block">
              Layanan Hotline PPDB
            </span>
            <p className="text-xs text-slate-600 leading-relaxed text-left">
              Kesulitan mengunggah akta lahir atau ijazah sekolah asal? Tim IT Helpdesk kami siap memandu via chat instan.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <button 
                onClick={() => alert('Menghubungkan panggilan langsung ke WhatsApp Admisi: +62 812-3456-7890')} 
                className="px-4 py-2 bg-brand-blue hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
              >
                Call Center Admisi
              </button>
              <span className="text-xs text-slate-400 font-medium">Senin-Sabtu (08:00-17:00)</span>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <HelpCircle className="w-4 h-4 text-brand-gold" /> Pertanyaan Sering Diajukan
            </h3>
            <div className="space-y-2.5">
              {faqs.map((faq, fIdx) => (
                <div key={fIdx} className="border-b last:border-0 pb-2.5 last:pb-0">
                  <button
                    onClick={() => setFaqOpenIndex(faqOpenIndex === fIdx ? null : fIdx)}
                    className="w-full text-left text-xs font-bold text-slate-850 hover:text-brand-blue-medium py-1 flex items-center justify-between"
                  >
                    <span>{faq.q}</span>
                    <span className="text-brand-gold font-black">{faqOpenIndex === fIdx ? '−' : '+'}</span>
                  </button>
                  {faqOpenIndex === fIdx && (
                    <p className="text-xs text-slate-500 leading-relaxed pt-1.5 transition-all text-justify">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Kolom Kanan: Interactive Form & Google Maps */}
        <div className="lg:col-span-7 space-y-6" id="contact-form-map-panel">
          
          <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm space-y-5">
            <h3 className="font-extrabold text-base text-brand-blue flex items-center gap-2 font-display">
              <MessageSquare className="w-5 h-5 text-brand-gold" />
              Sampaikan Aspirasi atau Pertanyaan Anda
            </h3>

            {submitSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm rounded-xl text-center font-medium leading-relaxed">
                Pesan aspirasi Anda telah terkirim kepada perwakilan Yayasan Nusantara. <br />
                Kami akan segera memberikan respon komprehensif melalui email Anda. Terima kasih!
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4" id="form-full-kontak">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Nama Lengkap Anda</label>
                    <input
                      type="text"
                      placeholder="Masukkan nama Anda..."
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-brand-blue/30 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Alamat Email Aktif</label>
                    <input
                      type="email"
                      placeholder="contoh: budi@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-brand-blue/30 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Topik Subjek</label>
                  <input
                    type="text"
                    placeholder="Contoh: Pertanyaan Syarat Beasiswa S1..."
                    value={subjek}
                    onChange={(e) => setSubjek(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-brand-blue/30 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Isi Pesan/Komentar</label>
                  <textarea
                    placeholder="Tuliskan detail pertanyaan atau masukan Anda di sini..."
                    rows={4}
                    value={pesan}
                    onChange={(e) => setPesan(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-brand-blue/30 outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-brand-blue hover:bg-slate-900 border-b-2 border-slate-705 text-white hover:text-brand-gold font-bold text-xs rounded-xl transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sedang Mengirim...' : 'Kirim Formulir'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Google Maps Embed Simulation */}
          <div className="bg-slate-100 rounded-2xl overflow-hidden border relative flex flex-col justify-between shadow-sm min-h-[280px]">
            <div className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-lg text-xs font-extrabold text-slate-800 flex items-center gap-1.5 shadow z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              Peta Lokasi Satelit Koordinat Kampus YPN
            </div>

            {/* Simulated Satelite Map representation split by roads */}
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center p-4">
              <div className="w-full h-full relative overflow-hidden bg-slate-50 opacity-90">
                <div className="absolute inset-x-0 top-1/3 h-10 bg-white border-y border-slate-200 shadow-inner"></div>
                <div className="absolute inset-y-0 right-1/3 w-12 bg-white border-x border-slate-200 shadow-inner transform -rotate-45"></div>
                
                {/* Visual landmark indicators */}
                <div className="absolute bottom-6 left-6 w-32 h-16 bg-emerald-100/60 rounded-xl border border-emerald-200 flex items-center justify-center text-[10px] text-emerald-800 font-bold uppercase">
                  Sektor RTH Kebagusan
                </div>
                <div className="absolute top-[40%] right-[40%] text-center">
                  <div className="bg-red-500 text-white p-2 rounded-full inline-block shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                    <span className="font-display font-black leading-none text-xs">YPN</span>
                  </div>
                  <div className="bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap">
                    Kampus Raya Nusantara
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white px-4 py-3 border-t w-full absolute bottom-0 z-10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
              <span>Gunakan Angkutan Umum: Turun Halte TransJakarta Halte Departemen Kesehatan Kuningan.</span>
              <button 
                onClick={() => alert('Membuka simulasi rute arah satelit koordinat...')} 
                className="px-3 py-1 bg-slate-900 text-white rounded font-bold hover:bg-brand-blue"
              >
                Rute Penuh
              </button>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
