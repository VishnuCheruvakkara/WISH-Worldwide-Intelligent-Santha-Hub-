import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserFriends, FaBan, FaUnlock, FaSearch, FaUserAlt } from 'react-icons/fa';
import userService from '../../services/userService';
import SearchInput from '../../components/ui/search/SearchInput';
import Pagination from '../../components/ui/pagination/Pagination';
import AdminWishListSkeleton from '../../components/ui/skeleton/AdminWishListSkeleton';
import DateFormatter from '../../utils/date/DateFormatter';
import { showToast } from '../../components/ui/toast/ChrisToast';
import NoResultsFound from '../../components/ui/empty/NoResultsFound';
import ChristmasModal from '../../components/ui/modal/ChristmasModal';
import useDebounce from '../../hooks/useDebounce';

const AdminUserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalUsers, setTotalUsers] = useState(0);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, user: null });

    const debouncedSearch = useDebounce(searchQuery, 800);

    useEffect(() => {
        fetchUsers(page);
    }, [page, debouncedSearch]);

    const fetchUsers = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const params = {
                page: pageNumber,
                search: debouncedSearch
            };
            const data = await userService.getAllUsers(params);
            setUsers(data.results || []);
            setTotalUsers(data.count || 0);
            setTotalPages(Math.ceil((data.count || 0) / 5));
            setPage(pageNumber);
        } catch (error) {
            showToast.error("Failed to fetch magical citizens.");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = (user) => {
        setModalConfig({
            isOpen: true,
            user: user
        });
    };

    const confirmToggleStatus = async () => {
        if (!modalConfig.user) return;

        const user = modalConfig.user;
        const action = user.is_active ? 'block' : 'unblock';

        try {
            setLoading(true);
            const res = await userService.toggleUserStatus(user.id);
            showToast.success(res.message);
            setModalConfig({ isOpen: false, user: null });
            fetchUsers(page);
        } catch (error) {
            const errorMsg = error.response?.data?.message || `Failed to ${action} user.`;
            showToast.error(errorMsg);
        } finally {
            setLoading(false);
            setModalConfig({ isOpen: false, user: null });
        }
    };

    return (
        <div className="min-h-screen pt-4 px-3 pb-6 relative overflow-hidden text-white">
            <div className="max-w-5xl mx-auto py-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-santa-red opacity-40 blur-xl"></div>
                        <FaUserFriends className="relative text-2xl text-santa-red drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">User Management</h1>
                        <p className="text-xs text-white/50">
                            {totalUsers} Citizens in Santa's database
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <SearchInput
                        onSearch={(term) => setSearchQuery(term)}
                        placeholder="Search by name or email..."
                        className="w-full"
                    />
                </div>

                {/* User List */}
                <div className="relative z-10">
                    {loading && users.length === 0 ? (
                        <AdminWishListSkeleton />
                    ) : users.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                            <AnimatePresence>
                                {users.map((user, index) => (
                                    <motion.div
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md hover:bg-white/10 transition-all border-dashed"
                                    >
                                        <div className="flex items-center gap-4 w-full">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 ${user.is_active ? 'bg-santa-red/20 border-santa-red text-santa-red' : 'bg-gray-500/20 border-gray-500 text-gray-500'} transition-colors`}>
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-white truncate">{user.username}</h3>
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter ${user.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-500'}`}>
                                                        {user.is_active ? 'Active' : 'Blocked'}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-white/40 truncate">{user.email}</p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-[10px] text-white/20 font-mono">ID: {user.id}</span>
                                                    <div className="flex items-center gap-1 text-[10px] text-white/20">
                                                        <span>Joined:</span>
                                                        <DateFormatter dateString={user.date_joined} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleToggleStatus(user)}
                                            className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${user.is_active
                                                ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
                                                : 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'} 
                                                border border-current`}
                                        >
                                            {user.is_active ? <><FaBan /> Block User</> : <><FaUnlock /> Unblock User</>}
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <NoResultsFound message={searchQuery ? "No citizens found matching your hunt." : "The North Pole seems empty."} />
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

            <ChristmasModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ isOpen: false, user: null })}
                onConfirm={confirmToggleStatus}
                title={modalConfig.user?.is_active ? "Block Citizen?" : "Unblock Citizen?"}
                confirmText={modalConfig.user?.is_active ? "Block" : "Unblock"}
                cancelText="Cancel"
            >
                <div className="flex flex-col items-center text-center gap-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${modalConfig.user?.is_active ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                        {modalConfig.user?.is_active ? <FaBan /> : <FaUnlock />}
                    </div>
                    <p className="text-white/80">
                        Are you sure you want to {modalConfig.user?.is_active ? 'block' : 'unblock'} <span className="font-bold text-white">{modalConfig.user?.username}</span>?
                        {modalConfig.user?.is_active && " They will no longer be able to log in or chat with Santa AI."}
                    </p>
                </div>
            </ChristmasModal>
        </div>
    );
};

export default AdminUserManagementPage;
