import React from "react";

const Footer = ({ className }) => {
  return (
    <footer className="bg-secondary-mid font-semibold">
      <div class="container mx-auto py-4 px-5 grid grid-cols-1 ">
        <ul class="text-lg text-center mb-5 gap-3 text-white self-center justify-self-center list-none">
          <li class="my-2">
            <a href="#">Home</a>
          </li>
          <li class="my-2">
            <a href="#">Quiz</a>
          </li>
          <li class="my-2">
            <a href="#">Contact</a>
          </li>
        </ul>
        <p class="text-lg text-white mb-3 self-center justify-self-center sm:self-start sm:justify-self-center">
          React Quizzer
        </p>
        <p class="text-lg text-white  self-center justify-self-center sm:self-end sm:justify-self-center">
          &copy; 2023 All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
