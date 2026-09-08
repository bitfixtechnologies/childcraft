"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/utils/api";

interface BookSeriesItem {
    _id?: string;
    name: string;
    label: string;
    classes: string;
    gradient: string;
    image?: string;
    index?: number;
}

const BookOutline = () => {
    const router = useRouter();
    const [bookSeries, setBookSeries] = useState<BookSeriesItem[]>([]);
    const [loading, setLoading] = useState(true);

    const features = [
        {
            id: 1,
            text: "Visually engaging design",
            color: "bg-green-600"
        },
        {
            id: 2,
            text: "Simple, clear and concept-oriented content",
            color: "bg-orange-500"
        },
        {
            id: 3,
            text: "Activity oriented worksheets, projects and other aids",
            color: "bg-rose-500"
        },
        {
            id: 4,
            text: "Concepts explained through real life examples",
            color: "bg-blue-600"
        },
        {
            id: 5,
            text: "Curriculum aligned and age-appropriate",
            color: "bg-indigo-600"
        },
        {
            id: 6,
            text: "Student, teacher and parent friendly",
            color: "bg-orange-500"
        },
        {
            id: 7,
            text: "Comprehensive lesson-planning support",
            color: "bg-slate-500"
        },
        {
            id: 8,
            text: "21st century skills aligned",
            color: "bg-sky-600"
        },
        {
            id: 9,
            text: "Formative assessment and progress tracking",
            color: "bg-emerald-600"
        },
        {
            id: 10,
            text: "Holistic learning approach",
            color: "bg-violet-600"
        }
    ];

    const defaultSeries = [
        {
            name: "Wings",
            label: "Core Series",
            classes: "LKG to Grade 5",
            gradient: "from-amber-500 via-orange-500 to-red-500",
        },
        {
            name: "Pearls & Petals",
            label: "Kindergarten",
            classes: "KG",
            gradient: "from-pink-500 to-rose-600",
        },
        {
            name: "Nexus",
            label: "Integrated",
            classes: "LKG to Grade 5",
            gradient: "from-sky-500 via-indigo-500 to-blue-600",
        },
        {
            name: "Manjadi",
            label: "Malayalam",
            classes: "KG to Grade 8",
            gradient: "from-emerald-500 to-teal-600",
        },
        {
            name: "Explore the World",
            label: "GK & Science",
            classes: "Grade 1 to 8",
            gradient: "from-violet-500 to-purple-600",
        }
    ];

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/book-outlines`);
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const sorted = data.sort((a: any, b: any) => (a.index || 0) - (b.index || 0));
                        setBookSeries(sorted);
                        return;
                    }
                }
            } catch (err) {
                console.error("Error fetching book outlines:", err);
            }
            setBookSeries(defaultSeries);
        };
        fetchSeries();
    }, []);

    const getSeriesIcon = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes("wings")) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 opacity-80 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
                </svg>
            );
        } else if (lowerName.includes("pearls")) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 opacity-80 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
                </svg>
            );
        } else if (lowerName.includes("nexus")) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 opacity-80 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
            );
        } else if (lowerName.includes("manjadi")) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 opacity-80 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292" />
                </svg>
            );
        } else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 opacity-80 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25c-1.096-1.18-2.615-1.93-4.305-1.93L3 4.318v14.25l4.695-.008c1.69 0 3.209.75 4.305 1.93m0-14.25c1.096-1.18 2.615-1.93 4.305-1.93L21 4.318v14.25l-4.695-.008c-1.69 0-3.209.75-4.305 1.93m0-14.25v14.25" />
                </svg>
            );
        }
    };

    // Determine how to render grid items
    const hasMoreThanFive = bookSeries.length > 5;
    const displayedSeries = hasMoreThanFive ? bookSeries.slice(0, 4) : bookSeries;

    return (
        <section className="w-full pt-10 md:pt-16 pb-0 bg-white relative overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-10 left-10 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-10 right-10 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10">

                {/* Left Side */}
                <div className="flex flex-col space-y-8 lg:sticky lg:top-24 self-start h-full relative">
                    <div className="flex flex-col h-full relative">
                        {/* Decorative Dot Pattern - Background */}
                        <div className="absolute top-0 left-0 grid grid-cols-6 gap-2 w-fit opacity-60 pointer-events-none">
                            {[...Array(36)].map((_, i) => {
                                const colors = ["bg-blue-400", "bg-rose-400", "bg-orange-400", "bg-green-400", "bg-slate-300"];
                                const color = colors[i % colors.length];
                                return (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${color} ${i % 3 === 0 ? 'opacity-60' : 'opacity-100'}`}></div>
                                );
                            })}
                        </div>
                        {/* Title */}
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 relative z-10 pt-8">
                            Our Books <span className="text-primary">Outline</span>
                        </h2>

                        {/* Description */}
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 relative z-10">
                            Our textbook series are meticulously structured to deliver academic excellence. We focus on conceptual understanding, engaging visual designs, curriculum alignment, and interactive features that make learning a joyful experience for children.
                        </p>

                        {/* Book Series Grid */}
                        <div className="mt-auto pt-4 pb-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Featured Book Series</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {displayedSeries.map((series, idx) => (
                                    <div 
                                        key={idx}
                                        className="rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden border border-slate-100 flex items-center justify-center bg-white relative aspect-[3/4] p-3 group"
                                    >
                                        {series.image ? (
                                            <img src={series.image} className="w-full h-full object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-300" alt={series.name || "Book Cover"} />
                                        ) : (
                                            <div className="text-slate-400 text-xs font-extrabold uppercase tracking-wider text-center p-4">
                                                {series.name || "Book Outline"}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Special 5th "View All" Card when there are more than 5 series */}
                                {hasMoreThanFive && (
                                    <div 
                                        onClick={() => router.push("/book-series")}
                                        className="rounded-2xl bg-gradient-to-br from-slate-750 via-slate-800 to-slate-900 text-white shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between p-5 border border-white/10 aspect-[3/4] group"
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className="text-[9px] uppercase font-black tracking-widest bg-primary/20 text-primary px-2.5 py-1 rounded-full border border-primary/25">
                                                Explore All
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-primary group-hover:translate-x-1.5 transition-transform">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                            </svg>
                                        </div>
                                        <div className="mt-auto">
                                            <h4 className="font-extrabold text-base leading-tight tracking-tight group-hover:text-primary transition-colors">
                                                +{bookSeries.length - 4} More
                                            </h4>
                                            <p className="text-[10px] text-slate-400 font-semibold mt-1">View Entire Catalog</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Side - Numbered List */}
                <div className="space-y-6">
                    {features.map((item) => (
                        <div key={item.id} className="flex items-start gap-4 md:gap-6 group">
                            <div className={`shrink-0 w-10 h-10 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                {item.id}
                            </div>
                            <p className="text-gray-750 text-lg font-semibold pt-1">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

            {/* Stats Box Section - Full Width Container */}
            <div className="mt-20 w-full relative z-20">
                {/* Visual Trick: bottom half has the background of the next section (dark blue [#053c60]) */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-blue-900"></div>

                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-2">
                            <h3 className="text-xl md:text-3xl font-bold text-primary">400+</h3>
                            <p className="text-gray-600 font-medium text-lg uppercase tracking-wide">Titles</p>
                        </div>
                        <div className="space-y-2 md:border-l md:border-r border-slate-100">
                            <h3 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">3000+</h3>
                            <p className="text-gray-600 font-medium text-lg uppercase tracking-wide">Schools</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">12+</h3>
                            <p className="text-gray-600 font-medium text-lg uppercase tracking-wide">Years of Service</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookOutline;
