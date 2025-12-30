import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FaImage, FaPlus, FaCloudUploadAlt, FaCalendarAlt, FaInfoCircle, FaSnowflake } from 'react-icons/fa';
import galleryService from '../../services/galleryService';
import { showToast } from '../../components/ui/toast/ChrisToast';
import GalleryModal from '../../components/ui/modal/GalleryModal';
import GalleryPhoto from '../../components/gallery/GalleryPhoto';

const GalleryPage = () => {
    const { user } = useSelector((state) => state.userAuth);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [caption, setCaption] = useState('');

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            setLoading(true);
            const data = await galleryService.getGalleryItems();
            setItems(data?.results || data || []);
        } catch (error) {
            showToast.error("Could not load the magic gallery!");
        } finally {
            setLoading(false);
        }
    };

    const userItemCount = items.filter(item => item.username === user?.username).length;
    const isLimitReached = !user?.is_admin && userItemCount >= 3;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLimitReached) {
            showToast.error("You've already shared 3 magical moments!");
            return;
        }
        if (!image) {
            showToast.error("Please pick a beautiful image!");
            return;
        }

        try {
            setSubmitting(true);
            const formData = new FormData();
            formData.append('image', image);
            formData.append('caption', caption);

            await galleryService.addGalleryItem(formData);
            showToast.success("Event added to Christmas Gallery! 🎄");
            setIsAddModalOpen(false);
            setImage(null);
            setImagePreview(null);
            setCaption('');
            fetchGallery();
        } catch (error) {
            showToast.error("The magic failed. Try again!");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-4 px-3 pb-6 relative overflow-hidden text-white">
            <div className="max-w-6xl mx-auto py-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-santa-red opacity-40 blur-xl"></div>
                            <FaCalendarAlt className="relative text-2xl text-santa-red drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight uppercase">Christmas Event Gallery</h1>
                            <p className="text-[10px] text-white/40 italic flex items-center gap-2">
                                <FaSnowflake className="animate-spin-slow text-santa-red" />
                                Capturing magical moments of the season
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {isLimitReached && (
                            <span className="text-[10px] font-bold text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full border border-orange-400/20 uppercase tracking-widest hidden sm:block">
                                Event Limit Reached (3/3)
                            </span>
                        )}
                        <button
                            disabled={isLimitReached}
                            onClick={() => setIsAddModalOpen(true)}
                            className={`flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-[0_4px_15px_rgba(249,115,22,0.3)] transition-all active:scale-95 group overflow-hidden relative cursor-pointer
                                ${isLimitReached ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-105 hover:shadow-orange-500/40'}
                            `}
                        >
                            <div className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <FaPlus className="relative text-sm" />
                            <span className="relative">Add Event</span>
                        </button>
                    </div>
                </div>

                {/* Info Box */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-santa-red/5 border border-santa-red/20 rounded-2xl p-4 mb-10 flex items-start gap-4 backdrop-blur-sm"
                >
                    <div className="w-8 h-8 rounded-full bg-santa-red/20 flex items-center justify-center flex-shrink-0">
                        <FaInfoCircle className="text-santa-red" />
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-santa-red uppercase tracking-wider mb-1">About the Gallery</h4>
                        <p className="text-sm text-white/60 leading-relaxed">
                            Welcome to the Christmas Event Gallery! This is a special place where our community shares magical moments, festive quotes, and heartwarming holiday stories. To keep it special, each user can share up to 3 events.
                        </p>
                    </div>
                </motion.div>

                {/* Gallery Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="aspect-square bg-white/5 border border-white/5 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                ) : items.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
                    >
                        {items.map((item) => (
                            <GalleryPhoto key={item.id} item={item} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
                        <div className="w-20 h-20 bg-santa-red/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-santa-red/20">
                            <FaImage className="text-3xl text-santa-red/50" />
                        </div>
                        <h3 className="text-xl font-bold text-white/70">No memories yet</h3>
                        <p className="text-white/40 mt-2">Be the first to share a magical moment!</p>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="mt-6 text-orange-500 hover:text-orange-400 font-semibold flex items-center gap-2 mx-auto"
                        >
                            <FaPlus size={12} /> Add memory
                        </button>
                    </div>
                )}
            </div>

            {/* Add Event Modal */}
            <GalleryModal
                isOpen={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false);
                    setImage(null);
                    setImagePreview(null);
                    setCaption('');
                }}
                title="Share a Magical Moment"
            >
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <div className="relative group">
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Event Photo</label>
                            <div
                                className={`h-64 rounded-3xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-4
                                    ${imagePreview ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10 bg-white/5 hover:border-orange-500/30 hover:bg-orange-500/5'}
                                `}
                                onClick={() => document.getElementById('image-upload').click()}
                            >
                                {imagePreview ? (
                                    <div className="w-full h-full relative p-2">
                                        <img src={imagePreview} className="w-full h-full object-cover rounded-2xl" alt="Preview" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                                            <p className="text-white text-xs font-bold uppercase tracking-widest">Change Photo</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-lg">
                                            <FaCloudUploadAlt className="text-3xl text-white/20 group-hover:text-orange-500 transition-colors" />
                                        </div>
                                        <div className="text-center px-6">
                                            <p className="text-sm font-bold text-white/80">Click to upload the magic</p>
                                            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-2 leading-relaxed">High quality photos look best in the gallery</p>
                                        </div>
                                    </>
                                )}
                            </div>
                            <input
                                id="image-upload"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Memory / Quote</label>
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Describe the spirit of this moment or add a festive quote..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all resize-none h-40 shadow-inner"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-white/5">
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-2xl transition-all cursor-pointer"
                        >
                            Back to Gallery
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`flex-[2] py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold uppercase tracking-widest rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer
                                ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-orange-500/40 hover:-translate-y-0.5'}
                            `}
                        >
                            {submitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Sharing Magic...</span>
                                </>
                            ) : (
                                <>
                                    <FaPlus size={10} />
                                    <span>Post to Gallery</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </GalleryModal>
        </div>
    );
};

export default GalleryPage;
