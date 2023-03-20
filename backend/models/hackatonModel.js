import mongoose from "mongoose";

const hackatonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
  },
  { timestamps: true }
);

const Hackaton = mongoose.models.Hackaton ||  mongoose.model("Hackaton", hackatonSchema);
module.exports = Hackaton;
