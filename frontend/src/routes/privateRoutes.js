import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Navbar } from "../includes/navbar"
import "../style/sidebar.css";
import { Sidebar } from '../includes/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PrivateRoute = ({ Component }) => {
    const auth = Cookies.get('Accesstoken');
    const [toggle, setToggle] = useState(true);

    const Toggle = () => {
      setToggle(!toggle);
    };

    return auth ? (
        <>
            
            <div className='container-fluid  min-vh-100' style={{backgroundColor:"whitesmoke"}}>
                <div className='row '>
                    {toggle && (
                        <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
                            <Sidebar />
                        </div>
                    )}
                    {toggle && <div className='col-4 col-md-2'></div>}
                    <div className='col'>
                        <Component Toggle={Toggle} />
                    </div>
                </div>
            </div>
            
        </>
    ) : (
        <Navigate to="/" />
    );
}

export default PrivateRoute;
