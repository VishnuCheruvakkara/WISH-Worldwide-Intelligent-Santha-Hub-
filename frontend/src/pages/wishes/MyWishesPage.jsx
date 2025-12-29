import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form } from 'formik';
import wishService from '../../services/wishServices/wishService';
import { FaMagic, FaPlus, FaSnowflake } from 'react-icons/fa';
import ChristmasModal from '../../components/ui/modal/ChristmasModal';
import { showToast } from '../../components/ui/toast/ChrisToast';
import TextArea from '../../components/ui/input/TextArea';
import { WishSchema } from '../../validations/WishSchema';
import DateFormatter from '../../utils/date/DateFormatter';

const MAX_WISHES = 3;

const MyWishesPage = () => {
    const [wishes, setWishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [focusedSlot, setFocusedSlot] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Temporary state to hold form data for the modal confirmation
    const [pendingWish, setPendingWish] = useState(null);

    useEffect(() => {
        fetchWishes();
    }, []);

    const fetchWishes = async () => {
        try {
            setLoading(true);
            const data = await wishService.getWishes();
            // Ensure array even if backend response varies
            setWishes(Array.isArray(data) ? data : (data.results || []));
        } catch (error) {
            showToast.error("Failed to fetch your wishes. The elves are investigating.");
        } finally {
            setLoading(false);
        }
    };

    const initiateWishCreation = (values) => {
        setPendingWish(values.content);
        setIsModalOpen(true);
    };

    const handleConfirmWish = async () => {
        setIsModalOpen(false);

        if (wishes.length >= MAX_WISHES) {
            showToast.error("You have already used all your wishes!");
            return;
        }

        try {
            const newWish = await wishService.createWish(pendingWish);
            setWishes([...wishes, newWish]);
            setPendingWish(null);
            setFocusedSlot(null);

            showToast.success("Your wish has been sent to Santa!");
        } catch (error) {
            showToast.error("Could not make a wish. Magic interference?");
        }
    };

    // Render Logic
    const renderSlots = () => {
        const slots = [];
        for (let i = 0; i < MAX_WISHES; i++) {
            const wish = wishes[i];
            const isFilled = !!wish;
            const isNext = !isFilled && i === wishes.length;
            const isLocked = !isFilled && i > wishes.length;
            const isFocused = focusedSlot === i;

            slots.push(
                <motion.div
                    key={wish ? wish.id : `slot-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative p-6 rounded-2xl border transition-all duration-300 min-h-[320px] flex flex-col items-center justify-center text-center z-20 
                        ${isFilled
                            ? 'bg-white/10 border-white/20 backdrop-blur-md shadow-lg cursor-default'
                            : isNext
                                ? 'bg-santa-red/10 border-santa-red/30 border-dashed cursor-pointer hover:bg-santa-red/20 hover:scale-[1.02]'
                                : 'bg-black/20 border-white/5 opacity-50 cursor-not-allowed'
                        }
                    `}
                    onClick={() => isNext && !isFocused && setFocusedSlot(i)}
                >
                    {isFilled ? (
                        <div className="flex flex-col h-full justify-between items-center w-full">
                            <FaMagic className="text-yellow-400 text-3xl mb-4 animate-pulse" />
                            <div className="flex-grow flex items-center justify-center w-full">
                                <p className="text-lg font-medium text-white line-clamp-6 overflow-hidden break-words w-full px-4 italic">
                                    "{wish.content}"
                                </p>
                            </div>
                            <div className="mt-4 flex flex-col items-center gap-1 w-full">
                                <span className="text-[10px] uppercase tracking-widest text-santa-red font-bold">Wished On</span>
                                <DateFormatter
                                    dateString={wish.created_at}
                                    className="text-xs text-white/70 bg-black/20 px-3 py-1 rounded-full"
                                />
                            </div>
                        </div>
                    ) : isNext ? (
                        isFocused ? (
                            <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
                                <Formik
                                    initialValues={{ content: '' }}
                                    validationSchema={WishSchema}
                                    onSubmit={initiateWishCreation}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className="w-full h-full flex flex-col justify-between">
                                            <h3 className="text-santa-red font-bold mb-2">Make Wish #{i + 1}</h3>

                                            <div className="flex-grow w-full relative">
                                                <TextArea
                                                    name="content"
                                                    placeholder="I wish for..."
                                                    rows={5}
                                                    className="h-full"
                                                    autoFocus
                                                />
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-2 mt-4 w-full">
                                                <button
                                                    type="button"
                                                    onClick={() => setFocusedSlot(null)}
                                                    className="flex-1 px-4 py-2 bg-transparent hover:bg-white/10 text-white/70 rounded-full font-medium text-sm transition-all border border-white/10"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="flex-1 px-4 py-2 bg-santa-red hover:bg-red-600 text-white rounded-full font-bold shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all text-sm cursor-pointer"
                                                >
                                                    Review <FaMagic />
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <FaPlus className="text-santa-red text-4xl mb-4 opacity-70" />
                                <h3 className="text-xl font-bold text-santa-red">Make a Wish</h3>
                                <p className="text-sm text-white/60">Tap to unlock slot #{i + 1}</p>
                            </div>
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <FaSnowflake className="text-white/10 text-4xl mb-4" />
                            <p className="text-sm text-white/30">Locked</p>
                            <p className="text-xs text-white/20 mt-2">Use previous wish first</p>
                        </div>
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    onConfirm={handleConfirmWish}
                    title="Confirm Your Wish"
                    confirmText="Yes, Grant it!"
                    cancelText="Wait, let me think"
                >
                    <p className="mb-4">
                        You are about to make your <span className="font-bold text-santa-red">{wishes.length + 1}th wish</span> out of 3.
                    </p>
                    <div className="text-sm bg-white/5 p-4 rounded-lg border border-white/10 italic max-h-40 overflow-y-auto custom-scrollbar">
                        "{pendingWish}"
                    </div>
                    <p className="mt-4 text-xs text-yellow-200/80">
                        ⚠ Once granted, a wish cannot be undone or changed. Magic is binding!
                    </p>
                </ChristmasModal>
            </div>
        </div>
    );
};

export default MyWishesPage;
