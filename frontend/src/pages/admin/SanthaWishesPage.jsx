import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaSnowman, FaFilter, FaChevronDown, FaChevronUp, FaMagic, FaCheckDouble } from 'react-icons/fa';
import wishService from '../../services/wishServices/wishService';
import SearchInput from '../../components/ui/search/SearchInput';
import Pagination from '../../components/ui/pagination/Pagination';
import AdminWishListSkeleton from '../../components/ui/skeleton/AdminWishListSkeleton';
import DateFormatter from '../../utils/date/DateFormatter';
import { showToast } from '../../components/ui/toast/ChrisToast';
import NoResultsFound from '../../components/ui/empty/NoResultsFound';
import CustomSelect from '../../components/ui/select/CustomSelect';
import ChristmasModal from '../../components/ui/modal/ChristmasModal';

const SanthaWishesPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalUsers, setTotalUsers] = useState(0);
    const [statusFilter, setStatusFilter] = useState('all');
    const [expandedUsers, setExpandedUsers] = useState({});
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', data: null });

    const PAGE_SIZE = 5;

    const filterOptions = [
        { value: 'all', label: 'All Wishes', icon: FaFilter },
        { value: 'granted', label: 'Approved', icon: FaCheck },
        { value: 'pending', label: 'Pending', icon: FaMagic },
    ];

    useEffect(() => {
        fetchData();
    }, [currentPage, searchQuery, statusFilter]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                search: searchQuery,
                status: statusFilter !== 'all' ? statusFilter : undefined
            };
            const data = await wishService.getAdminUserWishes(params);

            setUsers(data.results || []);
            setTotalUsers(data.count);
            setTotalPages(Math.ceil(data.count / PAGE_SIZE));

        } catch (error) {
            showToast.error("Failed to load user lists from the North Pole database.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (term) => {
        setSearchQuery(term);
        setCurrentPage(1);
    };

    const handleGrantWish = async (wish, userIndex) => {
        const newStatus = !wish.is_granted;

        const updatedUsers = [...users];
        const user = updatedUsers[userIndex];
        const wishIndex = user.wishes.findIndex(w => w.id === wish.id);

        if (wishIndex !== -1) {
            user.wishes[wishIndex].is_granted = newStatus;
            setUsers(updatedUsers);
        }

        try {
            await wishService.updateWish(wish.id, { is_granted: newStatus });
            if (newStatus) showToast.success(`Wish granted! 🎄`);
        } catch (error) {
            fetchData();
            showToast.error("Magic failure! Could not update wish status.");
        }
    };

    const confirmGrantAllGlobal = () => {
        setModalConfig({
            isOpen: true,
            type: 'GLOBAL',
            title: 'Grant ALL Wishes?',
            message: 'This will approve EVERY pending wish in the entire database. Are you absolutely sure?',
        });
    };

    const confirmGrantUser = (username, pendingCount) => {
        setModalConfig({
            isOpen: true,
            type: 'USER',
            data: username,
            title: `Approve all for ${username}?`,
            message: `This will grant all ${pendingCount} pending wishes for ${username}.`,
        });
    };

    const handleModalConfirm = async () => {
        setModalConfig({ ...modalConfig, isOpen: false });
        setLoading(true);

        try {
            if (modalConfig.type === 'GLOBAL') {
                const res = await wishService.grantAllWishes();
                showToast.success(res.message);
            } else if (modalConfig.type === 'USER') {
                const res = await wishService.grantUserWishes(modalConfig.data);
                showToast.success(res.message);
            }
            fetchData();
        } catch (error) {
            showToast.error("Could not perform the Grand Magic.");
        } finally {
            setLoading(false);
        }
    };

    const toggleUserExpansion = (userId) => {
        setExpandedUsers(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    return (
        <div className="min-h-screen pt-4 px-4 pb-12 relative overflow-hidden text-white">

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 relative z-20 max-w-5xl mx-auto bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">

                <div className="flex items-center gap-4 min-w-max">
                    <div className="bg-santa-red/20 p-2 rounded-lg">
                        <FaSnowman className="text-santa-red text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white leading-tight">Santha's List</h1>
                        <p className="text-xs text-white/50">{totalUsers} Children Found</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">

                    <div className="w-full sm:w-64">
                        <SearchInput
                            onSearch={handleSearch}
                            placeholder="Search child..."
                            className="w-full"
                        />
                    </div>

                    <div className="w-full sm:w-40 z-30">
                        <CustomSelect
                            options={filterOptions}
                            value={statusFilter}
                            onChange={(val) => {
                                setStatusFilter(val);
                                setCurrentPage(1);
                            }}
                            icon={FaFilter}
                        />
                    </div>

                    <button
                        onClick={confirmGrantAllGlobal}
                        className="w-full sm:w-auto px-4 py-3 bg-green-600/80 hover:bg-green-500 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-sm whitespace-nowrap border border-green-400/30"
                        title="Grant ALL pending wishes globally"
                    >
                        <FaCheckDouble /> Grant All
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {loading ? (
                    <AdminWishListSkeleton />
                ) : users.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        <AnimatePresence>
                            {users.map((user, index) => {
                                const isExpanded = expandedUsers[user.id];
                                const pendingCount = user.wishes.filter(w => !w.is_granted).length;
                                const isAllGranted = user.wishes.length > 0 && pendingCount === 0;

                                return (
                                    <motion.div
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-sm hover:border-white/20 transition-colors"
                                    >
                                        <div
                                            onClick={() => toggleUserExpansion(user.id)}
                                            className="p-4 flex items-center justify-between cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm uppercase
                                                    ${pendingCount > 0 ? 'bg-santa-red text-white shadow-red-500/20 shadow-md' : 'bg-green-500 text-white shadow-green-500/20 shadow-md'}
                                                `}>
                                                    {user.username.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-white group-hover:text-santa-red transition-colors">{user.username}</h3>
                                                    <p className="text-[10px] text-white/40">
                                                        {user.wishes.length} Wishes
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="hidden sm:flex gap-1.5">
                                                    {user.wishes.map(w => (
                                                        <div key={w.id} className={`w-1.5 h-1.5 rounded-full ${w.is_granted ? 'bg-green-400' : 'bg-red-400'}`} />
                                                    ))}
                                                </div>

                                                {pendingCount > 0 && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            confirmGrantUser(user.username, pendingCount);
                                                        }}
                                                        className="px-3 py-1.5 bg-white/10 hover:bg-green-500/20 text-green-300 hover:text-green-200 rounded-lg text-xs font-medium border border-white/10 transition-all flex items-center gap-1.5 mr-2"
                                                    >
                                                        <FaCheck /> Grant All ({pendingCount})
                                                    </button>
                                                )}

                                                {isExpanded ? <FaChevronUp className="text-white/30" /> : <FaChevronDown className="text-white/30" />}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="border-t border-white/5 bg-black/10"
                                                >
                                                    {user.wishes.length > 0 ? (
                                                        user.wishes.map((wish) => (
                                                            <div key={wish.id} className="p-3 pl-14 pr-4 border-b border-white/5 last:border-0 flex items-center justify-between hover:bg-white/5 transition-colors gap-4">
                                                                <div className="flex-grow min-w-0">
                                                                    <p className={`text-sm italic truncate ${wish.is_granted ? 'text-white/30 line-through' : 'text-white/80'}`}>
                                                                        "{wish.content}"
                                                                    </p>
                                                                    <div className="flex items-center gap-2 mt-0.5">
                                                                        <DateFormatter dateString={wish.created_at} className="text-[10px] text-white/20" />
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleGrantWish(wish, index);
                                                                    }}
                                                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                                                                        ${wish.is_granted
                                                                            ? 'bg-green-500/10 text-green-500 cursor-default'
                                                                            : 'bg-white/5 hover:bg-green-500 text-white/50 hover:text-white hover:shadow-lg'
                                                                        }
                                                                    `}
                                                                    title={wish.is_granted ? "Granted" : "Grant Wish"}
                                                                >
                                                                    {wish.is_granted ? <FaCheck className="text-xs" /> : <FaMagic className="text-xs" />}
                                                                </button>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="p-4 text-center text-white/30 text-xs italic">
                                                            No wishes found for this filter.
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                ) : (
                    <NoResultsFound message={`No ${statusFilter !== 'all' ? statusFilter : ''} children found.`} />
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            <ChristmasModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                onConfirm={handleModalConfirm}
                title={modalConfig.title || "Confirm Magic"}
                confirmText="Yes, Grant!"
                cancelText="Cancel"
            >
                <p className="text-white/80">{modalConfig.message}</p>
            </ChristmasModal>
        </div>
    );
};

export default SanthaWishesPage;
