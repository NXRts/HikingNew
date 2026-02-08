'use client';

import Link from 'next/link';
import { mountains } from '@/lib/data';
import { MapPin, TrendingUp, Compass, Map as MapIcon, Mountain, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen pb-20 bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-50 z-10" />
          <div
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center animate-ken-burns transform scale-105"
            style={{ animation: 'pulse 20s infinite alternate' }} // Simple slow zoom effect
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium backdrop-blur-sm border border-emerald-500/30 mb-6">
              Explore Information
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Smart Hiking <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Companion
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Temukan jalur pendakian terbaik, pantau cuaca real-time, dan nikmati petualangan aman dengan peta interaktif.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="#mountains" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2 group">
                Mulai Petualangan
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-semibold backdrop-blur-md transition-all">
                Pelajari Fitur
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: MapIcon, title: 'Peta Interaktif', desc: 'Visualisasi jalur GPX presisi dengan topografi detail.' },
            { icon: Compass, title: 'GPS Tracking', desc: 'Pantau lokasi real-time agar tidak tersesat di jalur.' },
            { icon: Mountain, title: 'Info Lengkap', desc: 'Data elevasi, cuaca, dan tingkat kesulitan gunung.' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mountains List Section */}
      <div id="mountains" className="py-10 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Destinasi Populer</h2>
            <p className="text-slate-500">Pilihan gunung favorit para pendaki bulan ini.</p>
          </div>
          <Link href="#" className="hidden md:flex text-emerald-600 font-semibold items-center gap-1 hover:gap-2 transition-all">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mountains.map((mountain, idx) => (
            <Link href={`/mountain/${mountain.id}`} key={mountain.id} className="block group">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ${mountain.id === 'merapi' ? "bg-[url('https://images.unsplash.com/photo-1605649487215-476786814631?q=80&w=2070')]" :
                      mountain.id === 'merbabu' ? "bg-[url('https://images.unsplash.com/photo-1594928172960-e883a9687985?q=80&w=2673')]" :
                        "bg-[url('https://images.unsplash.com/photo-1549615555-53bb3b2462bc?q=80&w=2070')]"
                    }`} />
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md ${mountain.difficulty === 'Easy' ? 'bg-green-500/90 text-white' :
                        mountain.difficulty === 'Moderate' ? 'bg-yellow-500/90 text-white' :
                          'bg-red-500/90 text-white'
                      }`}>
                      {mountain.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {mountain.name}
                    </h2>
                  </div>

                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1">
                    {mountain.description}
                  </p>

                  <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span>{mountain.elevation} mdpl</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span>Jawa Tengah</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
