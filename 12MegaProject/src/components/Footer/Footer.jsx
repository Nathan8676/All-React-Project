import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const footerLinks = {
  company: [
    { text: 'About Us', path: '/' },
    { text: 'Contact', path: '/' },
  ],
  support: [
    { text: 'Help', path: '/' },
    { text: 'Customer Support', path: '/' },
  ],
  legals: [
    { text: 'Terms & Conditions', path: '/' },
    { text: 'Privacy Policy', path: '/' },
  ],
};


function Footer() {
  return (
    <>
    <footer className="py-4 bg-blue-950 text-white border-t-2 border-t-black">
      <div className="container mx-auto px-4 w-full">
        <div className="flex justify-between items-center max-mobile:flex-col max-mobile:justify-center ">
          {/* Left Section: Logo and Copyright */}
          <div className="flex items-center mb-4 max-mobile:mb-7  ">
            <Logo width="100px" />
          </div>
          
          {/* Right Section: Links */}
          <div className="flex flex-wrap max-sm:flex-col max-sm:justify-center ">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="ml-6 mb-4 max-sm:ml-0 max-sm:mb-3">
                <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <ul className="flex flex-col space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link className="text-sm text-white hover:text-blue-500" to={link.path}>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
      <div className='w-full bg-black '>
      <p className="text-xs text-white ml-2">&copy; Copyright 2023. All Rights Reserved by DevUI. </p>
      </div>
      </>
  );
}

export default Footer;
