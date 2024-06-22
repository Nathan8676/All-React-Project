import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Container, Logo, Logoutbtn} from "../index"
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
  {
      name: "My Post",
      slug: "/my-posts",
      active: isloggedIn,
  }
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
      <nav className='flex '>
        <div className='mr-4' >
          <Link to="/">
          <Logo width="70px" />
          </Link>
         </div> 
          <ul className='flex ml-auto'>
            {navitem.map((item) => (
              item.active ? (
                <li key={item.name} >
                  <button
                   className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  onClick={() => navigate(item.slug)}
                  >{item.name}</button>
                </li>
              ) : null
            ))}
            {isloggedIn && (
              <li>
              <Logoutbtn/>
              </li>
            )}
         </ul>
      </nav>
      </Container>
      </header>
  )
}

export default Header