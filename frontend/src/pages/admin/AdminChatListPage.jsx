import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaChevronRight, FaCommentDots, FaSnowflake, FaSearch } from 'react-icons/fa';
import chatService from '../../services/chatService';
import { showToast } from '../../components/ui/toast/ChrisToast';
import AdminWishListSkeleton from '../../components/ui/skeleton/AdminWishListSkeleton';
import SearchInput from '../../components/ui/search/SearchInput';
import Pagination from '../../components/ui/pagination/Pagination';
import NoResultsFound from '../../components/ui/empty/NoResultsFound';
import useDebounce from '../../hooks/useDebounce';

const AdminChatListPage = () => {
    const [userChats, setUserChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalChats, setTotalChats] = useState(0);
    const navigate = useNavigate();

    const debouncedSearch = useDebounce(searchQuery, 800);

    useEffect(() => {
        fetchChats(page);
    }, [page, debouncedSearch]);

    const fetchChats = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const params = {
                page: pageNumber,
                search: debouncedSearch
            };
            const data = await chatService.getAllUsersChats(params);

            setUserChats(data?.results || []);
            const count = data?.count || 0;
            setTotalChats(count);
            setPage(pageNumber);
            setTotalPages(Math.ceil(count / 5)); // 5 is backend page size
        } catch (error) {
            showToast.error("Couldn't fetch user chats.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (term) => {
        setSearchQuery(term);
        setPage(1); // Reset to first page on search
    };

    return (
        <div className="min-h-screen pt-4 px-3 pb-6 relative overflow-hidden text-white">
            <div className="max-w-4xl mx-auto py-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-santa-red opacity-40 blur-xl"></div>
                        <FaCommentDots className="relative text-2xl text-santa-red drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">User Conversations</h1>
                        <p className="text-xs text-white/40">
                            {totalChats} Magical conversations found
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <SearchInput
                        onSearch={handleSearch}
                        placeholder="Search user..."
                        className="w-full text-sm"
                    />
                </div>

                {loading ? (
                    <AdminWishListSkeleton />
                ) : userChats.length === 0 ? (
                    <NoResultsFound message={searchQuery ? "No users found matching your search." : "No magical conversations yet."} />
                ) : (
                    <div className="flex flex-col gap-4">
                        <AnimatePresence>
                            {userChats.map((chat, idx) => (
                                <motion.div
                                    key={chat.user_id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => navigate(`/admin/chat/${chat.user_id}`)}
                                    className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer group hover:border-santa-red/30 backdrop-blur-sm shadow-sm"
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex-shrink-0 flex items-center justify-center text-white/50 border border-white/10 group-hover:from-santa-red/20 group-hover:to-red-900/20 group-hover:text-santa-red transition-all">
                                            <FaUser />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-white group-hover:text-santa-red transition-colors truncate">
                                                {chat.username}
                                            </h3>
                                            <p className="text-xs text-white/40 truncate mt-1 italic">
                                                "{chat.last_message || "No messages yet"}"
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                                        <span className="hidden sm:block text-[10px] text-white/20 whitespace-nowrap">
                                            {new Date(chat.last_timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                        </span>
                                        <FaChevronRight className="text-white/10 group-hover:text-santa-red group-hover:translate-x-1 transition-all" />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-8">
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={(p) => setPage(p)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminChatListPage;
