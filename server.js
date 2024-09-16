import express, { json, urlencoded, static as expressStatic } from "express";
import session from "express-session";
import flash from "connect-flash";
import methodOverride from "method-override";
import routes from "./utils/utils.js"
import { fileURLToPath } from 'url';
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json()); // transformr a json a req.body
app.use(urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "frontend", "views",));
app.disable('x-powered-by');

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

routes(app);

app.listen(3000, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});