import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./index.css";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [popup, setPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const toggleModel = (user) => {
        setSelectedUser(user);
        setPopup(!popup);
        console.log("gggg", popup);
    }

    if (popup) {
        document.body.classList.add('activee-popup')
    } else {
        document.body.classList.remove('activee-popup')
    }


  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:8080/api/candidatRouters/getAll"
      );
      setUsers(response.data?.users);
      setUserCount(response.data.users.length);
    }
    fetchData();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentUsers = users.slice(startIndex, endIndex);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    }
    return (
        <><div className='users_gird'>
            <div className='number_of_users'>
                <p>Number of users : {userCount}</p>
            </div>
            <div className='users'>
                {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                        <div className='users_container' key={user._id}>
                            <div className='users_avatar'><Avatar src="/broken-image.jpg" /></div>
                            <div className='users_infromation'>
                                <div className='users_email'>{user.email}</div>
                            </div>
                            <div className='button_display'>
                                <button type="submit" onClick={() => toggleModel(user)}>Display</button>
                            </div>

                        </div>
                    ))

                ) : (
                    <div>No users to display</div>
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
                </Stack></div>
        </div>
            {popup && (
                <div className="popup_container" style={{ zIndex: "100" }}>
                    <div className="overlay" onClick={() => toggleModel(null)} >
                    </div>
                    <div className="popup_content">
                        <div className="user_info">
                            <div className="user_data">
                                <Avatar src="/broken-image.jpg" />
                            </div>
                            <div className="user_data">
                                Email :  {selectedUser?.email}
                            </div>
                            <div className="user_data">
                                First Name : {selectedUser?.firstName}
                            </div>
                            <div className="user_data">
                                Last Name : {selectedUser?.lastName}
                            </div>
                            <div className="user_data">
                                Country : {selectedUser?.country}
                            </div>
                            <div className="user_data">
                                Town : {selectedUser?.town}
                            </div>
                            <div className="user_data">
                                Adresse : {selectedUser?.adresse}
                            </div>
                            <div className="user_data">
                                Zipcode : {selectedUser?.zipCode}
                            </div>
                            <div className="user_data">
                                Telephone : {selectedUser?.tel}
                            </div>
                            <div className="user_data">
                                Gender : {selectedUser?.gender}
                            </div>
                            <div className="user_data">
                                Birthday : {selectedUser?.birthDate}
                            </div>
                            <div className="user_data">
                                Establishment : {selectedUser?.Establishment}
                            </div>

                        </div>

                        <button
                            className="close_popup"
                            type='button'
                            onClick={() => toggleModel(null)}>close</button>
                    </div>

                </div>
            )}</>
    )
}

export default Users;
