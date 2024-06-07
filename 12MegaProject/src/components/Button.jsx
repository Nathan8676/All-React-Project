import React from 'react'

function Button({
    children,
    textColor = 'text-white',
    className = '',
    bgColor = 'bg-blue-500',
    type = 'button',
    ...props
}) {
  return (
    <button
    className={`py-2 px-2 m-2 ${className}
    ${textColor} ${bgColor} rounded-lg  `}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button