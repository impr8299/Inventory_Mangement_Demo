import React, { useState, useEffect } from 'react';
import '../../../style/app.css';
import { productValidate } from "../../../utils/validate"
import { api } from '../../../utils/api';
import HttpService from '../../../utils/httpsServices';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate , useParams } from 'react-router-dom';

const AddProduct = () => {
    const params = useParams();
    console.log(params, "params")
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: "",
    stock: "",
    category: '',
    status: 0
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [categories, setCategories] = useState([]);
 const navigate = useNavigate()



 console.log(formData, "formData")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = productValidate(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {

        if(params.id){
            try {
                const response = await  api.post(HttpService.EditProduct, formData);
                console.log(response, "EDITresponse")
                if (response.status === 200) {
                  toast.success(response?.data?.message)
                
                  setTimeout(() => {
                    navigate("/dashboard");
                  }, 1000);
                
                } else {
                  toast.error(response.data.errMsg);
                }
              } catch (error) {
                toast.error(error?.response?.data?.errMsg);   
              }
        } else{
        try {
            const response = await  api.post(HttpService.AddProduct, formData);
           
            if (response.status === 201) {
              toast.success(response?.data?.message)
            
              setTimeout(() => {
                navigate("/dashboard");
              }, 1000);
              setFormData({
                name: '',
                description: '',
                price: "",
                stock: "",
                category: '',
                status: 0
              });
            } else {
              toast.error(response.data.errMsg);
            }
          } catch (error) {
            toast.error(error?.response?.data?.errMsg);   
          }
        }
    }
    
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {

    }
  }, [formErrors]);

  useEffect(() => {
    
    if (params.id) {
      const fetchProduct= async () => {
        try {
            const response = await  api.post(HttpService.ViewProduct, {id:params.id});

                console.log(response, "resEDIT")
          const { name, description, price, stock, category, status, _id } = response?.data?.data;
          setFormData({...formData, _id, name, description, price, stock, category, status });
        } catch (error) {
          toast.error(error.response?.data?.errMsg);
        }
      };

      fetchProduct();
    }
  }, [params.id]);


  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const response = await api.get(HttpService.FetchCategories);
        
        setCategories(response?.data?.data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
    <ToastContainer/>
      <h4 style={{marginTop:"15px"}}>{params.id ? 'Edit Product' : 'Add Product'}</h4>
      <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active" aria-current="page">{params.id ? 'Edit Product' : 'Add Product'}</li>
              </ol>
              </nav>
              <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name" className='des'>Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
             
          />
          <p>{formErrors.name}</p>
        </div>
        <div className="form-group">
          <label htmlFor="description" className='des'>Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
             
          />
          <p>{formErrors.description}</p>
        </div>
        <div className="form-group">
          <label htmlFor="price" className='des'>Price</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
             
          />
          <p>{formErrors.price}</p>
        </div>
        <div className="form-group">
          <label htmlFor="stock" className='des'>Stock</label>
          <input 
          type='number'
            id="stock" 
            name="stock" 
            value={formData.stock} 
            onChange={handleChange} 
             
          />
          <p>{formErrors.stock}</p>
        </div>
        <div className="form-group">
          <label htmlFor="category_id" className='des'>Category</label>
          <select 
            id="category" 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
          >
            <option value="">Category</option>
            {categories.map((category) => (
                
              <option key={category.id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <p>{formErrors.category}</p>
        </div>
        <div className="form-group">
          <label htmlFor="status" className='des'>Status</label>
          <select 
            id="status" 
            name="status" 
            value={formData.status} 
            onChange={handleChange} 
             
          >
            <option value={0}>Active</option>
            <option value={1}>Inactive</option>
          </select>
          <p>{formErrors.status}</p>
        </div>
        <button type="submit" className="submit-btn">{params.id ? 'Update' : 'Add'}</button>
      </form>
    </div>
    </>
  );
};

export  {AddProduct};
