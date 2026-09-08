"use client";
import React from "react";
import Image from "next/image";

const members = [
    {
        name: "Mr. V. A. Vishwanathan",
        role: "Managing Director",
        image: "/images/person1.PNG",
    },
    {
        name: "Mrs. Reena Vishwanathan",
        role: "Director",
        image: "/images/person2.PNG",
    },
];

export default function MembersSection() {
    return (
        <section className="py-16 md:py-24 bg-white relative" id="homepage-members">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                {/* Heading */}
                <div className="text-center mb-16">
                    <span className="text-xs md:text-sm font-bold tracking-widest text-primary uppercase mb-3 block">Leadership</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-800 tracking-tight">
                        Our Board of <span className="text-primary">Directors</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mt-4 font-light">
                        Meet the visionary leadership guiding our mission to nurture young minds.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                    {members.map((member, idx) => (
                        <div key={idx} className="group bg-slate-50 rounded-3xl p-4 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center flex flex-col items-center">
                            {/* Portrait Image */}
                            <div className="w-full aspect-[4/5] rounded-2xl relative overflow-hidden shadow-md bg-slate-200 mb-6">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    sizes="(max-w-768px) 100vw, 400px"
                                    priority
                                />
                            </div>

                            {/* Info */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                            <p className="text-base font-semibold text-primary uppercase tracking-wider mb-2">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
