const express = require("express");
const { connectToMongoDb } = require("./service/connect.js");
const path = require("path");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter.js");
const userRoute = require("./routes/user.js");
const app = express("./middlewares/auth.js");
const PORT = 8001;
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth.js");
// const { restrictToLoginUserOnly, checkAuth } = require("./middlewares/auth.js");
const {} = require;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)
// app.get("/test", async (req, res) => {
//   const allURLs = await URL.find({});
//   return res.render("home", {
//     urls: allURLs,
//   });
// });
// app.use("/url", restrictToLoginUserOnly, urlRoute);
app.use("/url", restrictTo(['normal', 'admin']), urlRoute);
app.use("/user", userRoute);

app.use("/", staticRoute);
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
