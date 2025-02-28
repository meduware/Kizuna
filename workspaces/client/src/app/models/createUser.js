import mongoose, { Schema } from "mongoose";

const userInformationSchema = new Schema({
  image: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const userInformation =
  mongoose.models.userInformation ||
  mongoose.model("userInformation", userInformationSchema);

export default userInformation;
