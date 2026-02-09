import React, { useState, useRef, useEffect } from 'react';
import { Code, History, Verified, Shield, School, Bug, Book} from 'lucide-react';

const AboutPage = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<{cmd: string, output: string}[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);

    const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const cmd = input.trim();
            if (cmd) {
                setHistory(prev => [...prev, { 
                    cmd, 
                    output: `bash: ${cmd.split(' ')[0]}: permission denied` 
                }]);
            } else {
                 setHistory(prev => [...prev, { cmd: '', output: '' }]);
            }
            setInput('');
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div className="flex-1 h-full overflow-y-auto bg-background-light dark:bg-background-dark relative">
            <div className="max-w-5xl mx-auto px-6 py-10 md:py-16 flex flex-col gap-12">
                {/* Page Header */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                        <span className="text-primary">&gt;</span> About Me<span className="animate-pulse">_</span>
                    </h2>
                    <p className="text-slate-600 dark:text-text-muted text-lg max-w-2xl">
                        Malware Analyst, Blue Teamer and CTF Player. I break things to learn how to build them securely.
                    </p>
                </div>

                {/* Terminal Bio Window */}
                <section className="rounded-xl overflow-hidden bg-white dark:bg-surface-dark border border-slate-300 dark:border-border-dark shadow-2xl shadow-slate-300 dark:shadow-black/50">
                    {/* Terminal Header */}
                    <div className="bg-slate-100 dark:bg-[#21262d] px-4 py-3 flex items-center justify-between border-b border-slate-300 dark:border-border-dark">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-text-muted font-mono">0xOsama@portfolio: ~/bio</div>
                        <div className="w-14"></div>
                    </div>
                    {/* Terminal Content */}
                    <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed overflow-x-auto bg-[#0d1117] text-white">
                        <div className="mb-4">
                            <span className="text-[#27c93f]">0xOsama@portfolio</span>:<span className="text-primary">~</span>$ ./whoami.sh
                        </div>
                        <div className="grid gap-2 text-text-main">
                            <div>
                                <span className="text-primary font-bold">Name:</span>
                                <span className="text-[#a5d6ff]"> 'Mahmoud Osama'</span>
                            </div>
                            <div>
                                <span className="text-primary font-bold">Role:</span>
                                <span className="text-[#a5d6ff]"> 'Security Engineer'</span>
                            </div>
                            <div>
                                <span className="text-primary font-bold">Location:</span>
                                <span className="text-[#a5d6ff]"> 'Egypt'</span>
                            </div>
                            <div>
                                <span className="text-primary font-bold">Status:</span>
                                <span className="text-[#7ee787]"> "Hunting threats..."</span>
                            </div>
                            <div className="mt-4">
                                <span className="text-text-muted">// Current Objectives</span><br/>
                                <span className="text-[#d2a8ff]">def</span> <span className="text-[#79c0ff]">main</span>():<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;analyze_malware(<span className="text-[#a5d6ff]">"Ransomware.L0ck8y7e"</span>)<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;reverse_engineer(<span className="text-[#a5d6ff]">"Unknown_Binary.exe"</span>)<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ff7b72]">return</span> <span className="text-[#79c0ff]">write_report</span>()
                            </div>
                        </div>

                        {/* Interactive History */}
                        {history.map((entry, i) => (
                            <div key={i} className="mb-2">
                                <div className="flex gap-2 items-center">
                                    <div className="flex items-center gap-1 shrink-0">
                                        <span className="text-[#27c93f]">user@portfolio</span>:<span className="text-primary">~</span>$ 
                                    </div>
                                    <span className="text-white">{entry.cmd}</span>
                                </div>
                                {entry.output && <div className="text-red-400">{entry.output}</div>}
                            </div>
                        ))}

                        <div className="mt-4 flex items-center gap-1">
                            <span className="text-[#27c93f]">user@portfolio</span>:<span className="text-primary">~</span>$ 
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleCommand}
                                className="bg-transparent border-none outline-none text-white font-mono flex-1 caret-primary w-full"
                                autoFocus
                            />
                        </div>
                        <div ref={bottomRef} />
                    </div>
                </section>

                {/* Technical Skills Grid */}
                <section>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <Code className="text-primary" /> Technical Arsenal
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <SkillBadge name="Python" color="#60009c" />
                        <SkillBadge name="C++" color="#60009c" />
                        <SkillBadge name="Assembly (x86/x64)" color="#60009c" />
                        <SkillBadge name="IDA PRO" color="#f34b7d" />
                        <SkillBadge name="Ghidra" color="#f34b7d" />
                        <SkillBadge name="x86dbg" color="#f34b7d" />
                        <SkillBadge name="Bash Scripting" color="#27c93f" />
                        <SkillBadge name="Volatility" color="#27c93f" />
                        <SkillBadge name="Autopsy" color="#27c93f" />
                        <SkillBadge name="Microsoft Defender" color="#00599c" />
                        <SkillBadge name="Elasticsearch" color="#00599c" />
                        <SkillBadge name="SentinelOne" color="#00599c" />
                        <SkillBadge name="Wireshark" color="#00599c" />
                        
                    </div>
                </section>

                {/* Grid Layout for Certs & Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Experience Timeline */}
                    <section>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <History className="text-primary" /> System Logs
                        </h3>
                        <div className="relative pl-4 border-l border-slate-300 dark:border-border-dark space-y-8">
                            <TimelineItem 
                                year="2026 - PRESENT"
                                role="Security Engineer"
                                company="Horus University"
                                description="conducting in-depth malware analysis, developed detection signatures, and contributed to threat intelligence reports that enhanced the university's cybersecurity defenses."
                            />
                            <TimelineItem 
                                year="2025 - 2026"
                                role="Security Intern"
                                company="Horus University"
                                description="Training on how to perform in-depth malware analysis, developed detection signatures, and contributed to threat intelligence reports that enhanced the university's cybersecurity defenses."
                            />
                            <TimelineItem 
                                year="2024 - 2025"
                                role="Threat Intelligence Engineer"
                                company="Volunteering"
                                description="Provided actionable threat intelligence to people by analyzing emerging malware trends, creating detailed reports, and advising on proactive defense strategies."
                            />
                            <TimelineItem 
                                year="2022 - 2024"
                                role="Malware Analyst"
                                company="Volunteering"
                                description="Analyzed various malware samples for public, created detailed reports, and provided actionable intelligence to improve their security posture."
                            />
                        </div>
                    </section>

                    

                    <section>
                        {/* Books */}
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Book className="text-primary" /> Books
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <CertCard 
                                year="2026 - NOW" 
                                title="SANS SEC 560" 
                                desc="SANS Technology Institute"
                                icon={<School size={20} className="text-[#f34b7d]" />}
                            />
                            <CertCard 
                                year="2025" 
                                title="SANS SEC 401" 
                                desc="SANS Technology Institute"
                                icon={<School size={20} className="text-[#27c93f]" />}
                            />
                            <CertCard 
                                year="2024" 
                                title="Practical Malware Analysis" 
                                desc="Michael Sikorski and Andrew Honig"
                                icon={<Shield size={20} className="text-[#d2a8ff]" />}
                            />
                            <CertCard 
                                year="2024" 
                                title="learning malware analysis" 
                                desc="Monnappa K A"
                                icon={<Verified size={20} className="text-[#79c0ff]" />}
                            />
                        </div>

                        <br></br>
                        {/* Certifications */}
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Verified className="text-primary" /> Credentials
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <CertCard 
                                year="2025" 
                                title="CyberOps Associate" 
                                desc="Cisco Network Academy"
                                icon={<Shield size={20} className="text-[#d2a8ff]" />}
                            />
                            <CertCard 
                                year="2023" 
                                title="Arch1001: x86-64 Assembly" 
                                desc="OpenSecurityTraining2"
                                icon={<Verified size={20} className="text-[#79c0ff]" />}
                            />
                            <CertCard 
                                year="2023" 
                                title="Reverse Code Engineering" 
                                desc="MaharaTech | ITI"
                                icon={<Bug size={20} className="text-[#27c93f]" />}
                            />
                            <CertCard 
                                year="2023" 
                                title="CompTIA N+" 
                                desc="Network+ CE Certification"
                                icon={<School size={20} className="text-[#f34b7d]" />}
                            />

                        
                        </div>
                    </section>

                </div>

                <div className="mt-8 border-t border-slate-300 dark:border-border-dark pt-8 flex justify-center pb-8">
                    <p className="font-mono text-xs text-slate-500 dark:text-text-muted">
                        <span className="text-primary">root@server</span>: <span className="text-slate-900 dark:text-white">crafted by</span> -&gt; 0xOsama
                    </p>
                </div>
            </div>
        </div>
    );
};

