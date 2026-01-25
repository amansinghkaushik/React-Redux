import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard, FeaturedPost } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-white">
                <Container>
                    <div className="text-center space-y-6">
                        <h1 className="text-7xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                                Welcome
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-md mx-auto">
                            Login to discover amazing stories and content
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    const featuredPost = posts[0];
    const regularPosts = posts.slice(1);

    return (
        <div className="w-full min-h-screen">
            <Container>
                {/* Hero Section */}
                <div className="pt-20 pb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-8xl font-bold tracking-tight italic">
                            Best of the week
                        </h1>
                        <a 
                            href="/all-posts" 
                            className="text-sm font-medium hover:underline underline-offset-4 flex items-center gap-2"
                        >
                            See all posts
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>

                    {/* Featured Post */}
                    {featuredPost && <FeaturedPost post={featuredPost} />}
                </div>

                {/* Regular Posts Grid */}
                {regularPosts.length > 0 && (
                    <div className="pb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {regularPosts.map((post, index) => (
                                <div 
                                    key={post.$id} 
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Container>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}

export default Home;