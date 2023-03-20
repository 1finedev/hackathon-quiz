import React from "react";
import Link from "next/link";

const Footer = ({ className }) => {
  return (
    <footer className="bg-secondary-mid font-semibold">
      <div className="container mx-auto py-4 px-5 grid grid-cols-1 ">
        <ul className="text-lg text-center mb-5 gap-3 text-white self-center justify-self-center list-none">
          <Link href="/">
            <li className="my-2">Home</li>
          </Link>
          <Link href="/sign-in">
            <li className="my-2">Quiz</li>
          </Link>
          <Link href="https://chat.whatsapp.com/HlIjg2kPxIOAOyG1Sbcm9H">
            <li className="my-2">Contact</li>
          </Link>
        </ul>
        <p className="text-lg text-white mb-3 self-center justify-self-center sm:self-start sm:justify-self-center">
          React Quizzer
        </p>
        <p className="text-lg text-white  self-center justify-self-center sm:self-end sm:justify-self-center">
          &copy; 2023 All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