const SkillBadge = ({ name, color }: { name: string, color: string }) => (
    <div className="flex items-center gap-2 px-4 py-2 rounded bg-white dark:bg-surface-dark border border-slate-300 dark:border-border-dark hover:border-primary/50 transition-colors">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
        <span className="text-sm font-medium text-slate-700 dark:text-white">{name}</span>
    </div>
);

const TimelineItem = ({ year, role, company, description, current }: { year: string, role: string, company: string, description: string, current?: boolean }) => (
    <div className="relative pl-6 group">
        <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-white dark:bg-surface-dark border-2 ${current ? 'border-primary bg-primary' : 'border-slate-400 dark:border-border-dark group-hover:border-primary'} transition-colors`}></div>
        <div className="flex flex-col gap-1">
            <span className={`text-xs font-mono font-bold ${current ? 'text-primary' : 'text-slate-500 dark:text-text-muted'}`}>{year}</span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-text-main">{role}</h4>
            <p className="text-sm text-slate-500 dark:text-text-muted">{company}</p>
            <p className="text-sm text-slate-600 dark:text-text-muted mt-2 leading-relaxed">{description}</p>
        </div>
    </div>
);

const CertCard = ({ year, title, desc, icon }: { year: string, title: string, desc: string, icon: React.ReactNode }) => (
    <div className="group bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-300 dark:border-border-dark hover:border-primary/50 transition-all hover:bg-slate-50 dark:hover:bg-[#1c2128]">
        <div className="flex items-start justify-between mb-4">
            <div className="bg-slate-100 dark:bg-[#1f242c] p-2 rounded-lg">
                {icon}
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-text-muted">{year}</span>
        </div>
        <h4 className="text-slate-900 dark:text-white font-bold mb-1 group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-text-muted">{desc}</p>
    </div>
);

export default AboutPage;