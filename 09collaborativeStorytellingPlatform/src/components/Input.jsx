import React, {useId, forwardRef} from 'react'

const Input = forwardRef(function input({
    label,
    className = '',
    type = 'text', 
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
            className='inline-block mb-1 pl-1'
            htmlFor={id}
            >
                {label}
            </label> }
            <input 
            type={type}
            ref={ref}
            {...props}
            className={`px-2 py-3 rounded-lg bg-white text-black focus:bg-gray-50 
            duration-200 border dark:bg-zinc-950 border-gray-50 w-full ${className} dark:border-black dark:text-white `}
            />
        </div>
      )
})

export default Input