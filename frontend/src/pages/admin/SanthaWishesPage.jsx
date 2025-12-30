import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaFilter, FaChevronDown, FaChevronUp, FaMagic } from 'react-icons/fa';
import wishService from '../../services/wishServices/wishService';
import SearchInput from '../../components/ui/search/SearchInput';
import Pagination from '../../components/ui/pagination/Pagination';
import AdminWishListSkeleton from '../../components/ui/skeleton/AdminWishListSkeleton';
import DateFormatter from '../../utils/date/DateFormatter';
import { showToast } from '../../components/ui/toast/ChrisToast';
import NoResultsFound from '../../components/ui/empty/NoResultsFound';
import CustomSelect from '../../components/ui/select/CustomSelect';
import ChristmasModal from '../../components/ui/modal/ChristmasModal';
import useDebounce from '../../hooks/useDebounce';

const SanthaWishesPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalUsers, setTotalUsers] = useState(0);
    const [statusFilter, setStatusFilter] = useState('all');
    const [expandedUsers, setExpandedUsers] = useState({});
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', data: null });

    const debouncedSearch = useDebounce(searchQuery, 800);


    const filterOptions = [
        { value: 'all', label: 'All Wishes', icon: FaFilter },
        { value: 'granted', label: 'Approved', icon: FaCheck },
        { value: 'pending', label: 'Pending', icon: FaMagic },
    ];

    useEffect(() => {
        fetchData(page);
    }, [page, debouncedSearch, statusFilter]);

    const fetchData = async (pageNumber = 1) => {
        try {
            setLoading(true);

            const params = {
                page: pageNumber,
                search: debouncedSearch,
                status: statusFilter !== 'all' ? statusFilter : undefined
            };

            const data = await wishService.getAdminUserWishes(params);

            setUsers(data?.results || []);


            const count = data?.count || 0;
            setTotalUsers(count);
            setPage(pageNumber);
            setTotalPages(Math.ceil(count / 5));
        } catch (error) {
            // console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const handleSearch = (term) => {
        setSearchQuery(term);

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
            fetchData(page);
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
            fetchData(page);
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
        <div className="min-h-screen pt-4 px-3 pb-6 relative overflow-hidden text-white">

            <div className="max-w-5xl mx-auto py-4">
                {/* Header with Magic icon + Grant All on right (md+) */}
                <div className="flex items-start justify-between gap-3 mb-8 flex-col md:flex-row md:items-center">
                    <div className="flex items-center gap-3 ">
                        <div className="relative">
                            {/* Fog / Glow */}
                            <div className="absolute inset-0 rounded-full bg-santa-red opacity-40 blur-xl"></div>

                            {/* Icon */}
                            <FaMagic className="relative text-2xl text-santa-red drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-white">Wishes</h1>
                            <p className="text-xs text-white/50">
                                {totalUsers} Children wish found
                            </p>
                        </div>
                    </div>

                    {/* Grant All button - Right side on md+, hidden on small */}
                    <button
                        onClick={confirmGrantAllGlobal}
                        className="hidden md:flex px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 cursor-pointer hover:from-amber-400 hover:to-orange-400 text-white rounded-xl font-semibold shadow-lg items-center justify-center gap-2 transition-all active:scale-95 text-sm hover:shadow-xl whitespace-nowrap"
                        title="Grant ALL pending wishes globally"
                    >
                        <FaMagic className="text-base" />
                        <span>Grant All</span>
                    </button>
                </div>

                {/* Perfect Responsive Layout */}
                <div className="flex flex-col gap-3">
                    {/* Search + Filter row - Perfect alignment for all screen sizes */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search bar - Full width on mobile,  */}
                        <div className="w-full sm:flex-1 ">
                            <SearchInput
                                onSearch={handleSearch}
                                placeholder="Search child..."
                                className="w-full text-sm"
                            />
                        </div>

                        {/* Filter - Full width on mobile, 30% on desktop with min-width */}
                        <div className="w-full sm:w-auto sm:min-w-[200px] sm:flex-shrink-0">
                            <CustomSelect
                                options={filterOptions}
                                value={statusFilter}
                                onChange={(val) => {
                                    setStatusFilter(val);

                                }}
                                icon={FaFilter}
                            />
                        </div>
                    </div>

                    {/* Grant All button - Visible on small screens only, full width */}
                    <button
                        onClick={confirmGrantAllGlobal}
                        className="md:hidden w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 cursor-pointer hover:from-amber-400 hover:to-orange-400 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 text-sm hover:shadow-xl"
                        title="Grant ALL pending wishes globally"
                    >
                        <FaMagic className="text-base" />
                        <span>Grant All</span>
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
                                                                    className={`w-8 h-8 rounded-full cursor-pointer  flex items-center justify-center transition-all
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

                {totalPages > 1 && (
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={fetchData}
                    />
                )}
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