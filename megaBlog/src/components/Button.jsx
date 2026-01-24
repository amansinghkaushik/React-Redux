import React from 'react'

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    onClick,
    disabled = false,
    ...props
}) => {
  return (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${bgColor} ${textColor} ${className} px-4 py-2 rounded-lg font-medium transition-colors duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
        {...props}
    >
        {children}
    </button>
  )
}

export default Button
