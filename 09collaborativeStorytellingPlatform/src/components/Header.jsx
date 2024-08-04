import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button, Auth } from "./index";

function Header() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
        <div className="flex items-center gap-4 text-[#111418]">
          <Link to="/" className="flex items-center gap-4 text-[#111418]">
            <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
              Storytelling
            </h2>
          </Link>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-[#111418] text-sm font-medium leading-normal ${
                  isActive ? "text-Rose" : "text-oxfordBlue"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-[#111418] text-sm font-medium leading-normal ${
                  isActive ? "text-Rose" : "text-oxfordBlue"
                }`
              }
            >
              About
            </NavLink>
            {/* Add more NavLink components for other pages */}
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              onClick={() => {
                setShowLoginPopup(true);
              }}
            >
              Log in 
            </Button>
          </div>
        </div>
      </header>
      {showLoginPopup && <Auth setAuthPopup={setShowLoginPopup} />}
    </>
  );
}

export default Header;
