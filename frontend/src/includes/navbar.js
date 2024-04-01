import React from "react";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import Cookies from "js-cookie";
import HttpService from "../utils/httpsServices";
import { api } from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Navbar() {

    const Name = Cookies.get('Username');
const navigate = useNavigate()
    const handleLogout = async () => {
        try {
          const response = await api.post(HttpService.Logout);
          console.log(response, "response")
          if (response.status === 200) {
            Cookies.remove("AccessToken")
            toast.success(response?.data?.message)
            setTimeout(() => {
                navigate('/');
            }, 1000);
            
          } else {
            toast.error(response.data.errMsg);
          }
        } catch (error) {
          toast.error(error?.response?.data?.errMsg);
        }
      };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <div className="container-fluid"> 
        
        <span className="ml-auto">Hello,{Name}</span>
        
        <div className="ml-auto">
        <button className="btn btn-danger" 
         onClick={handleLogout}
        >
          Logout
        </button>
      </div>
        
      </div>
    </nav>
  );
}

export { Navbar };
