import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage, category = 'Article' }) {
    return (
        <Link to={`/post/${$id}`} className="block group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                    <img 
                        src={appwriteService.getFileView(featuredImage) || appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                        <span className="text-xs font-medium tracking-wide uppercase text-gray-600">
                            {category}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold leading-snug group-hover:text-blue-600 transition-colors duration-300">
                        {title}
                    </h3>

                    {/* Read More Arrow */}
                    <div className="mt-4 inline-flex items-center text-sm font-medium group-hover:gap-2 gap-1 transition-all duration-300">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Read more
                        </span>
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16" 
                            fill="none"
                            className="transform group-hover:translate-x-1 transition-transform duration-300"
                        >
                            <path 
                                d="M3 8h10M9 4l4 4-4 4" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;