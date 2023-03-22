import React from "react";

export default function LeaderBoard() {
  return (
    <div>
      <div className="text-center">
        <h4 className="font-semibold text-4xl lg:text-5xl mb-2">Leaderboard🏆</h4>
        <p className="text-[#C9C9C9] mb-2">Rankings of all Registered Users</p>
      </div>
      <div className="mx-4 w-[95vw] md:w-[30rem]">
        <div className="bg-[#06BA6B] grid grid-cols-3">
          <button className="text-center text-lg font-semibold py-4 hover:bg-[#018a51]">Overall</button>
          <button className="text-center text-lg font-semibold py-4 hover:bg-[#018a51]">Javascript</button>
          <button className="text-center text-lg font-semibold py-4 hover:bg-[#018a51]">React</button>
        </div>
        <div>
          <div className="flex justify-between py-5 bg-[#202020] px-5">
            <div className="flex">
              <span className="bg-[#FFCA28] py-0.5 px-1.5 rounded-full font-semibold">1.</span>
              <h4 className="my-auto ml-3 font-semibold">Glory</h4>
            </div>
            <h4 className="my-auto font-semibold">20pts</h4>
          </div>
          <hr className="bg-[#808080]" />
        </div>
      </div>
    </div>
  )
}