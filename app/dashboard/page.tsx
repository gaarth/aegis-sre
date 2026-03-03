'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useSpring, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import {
    LayoutDashboard,
    ShieldAlert,
    Activity,
    FileText,
    RefreshCw,
    Settings,
    HelpCircle,
    Bell,
    Search,
    ArrowUpRight,
    ArrowRight,
    MoreHorizontal,
    Filter,
    ChevronDown,
    CheckCircle2,
    Zap,
    AlertTriangle,
    Clock,
    Brain,
    ArrowLeft,
} from 'lucide-react';
import type { Incident } from '@/lib/database.types';

// ── Animated Counter (from day10 reference) ──────────────────
const AnimatedCounter = ({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) => {
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 10 });
    const display = useTransform(
        spring,
        (current: number) =>
            `${current.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            })}${suffix}`,
    );

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span>{display}</motion.span>;
};

// ── Animation Variants (day10 reference) ──────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(15px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

// ── Realistic incident pool ──────────────────────────────────
const INCIDENT_POOL = [
    { source: 'Database Connection Exhaustion', severity: 'critical' as const },
    { source: 'Auth Service Latency Spike', severity: 'warning' as const },
    { source: 'Redis OOM: Cache Eviction Failure', severity: 'critical' as const },
    { source: 'S3 Bucket Permission Denied', severity: 'warning' as const },
    { source: 'Stripe API Timeout (Payment Gateway)', severity: 'critical' as const },
];

// ── Risk tier mapping ────────────────────────────────────────
type RiskTier = 'high' | 'medium' | 'low';

function getRiskTier(severity: Incident['severity']): { tier: RiskTier; cls: string; label: string } {
    const map = {
        critical: { tier: 'high' as const, cls: 'sg-risk-high', label: 'HIGH RISK' },
        warning: { tier: 'medium' as const, cls: 'sg-risk-medium', label: 'MEDIUM RISK' },
        info: { tier: 'low' as const, cls: 'sg-risk-low', label: 'LOW RISK' },
    };
    return map[severity] ?? map.info;
}

