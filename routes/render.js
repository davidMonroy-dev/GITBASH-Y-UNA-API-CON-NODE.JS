import express from "express";
const router = express.Router();


router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/update", (req, res) => {
  res.render("update")
})

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profesor", (req, res) => {
  res.render("profesor");
});

router.get("/estudiante", (req, res) => {
  res.render("estudiante");
});
export default router;