const  {postModel} = require('../models/post.model');

const post = async (req, res) => {
  try {
    const postdata = req.body;

    if (req.file) {
      postdata.image = req.file.filename; // ✅ match schema
    }

    const savedPost = new postModel(postdata);
    await savedPost.save(); // ✅ correct variable

    res.status(201).send({
      message: "Post submitted successfully",
      data: savedPost,
    });
  } catch (err) {
    console.error("Error submitting post:", err);
    res.status(500).send({ message: "Post submission error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find().sort({ _id: -1 });
    res.status(200).send({ data: posts });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).send("Error retrieving posts");
  }
};
const getPostById = async (req, res) => {
  try {
   const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ data: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  post,
  getAllPosts,getPostById
};