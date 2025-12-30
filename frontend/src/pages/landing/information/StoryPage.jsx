import React from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import ChristmasScene from '../../../components/christmas-animation/ChristmasScene';
import { FaSnowflake, FaMagic } from 'react-icons/fa';

const StoryPage = () => {
    return (
        <div className="min-h-screen bg-santa-navy-dark text-white relative overflow-x-hidden">
            <Navbar />

            {/* Christmas Scene Background - Fixed */}
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <ChristmasScene className="h-full" />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
            </div>

            <div className="relative z-10 pt-24 md:pt-32 pb-12 md:pb-20 container mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-santa-navy/80 border border-white/10 backdrop-blur-sm">
                        <FaSnowflake className="text-santa-red text-xl mr-2 animate-spin-slow" />
                        <span className="text-sm font-semibold tracking-wider uppercase text-gray-100">The Legend</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
                        The Story of <span className="text-santa-red">Origin</span>
                    </h1>
                    <p className="text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto">
                        From the ancient shores of Myra to the digital clouds of the North Pole, the spirit of giving has evolved across centuries.
                    </p>
                </div>

                {/* Timeline Section */}
                <div className="relative max-w-4xl mx-auto mb-20">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-santa-red to-transparent hidden md:block"></div>

                    {/* Timeline Items */}
                    <div className="space-y-16">

                        {/* Item 1: St Nicholas */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative">
                            <div className="md:w-5/12 order-2 md:order-1 text-center md:text-right">
                                <h3 className="text-2xl font-bold text-santa-red mb-2">280 A.D.</h3>
                                <h4 className="text-xl font-semibold mb-2 text-white">The Saint of Myra</h4>
                                <p className="text-gray-100 text-sm leading-relaxed">
                                    The legend begins with St. Nicholas, a monk born in modern-day Turkey, admired for his piety and kindness, secretly gifting gold to the needy.
                                </p>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-santa-navy border-4 border-santa-red rounded-full z-10 hidden md:block"></div>
                            <div className="md:w-5/12 order-1 md:order-2">
                                <div className="bg-transparent border border-santa-red/30 p-2 rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <img src="/images/story/st_nicholas.png" alt="St Nicholas" className="w-full h-48 object-cover rounded-xl shadow-lg shadow-santa-red/10" />
                                </div>
                            </div>
                        </div>

                        {/* Item 2: Sinterklaas (NEW) */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative">
                            <div className="md:w-5/12 order-1 md:order-1">
                                <div className="bg-transparent border border-santa-red/30 p-2 rounded-2xl -rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <img src="/images/story/the_voyage_to_holy_land.png" alt="Voyage to Holland" className="w-full h-48 object-cover rounded-xl shadow-lg shadow-santa-red/10" />
                                </div>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-santa-navy border-4 border-santa-red rounded-full z-10 hidden md:block"></div>
                            <div className="md:w-5/12 order-2 md:order-2 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-santa-red mb-2">16th Century</h3>
                                <h4 className="text-xl font-semibold mb-2 text-white">The Voyage to Holland</h4>
                                <p className="text-gray-100 text-sm leading-relaxed">
                                    As the legend traveled through Europe, the Dutch embraced Sinterklaas. Wearing a bishop's miter and riding a white horse, he became the beloved bringer of gifts across the seas.
                                </p>
                            </div>
                        </div>

                        {/* Item 3: The Sleigh */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative">
                            <div className="md:w-5/12 order-2 md:order-1 text-center md:text-right">
                                <h3 className="text-2xl font-bold text-santa-red mb-2">1823</h3>
                                <h4 className="text-xl font-semibold mb-2 text-white">The Night Before Christmas</h4>
                                <p className="text-gray-100 text-sm leading-relaxed">
                                    Clement Clarke Moore’s poem introduced the world to the reindeer, the sleigh, and the jolly, magical figure we know today.
                                </p>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-santa-navy border-4 border-santa-red rounded-full z-10 hidden md:block"></div>
                            <div className="md:w-5/12 order-1 md:order-2">
                                <div className="bg-transparent border border-santa-red/30 p-2 rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <img src="/images/story/sleigh_origin.jpg" alt="Sleigh Origin" className="w-full h-48 object-cover rounded-xl shadow-lg shadow-santa-red/10" />
                                </div>
                            </div>
                        </div>

                        {/* Item 4: Thomas Nast (NEW) */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative">
                            <div className="md:w-5/12 order-1 md:order-1">
                                <div className="bg-transparent border border-santa-red/30 p-2 rounded-2xl -rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <img src="/images/story/red_suit_north_pole.png" alt="Thomas Nast Santa" className="w-full h-48 object-cover rounded-xl shadow-lg shadow-santa-red/10" />
                                </div>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-santa-navy border-4 border-santa-red rounded-full z-10 hidden md:block"></div>
                            <div className="md:w-5/12 order-2 md:order-2 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-santa-red mb-2">1863</h3>
                                <h4 className="text-xl font-semibold mb-2 text-white">The Red Suit & North Pole</h4>
                                <p className="text-gray-100 text-sm leading-relaxed">
                                    Illustrator Thomas Nast gave Santa his iconic red suit and established the North Pole as his home, complete with a workshop and a list of good children.
                                </p>
                            </div>
                        </div>

                        {/* Item 5: Modern Icons (NEW) */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative">
                            <div className="md:w-5/12 order-2 md:order-1 text-center md:text-right">
                                <h3 className="text-2xl font-bold text-santa-red mb-2">1931</h3>
                                <h4 className="text-xl font-semibold mb-2 text-white">The Jolly Standard</h4>
                                <p className="text-gray-100 text-sm leading-relaxed">
                                    Haddon Sundblom's illustrations for Coca-Cola cemented the image of a grandfatherly, jolly Santa, standardizing his look for the modern advertising age.
                                </p>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-santa-navy border-4 border-santa-red rounded-full z-10 hidden md:block"></div>
                            <div className="md:w-5/12 order-1 md:order-2">
                                <div className="bg-transparent border border-santa-red/30 p-2 rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <img src="/images/story/jolly_standard.jpg" alt="Jolly Standard Santa" className="w-full h-48 object-cover rounded-xl shadow-lg shadow-santa-red/10" />
                                </div>
                            </div>
                        </div>

                        {/* Item 6: W.I.S.H. */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative">
                            <div className="md:w-5/12 order-1 md:order-1">
                                <div className="bg-transparent border border-santa-red/30 p-2 rounded-2xl -rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <img src="/images/story/wish_future.png" alt="W.I.S.H. Future" className="w-full h-48 object-cover rounded-xl shadow-lg shadow-santa-red/10" />
                                </div>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-santa-red text-white rounded-full z-10 hidden md:flex items-center justify-center border-4 border-santa-navy">
                                <FaMagic />
                            </div>
                            <div className="md:w-5/12 order-2 md:order-2 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-santa-red mb-2">The Future</h3>
                                <h4 className="text-xl font-semibold mb-2 text-white">W.I.S.H. Initiative</h4>
                                <p className="text-gray-100 text-sm leading-relaxed">
                                    Today, magic meets technology. The Worldwide Intelligent Santha Hub ensures that no wish goes unheard in an ever-connected world.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default StoryPage;
