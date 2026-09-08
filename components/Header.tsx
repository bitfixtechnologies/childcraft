"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("adminToken"));
    }, [pathname]);


    const menuItems = ['Home', 'About', 'Career', 'Gallery', 'Contact'];

    const subMenus: { [key: string]: { name: string; path: string }[] } = {
        Career: [
            { name: 'Overview', path: '/career' },
            { name: 'Open Positions', path: '/career#positions' },
        ],
        About: [
            { name: 'Overview', path: '/about' },
            { name: 'Quality', path: '/about/quality' },
            { name: 'Our Journey', path: '/about/journey' },
            { name: 'FAQ', path: '/about/faq' },
        ],
    };
    // bg-[#8d3072]
    return (
        <>

            <header className="sticky top-0 z-50 w-full h-[70px] flex items-center px-6 sm:px-20 bg-white shadow-sm">
                {/* Left Side - Logo and Text Branding */}
                <div className="hidden lg:flex flex-[1.5] items-center gap-3">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/images/Child Craft Logo.png"
                            alt="Child Craft Logo"
                            width={62}
                            height={62}
                            className="object-contain"
                        />
                        <div className="flex flex-col justify-center">
                            <h1 className="text-lg sm:text-[20px] font-black tracking-wide text-[#0d2a4a] leading-tight">CHILD CRAFT</h1>
                            <p className="text-lg sm:text-[20px] font-black tracking-wide text-[#0d2a4a] leading-tight">HALLMARK PUBLISHERS (P) LTD</p>
                        </div>
                    </Link>
                </div>

                {/* Desktop Menu - Center */}
                <nav className="hidden lg:flex flex-1 justify-center">
                    <ul className="flex items-center gap-6 group/nav">
                        {menuItems.map((item) => {
                            const itemPath = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                            const isSubActive = subMenus[item]?.some(sub => pathname === sub.path);
                            const isActive = pathname === itemPath || isSubActive;
                            const hasSubMenu = !!subMenus[item];

                            return (
                                <li key={item} className="relative group/menu py-2">
                                    <Link
                                        href={itemPath}
                                        className={`flex items-center gap-1 text-[16px] tracking-wide font-semibold py-1.5 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:transition-transform after:duration-300 ${isActive
                                            ? 'text-primary after:scale-x-100'
                                            : 'text-slate-800 hover:text-primary after:scale-x-0 hover:after:scale-x-100'
                                            }`}
                                    >
                                        {item}
                                        {hasSubMenu && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className={`w-4 h-4 transition-transform duration-300 group-hover/menu:-rotate-180 ${isActive ? 'text-primary' : 'text-slate-800 group-hover/menu:text-primary'}`}
                                            >
                                                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </Link>

                                    {hasSubMenu && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible translate-y-2 group-hover/menu:translate-y-0 group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 z-50 min-w-[250px]">
                                            <div className="bg-white border border-gray-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] overflow-hidden py-1 backdrop-blur-md">
                                                {subMenus[item].map((subItem) => (
                                                    <Link
                                                        key={subItem.path}
                                                        href={subItem.path}
                                                        className={`flex items-start px-5 py-2.5 text-sm font-medium transition-colors ${pathname === subItem.path ? 'text-primary' : 'text-slate-800 hover:text-primary'
                                                            }`}
                                                    >
                                                        {subItem.name}
                                                        {subItem.name === 'Open Positions' && (
                                                            <span className="relative flex h-2.5 w-2.5 items-center justify-center mt-1">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                                            </span>
                                                        )}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Right Side - Logos & Admin Portal */}
                <div className="hidden lg:flex flex-1 justify-end items-center gap-3">
                    {isLoggedIn ? (
                        <>
                            <Link
                                href="/admin"
                                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary border border-primary/20 hover:bg-primary/5 rounded-xl transition-all mr-1"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={() => {
                                    localStorage.removeItem("adminToken");
                                    localStorage.removeItem("adminUser");
                                    setIsLoggedIn(false);
                                    window.location.href = "/";
                                }}
                                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 hover:text-rose-700 border border-rose-200 hover:border-rose-350 hover:bg-rose-50 rounded-xl transition-all mr-2"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/admin"
                            className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-primary border border-slate-200 hover:border-primary rounded-xl transition-all mr-2"
                        >
                            Admin Portal
                        </Link>
                    )}
                    <Link href="/" className="group border-r pr-4 border-gray-100 last:border-0 last:pr-0 flex items-center">
                        <Image
                            src="/images/logo2.png"
                            alt="Logo 1"
                            width={55}
                            height={55}
                            className="object-contain transition-transform"
                        />
                    </Link>
                    <Link href="/" className="group flex items-center">
                        <Image
                            src="/images/logo44.jpg"
                            alt="Logo 2"
                            width={42}
                            height={42}
                            className="object-contain transition-transform rounded shadow-sm"
                        />
                    </Link>
                </div>

                {/* Mobile View Layout */}
                <Link href="/" className="lg:hidden flex items-center gap-2">
                    <Image
                        src="/images/Child Craft Logo.png"
                        alt="Logo"
                        width={46}
                        height={46}
                        className="object-contain"
                    />
                    <div className="flex flex-col justify-center">
                        <h1 className="text-[14px] sm:text-[15px] font-black text-[#0d2a4a] tracking-wide leading-tight">CHILD CRAFT</h1>
                        <p className="text-[14px] sm:text-[15px] font-black text-[#0d2a4a] tracking-wide leading-tight">HALLMARK PUBLISHERS (P) LTD</p>
                    </div>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-gray-800 mr-4 z-20 relative w-8 h-8 flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`size-8 absolute transition-all duration-700 ease-in-out transform ${isMobileMenuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'
                            }`}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`size-8 absolute transition-all duration-700 ease-in-out transform ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'
                            }`}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`absolute top-[70px] left-0 w-full bg-white shadow-lg lg:hidden z-20 border-t border-gray-100 overflow-hidden transition-all duration-1100 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <ul className="flex flex-col py-4 px-6 gap-4">
                        {menuItems.map((item) => {
                            const itemPath = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                            const isActive = pathname === itemPath;

                            return (
                                <li key={item}>
                                    <Link
                                        href={itemPath}
                                        className={`font-medium uppercase text-sm tracking-wide block py-2 border-b transition-colors ${isActive
                                            ? 'text-primary border-primary'
                                            : 'text-gray-500 border-gray-100 hover:text-primary'
                                            }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            );
                        })}
                        <li>
                            {isLoggedIn ? (
                                <div className="flex flex-col gap-2 pt-2 border-t border-gray-150">
                                    <Link
                                        href="/admin"
                                        className="font-semibold uppercase text-xs tracking-wider block py-2 text-primary hover:text-primary-hover"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("adminToken");
                                            localStorage.removeItem("adminUser");
                                            setIsLoggedIn(false);
                                            setIsMobileMenuOpen(false);
                                            window.location.href = "/";
                                        }}
                                        className="font-semibold uppercase text-xs tracking-wider block py-2 text-left text-rose-600 hover:text-rose-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/admin"
                                    className="font-semibold uppercase text-xs tracking-wider block py-2 border-b text-primary border-primary/20 hover:text-primary-hover"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Admin Portal
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>


            </header>
        </>
    );
};

export default Header;