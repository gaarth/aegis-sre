'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Shield, Activity, Brain, TrendingUp,
    ExternalLink, AlertTriangle, CheckCircle2,
    Clock, ChevronDown, Zap, ArrowRight,
    Eye, Target, Cpu, Wrench,
    Server, Loader2,
} from 'lucide-react';
import { useSimulationState } from '@/lib/hooks/useSimulationState';
import { createClient } from '@/lib/supabase/client';
import { getEventById } from '@/lib/simulation';

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════
interface EventLogEntry {
    id: string;
    event_id: string;
    event_label: string;
    level: string;
    action: string;
    fix_applied: string | null;
    description: string;
    severity: string;
    created_at: string;
}

// ═══════════════════════════════════════════════════════════════
// STAT CARD
// ═══════════════════════════════════════════════════════════════
function StatCard({ label, value, icon: Icon, color, sub }: {
    label: string; value: string | number; icon: React.ComponentType<{ size?: number; className?: string }>; color: string; sub?: string;
}) {
    return (
        <motion.div whileHover={{ y: -2 }} className="bg-[#0A0C10] rounded-2xl border border-white/5 p-5 hover:border-[#00D1FF]/20 transition-all">
            <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${color}/10`}>
                    <Icon size={16} className={`text-${color}`} />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{label}</span>
            </div>
            <div className={`text-3xl font-bold font-mono text-${color} mb-1`}>{value}</div>
            {sub && <div className="text-[10px] text-zinc-500 font-mono">{sub}</div>}
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ═══════════════════════════════════════════════════════════════
export default function DashboardPage() {
    const { simState, hasActiveChaos, healthScore, loading } = useSimulationState();
    const [view, setView] = useState<'incidents' | 'learnings'>('incidents');
    const [eventLog, setEventLog] = useState<EventLogEntry[]>([]);
    const [logLoading, setLogLoading] = useState(true);

    // Active events from simulation
    const activeEvents = simState.active_chaos.map(id => getEventById(id)).filter(Boolean);

    // Fetch event log from Supabase
    useEffect(() => {
        const supabase = createClient();
        const fetchLog = async () => {
            const { data } = await supabase
                .from('simulation_events_log')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50);
            if (data) setEventLog(data as EventLogEntry[]);
            setLogLoading(false);
        };
        fetchLog();

        // Realtime subscription for event log
        const channel = supabase
            .channel('events_log_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'simulation_events_log' },
                () => { fetchLog(); }
            )
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    // Derived stats
    const totalIncidents = eventLog.filter(e => e.action === 'injected').length;
    const totalHealed = eventLog.filter(e => e.action === 'healed').length;
    const mttr = totalHealed > 0 ? '< 30s' : 'N/A';

    // Learnings: group healed events by event_id, show fix strategies
    const learnings = useMemo(() => {
        const healedEvents = eventLog.filter(e => e.action === 'healed');
        const grouped: Record<string, { event_label: string; level: string; fixes: string[]; count: number; lastSeen: string; description: string }> = {};
        for (const e of healedEvents) {
            if (!grouped[e.event_id]) {
                grouped[e.event_id] = { event_label: e.event_label, level: e.level, fixes: [], count: 0, lastSeen: e.created_at, description: e.description };
            }
            grouped[e.event_id].count++;
            if (e.fix_applied && !grouped[e.event_id].fixes.includes(e.fix_applied)) {
                grouped[e.event_id].fixes.push(e.fix_applied);
            }
            if (new Date(e.created_at) > new Date(grouped[e.event_id].lastSeen)) {
                grouped[e.event_id].lastSeen = e.created_at;
            }
        }
        return Object.entries(grouped).map(([id, data]) => ({ id, ...data }));
    }, [eventLog]);

    const formatTime = (iso: string) => {
        const d = new Date(iso);
        const now = new Date();
        const diffMs = now.getTime() - d.getTime();
        const diffMin = Math.round(diffMs / 60000);
        if (diffMin < 1) return 'Just now';
        if (diffMin < 60) return `${diffMin}m ago`;
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050508] flex items-center justify-center">
                <Loader2 size={32} className="text-[#00D1FF] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050508] text-white">
            {/* Header */}
            <header className="flex items-center justify-between px-8 py-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Shield size={20} className="text-[#00D1FF]" />
                        <span className="text-lg font-bold tracking-tight">AEGIS</span>
                        <span className="text-zinc-600 text-sm font-mono">COMMAND CENTER</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className={`flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full ${hasActiveChaos ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        <span className={`w-2 h-2 rounded-full ${hasActiveChaos ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'}`} />
                        {hasActiveChaos ? 'ACTIVE INCIDENTS' : 'ALL CLEAR'}
                    </span>
                    <Link href="/demo"
                        className="flex items-center gap-2 bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#00D1FF]/20 transition-all">
                        <ExternalLink size={14} /> Launch Sandbox
                    </Link>
                </div>
            </header>

            <main className="px-8 py-6 space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-4">
                    <motion.div whileHover={{ y: -2 }} className="bg-[#0A0C10] rounded-2xl border border-white/5 p-5 hover:border-[#00D1FF]/20 transition-all">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#00D1FF]/10"><Activity size={16} className="text-[#00D1FF]" /></div>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">HEALTH SCORE</span>
                        </div>
                        <div className={`text-3xl font-bold font-mono ${healthScore > 70 ? 'text-emerald-400' : healthScore > 40 ? 'text-yellow-400' : 'text-red-400'}`}>{healthScore}%</div>
                        <div className="w-full h-1.5 rounded-full bg-white/5 mt-2 overflow-hidden">
                            <motion.div animate={{ width: `${healthScore}%` }} className={`h-full rounded-full ${healthScore > 70 ? 'bg-emerald-500' : healthScore > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                        </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="bg-[#0A0C10] rounded-2xl border border-white/5 p-5 hover:border-[#00D1FF]/20 transition-all">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500/10"><AlertTriangle size={16} className="text-red-400" /></div>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">ACTIVE INCIDENTS</span>
                        </div>
                        <div className="text-3xl font-bold font-mono text-red-400">{simState.active_chaos.length}</div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-1">{totalIncidents} total triggered</div>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="bg-[#0A0C10] rounded-2xl border border-white/5 p-5 hover:border-[#00D1FF]/20 transition-all">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/10"><CheckCircle2 size={16} className="text-emerald-400" /></div>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">RESOLVED</span>
                        </div>
                        <div className="text-3xl font-bold font-mono text-emerald-400">{totalHealed}</div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-1">MTTR: {mttr}</div>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="bg-[#0A0C10] rounded-2xl border border-white/5 p-5 hover:border-[#00D1FF]/20 transition-all">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#00D1FF]/10"><Brain size={16} className="text-[#00D1FF]" /></div>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">PATTERNS LEARNED</span>
                        </div>
                        <div className="text-3xl font-bold font-mono text-[#00D1FF]">{learnings.length}</div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-1">Unique strategies applied</div>
                    </motion.div>
                </div>

                {/* Active Incidents Banner */}
                <AnimatePresence>
                    {activeEvents.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle size={16} className="text-red-400" />
                                <span className="text-sm font-semibold text-red-400">LIVE INCIDENTS</span>
                                <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full font-mono">{activeEvents.length} active</span>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {activeEvents.map(ev => ev && (
                                    <div key={ev.id} className="bg-[#0A0C10] rounded-xl border border-red-500/15 p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm">{ev.icon}</span>
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${ev.level === 'HIGH' ? 'bg-red-500/10 text-red-400' : ev.level === 'MEDIUM' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'}`}>{ev.level}</span>
                                        </div>
                                        <h4 className="text-xs font-semibold text-white mb-0.5">{ev.label}</h4>
                                        <p className="text-[10px] text-zinc-500">{ev.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* View Toggle */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-[#0A0C10] rounded-xl p-1 border border-white/5">
                        <button onClick={() => setView('incidents')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${view === 'incidents' ? 'bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/20' : 'text-zinc-500 hover:text-white'}`}>
                            <Target size={14} /> Incident Log
                        </button>
                        <button onClick={() => setView('learnings')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${view === 'learnings' ? 'bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/20' : 'text-zinc-500 hover:text-white'}`}>
                            <Brain size={14} /> Agent Learnings Hub
                        </button>
                    </div>
                    <Link href="/demo"
                        className="ml-auto flex items-center gap-2 bg-gradient-to-r from-[#00D1FF]/20 to-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30 px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-[#00D1FF]/30 transition-all">
                        <Zap size={14} /> Launch Simulation Sandbox <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {view === 'incidents' && (
                        <motion.div key="incidents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="bg-[#0A0C10] rounded-2xl border border-white/5 overflow-hidden">
                                <div className="grid grid-cols-12 gap-2 px-5 py-3 text-[10px] font-mono text-zinc-500 uppercase tracking-wider border-b border-white/5">
                                    <div className="col-span-1">TIME</div>
                                    <div className="col-span-1">ACTION</div>
                                    <div className="col-span-1">LEVEL</div>
                                    <div className="col-span-3">EVENT</div>
                                    <div className="col-span-3">DESCRIPTION</div>
                                    <div className="col-span-3">FIX APPLIED</div>
                                </div>
                                {logLoading ? (
                                    <div className="flex items-center justify-center py-12"><Loader2 size={20} className="text-[#00D1FF] animate-spin" /></div>
                                ) : eventLog.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Activity size={32} className="mx-auto text-zinc-700 mb-3" />
                                        <p className="text-zinc-500 text-sm">No events yet. Launch the sandbox to begin.</p>
                                    </div>
                                ) : (
                                    <div className="max-h-[500px] overflow-y-auto">
                                        {eventLog.map((entry, i) => (
                                            <motion.div key={entry.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                                                className="grid grid-cols-12 gap-2 px-5 py-3 items-center text-xs border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                                <div className="col-span-1 font-mono text-zinc-500 flex items-center gap-1"><Clock size={10} /> {formatTime(entry.created_at)}</div>
                                                <div className="col-span-1">
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${entry.action === 'injected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                                                        {entry.action === 'injected' ? '⚡ IN' : '✅ FIX'}
                                                    </span>
                                                </div>
                                                <div className="col-span-1">
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${entry.level === 'HIGH' ? 'bg-red-500/10 text-red-400' : entry.level === 'MEDIUM' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                        {entry.level}
                                                    </span>
                                                </div>
                                                <div className="col-span-3 text-white font-medium truncate">{entry.event_label}</div>
                                                <div className="col-span-3 text-zinc-400 truncate">{entry.description}</div>
                                                <div className="col-span-3 text-zinc-400 truncate">
                                                    {entry.fix_applied ? (
                                                        <span className="flex items-center gap-1 text-emerald-400"><Wrench size={10} /> {entry.fix_applied}</span>
                                                    ) : (
                                                        <span className="text-zinc-600">—</span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {view === 'learnings' && (
                        <motion.div key="learnings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {learnings.length === 0 ? (
                                <div className="bg-[#0A0C10] rounded-2xl border border-white/5 p-12 text-center">
                                    <Brain size={40} className="mx-auto text-zinc-700 mb-4" />
                                    <h3 className="text-lg font-semibold text-zinc-400 mb-2">No Learnings Yet</h3>
                                    <p className="text-sm text-zinc-500 mb-4">AEGIS will accumulate patterns as it resolves incidents.</p>
                                    <Link href="/demo" className="inline-flex items-center gap-2 text-[#00D1FF] text-sm hover:underline">
                                        Launch Sandbox to generate data <ArrowRight size={14} />
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {learnings.map((learning, i) => (
                                        <motion.div key={learning.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                            className="bg-[#0A0C10] rounded-2xl border border-white/5 p-5 hover:border-[#00D1FF]/20 transition-all">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Brain size={14} className="text-[#00D1FF]" />
                                                <span className="text-xs font-mono text-[#00D1FF] uppercase tracking-wider">AEGIS LEARNING</span>
                                                <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded-full font-mono ${learning.level === 'HIGH' ? 'bg-red-500/10 text-red-400' : learning.level === 'MEDIUM' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                    {learning.level}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-semibold text-white mb-2">{learning.event_label}</h4>
                                            <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">{learning.description}</p>

                                            <div className="space-y-2">
                                                <div>
                                                    <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-zinc-500 mb-1 flex items-center gap-1">
                                                        <span className="w-1 h-1 rounded-full bg-emerald-400" /> Fix Strategies Applied
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {learning.fixes.map((fix, j) => (
                                                            <span key={j} className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-lg font-mono">
                                                                {fix}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-mono pt-1">
                                                    <span>Occurrences: {learning.count}</span>
                                                    <span>Last: {formatTime(learning.lastSeen)}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
