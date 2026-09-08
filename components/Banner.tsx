"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/utils/api";

interface SlideItem {
    type: "image" | "component";
    imageUrl?: string;
    render?: () => React.ReactNode;
}

const slides: SlideItem[] = [
    {
        type: "component",
        render: () => (
            <div className="w-full h-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-6 flex flex-col justify-between text-white relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/15 to-transparent pointer-events-none"></div>
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full border border-white/10">
                        Our Guidelines
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black mt-3 leading-tight">We Publish Books With</h3>
                </div>
                <div className="space-y-2 my-auto">
                    {[
                        "Colourful & attractive layout",
                        "Clear, simple & precise content",
                        "Activity-oriented worksheets",
                        "Real-life examples for concept clarity",
                        "Curriculum-aligned structure"
                    ].map((text, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-white/95">
                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                            {text}
                        </div>
                    ))}
                </div>
                <div className="text-[9px] text-white/70 font-semibold border-t border-white/15 pt-2">
                    Childcraft Hallmark Publishers
                </div>
            </div>
        )
    },
    {
        type: "component",
        render: () => (
            <div className="w-full h-full bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 p-6 flex flex-col justify-between text-white relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-white/15 to-transparent pointer-events-none"></div>
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full border border-white/10">
                        Now Available
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black mt-3 leading-tight text-yellow-300">New Launch!</h3>
                </div>
                <div className="space-y-2.5 my-auto">
                    {[
                        { title: "Test Generator", desc: "Automated question builder" },
                        { title: "Digital Content", desc: "Interactive smartboard resources" },
                        { title: "Teaching Aids", desc: "Comprehensive teacher support" },
                        { title: "Question Papers", desc: "Curated model assessments" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold">
                                {i+1}
                            </div>
                            <div>
                                <h4 className="text-xs font-bold leading-tight">{item.title}</h4>
                                <p className="text-[8px] text-white/70 leading-none mt-0.5">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-[9px] text-white/70 font-semibold border-t border-white/15 pt-2">
                    Empowering Modern Classrooms
                </div>
            </div>
        )
    },
    {
        type: "image",
        imageUrl: "/images/bookscover/std1term1.jpeg"
    },
    {
        type: "component",
        render: () => (
            <div className="w-full h-full bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-6 flex flex-col justify-between text-white relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/15 to-transparent pointer-events-none"></div>
                <div className="border-2 border-white/20 p-2 rounded-xl flex-1 flex flex-col justify-between">
                    <div className="text-center">
                        <span className="text-[9px] font-bold tracking-widest uppercase bg-white/20 px-2.5 py-0.5 rounded-full">
                            Kindergarten Series
                        </span>
                    </div>
                    <div className="text-center py-6">
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Pearls</h3>
                        <span className="text-sm font-light text-rose-200 block my-1">&amp;</span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Petals</h3>
                    </div>
                    <div className="text-center border-t border-white/20 pt-3">
                        <span className="text-[10px] font-bold tracking-widest uppercase">
                            Child Craft
                        </span>
                    </div>
                </div>
            </div>
        )
    },
    {
        type: "component",
        render: () => (
            <div className="w-full h-full bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 p-6 flex flex-col justify-between text-white relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white/15 to-transparent pointer-events-none"></div>
                <div className="border-2 border-white/20 p-2 rounded-xl flex-1 flex flex-col justify-between">
                    <div className="text-center">
                        <span className="text-[9px] font-bold tracking-widest uppercase bg-white/20 px-2.5 py-0.5 rounded-full">
                            Malayalam Reader
                        </span>
                    </div>
                    <div className="text-center py-8">
                        <h3 className="text-3xl sm:text-4xl font-black tracking-wider text-yellow-350">മഞ്ചാടി</h3>
                        <span className="text-[10px] font-bold tracking-widest block mt-2 uppercase text-teal-100">
                            Manjadi
                        </span>
                    </div>
                    <div className="text-center border-t border-white/20 pt-3">
                        <span className="text-[10px] font-bold tracking-widest uppercase">
                            Child Craft
                        </span>
                    </div>
                </div>
            </div>
        )
    },
    {
        type: "component",
        render: () => (
            <div className="w-full h-full bg-gradient-to-br from-orange-400 via-amber-500 to-red-500 p-6 flex flex-col justify-between text-white relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/15 to-transparent pointer-events-none"></div>
                <div className="border-2 border-white/20 p-2 rounded-xl flex-1 flex flex-col justify-between">
                    <div className="text-center">
                        <span className="text-[9px] font-bold tracking-widest uppercase bg-white/20 px-2.5 py-0.5 rounded-full">
                            Activity &amp; Art
                        </span>
                    </div>
                    <div className="text-center py-8">
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Rang Tarang</h3>
                        <span className="text-[10px] font-light text-amber-200 block mt-1">
                            Nurturing Creativity
                        </span>
                    </div>
                    <div className="text-center border-t border-white/20 pt-3">
                        <span className="text-[10px] font-bold tracking-widest uppercase">
                            Child Craft
                        </span>
                    </div>
                </div>
            </div>
        )
    },
    {
        type: "component",
        render: () => (
            <div className="w-full h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-6 flex flex-col justify-between text-white relative">
                <div className="border-2 border-white/20 p-2 rounded-xl flex-1 flex flex-col justify-between">
                    <div className="text-center">
                        <span className="text-[9px] font-bold tracking-widest uppercase bg-white/20 px-2.5 py-0.5 rounded-full">
                            General Knowledge
                        </span>
                    </div>
                    <div className="text-center py-6">
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">Explore the</h3>
                        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-yellow-350 leading-tight">World</h3>
                    </div>
                    <div className="text-center border-t border-white/20 pt-3">
                        <span className="text-[10px] font-bold tracking-widest uppercase">
                            Child Craft
                        </span>
                    </div>
                </div>
            </div>
        )
    },
    {
        type: "component",
        render: () => (
            <div className="w-full h-full bg-gradient-to-br from-cyan-500 via-sky-600 to-indigo-700 p-6 flex flex-col justify-between text-white relative">
                <div className="border-2 border-white/20 p-2 rounded-xl flex-1 flex flex-col justify-between">
                    <div className="text-center">
                        <span className="text-[9px] font-bold tracking-widest uppercase bg-white/20 px-2.5 py-0.5 rounded-full">
                            Integrated Term Book
                        </span>
                    </div>
                    <div className="text-center py-8">
                        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-widest text-white">NEXUS</h3>
                        <span className="text-[9px] text-cyan-200 uppercase tracking-widest font-semibold block mt-1">
                            LKG to Grade 5
                        </span>
                    </div>
                    <div className="text-center border-t border-white/20 pt-3">
                        <span className="text-[10px] font-bold tracking-widest uppercase">
                            Child Craft
                        </span>
                    </div>
                </div>
            </div>
        )
    },
    {
        type: "component",
        render: () => (
            <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 p-6 flex flex-col justify-between text-white relative">
                <div className="border-2 border-white/20 p-2 rounded-xl flex-1 flex flex-col justify-between">
                    <div className="text-center">
                        <span className="text-[9px] font-bold tracking-widest uppercase bg-white/20 px-2.5 py-0.5 rounded-full">
                            English Grammar
                        </span>
                    </div>
                    <div className="text-center py-6">
                        <h3 className="text-lg sm:text-xl font-light tracking-tight leading-tight">Graded English</h3>
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-sky-400 leading-tight">Grammar</h3>
                    </div>
                    <div className="text-center border-t border-white/20 pt-3">
                        <span className="text-[10px] font-bold tracking-widest uppercase">
                            Child Craft
                        </span>
                    </div>
                </div>
            </div>
        )
    }
];

const Banner = () => {
    const [current, setCurrent] = useState(0);
    const [isMobile, setIsMobile] = useState(true);
    const [activeSlides, setActiveSlides] = useState<SlideItem[]>([]);
    const [loading, setLoading] = useState(true);

    const next = () => {
        if (activeSlides.length === 0) return;
        setCurrent((prev) => (prev + 1) % activeSlides.length);
    };

    const prev = () => {
        if (activeSlides.length === 0) return;
        setCurrent((prev) =>
            prev === 0 ? activeSlides.length - 1 : prev - 1
        );
    };

    // Track screen size for responsive 3D spacing
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch banners from backend and build slides list dynamically
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/banner`);
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        // Sort banners by index
                        const sortedBanners = data.sort((a: any, b: any) => a.index - b.index);
                        
                        const mappedSlides: SlideItem[] = [];
                        
                        sortedBanners.forEach((item: any) => {
                            const url = item.imageUrl || "";
                            
                            // Skip the "We are serving" legacy widget
                            if (url.includes("banner222.png")) {
                                return;
                            }
                            
                            // Replace yellow/orange guideline banner image with our custom light blue component
                            if (url.includes("banner3.png")) {
                                mappedSlides.push({
                                    type: "component",
                                    imageUrl: url,
                                    render: () => (
                                        <div className="w-full h-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-6 flex flex-col justify-between text-white relative">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/15 to-transparent pointer-events-none"></div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full border border-white/10">
                                                    Our Guidelines
                                                </span>
                                                <h3 className="text-xl sm:text-2xl font-black mt-3 leading-tight">We Publish Books With</h3>
                                            </div>
                                            <div className="space-y-2 my-auto">
                                                {[
                                                    "Colourful & attractive layout",
                                                    "Clear, simple & precise content",
                                                    "Activity-oriented worksheets",
                                                    "Real-life examples for concept clarity",
                                                    "Curriculum-aligned structure"
                                                ].map((text, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-white/95">
                                                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                        {text}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-[9px] text-white/70 font-semibold border-t border-white/15 pt-2">
                                                Childcraft Hallmark Publishers
                                            </div>
                                        </div>
                                    )
                                });
                            } else {
                                // Add all other backend uploaded images (including Cloudinary urls)
                                mappedSlides.push({
                                    type: "image",
                                    imageUrl: url
                                });
                            }
                        });

                        setActiveSlides(mappedSlides);
                        setCurrent(0);
                    } else {
                        // Fallback to text/gradient custom components only (no un-uploaded images)
                        const componentOnly = slides.filter(s => s.type === "component");
                        setActiveSlides(componentOnly);
                    }
                } else {
                    const componentOnly = slides.filter(s => s.type === "component");
                    setActiveSlides(componentOnly);
                }
            } catch (err) {
                console.error("Failed to fetch banner images from backend:", err);
                const componentOnly = slides.filter(s => s.type === "component");
                setActiveSlides(componentOnly);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    // Auto-slide
    useEffect(() => {
        if (activeSlides.length === 0) return;
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [current, activeSlides]);

    const getStyles = (index: number) => {
        const length = activeSlides.length;
        if (length === 0) return {};
        let diff = index - current;

        // Adjust diff to be shortest path
        if (diff > length / 2) diff -= length;
        if (diff < -length / 2) diff += length;

        const isCenter = diff === 0;
        const isLeft = diff === -1;
        const isRight = diff === 1;
        const isFarLeft = diff === -2;
        const isFarRight = diff === 2;

        // Base styles for all items
        let styles: React.CSSProperties = {
            transition: "all 0.7s ease-in-out",
            position: "absolute",
            zIndex: 10,
            opacity: 0,
            transform: "translateX(0) scale(0.8) rotateY(0deg)", // Default hidden state
        };

        if (isCenter) {
            styles = {
                ...styles,
                zIndex: 30,
                opacity: 1,
                transform: "translateX(0px) scale(1) rotateY(0deg)",
            };
        } else if (isLeft) {
            styles = {
                ...styles,
                zIndex: 20,
                opacity: 0.8,
                transform: isMobile 
                    ? "translateX(-90px) scale(0.75) rotateY(25deg)" 
                    : "translateX(-200px) scale(0.85) rotateY(30deg)",
            };
        } else if (isRight) {
            styles = {
                ...styles,
                zIndex: 20,
                opacity: 0.8,
                transform: isMobile 
                    ? "translateX(90px) scale(0.75) rotateY(-25deg)" 
                    : "translateX(200px) scale(0.85) rotateY(-30deg)",
            };
        } else if (isFarLeft) {
            styles = {
                ...styles,
                zIndex: 15,
                opacity: 0.5,
                transform: isMobile 
                    ? "translateX(-160px) scale(0.55) rotateY(35deg)" 
                    : "translateX(-360px) scale(0.7) rotateY(40deg)",
            };
        } else if (isFarRight) {
            styles = {
                ...styles,
                zIndex: 15,
                opacity: 0.5,
                transform: isMobile 
                    ? "translateX(160px) scale(0.55) rotateY(-35deg)" 
                    : "translateX(360px) scale(0.7) rotateY(-40deg)",
            };
        } else {
            styles = { ...styles, opacity: 0, zIndex: 0 };
        }

        return styles;
    };

    if (loading || activeSlides.length === 0) {
        return (
            <div className="relative w-full h-[480px] bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 overflow-hidden flex items-center justify-center">
                <div className="w-[250px] sm:w-[300px] aspect-[3/4] rounded-2xl bg-white/10 animate-pulse border border-white/5 flex items-center justify-center">
                    <span className="text-white/20 text-xs font-bold tracking-wider animate-pulse">Loading Banners...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[480px] bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 overflow-hidden flex items-center justify-center ">
            {/* Perspective Container */}
            <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ perspective: "1000px" }}
            >
                {activeSlides.map((slide, index) => (
                    <div
                        key={index}
                        style={getStyles(index)}
                        className="absolute shadow-2xl rounded-2xl overflow-hidden bg-white w-[250px] sm:w-[300px] aspect-[3/4]"
                    >
                        {slide.type === "image" ? (
                            <Image
                                src={slide.imageUrl || ""}
                                alt={`banner-${index}`}
                                fill
                                className="object-cover"
                                priority={index === current}
                            />
                        ) : (
                            slide.render ? slide.render() : null
                        )}
                        {/* Book spine effect (gradient overlay) */}
                        <div className="absolute inset-y-0 left-0 w-[4%] bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-[1%] bg-gradient-to-l from-black/10 to-transparent pointer-events-none"></div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                onClick={prev}
                className="absolute left-4 sm:left-10 z-40 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all backdrop-blur-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button
                onClick={next}
                className="absolute right-4 sm:right-10 z-40 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all backdrop-blur-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
};

export default Banner;
