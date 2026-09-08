"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/utils/api";

interface Book {
    id: string | number;
    title: string;
    image: string;
    category: string;
    std: string;
    description: string;
}

const staticBookDataFallback = {
    "Std 1": [
        {
            id: 1,
            title: "English Reader",
            image: "/images/bookscover/std1term1.jpeg",
            syllabus: "CBSE",
            description: "An engaging course designed around interactive stories, grammar basics, and vocabulary builders for first-grade CBSE students.",
        },
        {
            id: 2,
            title: "Hindi Praveshika",
            image: "/images/bookscover/std1hindi.jpeg",
            syllabus: "ICSE",
            description: "Introduction to Hindi scripts, simple poems, and basic vocabulary designed for ICSE curriculum guidelines.",
        },
        {
            id: 3,
            title: "Mathematics",
            image: "/images/bookscover/std1term1.jpeg",
            syllabus: "State Syllabus",
            description: "Foundation mathematical concepts, number recognition, addition, and subtraction for State Board standards.",
        },
        {
            id: 4,
            title: "Environmental Studies",
            image: "/images/bookscover/std2sem2.jpeg",
            syllabus: "State Syllabus",
            description: "Interactive course exploring nature, community, hygiene, and daily habits for State Board first graders.",
        },
        {
            id: 5,
            title: "General Knowledge",
            image: "/images/bookscover/std3sem2.jpeg",
            syllabus: "CBSE",
            description: "Fun quizzes, world facts, and basic science facts to nurture curious minds in CBSE standard 1.",
        },
    ],
    "Std 2": [
        {
            id: 6,
            title: "Mathematics",
            image: "/images/bookscover/std2sem2.jpeg",
            syllabus: "CBSE",
            description: "Conceptual math course with illustrative problem solving, shapes, and division concepts aligned with CBSE guidelines.",
        },
        {
            id: 7,
            title: "Term Book",
            image: "/images/bookscover/std2term2.jpeg",
            syllabus: "ICSE",
            description: "Comprehensive term material cover for core sciences, English, and social studies in the ICSE framework.",
        },
        {
            id: 8,
            title: "Environment",
            image: "/images/bookscover/std2sem2.jpeg",
            syllabus: "State Syllabus",
            description: "Introduction to Environmental Studies, plants, animals, and local geography under State Board guidelines.",
        },
        {
            id: 9,
            title: "English Grammar",
            image: "/images/bookscover/std1term1.jpeg",
            syllabus: "CBSE",
            description: "Key grammar rules, punctuation, sentence building, and worksheets for second-grade CBSE students.",
        },
        {
            id: 10,
            title: "Hindi Pathmala",
            image: "/images/bookscover/std3hindi.jpeg",
            syllabus: "ICSE",
            description: "Hindi prose reading comprehension, grammar foundations, and poems tailored for Std 2 ICSE learners.",
        },
    ],
    "Std 3": [
        {
            id: 11,
            title: "Science Explorer",
            image: "/images/bookscover/std3sem2.jpeg",
            syllabus: "CBSE",
            description: "Explores core scientific themes, life cycles, and nature patterns with interactive exercises for CBSE Std 3.",
        },
        {
            id: 12,
            title: "Hindi Pathmala",
            image: "/images/bookscover/std3hindi.jpeg",
            syllabus: "ICSE",
            description: "Advanced vocabulary, short stories, and grammatical structures tailored for Std 3 ICSE scholars.",
        },
        {
            id: 13,
            title: "Term Book",
            image: "/images/bookscover/std3term1.jpeg",
            syllabus: "State Syllabus",
            description: "Full term coverage containing environmental science, regional language, and mathematics for State Board.",
        },
        {
            id: 14,
            title: "Social Studies",
            image: "/images/bookscover/std3sem2.jpeg",
            syllabus: "CBSE",
            description: "Introduction to society, civic responsibilities, transport, and national symbols for CBSE Std 3.",
        },
        {
            id: 15,
            title: "Art & Craft",
            image: "/images/bookscover/std1hindi.jpeg",
            syllabus: "State Syllabus",
            description: "Creative coloring, paper craft, drawing techniques, and DIY activities for third-grade State curriculum.",
        },
    ],
    "Std 4": [
        {
            id: 16,
            title: "General Studies",
            image: "/images/bookscover/std3sem2.jpeg",
            syllabus: "CBSE",
            description: "Advanced social sciences, history, and scientific methods for standard 4 CBSE students.",
        },
        {
            id: 17,
            title: "Math Mastery",
            image: "/images/bookscover/std4term2.jpeg",
            syllabus: "ICSE",
            description: "High-level arithmetic, fractions, decimals, and basic geometry problems designed for ICSE guidelines.",
        },
        {
            id: 18,
            title: "General Science",
            image: "/images/bookscover/std4term2.jpeg",
            syllabus: "State Syllabus",
            description: "State board aligned curriculum covering human systems, physics basics, and plant physiology.",
        },
        {
            id: 19,
            title: "English Grammar",
            image: "/images/bookscover/std2term2.jpeg",
            syllabus: "ICSE",
            description: "Advanced grammar syntax, composition writing, essay drafting, and comprehension skills for ICSE Std 4.",
        },
        {
            id: 20,
            title: "Computer Science",
            image: "/images/bookscover/std1term1.jpeg",
            syllabus: "State Syllabus",
            description: "Foundational guide to computer software, MS Office basics, typing, and safe internet browsing for State Board.",
        },
    ],
};

