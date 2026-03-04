'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMockOrders, getCRMStats, type MockOrder, getEventById } from '@/lib/simulation';
import {
    Package, CreditCard, AlertTriangle, TrendingUp, CheckCircle2,
    XCircle, Loader2, DollarSign, Clock, MapPin,
    MessageCircle, Send, User, Headphones,
} from 'lucide-react';

const statusIcons: Record<string, React.ReactNode> = {
    completed: <CheckCircle2 size={12} className="text-emerald-400" />,
    shipped: <Package size={12} className="text-blue-400" />,
    processing: <Loader2 size={12} className="text-yellow-400 animate-spin" />,
    failed: <XCircle size={12} className="text-red-400" />,
    refunded: <DollarSign size={12} className="text-zinc-400" />,
    succeeded: <CheckCircle2 size={12} className="text-emerald-400" />,
    pending: <Loader2 size={12} className="text-yellow-400 animate-spin" />,
};

const NAMES = [
    'Marcus J.', 'Sarah C.', 'James P.', 'Emma R.', 'Tyler B.',
    'Olivia K.', 'Kevin O.', 'Diana P.', 'Aisha M.', 'DeAndre W.',
    'Priya S.', 'Carlos M.', 'Hana T.', 'Jamal K.', 'Lily Z.',
];

const COMPLAINTS: Record<string, string[]> = {
    payment: [
        'my payment keeps failing wtf', 'checkout wont go through', 'card keeps getting declined??',
        'payment stuck on processing', 'cant pay for my order fix this', 'yo my payment just crashed',
        'been trying to checkout for 10 mins', 'payment page just shows error',
    ],
    database: [
        'site wont load at all', 'everything is down rn', 'getting 500 errors everywhere',
        'cant even see the homepage', 'your whole site crashed', 'nothing loads just errors',
        'been getting server errors for 5 mins', 'is your site down??',
    ],
    cdn: [
        'none of the images load', 'cant see any of the shoes', 'all product pics are broken',
        'whole site looks broken no images', 'pictures wont show up', 'just seeing blank boxes',
        'every single image is missing', 'site looks like trash rn',
    ],
    dns: [
        'page wont load keeps timing out', 'site not responding', 'cant reach your website at all',
        'getting connection timeout', 'links are all broken', 'nothing loads',
        'i click and nothing happens', 'your site is completely dead',
    ],
    auth: [
        'cant login to my account', 'login page just spins forever', 'my session keeps expiring',
        'logged me out wont let me back in', 'authentication failed wont go away',
        'cant sign in at all', 'password is right but it says invalid',
    ],
    cache: [
        'prices showing wrong on everything', 'some shoes showing $0??', 'old prices still there',
        'cart total is completely wrong', 'prices are all messed up', 'different price every refresh',
    ],
    default: [
        'your site is broken fix it', 'nothing works', 'im going to another store',
        'how long is this gonna take', 'this is ridiculous', 'worst shopping experience ever',
        'been having issues for a while now', 'can someone actually help me',
    ],
};

const RESOLUTIONS = [
    'okay its working now thanks', 'finally took long enough', 'alright seems fixed',
    'yep its back up', 'cool it loaded', 'works now appreciate it',
];

function getComplaintCategory(desc: string): string {
    const d = desc.toLowerCase();
    if (d.includes('payment')) return 'payment';
    if (d.includes('database') || d.includes('connection pool') || d.includes('disk')) return 'database';
    if (d.includes('cdn') || d.includes('image')) return 'cdn';
    if (d.includes('dns') || d.includes('resolution')) return 'dns';
    if (d.includes('auth') || d.includes('login') || d.includes('session')) return 'auth';
    if (d.includes('cache') || d.includes('price')) return 'cache';
    return 'default';
}

function pickComplaint(desc: string): string {
    const pool = COMPLAINTS[getComplaintCategory(desc)];
    return pool[Math.floor(Math.random() * pool.length)];
}

