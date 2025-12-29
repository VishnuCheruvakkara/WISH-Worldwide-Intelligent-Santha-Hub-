import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import wishService from '../../services/wishServices/wishService';
import { FaMagic, FaPlus, FaSnowflake } from 'react-icons/fa';
import ChristmasModal from '../../components/ui/ChristmasModal';

const MAX_WISHES = 3;

const MyWishesPage = () => {
    const [wishes, setWishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newWishContent, setNewWishContent] = useState("");
    const [focusedSlot, setFocusedSlot] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchWishes();
    }, []);

    const fetchWishes = async () => {
        try {
            setLoading(true);
            const data = await wishService.getWishes();
            setWishes(data);
        } catch (error) {
            toast.error("Failed to fetch your wishes. The elves are investigating.");
        } finally {
            setLoading(false);
        }
    };

    const confirmWishCreation = (e) => {
        e.preventDefault();
        if (!newWishContent.trim()) return;
        setIsModalOpen(true);
    };

    const handleCreateWish = async () => {
        setIsModalOpen(false);

        if (wishes.length >= MAX_WISHES) {
            toast.error("You have already used all your wishes!");
            return;
        }

        try {
            setIsSubmitting(true);
            const newWish = await wishService.createWish(newWishContent);
            setWishes([...wishes, newWish]);
            setNewWishContent("");
            setFocusedSlot(null);

            // Standard styling with Icon as requested
            toast.success("Your wish has been sent to Santa!", {
                icon: '🎅',
                duration: 5000,
            });

        } catch (error) {
            toast.error("Could not make a wish. Magic interference?");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper to generate slots
    const renderSlots = () => {
        const slots = [];
        for (let i = 0; i < MAX_WISHES; i++) {
            const wish = wishes[i];
            const isFilled = !!wish;
            const isNext = !isFilled && i === wishes.length;
            const isLocked = !isFilled && i > wishes.length;

            slots.push(
                <motion.div
                    key={wish ? wish.id : `slot-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative p-6 rounded-2xl border transition-all duration-300 h-64 flex flex-col items-center justify-center text-center z-20 
                        ${isFilled
                            ? 'bg-white/10 border-white/20 backdrop-blur-md shadow-lg cursor-default'
                            : isNext
                                ? 'bg-santa-red/10 border-santa-red/30 border-dashed cursor-pointer hover:bg-santa-red/20 hover:scale-[1.02]'
                                : 'bg-black/20 border-white/5 opacity-50 cursor-not-allowed'
                        }
                    `}
                    onClick={() => isNext && setFocusedSlot(i)}
                >
                    {isFilled ? (
                        <>
                            <FaMagic className="text-yellow-400 text-3xl mb-4 animate-pulse" />
                            <p className="text-lg font-medium text-white line-clamp-4 overflow-hidden break-words w-full">
                                {wish.content}
                            </p>
                            <span className="absolute bottom-4 text-xs text-white/50">
                                Wished on {new Date(wish.created_at).toLocaleDateString()}
                            </span>
                        </>
                    ) : isNext ? (
                        focusedSlot === i ? (
                            <form onSubmit={confirmWishCreation} className="w-full flex flex-col items-center h-full justify-between py-2 relative z-30" onClick={(e) => e.stopPropagation()}>
                                <h3 className="text-santa-red font-bold mb-2 text-sm sm:text-base">Make Wish #{i + 1}</h3>
                                <textarea
                                    autoFocus
                                    className="w-full flex-grow bg-transparent text-white border-0 resize-none focus:ring-0 p-2 text-center placeholder-white/30 cursor-text text-sm sm:text-base leading-relaxed"
                                    placeholder="I wish for..."
                                    value={newWishContent}
                                    onChange={(e) => setNewWishContent(e.target.value)}
                                ></textarea>
                                <div className="flex flex-col sm:flex-row w-full gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setFocusedSlot(null)}
                                        className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-transparent hover:bg-white/10 text-white/70 rounded-full font-medium text-xs sm:text-sm transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-santa-red hover:bg-red-600 text-white rounded-full font-bold shadow-lg flex items-center justify-center gap-1 sm:gap-2 transform active:scale-95 transition-all cursor-pointer text-xs sm:text-sm"
                                    >
                                        {isSubmitting ? 'Sending...' : <>Grant It! <FaMagic /></>}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <FaPlus className="text-santa-red text-4xl mb-4 opacity-70" />
                                <h3 className="text-xl font-bold text-santa-red">Make a Wish</h3>
                                <p className="text-sm text-white/60">Tap to write your wish</p>
                            </>
                        )
                    ) : (
                        <>
                            <FaSnowflake className="text-white/10 text-4xl mb-4" />
                            <p className="text-sm text-white/30">Locked</p>
                        </>
                    )}
                </motion.div>
            );
        }
        return slots;
    };

    return (
        <div className="min-h-screen pt-24 px-4 pb-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-santa-red/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-200 mb-4 inline-block">
                        Your 3 Wishes
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Santha grants exactly three wishes. Choose wisely, for magic is a precious resource.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {renderSlots()}
                        </AnimatePresence>
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm max-w-3xl mx-auto text-center z-10 relative"
                >
                    <p className="text-white/60 text-sm">
                        "The magic lies not in the receiving, but in the believing."
                    </p>
                </motion.div>

                {/* Confirmation Modal */}
                <ChristmasModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleCreateWish}
                    title="Confirm Your Wish"
                    confirmText="Yes, Grant it!"
                    cancelText="Wait, let me think"
                >
                    <p className="mb-4">
                        You are about to make your <span className="font-bold text-santa-red">{wishes.length + 1}th wish</span> out of 3.
                    </p>
                    <p className="text-sm bg-white/5 p-4 rounded-lg border border-white/10 italic">
                        "{newWishContent}"
                    </p>
                    <p className="mt-4 text-xs text-yellow-200/80">
                        ⚠ Once granted, a wish cannot be undone or changed. Magic is binding!
                    </p>
                </ChristmasModal>
            </div>
        </div>
    );
};

export default MyWishesPage;
