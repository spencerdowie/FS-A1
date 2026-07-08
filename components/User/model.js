import mongoose from "mongoose";
import { scryptSync } from "crypto";

const UserSchema = new mongoose.Schema({
  user: String,
  password: String
});
const User = mongoose.model("User", UserSchema);

async function initializeUsers() {
  await User.insertOne({
    user: "root",
    password:
      "CDZ5xxNMF8jrxYYWE7gJT+ZiCPxpKf+mdCavbbmN0z/FdBVH67CD5G49EFwbOSTXMNuyq+tqsF9EjqaW6pTGbQ=="
  });
}

async function authenticateUser(username, pw) {
  let key = scryptSync(pw, process.env.SALT, 64);
  //check for existing user with matching hashed password
  console.log(key.toString("base64"));
  let result = await User.findOne({
    user: username,
    password: key.toString("base64")
  });
  return result ? true : false;
}
async function getUser(username) {
  //just check if username exists already
  let result = await User.findOne({ user: username });
  /* if (result) {
    return result;
  }
  return false; */
  return result ? result : false;
}
async function addUser(username, pw) {
  //add user if username doesn't exist
  let user = await getUser(username);
  console.log(user);
  if (!user) {
    let key = scryptSync(pw, process.env.SALT, 64);
    let newUser = new User({
      user: username,
      password: key.toString("base64")
    });
    let result = await newUser.save();
    return result === newUser ? true : false;
  } else {
    return false;
  }
}

export default {
  authenticateUser,
  getUser,
  addUser,
  initializeUsers
};
