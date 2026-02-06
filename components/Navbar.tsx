import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Sun, Moon, Menu, Search } from 'lucide-react';

const Navbar = () => {
    const [isDark, setIsDark] = useState(true);

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
                        <div className="flex items-center justify-center size-8 rounded bg-primary/10 dark:bg-primary/20 text-primary">
                            <Terminal size={20} />
                        </div>
                        <span className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">./0xAnalyst</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/about" className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium">About</Link>
                        <Link to="/archive" className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium">Labs</Link>
                        <a href="#" className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium">RSS</a>
                        
                        <div className="h-4 w-px bg-slate-200 dark:bg-[#283239]"></div>

                        <button 
                            onClick={() => setIsDark(!isDark)}
                            className="flex items-center justify-center size-9 rounded-lg hover:bg-slate-100 dark:hover:bg-[#283239] text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button 
                            onClick={() => setIsDark(!isDark)}
                            className="text-slate-500 dark:text-gray-400"
                        >
                             {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="text-slate-900 dark:text-gray-300 hover:text-primary">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
