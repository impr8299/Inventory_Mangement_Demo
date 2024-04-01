import React, { useEffect, useState } from "react";
import "../../../style/sidebar.css";
import { Navbar } from "../../../includes/navbar";
import { api } from "../../../utils/api";
import HttpService from "../../../utils/httpsServices";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Dashboard({ Toggle }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterdata, setFilterdata]= useState([]);
  const [query, setQuery] = useState('');
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [currentPage, itemsPerPage]);

    async function fetchProducts() {
      try {
        const response = await api.post(HttpService.ProductList, {
          page: currentPage,
          perPage: itemsPerPage,
        });
        console.log(response, "response");
        if (response.status === 200) {
          setProducts(response?.data?.data?.data);
          setFilterdata(response?.data?.data?.data);
          setLoading(false);
          const totalItems = response?.data?.data?.totalItems || 0; 
          const totalPages = Math.ceil(totalItems / itemsPerPage);
          setTotalPages(totalPages);
        } else {
          toast.error(response.data.errMsg);
        }
      } catch (error) {
        setLoading(true);
        toast.error(error?.response?.data?.errMsg);
      }
    }


  const handleEditProduct = (productId) => {
    navigate(`/editproduct/${productId}`);
  };

  const handleShowModal = (product) => {
    console.log(product);
    setProductToDelete(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductToDelete(null);
  };


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await api.post(HttpService.DeleteProduct, {
        id: productToDelete._id,
      });
      console.log(response, "response");
      if (response.status === 200) {
        toast.success(response?.data?.message);
        const updatedProducts = products.filter(
          (product) => product._id !== productToDelete._id
        );
        
        setProducts(updatedProducts);
        
        setShowModal(false);
      } else {
        toast.error(response.data.errMsg);
      }
    } catch (error) {
      toast.error(error?.response?.data?.errMsg);
    }
  };
  const handlesearch=(event)=>{
    const getSearch= event.target.value; 
    if(getSearch.length > 0)
    {     
     const searchdata= products.filter( (item)=> item.name.toLowerCase().includes(getSearch));
     setProducts(searchdata);
    } else {
      setProducts(filterdata);
    }
    setQuery(getSearch);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-3">
      <Navbar Toggle={Toggle} />
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Product</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this product?
            </div>
            <div className="modal-footer ">
              <div className="row">
                <div className="col-md-6">
                  <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={handleCloseModal}
                  >
                    No
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={handleDeleteProduct}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="search-container ml-auto">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search"
                            aria-label="Search"
                            value={query}
                            aria-describedby="search-btn"
                            onChange={(e)=>handlesearch(e)}
                        />
                    </div>
                </div>
      <table class="table caption-top bg-white rounded mt-2">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{product.name}</td>
              <td>{product?.category?.name}</td>
              <td>{product.price}</td>
              <td>{product.status == 0 ? "Active" : "Deactive"}</td>
              <td className="d-flex align-items-center mx-2 cursor-pointer">
                <i
                  className="bi bi-pencil-fill"
                  onClick={() => handleEditProduct(product._id)}
                  style={{ cursor: "pointer" }}
                ></i>
                <i
                  className="bi bi-archive-fill"
                  onClick={() => handleShowModal(product)}
                  style={{ cursor: "pointer", marginLeft: "15px" }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fixed-bottom d-flex justify-content-center mb-2">
      <div className="pagination-container mt-3 center">
        <button
          className="btn btn-danger mr-2"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{width:"200px", marginRight:"20px"}}
        >
          Previous
        </button>
        <span className="mr-2">Page {currentPage} of {totalPages}</span>
        <button
        style={{width:"200px", marginLeft:"20px"}}
          className="btn btn-success mr-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        </div>
        </div>
    </div>
  );
}
export { Dashboard };
