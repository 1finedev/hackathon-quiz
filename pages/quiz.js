import React from "react";

const quiz = () => {
  return (
    <div className="w-full h-full xl:flex bg-[101010] px-6 xl:px-0">
      <div className="bg-[#101010] flex items-center justify-center basis-1/2 lg:basis-[55%] pt-14 pb-11">
        <div className="w-full max-w-[664px] space-y-14">
          <div className="text-xl lg:text-3xl flex items-center justify-between w-full">
            <h1>Question 1/15</h1>
            <div className="flex items-center gap-3">
              <svg
                className="w-8 h-8 bg-white rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
              </svg>
              <h1>00:30</h1>
            </div>
          </div>

          <p className="text-sm lg:text-lg text-[#C9C9C9]">
            In this following sections, we will test your knowledge on certain
            web technologies, please select the Language you would like to pick
            first.
          </p>

          <div className="bg-[#1E2D3D] border border-[#1E2D3D] w-full h-[344px] md:h-[216px] rounded-lg overflow-hidden p-6">
            <div className="w-full h-full"></div>
          </div>
        </div>
      </div>

      <div className="xl:bg-[#06BA6B] flex items-center justify-center basis-1/2 lg:basis-[45%] py-10 border-t-2 border-double border-[#06BA6B] xl:border-none">
        <div className="w-full xl:w-4/5 md:w-fit space-y-6 lg:space-y-16">
          <h1 className="text-xl lg:text-3xl">Select your answer</h1>

          <form className="relative">
            <div className="space-x-5 py-4">
              <input type="radio" value="" />
              <label>A. The answer for A goes here</label>
            </div>

            <div className="space-x-5 py-4">
              <input type="radio" value="" />
              <label>B. The answer for B goes here</label>
            </div>

            <div className="space-x-5 py-4">
              <input type="radio" value="" />
              <label>C. The answer for C goes here</label>
            </div>

            <div className="space-x-5 py-4">
              <input type="radio" value="" />
              <label>D. The answer for D goes here</label>
            </div>

            <button className="w-full h-[60px] max-w-[365px] rounded-lg bg-white text-xl text-[#011221] font-bold mt-10">
              Submit Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default quiz;
