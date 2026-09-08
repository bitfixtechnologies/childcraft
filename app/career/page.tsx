"use client";

import React, { useState, useEffect } from "react";
import { FaPenNib, FaPaintBrush, FaChalkboardTeacher, FaRegEnvelope, FaUser, FaPhone, FaLink, FaBriefcase } from "react-icons/fa";
import { API_BASE_URL } from "@/utils/api";

interface Position {
    id: string | number;
    title: string;
    department: string;
    type: string;
    description: string;
    requirements: string[];
    icon: React.ReactNode;
}

const staticPositionsFallback = [
    {
        title: "Front Office Administrator",
        department: "Administration & Customer Relations",
        type: "Full-Time (In-Office)",
        description: "Manage front office operations and provide administrative support to ensure smooth communication with schools, educators, and stakeholders.",
        requirements: [
            "Handle calls, emails, and visitor inquiries.",
            "Coordinate meetings, schedules, and office records.",
            "Support administrative and customer service functions.",
            "Maintain professional front-office operations.",
            "Bachelor’s degree in any discipline.",
            "Excellent communication and organisational skills.",
            "Proficiency in MS Office and office administration.",
            "Customer-focused with strong multitasking abilities."
        ]
    },
    {
        title: "Business Development Officer",
        department: "Sales & School Partnerships",
        type: "Full-Time (Multiple Locations)",
        description: "Drive business growth by building strong relationships with schools, educators, and academic institutions. Promote educational products, identify new opportunities, and support the expansion of our market presence.",
        requirements: [
            "Develop and maintain relationships with schools and educational stakeholders.",
            "Promote textbooks, learning solutions, and academic services.",
            "Identify new business opportunities and achieve sales targets.",
            "Conduct product presentations and school visits.",
            "Gather market insights and customer feedback.",
            "Bachelor’s degree in any discipline.",
            "Strong communication, negotiation, and presentation skills.",
            "Willingness to travel within assigned territories.",
            "Self-motivated with a results-oriented approach.",
            "Prior experience in educational sales or business development preferred."
        ]
    },
    {
        title: "Area Sales Manager",
        department: "Sales & Business Development",
        type: "Full-Time (Kochi, Kerala)",
        description: "Lead regional sales growth by developing market strategies, managing key customer relationships, and driving the adoption of our educational publishing solutions across schools and institutions.",
        requirements: [
            "Develop and execute sales and marketing strategies.",
            "Lead and mentor the sales team to achieve business targets.",
            "Identify new market opportunities and expand customer base.",
            "Build strong relationships with schools, distributors, and stakeholders.",
            "Monitor sales performance, forecasts, and market trends.",
            "Support branding, promotional activities, and business development initiatives.",
            "Bachelor's degree in Business, Marketing, or related field (MBA preferred).",
            "5–8 years of sales and marketing experience in the Publishing or EdTech sector.",
            "Proven track record in achieving sales targets and team management.",
            "Strong leadership, communication, and negotiation skills.",
            "Willingness to travel extensively within the assigned territory.",
            "Experience in Educational Publishing or EdTech companies.",
            "Candidates based in Kerala will be given preference."
        ]
    }
];

const getIcon = (department: string) => {
    const dept = department.toLowerCase();
    if (dept.includes("content") || dept.includes("editorial")) {
        return <FaPenNib className="w-6 h-6 text-blue-600" />;
    } else if (dept.includes("creative") || dept.includes("design") || dept.includes("art") || dept.includes("illustration")) {
        return <FaPaintBrush className="w-6 h-6 text-rose-600" />;
    } else if (dept.includes("academic") || dept.includes("support") || dept.includes("trainer") || dept.includes("teacher")) {
        return <FaChalkboardTeacher className="w-6 h-6 text-emerald-600" />;
    } else if (dept.includes("admin") || dept.includes("customer") || dept.includes("relations")) {
        return <FaUser className="w-6 h-6 text-indigo-600" />;
    }
    return <FaBriefcase className="w-6 h-6 text-sky-600" />;
};

