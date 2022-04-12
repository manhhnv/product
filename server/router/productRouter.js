const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

const Product = require("../model/ProductModel");
const User = require("../model/UserModel");
const upload = require("./uploadRouter");

//@router GET api/products
//@des  Ficth all product
//@access public

router.get("/", async (req, res) => {
  try {
    const all = await Product.find({});
    res.json({ success: true, message: "ok", all });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: true, message: "Error server" });
  }
});

//@router GET api/products/hot
//@des  get hot product
//@access public

router.get("/hot", async (req, res) => {
  try {
    const keyword = req.query.keyword ? {
      category : req.query.keyword,
    } : {};

    const count = await Product.countDocuments({...keyword})

    const number = req.query.num ? req.query.num : count;
 
    const products = await Product.find({...keyword}).sort({rating : -1}).limit(number);
    res.json({ success: true, message: "ok", products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: true, message: "Error server" });
  }
});

//@router POST api/products
//@des create a new product
//@access private /admin

router.post("/", protect, upload.single("image"), async (req, res) => {
  const {
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    numReviews,
  } = req.body;
  try {
    const admin = await User.findById(req.userId);
    if (admin && admin.isAdmin) {
      const newProduct = new Product({
        name,
        image: `uploads/${req.file.filename}`,
        brand,
        category,
        description,
        price,
        countInStock,
        numReviews : numReviews || 0 ,
        user: req.userId,
      });

      //`upload/${req.file.filename}`

      await newProduct.save();

      return res.json({
        success: true,
        message: "Created product",
        product: newProduct,
      });
    }

    return res
      .status(404)
      .json({ success: false, message: "Not authorized as an admin" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

//@router POST api/products
//@des upgrade a product
//@access private /admin

router.put("/:id", protect, async (req, res) => {
  const {
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    numReviews,
  } = req.body;

  try {
    const admin = await User.findById(req.userId);
    if (admin && admin.isAdmin) {
      let updateProduct = {
        name,
        brand,
        category,
        description,
        price,
        countInStock,
        numReviews,
      };

      const updateProdCondition = { _id: req.params.id, user: req.userId };

      updateProduct = await Product.findOneAndUpdate(
        updateProdCondition,
        updateProduct,
        { new: true }
      );

      if (!updateProduct)
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });

      return res.json({
        success: true,
        message: "Update Product Successful",
        product: updateProduct,
      });
    }

    return res
      .status(404)
      .json({ success: false, message: "Not authorized as an admin" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

//@router Delete api/products
//@des admin delete  a product
//@access private/ admin

router.delete("/:id", protect, async (req, res) => {
  try {
    const admin = await User.findById(req.userId);
    if (admin && admin.isAdmin) {
      const deleteProdCondition = { _id: req.params.id, user: req.userId };

      const deleteProduct = await Product.findByIdAndDelete(deleteProdCondition);

      if (!deleteProduct)
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });

      return res.json({
        success: true,
        message: "Delete Product Successful",
        product: deleteProduct,
      });
    }

    return res
      .status(404)
      .json({ success: false, message: "Not authorized as an admin" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

//@route GET api/products/top
//@des get top 5 product to rating
//@access private

router.get('/top', protect, async (req, res) => {
  try {
    const products = await Product.find({}).sort({rating : -1}).limit(6);

    res.json({success : true, products})

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

//@route Post api/products/:id/review
//@des create a review product
//@access private 

router.post('/:id/review', protect, async(req, res) => {
  const {rating, comment} = req.body;

  try {
    const product = await Product.findById(req.params.id);

    const _user = await User.findById(req.userId);

    if(product) {
      const alreadyReviews = product.review.find(r => r.user === req.userId);

      if(alreadyReviews) 
        return  res.status(402).json({success : false, message : 'You already review product'});

      const _review = {
        name : _user.username,
        rating,
        comment,
        user : _user._id,
      };

      product.review.push(_review);

      product.numReviews = product.review.length;

      product.rating = product.review.reduce((result, item) => result + item.rating,0)/ product.numReviews;

      await product.save();

      return res.json({success : true, product});

    }else{
      return res.status(404).json({success : false, message : "Product not found"});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

//@route GET api/products/:id
//@des get product by id
//@access private

router.get('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findOne({_id : req.params.id});

    if(!product) {
      return res.status(404).json({success : false, message : 'Product not found'})
    };

    res.json({success : true, product});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

module.exports = router;
