import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    error = "",
    ...props
}, ref) {
    const id = useId();
    
    return (
        <div className='w-full text-left'>
            {label && (
                <label 
                    className='inline-block mb-1 text-sm font-medium text-gray-700 px-2' 
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`
                    w-full px-4 py-3 
                    rounded-lg 
                    border-2 
                    ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-black'}
                    bg-white
                    text-gray-900
                    outline-none 
                    transition-all duration-200
                    placeholder:text-gray-400
                    ${className}
                `}
                ref={ref}
                {...props}
                id={id}
            />
            {error && (
                <p className="mt-1.5 text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
});

export default Input;