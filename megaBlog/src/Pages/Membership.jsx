import React, { useState } from 'react';
import { Container, MembershipCard } from '../components';
import { useSelector } from 'react-redux';

function Membership({ onAuthOpen }) {
    const [billingPeriod, setBillingPeriod] = useState('monthly'); // monthly or yearly
    const authStatus = useSelector((state) => state.auth.status);

    const membershipTiers = [
        {
            tier: "Free",
            price: 0,
            period: billingPeriod === 'monthly' ? 'month' : 'year',
            description: "Perfect for casual readers",
            features: [
                "Access to free articles",
                "Limited reading time",
                "Community discussions",
                "Weekly newsletter",
            ],
            highlighted: false,
            badge: null,
            requiresAuth: !authStatus
        },
        {
            tier: "Member",
            price: billingPeriod === 'monthly' ? 12 : 120,
            period: billingPeriod === 'monthly' ? 'month' : 'year',
            description: "For dedicated readers and learners",
            features: [
                "Unlimited access to all articles",
                "Ad-free reading experience",
                "Exclusive member-only content",
                "Listen to articles on the go",
                "Bookmark your favorite stories",
                "Access to archive (2015-present)",
                "Support independent writers",
            ],
            highlighted: true,
            badge: "Most Popular",
            requiresAuth: true
        },
        {
            tier: "Creator",
            price: billingPeriod === 'monthly' ? 25 : 250,
            period: billingPeriod === 'monthly' ? 'month' : 'year',
            description: "For writers and content creators",
            features: [
                "Everything in Member plan",
                "Publish unlimited stories",
                "Earn money from your writing",
                "Advanced analytics dashboard",
                "Priority support",
                "Verified creator badge",
                "Custom author page",
                "Newsletter integration",
            ],
            highlighted: false,
            badge: "Best Value",
            requiresAuth: true
        }
    ];

    const handleSelectPlan = (tier, requiresAuth) => {
        if (requiresAuth && !authStatus) {
            // Open auth modal with signup mode
            if (onAuthOpen) {
                onAuthOpen('signup');
            }
        } else {
            // Handle subscription logic for authenticated users
            console.log(`Selected plan: ${tier}`);
            // Add your payment/subscription logic here
        }
    };

    const benefits = [
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            title: "Unlimited Access",
            description: "Read as much as you want, whenever you want"
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            title: "Support Writers",
            description: "Your membership directly supports the writers you read most"
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            title: "Ad-Free Experience",
            description: "Enjoy clean, distraction-free reading on all your devices"
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            title: "Exclusive Content",
            description: "Access member-only articles and premium features"
        }
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-white to-slate-50">
            <Container>
                {/* Hero Section */}
                <div className="pt-32 pb-16 text-center">
                    
                    <h1 className="text-7xl md:text-8xl font-bold tracking-tight mb-6">
                        <span className="italic">Become a</span>
                        <br />
                        <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                            Member
                        </span>
                    </h1>
                    
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of readers who get unlimited access to the best stories, 
                        insights, and ideas from the world's brightest minds.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex items-center bg-white border-2 border-gray-200 rounded-full p-1">
                        <button
                            onClick={() => setBillingPeriod('monthly')}
                            className={`
                                px-8 py-3 rounded-full text-sm font-medium transition-all duration-300
                                ${billingPeriod === 'monthly' 
                                    ? 'bg-black text-white' 
                                    : 'text-gray-600 hover:text-gray-900'
                                }
                            `}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingPeriod('yearly')}
                            className={`
                                px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 relative
                                ${billingPeriod === 'yearly' 
                                    ? 'bg-black text-white' 
                                    : 'text-gray-600 hover:text-gray-900'
                                }
                            `}
                        >
                            Yearly
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Membership Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
                    {membershipTiers.map((tier, index) => (
                        <div
                            key={tier.tier}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <MembershipCard
                                {...tier}
                                onSelect={() => handleSelectPlan(tier.tier, tier.requiresAuth)}
                            />
                        </div>
                    ))}
                </div>

                {/* Benefits Section */}
                <div className="py-20 border-t border-gray-200">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-4">Why join BlogSpot?</h2>
                        <p className="text-gray-600 text-lg">
                            Everything you need to enhance your reading experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {benefits.map((benefit, index) => (
                            <div
                                key={benefit.title}
                                className="text-center animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="py-20 border-t border-gray-200">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">
                            Frequently asked questions
                        </h2>
                        
                        <div className="space-y-6">
                            {[
                                {
                                    question: "Can I cancel my membership anytime?",
                                    answer: "Yes! You can cancel your membership at any time. You'll continue to have access until the end of your billing period."
                                },
                                {
                                    question: "What payment methods do you accept?",
                                    answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal for your convenience."
                                },
                                {
                                    question: "Do you offer refunds?",
                                    answer: "We offer a 30-day money-back guarantee. If you're not satisfied within the first month, we'll provide a full refund."
                                },
                                {
                                    question: "Can I switch plans later?",
                                    answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                                }
                            ].map((faq, index) => (
                                <details
                                    key={index}
                                    className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300"
                                >
                                    <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg">
                                        {faq.question}
                                        <svg
                                            className="w-5 h-5 transition-transform group-open:rotate-180"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <p className="px-6 pb-6 text-gray-600">
                                        {faq.answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="py-20 text-center">
                    <div className="bg-black text-white rounded-3xl p-16 max-w-4xl mx-auto">
                        <h2 className="text-5xl font-bold mb-6">
                            Ready to start reading?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join our community of passionate readers and get instant access to thousands of articles.
                        </p>
                        <button
                            onClick={() => handleSelectPlan('Member', true)}
                            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                        >
                            Get Started Today
                        </button>
                    </div>
                </div>
            </Container>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}

export default Membership;