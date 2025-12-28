import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { FaStar, FaScroll, FaMagic } from 'react-icons/fa';
import Button from '../../components/ui/button/Button';
import Input from '../../components/ui/input/Input';
import Navbar from '../../components/navbar/Navbar';
import ChristmasScene from '../../components/christmas-animation/ChristmasScene';

import { showToast } from '../../components/ui/toast/ChrisToast';

const SantaLoginPage = () => {
    const navigate = useNavigate();

    const initialValues = {
        spiritName: '',
        secretCode: '',
    };

    const handleLogin = (values, { setSubmitting }) => {
        if (values.secretCode === 'hohoho' || values.secretCode === 'admin') {
            showToast.success("Welcome Santa! The sleigh is ready and the reindeer are fed. 🦌");
        } else {
            showToast.error("This code selection feels... lacking in spirit. Try again!");
        }
        setSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-santa-navy-dark text-white relative overflow-x-hidden">
            <Navbar />

            {/* Christmas Scene Background - Fixed */}
            <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
                <ChristmasScene className="h-full" />
            </div>

            <div className="min-h-screen flex flex-col justify-center items-center py-12 md:py-20 relative z-10 pt-24 px-2 sm:px-4">
                <div className="w-full max-w-md p-0 sm:p-2">
                    <div className="bg-santa-navy/80 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">

                        {/* Decor - Divine Gold Glow */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full blur-[80px] opacity-20 animate-pulse"></div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-santa-red rounded-full blur-[60px] opacity-10"></div>

                        <div className="text-center mb-8 relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-santa-red to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30 text-white shadow-lg">
                                <FaMagic size={32} />
                            </div>
                            <h2 className="text-3xl font-bold mb-2 text-white">Santa's Sanctum</h2>
                            <p className="text-gray-300 text-sm">Enter the Magic Code</p>
                        </div>

                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleLogin}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-6 relative z-10">
                                    <Input
                                        label="Name of Spirit"
                                        placeholder="St. Nicholas"
                                        type="text"
                                        icon={FaStar}
                                        name="spiritName"
                                    />
                                    <Input
                                        label="Secret Scroll Code"
                                        placeholder="••••••••"
                                        type="password"
                                        icon={FaScroll}
                                        name="secretCode"
                                    />

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full shadow-lg shadow-yellow-500/20 border border-white/20 bg-gradient-to-r from-santa-red to-red-600 hover:from-red-600 hover:to-santa-red"
                                    >
                                        {isSubmitting ? 'Unlocking...' : 'Unlock the Magic'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>

                        <div className="mt-8 text-center">
                            <span className="text-xs text-yellow-200/60 uppercase tracking-widest font-serif">Only for the pure of heart</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SantaLoginPage;
