import express, { json, urlencoded, static as expressStatic, Router } from "express";
import session from "express-session";
import 'dotenv/config';
import flash from "connect-flash";
import render from "./routes/render.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json()); // transformr a json a req.body
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", join(__dirname, "frontend", "views",));
app.disable('x-powered-by');

app.use(urlencoded({ extended: false }));
app.use(expressStatic(join(__dirname, 'frontend', 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(json());

app.use("/", render);
app.use("/", authRoutes);


app.listen(3000, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});