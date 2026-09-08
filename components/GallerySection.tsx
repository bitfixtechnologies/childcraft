import Image from 'next/image';
import Link from 'next/link';

const images = [
    '/images/gallery/img3.jpeg',
    '/images/gallery/img2.jpeg',
    '/images/gallery/img6.jpeg',
    '/images/gallery/img1.jpeg',
];

export default function GallerySection() {
    return (
        <section className="pt-10 md:pt-16 pb-8 md:py-24 bg-linear-to-br from-blue-900 via-blue-950 to-slate-900 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold capitalize text-white mb-2">
                            Gallery
                        </h2>
                        <p className="text-slate-200 text-sm md:text-base max-w-2xl font-light">
                            Explore a curated collection of our most significant achievements, successful projects, and memorable moments.
                            These moments reflect our commitment to excellence and the vibrant community that drives our success forward.
                        </p>
                    </div>
                    <Link
                        href="/gallery"
                        className="hidden md:inline-flex items-center gap-2 text-sky-300 hover:text-sky-200 font-medium transition-colors group"
                    >
                        View More
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="relative w-full aspect-4/3 md:aspect-square overflow-hidden rounded-xl shadow-2xl border border-white/10 group"
                        >
                            <Image
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                className="object-cover grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out cursor-pointer group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>

                {/* Mobile View More Button */}
                <div className="mt-8 flex justify-center md:hidden">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 text-sky-300 hover:text-sky-200 font-medium transition-colors group"
                    >
                        View More
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
