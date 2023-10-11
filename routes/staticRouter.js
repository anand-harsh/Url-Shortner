const express = require("express");
const URL = require("../models/url.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const allurls = await URL.find({});
  return res.render("home", {
    urls: allurls,
  });
});
// return res.render("home")

router.get("/signup", (req, res) => {
  return res.render("signup");
});
module.exports = router;