interface ChatMessage { id: string; sender: 'customer' | 'agent'; text: string; timestamp: string; }
interface Conversation { id: string; customerName: string; chaosEventId: string; status: 'open' | 'resolved'; messages: ChatMessage[]; unread: number; }

// ─── localStorage helpers ─────────────────────────────────
const STORAGE_KEY = 'aegis_crm_convos';
function loadConvos(): Conversation[] {
    try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : []; } catch { return []; }
}
function saveConvos(c: Conversation[]) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); } catch { /* */ }
}
function loadNameIdx(): number {
    try { const d = localStorage.getItem('aegis_crm_nameidx'); return d ? parseInt(d) : 0; } catch { return 0; }
}
function saveNameIdx(n: number) {
    try { localStorage.setItem('aegis_crm_nameidx', n.toString()); } catch { /* */ }
}

export default function CRMPanel({ hasChaos, activeChaosIds }: { hasChaos: boolean; activeChaosIds: string[] }) {
    const [orders, setOrders] = useState<MockOrder[]>([]);
    const [tab, setTab] = useState<'orders' | 'payments' | 'support'>('orders');
    // Initialize from localStorage
    const [convs, setConvs] = useState<Conversation[]>(() => loadConvos());
    const [activeId, setActiveId] = useState<string | null>(null);
    const [msg, setMsg] = useState('');
    const [sending, setSending] = useState(false);
    const chatEnd = useRef<HTMLDivElement>(null);
    const nameIdx = useRef(loadNameIdx());
    const healedChaos = useRef(new Set<string>());

    // Save to localStorage whenever convos change
    useEffect(() => { saveConvos(convs); }, [convs]);

    // Orders (separate, doesn't affect convos)
    useEffect(() => {
        setOrders(generateMockOrders(hasChaos));
        const iv = setInterval(() => setOrders(generateMockOrders(hasChaos)), 8000);
        return () => clearInterval(iv);
    }, [hasChaos]);

    useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeId, convs]);

    // ─── CONTINUOUS SPAWNER: every 10s while chaos is active, add a customer ───
    useEffect(() => {
        const iv = setInterval(() => {
            // Only spawn if there's active chaos
            if (activeChaosIds.length === 0) return;
            // Cap at 7
            const currentOpen = convs.filter(c => c.status === 'open').length;
            if (currentOpen >= 7) return;

            // Pick a random active chaos event to complain about
            const randomChaosId = activeChaosIds[Math.floor(Math.random() * activeChaosIds.length)];
            const ev = getEventById(randomChaosId);
            if (!ev) return;

            const name = NAMES[nameIdx.current % NAMES.length];
            nameIdx.current++;
            saveNameIdx(nameIdx.current);

            const text = pickComplaint(ev.description);
            const conv: Conversation = {
                id: `c${Date.now()}${Math.random().toString(36).slice(2, 5)}`,
                customerName: name, chaosEventId: randomChaosId, status: 'open', unread: 1,
                messages: [{ id: `m${Date.now()}`, sender: 'customer', text, timestamp: new Date().toISOString() }],
            };
            setConvs(prev => [conv, ...prev]);
            setActiveId(prev => prev || conv.id);
        }, 10000);
        return () => clearInterval(iv);
        // We read activeChaosIds and convs inside but DON'T want them as deps (would reset timer)
        // Instead we use a trick: re-create interval every time chaos changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeChaosIds.join(',')]);

    // ─── INSTANT first complaint when new chaos arrives ───────
    useEffect(() => {
        if (activeChaosIds.length === 0) return;
        // Spawn one immediately for any new chaos
        const currentOpen = convs.filter(c => c.status === 'open').length;
        if (currentOpen >= 7) return;

        const randomChaosId = activeChaosIds[Math.floor(Math.random() * activeChaosIds.length)];
        const ev = getEventById(randomChaosId);
        if (!ev) return;

        const name = NAMES[nameIdx.current % NAMES.length];
        nameIdx.current++;
        saveNameIdx(nameIdx.current);

        const conv: Conversation = {
            id: `c${Date.now()}${Math.random().toString(36).slice(2, 5)}`,
            customerName: name, chaosEventId: randomChaosId, status: 'open', unread: 1,
            messages: [{ id: `m${Date.now()}`, sender: 'customer', text: pickComplaint(ev.description), timestamp: new Date().toISOString() }],
        };
        setConvs(prev => [conv, ...prev]);
        setActiveId(prev => prev || conv.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeChaosIds.join(',')]);

    // ─── When chaos heals ─────────────────────────────────────
    useEffect(() => {
        const current = new Set(activeChaosIds);
        const healed: string[] = [];
        for (const c of convs) {
            if (c.status === 'open' && !current.has(c.chaosEventId) && !healedChaos.current.has(c.chaosEventId)) {
                healed.push(c.chaosEventId);
            }
        }
        const uniqueHealed = [...new Set(healed)];
        if (uniqueHealed.length === 0) return;
        uniqueHealed.forEach(id => healedChaos.current.add(id));

        setConvs(prev => prev.map(c => {
            if (c.status !== 'open' || !uniqueHealed.includes(c.chaosEventId)) return c;
            const shouldMsg = Math.random() > 0.4;
            return {
                ...c, status: 'resolved' as const,
                messages: shouldMsg ? [...c.messages, {
                    id: `mr${Date.now()}${Math.random()}`, sender: 'customer' as const,
                    text: RESOLUTIONS[Math.floor(Math.random() * RESOLUTIONS.length)],
                    timestamp: new Date().toISOString(),
                }] : c.messages,
            };
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeChaosIds.join(',')]);

    const stats = getCRMStats(orders);
    const activeConv = convs.find(c => c.id === activeId);
    const openCount = convs.filter(c => c.status === 'open').length;

    const handleSend = async () => {
        if (!msg.trim() || !activeConv || sending) return;
        const txt = msg.trim(); setMsg('');
        const am: ChatMessage = { id: `ma${Date.now()}`, sender: 'agent', text: txt, timestamp: new Date().toISOString() };
        setConvs(p => p.map(c => c.id === activeConv.id ? { ...c, messages: [...c.messages, am], unread: 0 } : c));
        setSending(true);
        try {
            const prev = [...activeConv.messages, am].map(m => ({ role: m.sender === 'customer' ? 'customer' : 'agent', text: m.text }));
            const res = await fetch('/api/simulation/customer-message', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'reply', adminMessage: txt, previousMessages: prev }),
            });
            const data = await res.json();
            await new Promise(r => setTimeout(r, 2000 + Math.random() * 2000));
            setConvs(p => p.map(c => c.id === activeConv.id ? {
                ...c, messages: [...c.messages, { id: `mc${Date.now()}`, sender: 'customer' as const, text: data.message || 'whatever just fix it', timestamp: new Date().toISOString() }],
            } : c));
        } catch { /* */ }
        setSending(false);
    };

    const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'REVENUE', value: `$${stats.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: DollarSign, color: 'text-emerald-400' },
                    { label: 'ORDERS', value: stats.total, icon: Package, color: 'text-[#00D1FF]' },
                    { label: 'FAILED PAYMENTS', value: stats.failedPayments, icon: AlertTriangle, color: hasChaos ? 'text-red-400' : 'text-zinc-400' },
                    { label: 'FULFILLMENT RATE', value: `${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 100}%`, icon: TrendingUp, color: 'text-emerald-400' },
                ].map(k => (
                    <div key={k.label} className="bg-[#0A0C10] rounded-xl border border-white/5 p-4">
                        <div className="flex items-center gap-2 mb-2"><k.icon size={14} className={k.color} /><span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{k.label}</span></div>
                        <div className={`text-2xl font-bold font-mono ${k.color}`}>{k.value}</div>
                    </div>
                ))}
            </div>
            <div className="flex gap-1 bg-[#0A0C10] rounded-xl p-1 border border-white/5">
                {([{ id: 'orders' as const, label: 'Live Orders', icon: Package }, { id: 'payments' as const, label: 'Payments', icon: CreditCard }, { id: 'support' as const, label: 'Customer Service', icon: Headphones }]).map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${tab === t.id ? 'bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30' : 'text-zinc-500 hover:text-white'}`}>
                        <t.icon size={14} /> {t.label}
                        {t.id === 'support' && openCount > 0 && <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">{openCount}</span>}
                    </button>
                ))}
            </div>
            <AnimatePresence mode="wait">
                {tab === 'orders' && (
                    <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="bg-[#0A0C10] rounded-xl border border-white/5 overflow-hidden">
                            <div className="grid grid-cols-12 gap-2 px-4 py-3 text-[10px] font-mono text-zinc-500 uppercase tracking-wider border-b border-white/5">
                                <div className="col-span-1">ID</div><div className="col-span-2">CUSTOMER</div><div className="col-span-3">PRODUCT</div><div className="col-span-3">SHIP TO</div><div className="col-span-1">TOTAL</div><div className="col-span-2">STATUS</div>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {orders.map((o, i) => (
                                    <motion.div key={o.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                                        className="grid grid-cols-12 gap-2 px-4 py-3 items-center text-xs border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                                        <div className="col-span-1 font-mono text-zinc-500">{o.id}</div>
                                        <div className="col-span-2"><div className="text-white font-medium truncate">{o.customer.name}</div><div className="text-[10px] text-zinc-500 truncate">{o.customer.email}</div></div>
                                        <div className="col-span-3"><div className="text-zinc-300 truncate">{o.product.name}</div><div className="text-[10px] text-zinc-500">Size {o.size} × {o.quantity}</div></div>
                                        <div className="col-span-3 flex items-center gap-1 text-zinc-400"><MapPin size={10} className="shrink-0" /><span className="truncate">{o.shippingAddress}</span></div>
                                        <div className="col-span-1 font-mono text-white font-medium">${o.total.toFixed(2)}</div>
                                        <div className="col-span-2"><span className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border w-fit ${o.status === 'failed' ? 'bg-red-500/10 text-red-400 border-red-500/20' : o.status === 'processing' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>{statusIcons[o.status]} {o.status}</span></div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
                {tab === 'payments' && (
                    <motion.div key="payments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="bg-[#0A0C10] rounded-xl border border-white/5 overflow-hidden">
                            <div className="grid grid-cols-12 gap-2 px-4 py-3 text-[10px] font-mono text-zinc-500 uppercase tracking-wider border-b border-white/5">
                                <div className="col-span-2">TXN ID</div><div className="col-span-3">METHOD</div><div className="col-span-2">AMOUNT</div><div className="col-span-2">STATUS</div><div className="col-span-3">TIME</div>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {orders.map((o, i) => (
                                    <motion.div key={`p-${o.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                                        className="grid grid-cols-12 gap-2 px-4 py-3 items-center text-xs border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                                        <div className="col-span-2 font-mono text-zinc-500">TXN-{o.id.slice(-5)}</div>
                                        <div className="col-span-3 flex items-center gap-2"><CreditCard size={12} className="text-zinc-500" /><span className="text-zinc-300">{o.paymentMethod}</span></div>
                                        <div className="col-span-2 font-mono text-white">${o.total.toFixed(2)}</div>
                                        <div className="col-span-2"><span className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border w-fit ${o.paymentStatus === 'failed' ? 'bg-red-500/10 text-red-400 border-red-500/20' : o.paymentStatus === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>{statusIcons[o.paymentStatus]} {o.paymentStatus}</span></div>
                                        <div className="col-span-3 flex items-center gap-1 text-zinc-500"><Clock size={10} /> {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
                {tab === 'support' && (
                    <motion.div key="support" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="bg-[#0A0C10] rounded-xl border border-white/5 overflow-hidden flex h-[480px]">
                            <div className="w-[260px] border-r border-white/5 flex flex-col">
                                <div className="p-3 border-b border-white/5"><div className="flex items-center gap-2"><MessageCircle size={14} className="text-[#00D1FF]" /><span className="text-xs font-semibold text-white">Inbox</span>{openCount > 0 && <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full ml-auto">{openCount} open</span>}</div></div>
                                <div className="flex-1 overflow-y-auto">
                                    {convs.length === 0 && <div className="p-6 text-center"><Headphones size={24} className="mx-auto text-zinc-700 mb-2" /><p className="text-[10px] text-zinc-500">No issues yet.<br />Inject chaos to see complaints.</p></div>}
                                    {convs.map(c => {
                                        const last = c.messages[c.messages.length - 1];
                                        return (
                                            <button key={c.id} onClick={() => { setActiveId(c.id); setConvs(p => p.map(x => x.id === c.id ? { ...x, unread: 0 } : x)); }}
                                                className={`w-full text-left px-3 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${activeId === c.id ? 'bg-white/[0.06]' : ''}`}>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm">{c.status === 'resolved' ? '😊' : '😡'}</span>
                                                    <span className="text-xs font-semibold text-white flex-1 truncate">{c.customerName}</span>
                                                    {c.unread > 0 && <span className="bg-red-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">{c.unread}</span>}
                                                    <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'open' ? 'bg-red-400' : 'bg-emerald-400'}`} />
                                                </div>
                                                <p className="text-[10px] text-zinc-500 truncate">{last?.text || ''}</p>
                                                <p className="text-[8px] text-zinc-600 mt-0.5">{last ? fmtTime(last.timestamp) : ''}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                {activeConv ? (
                                    <>
                                        <div className="p-3 border-b border-white/5 flex items-center gap-3">
                                            <span className="text-lg">{activeConv.status === 'resolved' ? '😊' : '😡'}</span>
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-white">{activeConv.customerName}</div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeConv.status === 'open' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{activeConv.status.toUpperCase()}</span>
                                                    <span className="text-[9px] text-zinc-600 font-mono">{(() => { const ev = getEventById(activeConv.chaosEventId); return ev?.label || ''; })()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                            {activeConv.messages.map(m => (
                                                <motion.div key={m.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className="max-w-[80%]">
                                                        <div className={`px-3 py-2 rounded-2xl text-xs leading-relaxed ${m.sender === 'agent' ? 'bg-[#00D1FF]/15 text-[#00D1FF] border border-[#00D1FF]/20 rounded-tr-md' : 'bg-white/5 text-zinc-300 border border-white/5 rounded-tl-md'}`}>{m.text}</div>
                                                        <div className={`text-[9px] text-zinc-600 mt-1 font-mono ${m.sender === 'agent' ? 'text-right' : ''}`}>
                                                            {m.sender === 'agent' ? <><User size={8} className="inline mr-1" />You</> : activeConv.customerName} · {fmtTime(m.timestamp)}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                            {sending && activeId === activeConv.id && (
                                                <div className="flex justify-start"><div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-md px-3 py-2"><div className="flex items-center gap-1 text-zinc-500"><Loader2 size={10} className="animate-spin" /><span className="text-[10px]">typing...</span></div></div></div>
                                            )}
                                            <div ref={chatEnd} />
                                        </div>
                                        <div className="p-3 border-t border-white/5"><div className="flex items-center gap-2">
                                            <input type="text" value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
                                                placeholder="Type a response..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00D1FF]/30" />
                                            <motion.button whileTap={{ scale: 0.95 }} onClick={handleSend} disabled={sending}
                                                className="p-2 rounded-xl bg-[#00D1FF]/10 text-[#00D1FF] hover:bg-[#00D1FF]/20 transition-colors cursor-pointer border border-[#00D1FF]/20 disabled:opacity-50"><Send size={14} /></motion.button>
                                        </div></div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center text-zinc-500"><div className="text-center"><Headphones size={32} className="mx-auto mb-2 opacity-40" /><p className="text-xs">{convs.length > 0 ? 'Select a conversation' : 'No complaints yet'}</p></div></div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
