// const baseUrl = process.env.REACT_APP_API_URL

const baseUrl = "http://localhost:5000/"

const HttpService = {
    Register: baseUrl + 'api/users/register',
    Login: baseUrl + 'api/users/login',
    Logout : baseUrl + 'api/users/logout',
    AddProduct : baseUrl + "api/product/addproduct",
    ProductList : baseUrl + "api/product/productlist",
    EditProduct :baseUrl + "api/product/editproduct",
    ViewProduct :baseUrl + "api/product/viewproduct",
    DeleteProduct : baseUrl + "api/product/deleteproduct",
    AddCategory : baseUrl + "api/category/addcategory",
    FetchCategories :baseUrl + "api/category/categorylist",
    EditCategory :baseUrl + "api/category/editcategory"
    
};

export default HttpService;
