import express from "express";
const router = express.Router();


router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/admin/register_admin", (req, res) => {
  res.render("register_admin");
});

router.get("/director", (req, res) => {
  res.render("director");
});

router.get("/profesor", (req, res) => {
  res.render("profesor");
});

router.get("/estudiante", (req, res) => {
  res.render("estudiante");
});
export default router;