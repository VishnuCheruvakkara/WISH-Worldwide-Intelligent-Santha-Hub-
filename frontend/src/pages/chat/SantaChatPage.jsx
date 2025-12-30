import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaSnowflake, FaMagic } from 'react-icons/fa';
import chatService from '../../services/chatService';
import { showToast } from '../../components/ui/toast/ChrisToast';

import SnowflakeLoader from '../../components/ui/spinner/SnowflakeLoader';
import NoResultsFound from '../../components/ui/empty/NoResultsFound';

const SantaChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);
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
    }, []);

    // Scroll to bottom whenever messages or sending state changes
    useEffect(() => {
        if (messages.length > 0) {
            // Use 'auto' behavior if it's the first load or just a few messages
            // to avoid seeing the scroll animation on every refresh
            scrollToBottom(messages.length <= 5 ? "auto" : "smooth");
        }
    }, [messages, sending]);

    const fetchChatHistory = async () => {
        try {
            setLoading(true);
            const data = await chatService.getChatHistory();
            // Ensure data is an array
            const messageList = Array.isArray(data) ? data : (data.results || []);
            setMessages(messageList);
        } catch (error) {
            // console.error("Fetch error:", error);
            // showToast.error("Couldn't reach the North Pole.");
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const content = newMessage.trim();
        if (!content || sending) return;

        setNewMessage('');
        setSending(true);

        const tempId = 'temp-' + Date.now();
        const userMsg = {
            id: tempId,
            content: content,
            is_from_santa: false,
            timestamp: new Date().toISOString()
        };

        // Update UI immediately
        setMessages(prev => [...prev, userMsg]);

        try {
            await chatService.sendMessage(content);
            // Re-fetch to get Santa's reply and sync database IDs
            await fetchChatHistory();
        } catch (error) {
            console.error("Send error:", error);
            showToast.error("Message lost in the blizzard.");
            setMessages(prev => prev.filter(m => m.id !== tempId));
        } finally {
            setSending(false);
        }
    };

    const formatDateSeparator = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        }
    };

    const groupedMessages = [];
    let lastDate = null;

    messages.forEach((msg) => {
        const dateStr = new Date(msg.timestamp).toDateString();
        if (dateStr !== lastDate) {
            groupedMessages.push({ type: 'date', date: msg.timestamp, id: `date-${msg.id}` });
            lastDate = dateStr;
        }
        groupedMessages.push({ type: 'message', ...msg });
    });

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] sm:h-[calc(100vh-120px)] max-w-4xl mx-auto px-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-20 left-10 text-white/5 pointer-events-none">
                <FaSnowflake className="text-9xl animate-spin-slow" />
            </div>

            {/* Header - Fixed height */}
            <div className="flex-shrink-0 flex items-center gap-4 mb-4 mt-8 backdrop-blur-md bg-white/5 p-4 rounded-2xl border border-white/10 shadow-xl relative z-10">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border-2 border-white/20 shadow-lg">
                    <img src="/images/characters/santa_portrait.png" alt="Santa" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        Talk with AI Santa
                    </h1>
                    <p className="text-xs text-green-200 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-200 animate-pulse"></span>
                        Online at North Pole
                    </p>

                </div>
            </div>

            {/* Chat Area - Scrollable */}
            <div
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar relative z-10 min-h-0"
            >
                {loading && messages.length === 0 ? (
                    <SnowflakeLoader message="Polishing sleigh bells..." />
                ) : messages.length === 0 ? (
                    <NoResultsFound message="Tell Santa anything! Your secrets are safe here in the magical North Pole." />
                ) : (
                    <div className="flex flex-col gap-4 py-2">
                        {groupedMessages.map((item) => (
                            item.type === 'date' ? (
                                <div key={item.id} className="flex justify-center my-4">
                                    <span className="bg-white/5 text-white/40 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">
                                        {formatDateSeparator(item.date)}
                                    </span>
                                </div>
                            ) : (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`flex ${item.is_from_santa ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-3 shadow-lg relative ${item.is_from_santa
                                        ? 'bg-white/10 text-white/90 border border-white/10 rounded-tl-none'
                                        : 'bg-brand-3 text-white rounded-tr-none'
                                        }`}>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{item.content}</p>
                                        <span className="text-[10px] opacity-40 mt-1 block text-right">
                                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            )
                        ))}
                        {sending && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="bg-white/10 text-white/50 rounded-2xl rounded-tl-none p-3 border border-white/10 italic text-xs flex items-center gap-2">
                                    <span className="animate-pulse">Santa is thinking...</span> 🎅✍️
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} className="h-2" />
                    </div>
                )}
            </div>

            {/* Input Area - Fixed at bottom of container */}
            <div className="flex-shrink-0 pb-4 relative z-20">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message to Santa..."
                        className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-santa-red/50 transition-all placeholder:text-white/20 backdrop-blur-md"
                        disabled={sending}
                    />
                    <button
                        type="submit"
                        disabled={sending || !newMessage.trim()}
                        className="w-12 h-12 rounded-2xl bg-brand-3 text-white flex items-center justify-center shadow-lg hover:shadow-red-500/20 active:scale-95 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                    >
                        <FaPaperPlane className={sending ? 'animate-pulse' : ''} />
                    </button>
                </form>
            </div>
        </div>
    );
};


export default SantaChatPage;
