import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//  Middleware
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//  Routes
app.use("/api", routes);

//  Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
