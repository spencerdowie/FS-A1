import express from "express";
import session from "express-session";
import path from "path";
import mongoose from "mongoose";
import "dotenv/config";

import gamesRouter from "./components/Games/routes.js";
import webRouter from "./components/Web/routes.js";
import userRouter from "./components/User/routes.js";
import router from "./components/routes.js";

const __dirname = import.meta.dirname;

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

await mongoose.connect(
  `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DBNAME}`,
  { maxPoolSize: 5, minPoolSize: 2 }
);

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//set up app to use sessions
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    name: "MyUniqueSessID",
    saveUninitialized: false,
    resave: false,
    cookie: {}
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(async (req, res, next) => {
  if (req.session.user) {
    app.locals.user = req.session.user;
  } else {
    app.locals.user = null;
  }
  next();
});

//PAGE ROUTES
app.use("/", gamesRouter);
app.use("/", webRouter);
app.use("/", userRouter);
app.use("/", router);

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
