const mongoose= require('mongoose')
const postSchema=new mongoose.Schema({
    image:{type:String},
    title:{type:String},
    description:{type:String},
    posted_at:{type:String}
})
const postModel=mongoose.model('post',postSchema)
module.exports={postModel}