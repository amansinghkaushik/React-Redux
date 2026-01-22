import React from 'react'

function Button({
    children,
    type = 'button',
    textColor = 'text-white',
    bgColor = 'bg-blue-500',
    hoverBgColor = 'hover:bg-blue-600',
    className = '',
    ...props
}) {
  return (
    <button  type={type} className={`${textColor} ${bgColor} ${hoverBgColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button