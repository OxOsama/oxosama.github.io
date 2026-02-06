import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { useBlog } from '../utils/blogContext';
import { Link, useSearchParams } from 'react-router-dom';

const ArchivePage = () => {
    const { posts, loading } = useBlog();
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    
    const [searchTerm, setSearchTerm] = useState('');

    // Update search term when URL category changes
    useEffect(() => {
        if (categoryParam) {
            setSearchTerm(categoryParam);
        }
    }, [categoryParam]);

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-12 lg:p-16">
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                {/* Breadcrumb & Header */}
                <div className="flex flex-col gap-4">
                    <nav className="flex items-center text-sm text-slate-500 font-medium">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="text-primary">Archives</span>
                    </nav>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Intelligence Archive</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
                            Deep dives into x86 disassembly, ransomware payloads, unpacked binaries, and threat intelligence reports.
                        </p>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="w-full">
                    <label className="relative block group">
                        <span className="sr-only">Search posts</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-slate-500 group-focus-within:text-primary transition-colors">
                            <Search size={20} />
                        </span>
                        <input 
                            className="placeholder:text-slate-500 dark:placeholder:text-slate-600 block w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg py-3 pl-12 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white sm:text-sm font-mono transition-all" 
                            name="search" 
                            placeholder="Search by keyword, CVE, or hash..." 
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </label>
                </div>

                {/* Archive Table */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark overflow-hidden shadow-xl shadow-black/5">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-surface-darker border-b border-slate-200 dark:border-slate-800">
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 w-48">Date</th>
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500">Post Title</th>
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 w-64 text-right md:text-left">Tags</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {loading && (
                                    <tr><td colSpan={3} className="p-6 text-center text-slate-500">Loading...</td></tr>
                                )}
                                {filteredPosts.map(post => {
                                     // Route ID extraction
                                     const routeId = post.id.replace(/\/$/, '').split('/').pop() || post.id;
                                     return (
                                        <TableRow 
                                            key={post.id}
                                            id={routeId}
                                            date={post.date}
                                            title={post.title}
                                            tags={post.tags}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TableRow = ({ id, date, title, tags }: { id: string, date: string, title: string, tags: string[] }) => (
    <tr className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer">
        <td className="py-4 px-6 text-slate-500 dark:text-slate-400 font-mono text-sm whitespace-nowrap">
            {date}
        </td>
        <td className="py-4 px-6">
            <Link to={`/post/${id}`} className="text-slate-900 dark:text-white font-medium text-lg group-hover:text-primary transition-colors block">
                {title}
            </Link>
        </td>
        <td className="py-4 px-6 hidden md:table-cell">
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20">
                        {tag}
                    </span>
                ))}
            </div>
        </td>
    </tr>
);

export default ArchivePage;
