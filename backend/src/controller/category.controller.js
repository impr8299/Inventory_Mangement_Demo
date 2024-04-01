const asyncHandler = require("../utils/handlerAsync.js");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const { errorResponse } = require("../utils/errorResponse.js");
const Category = require("../model/category.model.js");


const addCategory = asyncHandler(async (req, res) => {
    try {
      const { name } = req.body;
  
      if (!name) {
          
        throw new ApiError(401, "Categoty field are required");
      }
  
      const product = await Category.create({
        name
      });
  
      return res
        .status(201)
        .json(new ApiResponse(201, product, "Category add successfully"));
    } catch (error) {
      errorResponse({ res, ...error });
    }
  });


  const updateCategory = asyncHandler(async (req, res) => {
    console.log(req, "req");
  
    try {
      const { name, updated_name } = req.body;
      const updatedCategory = await Category.findOneAndUpdate(
        {
          name: name,
        },
        {
          $set: {
            name: updated_name,
          },
        },
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json(new ApiError(404, null, "Category not found"));
      }
  
      return res
        .status(200)
        .json(
          new ApiResponse(200, updatedCategory, "Category updated successfully")
        );
    } catch (error) {
      errorResponse(res, ...error);
    }
  });


const deleteCategory = asyncHandler(async (req, res)=>{

    const {id} = req.body
    const deleteCategory = await Category.findByIdAndDelete(id)

    res.
    status(200)
    .json(
     new ApiResponse (
        200,
        {},
        "Category delete successfully"
     )
    )

})

const fetchAllCategory = asyncHandler(async (req, res) => {
    try {
      const { email } = req.user;
      const { page, perpage } = req.body;
      const startIndex = (page - 1) * perpage;
  
      if (!email) {
        throw new ApiError(401, "invalid user");
      }
      const categoryList = await Category.find({}).skip(startIndex).limit(perpage);
  
      return res
        .status(200)
        .json(
          new ApiResponse(200, categoryList, "All Category fetch successfully")
        );
    } catch (error) {
      errorResponse(res, ...error);
    }
  });



module.exports = { addCategory, fetchAllCategory, updateCategory, deleteCategory };