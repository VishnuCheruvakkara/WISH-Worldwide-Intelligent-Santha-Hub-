import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import Button from '../../components/ui/button/Button';
import Input from '../../components/ui/input/Input';
import Navbar from '../../components/navbar/Navbar';
import ChristmasScene from '../../components/christmas-animation/ChristmasScene';
import LoginSchema from '../../validations/LoginSchema';
import PublisAxios from '../../axios/PublisAxios';
import { loginSuccess } from '../../redux/Slice/userAuthSlice';
import { showToast } from '../../components/ui/toast/ChrisToast';

import GoogleAuthButton from '../../components/GoogleAuthButton.jsx/GoogleAuthButton';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await PublisAxios.post('/users/login/', values);
            const { access, id, username, email, is_admin } = response.data.data;

            dispatch(loginSuccess({
                access,
                user: { id, username, email, is_admin }
            }));

            showToast.success(`Welcome back, ${username}!`);
            navigate('/');
        } catch (err) {
            showToast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-santa-navy-dark text-white relative overflow-x-hidden">
            <Navbar />

            {/* Christmas Scene Background - Fixed */}
            <div className="fixed inset-0 z-0 opacity-90 pointer-events-none">
                <ChristmasScene className="h-full" />
            </div>

            <div className="min-h-screen flex flex-col justify-center items-center py-12 md:py-20 relative z-10 pt-24 px-2 sm:px-4">
                <div className="w-full max-w-md p-0 sm:p-2">
                    <div className="bg-[#002455]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                        {/* Decor */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF3838] rounded-full blur-[60px] opacity-20"></div>

                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                            <p className="text-gray-400 text-sm">Log in to continue your wish journey</p>
                        </div>

                        <div className="mb-6 space-y-4">
                            <GoogleAuthButton />

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-white/10"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-500 text-[10px] uppercase tracking-widest font-bold">Or use email</span>
                                <div className="flex-grow border-t border-white/10"></div>
                            </div>
                        </div>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={LoginSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-5">
                                    <Input
                                        label="Email Address"
                                        placeholder="santa@northpole.com"
                                        type="email"
                                        icon={FaEnvelope}
                                        name="email"
                                    />

                                    <Input
                                        label="Password"
                                        placeholder="••••••••"
                                        type="password"
                                        icon={FaLock}
                                        name="password"
                                    />

                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent text-[#FF3838] focus:ring-[#FF3838]" />
                                            <span className="text-gray-400 group-hover:text-white transition-colors">Remember me</span>
                                        </label>
                                        <a href="#" className="text-[#FF3838] hover:text-[#DC0000] font-medium transition-colors">Forgot Password?</a>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full shadow-lg shadow-santa-red/20"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>

                        <p className="mt-8 text-center text-sm text-gray-400">
                            Don't have an account?
                            <Link to="/signup" className="text-[#FF3838] hover:text-[#DC0000] font-bold ml-1">Sign up</Link>
                        </p>
                    </div >
                </div >
            </div >
        </div >
    );
};

export default LoginPage;
