import Quiz from "../../../backend/models/quizModel";
import connectToDb from "../../../backend/connectToDb";

const handler = async (req, res) => {
  if (req.method === "GET") {
    await connectToDb();

    const categoriesResult = await Quiz.aggregate([
      {
        $match: {
          //   totalAttempted: { $gte: 20 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
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
      {
        $match: {
          //   totalAttempted: { $gte: 40 },
        },
      },
    ]);

    const results = {
      Overall,
      categoriesResult,
    };

    res.status(200).json({ results });
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
};

export default handler;
