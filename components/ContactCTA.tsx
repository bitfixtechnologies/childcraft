import Link from 'next/link';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactCTA() {
    return (
        <section className="py-10 md:py-16 bg-linear-to-br from-blue-900 via-blue-950 to-slate-900 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/15 p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 hover:bg-white/15 transition-all duration-300">

                    {/* Text Section */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold text-xs mb-4 uppercase tracking-wider border border-sky-400/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse"></span>
                            Get In Touch
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-[1.2]">
                            Ready to start a joyful journey with us?
                        </h2>
                        <p className="text-base text-slate-200 mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                            Whether you have a question about our books, workshops, or training programs, we are here to help. Reach out to our team today!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-sky-500 rounded-xl hover:bg-sky-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                Contact Us Now
                            </Link>
                        </div>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="hidden md:block w-full lg:w-auto lg:min-w-[280px] bg-linear-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/20 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/15 rounded-full filter blur-2xl group-hover:bg-pink-500/25 transition-colors duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/15 rounded-full filter blur-2xl group-hover:bg-purple-500/25 transition-colors duration-500"></div>

                        <h3 className="text-lg font-bold mb-6 relative z-10 border-b border-pink-500/20 pb-3">Quick Contact</h3>

                        <ul className="space-y-4 relative z-10">
                            <li className="flex items-center gap-4 group/item">
                                <span className="bg-white/10 p-2.5 rounded-xl text-pink-300 group-hover/item:scale-110 group-hover/item:bg-white/20 transition-all">
                                    <FaEnvelope className="w-4 h-4" />
                                </span>
                                <div>
                                    <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold mb-0.5">Email Us</p>
                                    <p className="text-xs font-medium hover:text-pink-300 transition-colors cursor-pointer">info@childcraftbooks.com</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-4 group/item">
                                <span className="bg-white/10 p-2.5 rounded-xl text-pink-300 group-hover/item:scale-110 group-hover/item:bg-white/20 transition-all">
                                    <FaMapMarkerAlt className="w-4 h-4" />
                                </span>
                                <div>
                                    <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold mb-0.5">Visit Us</p>
                                    <p className="text-xs font-medium">Kochi, Kerala</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}
