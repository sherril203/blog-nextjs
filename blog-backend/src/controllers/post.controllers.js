const  {postModel} = require('../models/post.model');
const mongoose=require('mongoose')
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
    const { id } = req.params;

    console.log("POST ID:", id);

    // ✅ validate mongodb id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid post id",
      });
    }

    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      data: post,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


const updateposts = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.filename;
    }

   const updated = await postModel.findByIdAndUpdate(
  id,
  { $set: updateData },   
  { new: true }
);

    if (!updated) {
      return res.status(404).send({ message: "Post not found" });
    }

    return res.status(200).send({
      message: "Post updated successfully",
      data: updated,
    });

  } catch (err) {
    console.error("Error updating post:", err);
    return res.status(500).send({ message: "Error updating post" });
  }
};



const deletePosts=async(req,res)=>{
  try{
    const id=req.params.id
    const deletedata=await postModel.findByIdAndDelete(id)
    return res.status(200).send({message:"data deleted"})
  }
  catch(err){
    return res.status(500).send({message:"data error"})
  }
}

module.exports = {
  post,
  getAllPosts,getPostById,deletePosts,updateposts

};