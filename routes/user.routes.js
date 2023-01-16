const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../models/data");

postRouter.get("/", async (req, res) => {
  const { device } = req.body;
  const query = {};
  try {
    const posts = await PostModel.find(query);
    res.send(posts);
  } catch (error) {
    res.send({ msg: "spmething went wrong" });
    res.send(error);
  }
});

postRouter.post("/create", async (req, res) => {
  const paylode = req.body;
  try {
    const post_new = new PostModel(paylode);
    await post_new.save();
    res.send({ msg: "Post was added" });
  } catch (error) {
    res.send(error);
    res.send({ msg: "Something went wrong" });
  }
});
postRouter.delete("/delete/:postId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
  const post = await PostModel.findOne({ _id: postId });
  if (userId !== post.userId) {
    res.send({ msg: "Not Authorize" });
  } else {
    try {
      await PostModel.findByIdAndDelete({ _id: postId });
      req.send({ msg: "Post is deleted" });
    } catch (error) {
      res.send({ msg: "something went wrong" });
      res.send(error);
    }
  }
});
postRouter.patch("/update/:postId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
  const payload = req.body;
  const post = await TodoModel.findOne({ _id: postId });
  if (userId !== post.userId) {
    res.send({ msg: "Not Authorised" });
  } else {
    try {
      await TodoModel.findByIdAndUpdate({ _id: postId }, payload);
      res.send({ msg: "post is updated" });
    } catch (err) {
      console.log(err);
      res.send({ msg: "something went wrong" });
    }
  }
});
module.exports = {
  postRouter,
};
// "email":"vv@gmail.com",

// "password":"123"
