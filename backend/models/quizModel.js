import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    default: Date.now,
  },
  totalAttempted: {
    type: Number,
    default: 0,
  },
});

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
