import React, { useState, useEffect } from 'react';
import '../../../style/app.css';
import { categoryValidate } from "../../../utils/validate"
import { api } from '../../../utils/api';
import HttpService from '../../../utils/httpsServices';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const AddCategory = () => {
  const [formData, setFormData] = useState({
  
    name: '',
    description: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
 const navigate = useNavigate()
 const params = useParams()
console.log(params, "params")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = categoryValidate(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
        try {
            const response = await  api.post(HttpService.AddCategory, formData);
            console.log(response, "response")
            if (response.status === 201) {
              toast.success(response?.data?.message)          
              setTimeout(() => {
                navigate("/dashboard");
              }, 1000);
              setFormData({
                name: '',
                description: ''
              });
            } else {
              toast.error(response.data.errMsg);
            }
          } catch (error) {
            
            toast.error(error?.response?.data?.errMsg);   
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
      const fetchCategory = async () => {
        try {
            const response = await  api.post(HttpService.EditCategory, formData);
          const { name, description } = response?.data?.data;
         setFormData({ id:params.id, name, description });
        } catch (error) {
          toast.error(error.response?.data?.errMsg);
        }
      };

      fetchCategory();
    }
  }, [params.id]);

  return (
    <>
   <ToastContainer/>
    
      <h4 style={{marginTop:"15px"}}>{formData.id ? 'Edit Category' : 'Add Category'}</h4>
      <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active" aria-current="page">{formData.id ? 'Edit Category' : 'Add Category'}</li>
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
        
        <button type="submit" className="submit-btn">{formData.id ? 'Edit ' : 'Add'}</button>
      </form>
    </div>
    </>
  );
};

export  {AddCategory};
