const postModel=require('../models/post.model')
const post = async (req, res) => {
  try {
    const postdata = req.body;

    if (req.file) {
      postdata.product_img = req.file.filename;
    }

    const savedPost = new postModel(postdata);
    await savedProduct.save();

    res.status(201).send({
      message: "Product submitted successfully",
      data: savedProduct, 
    });
  } catch (err) {
    console.error("Error submitting product:", err);
    res.status(500).send({ message: "Product submission error" });
  }
};


const getcategory = async (req, res) => {
  try {
    const categoryName = req.params.category; // e.g., 'bags'
    const showcategory = await categoryModel.find({ category: categoryName }).sort({ _id: 1 });
    res.status(200).send({ data: showcategory });
  } catch (err) {
    console.error("Error in get data:", err);
    res.status(500).send("Error retrieving products category");
  }
};

module.exports = {
  postCategory,
  getcategory,
  getproductsById 

};