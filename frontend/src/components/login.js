import React, { useState, useEffect } from "react";
import { validate } from "../utils/validate";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HttpService from "../utils/httpsServices";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "../style/app.css"
import { api } from "../utils/api";
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from "../utils/common";


const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const initialValues = { fullName: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const ToggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("CLICK")
    e.preventDefault();
    setFormErrors(validate(formValues, isSignInForm));
    setIsSubmit(true);
  console.log(formErrors, "formErrors")
    if (Object.keys(formErrors).length === 0) {
        console.log("hh")
      if (isSignInForm) {
        try {
          const response = await  api.post(HttpService.Login, formValues);
          console.log(response, "response")
          if (response.status === 200) {
            toast.success()
            showToast(response?.data?.message, 'success');
            Cookies.set('Accesstoken', response?.data?.data?.accessToken)
            Cookies.set('Username', response?.data?.data?.user?.fullName)
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
            setFormValues(initialValues)
          } else {
            toast.error(response.data.errMsg);
          }
        } catch (error) {
          console.error("Login error:", error.response ? error.response.data : error.message);
          toast.error(error?.response?.data?.errMsg);   
        }
      } else {
        console.log("else")
        try {
          const response = await axios.post(HttpService.Register, formValues);

          console.log(response, "response")
          if (response.status === 200) {
            toast.success(response?.data?.message)
            setisSignInForm(true)
            setFormValues(initialValues)
          } else {
            toast.error(response.data.errMsg);
          }
  
        } catch (error) {
          console.error("Registration error:", error.response.data.errMsg);
          toast.error(error?.response?.data?.errMsg);   
        }
      }
    }
  };
  

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  return (
    <>
      
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          <div className="ui form">
            {!isSignInForm && (
              <div className="field">
                <label htmlFor="fullName">Fullname</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="fullName"
                  value={formValues.fullName}
                  onChange={handleChange}
                />
                <p>{formErrors.fullName}</p>
              </div>
            )}

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
              <p>{formErrors.email}</p>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
              <p>{formErrors.password}</p>
            </div>

            <button className="fluid ui button blue">{isSignInForm ? "Sign In" : "Sign Up"}</button>
          </div>
          <p className="checksignin" onClick={ToggleSignInForm}>
            New to Product Inventory ? {isSignInForm ? "Sign Up" : "Sign In"}
          </p>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
};

export { Login };
