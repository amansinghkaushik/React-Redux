import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";

function FeaturedPost({ post }) {
    const { $id, title, featuredImage, $createdAt, category = 'Featured' } = post;
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: '2-digit', 
            year: 'numeric' 
        });
    };

    return (
        <Link to={`/post/${$id}`} className="block group">
            <div className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-96 lg:h-auto overflow-hidden">
                        <img 
                            src={appwriteService.getFileView(featuredImage) || appwriteService.getFilePreview(featuredImage)}
                            alt={title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        
                        {/* Floating Date Badge */}
                        <div className="absolute top-6 left-6 space-y-2">
                            <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 text-xs font-medium shadow-lg">
                                {formatDate($createdAt)}
                            </div>
                            <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 text-xs font-medium shadow-lg border border-gray-200">
                                • {category}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-center p-12 lg:p-16 relative">
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 bg-black rounded-full"></span>
                            <span className="text-sm font-medium tracking-wide uppercase">
                                {category}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-8 group-hover:translate-x-2 transition-transform duration-300">
                            {title}
                        </h2>

                        {/* Arrow Button */}
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg group-hover:bg-black group-hover:text-white transition-all duration-300 group-hover:scale-110">
                            <svg 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none"
                                className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                            >
                                <path 
                                    d="M7 17L17 7M17 7H7M17 7V17" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default FeaturedPost;