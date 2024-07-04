import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Logo, Logoutbtn } from "../index";

function Header() {
  const [isNavbar, setIsNavbar] = useState(window.innerWidth < 900);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isloggedIn = useSelector(state => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsNavbar(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navitem = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !isloggedIn },
    { name: "Signup", slug: "/signup", active: !isloggedIn },
    { name: "All Posts", slug: "/all-posts", active: isloggedIn },
    { name: "Add Post", slug: "/add-post", active: isloggedIn },
    { name: "My Post", slug: "/my-posts", active: isloggedIn },
  ];

  if (!isNavbar) {
    return (
      <header className='py-3 shadow bg-gray-500'>
        <Container>
          <nav className='flex '>
            <div className='mr-4'>
              <Link to="/">
                <Logo width="70px" />
              </Link>
            </div>
            <ul className='flex ml-auto'>
              {navitem.map((item) => (
                item.active ? (
                  <li key={item.name}>
                    <button
                      className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                      onClick={() => navigate(item.slug)}
                    >{item.name}</button>
                  </li>
                ) : null
              ))}
              {isloggedIn && (
                <li>
                  <Logoutbtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    );
  } else {
    return (
      <header className='py-3 shadow bg-gray-500'>
        <Container>
          <nav className='flex justify-between items-center'>
            <div className='mr-4'>
              <Link to="/">
                <Logo width="70px" />
              </Link>
            </div>
            <button
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Menu
            </button>
            <div
              className={`fixed inset-0 bg-gray-500 bg-opacity-75 z-50 transition-transform transform ${
                isMenuOpen ? 'translate-x-0 overflow-scroll' : 'translate-x-full'
              }`}
            >
              <div className="flex justify-end p-4">
                <button
                  className="text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Close
                </button>
              </div>
              <ul className="flex flex-col items-center mt-8">
                {navitem.map((item) => (
                  item.active ? (
                    <li key={item.name} className="mb-4">
                      <button
                        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-white'
                        onClick={() => {
                          navigate(item.slug);
                          setIsMenuOpen(false);
                        }}
                      >{item.name}</button>
                    </li>
                  ) : null
                ))}
                {isloggedIn && (
                  <li>
                    <Logoutbtn />
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </Container>
      </header>
    );
  }
}

export default Header;
