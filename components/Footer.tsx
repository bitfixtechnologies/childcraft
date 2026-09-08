import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#011422] text-gray-300 py-6 md:py-8">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-8">
                    {/* Left: Logo & Company Name */}
                    <div className="flex flex-col items-start text-left">
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                            <Link href="/" className="shrink-0">
                                <div className="p-1 rounded-xl inline-block">
                                    <Image
                                        src="/images/logo2.png"
                                        alt="Childcraft Logo"
                                        width={80}
                                        height={16}
                                        className="object-contain md:w-[90px]"
                                    />
                                </div>
                            </Link>
                            <h3 className="text-sm md:text-[15px] font-bold text-white leading-tight">
                                Childcraft Hallmark Publishers (P) Ltd
                            </h3>
                        </div>
                        <p className="text-gray-400 max-w-sm text-[10px] md:text-xs leading-relaxed">
                            Dedicated to bringing the best educational and engaging content to
                            children everywhere. Excellence in publishing for over a decade.
                        </p>
                    </div>

                    {/* Center: Quick Links */}
                    <div className="flex flex-col items-start md:pl-16">
                        <h4 className="text-base md:text-lg font-bold text-white mb-4 uppercase tracking-wider relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-sky-400 rounded-full"></span>
                        </h4>
                        <ul className="space-y-2 md:space-y-3 font-medium text-sm md:text-base">
                            <li>
                                <Link href="/" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link href="/gallery" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right: Address */}
                    <div className="flex flex-col items-start">
                        <h4 className="text-base md:text-lg font-bold text-white mb-4 uppercase tracking-wider relative inline-block">
                            Contact Us
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-sky-400 rounded-full"></span>
                        </h4>
                        <ul className="space-y-3 md:space-y-4 text-sm md:text-base">
                            <li className="flex items-start gap-3 md:gap-4 hover:text-white transition-colors">
                                <FaMapMarkerAlt className="text-white mt-1 shrink-0 text-lg md:text-xl" />
                                <span className="leading-relaxed max-w-xs">
                                    Childcraft Hallmark Publishers (P) Ltd<br />
                                    KRL Road, Kundannoor Jn,<br />
                                    Kochi, Kerala.
                                </span>
                            </li>
                            <li className="flex items-center gap-3 md:gap-4 hover:text-white transition-colors">
                                <FaPhoneAlt className="text-white shrink-0" />
                                <a href="tel:+91 95392 72059" className="hover:underline">
                                    +91 95392 72059
                                </a>
                            </li>
                            <li className="flex items-center gap-3 md:gap-4 hover:text-white transition-colors">
                                <FaEnvelope className="text-white shrink-0" />
                                <a href="mailto:info@childcraftbooks.com" className="hover:underline">
                                    info@childcraftbooks.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Separator */}
                <hr className="border-gray-800 my-6" />

                {/* Bottom: Copyright & Socials */}
                <div className="text-center text-xs md:text-sm text-gray-500">
                    <p>
                        &copy; {new Date().getFullYear()} Childcraft Hallmark Publishers (P) Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
