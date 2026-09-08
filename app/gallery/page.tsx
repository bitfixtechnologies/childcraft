'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';

interface GalleryItem {
    _id?: string;
    imageUrl: string;
    title?: string;
    index?: number;
}

const defaultImages: GalleryItem[] = [
    { imageUrl: '/images/gallery/img3.jpeg', title: 'Campus Activity' },
    { imageUrl: '/images/gallery/img2.jpeg', title: 'Student Projects' },
    { imageUrl: '/images/gallery/img1.jpeg', title: 'Library Reference' },
    { imageUrl: '/images/gallery/img4.jpeg', title: 'Classroom Interaction' },
    { imageUrl: '/images/gallery/img5.jpeg', title: 'School Building' },
    { imageUrl: '/images/gallery/img6.jpeg', title: 'Creative Writing Workshop' },
    { imageUrl: '/images/gallery/img7.jpeg', title: 'Interactive Learning' },
    { imageUrl: '/images/gallery/img8.jpeg', title: 'Group Discussion' },
];

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/gallery`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setImages(data);
                    } else {
                        setImages(defaultImages);
                    }
                } else {
                    setImages(defaultImages);
                }
            } catch (err) {
                console.error("Error fetching gallery:", err);
                setImages(defaultImages);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    return (
        <main className="min-h-screen bg-gray-50 pt-10 md:pt-16 pb-8 md:py-24">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                {/* Header Area */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="relative inline-block mb-6 pt-8 pl-0">
                        <div className="absolute top-0 left-0 grid grid-cols-6 gap-2 w-fit opacity-60 pointer-events-none">
                            {[...Array(36)].map((_, i) => {
                                const colors = ["bg-blue-400", "bg-rose-400", "bg-orange-400", "bg-green-400", "bg-slate-300"];
                                const color = colors[i % colors.length];
                                return (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${color} ${i % 3 === 0 ? 'opacity-60' : 'opacity-100'}`}></div>
                                );
                            })}
                        </div>
                        <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-gray-900">
                            Our Gallery
                        </h1>
                    </div>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                        Explore a curated collection of our most significant achievements, successful projects, and memorable moments.
                        These images capture our journey, illustrating our ongoing commitment to excellence.
                    </p>
                </div>

                {/* Varied Grid Layout for UI Variety */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
                        {images.map((image, index) => {
                            // Create larger tiles for some images to add variety
                            const isLarge = index === 0 || index === 5;
                            const isWide = index === 3;
                            const isTall = index === 6;

                            let gridClasses = "md:col-span-1 md:row-span-1";
                            if (isLarge) gridClasses = "md:col-span-2 md:row-span-2";
                            else if (isWide) gridClasses = "md:col-span-2 md:row-span-1";
                            else if (isTall) gridClasses = "md:col-span-1 md:row-span-2";

                            return (
                                <div
                                    key={index}
                                    onClick={() => setSelectedImage(image)}
                                    className={`relative rounded-2xl overflow-hidden shadow-sm group bg-gray-200 cursor-pointer ${gridClasses}`}
                                >
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.title || `Gallery photo ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                    />
                                    {/* Gradient overlay with title */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pb-6">
                                        {image.title && (
                                            <span className="text-white text-xs md:text-sm font-bold tracking-wide transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                {image.title}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                    >
                        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Modal Content */}
                    <div
                        className="relative w-full max-w-5xl md:h-[75vh] aspect-square md:aspect-auto flex flex-col justify-center"
                        onClick={(e) => e.stopPropagation()} // Prevent clicking the image from closing
                    >
                        <div className="relative w-full h-full min-h-[50vh] md:min-h-[70vh]">
                            <Image
                                src={selectedImage.imageUrl}
                                alt={selectedImage.title || "Selected gallery photo"}
                                fill
                                className="object-contain"
                                sizes="100vw"
                            />
                        </div>
                        {selectedImage.title && (
                            <div className="text-center text-white mt-4 text-xs md:text-sm font-bold bg-black/60 backdrop-blur-md px-6 py-2.5 rounded-full mx-auto border border-white/10 shadow-lg max-w-[90%]">
                                {selectedImage.title}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}