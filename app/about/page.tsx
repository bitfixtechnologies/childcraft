import Image from 'next/image';
import { FaGraduationCap, FaBookOpen, FaLightbulb, FaQuoteLeft } from 'react-icons/fa';
import ContactCTA from "@/components/ContactCTA";
import Roadmap from "@/components/Roadmap";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative w-full py-12 md:py-16 bg-slate-50 flex items-center justify-center overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

                <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10 text-center">
                    <h1 className="text-xs md:text-sm font-bold tracking-widest text-primary uppercase mb-4">Who We Are</h1>
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        Childcraft Hallmark Publishers
                    </h1>
                    <p className="text-sm md:text-lg text-gray-650 max-w-3xl mx-auto leading-relaxed">
                        Child Craft Hallmark Publishers is a distinguished educational publishing organisation dedicated to creating high quality learning resources for children, educators, and schools across India. With a commitment to academic excellence, creativity, and innovation, we develop learner centred educational solutions that inspire curiosity, foster confidence, and support holistic development. Through thoughtfully crafted publications, teacher training initiatives, and academic support programs, we strive to make learning meaningful, engaging, and future ready for every child.
                    </p>
                </div>
            </section>

            {/* Core Values / Points Section */}
            <section className="py-8 md:py-16  bg-white">
                <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-11 max-w-4xl mx-auto">
                        <div className="flex flex-col items-center text-center p-4 md:p-6">
                            <div className="w-10 h-10 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-3 md:mb-6 text-blue-600 shadow-sm">
                                <FaBookOpen className="w-5 h-5 md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Quality Education</h3>
                            <p className="text-xs md:text-base text-gray-600 leading-relaxed md:px-4">
                                We design books that make learning intuitive, fostering critical thinking and a lifelong love for reading from a young age.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 md:p-6">
                            <div className="w-10 h-10 md:w-16 md:h-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-3 md:mb-6 text-pink-600 shadow-sm">
                                <FaLightbulb className="w-5 h-5 md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Innovative Content</h3>
                            <p className="text-xs md:text-base text-gray-600 leading-relaxed md:px-4">
                                We stay ahead of educational trends, crafting content that adapts to modern learning environments and diverse student needs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission (Split Layout) */}
            <section className="py-16 md:py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div>
                            <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold text-xs md:text-sm mb-4 md:mb-6 uppercase tracking-wider">
                                Our Vision
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Shaping the Future</h2>
                            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                                To be a leading educational publishing organization that inspires young minds through innovative, engaging, and learner centered resources, fostering a lifelong love for learning and empowering future generations to thrive in an ever changing world.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-linear-to-r from-pink-500 to-rose-500 rounded-3xl blur-2xl opacity-20 hidden md:block"></div>
                            <div className="relative bg-slate-800 p-6 md:p-12 rounded-3xl border border-slate-700">
                                <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold text-xs md:text-sm mb-4 md:mb-6 uppercase tracking-wider">
                                    Our Mission
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Empower. Innovate. Excel.</h2>
                                <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                                    To create high quality educational resources that combine academic excellence, creativity, and innovation while supporting schools, educators, and learners through meaningful learning experiences. We are committed to nurturing essential 21st century skills, promoting holistic development, and empowering children to become confident, responsible, and future-ready individuals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-12 md:py-24 bg-white relative">
                <div className="container mx-auto px-4 lg:px-8 max-w-7xl text-center">
                    <h2 className="text-xs md:text-sm font-bold tracking-widest text-green-600 uppercase mb-3">What We Do</h2>
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12">Our Services</h3>

                    <div className="max-w-4xl mx-auto bg-green-50 rounded-3xl p-6 md:p-12 border border-green-100 shadow-sm">
                        <p className="text-sm md:text-xl text-gray-755 leading-relaxed font-medium">
                            We develop high-quality educational resources that promote academic excellence, conceptual understanding, and holistic learning. Our comprehensive range of curriculum-aligned textbooks, learning materials, assessments, and teacher-support resources is designed to enhance classroom instruction and student achievement. Through innovative content and pedagogical excellence, we empower schools, educators, and learners to thrive in an evolving educational landscape.
                        </p>
                    </div>
                </div>
            </section>

            <Roadmap />

            {/* Leadership Messages Section */}
            <section className="py-12 md:py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Managing Director Message */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-linear-to-r from-pink-500 to-rose-500 rounded-3xl blur-2xl opacity-20 hidden md:block"></div>
                        <div className="relative bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-700 flex flex-col md:flex-row gap-6 items-center md:items-start">
                            {/* CEO Image Side */}
                            <div className="shrink-0">
                                <div className="w-20 h-20 md:w-32 md:h-32 relative overflow-hidden rounded-full border-[3px] border-slate-700 shadow-lg">
                                    <Image
                                        src="/images/person1.PNG"
                                        alt="CEO Photo"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* CEO Message Side */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-block px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 font-semibold text-[10px] md:text-xs mb-3 md:mb-4 uppercase tracking-wider">
                                    Message from the CEO
                                </div>
                                <FaQuoteLeft className="text-xl md:text-2xl text-pink-500/30 mb-2 md:mb-3 mx-auto md:mx-0" />
                                <p className="text-slate-300 text-xs md:text-base leading-relaxed italic font-serif mb-4">
                                    "Education is the foundation upon which every great future is built. Our mission is to create learning resources that inspire excellence, innovation, and lifelong learning."
                                </p>
                                <div>
                                    <h4 className="font-bold text-white text-base md:text-lg">Mr. V. A. Vishwanathan</h4>
                                    <p className="text-pink-400 font-medium tracking-wide text-[10px] md:text-xs uppercase mt-0.5">Managing Director</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Director Message */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-linear-to-r from-pink-500 to-rose-500 rounded-3xl blur-2xl opacity-20 hidden md:block"></div>
                        <div className="relative bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-700 flex flex-col md:flex-row gap-6 items-center md:items-start">
                            {/* Director Image Side */}
                            <div className="shrink-0">
                                <div className="w-20 h-20 md:w-32 md:h-32 relative overflow-hidden rounded-full border-[3px] border-slate-700 shadow-lg">
                                    <Image
                                        src="/images/person2.PNG"
                                        alt="Director Photo"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Director Message Side */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-block px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 font-semibold text-[10px] md:text-xs mb-3 md:mb-4 uppercase tracking-wider">
                                    Message from the Director
                                </div>
                                <FaQuoteLeft className="text-xl md:text-2xl text-pink-500/30 mb-2 md:mb-3 mx-auto md:mx-0" />
                                <p className="text-slate-300 text-xs md:text-base leading-relaxed italic font-serif mb-4">
                                    "Every child carries limitless potential. Our responsibility is to provide the right guidance, resources, and inspiration that transform curiosity into knowledge and knowledge into excellence."
                                </p>
                                <div>
                                    <h4 className="font-bold text-white text-base md:text-lg">Mrs. Reena Vishwanathan</h4>
                                    <p className="text-pink-400 font-medium tracking-wide text-[10px] md:text-xs uppercase mt-0.5">Director</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ContactCTA />
        </main>
    );
}