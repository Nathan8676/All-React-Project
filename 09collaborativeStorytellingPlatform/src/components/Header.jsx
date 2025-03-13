import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Button, Auth, Card } from "./index";
import { useSelector } from "react-redux";
import { Logoutbtn } from "../components/index";
import NewDatabase from "../appwrite/Database";
import { useEffect } from "react";
function Header() {
  const Location = useLocation()
  const isloggedIn = useSelector(state => state.auth.status);
  const userProfile = useSelector(state => state.userProfile);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showLoginBtn, setShowLoginBtn] = useState(true);
  
  useEffect(() => {
    if(Location.pathname === "/login" || Location.pathname === "/signup" || Location.pathname === "/make-password-recovery"){
      setShowLoginBtn(false)
    }else {
      setShowLoginBtn(true)
    }
  },[Location])
  const handleImg = (id) => {
    const file = NewDatabase.getFilePreview(id)
    return file
  }
  
  const NevLink = [
    {name: "Home",slug: "/", active: true},
    {name: "Add Story",slug: "/add-story", active: isloggedIn},
  ]

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
            <ul className="flex items-center gap-9">
              {NevLink.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `text-[#111418] text-sm font-medium leading-normal ${
                        isActive ? "text-Rose" : "text-oxfordBlue"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            
          {!isloggedIn && showLoginBtn ? (   
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
          ): isloggedIn && Location.pathname === "/profile" ? (
            <Logoutbtn />
          ): (null)}
          {isloggedIn && userProfile.status ? (
            <Link
            to={'/profile'}
            >
            <div className="flex gap-2 ">
              <img className="w-10 h-10 rounded-full" src={handleImg(userProfile.userProfile.Avatar)} alt="" />
            </div>
            </Link>
          ) : isloggedIn ? (
            <Link
            to={'/create-profile'}
            >
            <div className="flex gap-2">
              <img className="w-10 h-10 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
            </div>
            </Link>
          ) : null
          }
        </div>
      </header>
      {showLoginPopup && <Auth setAuthPopup={setShowLoginPopup} />}
    </>
  );
}

export default Header;
