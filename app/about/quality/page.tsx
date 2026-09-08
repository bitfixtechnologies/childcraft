"use client";

import React from "react";
import { FaGraduationCap, FaShieldAlt, FaAward, FaBookReader } from "react-icons/fa";

export default function QualityPage() {
    const qualityPillars = [
        {
            title: "Pedagogical Excellence",
            description: "All content is developed in alignment with NEP 2020 and global educational frameworks, ensuring learning is concept-oriented and progressive.",
            icon: <FaGraduationCap className="w-8 h-8 text-sky-600" />,
            bg: "from-sky-500/10 to-blue-500/10",
        },
        {
            title: "Rigorous Editorial Standards",
            description: "Our multi-tiered editorial review process ensures 100% factual accuracy, clarity, and grammatical precision across all textbooks.",
            icon: <FaShieldAlt className="w-8 h-8 text-emerald-600" />,
            bg: "from-emerald-500/10 to-teal-500/10",
        },
        {
            title: "Premium Print & Illustration",
            description: "We use child-friendly, non-toxic inks and high-grade durable paper, paired with vibrant custom illustrations to engage young minds.",
            icon: <FaAward className="w-8 h-8 text-rose-600" />,
            bg: "from-rose-500/10 to-pink-500/10",
        },
        {
            title: "Continuous Enrichment",
            description: "Our materials are regularly updated based on direct feedback from partner schools, academic coordinators, and classroom testing.",
            icon: <FaBookReader className="w-8 h-8 text-purple-600" />,
            bg: "from-purple-500/10 to-indigo-500/10",
        },
    ];

    return (
        <main className="min-h-screen bg-white text-slate-800 pb-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 py-16 sm:py-24 text-center text-white relative">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                    <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase mb-4 block">Commitment to Standards</span>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Quality &amp; Innovation</h1>
                    <p className="text-blue-100 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Discover how we design, refine, and produce learning resources that set academic benchmarks.
                    </p>
                </div>
            </div>

            {/* Quality Statement Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-12 sm:mt-20">
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-900">Our Quality Policy</h2>
                    <p className="text-slate-650 text-base sm:text-lg max-w-4xl mx-auto leading-relaxed font-light">
                        At Child Craft Hallmark Publishers, quality is not a metric—it is the foundation of our philosophy. 
                        We believe that every page a child reads should inspire curiosity and provide a firm grasp of underlying concepts. 
                        By combining pedagogy with aesthetic illustration, we ensure that educational material is both highly informative and visually engaging.
                    </p>
                </div>
            </div>

            {/* Pillars Grid */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {qualityPillars.map((pillar, index) => (
                        <div 
                            key={index} 
                            className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.bg} flex items-center justify-center shrink-0`}>
                                {pillar.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{pillar.title}</h3>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{pillar.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
