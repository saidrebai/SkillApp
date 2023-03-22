import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./index.css";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
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
  return (
    <>
      <div className="Admin_gird">
        <div className="number_of_admins">
          <p>Number of Admins : {adminCount}</p>
        </div>
        <div className="Admin">
          {currentAdmins.length > 0 ? (
            currentAdmins.map((admin) => (
              <div className="Admin_container" key={admin.id}>
                <div className="Admin_avatar">
                  <Avatar src="/broken-image.jpg" />
                </div>
                <div className="Admin_infromation">
                  <div className="Admin_email">{admin.email}</div>
                </div>
                <div className="button_display">
                  <button type="submit">Display</button>
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
    </>
  );
};

export default Admins;
