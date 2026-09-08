"use client";

import React from "react";

const ContactPage = () => {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Hero Section */}
            <div className="bg-linear-to-r from-blue-900 via-blue-950 to-slate-900 py-12 sm:py-24">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">Contact Us</h1>
                    <p className="text-blue-100 text-sm md:text-lg max-w-2xl mx-auto">
                        We'd love to hear from you. Reach out to us for any inquiries or support.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-12 -mt-10 sm:-mt-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Contact Information Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 flex flex-col justify-between h-full border-t-4 border-primary">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8">Get in Touch</h2>

                            <div className="space-y-6 md:space-y-8">
                                {/* Location */}
                                <div className="flex items-start gap-4 md:gap-5 group">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-bg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 font-semibold mb-1 text-sm md:text-base">Our Location</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                            Childcraft Hallmark Publishers,<br />
                                            KRL Road, Kundannoor Jn,<br />
                                            Kochi, Kerala.
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4 md:gap-5 group">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-bg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 font-semibold mb-1 text-sm md:text-base">Phone Number</h3>
                                        <p className="text-gray-600 font-medium hover:text-primary transition-colors text-sm md:text-base">
                                            <a href="tel:+919539272059">+91 95392 72059</a>
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4 md:gap-5 group">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-bg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 font-semibold mb-1 text-sm md:text-base">Email Address</h3>
                                        <p className="text-gray-600 hover:text-primary transition-colors text-sm md:text-base break-all">
                                            <a href="mailto:info@childcraftbooks.com">info@childcraftbooks.com</a>
                                        </p>
                                    </div>
                                </div>

                                {/* Working Hours */}
                                <div className="flex items-start gap-4 md:gap-5 group">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-bg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 font-semibold mb-1 text-sm md:text-base">Working Hours</h3>
                                        <p className="text-gray-600 text-sm md:text-base">
                                            Mon - Sat: 9:30 AM - 5:30 PM
                                        </p>
                                    </div>
                                </div>

                                {/* Instagram */}
                                <div className="flex items-start gap-4 md:gap-5 group">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-bg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 5.25h.008v.008h-.008V5.25Zm-3 13.5H8.25A5.25 5.25 0 0 1 3 13.5V8.25A5.25 5.25 0 0 1 8.25 3h7.5a5.25 5.25 0 0 1 5.25 5.25v5.25a5.25 5.25 0 0 1-5.25 5.25Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 font-semibold mb-1 text-sm md:text-base">Instagram</h3>
                                        <p className="text-gray-650 font-medium hover:text-primary transition-colors text-sm md:text-base">
                                            <a href="https://instagram.com/childcraftbooks" target="_blank" rel="noopener noreferrer">@childcraftbooks</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border-t-4 border-primary">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                        <form className="space-y-4 md:space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">Full Name</label>
                                    <input
                                    type="text"
                                    id="name"
                                    placeholder="John Doe"
                                    className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all text-sm md:text-base"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="john@example.com"
                                    className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all text-sm md:text-base"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                placeholder="How can we help?"
                                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all text-sm md:text-base"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">Your Message</label>
                            <textarea
                                id="message"
                                rows={5}
                                placeholder="Write your message here..."
                                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-sm md:text-base"
                            ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 md:py-4 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary-hover hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm md:text-base"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-8 md:mt-12 bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-white">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.970366613795!2d76.31509727533239!3d9.93642357412481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08733c0cbe5baf%3A0xd4532aeb9b4db2a4!2sChildcraft%20Hallmark%20Publishers!5e0!3m2!1sen!2sin!4v1771532986941!5m2!1sen!2sin"
                        width="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-[300px] md:h-[400px]"
                    ></iframe>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;