const TEXTBOOK_CATEGORIES = [
    {
        name: "Core Series",
        series: [
            "Wings (S&T)",
            "Pearls & Petals (S&T)",
            "Nexus (T)",
            "Nexus Plus (T)",
            "Next Generation (T)",
            "Golden Wings (T)",
            "Green Planet"
        ]
    },
    {
        name: "Languages",
        series: [
            "Manjadi",
            "Malayala Manjari",
            "Basha Tarang",
            "Lipi Sagaram",
            "Hindi Praveshika",
            "Sarovar 1-5",
            "Madhuri Hindi Reader"
        ]
    },
    {
        name: "Grammar & English",
        series: [
            "Active Grammar 1-8",
            "Basic Grammar",
            "Graded English",
            "Active English (Reader)"
        ]
    },
    {
        name: "Computers & GK",
        series: [
            "IT Exploring e-World",
            "Smart Computer",
            "World of Computer",
            "GK - Fun & Facts",
            "GK – Explore the World"
        ]
    },
    {
        name: "Writing & Art",
        series: [
            "Fun with Crayon",
            "Sulekh Mala Handwriting",
            "Vivanta",
            "Capital and Small Letters",
            "Magic of Art",
            "Cursive Writing",
            "Draw & Colour",
            "Art & Activity",
            "ABC Writing Capital and Small",
            "Aalekhanamithram - Malayalam Writing"
        ]
    }
];

const generateFallbackBooksForSeries = (seriesName: string): Book[] => {
    let count = 5;
    if (seriesName.includes("1-8") || seriesName.includes("Explore the World") || seriesName.includes("Grammar")) {
        count = 8;
    } else if (seriesName.includes("1-5")) {
        count = 5;
    } else if (seriesName.includes("Petals") || seriesName.includes("Writing") || seriesName.includes("Praveshika")) {
        count = 3;
    }

    const list: Book[] = [];
    for (let i = 1; i <= count; i++) {
        const images = [
            "/images/bookscover/std1term1.jpeg",
            "/images/bookscover/std1hindi.jpeg",
            "/images/bookscover/std2sem2.jpeg",
            "/images/bookscover/std2term2.jpeg",
            "/images/bookscover/std3sem2.jpeg",
            "/images/bookscover/std3hindi.jpeg",
            "/images/bookscover/std3term1.jpeg",
            "/images/bookscover/std4term2.jpeg"
        ];
        const image = images[(i - 1) % images.length];

        list.push({
            id: `${seriesName.replace(/\s+/g, "-")}-${i}`,
            title: `${seriesName} - Book ${i}`,
            image: image,
            category: seriesName,
            std: `Grade ${i}`,
            description: `A comprehensive textbook designed for the ${seriesName} curriculum, focused on conceptual clarity, active learning tools, and standard-aligned exercises.`
        });
    }
    return list;
};

