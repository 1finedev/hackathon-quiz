import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    startTime: {
      type: Date,
      default: Date.now,
    },
    questionsAttempted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions",
      },
    ],
    totalCorrect: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ["Javascript", "React"],
      required: true,
    },
    nextQuestionEndsIn: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalAttempted: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};
const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
