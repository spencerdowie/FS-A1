import userModel from "./model.js";

//controller function for GET user page
const getUser = async (req, res) => {
  //console.log(req.session);
  if (req.session.user) {
    //render user page
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
};
//controller function for GET login page
const loginForm = (req, res) => {
  //render login page
  res.render("login");
};
//controller function for POST login form
const login = async (req, res) => {
  //authenticate user and redirect to /user
  let auth = await userModel.authenticateUser(req.body.u, req.body.pw);
  console.log(auth);
  if (auth) {
    //if authenticated, set session variables
    req.session.loggedIn = true;
    req.session.user = req.body.u;
    console.log(req.session);
    //now redirect to /user
    res.redirect("/admin");
  } else {
    res.render("index", { err: "User not found" });
  }
};
//controller function for GET logout path
const logout = (req, res) => {
  //destroy session and redirect to home
  req.session.destroy();
  res.redirect("/");
};
//controller function for GET register page
const registerForm = (req, res) => {
  res.render("register");
};
//controller function for POST register form
const register = async (req, res) => {
  //get values from form and create new user
  let result = await userModel.addUser(req.body.u, req.body.pw);
  console.log(`result: ${result}`);
  if (result) {
    res.redirect("/login");
  } else {
    res.render("register", { err: "Username already exists" });
  }
};

export default {
  getUser,
  loginForm,
  login,
  logout,
  registerForm,
  register
};
