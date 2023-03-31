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
    project: {
      type: String,
      default: "🏥 Nigeria Medical Appointment System",
    },
    requirements: {
      type: [String],
      default: [
        "Project must be done using ReactJs or NextJs",
        "Project should be deployed and available live",
        "You can use additional libs if need be",
        "It is frontend heavy, so you can use dummy data for the backend",
        "App should be responsive on all devices",
        "App code should be on github",
        "The project is to be submitted in two weeks.",
      ],
    },
    description: {
      type: String,
      default:
        "This is a centralized medical appointment system for Nigeria, where users can book appointments with specialist physicians in the hospitals closest to them",
    },
    tasks: {
      type: [String],
      default: [
        "A landing page for the app,with CTA to signup or login, book an appointment, view all hospitals and view nearest verified pharmacies",
        "A signup & login page for users",
        "A profile page for users to view their appointments, edit their medical profile and view their medical history",
        "A page for users to book an appointment with a specialist physician, page will allow them choose their state, area, medical department, hospital, specialist physician, date and time of appointment",
        "Download a slip confirming their appointment details",
      ],
    },
    restrictions: {
      type: [String],
      default: [
        "Appointment time is 15 minutes, therefore, only 4 appointments can be booked per hour",
        "A user can opt to not choose a hospital, it can be suggested to the, they must choose a state, city, area and medical department first",
        "They must enter medical details like height, weight, blood group, allergies, etc on their medical history profile page",
        "Use your intuition to come up with more features and restrictions",
      ],
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

groupSchema.virtual("user", {
  ref: "User",
  localField: "members", // Of post collection
  foreignField: "_id", // Of user collection
  justOne: true,
});

mongoose.models = {};
const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
