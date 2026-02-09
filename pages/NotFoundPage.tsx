import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Terminal, FolderOpen, ArrowLeft, Bug, History } from 'lucide-react';

const NotFoundPage = () => {
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
        <div className="min-h-screen flex flex-col relative bg-background-light dark:bg-[#0d1117] text-slate-900 dark:text-[#c9d1d9] transition-colors duration-300 overflow-x-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 z-10 w-full">
                <div className="flex flex-col max-w-[800px] w-full gap-8">
                {/* Error Title Section */}
                <div className="flex flex-col gap-2 items-start animate-pulse-fast">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white glitch-text mb-2" data-text="ERROR 404">ERROR 404</h1>
                    <p className="text-red-500 dark:text-red-400 font-mono text-base md:text-lg flex items-center gap-2">
                        <AlertCircle size={20} />
                        PAGE_FAULT_IN_NONPAGED_AREA
                    </p>
                    <p className="text-slate-600 dark:text-[#8b949e] text-sm md:text-base font-normal max-w-lg">
                         The requested resource could not be located in the current memory segment. System execution halted to prevent data corruption.
                    </p>
                </div>

                {/* Terminal Window */}
                <div className="w-full rounded-lg overflow-hidden border border-[#30363d] bg-[#161b22] shadow-2xl shadow-black/50 ring-1 ring-white/5">
                    {/* Terminal Header */}
                    <div className="bg-[#21262d] px-4 py-2 flex items-center justify-between border-b border-[#30363d] select-none">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <div className="text-xs text-[#8b949e] font-mono flex items-center gap-1">
                            <FolderOpen size={14} />
                            bash — 80x24
                        </div>
                        <div className="w-14"></div> 
                    </div>
                    {/* Terminal Body */}
                    <div className="p-6 font-mono text-sm md:text-base leading-relaxed overflow-x-auto">
                        <div className="flex flex-col gap-1 text-[#c9d1d9]">
                            <div className="flex gap-2">
                                <span className="text-green-400 font-bold">root@malware-lab:~#</span>
                                <span className="text-white">./load_page.sh --target="requested_url"</span>
                            </div>
                            <div className="text-[#8b949e] mt-2">[+] Initiating handshake...</div>
                            <div className="text-[#8b949e]">[+] Resolving host address... OK</div>
                            <div className="text-[#8b949e]">[+] establishing secure channel... OK</div>
                            <div className="mt-2 text-red-400 font-bold flex gap-2">
                                <span>[!]</span>
                                <span>FATAL ERROR: Target not found at address 0x404</span>
                            </div>
                            <div className="text-red-400 font-bold flex gap-2">
                                <span>[!]</span>
                                <span>Segmentation fault (core dumped)</span>
                            </div>
                            <div className="mt-4 pl-4 border-l-2 border-primary/30 text-xs md:text-sm text-[#8b949e]">
                                <div className="mb-1 text-primary font-bold">STACK TRACE:</div>
                                <div className="grid grid-cols-[80px_1fr] gap-x-4">
                                    <span className="opacity-50">0x00007fff</span>
                                    <span>void page_not_found(const char* url)</span>
                                    <span className="opacity-50">0x000040a2</span>
                                    <span>int main_router(request_context* ctx)</span>
                                    <span className="opacity-50">0x00000000</span>
                                    <span className="text-red-400">null_pointer_exception &lt;signal: 11&gt;</span>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-6 items-center">
                                <span className="text-green-400 font-bold">root@malware-lab:~#</span>
                                <span className="w-2.5 h-5 bg-primary animate-pulse inline-block align-middle"></span>
                            </div>

                            {/* Interactive History */}
                            {history.map((entry, i) => (
                                <div key={i} className="flex flex-col gap-1 mt-1">
                                    <div className="flex gap-2">
                                        <span className="text-green-400 font-bold">user@malware-lab:~#</span>
                                        <span className="text-white">{entry.cmd}</span>
                                    </div>
                                    {entry.output && <div className="text-red-400">{entry.output}</div>}
                                </div>
                            ))}

                            {/* Input Line */}
                            <div className="flex gap-2 mt-1 items-center">
                                <span className="text-green-400 font-bold">user@malware-lab:~#</span>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleCommand}
                                    className="bg-transparent border-none outline-none text-white font-mono flex-1 caret-primary"
                                    autoFocus
                                />
                            </div>
                            <div ref={bottomRef} />
                        </div>
                    </div>
                </div>

                {/* Action Area */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                    <Link to="/" className="group relative flex w-full sm:w-auto min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-primary/90 text-white gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(19,146,236,0.3)] hover:shadow-[0_0_30px_rgba(19,146,236,0.5)] border border-primary/50">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold tracking-wide font-mono">Return to Safe Mode</span>
                    </Link>
                    <div className="flex gap-4 text-sm font-mono text-slate-500 dark:text-[#8b949e]">
                        <span className="select-none text-slate-300 dark:text-[#30363d]">|</span>
                        <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                            <Bug size={16} /> Report Bug
                        </a>
                        <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                            <History size={16} /> Logs
                        </a>
                    </div>
                </div>
            </div>
            </div>
            
            <div className="pb-4 pt-4 px-4 w-full text-center text-xs text-slate-500 dark:text-[#8b949e] font-mono z-10 shrink-0">
                System Integrity Compromised. Please navigate away.
                <br/>
                PID: 4821 • TTY: pts/0 • TIME: 00:00:00
            </div>
        </div>
    );
};

export default NotFoundPage;
