import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { FaEnvelope, FaLock, FaMagic } from 'react-icons/fa';
import Button from '../../components/ui/button/Button';
import Input from '../../components/ui/input/Input';
import Navbar from '../../components/navbar/Navbar';
import ChristmasScene from '../../components/christmas-animation/ChristmasScene';
import LoginSchema from '../../validations/LoginSchema';
import PublisAxios from '../../axios/PublisAxios';
import { loginSuccess } from '../../redux/Slice/userAuthSlice';
import { showToast } from '../../components/ui/toast/ChrisToast';
import CommonSpinner from '../../components/ui/spinner/CommonSpinner';

const SantaLoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password: '',
    };

    const handleLogin = async (values, { setSubmitting }) => {
        try {
            const response = await PublisAxios.post('/users/admin-login/', values);
            const { access, id, username, email, is_admin } = response.data.data;

            dispatch(loginSuccess({
                access,
                user: { id, username, email, is_admin }
            }));

            showToast.success("Welcome back, Grand Santha! The North Pole is under your command. 🎅✨");
            navigate('/');
        } catch (err) {
            showToast.error(err.response?.data?.message || 'The magic code seems incorrect. Only the true Santha may enter!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-santa-navy-dark text-white relative overflow-x-hidden">
            <Navbar />

            {/* Christmas Scene Background - Fixed */}
            <div className="fixed inset-0 z-0 opacity-60 pointer-events-none">
                <ChristmasScene className="h-full" />
            </div>

            <div className="min-h-screen flex flex-col justify-center items-center py-12 md:py-20 relative z-10 pt-24 px-2 sm:px-4">
                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={handleLogin}
                >
                    {({ isSubmitting }) => (
                        <>
                            {isSubmitting && <CommonSpinner />}
                            <div className="w-full max-w-md p-0 sm:p-2">
                                <div className="bg-[#050E3C]/80 backdrop-blur-xl border border-santa-red/20 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(255,56,56,0.1)] relative overflow-hidden">

                                    {/* Divine Glow Effects */}
                                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-santa-red rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-500 rounded-full blur-[80px] opacity-10"></div>

                                    <div className="text-center mb-8 relative z-10">
                                        <div className="w-20 h-20 bg-gradient-to-br from-santa-red via-red-600 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 text-white shadow-[0_0_30px_rgba(255,56,56,0.4)] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                            <FaMagic size={32} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                        </div>
                                        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-white to-red-200 bg-clip-text text-transparent">Santha's Sanctum</h2>
                                        <p className="text-gray-400 text-sm tracking-widest uppercase font-light">Guardians of Magic Only</p>
                                    </div>

                                    <Form className="space-y-6 relative z-10">
                                        <Input
                                            label="Santha Email"
                                            placeholder="grand.santha@northpole.com"
                                            type="email"
                                            icon={FaEnvelope}
                                            name="email"
                                        />
                                        <Input
                                            label="Secret Command"
                                            placeholder="••••••••"
                                            type="password"
                                            icon={FaLock}
                                            name="password"
                                        />

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-12 shadow-xl shadow-santa-red/20 border border-white/10 bg-gradient-to-r from-santa-red to-red-700 hover:from-red-600 hover:to-santa-red transition-all duration-500 font-bold tracking-widest uppercase text-sm"
                                        >
                                            {isSubmitting ? 'Channeling Magic...' : 'Unlock the Sleigh'}
                                        </Button>
                                    </Form>

                                    <div className="mt-10 text-center border-t border-white/5 pt-6">
                                        <span className="text-[10px] text-yellow-200/40 uppercase tracking-[0.5em] font-serif block">Authorized access only</span>
                                        <span className="text-[9px] text-gray-500 mt-2 block italic">W.I.S.H. Security Protocol Active</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SantaLoginPage;
