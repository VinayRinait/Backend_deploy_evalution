const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { registerRouter } = require("./routes/register.routes");
const { postRouter } = require("./routes/user.routes");
const { authentication } = require("./authentication/authentication");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("welcome to social media app ");
});
app.use("/users", registerRouter);
app.use(authentication);
app.use("/posts", postRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log(`running on port ${process.env.port}`);
});
