import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {container, Logo, LogoutBtn} from "../index"
import { useNavigate } from 'react-router-dom'
function Header() {

  const isloggedIn = useSelector(state => state.auth.status)
  const navigate = useNavigate()

  const navitem = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !isloggedIn,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !isloggedIn,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: isloggedIn,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: isloggedIn,
  },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <container>
      <nav className='flex items-center justify-between'>
        <div className='m-4' >
          <Link to={"/"}>
          <Logo />
          </Link>
         </div> 
          <ul>
            {navitem.map((item) => (
              item.active ? (
                <li key={item.name} >
                  <button
                  className=' rounded p-2 m-2 bg-transparent hover:text-red-500 duration-200 '
                  onClick={() => navigate(item.slug)}
                  >{item.name}</button>
                </li>
              ) : null
            ))}
            {isloggedIn && (
              <li>
              <LogoutBtn/>
              </li>
            )}
         </ul>
      </nav>
      </container>
      </header>
  )
}

export default Header