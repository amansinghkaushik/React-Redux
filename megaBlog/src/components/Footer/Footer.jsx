import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Explore",
            links: [
                { name: "Articles", path: "/" },
                { name: "Radio", path: "/radio" },
                { name: "Podcast", path: "/podcast" },
                { name: "Be a Writer", path: "/signup" },
            ]
        },
        {
            title: "Connect",
            links: [
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Community", path: "/community" },
                { name: "Advertise", path: "/advertise" },
            ]
        },
        {
            title: "Support",
            links: [
                { name: "Help Center", path: "/help" },
                { name: "Membership", path: "/membership" },
                { name: "Guidelines", path: "/guidelines" },
                { name: "Feedback", path: "/feedback" },
            ]
        },
        {
            title: "Legal",
            links: [
                { name: "Terms of Service", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Cookie Policy", path: "/cookies" },
                { name: "Copyright", path: "/copyright" },
            ]
        }
    ];

    const socialLinks = [
        {
            name: "Twitter",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
            ),
            path: "https://twitter.com"
        },
        {
            name: "Facebook",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            ),
            path: "https://facebook.com"
        },
        {
            name: "Instagram",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
            ),
            path: "https://instagram.com"
        },
        {
            name: "LinkedIn",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            ),
            path: "https://linkedin.com"
        }
    ];

    return (
        <footer className="relative bg-slate-50 border-t border-gray-200 w-full">
            <div className="w-full px-6 md:px-8 lg:px-12">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
                        {/* Logo and Description */}
                        <div className="lg:col-span-2">
                            <Link to="/" className="inline-block mb-6">
                                <div className="text-3xl font-bold tracking-tight">
                                    <span className="italic">Blog</span>
                                    <span className="font-normal">Spot.</span>
                                </div>
                            </Link>
                            <p className="text-gray-600 leading-relaxed mb-6 max-w-sm">
                                Discover stories, thinking, and expertise from writers on any topic.
                            </p>
                            
                            {/* Social Links */}
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Footer Links */}
                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-6">
                                    {section.title}
                                </h3>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                to={link.path}
                                                className="text-gray-600 hover:text-black transition-colors duration-200 text-sm"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600">
                            © {currentYear} BlogSpot. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link 
                                to="/membership" 
                                className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200"
                            >
                                Become a Member
                            </Link>
                            <Link 
                                to="/sitemap" 
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;