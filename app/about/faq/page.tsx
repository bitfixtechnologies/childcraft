"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs: FAQItem[] = [
        {
            question: "How can I order books from Child Craft Hallmark Publishers?",
            answer: "Schools and institutions can place orders directly by reaching out to us via our Contact Page (email or phone). Our sales team and Academic Coordinators will assist with customized catalogs, quotes, and sample copies."
        },
        {
            question: "Are your textbooks aligned with NEP 2020 guidelines?",
            answer: "Yes, all of our textbook series (including Wings, Nexus, Pearls & Petals, and Manjadi) are designed and updated in strict alignment with the National Education Policy (NEP 2020) and national curriculum frameworks."
        },
        {
            question: "Do you provide teaching support resources?",
            answer: "Absolutely. We provide comprehensive teacher manuals, digital smartboard content, activity guides, and a Test Generator to help educators prepare assessments and plan classes effectively."
        },
        {
            question: "Can we request academic workshops or teacher training?",
            answer: "Yes, we regularly conduct professional development workshops and curriculum orientations for partner schools. You can contact us to request a workshop for your school faculty."
        },
        {
            question: "Where is Child Craft Hallmark Publishers based?",
            answer: "Our head office is located at KRL Road, Kundannoor Junction, Kochi, Kerala. However, we serve schools, distributors, and educational institutions all across India."
        },
        {
            question: "How do I submit a book proposal or career application?",
            answer: "For career opportunities, please submit your application through our Careers Page. For book proposals or editorial inquiries, you can email your proposal details to info@childcraftbooks.com."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 pb-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 py-16 sm:py-24 text-center text-white relative">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                    <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase mb-4 block">Help &amp; Support</span>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 font-sans">Frequently Asked Questions</h1>
                    <p className="text-blue-100 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                        Find answers to common questions about our books, curriculum alignment, digital resources, and support services.
                    </p>
                </div>
            </div>

            {/* FAQ Accordion List */}
            <div className="max-w-3xl mx-auto px-6 mt-16 sm:mt-24">
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div 
                                key={index} 
                                className="bg-white border border-slate-200/60 rounded-2xl shadow-xs overflow-hidden transition-all duration-350 hover:border-slate-300"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-5 flex justify-between items-center text-left gap-4 font-bold text-slate-800 hover:text-primary transition-colors focus:outline-none"
                                >
                                    <span className="flex items-center gap-3 text-sm sm:text-base leading-snug">
                                        <FaQuestionCircle className="w-5 h-5 text-sky-500 shrink-0" />
                                        {faq.question}
                                    </span>
                                    {isOpen ? (
                                        <FaChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                                    ) : (
                                        <FaChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                                    )}
                                </button>
                                
                                <div 
                                    className={`transition-all duration-350 ease-in-out overflow-hidden ${
                                        isOpen ? "max-h-[300px] border-t border-slate-100 px-6 py-5 bg-slate-50/50" : "max-h-0"
                                    }`}
                                >
                                    <p className="text-slate-650 text-xs sm:text-sm sm:leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
