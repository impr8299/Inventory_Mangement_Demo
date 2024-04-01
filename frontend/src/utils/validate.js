export const validate = (values, isSignInForm) => {

    console.log(isSignInForm, "isSignInForm")
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
    if (!isSignInForm && !values.fullName) {
      errors.fullName = "Full Name is required";
    }
    
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email";
    }
    
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
  
    return errors;
  };
  

  export const productValidate = (values) => {
    const errors = {};
  
    if (!values.name) {
      errors.name = "Name is required";
    } 
   
    if (!values.price || values.price <= 0) {
      errors.price = "Price should be greater than 0";
    }
  
    if (!values.stock || values.stock < 0) {
      errors.stock = "Stock should be a positive number";
    }
  
    if (!values.category) {
      errors.category = "Category is required";
    } 
  
  
    return errors;
  };
  

  export const categoryValidate = (values) => {
    const errors = {};
  
    if (!values.name) {
      errors.name = "Name is required";
    } 

  
    return errors;
  };