export default function CareerPage() {
    const [positions, setPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedPosition, setSelectedPosition] = useState<string>("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        portfolio: "",
        coverLetter: ""
    });
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/positions`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        // Filter out old default seeded positions from the database
                        const filteredData = data.filter((pos: any) => 
                            pos.title !== "Educational Content Developer" &&
                            pos.title !== "Graphic Designer & Children's Book Illustrator" &&
                            pos.title !== "Academic Coordinator & Teacher Trainer"
                        );
                        
                        const mapped = filteredData.map((pos: any) => ({
                            id: pos._id,
                            title: pos.title,
                            department: pos.department,
                            type: pos.type,
                            description: pos.description,
                            requirements: pos.requirements,
                            icon: getIcon(pos.department)
                        }));
                        
                        // Combine static fallback positions (the new requested ones) with any custom database positions
                        const finalPositions = [
                            ...staticPositionsFallback.map((pos, idx) => ({
                                ...pos,
                                id: `static-${idx}`,
                                icon: getIcon(pos.department)
                            })),
                            ...mapped
                        ];
                        
                        setPositions(finalPositions);
                        setSelectedPosition(finalPositions[0].title);
                        return;
                    }
                }
                loadFallback();
            } catch (err) {
                console.error("Failed to fetch open positions, using fallback:", err);
                loadFallback();
            } finally {
                setLoading(false);
            }
        };

        const loadFallback = () => {
            const mapped = staticPositionsFallback.map((pos, idx) => ({
                ...pos,
                id: idx,
                icon: getIcon(pos.department)
            }));
            setPositions(mapped);
            setSelectedPosition(mapped[0].title);
        };

        fetchPositions();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-white text-slate-800">
            {/* Hero Section */}
            <section className="relative w-full py-16 md:py-24 bg-slate-50 flex items-center justify-center overflow-hidden animate-fade-in">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

                <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10 text-center">
                    <span className="text-xs md:text-sm font-bold tracking-widest text-primary uppercase mb-4 block">Careers</span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Join Our Team & Shape the <span className="text-primary">Future of Education</span>
                    </h1>
                    <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                        At Child Craft Hallmark Publishers, we create resources that inspire and empower young minds. 
                        If you are passionate about pedagogy, design, or supporting teachers, we&apos;d love to work with you.
                    </p>
                </div>
            </section>

            {/* Why Join Us Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">Why Work With Us?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-linear-to-br from-blue-900 to-slate-900 border border-blue-800/20 text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="w-12 h-12 bg-white/10 text-sky-300 rounded-xl flex items-center justify-center mb-6">
                                <FaPenNib className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Creative Freedom</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                We encourage innovative teaching models, bold graphic designs, and unique illustration styles.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-linear-to-br from-blue-900 to-slate-900 border border-blue-800/20 text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="w-12 h-12 bg-white/10 text-pink-300 rounded-xl flex items-center justify-center mb-6">
                                <FaPaintBrush className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Legacy & Experience</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Work directly with veterans who have over 40 years of expertise in printing, publication, and curriculum development.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-linear-to-br from-blue-900 to-slate-900 border border-blue-800/20 text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="w-12 h-12 bg-white/10 text-emerald-300 rounded-xl flex items-center justify-center mb-6">
                                <FaChalkboardTeacher className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Direct Impact</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Your textbooks, visuals, and lesson guides will empower thousands of school children across the nation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-16 bg-slate-50" id="positions">
                <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">Open Positions</h2>
                        <p className="text-slate-600 text-sm md:text-base mt-2">Find a role that fits your talents.</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : positions.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                            <p className="text-slate-500 font-light">No positions are currently open. Check back later!</p>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-fade-in">
                            {positions.map((pos) => (
                                <div key={pos.id} className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 transition-all hover:shadow-md flex flex-col md:flex-row gap-6 md:items-start">
                                    <div className="p-4 bg-slate-50 rounded-xl self-start">
                                        {pos.icon}
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="text-xl font-bold text-slate-800">{pos.title}</h3>
                                                <span className="px-2.5 py-1 text-xs font-semibold text-primary bg-sky-50 rounded-full uppercase">
                                                    {pos.type}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">{pos.department}</p>
                                        </div>
                                        <p className="text-slate-605 text-sm leading-relaxed">{pos.description}</p>
                                        {pos.requirements && pos.requirements.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">Key Requirements:</h4>
                                                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 pl-1">
                                                    {pos.requirements.map((req, index) => (
                                                        <li key={index}>{req}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="self-end md:self-start">
                                        <button 
                                            onClick={() => {
                                                setSelectedPosition(pos.title);
                                                document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
                                            }}
                                            className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg shadow-sm transition-all"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Application Form */}
            <section className="py-16 bg-white" id="apply-form">
                <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
                    <div className="bg-slate-50 rounded-3xl border border-slate-100 p-8 md:p-12 shadow-sm">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Submit Your Application</h2>
                            <p className="text-slate-600 text-xs md:text-sm mt-2">Fill in your information and we will get back to you shortly.</p>
                        </div>

                        {isSubmitted ? (
                            <div className="text-center py-12 space-y-4">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">Application Submitted!</h3>
                                <p className="text-slate-600 text-sm max-w-md mx-auto">
                                    Thank you for your interest in Child Craft Hallmark Publishers. Our academic/design team will review your portfolio and get in touch within 3-5 business days.
                                </p>
                                <button 
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setFormData({ name: "", email: "", phone: "", portfolio: "", coverLetter: "" });
                                    }}
                                    className="px-6 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 text-sm font-bold rounded-xl transition-all"
                                >
                                    Submit Another Application
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-700 tracking-wider block">Full Name</label>
                                        <div className="relative flex items-center">
                                            <FaUser className="absolute left-4 text-slate-400 w-4 h-4" />
                                            <input 
                                                type="text" 
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="John Doe"
                                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-slate-800"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-700 tracking-wider block">Email Address</label>
                                        <div className="relative flex items-center">
                                            <FaRegEnvelope className="absolute left-4 text-slate-400 w-4 h-4" />
                                            <input 
                                                type="email" 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="johndoe@example.com"
                                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-slate-800"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-700 tracking-wider block">Phone Number</label>
                                        <div className="relative flex items-center">
                                            <FaPhone className="absolute left-4 text-slate-400 w-4 h-4" />
                                            <input 
                                                type="tel" 
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="+91 XXXXX XXXXX"
                                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-slate-800"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-700 tracking-wider block">Position Applied For</label>
                                        <select 
                                            name="position"
                                            value={selectedPosition}
                                            onChange={(e) => setSelectedPosition(e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-slate-800"
                                        >
                                            {positions.map((pos) => (
                                                <option key={pos.id} value={pos.title}>{pos.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-700 tracking-wider block">Resume / Portfolio Link</label>
                                    <div className="relative flex items-center">
                                        <FaLink className="absolute left-4 text-slate-400 w-4 h-4" />
                                        <input 
                                            type="url" 
                                            name="portfolio"
                                            value={formData.portfolio}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Google Drive, Dropbox, or LinkedIn URL"
                                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-slate-800"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-700 tracking-wider block">Cover Letter / Message</label>
                                    <textarea 
                                        name="coverLetter"
                                        value={formData.coverLetter}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="Describe your background and why you are excited to join us..."
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-slate-800 resize-none"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button 
                                        type="submit"
                                        className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5 text-sm sm:text-base"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
