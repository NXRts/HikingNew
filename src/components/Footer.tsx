import Link from 'next/link';
import { Mountain, Instagram, Twitter, Facebook, Mail, MapPin, Phone, Github } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/40">
                                <Mountain className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">
                                Smart<span className="text-emerald-500">Hiking</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed">
                            Panduan pendakian pintar di genggaman Anda. Temukan jalur terbaik, pantau cuaca, dan nikmati petualangan aman dengan teknologi terkini.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Facebook, Github].map((Icon, idx) => (
                                <Link
                                    key={idx}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all border border-slate-700 hover:border-emerald-600"
                                >
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Navigasi Cepat</h4>
                        <ul className="space-y-4">
                            {['Beranda', 'Daftar Gunung', 'Peta Interaktif', 'Blog & Artikel', 'Tentang Kami'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-emerald-400 transition-colors" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Kontak Kami</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span>Jakarta, Indonesia</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span>+62 812 3456 7890</span>
                            </li>
                            <li className="flex gap-3">
                                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span>halo@smarthiking.id</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Dapatkan Update</h4>
                        <p className="text-sm text-slate-400 mb-4">Berlangganan newsletter untuk info jalur pendakian terbaru.</p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Email Anda"
                                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                            />
                            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20">
                                Berlangganan
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© {currentYear} Smart Hiking Companion. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-emerald-500">Privacy Policy</Link>
                        <Link href="#" className="hover:text-emerald-500">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
