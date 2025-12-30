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
import CustomSelect from '../../components/ui/select/CustomSelect';
import useDebounce from '../../hooks/useDebounce';
import { FaFilter } from 'react-icons/fa';
import SnowflakeLoader from '../../components/ui/spinner/SnowflakeLoader';

const AdminUserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState('all');
    const [totalUsers, setTotalUsers] = useState(0);
    const [actionLoading, setActionLoading] = useState(false);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, user: null });

    const debouncedSearch = useDebounce(searchQuery, 800);

    const filterOptions = [
        { value: 'all', label: 'All Citizens', icon: FaUserFriends },
        { value: 'active', label: 'Active Only', icon: FaUnlock },
        { value: 'blocked', label: 'Blocked Only', icon: FaBan },
    ];

    useEffect(() => {
        fetchUsers(page);
    }, [page, debouncedSearch, statusFilter]);

    const fetchUsers = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const params = {
                page: pageNumber,
                search: debouncedSearch,
                status: statusFilter !== 'all' ? statusFilter : undefined
            };
            const data = await userService.getAllUsers(params);
            setUsers(data.results || []);
            setTotalUsers(data.count || 0);
            setTotalPages(Math.ceil((data.count || 0) / 5));
            setPage(pageNumber);
        } catch (error) {
            // showToast.error("Failed to fetch magical citizens.");
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

        // Close modal immediately so loader is visible
        setModalConfig({ isOpen: false, user: null });

        try {
            setActionLoading(true);
            const res = await userService.toggleUserStatus(user.id);
            showToast.success(res.message);
            fetchUsers(page);
        } catch (error) {
            const errorMsg = error.response?.data?.message || `Failed to ${action} user.`;
            showToast.error(errorMsg);
        } finally {
            setActionLoading(false);
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

                {/* Search & Filter - Responsive Layout */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <div className="w-full sm:flex-1">
                        <SearchInput
                            onSearch={(term) => setSearchQuery(term)}
                            placeholder="Search by name or email..."
                            className="w-full text-sm"
                        />
                    </div>
                    <div className="w-full sm:w-auto sm:min-w-[200px] sm:flex-shrink-0">
                        <CustomSelect
                            options={filterOptions}
                            value={statusFilter}
                            onChange={(val) => setStatusFilter(val)}
                            icon={FaFilter}
                        />
                    </div>
                </div>

                {/* User List */}
                <div className="relative z-10">
                    {loading && users.length === 0 ? (
                        <AdminWishListSkeleton />
                    ) : users.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            <AnimatePresence>
                                {users.map((user, index) => (
                                    <motion.div
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/10 transition-all border-dashed"
                                    >
                                        <div className="flex flex-col gap-4">
                                            {/* User Info Section */}
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-xl font-bold border-2 ${user.is_active ? 'bg-santa-red/20 border-santa-red text-santa-red' : 'bg-gray-500/20 border-gray-500 text-gray-500'} transition-colors`}>
                                                    {user.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-grow min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h3 className="font-bold text-white truncate">{user.username}</h3>
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter whitespace-nowrap ${user.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-500'}`}>
                                                            {user.is_active ? 'Active' : 'Blocked'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-white/40 truncate mt-1">{user.email}</p>
                                                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                                                        <span className="text-[10px] text-white/20 font-mono">ID: {user.id}</span>
                                                        <div className="flex items-center gap-1 text-[10px] text-white/20">
                                                            <span>Joined:</span>
                                                            <DateFormatter dateString={user.date_joined} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Button - Full width on mobile, better touch target */}
                                            <button
                                                onClick={() => handleToggleStatus(user)}
                                                className={`w-full px-4 py-2 rounded-xl text-sm cursor-pointer font-bold transition-all flex items-center justify-center gap-2 ${user.is_active
                                                    ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20  '
                                                    : 'bg-green-500/10 text-green-500 hover:bg-green-500/20 '} 
                                                    border border-current`}
                                            >
                                                {user.is_active ? <><FaBan /> Block User</> : <><FaUnlock /> Unblock User</>}
                                            </button>
                                        </div>
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

            {/* Full Screen Action Loader */}
            <AnimatePresence>
                {actionLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
                    >
                        <SnowflakeLoader message="Updating citizen status..." />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminUserManagementPage;