import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      minlength: 13,
    },
    password: {
      type: String,
      required: true,
    },
    passwordConfirm: {
      type: String,
      required: true,
    },
    currentGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    suspended: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
    passedTest: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    testScore: {
      type: Array,
      default: [
        {
          react: 0,
          javascript: 0,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
