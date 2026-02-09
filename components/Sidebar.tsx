import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    Home, Info, FolderOpen, Rss, Terminal, 
    Twitter, Github, Linkedin, Flag, Wrench, Bug 
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;
    const linkClass = (path: string) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
        isActive(path) 
        ? 'bg-primary/10 border border-primary/20 text-slate-900 dark:text-white font-medium' 
        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
    }`;
    
    const iconClass = (path: string) => isActive(path) ? 'text-primary' : 'text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors';

    return (
        <aside className="hidden md:flex flex-col w-72 h-full bg-white dark:bg-surface-darker border-r border-slate-200 dark:border-slate-800 overflow-y-auto shrink-0 z-20">
            <div className="p-6 flex flex-col gap-6">
                {/* Profile */}
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                        <img 
                            src="/assets/images/site_data/avatar.jpg" 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Mahmoud Osama</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-mono">Security Engineer</p>
                    </div>
                </div>

                {/* Main Nav */}
                <nav className="flex flex-col gap-1">
                    <Link to="/" className={linkClass('/')}>
                        <Home size={20} className={iconClass('/')} />
                        <span className="text-sm font-medium">Home</span>
                    </Link>
                    <Link to="/about" className={linkClass('/about')}>
                        <Info size={20} className={iconClass('/about')} />
                        <span className="text-sm font-medium">About</span>
                    </Link>
                    <Link to="/archive" className={linkClass('/archive')}>
                        <Terminal size={20} className={iconClass('/archive')} />
                        <span className="text-sm font-medium">Archives</span>
                    </Link>

                </nav>

                <div className="h-px bg-slate-200 dark:bg-slate-800 w-full my-1"></div>

                {/* Categories */}
                <div className="flex flex-col gap-2">
                    <h3 className="px-3 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Categories</h3>
                    <nav className="flex flex-col gap-1">

                    <Link to="/archive?category=Malware" className={linkClass('/archive?category=Malware')}>
                        <Bug size={20} className={iconClass('/malware')} />
                        <span className="text-sm font-medium">Malware Analysis</span>
                    </Link>                                     
                    
                    <Link to="/archive?category=CTF" className={linkClass('/archive?category=CTF')}>
                        <Flag size={20} className={iconClass('/ctf')} />
                        <span className="text-sm font-medium">CTF Writeups</span>
                    </Link>

                    <Link to="/archive?category=Tutorials" className={linkClass('/archive?category=Tutorials')}>
                        <FolderOpen size={20} className={iconClass('/tutorials_labs')} />
                        <span className="text-sm font-medium">Tutorials & Labs</span>
                    </Link>

                    <Link to="/archive?category=Tools" className={linkClass('/archive?category=Tools')}>
                        <Wrench size={20} className={iconClass('/tools_dev')} />
                        <span className="text-sm font-medium">Tools & Dev</span>
                    </Link>
                    </nav>
                </div>
                
                <div className="h-px bg-slate-200 dark:bg-slate-800 w-full my-1"></div>
                
                <div className="mt-auto"></div>
                <div className="flex flex-col gap-1">
                    <h3 className="px-3 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                        Socials
                    </h3>

                    <a href="https://x.com/0xOs_ama" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass('/twitter')}>
                        <Twitter size={20} className={iconClass('/twitter')} />
                        <span className="text-sm font-medium">Twitter / X</span>
                    </a>

                    <a
                        href="https://github.com/oxOsama"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass('/github')}
                    >
                        <Github size={20} className={iconClass('/github')} />
                        <span className="text-sm font-medium">GitHub</span>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/0xosama/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass('/linkedin')}
                    >
                        <Linkedin size={20} className={iconClass('/linkedin')} />
                        <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                </div>

            </div>
        </aside>
    );
};

export default Sidebar;
