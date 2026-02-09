import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Terminal, Linkedin } from 'lucide-react';
import { useBlog } from '../utils/blogContext';

const LandingPage = () => {
    const { posts, loading } = useBlog();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);

    // Initial load
    useEffect(() => {
        setFilteredPosts(posts);
    }, [posts]);

    // CLI Search Parser
    useEffect(() => {
        if (!searchQuery) {
            setFilteredPosts(posts);
            return;
        }

        let term = searchQuery.trim();

        // Handle 'grep' or 'find'
        if (term.startsWith('grep') || term.startsWith('find')) {
            // Remove the command (grep or find)
            term = term.replace(/^(grep|find)\s+/, '');
            
            // Remove common flags like -r, -i, -v (optional)
            term = term.replace(/^-[a-zA-Z0-9]+\s+/, '');
            
            // Remove directory path argument at the end, e.g., ./* or /var/log
            // We'll simplisticly look for the last 'word' if it looks like a path
            // But 'grep "foo" ./*' -> term is '"foo" ./*'
            // We want matched term. 
            
            // Let's try to extract quoted string content if present
            const quotedMatch = term.match(/^["'](.*?)["']/);
            if (quotedMatch) {
                term = quotedMatch[1];
            } else {
                // If no quotes, take the first word as term, assuming the rest might be path
                // e.g. grep malware ./* -> term = malware
                const parts = term.split(' ');
                term = parts[0];
            }
        }

        const searchLower = term.toLowerCase();

        const results = posts.filter(post => 
            post.title.toLowerCase().includes(searchLower) || 
            post.description.toLowerCase().includes(searchLower) ||
            post.category.toLowerCase().includes(searchLower)
        );

        setFilteredPosts(results);
    }, [searchQuery, posts]);

    // Determine what to display: filter results if searching, otherwise top 6
    const displayPosts = searchQuery ? filteredPosts : posts.slice(0, 6);

    return (
        <div className="flex flex-col items-center w-full">
            {/* Hero Section */}
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="relative overflow-hidden rounded-xl bg-slate-200 dark:bg-[#1a232d] border border-slate-300 dark:border-[#283239]">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-background-light dark:from-background-dark via-background-light/90 dark:via-background-dark/90 to-transparent"></div>
                        <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVISG1UK7GtuFeb5FkjRkvKRl3hLd1F2SoNAYqKA_NDr3rNfdPwLISe_a2LngRxVscQ-Y3qaBWhgqaLs8HYjdBRiTheahDc6Wz0kAuFVuEKg2XaYp7vr-tOL3_3hSdBvy2WPR5auXvrWb8dR9M4ow-id1GcC7purMEZo8RBH5gDP9v6Kr5BZB71hVVy9vjpTKNEIwHeDJ4xjMbIZi4_s96XWXBq2LjxhD9h0koAl5e7p1zeSeAs7F1MNU6phftfMdFNz1I2TRs7GM" 
                            alt="Server Room" 
                            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                        />
                    </div>
                    <div className="relative z-10 px-6 py-16 md:px-12 md:py-20 flex flex-col gap-6 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 border border-primary/20 w-fit">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-primary text-xs font-mono font-bold uppercase tracking-wider">System Online</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                            Malware Analysis <span className="text-primary">|</span> Digital Forensics <span className="text-primary">|</span> Threat Intel
                        </h1>
                        <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl font-light max-w-2xl border-l-2 border-primary/50 pl-4">
                            Documenting the bits and bytes of the unknown. Exploring obfuscated code, kernel structures, and APT campaigns.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <Link to="/archive" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(19,146,236,0.3)]">
                                <Terminal size={20} />
                                <span>View Latest Intel</span>
                            </Link>
                            <a href="https://www.linkedin.com/in/0xosama/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-200 dark:bg-[#283239] hover:bg-slate-300 dark:hover:bg-[#323e47] text-slate-900 dark:text-white px-6 py-3 rounded-lg font-bold transition-all border border-transparent hover:border-gray-400 dark:hover:border-gray-600">
                                <Linkedin size={20} />
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
                <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between border-b border-slate-200 dark:border-[#283239] pb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="text-primary">&gt;</span> Intelligence Feed
                        </h2>
                        <p className="text-slate-500 dark:text-gray-500 text-sm mt-1">Filter by keyword, malware family, or CVE.</p>
                    </div>
                    <div className="w-full md:w-auto flex-1 max-w-md">
                        <label className="group relative flex items-center w-full">
                            <span className="absolute left-4 text-slate-400 dark:text-gray-500 group-focus-within:text-primary transition-colors">
                                <Search size={20} />
                            </span>
                            <input 
                                type="text" 
                                placeholder="grep 'emotet' ./*" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white dark:bg-[#1a232d] border border-slate-300 dark:border-[#283239] text-slate-900 dark:text-white text-sm font-mono rounded-lg py-3 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:border-primary placeholder-slate-400 dark:placeholder-gray-600 transition-all outline-none"
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* Blog Post Grid */}
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
                {loading ? (
                    <div className="text-center py-20 text-slate-500 font-mono">Loading feeds...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayPosts.map(post => {
                            // Clean up Jekyll URL to get a routing ID
                            // remove /posts/ prefix and slashes
                            const routeId = post.id.replace(/\/$/, '').split('/').pop() || post.id;

                            return (
                                <PostCard 
                                    key={post.id}
                                    id={routeId}
                                    image={post.imageUrl}
                                    tag={post.category.toUpperCase()}
                                    date={post.date}
                                    readTime={post.readTime}
                                    title={post.title}
                                    desc={post.description}
                                />
                            );
                        })}
                    </div>
                )}
                
                {displayPosts.length === 0 && !loading && (
                    <div className="text-center py-20 text-slate-500 font-mono">No intelligence reports found.</div>
                )}
            </div>
        </div>
    );
};

interface PostCardProps {
    id: string;
    image?: string;
    tag: string;
    date: string;
    readTime?: string;
    title: string;
    desc: string;
}

const PostCard = ({ id, image, tag, date, readTime, title, desc }: PostCardProps) => (
    <article className="group flex flex-col bg-white dark:bg-[#1a232d] border border-slate-200 dark:border-[#283239] rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:shadow-[0_4px_20px_-10px_rgba(19,146,236,0.2)]">
        {image && (
            <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-2 py-1 bg-black/70 backdrop-blur-sm border border-primary/30 text-primary text-xs font-mono rounded">
                        {tag}
                    </span>
                </div>
            </div>
        )}
        <div className="p-6 flex flex-col flex-1">
            {!image && (
                 <div className="flex items-start justify-between mb-4">
                     <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-500 font-mono">
                         <Calendar size={14} />
                         <span>{date}</span>
                     </div>
                     <span className="px-2 py-1 bg-primary/10 border border-primary/30 text-primary text-xs font-mono rounded">{tag}</span>
                 </div>
            )}
            {image && (
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-500 mb-3 font-mono">
                    <Calendar size={14} />
                    <span>{date}</span>
                    <span className="text-slate-300 dark:text-gray-700">|</span>
                    <Clock size={14} />
                    <span>{readTime}</span>
                </div>
            )}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                {title}
            </h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                {desc}
            </p>
            <div className="mt-auto pt-4 border-t border-slate-200 dark:border-[#283239] flex justify-between items-center">
                <Link to={`/post/${id}`} className="text-sm font-bold text-slate-900 dark:text-white hover:text-primary transition-colors flex items-center gap-1">
                    Read Analysis <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    </article>
);

export default LandingPage;
