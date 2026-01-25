import React from 'react';
import { Button } from '../components';

function MembershipCard({ 
    tier, 
    price, 
    period = 'month',
    description, 
    features, 
    highlighted = false,
    badge = null,
    onSelect 
}) {
    return (
        <div 
            className={`
                relative rounded-3xl p-8 transition-all duration-500
                ${highlighted 
                    ? 'bg-black text-white shadow-2xl scale-105 border-2 border-black' 
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl'
                }
            `}
        >
            {/* Badge */}
            {badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`
                        px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider
                        ${highlighted ? 'bg-white text-black' : 'bg-black text-white'}
                    `}>
                        {badge}
                    </div>
                </div>
            )}

            {/* Tier Name */}
            <div className="text-center mb-6">
                <h3 className={`
                    text-2xl font-bold mb-2
                    ${highlighted ? 'text-white' : 'text-gray-900'}
                `}>
                    {tier}
                </h3>
                <p className={`
                    text-sm
                    ${highlighted ? 'text-gray-300' : 'text-gray-600'}
                `}>
                    {description}
                </p>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                    <span className={`
                        text-5xl font-bold
                        ${highlighted ? 'text-white' : 'text-gray-900'}
                    `}>
                        ${price}
                    </span>
                    <span className={`
                        text-lg ml-2
                        ${highlighted ? 'text-gray-300' : 'text-gray-600'}
                    `}>
                        /{period}
                    </span>
                </div>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <div className={`
                            flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                            ${highlighted ? 'bg-white' : 'bg-black'}
                        `}>
                            <svg 
                                width="12" 
                                height="12" 
                                viewBox="0 0 12 12" 
                                fill="none"
                                className={highlighted ? 'text-black' : 'text-white'}
                            >
                                <path 
                                    d="M10 3L4.5 8.5L2 6" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <span className={`
                            text-sm
                            ${highlighted ? 'text-gray-100' : 'text-gray-700'}
                        `}>
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <Button
                onClick={onSelect}
                className={`
                    w-full
                    ${highlighted 
                        ? 'bg-white text-black hover:bg-gray-100' 
                        : 'bg-black text-white hover:bg-gray-800'
                    }
                `}
                size="lg"
                textColor=''
            >
                Get Started
            </Button>

            {/* Additional Info */}
            <p className={`
                text-xs text-center mt-4
                ${highlighted ? 'text-gray-400' : 'text-gray-500'}
            `}>
                Cancel anytime
            </p>
        </div>
    );
}

export default MembershipCard;