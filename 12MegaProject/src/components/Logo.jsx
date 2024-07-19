import React from 'react'

function Logo({width = "100px"}) {
  return (
    <div className={` w-${width}  text-3xl font-bold text-black dark:text-white`} >Logo</div>
  )
}

export default Logo