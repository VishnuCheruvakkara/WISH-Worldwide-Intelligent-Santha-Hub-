import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaUser, FaMagic } from 'react-icons/fa';
import chatService from '../../services/chatService';
import { showToast } from '../../components/ui/toast/ChrisToast';

const AdminUserChatPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        fetchChatHistory();
    }, [userId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchChatHistory = async () => {
        try {
            setLoading(true);
            const data = await chatService.getUserChatHistory(userId);
            setMessages(data);
        } catch (error) {
            showToast.error("Failed to fetch chat log.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] sm:h-[calc(100vh-100px)] max-w-4xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 backdrop-blur-md bg-white/5 p-4 rounded-2xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/50 hover:text-white"
                    >
                        <FaChevronLeft />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-white flex items-center gap-2">
                            Chat Log <FaMagic className="text-amber-400 text-xs" />
                        </h1>
                        <p className="text-xs text-white/40">User ID: {userId}</p>
                    </div>
                </div>
            </div>

            {/* Chat Area - Read Only for Admin */}
            <div className="flex-grow overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-10 h-10 border-4 border-santa-red border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`flex ${msg.is_from_santa ? 'justify-start' : 'justify-end'}`}
                            >
                                <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-3 shadow-lg relative ${msg.is_from_santa
                                        ? 'bg-white/10 text-white/90 border border-white/10 rounded-tl-none'
                                        : 'bg-green-500/20 text-white/90 border border-green-500/30 rounded-tr-none'
                                    }`}>
                                    <div className="flex items-center gap-1.5 mb-1 opacity-50">
                                        {msg.is_from_santa ? <span>🎅 Santa AI</span> : <span className="flex items-center gap-1"><FaUser className="text-[10px]" /> User</span>}
                                    </div>
                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                    <span className="text-[10px] opacity-20 mt-1 block text-right">
                                        {new Date(msg.timestamp).toLocaleString()}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                    </AnimatePresence>
                )}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-center">
                <p className="text-amber-200 text-xs font-medium">✨ Administrator View Only - Monitoring Active Magic ✨</p>
            </div>
        </div>
    );
};

export default AdminUserChatPage;
