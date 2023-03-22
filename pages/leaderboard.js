import React, { useState } from "react";

export default function LeaderBoard() {
  // Sample Data to be replaced by actual results
  const [sampleData, setSampleData] = useState([])
  const [type, setType] = useState("")
  function displayLeaderboard(type) {
    setType(type)
    // Sample Data gotten from API call
    setSampleData([{
      name: "Glory",
      pointsJS: 20,
      pointsReact: 20
    }, 
    {
      name: "Gideon",
      pointsJS: 16,
      pointsReact: 20
    },
    {
      name: "Peng",
      pointsJS: 18,
      pointsReact: 16
    }, 
    {
      name: "Madflows",
      pointsJS: 16,
      pointsReact: 16
    }, 
    {
      name: "Olamide",
      pointsJS: 14,
      pointsReact: 16
    },
    {
      name: "Meemah",
      pointsJS: 15,
      pointsReact: 15
    },
    {
      name: "Joshua",
      pointsJS: 15,
      pointsReact: 15
    }, 
    {
      name: "Paul",
      pointsJS: 14,
      pointsReact: 14
    }])
    // Set Points based on user Input
    if (type === "JavaScript") {
      setSampleData(prevData => prevData.map(user => ({ ...user, points: user.pointsJS })).sort((a, b) => b.points - a.points));
    } else if (type === "React") {
      setSampleData(prevData => prevData.map(user => ({ ...user, points: user.pointsReact })).sort((a, b) => b.points - a.points));
    } else {
      setSampleData(prevData => prevData.map(user => ({ ...user, points: (user.pointsJS + user.pointsReact) / 2 })).sort((a, b) => b.points - a.points));
    }
  }
  return (
    <div>
      <div className="text-center">
        <h4 className="font-semibold text-4xl lg:text-5xl mb-2">Leaderboard🏆</h4>
        <p className="text-[#C9C9C9] mb-2">Rankings of all Registered Users</p>
      </div>
      <div className="mx-4 w-[95vw] md:w-[30rem]">
        <div className="bg-[#06BA6B] grid grid-cols-3">
        {["Overall", "JavaScript", "React"].map(name => {
            return <button 
              className={`text-center text-lg font-semibold py-4 hover:bg-[#018a51] ${type === name && "bg-[#005c36]"}`} 
              onClick={() => displayLeaderboard(name)}>{name}
            </button>
          })}
        </div>
        {(sampleData.length > 0) ? <div className="mb-10">
          {sampleData.map((user, index) => {
          const no = index + 1
          return (<div key={no}>
            <div className="flex justify-between py-5 bg-[#202020] px-5">
              <div className="flex">
                <span className={
                `${no === 1 && "bg-[#FFCA28] text-black" || no === 2 && "bg-[#CDCDCD] text-black" || no === 3 && "bg-[#975E4C]"} 
                py-1 text-center w-8 rounded-full font-bold`}>{no}.</span>
                <h4 className="my-auto ml-3 font-semibold">{user.name}</h4>
              </div>
              <h4 className="my-auto font-semibold">{user.points} pts</h4>
            </div>
            <hr className="bg-[#808080]" />
          </div>)
          })}
        </div>: <div className="bg-[#202020] flex items-center justify-center h-48">
          <span className="font-bold text-xl">Nothing to show here</span>
        </div>
        }
      </div>
    </div>
  )
}