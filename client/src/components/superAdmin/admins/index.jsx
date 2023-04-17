import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { toast, ToastContainer } from "react-toastify";
import "./index.css";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
  const [popup, setPopup] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const toggleModel = (admin) => {
    setSelectedAdmin(admin);
    setPopup(!popup);
    console.log("gggg", popup);
  };

  if (popup) {
    document.body.classList.add("active-popup");
  } else {
    document.body.classList.remove("active-popup");
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:8080/api/adminRouters/getAll"
      );
      setAdmins(response.data?.admins);
      setAdminCount(response.data.admins.length);
    }
    fetchData();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(admins.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentAdmins = admins.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDelete = (selectedAdmin) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Admin ?"
    );
    if (!confirmed) {
      return;
    }
    axios
      .delete(`http://localhost:8080/api/adminRouters/deleteadmin/${selectedAdmin._id}`)
      .then((response) => {
        setAdminCount(adminCount-1)
        setAdmins((prevAdmins) =>
          prevAdmins.filter((o) => o._id !== selectedAdmin._id)
        );
        console.log("Deleted", response);
        toast.success("Deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Deletion failed!");
      });
  };

  return (
    <><ToastContainer />
      <div className="Admin_gird">
        <div className="number_of_admins">
          <p>Number of Admins : {adminCount}</p>
        </div>
        <div className="Admin">
          {currentAdmins.length > 0 ? (
            currentAdmins.map((selectedAdmin) => (
              <div className="Admin_container" key={selectedAdmin._id}>
                <div className="Admin_avatar">
                  <Avatar src="/broken-image.jpg" />
                </div>
                <div className="Admin_infromation">
                  <div className="Admin_email">{selectedAdmin.email}</div>
                </div>
                <div className="buttons">
                <button
                  className="button_display"
                  type="submit"
                  onClick={() => toggleModel(selectedAdmin)}
                >
                  Display
                </button>
                <button
                  className="button_display"
                  type="submit"
                  onClick={() => handleDelete(selectedAdmin)}
                >
                  Delete
                </button>
                </div>
              </div>
            ))
          ) : (
            <div>No Admin to display</div>
          )}
        </div>
        <div className="pagination_container">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      </div>
      {popup && (
        <div className="popup_container" style={{ zIndex: "10" }}>
          <div className="overlay" onClick={() => toggleModel(null)}></div>
          <div className="popup_content">
            <div className="admin_info">
              <div className="admin_data">
                <Avatar src="/broken-image.jpg" />
              </div>
              <div className="admin_data">Email : {selectedAdmin?.email}</div>
              <div className="admin_data">
                Type of user :{selectedAdmin?.TypeOfUser}
              </div>
              <div className="admin_data">Name : {selectedAdmin?.Name}</div>
              <div className="admin_data">
                Country : {selectedAdmin?.country}
              </div>
              <div className="admin_data">Town : {selectedAdmin?.town}</div>
              <div className="admin_data">
                Adresse : {selectedAdmin?.adresse}
              </div>
              <div className="admin_data">
                Zipcode : {selectedAdmin?.Zipcode}
              </div>
              <div className="admin_data">Telephone : {selectedAdmin?.tel}</div>
              <div className="admin_data">
                fiscalCode : {selectedAdmin?.fiscalCode}
              </div>
            </div>

            <button
              className="close_popup"
              type="button"
              onClick={() => toggleModel(null)}
            >
              close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Admins;
