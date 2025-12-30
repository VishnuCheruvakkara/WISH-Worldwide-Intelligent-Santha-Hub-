import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaChevronRight, FaCommentDots, FaSnowflake } from 'react-icons/fa';
import chatService from '../../services/chatService';
import { showToast } from '../../components/ui/toast/ChrisToast';
import AdminWishListSkeleton from '../../components/ui/skeleton/AdminWishListSkeleton';

const AdminChatListPage = () => {
    const [userChats, setUserChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            setLoading(true);
            const data = await chatService.getAllUsersChats();
            setUserChats(data);
        } catch (error) {
            showToast.error("Couldn't fetch user chats.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-brand-3 flex items-center justify-center shadow-xl shadow-red-500/10">
                    <FaCommentDots className="text-white text-xl" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">User Conversations</h1>
                    <p className="text-sm text-white/40">Watch as Santa builds magic in real-time.</p>
                </div>
            </div>

            {loading ? (
                <AdminWishListSkeleton />
            ) : userChats.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                    <div className="text-6xl mb-4 opacity-10">🎅</div>
                    <p className="text-white/40">No magical conversations yet.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {userChats.map((chat, idx) => (
                        <motion.div
                            key={chat.user_id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => navigate(`/admin/chat/${chat.user_id}`)}
                            className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer group hover:border-santa-red/30"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-white/50 border border-white/10 group-hover:from-santa-red/20 group-hover:to-red-900/20 group-hover:text-santa-red transition-all">
                                    <FaUser />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white group-hover:text-santa-red transition-colors">
                                        {chat.username}
                                    </h3>
                                    <p className="text-xs text-white/40 truncate max-w-[200px] sm:max-w-md mt-1 italic">
                                        "{chat.last_message || "No messages yet"}"
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="hidden sm:block text-[10px] text-white/20">
                                    {new Date(chat.last_timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                </span>
                                <FaChevronRight className="text-white/10 group-hover:text-santa-red group-hover:translate-x-1 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminChatListPage;
