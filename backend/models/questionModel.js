import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: [],
      required: true,
    },
    answer: {
      type: String,
      required: true,
      select: false,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Questions =
  mongoose.models.Questions || mongoose.model("Questions", questionSchema);
export default Questions;
