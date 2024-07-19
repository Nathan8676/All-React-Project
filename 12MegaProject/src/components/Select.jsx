import React, {useId , forwardRef} from 'react'

const Select = forwardRef(({
    options = [],
    label,
    className,
    ...props
},ref) => {
const id = useId()

    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block pl-1 mb-1'
            htmlFor={id}
            >
            {label}
            </label>}
            <select 
            id={id}
            {...props}
            ref={ref}
            className={`px-2 py-3 rounded-lg dark:bg-zinc-950 dark:text-white dark:border-black bg-white text-black focus:bg-gray-50 
            duration-200 border border-gray-50 w-full ${className} `}
            >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
            </select>
            
        </div>
    )
})



export default Select