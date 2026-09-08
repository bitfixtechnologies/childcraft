"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/utils/api";

interface BookSeriesItem {
  _id: string;
  name: string;
  label: string;
  classes: string;
  gradient: string;
  image?: string;
  index: number;
}

export default function BookSeriesPage() {
  const [seriesList, setSeriesList] = useState<BookSeriesItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/book-outlines`);
        if (res.ok) {
          const data = await res.json();
          const sorted = data.sort((a: any, b: any) => (a.index || 0) - (b.index || 0));
          setSeriesList(sorted);
        }
      } catch (err) {
        console.error("Error fetching book series:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, []);

  const getSeriesIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("wings")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 opacity-80 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
        </svg>
      );
    } else if (lowerName.includes("pearls")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 opacity-80 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
        </svg>
      );
    } else if (lowerName.includes("nexus")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 opacity-80 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      );
    } else if (lowerName.includes("manjadi")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 opacity-80 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 opacity-80 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25c-1.096-1.18-2.615-1.93-4.305-1.93L3 4.318v14.25l4.695-.008c1.69 0 3.209.75 4.305 1.93m0-14.25c1.096-1.18 2.615-1.93 4.305-1.93L21 4.318v14.25l-4.695-.008c-1.69 0-3.209.75-4.305 1.93m0-14.25v14.25" />
        </svg>
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-16 md:pt-24 pb-12 md:pb-24">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        
        {/* Back Link */}
        <div className="mb-6 md:mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-500 hover:text-primary transition-colors uppercase tracking-wider"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Header Title & Description */}
        <div className="text-center mb-12 md:mb-16">
          <div className="relative inline-block mb-4 pt-4">
            {/* Dots background decor */}
            <div className="absolute top-0 left-0 grid grid-cols-6 gap-1.5 w-fit opacity-50 pointer-events-none">
              {[...Array(18)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
              ))}
            </div>
            <h1 className="relative z-10 text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
              Our Complete <span className="text-primary">Book Series</span>
            </h1>
          </div>
          <p className="text-slate-650 text-sm md:text-base max-w-xl mx-auto font-medium mt-2 leading-relaxed">
            Explore our school publications catalog including core, pre-primary, and integrated curriculum collections.
          </p>
        </div>

        {/* Dynamic Series Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-200 animate-pulse rounded-3xl h-48"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {seriesList.map((series) => (
              <div
                key={series._id}
                className="bg-white rounded-3xl border border-slate-150 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5 aspect-[3/4] p-4 items-center justify-center relative"
              >
                {series.image ? (
                  <img src={series.image} className="w-full h-full object-contain rounded-2xl group-hover:scale-[1.02] transition-transform duration-300" alt={series.name || "Book Cover"} />
                ) : (
                  <div className="text-slate-400 text-xs font-bold text-center">
                    {series.name || "Book Outline"}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
