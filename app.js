import "dotenv/config";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import cors from "cors";
import mongoose from "mongoose";                            // A6 3.1 Installing and connecting to MongoDB
import UserRoutes from "./users/routes.js";                 // A6 3.5
import session from "express-session";                      // A6 4.1

// A6: 5.2  - Reverse code since not working on Render and demo local version as per Atul Kumar
// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
// mongoose.connect(CONNECTION_STRING);

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");    // A6 3.1 Installing and connecting to MongoDB

const app = express();

// Update - A6 4.1
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
      // origin: "http://localhost:3000",
    })
);

// A6 4.1
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
app.use(
    session(sessionOptions)
);

app.use(express.json());


// A6 4.2 - Reverse code since not working on Render and demo local version as per Atul Kumar
// const sessionOptions = {
//   secret: "any string",
//   resave: false,
//   saveUninitialized: false,
// };
// if (process.env.NODE_ENV !== "development") {
//   sessionOptions.proxy = true;
//   sessionOptions.cookie = {
//     sameSite: "none",
//     secure: true,
//   };
// }
// app.use(session(sessionOptions));


const port = process.env.PORT || 4000;

UserRoutes(app);                                            // A6 3.5
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app);
HelloRoutes(app);

app.listen(process.env.PORT || 4000);