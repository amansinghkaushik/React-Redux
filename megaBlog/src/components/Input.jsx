import React from 'react'
import { useId } from 'react'

const Input = React.forwardRef( function Input({
    type = 'text',
    label = '',
    placeholder = '',
    className = '',
    ...props
}, ref) {

    const id = useId();

  return (
    <div className='w-full'>
        {label && <label 
        className='block mb-2 font-medium'
        htmlFor={id}>
            {label}
        </label>}
        <input type={type}
        className={`${className} w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent `}
        ref={ref}
        id={id}
        {...props }
        />
    </div>
)})

export default Input