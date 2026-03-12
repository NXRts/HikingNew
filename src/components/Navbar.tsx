'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, Menu, X, Compass, Map, Info, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navLinks = [
    { name: 'Beranda', href: '/', icon: Compass },
    { name: 'Eksplor Gunung', href: '#mountains', icon: Mountain },
    { name: 'Peta Interaktif', href: '/map/merapi', icon: Map },
    { name: 'Tips & Info', href: '#', icon: Info },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
                scrolled 
                    ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' 
                    : 'bg-transparent py-5'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform">
                        <Mountain className="w-6 h-6" />
                    </div>
                    <span className={cn(
                        "font-bold text-xl tracking-tight transition-colors",
                        scrolled ? "text-slate-900" : "text-white"
                    )}>
                        Smart<span className="text-emerald-500">Hiking</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-all hover:text-emerald-500 flex items-center gap-2",
                                    scrolled ? "text-slate-600" : "text-slate-200",
                                    isActive && "text-emerald-500"
                                )}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* CTA / Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <button className={cn(
                        "px-5 py-2.5 rounded-full text-sm font-semibold transition-all",
                        scrolled 
                            ? "bg-slate-900 text-white hover:bg-slate-800" 
                            : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md"
                    )}>
                        Hubungi Kami
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={cn(
                        "md:hidden p-2 rounded-xl transition-colors",
                        scrolled ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 shadow-xl md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl text-slate-900 font-semibold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                                            <link.icon className="w-5 h-5" />
                                        </div>
                                        <span>{link.name}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-400" />
                                </Link>
                            ))}
                            <button className="w-full mt-4 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/10">
                                Mulai Petualangan
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
