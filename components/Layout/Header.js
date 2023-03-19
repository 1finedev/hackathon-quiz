import { set } from "mongoose";
import React from "react";
import { useState } from "react";

const Header = ({ className }) => {
  const [hamburger, setHamburger] = useState(true);

  function toggleNav() {
    setHamburger(!hamburger);
  }

  return (
    <header className="fixed z-10 top-0 w-full shadow flex items-center justify-between bg-secondary-mid h-[60px] md:px-16 px-8 text-white">
      {/* Name */}
      <h1 className="text-xl font-semibold ">React Quizzer</h1>
      {/* Nav */}
      <nav
        className={`absolute bg-secondary-mid ${
          hamburger ? "top-[-1000%]" : "top-[60px]"
        } w-full left-0 z-[1] p-8 duration-500 md:left-auto md:w-auto shadow md:shadow-none md:top-0 md:relative md:bg-transparent md:p-0 md:z-[0]`}
      >
        <ul className="flex gap-8 text-white font-semibold text-xl flex-col md:flex-row">
          <li className="">Home</li>
          <li className="">Quiz</li>
          <li className="">Contact</li>
        </ul>
      </nav>
      {/* Hamburger */}
      <div className="md:hidden flex flex-col items-center justify-center">
        <div
          className={`flex duration-500  ${
            hamburger ? " block opacity-100 " : " hidden opacity-0 "
          } `}
          onClick={toggleNav}
        >
          <span className="block text-white font-bold text-2xl cursor-pointer md:hidden">
            &#9776;
          </span>
        </div>
        <div
          className={` duration-500 flex items-center justify-center w-full ${
            hamburger ? "hidden opacity-0 " : "block opacity-100 "
          }`}
          onClick={toggleNav}
        >
          <span className="text-4xl duration-500 flex items-center justify-center font-semibold">
            &times;
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
