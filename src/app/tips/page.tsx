'use client';

import { motion } from 'framer-motion';
import { Shield, Target, Navigation, Backpack, HeartPulse, Leaf, Droplets, MapPin, Footprints } from 'lucide-react';

const tipsData = [
  {
    icon: HeartPulse,
    title: 'Persiapan Fisik & Mental',
    desc: 'Lakukan olahraga rutin seperti lari atau berenang minimal 1 bulan sebelum pendakian. Pastikan tubuh dalam kondisi prima.',
    color: 'text-rose-500',
    bg: 'bg-rose-100',
  },
  {
    icon: Backpack,
    title: 'Peralatan & Logistik',
    desc: 'Bawa perlengkapan standar: tenda, sleeping bag, matras, jaket gunung, sepatu trekking, jas hujan, dan P3K.',
    color: 'text-amber-500',
    bg: 'bg-amber-100',
  },
  {
    icon: Droplets,
    title: 'Manajemen Air & Makanan',
    desc: 'Bawa air minimal 3 liter per hari/orang. Hitung kalori dari makanan yang mudah dimasak dan bergizi tinggi.',
    color: 'text-blue-500',
    bg: 'bg-blue-100',
  },
  {
    icon: Navigation,
    title: 'Navigasi & Orientasi',
    desc: 'Pelajari rute sebelum berangkat. Bawa peta cetak/GPX offline dan kompas sebagai cadangan jika GPS mati.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-100',
  },
  {
    icon: Shield,
    title: 'Keamanan (Safety First)',
    desc: 'Jangan pernah memaksakan diri muncak jika cuaca buruk (badai, petir). Keselamatan adalah prioritas utama.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-100',
  },
  {
    icon: Leaf,
    title: 'Etika Lingkungan',
    desc: 'Patuhi prinsip Leave No Trace. Bawa turun kembali semua sampahmu tanpa terkecuali.',
    color: 'text-teal-500',
    bg: 'bg-teal-100',
  },
];

export default function TipsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-50 z-10" />
          <div
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-amber-500/20 text-amber-300 text-sm font-bold backdrop-blur-md border border-amber-500/30 mb-6 uppercase tracking-wider">
              <Shield className="w-4 h-4" /> Panduan & Keselamatan
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Edukasi & Tips <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Pendakian</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Persiapkan dirimu sebaik mungkin sebelum mulai menjelajah. Pengetahuan adalah kunci keselamatan di alam bebas.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 md:-mt-24 relative z-30">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tipsData.map((tip, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: '-50px' }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tip.bg} ${tip.color}` }>
                <tip.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{tip.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {tip.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Packing List Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-br from-emerald-800 to-teal-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 text-emerald-200 text-sm font-bold backdrop-blur-md border border-white/20 mb-6 uppercase tracking-wider">
                <Target className="w-4 h-4" /> Checklist
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Barang Wajib Dibawa</h2>
              <p className="text-emerald-100/80 mb-8 leading-relaxed text-lg">
                Kehilangan satu barang penting dapat berakibat fatal. Pastikan checklist ini sudah terpenuhi sebelum memulai perjalananmu.
              </p>
              <div className="flex items-center gap-4 text-emerald-200 bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10 w-fit">
                <Footprints className="w-6 h-6" />
                <span className="font-semibold text-white">#SafetyFirst</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Sepatu Trekking", "Carrier/Keril 60L+", "Jas Hujan", "Sleeping Bag", "Headlamp & Baterai", 
                "Pakaian Ganti", "Jaket Gunung", "Obat Pribadi", "Alat Masak", "Logistik Makanan"
              ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <span className="font-medium">{item}</span>
                 </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
