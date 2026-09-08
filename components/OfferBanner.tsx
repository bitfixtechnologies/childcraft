"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/utils/api";

export default function OfferBanner() {
    const [offers, setOffers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchActiveOffers = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/offer/active`);
                if (res.ok) {
                    const data = await res.json();
                    setOffers(Array.isArray(data) ? data : data ? [data] : []);
                }
            } catch (err) {
                console.error("Failed to fetch active offers:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchActiveOffers();
    }, []);

    // Auto-swipe effect for multi-offer slideshow
    useEffect(() => {
        if (offers.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % offers.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [offers]);

    if (loading) return null;
    if (offers.length === 0) return null;

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % offers.length);
    };

    // Helper render function for a single offer card's inner content
    const renderCardContent = (offer: any) => {
        return (
            <div className="relative bg-linear-to-r from-blue-900 via-blue-950 to-slate-900 rounded-3xl overflow-hidden shadow-2xl p-8 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 transition-all duration-700 min-h-[250px] w-full">
                {/* Glowing background highlights */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 pointer-events-none"></div>

                {/* Left text */}
                <div className="flex-1 text-center md:text-left relative z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sky-300 font-semibold text-xs uppercase tracking-wider mb-6 border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-ping"></span>
                        {offer.tag}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight leading-tight">
                        {offer.title}
                    </h2>
                    <p className="text-base text-slate-300 max-w-xl leading-relaxed font-light">
                        {offer.description}
                    </p>
                </div>

                {/* Right CTA button */}
                <div className="relative z-10 shrink-0">
                    <Link
                        href={offer.buttonLink}
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 bg-white hover:bg-sky-50 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        {offer.buttonText}
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <section className="py-12 md:py-20 bg-slate-50 relative" id="homepage-offer">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 relative group">
                {offers.length === 1 ? (
                    // Single offer mode
                    renderCardContent(offers[0])
                ) : (
                    // Slideshow / Swipe Mode
                    <div className="relative w-full overflow-hidden">
                        {/* Slide Display with fade-in effect */}
                        <div className="transition-all duration-700 ease-in-out">
                            {renderCardContent(offers[currentSlide])}
                        </div>

                        {/* Swipe Left Arrow */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
                            aria-label="Previous Offer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* Swipe Right Arrow */}
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
                            aria-label="Next Offer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2500/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        {/* Slide Navigation Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                            {offers.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                        index === currentSlide
                                            ? "bg-white scale-125 w-6"
                                            : "bg-white/40 hover:bg-white/60"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