function getActionBadge(status: Incident['status']): { cls: string; label: string; dot: string } {
    if (status === 'resolved') return { cls: 'sg-action-resolved', label: 'RESOLVED', dot: 'bg-action-resolved' };
    if (status === 'pending_approval') return { cls: 'sg-action-pending', label: 'PENDING APPROVAL', dot: 'bg-action-pending' };
    if (status === 'failed') return { cls: 'sg-badge-critical', label: 'FAILED', dot: 'bg-critical' };
    return { cls: 'sg-badge-info', label: status.replace(/_/g, ' ').toUpperCase(), dot: 'bg-secondary' };
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const secs = Math.floor(diff / 1000);
    if (secs < 60) return `${secs}s ago`;
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

// ── Sidebar Item (day10 pattern) ──────────────────────────────
const SidebarItem = ({ icon: Icon, label, active, count }: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    active?: boolean;
    count?: number;
}) => (
    <motion.div
        className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group hover:translate-x-1 ${active
            ? "bg-gradient-to-r border border-[#2a2a40] from-[#8B9FE8]/10 via-[#8B9FE8]/5 to-transparent text-white"
            : "text-zinc-500 hover:text-white hover:bg-white/5"
            }`}
    >
        <div className="flex items-center gap-3">
            <Icon size={20} className={active ? "text-[#8B9FE8]" : ""} />
            <span className="text-sm text-white/60">{label}</span>
        </div>
        {count !== undefined && count > 0 && (
            <span className="bg-[#8B9FE8]/20 text-[#8B9FE8] text-xs px-2 py-0.5 rounded-full border border-[#8B9FE8]/30">
                {count}
            </span>
        )}
    </motion.div>
);

// ── Stat Card (day10 pattern, AEGIS theme) ────────────────────
const StatCard = ({ title, sub, value, icon: Icon, isPrimary, trend }: {
    title: string; sub: string; value: number; icon: React.ComponentType<{ size?: number; className?: string }>; isPrimary?: boolean; trend?: string;
}) => (
    <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className={`relative overflow-hidden rounded-2xl flex flex-col justify-between h-[180px] shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${isPrimary
            ? "bg-[#8B9FE8] text-white shadow-[#8B9FE8]/20"
            : "bg-gradient-to-tr from-[#0a0a0f] to-[#1a1a26] border border-white/5"
            }`}
    >
        {/* Radial glow */}
        <div
            className="absolute inset-0 z-0 blur-[30px]"
            style={{
                background: `radial-gradient(circle at 50% 50%, 
                    rgba(139, 159, 232, 0.15) 0%, 
                    rgba(139, 159, 232, 0.08) 25%, 
                    rgba(139, 159, 232, 0.02) 35%, 
                    transparent 50%)`,
            }}
        />

        <div className="flex p-6 justify-between items-start">
            <div className="flex gap-3 items-center">
                <div className={`p-2 rounded-lg ${isPrimary ? "bg-white/20" : "bg-[#8B9FE8]/10"}`}>
                    <Icon size={20} className={isPrimary ? "text-white" : "text-[#8B9FE8]"} />
                </div>
                <div>
                    <h3 className={`font-semibold text-lg ${isPrimary ? "text-white" : "text-white"}`}>{title}</h3>
                    <p className={`text-xs ${isPrimary ? "text-white/80" : "text-zinc-500"}`}>{sub}</p>
                </div>
            </div>
            <MoreHorizontal size={20} className={isPrimary ? "text-white/70" : "text-zinc-600"} />
        </div>

        <div>
            <div className="flex items-center gap-3 mb-1 ml-6">
                <h2 className="text-3xl tracking-tight font-bold font-mono">
                    <AnimatedCounter value={value} />
                </h2>
                {trend && (
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${isPrimary ? "bg-white text-black" : "bg-[#8B9FE8]/10 text-[#8B9FE8]"}`}>
                        <ArrowUpRight size={12} />
                        {trend}
                    </span>
                )}
            </div>
            <div className={`flex h-10 px-6 items-center bg-gradient-to-r from-transparent via-white/10 to-white/50 w-full justify-between mt-3 ${isPrimary ? "text-white" : "text-zinc-400"}`}>
                <span className="text-sm font-medium">{isPrimary ? "See details" : "View summary"}</span>
                <ArrowRight size={16} />
            </div>
        </div>

        {isPrimary && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full pointer-events-none" />
        )}
    </motion.div>
);

// ── Chart Bar (day10 pattern) ─────────────────────────────────
const ChartBar = ({ height, label, active, value }: { height: number; label: string; active?: boolean; value?: number }) => (
    <div className="flex flex-col items-center gap-3 flex-1 h-full justify-end group overflow-visible relative">
        {active && value !== undefined && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-16 bg-gradient-to-tr from-[#0a0a0f] to-[#1a1a26] backdrop-blur-md border border-[#2a2a40] p-2 rounded-lg shadow-xl z-20 pointer-events-none whitespace-nowrap"
            >
                <div className="text-[10px] text-zinc-400">{label}</div>
                <div className="text-xs text-white font-bold font-mono">{value} incidents</div>
            </motion.div>
        )}

        <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 2, delay: 0.4, ease: "circOut" }}
            className={`w-full rounded-t-lg relative group-hover:opacity-80 transition-opacity ${active
                ? "bg-gradient-to-t from-white/90 via-[#8B9FE8] to-[#4F46E5] shadow-[0_0_20px_rgba(139,159,232,0.3)]"
                : "bg-gradient-to-t from-transparent via-white/5 to-white/20"
                }`}
        >
            {active && (
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#8B9FE8] rounded-full border-2 border-white" />
            )}
        </motion.div>
        <span className="text-xs text-zinc-500 font-medium">{label}</span>
    </div>
);

