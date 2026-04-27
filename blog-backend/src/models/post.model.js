const mongoose= require('mongoose')
const postSchema = new mongoose.Schema({
  image: {type:String},
  title: {type:String},
  description: {type:String},
  category:{type:String},
  posted_by: {type:String}
}, { timestamps: true }); 
const postModel=mongoose.model('post',postSchema)
module.exports={postModel}