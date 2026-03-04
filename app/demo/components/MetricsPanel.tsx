'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, HardDrive, Wifi, Globe, Server, Clock, Zap } from 'lucide-react';

interface MetricPoint { time: string; value: number; }

function MiniChart({ data, color, height = 40 }: { data: number[]; color: string; height?: number }) {
    const max = Math.max(...data, 1);
    const min = Math.min(...data, 0);
    const range = max - min || 1;
    const w = 100;
    const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${height - ((v - min) / range) * height}`).join(' ');
    return (
        <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
            <defs><linearGradient id={`g-${color}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.3" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
            <polygon points={`0,${height} ${points} ${w},${height}`} fill={`url(#g-${color})`} />
            <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
    );
}

function genTimeSeries(base: number, variance: number, chaos: boolean, len: number = 20): number[] {
    return Array.from({ length: len }, () => {
        const v = chaos ? base * (2 + Math.random() * 3) : base + (Math.random() - 0.5) * variance;
        return Math.max(0, Math.round(v * 100) / 100);
    });
}

export default function MetricsPanel({ hasChaos, healthScore }: { hasChaos: boolean; healthScore: number }) {
    const [tick, setTick] = useState(0);
    useEffect(() => { const iv = setInterval(() => setTick(t => t + 1), 3000); return () => clearInterval(iv); }, []);

    const rpsData = genTimeSeries(3200, 400, hasChaos);
    const latencyData = genTimeSeries(65, 25, hasChaos);
    const errorData = genTimeSeries(0.02, 0.01, hasChaos);
    const cpuData = genTimeSeries(35, 10, hasChaos);
    const memData = genTimeSeries(52, 8, hasChaos);
    const diskData = genTimeSeries(41, 5, hasChaos);

    const currentRps = rpsData[rpsData.length - 1];
    const currentLatency = latencyData[latencyData.length - 1];
    const currentError = errorData[errorData.length - 1];
    const currentCpu = cpuData[cpuData.length - 1];
    const currentMem = memData[memData.length - 1];
    const currentDisk = diskData[diskData.length - 1];

    const uptime = hasChaos ? '99.2%' : '99.99%';

    return (
        <div className="space-y-6">
            {/* Top status bar */}
            <div className="flex flex-wrap items-center gap-4 bg-[#0A0C10] rounded-xl border border-white/5 p-4">
                <div className="flex items-center gap-2"><div className={`w-2.5 h-2.5 rounded-full ${hasChaos ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} /><span className="text-sm font-semibold text-white">System Status</span><span className={`text-xs font-mono px-2 py-0.5 rounded-full ${hasChaos ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>{hasChaos ? 'DEGRADED' : 'OPERATIONAL'}</span></div>
                <div className="ml-auto flex items-center gap-4 text-xs text-zinc-500 font-mono">
                    <span className="flex items-center gap-1"><Globe size={12} /> Uptime: <span className={hasChaos ? 'text-orange-400' : 'text-emerald-400'}>{uptime}</span></span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {new Date().toLocaleTimeString()}</span>
                </div>
            </div>

            {/* Main metrics grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Requests / Second', value: currentRps.toLocaleString(), data: rpsData, color: '#00D1FF', icon: <Zap size={14} />, unit: 'rps', bad: hasChaos },
                    { label: 'P99 Latency', value: `${currentLatency}`, data: latencyData, color: hasChaos ? '#ef4444' : '#10b981', icon: <Activity size={14} />, unit: 'ms', bad: currentLatency > 200 },
                    { label: 'Error Rate', value: `${currentError}`, data: errorData, color: currentError > 1 ? '#ef4444' : '#10b981', icon: <Wifi size={14} />, unit: '%', bad: currentError > 1 },
                ].map(m => (
                    <div key={m.label} className="bg-[#0A0C10] rounded-xl border border-white/5 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] text-zinc-500 font-mono uppercase flex items-center gap-1.5">{m.icon} {m.label}</span>
                            <span className={`text-sm font-bold font-mono ${m.bad ? 'text-red-400' : 'text-white'}`}>{m.value}<span className="text-zinc-500 text-[10px] ml-1">{m.unit}</span></span>
                        </div>
                        <MiniChart data={m.data} color={m.color} height={50} />
                    </div>
                ))}
            </div>

            {/* Infrastructure metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'CPU Usage', value: currentCpu, data: cpuData, color: currentCpu > 80 ? '#ef4444' : '#00D1FF', icon: <Cpu size={14} />, threshold: 80 },
                    { label: 'Memory', value: currentMem, data: memData, color: currentMem > 85 ? '#ef4444' : '#8b5cf6', icon: <Server size={14} />, threshold: 85 },
                    { label: 'Disk I/O', value: currentDisk, data: diskData, color: currentDisk > 75 ? '#ef4444' : '#f59e0b', icon: <HardDrive size={14} />, threshold: 75 },
                ].map(m => (
                    <div key={m.label} className="bg-[#0A0C10] rounded-xl border border-white/5 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] text-zinc-500 font-mono uppercase flex items-center gap-1.5">{m.icon} {m.label}</span>
                            <span className={`text-sm font-bold font-mono ${m.value > m.threshold ? 'text-red-400' : 'text-white'}`}>{m.value}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden mb-2">
                            <motion.div animate={{ width: `${m.value}%` }} transition={{ duration: 0.6 }} className="h-full rounded-full" style={{ background: m.color }} />
                        </div>
                        <MiniChart data={m.data} color={m.color} height={35} />
                    </div>
                ))}
            </div>

            {/* Service health grid */}
            <div className="bg-[#0A0C10] rounded-xl border border-white/5 p-4">
                <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-3">Service Health</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                        { name: 'API Gateway', status: hasChaos ? 'degraded' : 'healthy' },
                        { name: 'PostgreSQL', status: hasChaos ? 'degraded' : 'healthy' },
                        { name: 'Redis Cache', status: hasChaos ? 'unhealthy' : 'healthy' },
                        { name: 'CDN (CloudFront)', status: hasChaos ? 'degraded' : 'healthy' },
                        { name: 'Auth Service', status: 'healthy' },
                        { name: 'Payment Gateway', status: hasChaos ? 'degraded' : 'healthy' },
                        { name: 'Search (Elastic)', status: 'healthy' },
                        { name: 'Object Storage', status: 'healthy' },
                    ].map(svc => (
                        <div key={svc.name} className="flex items-center gap-2 bg-white/[0.02] rounded-lg px-3 py-2">
                            <div className={`w-2 h-2 rounded-full ${svc.status === 'healthy' ? 'bg-emerald-500' : svc.status === 'degraded' ? 'bg-orange-500 animate-pulse' : 'bg-red-500 animate-pulse'}`} />
                            <span className="text-xs text-zinc-300">{svc.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
