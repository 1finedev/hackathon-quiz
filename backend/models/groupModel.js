import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    projectUrl: {
      type: String,
    },
    deployedUrl: {
      type: String,
    },
    scores: [
      {
        ux: {
          type: Number,
          default: 0,
          max: 10,
        },
        ui: {
          type: Number,
          default: 0,
          max: 10,
        },
        responsiveness: {
          type: Number,
          default: 0,
          max: 10,
        },
        functionality: {
          type: Number,
          default: 0,
          max: 10,
        },
        technology: {
          type: Number,
          default: 0,
          max: 10,
        },
        rules: {
          type: Number,
          default: 0,
          max: 10,
        },
        extraCredit: {
          type: Number,
          default: 0,
          max: 10,
        },
        teamwork: {
          type: Number,
          default: 0,
          max: 10,
        },
        codeQuality: {
          type: Number,
          default: 0,
          max: 10,
        },
        presentation: {
          type: Number,
          default: 0,
          max: 10,
        },
      },
    ],
  },
  { timestamps: true }
);
mongoose.models = {};
const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
