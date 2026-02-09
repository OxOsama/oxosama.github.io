import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PostDetailPage from './pages/PostDetailPage';
import ArchivePage from './pages/ArchivePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MatrixBackground from './components/MatrixBackground';
import { Moon, Sun } from 'lucide-react';
import { BlogProvider } from './utils/blogContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  const isSidebarLayout = [].includes(location.pathname);
  const isErrorPage = location.pathname === '/404';
  const isNavbarLayout = !isSidebarLayout && !isErrorPage && !isAboutPage;

  if (isAboutPage) {
    return (
      <div className="flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300 relative">
        <MatrixBackground />
        <Navbar />
        <div className="flex flex-1 overflow-hidden relative z-10">
            <Sidebar />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
      </div>
    );
  }

  if (isSidebarLayout) {
    return (
      <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300 relative">
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto relative z-10">
           <div className="md:hidden flex items-center justify-between p-4 bg-surface-dark border-b border-border-dark sticky top-0 z-20">
              <h1 className="text-white font-bold">0xAnalyst</h1>
              <ThemeToggle />
          </div>
          {children}
        </main>
      </div>
    );
  }

  if (isNavbarLayout) {
    const isPostPage = location.pathname.startsWith('/post/');
    const isRootPage = location.pathname === '/';
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300 flex flex-col relative">
        {!isPostPage && !isRootPage && <MatrixBackground />}
        <Navbar />
        <main className="flex-grow flex flex-col w-full relative z-10">
          {children}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300">
      {children}
    </div>
  );
};

const ThemeToggle = () => {
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
        <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg text-slate-400 hover:text-primary transition-colors"
            title="Toggle Theme"
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};

const Footer = () => (
    <footer className="w-full border-t border-slate-200 dark:border-[#283239] bg-white dark:bg-[#0e151b] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                    <span className="text-primary font-mono">&gt;_</span>
                    ./0xOsama
                </div>
                <p className="text-slate-500 text-xs font-mono">
                    © 2026 Cybersecurity Research Blog. All rights reserved.
                </p>
            </div>
            <div className="flex gap-6 text-sm">
                <a href="https://www.linkedin.com/in/0xosama/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary transition-colors">LinkedIn</a>
                <a href="#" className="text-slate-500 hover:text-primary transition-colors">Back to top</a>
            </div>
        </div>
    </footer>
);

export default function App() {
  return (
    <BrowserRouter>
        <BlogProvider>
            <ScrollToTop />
            <LayoutWrapper>
                <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/post/*" element={<PostDetailPage />} />
                <Route path="/archive" element={<ArchivePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </LayoutWrapper>
        </BlogProvider>
    </BrowserRouter>
  );
}
