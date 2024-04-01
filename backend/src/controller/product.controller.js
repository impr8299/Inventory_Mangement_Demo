const asyncHandler = require("../utils/handlerAsync.js");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const { errorResponse } = require("../utils/errorResponse.js");
const Product = require("../model/product.model.js");

const addProduct = asyncHandler(async (req, res) => {
  console.log(req.body, "BODY++++++++++");

  try {
    console.log("dsd");
    const { name, description, price, stock, category, status } = req.body;
    console.log(category, "cat");
    if ([name, price, category].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      status,
    });

    await newProduct.save();
    // console.log(newProduct, "product")

    const createdProduct = await Product.findById(newProduct._id);

    if (!createdProduct) {
      throw new ApiError(500, "Something went wrong while adding the product");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdProduct, "Product add successfully"));
  } catch (error) {
    errorResponse({ res, ...error });
    console.log("ERRORORR", error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  console.log(req.body, "req");

  try {
    const updateFields = req.body;
 console.log(updateFields, "updateFields")
    const updateObject = {};
    for (let key in updateFields) {
      if (updateFields.hasOwnProperty(key)) {
        updateObject[key] = updateFields[key];
      }
    }
    const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: updateFields._id,
        },
        {
          $set: updateObject,
        },
        { new: true }
      );

    if (!updatedProduct) {
      return res.status(404).json(new ApiError(404, null, "Product not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedProduct, "Product updated successfully")
      );
  } catch (error) {
    errorResponse(res, ...error);
  }
});

const viewProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id, "Id");

  const productDetails = await Product.findById(id);
  return res
    .status(200)
    .json(new ApiResponse(200, productDetails, "Product fetch Successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  console.log(req.body, "++++++++++++++++++");
  const { id } = req.body;
  const deleteProduct = await Product.findByIdAndDelete(id);

  res.status(200).json(new ApiResponse(200, {}, "Product delete successfully"));
});

const fetchAllProduct = asyncHandler(async (req, res) => {
    console.log(req.body, "+++++++++++")
  try {
    const { email } = req.user;
    const { page, perPage } = req.body;
    const startIndex = (page - 1) * perPage;
 
    if (!email) {
      throw new ApiError(401, "invalid user");
    }

    const totalCount = await Product.countDocuments();
    const productList = await Product.find({})
      .skip(startIndex)
      .limit(perPage)
      .populate("category");

    return res
      .status(200)
      .json(
        new ApiResponse(200, {
            data: productList,
            totalItems: totalCount  
        } , "All Products fetch successfully")
      );
  } catch (error) {
    errorResponse(res, ...error);
  }
});

module.exports = {
  addProduct,
  fetchAllProduct,
  updateProduct,
  deleteProduct,
  viewProduct,
};
