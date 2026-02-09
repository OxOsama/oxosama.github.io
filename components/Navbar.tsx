import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Sun, Moon, Menu, Search, X } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const isAboutPage = location.pathname === '/about';
    const [isDark, setIsDark] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <nav className="w-full border-b border-slate-200 dark:border-[#283239] bg-white/90 dark:bg-[#111518]/90 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="flex items-center justify-center size-8 rounded hover:opacity-80 transition-opacity">
                            <img src="/assets/images/site_data/logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">./0xOsama</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {!isAboutPage && (
                            <>
                                <Link to="/about" className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium">About</Link>
                                <Link to="/archive?category=Malware" className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium">Malware Analysis</Link>
                                <Link to="/archive?category=CTF" className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium">CTF Writeups</Link>
                                <Link to="/archive?category=Tutorials" className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium">Tutorials & Labs</Link>
                                <Link to="/archive?category=Tools" className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium">Tools & Dev</Link>
                                
                                <div className="h-4 w-px bg-slate-200 dark:bg-[#283239]"></div>
                            </>
                        )}

                        <button 
                            onClick={() => setIsDark(!isDark)}
                            className="flex items-center justify-center size-9 rounded-lg hover:bg-slate-100 dark:hover:bg-[#283239] text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button - Hide on About page as well since there are no links? User didn't specify but it makes sense */}
                    <div className="md:hidden flex items-center gap-4">
                        <button 
                            onClick={() => setIsDark(!isDark)}
                            className="text-slate-500 dark:text-gray-400"
                        >
                             {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        {!isAboutPage && (
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-slate-900 dark:text-gray-300 hover:text-primary"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && !isAboutPage && (
                <div className="md:hidden border-t border-slate-200 dark:border-[#283239] bg-white dark:bg-[#111518]">
                    <div className="px-4 py-4 space-y-4 flex flex-col">
                        <Link to="/about" className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium block">About</Link>
                        <Link to="/archive?category=Malware" className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium block">Malware Analysis</Link>
                        <Link to="/archive?category=CTF" className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium block">CTF Writeups</Link>
                        <Link to="/archive?category=Tutorials" className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium block">Tutorials & Labs</Link>
                        <Link to="/archive?category=Tools" className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium block">Tools & Dev</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
