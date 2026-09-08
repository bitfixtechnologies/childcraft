"use client";

import React from "react";
import { FaGraduationCap, FaPaperPlane, FaAward, FaCalendarAlt } from "react-icons/fa";

export default function JourneyPage() {
    const milestones = [
        {
            year: "2014",
            title: "The Beginning",
            desc: "Child Craft Hallmark Publishers was founded under the visionary leadership of Mr. V. A. Vishwanathan and Mrs. Reena Vishwanathan. The foundation was laid with a commitment to provide quality educational resources for schools and learners.",
        },
        {
            year: "2015",
            title: "Building Academic Foundations",
            desc: "Focused on developing curriculum-oriented educational materials and establishing strong relationships with schools and educators across India.",
        },
        {
            year: "2018",
            title: "Teacher-Centric Growth",
            desc: "Initiated academic support programmes and teacher interaction initiatives aimed at improving classroom effectiveness and learning outcomes.",
        },
        {
            year: "2019",
            title: "Diversification of Publications",
            desc: "Expanded publication portfolio with subject-specific resources, supplementary learning materials, and innovative educational tools.",
        },
        {
            year: "2021",
            title: "Digital Transformation",
            desc: "Expanded digital initiatives, educational support systems, and technology-assisted learning resources to complement classroom teaching.",
        },
        {
            year: "2022",
            title: "Academic Excellence",
            desc: "Strengthened curriculum alignment and introduced enhanced educational solutions that promoted critical thinking and skill development.",
        },
        {
            year: "2024",
            title: "Empowering Educators",
            desc: "Increased emphasis on teacher training programmes, professional development sessions, and academic enrichment activities.",
        },
        {
            year: "2025",
            title: "Product Development & Brand Expansion",
            desc: "Advanced the development of new educational series, strengthened academic teams, enhanced design quality, and expanded publishing capabilities.",
        },
        {
            year: "2026",
            title: "Shaping the Future of Learning",
            desc: "Child Craft Hallmark Publishers envisions a future where innovation, technology, and learner-centric education come together to create smarter classrooms, empowered educators, and future-ready learners across India.",
        },
    ];

    return (
        <main className="min-h-screen bg-white text-slate-800 pb-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 py-16 sm:py-24 text-center text-white relative">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                    <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase mb-4 block">Our Story</span>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Journey &amp; Legacy</h1>
                    <p className="text-blue-100 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                        A decade of excellence in educational publishing, serving schools and shaping young minds.
                    </p>
                </div>
            </div>

            {/* Legacy Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-12 sm:mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Our Founding Legacy</h2>
                        <p className="text-slate-650 text-base sm:text-lg leading-relaxed font-light">
                            Built upon the foundational values of educational trust and publishing pedigree, Child Craft Hallmark Publishers has grown from a humble vision into a trusted academic partner for schools nationwide.
                        </p>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            Under the leadership of Mr. V. A. Vishwanathan, bringing over 40 years of core industry expertise, and Mrs. Reena Vishwanathan, driving innovative academic design and coordinator support, we continue to pave the way for modern pedagogy.
                        </p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 font-bold">
                                40+
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Years of Experience</h3>
                                <p className="text-slate-600 text-sm">Decades of combined knowledge in printing, editing, and publishing operations.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600 font-bold">
                                100%
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">NEP 2020 Aligned</h3>
                                <p className="text-slate-600 text-sm">Every new volume is verified and structures updated for the latest standards.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="max-w-4xl mx-auto px-6 sm:px-12 mt-20 relative">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-16">Timeline of Milestones</h2>

                {/* Vertical Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-32 bottom-0 w-0.5 bg-slate-100 hidden md:block"></div>

                <div className="space-y-12">
                    {milestones.map((item, idx) => (
                        <div key={idx} className={`flex flex-col md:flex-row items-center gap-6 relative ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                            {/* Dot */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sky-500 rounded-full border-4 border-white shadow-sm hidden md:block z-10"></div>

                            {/* Content */}
                            <div className="w-full md:w-1/2 bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-xs space-y-2 hover:shadow-md transition-shadow duration-300">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-sky-600 flex items-center gap-1.5 uppercase tracking-wider">
                                        <FaCalendarAlt className="w-3.5 h-3.5" />
                                        {item.year}
                                    </span>
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">{item.desc}</p>
                            </div>
                            <div className="w-full md:w-1/2 hidden md:block"></div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
