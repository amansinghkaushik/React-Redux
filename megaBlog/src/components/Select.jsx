import React from 'react'

function Select({
    options,
    label,
    chassName = '',
    ...props
}, ref) {
  return (
    {label && <label htmlFor = {id} className='w-full' >{label}</label>}
    <select 
    {...props}
    ref={ref} 
    id= {id} 
    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
        <option key={options} value={options}>
            {options}
        </option>
    </select>
  )
}

export default React.forwardRef(Select)