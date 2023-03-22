import React, { useEffect, useState } from "react";
import connectToDb from "../backend/connectToDb";
import Quiz from "../backend/models/quizModel";

// get static props
export async function getStaticProps() {
  await connectToDb();

  const categoriesResult = await Quiz.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $group: {
        _id: "$category",
        users: {
          $push: {
            user: "$user",
            totalCorrect: "$totalCorrect",
            totalAttempted: "$totalAttempted",
            percentage: {
              $multiply: [
                { $divide: ["$totalCorrect", "$totalAttempted"] },
                100,
              ],
            },
          },
        },
      },
    },
    {
      $unwind: "$users",
    },
    {
      $sort: {
        "users.percentage": -1,
      },
    },
    {
      $group: {
        _id: "$_id",
        users: {
          $push: "$users",
        },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        users: 1,
      },
    },
  ]);

  const Overall = await Quiz.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $group: {
        _id: "$user",
        totalCorrect: { $sum: "$totalCorrect" },
        totalAttempted: { $sum: "$totalAttempted" },
        user: { $first: "$user" },
      },
    },
    {
      $project: {
        _id: 0,
        totalCorrect: 1,
        totalAttempted: 1,
        user: 1,
        percentage: {
          $multiply: [{ $divide: ["$totalCorrect", "$totalAttempted"] }, 100],
        },
      },
    },
    {
      $sort: {
        percentage: -1,
      },
    },
  ]);

  const data = {
    Overall,
    categoriesResult,
  };

  return {
    props: { data: JSON.parse(JSON.stringify(data)) }, // nextjs serialization issue
    revalidate: 10, // Regenerate list every minute
  };
}

export default function LeaderBoard({ data }) {
  const [leaderboard, setLeaderboard] = useState();
  const [selected, setSelected] = useState("Overall");

  useEffect(() => {
    //  update leaderboard state based on selected type
    if (data) {
      if (selected === "Overall") {
        setLeaderboard(data[selected]);
      } else {
        const findResultIndex = data.categoriesResult.findIndex(
          (item) => item.category === selected
        );
        setLeaderboard(data.categoriesResult[findResultIndex].users);
      }
    }
  }, [selected, data]);

  return (
    <div>
      <div className="text-center">
        <h4 className="mb-2 text-4xl font-semibold lg:text-5xl">
          Leaderboard 🏆
        </h4>
        <p className="text-[#C9C9C9] mb-2">Rankings of all Registered Users</p>
      </div>
      <div className="mx-4 w-[95vw] md:w-[30rem]">
        <div className="bg-[#06BA6B] grid grid-cols-3">
          {["Overall", "JavaScript", "React"].map((name) => {
            return (
              <button
                key={name}
                className={`text-center text-lg font-semibold py-4 hover:bg-[#018a51] ${
                  selected === name && "bg-[#005c36]"
                }`}
                onClick={() => setSelected(name)}
              >
                {name}
              </button>
            );
          })}
        </div>
        {leaderboard ? (
          <div className="mb-10">
            {leaderboard.map((user, index) => {
              const no = index + 1;
              return (
                <div key={no}>
                  <div className="flex justify-between py-5 bg-[#202020] px-5">
                    <div className="flex">
                      <span
                        className={`${
                          (no === 1 && "bg-[#FFCA28] text-black") ||
                          (no === 2 && "bg-[#CDCDCD] text-black") ||
                          (no === 3 && "bg-[#975E4C]")
                        } 
                py-1 text-center w-8 rounded-full font-bold`}
                      >
                        {no}
                      </span>
                      <h4 className="my-auto ml-3 font-semibold">
                        {user.user?.whatsappName?.replace("@", "")}
                      </h4>
                    </div>
                    <h4 className="my-auto font-semibold">
                      {user.totalCorrect} / {user.totalAttempted} (
                      {user.percentage.toFixed(0)}%)
                    </h4>
                  </div>
                  <hr className="bg-[#808080]" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#202020] flex items-center justify-center h-48">
            <span className="text-xl font-bold">Nothing to show here</span>
          </div>
        )}
      </div>
    </div>
  );
}
