import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaUser } from 'react-icons/fa';
import chatService from '../../services/chatService';
import { showToast } from '../../components/ui/toast/ChrisToast';
import DateFormatter from '../../utils/date/DateFormatter';

const AdminUserChatPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({ name: '', email: '' });
    const chatContainerRef = useRef(null);

    const scrollToBottom = (behavior = "smooth") => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: behavior
            });
        }
    };

    useEffect(() => {
        fetchChatHistory();
    }, [userId]);

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
            // Try to set user info from the first message that has it
            const msgWithInfo = messages.find(m => m.username);
            if (msgWithInfo && !userInfo.name) {
                setUserInfo({
                    name: msgWithInfo.username,
                    email: msgWithInfo.email || ''
                });
            }
        }
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
        <div className="flex flex-col h-[calc(100vh-140px)] sm:h-[calc(100vh-120px)] max-w-4xl mx-auto px-4 py-6 overflow-hidden">
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between mb-6 backdrop-blur-md bg-white/5 p-4 rounded-2xl border border-white/10 shadow-xl relative z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/50 hover:text-white"
                    >
                        <FaChevronLeft />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-santa-red flex items-center justify-center text-white font-bold uppercase shadow-lg shadow-red-500/20">
                            {userInfo.name ? userInfo.name.charAt(0) : <FaUser className="text-sm" />}
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-white leading-tight">
                                {userInfo.name || `User ${userId}`}
                            </h1>
                            <p className="text-[10px] text-white/40">{userInfo.email || 'No email available'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area - Read Only for Admin */}
            <div
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto mb-4 space-y-6 pr-2 custom-scrollbar relative z-10 min-h-0"
            >
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-10 h-10 border-4 border-santa-red border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                        <FaUser className="text-4xl mb-2" />
                        <p className="text-sm">No messages in this magical thread yet.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 py-2">
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={msg.id || idx}
                                initial={{ opacity: 0, x: msg.is_from_santa ? -10 : 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex flex-col ${msg.is_from_santa ? 'items-start' : 'items-end'}`}
                            >
                                <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-1 shadow-xl relative backdrop-blur-md border border-white/20 ${msg.is_from_santa
                                    ? 'bg-white/10 text-white/90 rounded-tl-none'
                                    : 'bg-santa-red/80 text-white rounded-tr-none'
                                    }`}>



                                    {/* Sender Label & Line */}
                                    <div className="flex flex-col mb-2">
                                        <span className={`text-[11px] font-semibold tracking-wider ${msg.is_from_santa ? 'text-santa-red' : 'text-white'}`}>
                                            {msg.is_from_santa ? 'Santa AI' : 'User'}
                                        </span>
                                        <div className="h-[1px] w-full bg-white/10 mt-1" />
                                    </div>

                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                                    <div className="flex justify-end mt-2">
                                        <DateFormatter
                                            dateString={msg.timestamp}
                                            className="text-[9px] text-white/40 font-mono tracking-tighter"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex-shrink-0 bg-white/5 border border-white/10 p-3 rounded-xl text-center backdrop-blur-sm">
                <p className="text-amber-400 text-[10px]  uppercase tracking-widest">
                    Administrator Mode: Magical Surveillance
                </p>
            </div>
        </div>
    );
};

export default AdminUserChatPage;
