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
mongoose.models = {};
const Question = mongoose.model("Questions", questionSchema);
export default Question;
