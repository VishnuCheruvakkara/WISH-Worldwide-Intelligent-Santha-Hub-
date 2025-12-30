import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FaImage, FaPlus, FaCloudUploadAlt, FaCalendarAlt, FaInfoCircle, FaSnowflake } from 'react-icons/fa';
import galleryService from '../../services/galleryService';
import { showToast } from '../../components/ui/toast/ChrisToast';
import GalleryModal from '../../components/ui/modal/GalleryModal';
import GalleryPhoto from '../../components/gallery/GalleryPhoto';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/ui/input/Input';
import CommonSpinner from '../../components/ui/spinner/CommonSpinner';

const GalleryPage = () => {
    const { user } = useSelector((state) => state.userAuth);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

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

    const validationSchema = Yup.object().shape({
        caption: Yup.string()
            .required('A magical quote is required')
            .max(200, 'Keep it short! Quotes should be under 200 characters.'),
        image: Yup.mixed()
            .required('Please pick a beautiful image!')
            .test('fileSize', 'Image is too large (max 5MB)', (value) => {
                return !value || (value && value.size <= 5 * 1024 * 1024);
            })
            .test('fileFormat', 'Unsupported format (use JPG, JPEG, PNG, or WEBP)', (value) => {
                return !value || (value && ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(value.type));
            }),
    });

    const handleSubmit = async (values, { resetForm }) => {
        if (isLimitReached) {
            showToast.error("You've already shared 3 magical moments!");
            return;
        }

        try {
            setSubmitting(true);
            setIsAddModalOpen(false); // Close modal immediately as requested

            const formData = new FormData();
            formData.append('image', values.image);
            formData.append('caption', values.caption);

            await galleryService.addGalleryItem(formData);
            showToast.success("Event added to Christmas Gallery! 🎄");
            resetForm();
            fetchGallery();
        } catch (error) {
            showToast.error(error.response?.data?.error || "The magic failed. Try again!");
            setIsAddModalOpen(true); // Re-open if failed? Or maybe just toast.
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-4 px-3 pb-6 relative overflow-hidden text-white">
            {submitting && <CommonSpinner />}

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
            <Formik
                initialValues={{ caption: '', image: null }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values, errors, touched, handleBlur }) => {
                    const [preview, setPreview] = useState(null);

                    const handleImageChange = (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setFieldValue('image', file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setPreview(reader.result);
                            };
                            reader.readAsDataURL(file);
                        }
                    };

                    return (
                        <GalleryModal
                            isOpen={isAddModalOpen}
                            onClose={() => {
                                setIsAddModalOpen(false);
                                setPreview(null);
                            }}
                            title="Share a Magical Moment"
                        >
                            <Form className="space-y-8">
                                <div className="space-y-6">
                                    <div className="relative group">
                                        <label className="block text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Event Photo</label>
                                        <div
                                            className={`h-64 rounded-3xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-4
                                                ${preview ? 'border-orange-500/50 bg-orange-500/5' : (errors.image && touched.image ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 bg-white/5 hover:border-orange-500/30 hover:bg-orange-500/5')}
                                            `}
                                            onClick={() => document.getElementById('image-upload').click()}
                                        >
                                            {preview ? (
                                                <div className="w-full h-full relative p-2">
                                                    <img src={preview} className="w-full h-full object-cover rounded-2xl" alt="Preview" />
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
                                            name="image"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.image && touched.image && (
                                            <div className="text-santa-red text-[11px] mt-2 ml-1 font-bold bg-santa-red/10 px-2 py-0.5 rounded-md w-fit">
                                                {errors.image}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <Input
                                            name="caption"
                                            label="Memory / Quote"
                                            placeholder="Enter a festive quote (e.g. Ho Ho Ho!)..."
                                        />
                                        <div className="flex justify-end mt-1">
                                            <span className={`text-[10px] font-medium ${(values.caption?.length || 0) > 200 ? 'text-red-400' : 'text-white/20'}`}>
                                                {(values.caption?.length || 0)}/200
                                            </span>
                                        </div>
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
                                        className="flex-[2] py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold uppercase tracking-widest rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer hover:shadow-orange-500/40 hover:-translate-y-0.5"
                                    >
                                        <FaPlus size={10} />
                                        <span>Post to Gallery</span>
                                    </button>
                                </div>
                            </Form>
                        </GalleryModal>
                    );
                }}
            </Formik>
        </div>
    );
};

export default GalleryPage;