const NewArrivals = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("Core Series");
    const [selectedSeries, setSelectedSeries] = useState<string>("Wings (S&T)");
    const [selectedBookIndex, setSelectedBookIndex] = useState<number>(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Fetch books from API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/books`);
                if (res.ok) {
                    const data = await res.json();
                    const mapped = data.map((b: any) => ({
                        id: b._id,
                        title: b.title,
                        image: b.image,
                        category: b.category || "Core Series",
                        std: b.std || "Grade 1",
                        description: b.description
                    }));
                    setBooks(mapped);
                }
            } catch (err) {
                console.error("Failed to fetch books from API", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    // Adjust selected series when category changes
    useEffect(() => {
        const catObj = TEXTBOOK_CATEGORIES.find(c => c.name === selectedCategory);
        if (catObj && catObj.series.length > 0) {
            setSelectedSeries(catObj.series[0]);
            setSelectedBookIndex(0);
        }
    }, [selectedCategory]);

    // Reset selected book index when series changes
    useEffect(() => {
        setSelectedBookIndex(0);
    }, [selectedSeries]);

    // Filter books by selected series name
    const currentBooks = books.filter(b => 
        b.category.toLowerCase().trim() === selectedSeries.toLowerCase().trim() ||
        b.title.toLowerCase().includes(selectedSeries.toLowerCase().trim())
    );

    const displayBooks = currentBooks.length > 0 ? currentBooks : generateFallbackBooksForSeries(selectedSeries);
    const activeBook = displayBooks[selectedBookIndex] || displayBooks[0];

    const getPositionStyle = (idx: number, total: number) => {
        const minLeft = 4;
        const maxLeft = 76;
        const leftPercent = total > 1 ? minLeft + (idx * (maxLeft - minLeft)) / (total - 1) : 38;
        return {
            left: `${leftPercent}%`,
        };
    };

    return (
        <section className="w-full py-16 md:py-24 bg-linear-to-b from-blue-900 via-blue-950 to-slate-900 overflow-hidden" id="homepage-arrivals">
            <style jsx>{`
                .book-shelf-container {
                    perspective: 1200px;
                }
                .shelf-book {
                    transform-style: preserve-3d;
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .shelf-book.active {
                    transform: rotateY(-24deg) rotateX(8deg) translateZ(24px) translateY(-16px);
                    z-index: 30;
                    opacity: 1;
                    filter: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.45));
                }
                .shelf-book.inactive {
                    transform: rotateY(0deg) rotateX(0deg) translateZ(0) translateY(0);
                    z-index: 10;
                    opacity: 0.65;
                }
                .shelf-book.inactive:hover {
                    transform: rotateY(-15deg) rotateX(4deg) translateZ(12px) translateY(-6px);
                    z-index: 20;
                    opacity: 0.9;
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight uppercase">
                        Textbook <span className="text-sky-300">Showcase</span>
                    </h2>
                    
                </div>

                {/* Main Category Selection Tabs */}
                <div className="flex justify-center flex-wrap gap-3 md:gap-4 mb-6 overflow-x-auto py-2">
                    {TEXTBOOK_CATEGORIES.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`px-6 py-2.5 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all shrink-0 border ${
                                selectedCategory === cat.name
                                    ? "bg-sky-400 text-white border-sky-400 shadow-lg shadow-sky-400/20"
                                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-sky-200"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Sub-tabs: Textbook Series Names */}
                <div className="flex justify-center flex-wrap gap-2.5 md:gap-3 mb-16 overflow-x-auto py-2 max-w-5xl mx-auto">
                    {(TEXTBOOK_CATEGORIES.find(c => c.name === selectedCategory)?.series || []).map((seriesName) => (
                        <button
                            key={seriesName}
                            onClick={() => setSelectedSeries(seriesName)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                                selectedSeries === seriesName
                                    ? "bg-white text-blue-900 border-white shadow-md shadow-white/10"
                                    : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            {seriesName}
                        </button>
                    ))}
                </div>

                {/* Display Grid (Split Details & Animated Bookshelf) */}
                {displayBooks.length > 0 && activeBook ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        {/* Left side: Book details */}
                        <div className="flex flex-col text-left space-y-6 md:pr-8">
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1.5 rounded-full bg-sky-500/20 text-sky-300 font-bold text-xs uppercase tracking-wider border border-sky-400/20">
                                    {selectedSeries}
                                </span>
                                <span className="px-3 py-1.5 rounded-full bg-white/10 text-slate-200 font-semibold text-xs uppercase tracking-wider">
                                    {activeBook.std}
                                </span>
                            </div>
                            <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight transition-all duration-300">
                                {activeBook.title}
                            </h3>
                            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light min-h-[80px]">
                                {activeBook.description}
                            </p>
                            <div className="pt-4 flex flex-wrap gap-3">
                                <button className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5 text-sm sm:text-base">
                                    Request Specimen Copy
                                </button>
                                <button className="px-6 py-3 border border-white/25 hover:bg-white/10 text-white font-bold rounded-xl transition-all text-sm sm:text-base">
                                    View Index Structure
                                </button>
                            </div>
                        </div>

                        {/* Right side: 3D Bookshelf */}
                        <div className="book-shelf-container relative w-full h-[220px] sm:h-[280px] md:h-[340px] flex flex-col justify-end">
                            {/* Books Wrapper */}
                            <div className="relative w-full h-full" style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
                                {displayBooks.map((book, idx) => {
                                    const isActive = selectedBookIndex === idx;
                                    const isHovered = hoveredIndex === idx;
                                    return (
                                        <div
                                            key={book.id}
                                            onClick={() => setSelectedBookIndex(idx)}
                                            onMouseEnter={() => setHoveredIndex(idx)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            style={{
                                                ...getPositionStyle(idx, displayBooks.length),
                                                transform: isActive 
                                                    ? "translateY(-16px) scale(1.08)"
                                                    : isHovered
                                                        ? "translateY(-6px) scale(1.02)"
                                                        : "translateY(0) scale(0.92)",
                                                opacity: isActive ? 1 : isHovered ? 0.9 : 0.65,
                                                zIndex: isActive ? 30 : isHovered ? 20 : 10,
                                            }}
                                            className="absolute w-12 h-16 sm:w-16 sm:h-22 md:w-22 md:h-30 lg:w-26 lg:h-36 shelf-book cursor-pointer bottom-2"
                                        >
                                            {/* The 3D Book Layout with Pages Thickness */}
                                            <div 
                                                className="w-full h-full relative" 
                                                style={{ 
                                                    transformStyle: "preserve-3d",
                                                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                                                    transform: isActive
                                                        ? "perspective(600px) rotateY(-25deg) rotateX(6deg) translateZ(12px)"
                                                        : isHovered
                                                            ? "perspective(600px) rotateY(-15deg) rotateX(4deg) translateZ(6px)"
                                                            : "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)",
                                                }}
                                            >
                                                {/* Front Cover */}
                                                <div className={`absolute inset-0 shadow-2xl rounded-r-sm overflow-hidden bg-white border-l border-white/20 z-10 transition-all ${
                                                    isActive ? "ring-2 ring-primary/45" : ""
                                                }`}>
                                                    <Image
                                                        src={book.image}
                                                        alt={book.title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 25vw, 15vw"
                                                        priority={idx === 0}
                                                    />
                                                    {/* Dynamic spine highlight effect */}
                                                    <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/25 via-transparent to-black/10 z-10"></div>
                                                    {/* Sheen effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent z-15 pointer-events-none"></div>
                                                </div>

                                                {/* Right Page Edge (3D Thickness) */}
                                                <div 
                                                    className="absolute top-0 left-full h-full bg-slate-100 border-y border-r border-slate-200 origin-left z-5"
                                                    style={{
                                                        width: "12px",
                                                        transform: "rotateY(90deg)",
                                                        backgroundImage: "repeating-linear-gradient(90deg, #cbd5e1, #cbd5e1 1px, #f8fafc 1px, #f8fafc 3px)",
                                                    }}
                                                ></div>
                                            </div>
                                            {/* Real-looking drop shadow underneath the book */}
                                            <div className="absolute -bottom-4 left-2 right-2 h-2.5 bg-black/35 blur-md rounded-full transform rotateX(95deg) pointer-events-none"></div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Wooden Shelf Base */}
                            <div className="w-full h-4 bg-gradient-to-b from-[#8B5A2B] to-[#5C3A21] rounded shadow-md border-t border-[#A06D3B] relative z-20"></div>
                            {/* Support brackets underneath shelf */}
                            <div className="absolute left-[15%] bottom-[-16px] md:bottom-[-20px] w-5 md:w-6 h-4 md:h-5 bg-[#5C3A21] rounded-b-md shadow-md z-15"></div>
                            <div className="absolute right-[15%] bottom-[-16px] md:bottom-[-20px] w-5 md:w-6 h-4 md:h-5 bg-[#5C3A21] rounded-b-md shadow-md z-15"></div>
                            {/* Shelf shadow underneath */}
                            <div className="w-[90%] mx-auto h-4 bg-black/15 blur-lg rounded-full mt-1"></div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-300 text-lg font-light">No books available for this selection.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewArrivals;
