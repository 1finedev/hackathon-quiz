import mongoose from "mongoose";
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    whatsappName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
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

// set index on special fields to make lookup faster
userSchema.indexes({
  mobile: 1,
  passedTest: 1,
  suspended: 1,
  role: 1,
  testScore: 1,
  currentGroup: 1,
});

// run before a find action is performed
// userSchema.pre(/^find/, function () {
//   // this points to the current query
//   this.find({
//     suspended: {
//       $ne: true,
//     },
//   });
// });

// hash password before saving
userSchema.pre("save", async function () {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return;

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.confirmPassword = undefined;
});

// verify user password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

mongoose.models = {};
const User = mongoose.model("User", userSchema);
module.exports = User;