// ── Mock Agent Learnings Data ────────────────────────────────
const MOCK_LEARNINGS = [
    {
        id: 'l1', timestamp: '2 hours ago',
        pattern: 'Auth-service latency spikes consistently 2 minutes after a Redis cache clear event.',
        strategy: 'Pre-warm authentication cache 5 minutes before any scheduled cache maintenance window.',
        prevention: 'Deployed an automatic cache warm-up job. Reduced auth-related P99 from 2400ms to 180ms.',
        confidence: 0.92, incidents: 14,
    },
    {
        id: 'l2', timestamp: '6 hours ago',
        pattern: 'Database connection pool exhaustion correlates with batch ETL jobs during peak traffic.',
        strategy: 'Reschedule ETL batch jobs to off-peak windows (02:00–04:00 UTC).',
        prevention: 'Added dedicated connection pool for ETL workers. Max connections capped at 20 for ETL vs 80 for app.',
        confidence: 0.87, incidents: 8,
    },
    {
        id: 'l3', timestamp: '1 day ago',
        pattern: 'Stripe API timeouts cluster around the 15th and 30th of each month.',
        strategy: 'Implement progressive retry with circuit breaker on Stripe API bridge.',
        prevention: 'Added circuit breaker with 5s timeout, 3 retries, exponential backoff.',
        confidence: 0.78, incidents: 22,
    },
    {
        id: 'l4', timestamp: '2 days ago',
        pattern: 'S3 bucket permission errors spike after IAM policy deployments.',
        strategy: 'Add 60-second stabilization delay after IAM policy changes.',
        prevention: 'Integrated IAM change detection into deployment pipeline with S3 health-check gates.',
        confidence: 0.95, incidents: 6,
    },
    {
        id: 'l5', timestamp: '3 days ago',
        pattern: 'Redis OOM preceded by gradual memory climb when eviction policy is noeviction.',
        strategy: 'Switch Redis eviction policy to allkeys-lru, maxmemory to 80% RAM.',
        prevention: 'Deployed Redis Sentinel with OOM prediction alerting at 70%.',
        confidence: 0.91, incidents: 11,
    },
];

