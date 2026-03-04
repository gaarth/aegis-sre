'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMockOrders, getCRMStats, generateConversations, type MockOrder, type CustomerConversation, type CustomerMessage } from '@/lib/simulation';
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

export default function CRMPanel({ hasChaos }: { hasChaos: boolean }) {
    const [orders, setOrders] = useState<MockOrder[]>([]);
    const [tab, setTab] = useState<'orders' | 'payments' | 'support'>('orders');
    const [conversations, setConversations] = useState<CustomerConversation[]>([]);
    const [activeConvId, setActiveConvId] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setOrders(generateMockOrders(hasChaos));
        setConversations(generateConversations(hasChaos));
        const iv = setInterval(() => {
            setOrders(generateMockOrders(hasChaos));
            setConversations(generateConversations(hasChaos));
        }, 8000);
        return () => clearInterval(iv);
    }, [hasChaos]);

    useEffect(() => {
        if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [activeConvId, conversations]);

    const stats = getCRMStats(orders);
    const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

    const handleSendMessage = () => {
        if (!newMessage.trim() || !activeConv) return;
        const msg: CustomerMessage = {
            id: `msg-${Date.now()}`,
            sender: 'agent',
            text: newMessage.trim(),
            timestamp: new Date().toISOString(),
        };
        setConversations(prev => prev.map(c =>
            c.id === activeConv.id
                ? { ...c, messages: [...c.messages, msg], lastMessage: msg.text, unread: 0 }
                : c
        ));
        setNewMessage('');
    };

    const formatTime = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="space-y-6">
            {/* KPI Row */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'REVENUE', value: `$${stats.revenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, icon: DollarSign, color: 'text-emerald-400' },
                    { label: 'ORDERS', value: stats.total, icon: Package, color: 'text-[#00D1FF]' },
                    { label: 'FAILED PAYMENTS', value: stats.failedPayments, icon: AlertTriangle, color: hasChaos ? 'text-red-400' : 'text-zinc-400' },
                    { label: 'FULFILLMENT RATE', value: `${stats.total > 0 ? Math.round(((stats.completed) / stats.total) * 100) : 100}%`, icon: TrendingUp, color: 'text-emerald-400' },
                ].map((kpi) => (
                    <div key={kpi.label} className="bg-[#0A0C10] rounded-xl border border-white/5 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <kpi.icon size={14} className={kpi.color} />
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{kpi.label}</span>
                        </div>
                        <div className={`text-2xl font-bold font-mono ${kpi.color}`}>{kpi.value}</div>
                    </div>
                ))}
            </div>

            {/* Tabs: Orders | Payments | Support */}
            <div className="flex gap-1 bg-[#0A0C10] rounded-xl p-1 border border-white/5">
                {([
                    { id: 'orders' as const, label: 'Live Orders', icon: Package },
                    { id: 'payments' as const, label: 'Payments', icon: CreditCard },
                    { id: 'support' as const, label: 'Customer Service', icon: Headphones },
                ]).map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${tab === t.id ? 'bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30' : 'text-zinc-500 hover:text-white'}`}>
                        <t.icon size={14} /> {t.label}
                        {t.id === 'support' && conversations.reduce((s, c) => s + c.unread, 0) > 0 && (
                            <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">{conversations.reduce((s, c) => s + c.unread, 0)}</span>
                        )}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {tab === 'orders' && (
                    <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="bg-[#0A0C10] rounded-xl border border-white/5 overflow-hidden">
                            <div className="grid grid-cols-12 gap-2 px-4 py-3 text-[10px] font-mono text-zinc-500 uppercase tracking-wider border-b border-white/5">
                                <div className="col-span-1">ID</div>
                                <div className="col-span-2">CUSTOMER</div>
                                <div className="col-span-3">PRODUCT</div>
                                <div className="col-span-3">SHIP TO</div>
                                <div className="col-span-1">TOTAL</div>
                                <div className="col-span-2">STATUS</div>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {orders.map((order, i) => (
                                    <motion.div key={order.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                                        className="grid grid-cols-12 gap-2 px-4 py-3 items-center text-xs border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                        <div className="col-span-1 font-mono text-zinc-500">{order.id}</div>
                                        <div className="col-span-2">
                                            <div className="text-white font-medium truncate">{order.customer.name}</div>
                                            <div className="text-[10px] text-zinc-500 truncate">{order.customer.email}</div>
                                        </div>
                                        <div className="col-span-3">
                                            <div className="text-zinc-300 truncate">{order.product.name}</div>
                                            <div className="text-[10px] text-zinc-500">Size {order.size} × {order.quantity}</div>
                                        </div>
                                        <div className="col-span-3 flex items-center gap-1 text-zinc-400">
                                            <MapPin size={10} className="shrink-0" />
                                            <span className="truncate">{order.shippingAddress}</span>
                                        </div>
                                        <div className="col-span-1 font-mono text-white font-medium">${order.total.toFixed(2)}</div>
                                        <div className="col-span-2">
                                            <span className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border w-fit ${order.status === 'failed' ? 'bg-red-500/10 text-red-400 border-red-500/20' : order.status === 'processing' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                                                {statusIcons[order.status]} {order.status}
                                            </span>
                                        </div>
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
                                <div className="col-span-2">TXN ID</div>
                                <div className="col-span-3">METHOD</div>
                                <div className="col-span-2">AMOUNT</div>
                                <div className="col-span-2">STATUS</div>
                                <div className="col-span-3">TIME</div>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {orders.map((order, i) => (
                                    <motion.div key={`pay-${order.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                                        className="grid grid-cols-12 gap-2 px-4 py-3 items-center text-xs border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                                        <div className="col-span-2 font-mono text-zinc-500">TXN-{order.id.slice(-5)}</div>
                                        <div className="col-span-3 flex items-center gap-2">
                                            <CreditCard size={12} className="text-zinc-500" />
                                            <span className="text-zinc-300">{order.paymentMethod}</span>
                                        </div>
                                        <div className="col-span-2 font-mono text-white">${order.total.toFixed(2)}</div>
                                        <div className="col-span-2">
                                            <span className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border w-fit ${order.paymentStatus === 'failed' ? 'bg-red-500/10 text-red-400 border-red-500/20' : order.paymentStatus === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                                                {statusIcons[order.paymentStatus]} {order.paymentStatus}
                                            </span>
                                        </div>
                                        <div className="col-span-3 flex items-center gap-1 text-zinc-500">
                                            <Clock size={10} /> {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {tab === 'support' && (
                    <motion.div key="support" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="bg-[#0A0C10] rounded-xl border border-white/5 overflow-hidden flex h-[480px]">
                            {/* Conversation List */}
                            <div className="w-[260px] border-r border-white/5 flex flex-col">
                                <div className="p-3 border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                        <MessageCircle size={14} className="text-[#00D1FF]" />
                                        <span className="text-xs font-semibold text-white">Conversations</span>
                                        <span className="text-[9px] bg-[#00D1FF]/10 text-[#00D1FF] px-1.5 py-0.5 rounded-full ml-auto">{conversations.length}</span>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    {conversations.map(conv => (
                                        <button key={conv.id} onClick={() => setActiveConvId(conv.id)}
                                            className={`w-full text-left px-3 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${(activeConv?.id === conv.id) ? 'bg-white/5' : ''}`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm">{conv.avatar}</span>
                                                <span className="text-xs font-semibold text-white flex-1 truncate">{conv.customerName}</span>
                                                {conv.unread > 0 && <span className="bg-red-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">{conv.unread}</span>}
                                                <span className={`w-1.5 h-1.5 rounded-full ${conv.status === 'open' ? 'bg-red-400' : conv.status === 'waiting' ? 'bg-yellow-400' : 'bg-emerald-400'}`} />
                                            </div>
                                            <p className="text-[10px] text-zinc-500 truncate">{conv.lastMessage}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 flex flex-col">
                                {activeConv ? (
                                    <>
                                        {/* Chat Header */}
                                        <div className="p-3 border-b border-white/5 flex items-center gap-3">
                                            <span className="text-lg">{activeConv.avatar}</span>
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-white">{activeConv.customerName}</div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${activeConv.priority === 'high' ? 'bg-red-500/10 text-red-400' : activeConv.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-zinc-500/10 text-zinc-400'}`}>
                                                        {activeConv.priority.toUpperCase()}
                                                    </span>
                                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeConv.status === 'open' ? 'bg-red-500/10 text-red-400' : activeConv.status === 'waiting' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                                        {activeConv.status.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Messages */}
                                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                            {activeConv.messages.map(msg => (
                                                <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[80%] ${msg.sender === 'agent' ? 'order-2' : ''}`}>
                                                        <div className={`px-3 py-2 rounded-2xl text-xs leading-relaxed ${msg.sender === 'agent'
                                                            ? 'bg-[#00D1FF]/15 text-[#00D1FF] border border-[#00D1FF]/20 rounded-tr-md'
                                                            : 'bg-white/5 text-zinc-300 border border-white/5 rounded-tl-md'
                                                            }`}>
                                                            {msg.text}
                                                        </div>
                                                        <div className={`text-[9px] text-zinc-600 mt-1 font-mono ${msg.sender === 'agent' ? 'text-right' : ''}`}>
                                                            {msg.sender === 'agent' ? <><User size={8} className="inline mr-1" />Agent</> : activeConv.customerName}
                                                            {' · '}{formatTime(msg.timestamp)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div ref={chatEndRef} />
                                        </div>

                                        {/* Message Input */}
                                        <div className="p-3 border-t border-white/5">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                                    placeholder="Type a response..."
                                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00D1FF]/30"
                                                />
                                                <motion.button whileTap={{ scale: 0.95 }} onClick={handleSendMessage}
                                                    className="p-2 rounded-xl bg-[#00D1FF]/10 text-[#00D1FF] hover:bg-[#00D1FF]/20 transition-colors cursor-pointer border border-[#00D1FF]/20">
                                                    <Send size={14} />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center text-zinc-500">
                                        <div className="text-center">
                                            <Headphones size={32} className="mx-auto mb-2 opacity-40" />
                                            <p className="text-xs">Select a conversation</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
