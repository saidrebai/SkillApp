import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './index.css';
import myImage from '../images/arsela-techmologies.png';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "react-toastify/dist/ReactToastify.css";
// import { toast, ToastContainer } from "react-toastify";

export default function Card() {

  const user = localStorage.getItem("token");
  const id = localStorage.getItem('id');
  // const idpdf = localStorage.getItem("idpdf");
  // const idOffer = localStorage.getItem("idOffer");

  const [offers, setOffers] = useState([]);
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState("");
  const [pdfs, setPdfs] = useState(null);
  // const [updatedData,setUpdatedData] = useState({cv:idpdf})

  const toggleModel = () => {
    if (user) {
      setPopup(!popup);
      console.log("gggg", popup);
      // localStorage.setItem("idOffer",idOffer);
      
    }
    else {
      window.location.href = "/login";
    }
  }

  if (popup) {
    document.body.classList.add('active-popup')
  } else {
    document.body.classList.remove('active-popup')
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8080/api/offerRouter/getoffer');
      setOffers(response.data?.offer);
    }
    fetchData();
  }, []);
  console.log("======>", offers);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(offers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentOffers = offers.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdfs', pdfs);
    formData.append("id",id);
    
    try {
      const { data: res } = await axios.post("http://localhost:8080/api/internAppRouter/upload", formData);
      console.log("===>",res);
      localStorage.setItem("idpdf",res.idpdf);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }


    // axios
    //   .put(
    //     `http://localhost:8080/api/offerRouter/updateoffer/${id}`,
    //     updatedData
    //   )
    //   .then((response) => {
    //     // update the newData state with the updated data
    //     setOffers(updatedData);
    //     console.log("reeeeeeeeeeeeeeees", response);
    //     toast.success("Updated successfully!");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error("Update failed!");
    //   });
  };


  const handleFileChange = (event) => {
    setPdfs(event.target.files[0]);
  };

  return (
    <><div className="container">
      {currentOffers.length > 0 ? (
        currentOffers.map((offer) => (
          <div className="offer_container" key={offer._id}>
            <div className="offer_container_img">
              <img src={myImage} alt="" />
            </div>
            <div className="offer_container_info">
              <div className="Name_container"><label>Title : </label>{offer.Name}</div>
              <div className="Type_container"><label>Type : </label>{offer.type}</div>
              <div className="time_container"><label>time : </label>{offer.time}</div>
            </div>
            <div className="offer_container_description">
              <label>Descritption : </label>{offer.description}
            </div>
            <div className="skills_container"><label>Skills : </label>{offer.skills}</div>
            <div className="company_Name_container"><label>Entreprise : </label>{offer.company_name}</div>
            <div className="adresse_container"><label>Adresse : </label>{offer.adresse}</div>
            <button className="apply_button" onClick={toggleModel}>Apply</button>
            {popup && (
              <div className="popup_container">
                <div className="overlay" onClick={toggleModel} >
                </div>
                <form className="form_container" method="POST" onSubmit={handleSubmit}>
                  <div className="popup_contnt">
                    <h1>Enter your CV here : </h1>
                    <input type="file"
                      name='pdfs'
                      onChange={handleFileChange}
                    />
                    <button
                      className="close_popup"
                      type='button'
                      onClick={toggleModel}>close</button>
                    {error && <div className="error_msg">{error}</div>}
                    <button type="submit" >send</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ))) : (
        <div>No offers to display</div>

      )}</div>
      <div className="pagination_container">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack></div>
    </>
  );
}