import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaSnowflake, FaMagic } from 'react-icons/fa';
import chatService from '../../services/chatService';
import { showToast } from '../../components/ui/toast/ChrisToast';

const SantaChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        fetchChatHistory();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchChatHistory = async () => {
        try {
            setLoading(true);
            const data = await chatService.getChatHistory();
            setMessages(data);
        } catch (error) {
            showToast.error("Couldn't reach the North Pole.");
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageContent = newMessage;
        setNewMessage('');
        setSending(true);

        // Optimistic update
        const tempId = Date.now();
        const userMsg = { id: tempId, content: messageContent, is_from_santa: false, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, userMsg]);

        try {
            await chatService.sendMessage(messageContent);
            // Re-fetch to get Santa's reply and sync IDs
            fetchChatHistory();
        } catch (error) {
            showToast.error("Message lost in the blizzard.");
            setMessages(prev => prev.filter(m => m.id !== tempId));
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] sm:h-[calc(100vh-100px)] max-w-4xl mx-auto px-4 py-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-20 left-10 text-white/5 pointer-events-none">
                <FaSnowflake className="text-9xl animate-spin-slow" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6 backdrop-blur-md bg-white/5 p-4 rounded-2xl border border-white/10 shadow-xl relative z-10">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-santa-red to-red-800 flex items-center justify-center border-2 border-white/20 shadow-lg">
                    <span className="text-xl">🎅</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        Talk with AI Santa <FaMagic className="text-amber-400 text-xs" />
                    </h1>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        Online at North Pole
                    </p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-grow overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar relative z-10">
                {loading && messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <FaSnowflake className="text-4xl text-santa-red animate-spin text-white/20" />
                        <p className="text-white/40 italic">Polishing sleigh bells...</p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center px-6">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                            <FaMagic className="text-3xl text-amber-500/50" />
                        </div>
                        <h2 className="text-xl font-bold text-white/80 mb-2">Ho ho ho!</h2>
                        <p className="text-white/40 text-sm max-w-xs">
                            Tell Santa anything! Your secrets are safe here in the magical North Pole.
                        </p>
                    </div>
                ) : (
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.is_from_santa ? 'justify-start' : 'justify-end'}`}
                            >
                                <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-3 shadow-lg relative ${msg.is_from_santa
                                        ? 'bg-white/10 text-white/90 border border-white/10 rounded-tl-none'
                                        : 'bg-brand-3 text-white rounded-tr-none'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                    <span className="text-[10px] opacity-40 mt-1 block text-right">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                        {sending && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="bg-white/5 text-white/40 rounded-2xl rounded-tl-none p-3 border border-white/10 italic text-xs">
                                    Santa is thinking... 🎅✍️
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </AnimatePresence>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="relative z-10 flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message to Santa..."
                    className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-santa-red/50 transition-all placeholder:text-white/20"
                />
                <button
                    disabled={sending || !newMessage.trim()}
                    className="w-12 h-12 rounded-2xl bg-brand-3 text-white flex items-center justify-center shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaPaperPlane className={sending ? 'animate-bounce' : ''} />
                </button>
            </form>
        </div>
    );
};

export default SantaChatPage;
