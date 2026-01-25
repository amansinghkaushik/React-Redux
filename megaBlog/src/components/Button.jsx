import React from 'react';

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-black',
    textColor = 'text-white',
    className = '',
    onClick,
    disabled = false,
    variant = 'primary', // primary, secondary, outline
    size = 'md', // sm, md, lg
    ...props
}) => {
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    const variantClasses = {
        primary: `${bgColor} ${textColor} hover:opacity-90`,
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline: 'bg-transparent border-2 border-current hover:bg-black hover:text-white'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                ${sizeClasses[size]}
                ${variantClasses[variant]}
                ${className}
                h-12 flex items-center justify-center
                rounded-full font-medium 
                transition-all duration-200 
                disabled:opacity-50 
                disabled:cursor-not-allowed 
                shadow-sm hover:shadow-md
                relative
                group
            `}
            {...props}
        >
            {/* Text Container with Overflow Hidden */}
            <span className="relative inline-block overflow-hidden">
                {/* Animated Text Wrapper */}
                <span className="inline-block">
                    {/* First Line - Visible by Default */}
                    <span 
                        className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-full group-disabled:transform-none"
                        aria-label={children}
                    >
                        {children}
                    </span>
                    
                    {/* Second Line - Hidden Below, Revealed on Hover */}
                    <span 
                        className="inline-block absolute top-full left-0 whitespace-nowrap transition-transform duration-500 ease-out group-hover:-translate-y-full group-disabled:transform-none" 
                        aria-hidden="true"
                    >
                        {children}
                    </span>
                </span>
            </span>
        </button>
    );
};

export default Button;