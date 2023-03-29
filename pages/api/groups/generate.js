import connectToDb from "../../../backend/connectToDb";
import Quiz from "../../../backend/models/quizModel";
import Group from "../../../backend/models/groupModel";
import generate from "project-name-generator";

const handler = async (req, res) => {
  await connectToDb();

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
        user: "$user._id",
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
    {
      $match: {
        totalAttempted: { $gte: 40 },
      },
    },
    {
      $limit: 84,
    },
  ]);

  // calculate the length of each sub-array
  let divisionLength = Math.round(Overall.length / 4);

  // create an array of 4 empty arrays
  const sortedGroups = Array.from({ length: 4 }, () => []);

  Overall.forEach((item, index) => {
    const subArrayIndex = Math.floor(index / divisionLength);

    if (subArrayIndex >= 2) {
      // insert to the beginning the array
      sortedGroups[subArrayIndex].unshift(item);
    } else {
      // insert into end of array
      sortedGroups[subArrayIndex].push(item);
    }
  });

  const finalGroups = Array.from({ length: 21 }, () => []);

  // loop through the array of arrays and sort into groups of 4 users
  sortedGroups.forEach((group) => {
    group.forEach((user, index) => {
      finalGroups[index].push(user);
    });
  });

  let timeout = 0;
  finalGroups.forEach((group) => {
    setTimeout(async () => {
      Group.create({
        name: generate({ words: 2, alliterative: true }).dashed,
        members: group,
      });
    }, timeout);
    timeout += 1000;
  });

  return res.status(200).json({ finalGroups });
};

export default handler;