// ── Main Dashboard ────────────────────────────────────────────
export default function DashboardPage() {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
    const [activeTab, setActiveTab] = useState<'situation' | 'learnings'>('situation');
    const [triggerStatus, setTriggerStatus] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState('');
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Clock
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toISOString().split("T")[1].split(".")[0] + " UTC");
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Fetch incidents
    const fetchIncidents = useCallback(async () => {
        try {
            const res = await fetch('/api/incidents');
            if (res.ok) {
                const data = await res.json() as Incident[];
                setIncidents(data);
            }
        } catch {
            // next poll retries
        }
        setLoading(false);
    }, []);

    useEffect(() => { fetchIncidents(); }, [fetchIncidents]);

    useEffect(() => {
        pollRef.current = setInterval(fetchIncidents, 3000);
        return () => { if (pollRef.current) clearInterval(pollRef.current); };
    }, [fetchIncidents]);

    // ── Computed ──────────────────────────────────────────────
    const filtered = incidents.filter(i => {
        if (filter === 'active') return !['resolved', 'failed'].includes(i.status);
        if (filter === 'resolved') return i.status === 'resolved';
        return true;
    });

    const activeCount = incidents.filter(i => !['resolved', 'failed'].includes(i.status)).length;
    const pendingCount = incidents.filter(i => i.status === 'pending_approval').length;
    const resolvedCount = incidents.filter(i => i.status === 'resolved').length;
    const highRiskCount = incidents.filter(i => i.severity === 'critical').length;

    // Chart data — last 7 time windows
    const chartData = [
        { h: Math.max(10, Math.min(90, activeCount * 15 + 20)), l: "T-6", v: Math.round(activeCount * 0.3) },
        { h: Math.max(10, Math.min(90, resolvedCount * 10 + 15)), l: "T-5", v: Math.round(resolvedCount * 0.5) },
        { h: Math.max(10, Math.min(90, highRiskCount * 20 + 25)), l: "T-4", v: highRiskCount },
        { h: Math.max(10, Math.min(90, pendingCount * 18 + 30)), l: "T-3", v: pendingCount },
        { h: Math.max(10, Math.min(90, incidents.length * 8 + 10)), l: "T-2", v: Math.round(incidents.length * 0.7) },
        { h: Math.max(10, Math.min(90, activeCount * 12 + 35)), l: "T-1", v: activeCount, active: true },
        { h: Math.max(10, Math.min(90, incidents.length * 5 + 20)), l: "Now", v: incidents.length },
    ];

    // ── Fire mock ────────────────────────────────────────────
    async function fireMockIncident() {
        setTriggerStatus('Firing...');
        try {
            const shuffled = [...INCIDENT_POOL].sort(() => Math.random() - 0.5);
            const picks = shuffled.slice(0, 2);
            const results = await Promise.all(
                picks.map(pick =>
                    fetch('/api/webhook', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            source: pick.source,
                            severity: pick.severity,
                            idempotency_key: `mock-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
                            metadata: {
                                cpu_percent: Math.round(30 + Math.random() * 70),
                                memory_percent: Math.round(40 + Math.random() * 55),
                                rps: Math.round(800 + Math.random() * 4200),
                                error_rate: +(Math.random() * 0.08).toFixed(4),
                                latency_p99_ms: Math.round(200 + Math.random() * 1800),
                            },
                        }),
                    }).then(r => r.json() as Promise<{ status?: string; error?: string }>)
                )
            );

            const anySuccess = results.some(r => r.status === 'processed' || r.status === 'safe_mode');
            if (anySuccess) {
                setTriggerStatus('✅ 2 incidents deployed');
                fetchIncidents();
            } else {
                setTriggerStatus(`⚠️ ${results[0]?.error ?? 'Unknown'}`);
            }
            setTimeout(() => setTriggerStatus(null), 4000);
        } catch (e) {
            setTriggerStatus(`❌ ${(e as Error).message}`);
            setTimeout(() => setTriggerStatus(null), 4000);
        }
    }

    return (
        <div className="flex h-screen bg-[#050505] text-zinc-300 overflow-hidden selection:bg-[#8B9FE8]/30">
            {/* ═══ Sidebar (day10 pattern) ═══ */}
            <motion.aside
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-64 flex flex-col bg-[#08060E] py-6 px-4 shrink-0 z-20 border-r border-white/5"
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-[#8B9FE8] flex items-center justify-center text-white text-sm font-bold">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">AEGIS SRE</span>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-2.5 text-zinc-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search incidents..."
                        className="w-full bg-white/5 border border-[#2a2a40] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#8B9FE8]/50 transition-colors text-white placeholder:text-zinc-600"
                    />
                    <div className="absolute right-3 top-2.5 text-xs text-zinc-500 border border-[#2a2a40] px-1 rounded">⌘ K</div>
                </div>

                {/* Nav Items */}
                <div className="flex-1 overflow-y-auto space-y-1">
                    <SidebarItem icon={LayoutDashboard} label="Situation Room" active={activeTab === 'situation'} />
                    <SidebarItem icon={Brain} label="Agent Learnings" active={activeTab === 'learnings'} count={MOCK_LEARNINGS.length} />
                    <SidebarItem icon={ShieldAlert} label="Incidents" count={incidents.length} />
                    <SidebarItem icon={Activity} label="Metrics" />
                    <div className="pt-6 pb-2 px-4 text-xs font-semibold text-zinc-600 uppercase tracking-wider">System</div>
                    <SidebarItem icon={RefreshCw} label="Deployments" />
                    <SidebarItem icon={FileText} label="Reports" />
                    <SidebarItem icon={Settings} label="Settings" />
                </div>

                {/* Fire Mock CTA */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[#12121a] to-[#1a1a26] border border-[#2a2a40] relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h4 className="text-white font-semibold flex items-center gap-2">
                            Fire Incident <span className="text-lg">⚡</span>
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1 mb-4 leading-relaxed">
                            Deploy 2 mock incidents to test the SG-1 pipeline
                        </p>
                        <div className="flex gap-2">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={fireMockIncident}
                                disabled={triggerStatus === 'Firing...'}
                                className="bg-gradient-to-r from-[#8B9FE8] to-[#4F46E5] text-white text-xs px-3 py-1.5 rounded-lg shadow-lg shadow-[#8B9FE8]/20 cursor-pointer disabled:opacity-50"
                                id="fire-mock-incident"
                            >
                                {triggerStatus ?? 'Deploy'}
                            </motion.button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="text-zinc-400 text-xs font-medium px-2 py-1.5 hover:text-white cursor-pointer flex items-center gap-1"
                            >
                                <ArrowLeft size={12} /> Home
                            </button>
                        </div>
                    </div>
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#8B9FE8]/20 blur-2xl rounded-full" />
                </motion.div>
            </motion.aside>

            {/* ═══ Main Content (day10 pattern) ═══ */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#050505]">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-8 shrink-0 border-b border-white/5">
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <div className="p-1 rounded bg-[#12121a] hover:bg-[#1a1a26] cursor-pointer"><ArrowRight size={14} className="rotate-180" /></div>
                        <span>AEGIS</span>
                        <span className="text-zinc-700">/</span>
                        <span className="text-white font-medium">Command Center</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            {[HelpCircle, Bell].map((Icon, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(139,159,232,0.1)" }}
                                    className="p-2 rounded-full text-zinc-400 transition-colors cursor-pointer"
                                >
                                    <Icon size={18} />
                                </motion.button>
                            ))}
                        </div>

                        {/* Live + Model badges */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12121a] border border-[#2a2a40] text-[11px] text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            LIVE
                        </div>
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B9FE8]/10 border border-[#8B9FE8]/30 text-[11px] text-[#8B9FE8] font-mono">
                            llama-3.3-70b
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12121a] border border-[#2a2a40] text-[11px] text-zinc-400 font-mono">
                            <Clock size={12} /> {currentTime || "00:00:00 UTC"}
                        </div>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-8 pt-5 rounded-tl-2xl bg-gradient-to-b from-[#0a0a0f] via-[#08060E] to-[#0a0a0f]">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-7xl mx-auto space-y-6"
                    >
                        {/* Page Title + Controls */}
                        <div className="flex justify-between items-end mb-4">
                            <motion.div variants={itemVariants}>
                                <h1 className="text-2xl font-bold text-white mb-1">SG-1 Command Center</h1>
                                <p className="text-zinc-500 text-sm">Real-time incident management and autonomous remediation</p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex gap-2">
                                {/* Tab toggle */}
                                <div className="flex bg-[#12121a] rounded-lg p-1 border border-[#2a2a40]">
                                    <button
                                        onClick={() => setActiveTab('situation')}
                                        className={`text-xs px-3 py-1.5 rounded-md transition-all cursor-pointer ${activeTab === 'situation' ? 'bg-[#8B9FE8] text-white' : 'text-zinc-400 hover:text-white'}`}
                                    >
                                        Situation Room
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('learnings')}
                                        className={`text-xs px-3 py-1.5 rounded-md transition-all cursor-pointer ${activeTab === 'learnings' ? 'bg-[#8B9FE8] text-white' : 'text-zinc-400 hover:text-white'}`}
                                    >
                                        Agent Learnings
                                    </button>
                                </div>
                                <button
                                    onClick={fetchIncidents}
                                    className="flex items-center gap-2 bg-[#12121a] text-zinc-400 text-sm px-4 py-2 rounded-lg border border-[#2a2a40] hover:bg-[#1a1a26] transition-colors cursor-pointer"
                                >
                                    <RefreshCw size={14} /> Refresh
                                </button>
                            </motion.div>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === 'situation' ? (
                                <motion.div key="situation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                    {/* ── Stat Cards (day10 grid) ── */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <StatCard
                                            title="Active Incidents"
                                            sub="Pipeline Overview"
                                            value={activeCount}
                                            icon={AlertTriangle}
                                            isPrimary={true}
                                            trend={activeCount > 0 ? `${activeCount} active` : undefined}
                                        />
                                        <StatCard
                                            title="Pending Approval"
                                            sub="Human-in-the-Loop"
                                            value={pendingCount}
                                            icon={Clock}
                                            trend={pendingCount > 0 ? `${pendingCount} waiting` : undefined}
                                        />
                                        <StatCard
                                            title="Resolved"
                                            sub="Successfully Remediated"
                                            value={resolvedCount}
                                            icon={CheckCircle2}
                                            trend={resolvedCount > 0 ? `${resolvedCount} closed` : undefined}
                                        />
                                    </div>

                                    {/* ── Middle Row: Severity + Incident Flow Chart ── */}
                                    <div className="grid grid-cols-12 gap-6 h-[380px]">
                                        {/* Severity Breakdown (left — like "My Wallet") */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="col-span-5 flex flex-col h-full bg-[#08060E] rounded-2xl p-6 border border-white/5 relative"
                                        >
                                            <div
                                                className="absolute inset-0 z-0"
                                                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 159, 232, 0.08), transparent 70%)" }}
                                            />
                                            <div className="flex relative z-5 justify-between items-center mb-6">
                                                <div>
                                                    <h3 className="text-white font-semibold">Risk Overview</h3>
                                                    <p className="text-xs text-zinc-500 mt-1">{incidents.length} total incidents tracked</p>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={fireMockIncident}
                                                    disabled={triggerStatus === 'Firing...'}
                                                    className="bg-[#8B9FE8] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-[#8B9FE8]/20 cursor-pointer disabled:opacity-50"
                                                >
                                                    <Zap size={14} /> {triggerStatus ?? 'Fire Incident'}
                                                </motion.button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 flex-1 relative z-5">
                                                {[
                                                    { label: 'Critical', count: highRiskCount, color: 'text-red-400', borderColor: 'border-red-500/30', bgColor: 'bg-red-500/5', icon: '🔴' },
                                                    { label: 'Warning', count: incidents.filter(i => i.severity === 'warning').length, color: 'text-orange-400', borderColor: 'border-orange-500/30', bgColor: 'bg-orange-500/5', icon: '🟠' },
                                                    { label: 'Active', count: activeCount, color: 'text-[#8B9FE8]', borderColor: 'border-[#8B9FE8]/30', bgColor: 'bg-[#8B9FE8]/5', icon: '🔵' },
                                                    { label: 'Resolved', count: resolvedCount, color: 'text-emerald-400', borderColor: 'border-emerald-500/30', bgColor: 'bg-emerald-500/5', icon: '🟢' },
                                                ].map((item) => (
                                                    <motion.div
                                                        key={item.label}
                                                        whileHover={{ scale: 1.02 }}
                                                        className={`p-4 rounded-xl border flex flex-col justify-between min-h-[100px] relative overflow-hidden bg-gradient-to-tr from-[#0a0a0f] to-[#12121a] ${item.borderColor}`}
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className="text-xl">{item.icon}</span>
                                                            <MoreHorizontal size={14} className="text-zinc-700" />
                                                        </div>
                                                        <div>
                                                            <h4 className={`text-xl font-bold font-mono ${item.color}`}>
                                                                <AnimatedCounter value={item.count} />
                                                            </h4>
                                                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{item.label}</p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* Incident Flow Chart (right — like "Cash Flow") */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="col-span-7 bg-[#0a0a0f] rounded-2xl p-6 border border-white/5 flex flex-col relative"
                                        >
                                            <div
                                                className="absolute inset-0 -top-30 z-0 blur-[50px]"
                                                style={{
                                                    background: `radial-gradient(circle at 50% 50%, 
                                                        rgba(139, 159, 232, 0.12) 0%, 
                                                        rgba(139, 159, 232, 0.06) 25%, 
                                                        transparent 50%)`,
                                                }}
                                            />
                                            <div className="flex justify-between items-start mb-8 relative z-10">
                                                <div>
                                                    <span className="text-sm text-zinc-400">Incident Flow</span>
                                                    <h2 className="text-3xl text-white mt-1 font-bold font-mono">
                                                        <AnimatedCounter value={incidents.length} />
                                                        <span className="text-lg text-zinc-500 ml-2">total</span>
                                                    </h2>
                                                </div>
                                                <div className="flex bg-[#12121a] rounded-lg p-1 border border-[#2a2a40]">
                                                    {(['all', 'active', 'resolved'] as const).map(f => (
                                                        <button
                                                            key={f}
                                                            onClick={() => setFilter(f)}
                                                            className={`text-xs px-3 py-1 rounded-md transition-all cursor-pointer ${filter === f ? 'bg-[#8B9FE8] text-white' : 'text-zinc-400 hover:text-white'}`}
                                                        >
                                                            {f.charAt(0).toUpperCase() + f.slice(1)}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex-1 flex items-end gap-2 relative pl-8 pb-6 z-10">
                                                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-zinc-600 py-2 font-mono">
                                                    <span>10</span><span>8</span><span>6</span><span>4</span><span>2</span><span>0</span>
                                                </div>
                                                {chartData.map((d, i) => (
                                                    <ChartBar key={i} height={d.h} label={d.l} active={d.active} value={d.v} />
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* ── Incident Table (day10 pattern) ── */}
                                    <motion.div
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="bg-[#08060E] rounded-2xl relative border border-white/5 p-6"
                                    >
                                        <div className="absolute inset-0 z-0 rounded-2xl" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 159, 232, 0.06), transparent 70%)" }} />
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                                    Incident Log
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#8B9FE8]/10 text-[#8B9FE8] border border-[#8B9FE8]/30">{filtered.length}</span>
                                                </h3>
                                                <div className="flex gap-3">
                                                    <div className="relative">
                                                        <Search className="absolute left-3 top-2.5 text-zinc-500" size={14} />
                                                        <input
                                                            type="text"
                                                            placeholder="Search"
                                                            className="bg-[#12121a] border border-[#2a2a40] rounded-lg py-2 pl-9 pr-4 text-xs w-64 focus:border-[#8B9FE8]/50 focus:outline-none text-white placeholder:text-zinc-600"
                                                        />
                                                    </div>
                                                    <button className="flex items-center gap-2 px-3 py-2 bg-[#12121a] border border-[#2a2a40] rounded-lg text-xs text-zinc-400 hover:text-white cursor-pointer">
                                                        <Filter size={14} /> Filter
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Table header */}
                                            <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#12121a]/50 rounded-lg text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                                                <div className="col-span-4 pl-2">Source</div>
                                                <div className="col-span-2">Severity</div>
                                                <div className="col-span-2">Status</div>
                                                <div className="col-span-2">Time</div>
                                                <div className="col-span-2">Risk</div>
                                            </div>

                                            {/* Table rows */}
                                            {loading ? (
                                                <div className="flex items-center justify-center py-16 text-zinc-500">
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="w-8 h-8 border-2 border-[#8B9FE8]/30 border-t-[#8B9FE8] rounded-full animate-spin" />
                                                        <span className="text-xs font-mono">CONNECTING TO SUPABASE...</span>
                                                    </div>
                                                </div>
                                            ) : filtered.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center py-16 gap-4 text-zinc-500">
                                                    <div className="w-12 h-12 rounded-xl bg-[#12121a] border border-[#2a2a40] flex items-center justify-center text-2xl">🛡</div>
                                                    <p className="text-sm">No incidents. Fire a mock incident to test SG-1.</p>
                                                </div>
                                            ) : (
                                                filtered.map((incident, index) => {
                                                    const risk = getRiskTier(incident.severity);
                                                    const action = getActionBadge(incident.status);
                                                    return (
                                                        <motion.div
                                                            key={incident.id}
                                                            initial={{ opacity: 0, x: -15, filter: "blur(30px)" }}
                                                            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                                            transition={{ delay: 0.1 + (index * 0.04) }}
                                                            onClick={() => window.open(`/incidents/${incident.id}`, '_self')}
                                                            className={`grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-white/5 rounded-lg transition-colors cursor-pointer ${index < filtered.length - 1 ? 'border-b border-[#2a2a40]/50' : ''}`}
                                                        >
                                                            <div className="col-span-4 flex items-center gap-3">
                                                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${risk.tier === 'high' ? 'bg-red-500 animate-pulse' : risk.tier === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                                                                <span className="text-sm font-medium text-white truncate">{incident.source}</span>
                                                            </div>
                                                            <div className="col-span-2"><span className={risk.cls}>{risk.label}</span></div>
                                                            <div className="col-span-2"><span className={action.cls}>{action.label}</span></div>
                                                            <div className="col-span-2 text-sm text-zinc-400 font-mono">{timeAgo(incident.created_at)}</div>
                                                            <div className="col-span-2">
                                                                <span className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border w-fit ${risk.tier === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' : risk.tier === 'medium' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                                                    <div className={`w-1.5 h-1.5 rounded-full ${risk.tier === 'high' ? 'bg-red-500' : risk.tier === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                                                                    {risk.tier.toUpperCase()}
                                                                </span>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                /* ══════ Agent Learnings Tab ══════ */
                                <motion.div key="learnings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-lg bg-[#8B9FE8]/15 border border-[#8B9FE8]/30 flex items-center justify-center text-[#8B9FE8] text-sm">🧠</span>
                                                Agent Learnings Hub
                                            </h2>
                                            <p className="text-xs text-zinc-500 mt-1">Patterns recognized across {MOCK_LEARNINGS.reduce((a, l) => a + l.incidents, 0)} incidents — the agent&apos;s persistent journal of wisdom</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            {MOCK_LEARNINGS.length} patterns learned
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[#8B9FE8]/40 via-[#4F46E5]/20 to-transparent" />
                                        <div className="space-y-4">
                                            {MOCK_LEARNINGS.map((learning, idx) => (
                                                <motion.div
                                                    key={learning.id}
                                                    initial={{ opacity: 0, x: -15, filter: "blur(20px)" }}
                                                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                                    className="relative pl-12"
                                                >
                                                    <div className="absolute left-[12px] top-5 w-[15px] h-[15px] rounded-full border-2 border-[#8B9FE8]/60 bg-[#050505] flex items-center justify-center">
                                                        <div className="w-[5px] h-[5px] rounded-full bg-[#8B9FE8]" />
                                                    </div>
                                                    <div className="bg-[#08060E] border border-white/5 rounded-xl p-5 relative overflow-hidden hover:border-[#8B9FE8]/30 transition-all hover:-translate-y-0.5">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <span className="text-[10px] font-mono text-zinc-500">{learning.timestamp}</span>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[10px] font-mono text-zinc-500">{learning.incidents} incidents</span>
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className="w-16 h-1 rounded-full bg-[#12121a] overflow-hidden">
                                                                        <motion.div
                                                                            initial={{ width: 0 }}
                                                                            whileInView={{ width: `${learning.confidence * 100}%` }}
                                                                            transition={{ duration: 1, delay: idx * 0.1 }}
                                                                            className="h-full rounded-full bg-[#8B9FE8]"
                                                                        />
                                                                    </div>
                                                                    <span className="text-[10px] font-mono text-[#8B9FE8]">{Math.round(learning.confidence * 100)}%</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <div>
                                                                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500 mb-2 flex items-center gap-2">
                                                                    <span className="w-1 h-1 rounded-full bg-red-400" /> Pattern Recognized
                                                                </div>
                                                                <p className="text-sm text-white leading-relaxed">{learning.pattern}</p>
                                                            </div>
                                                            <div>
                                                                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500 mb-2 flex items-center gap-2">
                                                                    <span className="w-1 h-1 rounded-full bg-emerald-400" /> Healing Strategy
                                                                </div>
                                                                <p className="text-sm text-zinc-400 leading-relaxed">{learning.strategy}</p>
                                                            </div>
                                                            <div>
                                                                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500 mb-2 flex items-center gap-2">
                                                                    <span className="w-1 h-1 rounded-full bg-[#8B9FE8]" /> Global Prevention
                                                                </div>
                                                                <p className="text-sm text-zinc-400 leading-relaxed">{learning.prevention}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
