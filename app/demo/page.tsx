'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    ShieldCheck, Brain, X, Loader2, CheckCircle2, ToggleLeft, ToggleRight,
    ShoppingCart, WifiOff, Server, AlertTriangle,
    Eye, Store, BarChart3, Users, ChevronDown,
    ShoppingBag, Minus, Plus, CreditCard, ChevronUp,
} from 'lucide-react';
import { useSimulationState } from '@/lib/hooks/useSimulationState';
import {
    type ChaosEvent, type AlternativeFix,
    getEventById,
    PRODUCTS,
    CUSTOMER_SENTIMENTS,
} from '@/lib/simulation';
import CRMPanel from './components/CRMPanel';
import MetricsPanel from './components/MetricsPanel';

// ═══════════════════════════════════════════════════════════════
// CHAOS CONSOLE (Left Panel)
// ═══════════════════════════════════════════════════════════════
function ChaosConsole({ activeChaos, healthScore, onInject, onReset }: {
    activeChaos: string[]; healthScore: number;
    onInject: (level: string) => void; onReset: () => void;
}) {
    const [open, setOpen] = useState(true);
    const metrics = useMemo(() => ({
        rps: healthScore > 80 ? 2500 + Math.random() * 1500 : 200 + Math.random() * 400,
        p99: healthScore > 80 ? 40 + Math.random() * 60 : 2000 + Math.random() * 1500,
        err: healthScore > 80 ? Math.random() * 0.1 : 5 + Math.random() * 5,
    }), [healthScore]);

    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="fixed top-4 left-4 z-50 w-[280px]">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A0C10]/90 backdrop-blur-xl border border-red-500/20 text-white text-sm font-semibold cursor-pointer w-full">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> CHAOS CONSOLE
                {open ? <ChevronUp size={14} className="ml-auto text-zinc-500" /> : <ChevronDown size={14} className="ml-auto text-zinc-500" />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="mt-2 rounded-2xl bg-[#0A0C10]/95 backdrop-blur-2xl border border-white/5 p-4 overflow-hidden">
                        {/* Health bar */}
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">STORE HEALTH</span>
                            <span className={`text-sm font-bold font-mono ${healthScore > 70 ? 'text-emerald-400' : healthScore > 40 ? 'text-yellow-400' : 'text-red-400'}`}>{healthScore}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/5 mb-4 overflow-hidden">
                            <motion.div animate={{ width: `${healthScore}%` }} className={`h-full rounded-full transition-colors ${healthScore > 70 ? 'bg-emerald-500' : healthScore > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                        </div>
                        {/* Quick metrics */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {[
                                { v: Math.round(metrics.rps), l: 'RPS' },
                                { v: `${Math.round(metrics.p99)}ms`, l: 'P99' },
                                { v: `${metrics.err.toFixed(2)}%`, l: 'ERR%' },
                            ].map(m => (
                                <div key={m.l} className="bg-white/5 rounded-lg p-2 text-center">
                                    <div className={`text-sm font-bold font-mono ${healthScore > 70 ? 'text-emerald-400' : 'text-red-400'}`}>{m.v}</div>
                                    <div className="text-[9px] text-zinc-500 font-mono">{m.l}</div>
                                </div>
                            ))}
                        </div>
                        {/* Inject buttons */}
                        <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-2">INJECT CHAOS</div>
                        <div className="space-y-2 mb-3">
                            {[
                                { level: 'HIGH', label: 'High Impact', color: 'border-red-500/30 hover:bg-red-500/10', dot: 'bg-red-500' },
                                { level: 'MEDIUM', label: 'Medium Impact', color: 'border-orange-500/30 hover:bg-orange-500/10', dot: 'bg-orange-500' },
                                { level: 'LOW', label: 'Low Impact', color: 'border-blue-500/30 hover:bg-blue-500/10', dot: 'bg-blue-500' },
                            ].map(btn => (
                                <button key={btn.level} onClick={() => onInject(btn.level)}
                                    className={`w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl border bg-white/[0.02] cursor-pointer transition-all ${btn.color}`}>
                                    <span className={`w-3 h-3 rounded-full ${btn.dot}`} />
                                    <div><div className="text-xs text-white font-semibold">{btn.label}</div><div className="text-[10px] text-zinc-500">Random event</div></div>
                                </button>
                            ))}
                        </div>
                        {/* Active events */}
                        {activeChaos.length > 0 && (
                            <div className="mb-3">
                                <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-2">ACTIVE ({activeChaos.length})</div>
                                <div className="space-y-1 max-h-[120px] overflow-y-auto custom-scrollbar">
                                    {activeChaos.map(id => {
                                        const ev = getEventById(id);
                                        return (
                                            <div key={id} className="flex items-center gap-2 text-[10px] px-2 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/15 font-mono">
                                                <span>{ev?.icon || '⚠️'}</span>
                                                <span className="truncate">{ev?.label || id}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        <button onClick={onReset} className="w-full text-center text-[11px] text-zinc-500 hover:text-white transition-colors cursor-pointer py-2 rounded-lg hover:bg-white/5">↺ Reset All Systems</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// SENTINEL OVERLAY — Multi-fix approval + Dynamic fix alternatives
// ═══════════════════════════════════════════════════════════════
interface ThoughtStep { id: number; text: string; type: 'scanning' | 'detected' | 'analyzing' | 'action' | 'resolved'; ts: number; }

interface PendingFix {
    event: ChaosEvent;
    selectedFix: AlternativeFix;
}

function SentinelOverlay({ activeChaos, onHeal, autonomous, onToggleAutonomous }: {
    activeChaos: string[]; onHeal: (eventId: string, fixLabel?: string) => Promise<void>;
    autonomous: boolean; onToggleAutonomous: () => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [thoughts, setThoughts] = useState<ThoughtStep[]>([]);
    const [pendingFixes, setPendingFixes] = useState<PendingFix[]>([]);
    const [healingIds, setHealingIds] = useState<Set<string>>(new Set());
    const thoughtRef = useRef<HTMLDivElement>(null);
    const thinkingRef = useRef(false);
    const autoHealedRef = useRef<Set<string>>(new Set());

    useEffect(() => { if (thoughtRef.current) thoughtRef.current.scrollTop = thoughtRef.current.scrollHeight; }, [thoughts]);

    const addThought = useCallback((text: string, type: ThoughtStep['type']) => {
        setThoughts(prev => [...prev, { id: Date.now() + Math.random(), text, type, ts: Date.now() }]);
    }, []);

    // Autonomous mode: auto-heal LOW and MEDIUM events
    useEffect(() => {
        if (!autonomous || activeChaos.length === 0) return;
        const autoHeal = async () => {
            for (const id of activeChaos) {
                if (autoHealedRef.current.has(id)) continue;
                const ev = getEventById(id);
                if (!ev || ev.level === 'HIGH') continue;
                autoHealedRef.current.add(id);
                addThought(`[AUTO] Detected: ${ev.label} [${ev.impactLabel}]`, 'detected');
                await new Promise(r => setTimeout(r, 600));
                addThought(`[AUTO] Executing: ${ev.healLabel}`, 'action');
                await onHeal(id, ev.healLabel);
                await new Promise(r => setTimeout(r, 400));
                addThought(`[AUTO] ✅ Resolved: ${ev.label}`, 'resolved');
            }
        };
        const timer = setTimeout(autoHeal, 1500);
        return () => clearTimeout(timer);
    }, [autonomous, activeChaos, onHeal, addThought]);

    useEffect(() => {
        autoHealedRef.current = new Set([...autoHealedRef.current].filter(id => activeChaos.includes(id)));
    }, [activeChaos]);

    // Manual mode: scan ALL active chaos and queue ALL HIGH events for review
    const runReasoningLoop = useCallback(async () => {
        if (thinkingRef.current) return;
        thinkingRef.current = true;
        setIsThinking(true);
        setPendingFixes([]);
        setThoughts([]);

        addThought('Initializing Aegis Sentinel... Scanning storefront.', 'scanning');
        await new Promise(r => setTimeout(r, 1200));

        if (activeChaos.length === 0) {
            addThought('All systems nominal. No incidents detected.', 'resolved');
            setIsThinking(false); thinkingRef.current = false; return;
        }

        addThought(`Anomaly detected: ${activeChaos.length} active failure${activeChaos.length > 1 ? 's' : ''}.`, 'detected');
        await new Promise(r => setTimeout(r, 800));

        const highEvents: ChaosEvent[] = [];
        const autoFixEvents: ChaosEvent[] = [];

        for (const id of activeChaos) {
            const ev = getEventById(id);
            if (!ev) continue;
            if (ev.level === 'HIGH') highEvents.push(ev);
            else autoFixEvents.push(ev);
        }

        // Auto-fix MEDIUM/LOW
        for (const ev of autoFixEvents) {
            addThought(`${ev.impactLabel}: ${ev.label} — Auto-executing: ${ev.healLabel}`, 'action');
            await new Promise(r => setTimeout(r, 600));
            await onHeal(ev.id, ev.healLabel);
            addThought(`✅ Resolved: ${ev.label}`, 'resolved');
            await new Promise(r => setTimeout(r, 300));
        }

        // Queue HIGH events for review
        if (highEvents.length > 0) {
            for (const ev of highEvents) {
                addThought(`Priority: ${ev.label} [${ev.impactLabel}]`, 'analyzing');
                await new Promise(r => setTimeout(r, 500));
                addThought(`RCA: ${ev.description}`, 'analyzing');
                await new Promise(r => setTimeout(r, 400));
                const conf = Math.round(85 + Math.random() * 12);
                addThought(`Pattern matched: ${conf}% confidence → ${ev.healLabel}`, 'analyzing');
                await new Promise(r => setTimeout(r, 300));
            }
            addThought(`⚠️ ${highEvents.length} HIGH RISK event${highEvents.length > 1 ? 's' : ''} require approval.`, 'action');

            setPendingFixes(highEvents.map(ev => ({
                event: ev,
                selectedFix: ev.alternativeFixes[0], // Default to highest confidence
            })));
        }

        setIsThinking(false); thinkingRef.current = false;
    }, [activeChaos, onHeal, addThought]);

    // Approve single fix
    const handleApproveOne = async (fix: PendingFix) => {
        setHealingIds(prev => new Set([...prev, fix.event.id]));
        addThought(`Executing: ${fix.selectedFix.label} for ${fix.event.label}...`, 'action');
        await new Promise(r => setTimeout(r, 800));
        await onHeal(fix.event.id, fix.selectedFix.label);
        addThought(`✅ Resolved: ${fix.event.label}`, 'resolved');
        setHealingIds(prev => { const n = new Set(prev); n.delete(fix.event.id); return n; });
        setPendingFixes(prev => prev.filter(p => p.event.id !== fix.event.id));
    };

    // Approve all fixes
    const handleApproveAll = async () => {
        const fixes = [...pendingFixes];
        for (const fix of fixes) {
            setHealingIds(prev => new Set([...prev, fix.event.id]));
            addThought(`Executing: ${fix.selectedFix.label} for ${fix.event.label}...`, 'action');
            await new Promise(r => setTimeout(r, 500));
            await onHeal(fix.event.id, fix.selectedFix.label);
            addThought(`✅ Resolved: ${fix.event.label}`, 'resolved');
            setHealingIds(prev => { const n = new Set(prev); n.delete(fix.event.id); return n; });
            await new Promise(r => setTimeout(r, 300));
        }
        setPendingFixes([]);
    };

    // Update selected fix for an event
    const updateSelectedFix = (eventId: string, fix: AlternativeFix) => {
        setPendingFixes(prev => prev.map(p =>
            p.event.id === eventId ? { ...p, selectedFix: fix } : p
        ));
    };

    const colors: Record<ThoughtStep['type'], string> = { scanning: 'text-blue-400', detected: 'text-orange-400', analyzing: 'text-[#00D1FF]', action: 'text-yellow-400', resolved: 'text-emerald-400' };

    return (
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="fixed top-4 right-4 z-50 w-[380px]">
            <motion.button onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A0C10]/90 backdrop-blur-xl border border-[#00D1FF]/30 text-white text-sm font-semibold cursor-pointer ml-auto">
                <ShieldCheck size={16} className="text-[#00D1FF]" /> AEGIS SENTINEL
                {autonomous && <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-mono">AUTO</span>}
                {activeChaos.length > 0 && <span className="relative flex h-2 w-2 ml-1"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D1FF] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D1FF]" /></span>}
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="mt-2 rounded-2xl bg-[#0A0C10]/95 backdrop-blur-2xl border border-[#00D1FF]/20 overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/5">
                            <div className="flex items-center gap-2"><Brain size={14} className="text-[#00D1FF]" /><span className="text-xs font-mono text-zinc-400">THOUGHT STREAM</span></div>
                            <div className="flex items-center gap-3">
                                <button onClick={onToggleAutonomous} className="flex items-center gap-1.5 cursor-pointer" title={autonomous ? 'Switch to Manual' : 'Switch to Autonomous'}>
                                    {autonomous ? <ToggleRight size={18} className="text-emerald-400" /> : <ToggleLeft size={18} className="text-zinc-500" />}
                                    <span className={`text-[9px] font-mono ${autonomous ? 'text-emerald-400' : 'text-zinc-500'}`}>{autonomous ? 'AUTO' : 'MANUAL'}</span>
                                </button>
                                <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white cursor-pointer"><X size={14} /></button>
                            </div>
                        </div>
                        {/* Thought stream */}
                        <div ref={thoughtRef} className="max-h-[200px] overflow-y-auto p-4 space-y-2 custom-scrollbar">
                            {thoughts.length === 0 && !isThinking && (
                                <div className="text-center py-6"><ShieldCheck size={24} className="mx-auto text-[#00D1FF]/40 mb-2" /><p className="text-xs text-zinc-500">{autonomous ? 'Autonomous mode active. Monitoring...' : 'Click "Activate Aegis" to start.'}</p></div>
                            )}
                            {thoughts.map(t => (
                                <motion.div key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2 items-start">
                                    <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${t.type === 'resolved' ? 'bg-emerald-400' : t.type === 'detected' ? 'bg-orange-400' : 'bg-[#00D1FF]'}`} />
                                    <p className={`text-xs font-mono leading-relaxed ${colors[t.type]}`}>{t.text}</p>
                                </motion.div>
                            ))}
                            {isThinking && <div className="flex items-center gap-2 text-[#00D1FF]"><Loader2 size={12} className="animate-spin" /><span className="text-xs font-mono">Processing...</span></div>}
                        </div>

                        {/* Multi-fix Review Panel */}
                        <AnimatePresence>
                            {pendingFixes.length > 0 && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                    className="border-t border-white/5 p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">⚠️ {pendingFixes.length} FIX{pendingFixes.length > 1 ? 'ES' : ''} AWAITING APPROVAL</div>
                                        {pendingFixes.length > 1 && (
                                            <motion.button whileTap={{ scale: 0.95 }} onClick={handleApproveAll}
                                                className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-emerald-500/30 font-semibold flex items-center gap-1">
                                                <CheckCircle2 size={10} /> APPROVE ALL
                                            </motion.button>
                                        )}
                                    </div>

                                    <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                                        {pendingFixes.map(fix => (
                                            <div key={fix.event.id} className="bg-white/5 rounded-xl p-3 border border-red-500/20">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="text-xs text-white font-semibold truncate flex-1">{fix.event.label}</div>
                                                    <span className="text-[9px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded-full ml-2">HIGH</span>
                                                </div>
                                                <p className="text-[10px] text-zinc-400 mb-3">{fix.event.description}</p>

                                                {/* Fix alternatives dropdown */}
                                                <div className="mb-3">
                                                    <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider mb-1.5">SELECT FIX STRATEGY</div>
                                                    <div className="space-y-1">
                                                        {fix.event.alternativeFixes.map((alt, i) => (
                                                            <button key={i} onClick={() => updateSelectedFix(fix.event.id, alt)}
                                                                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-[10px] cursor-pointer transition-all ${fix.selectedFix.label === alt.label
                                                                    ? 'bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-[#00D1FF]'
                                                                    : 'bg-white/[0.02] border border-white/5 text-zinc-400 hover:border-white/10 hover:text-zinc-300'
                                                                    }`}>
                                                                <span className={`w-2 h-2 rounded-full shrink-0 ${fix.selectedFix.label === alt.label ? 'bg-[#00D1FF]' : 'bg-zinc-600'}`} />
                                                                <span className="flex-1 text-left font-medium">{alt.label}</span>
                                                                <span className={`font-mono ${alt.confidence >= 80 ? 'text-emerald-400' : alt.confidence >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                                    {alt.confidence}%
                                                                </span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleApproveOne(fix)}
                                                    disabled={healingIds.has(fix.event.id)}
                                                    className="w-full flex items-center justify-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold px-3 py-2 rounded-xl cursor-pointer hover:bg-emerald-500/30 disabled:opacity-50">
                                                    {healingIds.has(fix.event.id) ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
                                                    APPROVE: {fix.selectedFix.label}
                                                </motion.button>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Activate button (manual mode) */}
                        {!autonomous && (
                            <div className="p-4 border-t border-white/5">
                                <motion.button whileTap={{ scale: 0.97 }} onClick={runReasoningLoop} disabled={isThinking}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#00D1FF]/20 to-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30 text-xs font-semibold px-4 py-3 rounded-xl cursor-pointer hover:from-[#00D1FF]/30 transition-all disabled:opacity-50">
                                    <ShieldCheck size={14} /> {isThinking ? 'ANALYZING...' : 'ACTIVATE AEGIS'}
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// PRODUCT CARD
// ═══════════════════════════════════════════════════════════════
function ProductCard({ product, isCdnBroken, isCacheStale, isApiDegraded, onBuy }: {
    product: typeof PRODUCTS[0]; isCdnBroken: boolean; isCacheStale: boolean; isApiDegraded: boolean;
    onBuy: (p: typeof PRODUCTS[0]) => void;
}) {
    const [added, setAdded] = useState(false);
    const handleAdd = () => { if (isApiDegraded) return; setAdded(true); onBuy(product); setTimeout(() => setAdded(false), 1500); };
    const price = isCacheStale ? '$0.00' : `$${product.price.toFixed(2)}`;

    return (
        <motion.div layout className="group relative bg-[#0A0C10] rounded-2xl border border-white/5 overflow-hidden hover:border-[#00D1FF]/30 transition-all">
            <div className="relative aspect-square bg-gradient-to-br from-[#0D0F14] to-[#0A0C10] overflow-hidden">
                <AnimatePresence mode="wait">
                    {isCdnBroken ? (
                        <motion.div key="broken" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-red-500/5 border-2 border-dashed border-red-500/20">
                            <WifiOff size={32} className="text-red-400/60 mb-2" /><span className="text-xs text-red-400/80 font-mono">CDN_404</span>
                        </motion.div>
                    ) : (
                        <motion.div key="img" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full h-full">
                            <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-[10px] text-zinc-300 font-mono px-2 py-1 rounded-lg uppercase tracking-wider z-10">{product.category}</div>
            </div>
            <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-0.5">{product.name}</h3>
                <p className="text-zinc-500 text-xs mb-1">{product.color}</p>
                <div className="flex items-center gap-1 mb-3">
                    <span className="text-yellow-400 text-[10px]">{'★'.repeat(Math.round(product.rating))}</span>
                    <span className="text-zinc-500 text-[10px]">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className={`text-lg font-bold font-mono ${isCacheStale ? 'text-red-400 line-through' : 'text-white'}`}>{price}</span>
                    {isCacheStale && <span className="text-[10px] text-red-400 font-mono bg-red-500/10 px-2 py-0.5 rounded-full">CACHE_ERR</span>}
                </div>
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleAdd} disabled={isApiDegraded}
                    className={`mt-3 w-full flex items-center justify-center gap-2 text-xs font-semibold px-4 py-3 rounded-xl cursor-pointer transition-all ${isApiDegraded ? 'bg-red-500/10 text-red-400 border border-red-500/20 cursor-not-allowed' : added ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}>
                    {isApiDegraded ? <><Loader2 size={14} className="animate-spin" /> CONNECTING...</> : added ? <><CheckCircle2 size={14} /> ADDED!</> : <><ShoppingCart size={14} /> ADD TO CART</>}
                </motion.button>
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// ERROR OVERLAYS
// ═══════════════════════════════════════════════════════════════
function ErrorOverlay({ visible }: { visible: boolean }) {
    if (!visible) return null;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#0A0C10]/95 backdrop-blur-lg flex flex-col items-center justify-center">
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mb-6"><Server size={48} className="text-red-500/60" /></motion.div>
            <h2 className="text-2xl font-bold text-red-400 font-mono mb-2">500 INTERNAL SERVER ERROR</h2>
            <p className="text-zinc-500 text-sm mb-4 font-mono">Database connection pool exhausted</p>
            <div className="flex items-center gap-2 text-xs text-zinc-600 font-mono"><Loader2 size={12} className="animate-spin" /> Attempting to reconnect...</div>
        </motion.div>
    );
}

function NetworkToast({ visible }: { visible: boolean }) {
    return (<AnimatePresence>{visible && (<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-24 right-4 z-50 bg-red-500/20 backdrop-blur-xl border border-red-500/30 text-red-300 px-4 py-3 rounded-xl flex items-center gap-3 shadow-2xl"><AlertTriangle size={16} className="text-red-400 shrink-0" /><div><div className="text-xs font-semibold">API Degraded</div><div className="text-[10px] text-red-400/80">Gateway not responding. Retrying...</div></div></motion.div>)}</AnimatePresence>);
}

// ═══════════════════════════════════════════════════════════════
// MAIN DEMO PAGE
// ═══════════════════════════════════════════════════════════════
export default function DemoPage() {
    const { simState, hasActiveChaos, healthScore } = useSimulationState();
    const activeChaos = simState.active_chaos;

    const [adminTab, setAdminTab] = useState<'store' | 'metrics' | 'crm'>('store');
    const [category, setCategory] = useState('All');
    const [cart, setCart] = useState<{ product: typeof PRODUCTS[0]; qty: number }[]>([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [autonomous, setAutonomous] = useState(false);

    const isCdnBroken = simState.cdn_status === 'broken';
    const isCacheStale = !simState.cache_fresh;
    const isApiDegraded = simState.api_health === 'degraded';
    const isDbDown = simState.db_latency >= 5000;

    const filteredProducts = category === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);
    const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
    const cartCount = cart.reduce((s, i) => s + i.qty, 0);

    const addToCart = (product: typeof PRODUCTS[0]) => {
        setCart(prev => {
            const existing = prev.find(i => i.product.id === product.id);
            if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { product, qty: 1 }];
        });
    };

    const handleInjectChaos = async (level: string) => {
        try { await fetch('/api/simulation/chaos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ level }) }); } catch { }
    };

    const handleHeal = async (eventId: string, fixLabel?: string) => {
        try { await fetch('/api/simulation/heal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_id: eventId, fix_label: fixLabel }) }); } catch { }
    };

    const handleReset = async () => {
        try { await fetch('/api/simulation/reset', { method: 'POST' }); } catch { }
    };

    // Sentiments
    const sentiments = hasActiveChaos ? CUSTOMER_SENTIMENTS.angry : CUSTOMER_SENTIMENTS.happy;

    return (
        <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
            <ErrorOverlay visible={isDbDown && isCdnBroken && isApiDegraded} />
            <NetworkToast visible={isApiDegraded && !isDbDown} />

            <ChaosConsole activeChaos={activeChaos} healthScore={healthScore} onInject={handleInjectChaos} onReset={handleReset} />
            <SentinelOverlay activeChaos={activeChaos} onHeal={handleHeal} autonomous={autonomous} onToggleAutonomous={() => setAutonomous(!autonomous)} />

            {/* Top Nav */}
            <nav className="flex items-center justify-center gap-2 pt-4 pb-3 px-8 relative z-30">
                <div className="flex items-center gap-1 bg-[#0A0C10] rounded-xl p-1 border border-white/5">
                    {([
                        { id: 'store' as const, label: 'Storefront', icon: Store },
                        { id: 'metrics' as const, label: 'Metrics', icon: BarChart3 },
                        { id: 'crm' as const, label: 'CRM', icon: Users },
                    ]).map(t => (
                        <button key={t.id} onClick={() => setAdminTab(t.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${adminTab === t.id ? 'bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/20' : 'text-zinc-500 hover:text-white'}`}>
                            <t.icon size={16} /> {t.label}
                        </button>
                    ))}
                </div>
                {/* System status */}
                <span className={`text-[10px] font-mono px-2 py-1 rounded-full flex items-center gap-1 ml-4 ${hasActiveChaos ? 'text-red-400 bg-red-500/10 border border-red-500/20' : 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${hasActiveChaos ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'}`} />
                    {hasActiveChaos ? 'DEGRADED' : 'ALL SYSTEMS GO'}
                </span>
            </nav>

            {/* Main Content */}
            <main className="px-8 pb-8">
                {adminTab === 'store' && (
                    <section>
                        {/* Hero */}
                        <div className="relative rounded-3xl overflow-hidden mb-8 h-[420px] bg-gradient-to-br from-[#0D0F14] to-[#0A0C10] border border-white/5">
                            <div className="absolute inset-0 z-0">
                                {!isCdnBroken && <Image src="/shoes/hero.png" alt="Hero" fill className="object-cover opacity-30" sizes="100vw" />}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/90 to-transparent" />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-center px-12 max-w-xl">
                                <span className="text-[#00D1FF] font-mono text-xs tracking-widest mb-4 uppercase">SoleSource Exclusive</span>
                                <h1 className="text-5xl font-black text-white mb-4 leading-tight">PHANTOM X<br />SERIES</h1>
                                <p className="text-zinc-400 text-sm mb-8 leading-relaxed">Adaptive cushioning, carbon-fiber plate stability, and zero-gravity mesh upper.</p>
                                <div className="flex gap-4">
                                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => addToCart(PRODUCTS[0])} disabled={isApiDegraded}
                                        className="bg-[#00D1FF] text-black font-bold text-sm px-8 py-3.5 rounded-xl cursor-pointer hover:bg-[#00D1FF]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                        SHOP NOW — $249.99
                                    </motion.button>
                                    <button onClick={() => setCategory('All')} className="text-white font-medium text-sm px-6 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 cursor-pointer transition-all">
                                        VIEW LINEUP
                                    </button>
                                </div>
                            </div>
                            <div className="absolute right-0 top-0 w-1/2 h-full z-5">
                                {!isCdnBroken && <Image src="/shoes/hero.png" alt="Hero shoe" fill className="object-contain object-right p-8" sizes="50vw" />}
                            </div>
                        </div>

                        {/* Products Header + Category Filters + Cart */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">LATEST DROPS</h2>
                                <p className="text-zinc-500 text-sm">From the SoleSource performance lab</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 bg-[#0A0C10] rounded-xl p-1 border border-white/5">
                                    {['All', 'New Drops', 'Running', 'Basketball', 'Lifestyle'].map(cat => (
                                        <button key={cat} onClick={() => setCategory(cat)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${category === cat ? 'bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/20' : 'text-zinc-500 hover:text-white'}`}>
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                            {filteredProducts.map(p => (
                                <ProductCard key={p.id} product={p} isCdnBroken={isCdnBroken} isCacheStale={isCacheStale} isApiDegraded={isApiDegraded} onBuy={addToCart} />
                            ))}
                        </div>

                        {/* Floating Cart Button */}
                        {cartCount > 0 && (
                            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileTap={{ scale: 0.95 }}
                                onClick={() => setCartOpen(true)}
                                className="fixed bottom-6 right-6 z-40 bg-[#00D1FF] text-black font-bold px-6 py-3.5 rounded-2xl shadow-2xl shadow-[#00D1FF]/30 flex items-center gap-3 cursor-pointer">
                                <ShoppingBag size={18} /> Cart ({cartCount}) — ${cartTotal.toFixed(2)}
                            </motion.button>
                        )}

                        {/* Cart Drawer */}
                        <AnimatePresence>
                            {cartOpen && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)}>
                                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }}
                                        className="absolute right-0 top-0 h-full w-[400px] bg-[#0A0C10] border-l border-white/5 p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-lg font-bold">Your Cart</h3>
                                            <button onClick={() => setCartOpen(false)} className="text-zinc-500 hover:text-white cursor-pointer"><X size={20} /></button>
                                        </div>
                                        {cart.map(item => (
                                            <div key={item.product.id} className="flex items-center gap-4 py-4 border-b border-white/5">
                                                <div className="w-16 h-16 rounded-xl bg-[#0D0F14] relative overflow-hidden shrink-0">
                                                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="64px" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium text-white">{item.product.name}</h4>
                                                    <p className="text-xs text-zinc-500">${item.product.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => setCart(prev => prev.map(i => i.product.id === item.product.id ? { ...i, qty: Math.max(0, i.qty - 1) } : i).filter(i => i.qty > 0))} className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"><Minus size={12} /></button>
                                                    <span className="text-sm font-mono w-4 text-center">{item.qty}</span>
                                                    <button onClick={() => setCart(prev => prev.map(i => i.product.id === item.product.id ? { ...i, qty: i.qty + 1 } : i))} className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"><Plus size={12} /></button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="mt-6 space-y-4">
                                            <div className="flex justify-between text-sm"><span className="text-zinc-400">Subtotal</span><span className="font-mono font-bold">${cartTotal.toFixed(2)}</span></div>
                                            <div className="flex justify-between text-sm"><span className="text-zinc-400">Tax (8%)</span><span className="font-mono">${(cartTotal * 0.08).toFixed(2)}</span></div>
                                            <div className="border-t border-white/5 pt-4 flex justify-between"><span className="font-semibold">Total</span><span className="font-mono font-bold text-lg">${(cartTotal * 1.08).toFixed(2)}</span></div>
                                            <motion.button whileTap={{ scale: 0.95 }} disabled={isApiDegraded}
                                                className="w-full flex items-center justify-center gap-2 bg-[#00D1FF] text-black font-bold py-3.5 rounded-xl cursor-pointer hover:bg-[#00D1FF]/90 disabled:opacity-50 disabled:cursor-not-allowed">
                                                {isApiDegraded ? <><Loader2 size={16} className="animate-spin" /> Payment Unavailable</> : <><CreditCard size={16} /> PAY ${(cartTotal * 1.08).toFixed(2)}</>}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>
                )}

                {adminTab === 'metrics' && (
                    <section>
                        <MetricsPanel hasChaos={hasActiveChaos} healthScore={healthScore} />
                    </section>
                )}

                {adminTab === 'crm' && (
                    <section>
                        <CRMPanel hasChaos={hasActiveChaos} />
                    </section>
                )}
            </main>

            {/* Footer */}
            <footer className="px-8 py-4 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-600 font-mono">
                <div className="flex items-center gap-2"><span className="text-white font-bold text-xs uppercase">SoleSource</span> AEGIS SRE SANDBOX v3.0</div>
                <button onClick={() => window.location.href = '/dashboard'} className="text-zinc-500 hover:text-white transition-colors cursor-pointer flex items-center gap-1">← Return to Command Center</button>
            </footer>
        </div>
    );
}
